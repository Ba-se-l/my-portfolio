/**
 * ==========================================================================
 * BASEL SKAYKER — DYNAMIC PORTFOLIO RUNTIME ENGINE
 * Pure Vanilla JavaScript — High Performance, Zero Runtime Bloat
 * 
 * Features:
 * 1. Hybrid Data Engine: Fetch from portfolio-data.json + Local Draft Preview + Fail-Safe Fallback
 * 2. Dynamic Section & Component Layout Engine (5 Layout Types)
 * 3. Dynamic Sticky Sidebar & Auto-Numbered Scroll-Spy Navigation
 * 4. High-Performance Radial Cursor Spotlight (RAF throttled)
 * 5. IntersectionObserver Scroll-Spy
 * 6. 1-Click Clipboard Email Copy with Visual Feedback
 * 7. Serverless Dual-Action Form (WhatsApp & Email Direct Dispatch)
 * ==========================================================================
 */

"use strict";

const FALLBACK_PORTFOLIO_DATA = {
  "meta": { "version": "2.0.0", "system": "Antigravity Dynamic Portfolio Engine" },
  "profile": {
    "fullName": "Basel Skayker",
    "headline": "Python Backend & AI Developer",
    "location": "Accra, Ghana",
    "utcTag": "UTC+0",
    "statusBadge": "Available for Projects & Roles",
    "avatarUrl": "static/public/my-image.jfif",
    "cvUrl": "static/public/cv.pdf",
    "shortBio": "Architecting high-performance asynchronous FastAPI backends, resilient SQLAlchemy databases, and reliable multi-agent AI systems governed by strict schemas.",
    "primaryActions": [
      {
        "id": "act-cv",
        "label": "View / Download CV",
        "url": "static/public/cv.pdf",
        "icon": "file-text",
        "style": "btn-primary",
        "external": true
      },
      {
        "id": "act-wa",
        "label": "WhatsApp Me",
        "url": "https://wa.me/233592121895?text=Hello%20Basel%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
        "icon": "message-circle",
        "style": "btn-outline",
        "external": true
      }
    ],
    "socialLinks": [
      { "id": "soc-gh", "platform": "GitHub", "url": "https://github.com/Ba-se-l", "icon": "github", "type": "svg" },
      { "id": "soc-em", "platform": "Email", "url": "mailto:baselskaiker21@gmail.com", "icon": "mail", "type": "lucide" },
      { "id": "soc-wa-gh", "platform": "WhatsApp Ghana", "url": "https://wa.me/233592121895", "icon": "phone", "type": "lucide" },
      { "id": "soc-wa-sy", "platform": "WhatsApp Syria", "url": "https://wa.me/963967247787", "icon": "message-square", "type": "lucide" },
      { "id": "soc-in", "platform": "LinkedIn", "url": "https://www.linkedin.com/in/baselskaiker-9602601a9/", "icon": "linkedin", "type": "svg" },
      { "id": "soc-contact", "platform": "Direct Inquiry Form", "url": "#contact", "icon": "send", "type": "lucide" }
    ]
  },
  "sections": [
    {
      "id": "about",
      "enabled": true,
      "navTitle": "About & CV",
      "heading": "About & Professional Vision",
      "layoutType": "RichTextAndCV",
      "leadParagraph": "I am a <strong>Python Backend & AI Developer</strong> currently based in <strong>Accra, Ghana</strong>. My engineering methodology is grounded in deep logical problem-solving, clean architectural modularity, and crafting AI applications that deliver tangible, positive human impact.",
      "paragraphs": [
        "Rather than treating backend development as superficial glue code, I specialize in engineering resilient server infrastructures using <strong>FastAPI</strong>, <strong>SQLAlchemy 2.0 ORM</strong>, and <strong>Asyncio</strong>. In artificial intelligence, I design multi-agent chains with <strong>Google ADK</strong> and enforce strict schema boundary validation using <strong>Pydantic V2</strong> and Enums to completely eliminate hallucinations."
      ],
      "bilingual": {
        "arabic": { "title": "Arabic (العربية)", "desc": "Native Language — لغة أم، تواصل فوري وصياغة دقيقة." },
        "english": { "title": "English (Technical B1)", "desc": "Strong reading & writing proficiency for documentation, PR reviews, and technical collaboration." }
      },
      "cvCard": {
        "title": "Verified Official Curriculum Vitae",
        "subtitle": "Full breakdown of backend engineering milestones, academic background, and technical projects.",
        "viewUrl": "static/public/cv.pdf",
        "downloadUrl": "static/public/cv.pdf",
        "downloadFileName": "Basel_Skayker_CV.pdf"
      }
    },
    {
      "id": "skills",
      "enabled": true,
      "navTitle": "Technical Skills",
      "heading": "Technical Skills & Architecture",
      "intro": "Specialized technical competencies categorized by engineering domains, focused on deterministic execution, concurrency, and clean data boundaries:",
      "layoutType": "SkillCategoriesGrid",
      "items": [
        {
          "id": "skill-cat-1",
          "title": "Backend & Concurrency",
          "icon": "server",
          "description": "High-throughput asynchronous systems, concurrent I/O handling, and resilient RESTful architectures.",
          "tags": ["Python (Expert)", "FastAPI", "Asyncio / Concurrency", "WebSockets", "RESTful APIs", "Starlette"]
        },
        {
          "id": "skill-cat-2",
          "title": "AI Architecture & Data Integrity",
          "icon": "cpu",
          "description": "Multi-agent generative pipelines with strict schema boundaries to guarantee predictable outputs.",
          "tags": ["Google ADK / SDK", "Pydantic V2", "Strict Enums", "Sequential Agent Chains", "Output Validation"]
        },
        {
          "id": "skill-cat-3",
          "title": "Database Management & ORM",
          "icon": "database",
          "description": "Relational schemas, connection pooling, non-blocking asynchronous queries, and generic repositories.",
          "tags": ["SQLAlchemy 2.0 ORM", "AsyncSession", "PostgreSQL", "SQLite", "Generic BaseRepository", "Alembic"]
        },
        {
          "id": "skill-cat-4",
          "title": "AI Governance & Ecosystem",
          "icon": "shield-check",
          "description": "Behavioral constitutions for LLMs (Gemini / Claude) to prevent hallucination, paired with modern developer workflows.",
          "tags": ["Gemini & Claude", "AI Constitutions", "Anti-Hallucination Guardrails", "VS Code", "GitHub", "Codeberg"]
        }
      ]
    },
    {
      "id": "services",
      "enabled": true,
      "navTitle": "Services & Value",
      "heading": "Services & Value Proposition",
      "intro": "What I deliver to companies, clients, and engineering teams with guaranteed engineering metrics:",
      "layoutType": "ServicesGrid",
      "items": [
        {
          "id": "srv-1",
          "number": "01",
          "title": "High-Performance FastAPI Backend Architecture",
          "icon": "zap",
          "description": "Design and implementation of non-blocking backend microservices with automatic OpenAPI interactive documentation, bulletproof authentication, and granular RBAC authorization.",
          "guarantee": "Sub-100ms response latencies, zero thread starvation, and comprehensive audit logging.",
          "tags": ["FastAPI", "Asyncio", "JWT / RBAC", "Audit Trail"]
        },
        {
          "id": "srv-2",
          "number": "02",
          "title": "Multi-Agent AI Systems & LLM Governance",
          "icon": "bot",
          "description": "Architecting multi-agent generative loops via Google ADK and leading LLMs (Gemini, Claude), constrained by strict behavioral constitutions and Pydantic validation barriers.",
          "guarantee": "Zero uncontrolled hallucinations, schema-compliant outputs, and graceful fallback handling.",
          "tags": ["Google ADK", "Pydantic V2", "Behavioral Guardrails"]
        },
        {
          "id": "srv-3",
          "number": "03",
          "title": "Database Architecture & SQLAlchemy Foundations",
          "icon": "layers",
          "description": "Establishing normalized relational schemas, non-blocking connection lifecycles, and generic base repository abstractions for PostgreSQL and SQLite.",
          "guarantee": "Zero N+1 query leaks, clean migration history via Alembic, and scalable domain isolation.",
          "tags": ["SQLAlchemy 2.0", "PostgreSQL", "BaseRepository"]
        },
        {
          "id": "srv-4",
          "number": "04",
          "title": "Python Technical Training & Mentorship",
          "icon": "graduation-cap",
          "description": "Structured engineering mentoring for developers and teams, progressing from algorithmic fundamentals and memory models to advanced asynchronous architectures.",
          "guarantee": "Transforming theoretical understanding into production-ready logical and modular code.",
          "tags": ["Python Mentorship", "Clean Architecture", "Code Reviews"]
        }
      ]
    },
    {
      "id": "projects",
      "enabled": true,
      "navTitle": "Projects & Experience",
      "heading": "Featured Projects & Experience",
      "intro": "A selection of flagship projects and roles showcasing hands-on leadership in backend systems, AI orchestration, and developer education:",
      "layoutType": "ProjectsAndTimeline",
      "items": [
        {
          "id": "proj-1",
          "title": "Child's Nest — AI Behavioral Modification Platform",
          "role": "Lead Full-Stack Developer",
          "period": "Flagship AI System",
          "description": "Engineered a multi-stage sequential agent system utilizing <strong>Google ADK</strong> to generate deeply personalized, interactive behavioral stories for children. Developed real-time WebSocket communication pipelines via <strong>FastAPI</strong> emulating a <em>Gemini Live</em> interaction loop, delivering instant feedback that actively shapes and reinforces positive child behaviors while adhering to rigorous safety guardrails.",
          "links": [
            { "label": "Architecture Case Study", "url": "#contact", "icon": "external-link" }
          ],
          "tags": ["Google ADK", "FastAPI", "WebSockets", "Gemini Live Pipeline", "Pydantic V2", "SQLAlchemy"]
        },
        {
          "id": "proj-2",
          "title": "FastAPI Base Foundation — Production Enterprise Starter",
          "role": "Core Architectural Initiative",
          "period": "Active Daily R&D",
          "description": "Architected a reusable enterprise backend foundation to standardize production FastAPI applications with zero code duplication. Incorporates a unified <code>BaseRepository</code> pattern with <strong>SQLAlchemy 2.0 AsyncSession</strong>, robust JWT authentication, role-based access control (RBAC), structured JSON audit logging, and strict domain-driven separation between <code>core</code> infrastructure and business <code>modules</code>.",
          "links": [
            { "label": "GitHub Profile", "url": "https://github.com/Ba-se-l", "icon": "github" }
          ],
          "tags": ["FastAPI", "SQLAlchemy 2.0", "Async PostgreSQL", "JWT / RBAC", "Pydantic V2", "Generic Repository"]
        },
        {
          "id": "proj-3",
          "title": "Python Instructor — Technical Leadership & Mentorship",
          "role": "Technical Leadership & Education",
          "period": "Knowledge Transfer",
          "description": "Conducted intensive technical training programs mentoring aspiring engineers in Python fundamentals, data structures, functional paradigms, and server concurrency. Instilled rigorous code-review habits, Google-style docstrings, structural typing, and clean architectural patterns to cultivate autonomous software engineers.",
          "links": [],
          "tags": ["Python 3.11+", "Data Structures", "System Architecture", "Mentorship", "Code Audits"]
        }
      ]
    }
  ],
  "contact": {
    "id": "contact",
    "navTitle": "Direct Contact",
    "heading": "Direct Contact & Instant Inquiry",
    "intro": "Have an engineering challenge, an ambitious AI project, or an open role? Reach out immediately via direct channels or send a structured inquiry below:",
    "email": "baselskaiker21@gmail.com",
    "whatsappPrimary": "+233592121895",
    "whatsappSecondary": "+963967247787",
    "channels": [
      {
        "id": "ch-wa-gh",
        "label": "Primary WhatsApp (Ghana)",
        "value": "+233 59 212 1895",
        "url": "https://wa.me/233592121895?text=Hello%20Basel%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
        "icon": "message-circle",
        "badge": "Instant Chat"
      },
      {
        "id": "ch-wa-sy",
        "label": "Secondary WhatsApp (Syria)",
        "value": "+963 967 247 787",
        "url": "https://wa.me/963967247787?text=Hello%20Basel%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.",
        "icon": "phone",
        "badge": "Direct Line"
      },
      {
        "id": "ch-email",
        "label": "Official Email",
        "value": "baselskaiker21@gmail.com",
        "url": "mailto:baselskaiker21@gmail.com",
        "icon": "mail",
        "badge": "One-Click Copy",
        "isCopy": true
      },
      {
        "id": "ch-github",
        "label": "GitHub Repository",
        "value": "github.com/Ba-se-l",
        "url": "https://github.com/Ba-se-l",
        "icon": "github",
        "badge": "Source Code"
      }
    ],
    "form": {
      "title": "Quick Serverless Inquiry",
      "subtitle": "Fill in your requirements; submit directly through WhatsApp or Email without any server dependencies.",
      "serviceOptions": [
        "FastAPI Backend Development",
        "Multi-Agent AI Systems & LLM Governance",
        "Database Architecture & SQLAlchemy",
        "Python Technical Mentorship",
        "Full-Time / Contract Role",
        "General Technical Consultation"
      ]
    }
  },
  "footer": {
    "text": "Architected & Crafted by <strong>Basel Skayker</strong>. Built strictly with standard <strong>HTML5</strong>, <strong>CSS3</strong>, and <strong>Vanilla JavaScript</strong>.",
    "subtext": "Deep Dark Navy & Mint Emerald Palette &bull; Fully Fluid Responsive via <code>clamp()</code> &bull; Zero Bloat."
  }
};

