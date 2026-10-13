# Service Market

## Run the app with PostgreSQL auth

Requirements: Node.js 24+ and a reachable PostgreSQL database.

1. Create a database named `service_market` (or use an existing database).
2. Copy `.env.example` to `.env` and set `DATABASE_URL` and a unique `JWT_SECRET`.
   On PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   Generate a secret with:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
   ```

3. Run `npm run dev`. Vite starts the frontend and proxies `/api` to Express.
   The server creates the `users` table on startup.

For production, set `DATABASE_URL`, `JWT_SECRET`, and `NODE_ENV=production`, then
run `npm run build` and `npm run server:start`. Express serves the built frontend
under `/service-marketplace/` and the API under `/api`.

The existing GitHub Pages workflow publishes only static files and cannot host
this Express API. Deploy the Node server and frontend together on a Node-capable
host, or configure a same-origin reverse proxy for `/api`.

Set `PGSSLMODE=require` for PostgreSQL hosts that require TLS. The connection
validates the database certificate.

## Authentication API

- `POST /api/auth/register` — create an account and start a session.
- `POST /api/auth/login` — authenticate and start a session.
- `POST /api/auth/logout` — clear the session cookie.
- `GET /api/auth/me` — return the current signed-in user.
- `GET /api/health` — API health check.

Passwords are hashed with bcrypt and session tokens are stored in HttpOnly,
SameSite cookies. No password or session token is saved to browser storage.
