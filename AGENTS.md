# Antigravity Agent Instructions — Static Portfolio (HTML, CSS, JS Only)

## 1. Strict Architecture Constraint (No Frameworks, No Servers)
- Build a clean, static single-page portfolio using ONLY standard `index.html`, `style.css`, and `script.js`.
- DO NOT initialize Node.js, npm, React, Next.js, Vite, or any backend server.
- Keep the project 100% static so it runs immediately by opening `index.html` in a browser or hosting on GitHub Pages.
- Maintain existing assets in `static/public/` (`my-image.jfif`, `cv.pdf`).

## 2. Design & Layout Reference (Brittany Chiang Style Adapted for Python Backend)
- Apply the two-column split layout from https://brittanychiang.com/ (`position: sticky` left sidebar on desktop, scrolling content on the right, single column on mobile/tablet).
- Apply the Dark Navy & Mint Emerald color palette:
  - Background: `#0a192f`
  - Card Background: `#112240`
  - Card Border: `#233554`
  - Primary Text / Headings: `#ccd6f6`
  - Secondary Body Text: `#8892b0`
  - Accent Color (FastAPI Mint): `#64ffda`
  - Accent Color (AI Cyan): `#38bdf8`
- Implement signature interactions using pure CSS and Vanilla JS:
  1. Radial cursor spotlight following mouse coordinates (`--mouse-x`, `--mouse-y`).
  2. Scroll-spy navigation highlighting the active section via `IntersectionObserver`.
  3. Group card hover dimming (`.cards-list:hover .card:not(:hover) { opacity: 0.45; }`).
  4. Semantic tech stack pills (`Python`, `FastAPI`, `Google ADK`, `Pydantic`, `SQLAlchemy`, `PostgreSQL`, `SQLite`, `WebSockets`).

## 3. Strict Responsive Fluidity via `clamp()`
- All typography, paddings, gaps, and widths must use modern fluid CSS functions like `clamp()`, `minmax()`, `rem`, `%`, `vw`, and `vh`.
- No fixed pixel widths or heights that break on mobile, tablet, or laptop screens (768px-850px height safe).
- Zero horizontal overflow.

## 4. Layering and Background Architecture
- `body`: `background-color: #0a192f;`
- `#code-backdrop`: `position: fixed; inset: 0; pointer-events: none; z-index: 0;` (dimmed & blurred real Python code: FastAPI async routes, Pydantic V2, SQLAlchemy BaseRepository, Google ADK).
- `#spotlight`: `position: fixed; inset: 0; pointer-events: none; z-index: 1;`
- `.layout-wrapper`: `position: relative; z-index: 2;`

## 5. Required Content (Strictly from Basel Skayker's CV & portfolio_analytic_requirements_2.md)
- Identity: **Basel Skayker** — **Python Backend & AI Developer** | Location: **Accra, Ghana**.
- Profile image: `static/public/my-image.jfif` with `aspect-ratio: 1/1; object-fit: cover; object-position: center;`.
- Section 1 (`#about`): Vision, logical problem-solving mindset, languages (Arabic Native, English B1 Technical), and prominent buttons to view/download `static/public/cv.pdf`.
- Section 2 (`#skills`): 4 Categorized skill cards (Backend & Concurrency, AI Architecture & Data Integrity, Database Management, AI Governance & Tools).
- Section 3 (`#services`): 4 Engineering service cards with clear deliverables and guarantees.
- Section 4 (`#projects`): Child's Nest, FastAPI Base Foundation, Python Instructor.
- Section 5 (`#contact`): WhatsApp Ghana (`+233 59 212 1895`), WhatsApp Syria (`+963 967 247 787`), Email 1-click copy (`baselskaiker21@gmail.com`), GitHub (`github.com/Ba-se-l`), and Serverless Dual-Action Form (Send via WhatsApp & Send via Email).