/**
 * HTML Context Escaping and Sanitization Helpers
 */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeUrl(url) {
  if (typeof url !== "string") return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("#") || trimmed.startsWith("static/public/") || trimmed.startsWith("./static/public/")) {
    if (trimmed.includes("..") || trimmed.includes("\\")) return "#";
    return trimmed;
  }
  try {
    const parsed = new URL(trimmed, window.location.origin);
    if (["https:", "mailto:", "tel:"].includes(parsed.protocol)) {
      return trimmed;
    }
  } catch (e) {}
  return "#";
}

function sanitizeRichHtml(str) {
  if (typeof str !== "string") return "";
  const escaped = escapeHtml(str);
  return escaped
    .replace(/&lt;strong&gt;/g, "<strong>")
    .replace(/&lt;\/strong&gt;/g, "</strong>")
    .replace(/&lt;em&gt;/g, "<em>")
    .replace(/&lt;\/em&gt;/g, "</em>")
    .replace(/&lt;code&gt;/g, "<code>")
    .replace(/&lt;\/code&gt;/g, "</code>")
    .replace(/&bull;/g, "&bull;");
}

/**
 * Main Portfolio Renderer Engine
 */
class PortfolioRenderer {
  constructor() {
    this.data = null;
    this.isPreviewMode = false;
  }

