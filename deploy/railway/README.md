# Cookie Dough Solutions — Railway static site

Marketing site (Vite + React SPA) served by nginx.

## Quick setup

1. Create a new Railway project: **Cookie Dough Solutions**
2. Add a service from this repo (`cookie-dough-solutions`)
3. Railway reads `railway.json` at repo root
4. Set optional build variable:
   - `VITE_ORDERING_APP_DEMO_URL=https://www.almaalem.shop`
5. Generate a public domain (e.g. `cookiedough.app` or `*.up.railway.app`)

## Build

Dockerfile runs `npm ci && npm run build` and serves `dist/` with nginx SPA fallback.

## Health check

`GET /health` returns `200 ok` for Railway healthchecks.

## Local Docker test

```bash
docker build -t cookie-dough-web .
docker run -p 8080:80 -e PORT=80 cookie-dough-web
```

Open http://localhost:8080
