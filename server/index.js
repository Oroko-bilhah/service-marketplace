import "dotenv/config"
import { Buffer } from "node:buffer"
import { randomBytes } from "node:crypto"
import { existsSync } from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import bcrypt from "bcryptjs"
import express from "express"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import jwt from "jsonwebtoken"
import { initializeDatabase, pool } from "./db.js"

const app = express()
const port = Number(process.env.PORT) || 3001
const rememberedSessionSeconds = 60 * 60 * 24 * 7
const shortSessionSeconds = 60 * 60 * 12
const sessionSecret = process.env.JWT_SECRET || (
  process.env.NODE_ENV === "production"
    ? null
    : randomBytes(32).toString("hex")
)

if (!sessionSecret || (process.env.NODE_ENV === "production" && sessionSecret.length < 32)) {
  throw new Error("Production requires a JWT_SECRET of at least 32 characters.")
}

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const clientDirectory = path.resolve(currentDirectory, "../dist")

app.disable("x-powered-by")
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "style-src-attr": ["'unsafe-inline'"],
    },
  },
}))
app.use(express.json({ limit: "10kb" }))

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many authentication attempts. Please wait and try again." },
})

function setSessionCookie(response, user, remember = true) {
  const duration = remember ? rememberedSessionSeconds : shortSessionSeconds
  const token = jwt.sign({ sub: String(user.id) }, sessionSecret, {
    expiresIn: duration,
  })

  response.cookie("market_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: duration * 1000,
  })
}

function clearSessionCookie(response) {
  response.clearCookie("market_session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

function getSessionUser(request) {
  const token = request.headers.cookie
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("market_session="))
    ?.slice("market_session=".length)

  if (!token) return null

  try {
    const payload = jwt.verify(decodeURIComponent(token), sessionSecret)
    return typeof payload === "object" && typeof payload.sub === "string"
      ? payload.sub
      : null
  } catch {
    return null
  }
}

function publicUser(user) {
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
  }
}

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" })
})

app.post("/api/auth/register", authLimiter, async (request, response, next) => {
  try {
    const body = request.body && typeof request.body === "object" ? request.body : {}
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const password = typeof body.password === "string" ? body.password : ""

    if (name.length < 2 || name.length > 80) {
      return response.status(400).json({ error: "Enter a name between 2 and 80 characters." })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return response.status(400).json({ error: "Enter a valid email address." })
    }
    if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
      return response.status(400).json({ error: "Password must be at least 8 characters and no more than 72 bytes." })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, passwordHash],
    )
    const user = result.rows[0]
    setSessionCookie(response, user)
    return response.status(201).json({ user: publicUser(user) })
  } catch (error) {
    if (error.code === "23505") {
      return response.status(409).json({ error: "An account with that email already exists." })
    }
    return next(error)
  }
})

app.post("/api/auth/login", authLimiter, async (request, response, next) => {
  try {
    const body = request.body && typeof request.body === "object" ? request.body : {}
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const password = typeof body.password === "string" ? body.password : ""

    if (!email || !password || Buffer.byteLength(password, "utf8") > 72) {
      return response.status(400).json({ error: "Enter your email address and password." })
    }

    const result = await pool.query(
      "SELECT id, name, email, password_hash FROM users WHERE email = $1",
      [email],
    )
    const user = result.rows[0]
    const passwordMatches = user ? await bcrypt.compare(password, user.password_hash) : false

    if (!user || !passwordMatches) {
      return response.status(401).json({ error: "Email or password is incorrect." })
    }

    setSessionCookie(response, user, body.remember === true)
    return response.json({ user: publicUser(user) })
  } catch (error) {
    return next(error)
  }
})

app.get("/api/auth/me", async (request, response, next) => {
  try {
    const userId = getSessionUser(request)
    if (!userId) return response.status(401).json({ error: "You are not signed in." })

    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [userId],
    )
    if (!result.rows[0]) {
      clearSessionCookie(response)
      return response.status(401).json({ error: "Your session has expired. Please sign in again." })
    }

    return response.json({ user: publicUser(result.rows[0]) })
  } catch (error) {
    return next(error)
  }
})

app.post("/api/auth/logout", (_request, response) => {
  clearSessionCookie(response)
  response.status(204).end()
})

if (existsSync(clientDirectory)) {
  app.use("/service-marketplace", express.static(clientDirectory))
  app.get(/^\/service-marketplace(?:\/.*)?$/, (_request, response) => {
    response.sendFile(path.join(clientDirectory, "index.html"))
  })
  app.get("/", (_request, response) => response.redirect("/service-marketplace/"))
}

app.use((error, _request, response, next) => {
  console.error(error)
  if (response.headersSent) return next(error)
  response.status(500).json({ error: "The server encountered an error. Please try again." })
})

async function start() {
  await initializeDatabase()
  const server = app.listen(port, () => {
    console.log(`Service Market API listening on http://localhost:${port}`)
  })

  async function shutdown() {
    server.close(async () => {
      await pool.end()
      process.exit(0)
    })
  }

  process.on("SIGINT", shutdown)
  process.on("SIGTERM", shutdown)
}

start().catch(async (error) => {
  console.error("Failed to start the server:", error)
  await pool.end()
  process.exitCode = 1
})