  /**
   * Load data from Draft (if preview mode) or fetch JSON with fallback
   */
  async loadData() {
    const urlParams = new URLSearchParams(window.location.search);
    this.isPreviewMode = urlParams.get("preview") === "true";

    if (this.isPreviewMode) {
      try {
        const draft = localStorage.getItem("portfolio_studio_draft");
        if (draft) {
          this.data = JSON.parse(draft);
          const banner = document.getElementById("preview-banner");
          if (banner) banner.removeAttribute("hidden");
          return;
        }
      } catch (err) {
        console.warn("Failed to load draft from localStorage, falling back to data file.", err);
      }
    }

    try {
      const response = await fetch("./data/portfolio-data.json", { cache: "no-cache" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} when fetching portfolio-data.json`);
      }
      this.data = await response.json();
    } catch (err) {
      console.warn("Falling back to embedded portfolio data due to fetch error:", err);
      this.data = FALLBACK_PORTFOLIO_DATA;
    }
  }

  /**
   * Determine tech pill styling class
   */
  getPillClass(tag) {
    const lower = tag.toLowerCase();
    if (lower.includes("expert") || lower.includes("python") || lower.includes("fastapi") || lower.includes("constitution")) {
      return "pill-accent";
    }
    if (lower.includes("google") || lower.includes("adk") || lower.includes("pydantic") || lower.includes("gemini") || lower.includes("claude")) {
      return "pill-cyan";
    }
    return "";
  }

  /**
   * Render SVG icons for platforms not in standard Lucide (GitHub, LinkedIn)
   */
  renderSocialIcon(item) {
    if (item.icon === "github") {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
    }
    if (item.icon === "linkedin") {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
    }
    return `<i data-lucide="${item.icon}"></i>`;
  }

  /**
   * Render Sticky Sidebar (Profile + Scroll-Spy Nav + Social Links)
   */
  renderSidebar() {
    const sidebar = document.getElementById("sidebar-container");
    if (!sidebar) return;

    const p = this.data.profile;
    const activeSections = (this.data.sections || []).filter(s => s.enabled !== false);

    // Primary Action Buttons
    const actionsHtml = (p.primaryActions || []).map(act => `
      <a href="${act.url}" ${act.external ? 'target="_blank" rel="noopener"' : ''} class="btn ${act.style || 'btn-primary'}" id="${act.id}">
        <i data-lucide="${act.icon}"></i>
        <span>${act.label}</span>
      </a>
    `).join("");

    // Scroll-Spy Section Navigation
    let navIndex = 1;
    let navLinksHtml = activeSections.map((sec, idx) => {
      const numStr = String(navIndex++).padStart(2, "0") + ".";
      const isFirst = idx === 0;
      return `
        <a href="#${sec.id}" class="nav-link ${isFirst ? 'active' : ''}">
          <span class="nav-line"></span>
          <span class="nav-number">${numStr}</span>
          <span class="nav-text">${sec.navTitle || sec.heading}</span>
        </a>
      `;
    }).join("");

    // Append Contact to Scroll-Spy Nav
    const contactNum = String(navIndex).padStart(2, "0") + ".";
    const contactNavTitle = this.data.contact?.navTitle || "Direct Contact";
    navLinksHtml += `
      <a href="#contact" class="nav-link">
        <span class="nav-line"></span>
        <span class="nav-number">${contactNum}</span>
        <span class="nav-text">${contactNavTitle}</span>
      </a>
    `;

    // Social Bar
    const socialHtml = (p.socialLinks || []).map(soc => `
      <a href="${soc.url}" ${soc.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ''} aria-label="${soc.platform}" class="social-icon">
        ${this.renderSocialIcon(soc)}
      </a>
    `).join("");

    sidebar.innerHTML = `
      <div class="sidebar-top">
        <div class="profile-header">
          <div class="avatar-frame">
            <img 
              src="${p.avatarUrl}" 
              alt="${p.fullName} - ${p.headline}" 
              class="profile-img"
              loading="eager"
            />
          </div>
          <div class="status-pill">
            <span class="status-dot"></span>
            <span>${p.statusBadge}</span>
          </div>
        </div>

        <h1 class="dev-name">${p.fullName}</h1>
        <h2 class="dev-title">${p.headline}</h2>
        
        <div class="location-badge">
          <i data-lucide="map-pin"></i>
          <span>${p.location}</span>
          <span class="utc-tag">${p.utcTag || 'UTC+0'}</span>
        </div>

        <p class="tagline">${p.shortBio}</p>

        <div class="hero-actions">
          ${actionsHtml}
        </div>

        <nav class="section-nav" aria-label="In-page jump links">
          ${navLinksHtml}
        </nav>
      </div>

      <div class="sidebar-bottom">
        <div class="social-links">
          ${socialHtml}
        </div>
      </div>
    `;
  }

  /**
   * Render Section Content according to layoutType
   */
  renderSectionBody(sec) {
    const layout = sec.layoutType || "CustomCardsGrid";

    // 1. RichTextAndCV Layout (About Section)
    if (layout === "RichTextAndCV") {
      const paragraphsHtml = (sec.paragraphs || []).map(para => `<p>${para}</p>`).join("");
      const leadHtml = sec.leadParagraph ? `<p class="lead-text">${sec.leadParagraph}</p>` : "";

      let bilingualHtml = "";
      if (sec.bilingual) {
        bilingualHtml = `
          <div class="bilingual-card">
            <div class="lang-item">
              <span class="lang-title"><i data-lucide="globe"></i> ${sec.bilingual.arabic?.title || "Arabic"}</span>
              <span class="lang-desc">${sec.bilingual.arabic?.desc || ""}</span>
            </div>
            <div class="lang-divider"></div>
            <div class="lang-item">
              <span class="lang-title"><i data-lucide="check-circle-2"></i> ${sec.bilingual.english?.title || "English"}</span>
              <span class="lang-desc">${sec.bilingual.english?.desc || ""}</span>
            </div>
          </div>
        `;
      }

      let cvHtml = "";
      if (sec.cvCard) {
        const cv = sec.cvCard;
        cvHtml = `
          <div class="cv-highlight-card">
            <div class="cv-info">
              <div class="cv-icon"><i data-lucide="file-check"></i></div>
              <div>
                <h3 class="cv-title">${cv.title}</h3>
                <p class="cv-subtitle">${cv.subtitle}</p>
              </div>
            </div>
            <div class="cv-actions">
              <a href="${cv.viewUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
                <i data-lucide="external-link"></i>
                <span>Open CV (PDF)</span>
              </a>
              <a href="${cv.downloadUrl}" download="${cv.downloadFileName || 'Basel_Skayker_CV.pdf'}" class="btn btn-outline btn-sm">
                <i data-lucide="download"></i>
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        `;
      }

      return `
        <div class="section-body">
          ${leadHtml}
          ${paragraphsHtml}
          ${bilingualHtml}
          ${cvHtml}
        </div>
      `;
    }

    // 2. SkillCategoriesGrid Layout
    if (layout === "SkillCategoriesGrid") {
      const cardsHtml = (sec.items || []).map(item => {
        const tagsHtml = (item.tags || []).map(t => {
          const cls = this.getPillClass(t);
          return `<span class="tech-pill ${cls}">${t}</span>`;
        }).join("");

        return `
          <article class="skill-card">
            <div class="skill-icon-header">
              <div class="icon-box"><i data-lucide="${item.icon || 'server'}"></i></div>
              <h3 class="skill-title">${item.title}</h3>
            </div>
            <p class="skill-desc">${item.description || ''}</p>
            <div class="tech-pills">
              ${tagsHtml}
            </div>
          </article>
        `;
      }).join("");

      return `<div class="skills-grid">${cardsHtml}</div>`;
    }

    // 3. ServicesGrid Layout
    if (layout === "ServicesGrid") {
      const servicesHtml = (sec.items || []).map((srv, idx) => {
        const num = srv.number || String(idx + 1).padStart(2, "0");
        const tagsHtml = (srv.tags || []).map(t => `<span class="tech-pill ${this.getPillClass(t)}">${t}</span>`).join("");
        
        let guaranteeHtml = "";
        if (srv.guarantee) {
          guaranteeHtml = `
            <div class="guarantee-box">
              <span class="guarantee-label">Guaranteed Deliverable:</span>
              <span class="guarantee-text">${srv.guarantee}</span>
            </div>
          `;
        }

        return `
          <article class="service-card">
            <div class="service-top">
              <span class="service-number">${num}</span>
              <i data-lucide="${srv.icon || 'zap'}" class="service-icon"></i>
            </div>
            <h3 class="service-title">${srv.title}</h3>
            <p class="service-desc">${srv.description || ''}</p>
            ${guaranteeHtml}
            <div class="tech-pills">
              ${tagsHtml}
            </div>
          </article>
        `;
      }).join("");

      return `<div class="services-grid">${servicesHtml}</div>`;
    }

    // 4. ProjectsAndTimeline Layout (Brittany Chiang group dimming container)
    if (layout === "ProjectsAndTimeline") {
      const projectsHtml = (sec.items || []).map(proj => {
        const tagsHtml = (proj.tags || []).map(t => `<span class="tech-pill ${this.getPillClass(t)}">${t}</span>`).join("");
        
        let linksHtml = "";
        if (proj.links && proj.links.length > 0) {
          linksHtml = `
            <div class="project-links">
              ${proj.links.map(l => `
                <a href="${l.url}" ${l.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ''} class="project-link-item">
                  <i data-lucide="${l.icon || 'external-link'}"></i>
                  <span>${l.label}</span>
                </a>
              `).join("")}
            </div>
          `;
        }

        return `
          <article class="card project-card">
            <div class="project-header">
              <div class="project-meta">
                ${proj.role ? `<span class="project-timeline">${proj.role}</span>` : ''}
                <h3 class="project-title">${proj.title}</h3>
              </div>
            </div>
            <p class="project-body">${proj.description || ''}</p>
            ${linksHtml}
            <div class="tech-pills">
              ${tagsHtml}
            </div>
          </article>
        `;
      }).join("");

      return `<div class="cards-list">${projectsHtml}</div>`;
    }

    // 5. CustomCardsGrid (Generic cards for articles, certifications, open source, etc.)
    const customCardsHtml = (sec.items || []).map(item => {
      const tagsHtml = (item.tags || []).map(t => `<span class="tech-pill ${this.getPillClass(t)}">${t}</span>`).join("");
      
      let linksHtml = "";
      if (item.links && item.links.length > 0) {
        linksHtml = `
          <div class="project-links">
            ${item.links.map(l => `
              <a href="${l.url}" ${l.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ''} class="project-link-item">
                <i data-lucide="${l.icon || 'external-link'}"></i>
                <span>${l.label}</span>
              </a>
            `).join("")}
          </div>
        `;
      }

      return `
        <article class="custom-card">
          <div class="custom-card-header">
            <h3 class="custom-card-title">${item.title}</h3>
            ${item.badge ? `<span class="custom-card-badge">${item.badge}</span>` : ''}
          </div>
          ${item.subtitle ? `<div class="custom-card-subtitle">${item.subtitle}</div>` : ''}
          ${item.description ? `<p class="custom-card-desc">${item.description}</p>` : ''}
          ${linksHtml}
          ${tagsHtml ? `<div class="tech-pills">${tagsHtml}</div>` : ''}
        </article>
      `;
    }).join("");

    return `<div class="custom-cards-grid">${customCardsHtml}</div>`;
  }

  /**
   * Render Direct Contact Section
   */
  renderContactSection(contactNum) {
    const c = this.data.contact || {};
    const channels = c.channels || [];
    const form = c.form || {};

    const channelsHtml = channels.map(ch => {
      if (ch.isCopy) {
        return `
          <div class="contact-channel-card email-card">
            <div class="channel-icon"><i data-lucide="${ch.icon || 'mail'}"></i></div>
            <div class="channel-info">
              <span class="channel-label">${ch.label}</span>
              <a href="${ch.url}" class="channel-val email-link">${ch.value}</a>
            </div>
            <button type="button" id="copy-email-btn" class="btn btn-outline btn-sm copy-btn" title="Copy email address to clipboard">
              <i data-lucide="copy"></i>
              <span id="copy-btn-text">Copy</span>
            </button>
          </div>
        `;
      }

      return `
        <a href="${ch.url}" ${ch.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ''} class="contact-channel-card">
          <div class="channel-icon">${this.renderSocialIcon(ch)}</div>
          <div class="channel-info">
            <span class="channel-label">${ch.label}</span>
            <span class="channel-val">${ch.value}</span>
          </div>
          <i data-lucide="arrow-up-right" class="channel-arrow"></i>
        </a>
      `;
    }).join("");

    const optionsHtml = (form.serviceOptions || [
      "FastAPI Backend Development",
      "Multi-Agent AI Systems & LLM Governance",
      "Database Architecture & SQLAlchemy",
      "Python Technical Mentorship",
      "Full-Time / Contract Role",
      "General Technical Consultation"
    ]).map(opt => `<option value="${opt}">${opt}</option>`).join("");

    return `
      <section id="${c.id || 'contact'}" class="content-section">
        <div class="section-header">
          <span class="section-num">${contactNum}</span>
          <h2 class="section-heading">${c.heading || 'Direct Contact & Instant Inquiry'}</h2>
        </div>

        ${c.intro ? `<p class="section-intro">${c.intro}</p>` : ''}

        <div class="contact-channels-grid">
          ${channelsHtml}
        </div>

        <div class="inquiry-box">
          <div class="inquiry-header">
            <i data-lucide="send"></i>
            <div>
              <h3 class="inquiry-title">${form.title || 'Quick Serverless Inquiry'}</h3>
              <p class="inquiry-subtitle">${form.subtitle || 'Fill in your requirements; submit directly through WhatsApp or Email without any server dependencies.'}</p>
            </div>
          </div>

          <form id="quick-contact-form" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="visitor-name">Your Name</label>
                <input type="text" id="visitor-name" placeholder="e.g. John Doe" required />
              </div>

              <div class="form-group">
                <label for="visitor-service">Service Needed</label>
                <select id="visitor-service" required>
                  ${optionsHtml}
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="visitor-message">Project Brief / Message</label>
              <textarea id="visitor-message" rows="4" placeholder="Briefly describe your objectives, architecture needs, or timeline..." required></textarea>
            </div>

            <div class="form-actions">
              <button type="submit" id="send-whatsapp-btn" class="btn btn-primary">
                <i data-lucide="message-circle"></i>
                <span>Send via WhatsApp</span>
              </button>
              <button type="button" id="send-email-btn" class="btn btn-outline">
                <i data-lucide="mail"></i>
                <span>Send via Email</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  /**
   * Render Site Footer
   */
  renderFooter() {
    const f = this.data.footer || {};
    return `
      <footer class="site-footer">
        <p>${f.text || 'Architected & Crafted by <strong>Basel Skayker</strong>.'}</p>
        <p class="footer-sub">${f.subtext || 'Deep Dark Navy & Mint Emerald Palette • Zero Bloat.'}</p>
      </footer>
    `;
  }

  /**
   * Main Sections Renderer
   */
  renderSections() {
    const container = document.getElementById("main-sections-container");
    if (!container) return;

    const activeSections = (this.data.sections || []).filter(s => s.enabled !== false);
    let sectionIdx = 1;

    let html = activeSections.map(sec => {
      const numStr = String(sectionIdx++).padStart(2, "0") + ".";
      const introHtml = sec.intro ? `<p class="section-intro">${sec.intro}</p>` : "";
      const bodyHtml = this.renderSectionBody(sec);

      return `
        <section id="${sec.id}" class="content-section">
          <div class="section-header">
            <span class="section-num">${numStr}</span>
            <h2 class="section-heading">${sec.heading}</h2>
          </div>
          ${introHtml}
          ${bodyHtml}
        </section>
      `;
    }).join("");

    // Render Contact Section
    const contactNumStr = String(sectionIdx).padStart(2, "0") + ".";
    html += this.renderContactSection(contactNumStr);

    // Render Footer
    html += this.renderFooter();

    container.innerHTML = html;
  }

  /**
   * Rebind all browser interactions (Icons, Spotlight, Scroll-Spy, Copy, Form)
   */
  bindInteractions() {
    // 1. Lucide Icons
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }

    // 2. Cursor Spotlight (RAF throttled)
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isTicking = false;

    const updateSpotlight = () => {
      document.documentElement.style.setProperty("--mouse-x", `${mouseX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${mouseY}px`);
      isTicking = false;
    };

    window.addEventListener(
      "mousemove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if (!isTicking) {
          requestAnimationFrame(updateSpotlight);
          isTicking = true;
        }
      },
      { passive: true }
    );

    // 3. Scroll-Spy Navigation (IntersectionObserver)
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".section-nav .nav-link");

