import { useEffect, useState } from "react"
import { AuthContext } from "./AuthStateContext"

async function requestAuth(path, options = {}) {
  let response
  try {
    response = await fetch(path, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })
  } catch {
    throw new Error("Cannot reach the authentication server. Check that the backend is running.")
  }

  const result = response.status === 204 ? {} : await response.json()
  if (!response.ok) throw new Error(result.error || "Authentication failed. Please try again.")
  return result
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let cancelled = false
    requestAuth("/api/auth/me")
      .then(({ user: currentUser }) => {
        if (!cancelled) setUser(currentUser)
      })
      .catch((error) => {
        if (!cancelled && !error.message.includes("not signed in")) {
          console.error("Unable to restore the current session:", error)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function login(email, password, remember) {
    const result = await requestAuth("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, remember }),
    })
    setUser(result.user)
    return result.user
  }

  async function register(name, email, password) {
    const result = await requestAuth("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
    setUser(result.user)
    return result.user
  }

  async function logout() {
    await requestAuth("/api/auth/logout", { method: "POST" })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
