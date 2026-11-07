# Antigravity Agent Instructions — Dynamic Data-Driven Portfolio & Visual CMS Studio

## 1. Strict Architecture Constraint (No Frameworks, No Servers, 100% Static)
- Build a clean, static portfolio system using ONLY standard `index.html`, `style.css`, `script.js`, `admin.html`, `admin.css`, and `admin.js`.
- DO NOT initialize Node.js, npm, React, Next.js, Vite, or any backend server.
- The project runs immediately by opening `index.html` in any modern browser or hosting on GitHub Pages.
- Maintain existing assets in `static/public/` (`my-image.jfif`, `cv.pdf`).
- Data is decoupled and structured in `data/portfolio-data.json` with a robust fallback in `script.js`.

## 2. Dynamic Architecture & Data-View Separation
- **Data Layer:** `data/portfolio-data.json` is the single source of truth structured as `List of Objects` (`sections`, `profile`, `contact`, `meta`).
- **Dynamic Runtime Engine:** `script.js` implements `PortfolioRenderer`, which fetches `data/portfolio-data.json` (or reads draft from `localStorage` in preview mode `?preview=true`), generates the DOM dynamically, and binds interactions.
- **Visual CMS Studio:** `admin.html`, `admin.css`, and `admin.js` provide a complete in-browser studio to edit profile details, manage dynamic sections (add, reorder, toggle, delete), edit card items (tags chips, links, guarantees), and publish directly to GitHub via REST API or save to disk via File System Access API.

## 3. Design & Layout Reference (Brittany Chiang Style Adapted for Python Backend)
- Two-column split layout (`position: sticky` left sidebar on desktop, scrolling content on the right, single column on mobile/tablet).
- Dark Navy & Mint Emerald color palette:
  - Background: `#0a192f`
  - Card Background: `#112240`
  - Card Border: `#233554`
  - Primary Text / Headings: `#ccd6f6`
  - Secondary Body Text: `#8892b0`
  - Accent Color (FastAPI Mint): `#64ffda`
  - Accent Color (AI Cyan): `#38bdf8`
- Signature interactions using pure CSS and Vanilla JS:
  1. Radial cursor spotlight following mouse coordinates (`--mouse-x`, `--mouse-y`).
  2. Scroll-spy navigation highlighting the active section via `IntersectionObserver`.
  3. Group card hover dimming (`.cards-list:hover .card:not(:hover) { opacity: 0.45; }`).
  4. Semantic tech stack pills (`Python`, `FastAPI`, `Google ADK`, `Pydantic`, `SQLAlchemy`, `PostgreSQL`, `SQLite`, `WebSockets`).

## 4. Strict Responsive Fluidity via `clamp()`
- All typography, paddings, gaps, and widths must use modern fluid CSS functions like `clamp()`, `minmax()`, `rem`, `%`, `vw`, and `vh`.
- No fixed pixel widths or heights that break on mobile, tablet, or laptop screens (768px-850px height safe).
- Zero horizontal overflow.

## 5. Layering and Background Architecture
- `body`: `background-color: #0a192f;`
- `#code-backdrop`: `position: fixed; inset: 0; pointer-events: none; z-index: 0;` (dimmed & blurred real Python code: FastAPI async routes, Pydantic V2, SQLAlchemy BaseRepository, Google ADK).
- `#spotlight`: `position: fixed; inset: 0; pointer-events: none; z-index: 1;`
- `.layout-wrapper`: `position: relative; z-index: 2;`

## 6. Developer Identity & Required Content
- Identity: **Basel Skayker** — **Python Backend & AI Developer** | Location: **Accra, Ghana**.
- Profile image: `static/public/my-image.jfif` with `aspect-ratio: 1/1; object-fit: cover; object-position: center;`.
- Sections:
  1. `#about` (`RichTextAndCV`): Vision, logical problem-solving mindset, languages (Arabic Native, English B1 Technical), and buttons to view/download `static/public/cv.pdf`.
  2. `#skills` (`SkillCategoriesGrid`): 4 Categorized skill cards (Backend & Concurrency, AI Architecture & Data Integrity, Database Management, AI Governance & Tools).
  3. `#services` (`ServicesGrid`): 4 Engineering service cards with clear deliverables and guarantees.
  4. `#projects` (`ProjectsAndTimeline`): Child's Nest, FastAPI Base Foundation, Python Instructor.
  5. `#contact`: WhatsApp Ghana (`+233 59 212 1895`), WhatsApp Syria (`+963 967 247 787`), Email 1-click copy (`baselskaiker21@gmail.com`), GitHub (`github.com/Ba-se-l`), and Serverless Dual-Action Form (Send via WhatsApp & Send via Email).