    if (sections.length > 0 && navLinks.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.2, 0.5, 0.8]
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              const href = link.getAttribute("href");
              const isActive = href === `#${sectionId}`;
              link.classList.toggle("active", isActive);
              if (isActive) {
                link.setAttribute("aria-current", "page");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach((section) => sectionObserver.observe(section));
    }

    // 4. One-Click Clipboard Email Copy
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const copyBtnText = document.getElementById("copy-btn-text");
    const emailAddress = this.data.contact?.email || "baselskaiker21@gmail.com";

    if (copyEmailBtn) {
      copyEmailBtn.addEventListener("click", async () => {
        try {
          let copied = false;
          if (navigator.clipboard && window.isSecureContext) {
            try {
              await navigator.clipboard.writeText(emailAddress);
              copied = true;
            } catch (clipErr) {
              // Fallback to execCommand if clipboard API permission denied
            }
          }

          if (!copied) {
            const tempTextArea = document.createElement("textarea");
            tempTextArea.value = emailAddress;
            tempTextArea.style.position = "fixed";
            tempTextArea.style.opacity = "0";
            document.body.appendChild(tempTextArea);
            tempTextArea.focus();
            tempTextArea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextArea);
          }

          const originalText = copyBtnText ? copyBtnText.innerText : "Copy";
          if (copyBtnText) copyBtnText.innerText = "Copied! ✓";
          copyEmailBtn.classList.add("btn-primary");
          copyEmailBtn.classList.remove("btn-outline");

          setTimeout(() => {
            if (copyBtnText) copyBtnText.innerText = originalText;
            copyEmailBtn.classList.remove("btn-primary");
            copyEmailBtn.classList.add("btn-outline");
          }, 2200);
        } catch (err) {
          console.error("Clipboard copy failed:", err);
        }
      });
    }

    // 5. Serverless Dual-Action Form (WhatsApp & Email Direct Dispatch)
    const contactForm = document.getElementById("quick-contact-form");
    const sendEmailBtn = document.getElementById("send-email-btn");
    const whatsappNumber = (this.data.contact?.whatsappPrimary || "233592121895").replace(/[^0-9]/g, "");

    const getFormData = () => {
      const nameEl = document.getElementById("visitor-name");
      const serviceEl = document.getElementById("visitor-service");
      const messageEl = document.getElementById("visitor-message");

      const name = nameEl ? nameEl.value.trim() : "";
      const service = serviceEl ? serviceEl.value : "";
      const message = messageEl ? messageEl.value.trim() : "";

      if (!name || !message) {
        if (!name && nameEl) nameEl.focus();
        else if (!message && messageEl) messageEl.focus();
        return null;
      }

      return { name, service, message };
    };

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = getFormData();
        if (!data) return;

        const formattedText = 
`Hello Basel,
My name is: ${data.name}
Service Needed: ${data.service}

Message:
${data.message}

— Sent from your developer portfolio`;

        const targetUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedText)}`;
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      });
    }

    if (sendEmailBtn) {
      sendEmailBtn.addEventListener("click", () => {
        const data = getFormData();
        if (!data) return;

        const subject = encodeURIComponent(`Portfolio Inquiry: ${data.service} — ${data.name}`);
        const body = encodeURIComponent(
`Hi Basel,

Name: ${data.name}
Service Needed: ${data.service}

Project Details:
${data.message}

Best regards,
${data.name}`
        );

        const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;
      });
    }
  }

  /**
   * Orchestrate execution
   */
  async init() {
    await this.loadData();
    this.renderSidebar();
    this.renderSections();
    this.bindInteractions();
  }
}

// Instantiate and run once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const engine = new PortfolioRenderer();
  engine.init();
});
