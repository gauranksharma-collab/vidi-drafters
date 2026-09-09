# Vidhik Drafters

React + Node/Express + MongoDB rebuild of vidhikdrafters.com, including a full
in-house "Draft" affidavit/legal-document ordering app (catalog, dynamic
forms, cart, checkout, payment, order management).

## Structure

- `client/` — React (Vite) frontend
- `server/` — Node/Express API, deployable as Vercel serverless functions
  (`server/api/index.js`) or as a normal long-running process (`npm start`)

## Local development

```bash
# server
cd server
cp .env.example .env   # fill in real values
npm install
npm run dev             # http://localhost:5050

# client (separate terminal)
cd client
cp .env.example .env
npm install
npm run dev             # http://localhost:5173
```

One-time setup after the server's `.env` is filled in:

```bash
cd server
npm run seed:admins     # creates the first admin login (prints a temp password once)
```

## Deploying to Vercel

Deploy `client/` and `server/` as two separate Vercel projects from this
repo (set each project's "Root Directory" accordingly).

- **server**: Vercel auto-detects `server/api/index.js` as a serverless
  function; `server/vercel.json` rewrites all paths to it so Express's own
  routing (`/api/...`) still works. Set the env vars from `.env.example` in
  the Vercel project settings — the MongoDB connection is cached across
  invocations (see `server/src/config/db.js`) to stay serverless-friendly.
- **client**: standard Vite static build. Set `VITE_API_URL` to the
  deployed server's URL.

## Payment

Runs in "manual payment" mode (order placed as pending, an admin marks it
paid from the dashboard) until real `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET`
are set — the legacy site's own payment integration was never actually
functional in production (wired to a sandbox with hardcoded test
credentials, and its success/failure callbacks pointed at a stale
database), so this was rebuilt clean rather than ported.

## Data migration

`server/scripts/migrate-mysql-to-mongo.js` was a one-time script used to
migrate the legacy cPanel MySQL database into MongoDB during the initial
rebuild. It's kept for reference but doesn't need to run again.
