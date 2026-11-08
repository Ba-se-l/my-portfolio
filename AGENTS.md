# Antigravity Agent Instructions — Dynamic Data-Driven Portfolio & FastAPI Security Gateway

## 1. Architectural Model: CQRS-Lite Separation (Static Read + FastAPI Write)
- **Public Portfolio (Read Path — 100% Static & Blazing Fast):**
  - Served directly from GitHub Pages via standard `index.html`, `style.css`, and `script.js`.
  - Zero backend latency for visitors: fetches `data/portfolio-data.json` directly from the GitHub Pages CDN at $O(1)$ speed.
  - Zero server costs, 100% free forever.
  - Assets in `static/public/` (`my-image.jfif`, `cv.pdf`).
- **Visual CMS Studio & Security Gateway (Write Path — Zero-Trust FastAPI Backend):**
  - Management UI: `admin.html`, `admin.css`, `admin.js`.
  - Backend Gateway (`portfolio-admin-backend/`): Pure Python 3.12+/3.13+ stateless FastAPI application.
  - **Dual-Target Deployment:**
    1. **Primary Production:** Cloudflare Python Workers (`src/worker.py` via `workers.asgi` and `wrangler.toml`) — 100% free forever (100k req/day), 24/7 uptime, 0ms cold start.
    2. **Container / Local Fallback:** Uvicorn / Render (`src/main.py`) running identical domain logic without modifications.
  - Zero secrets in the browser: Master Passphrase hash (OWASP 600,000 PBKDF2 / Argon2id), `JWT_SECRET_KEY`, and `GITHUB_PAT` are stored strictly in server environment secrets.
  - Server-Side Sliding-Window Brute-Force Rate Limiter (5 attempts -> exponential lockout with LRU eviction).
  - Pydantic V2 Pre-Publish Schema Validation & XSS/URL Sanitization Barrier.
  - Atomic server-to-server Git commit synchronization with Optimistic Concurrency Control (OCC) via blob SHA.

## 2. Developer Identity & Branding
- Identity: **Basel Skayker** — **Python Backend & AI Developer** | Location: **Accra, Ghana**.
- Profile image: `static/public/my-image.jfif`.
- Dark Navy & Mint Emerald color palette (`#0a192f`, `#112240`, `#233554`, `#ccd6f6`, `#8892b0`, `#64ffda`, `#38bdf8`).
- Fluid CSS via `clamp()`, `minmax()`, `rem`, `%`, `vw`, and `vh` with zero horizontal overflow.
