/**
 * ==========================================================================
 * BASEL SKAYKER — PORTFOLIO STUDIO CMS RUNTIME ENGINE
 * Pure Vanilla JavaScript — High Performance Visual Content Studio
 * 
 * Features:
 * 1. Reactive State Management (In-Memory + Draft Cache in localStorage)
 * 2. Visual Dynamic Sections Manager (Add, Reorder, Enable/Disable, Delete)
 * 3. Layout-Aware Items CRUD Editor (Tags chips, Links, Guarantees, Highlights)
 * 4. Triple Save & Sync Engine:
 *    - Cloud Direct Sync: GitHub REST API Contents Endpoint (with UTF-8 Base64)
 *    - Local Disk Sync: File System Access API (showSaveFilePicker)
 *    - File I/O: Export / Import JSON
 * 5. Instant Live Preview Tab (via ?preview=true)
 * ==========================================================================
 */

"use strict";

class StudioCMS {
  constructor() {
    this.data = null;
    this.activeTab = "profile"; // "profile" | "contact" | "section_{id}"
    this.hasUnsavedChanges = false;
    this.localFileHandle = null;

    // Load GitHub Config from localStorage
    const savedGh = localStorage.getItem("portfolio_studio_gh_config");
    this.ghConfig = savedGh ? JSON.parse(savedGh) : {
      repo: "Ba-se-l/my-portfolio",
      branch: "dev",
      token: "",
      commitMsg: "Update portfolio-data.json via Portfolio Studio CMS"
    };
  }

  /**
   * Initialize Studio: Load data, setup listeners, render UI
   */
  async init() {
    await this.loadInitialData();
    this.initGlobalEventListeners();
    this.renderSidebarNav();
    this.renderActiveCanvas();
    this.refreshIcons();
  }

  /**
   * Load data from draft or local portfolio-data.json
   */
  async loadInitialData() {
    // 1. Try local draft
    const draft = localStorage.getItem("portfolio_studio_draft");
    if (draft) {
      try {
        this.data = JSON.parse(draft);
        this.markUnsaved(true);
        return;
      } catch (e) {
        console.warn("Corrupted draft in localStorage, loading data file instead.");
      }
    }

    // 2. Fetch data/portfolio-data.json
    try {
      const res = await fetch("./data/portfolio-data.json", { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.data = await res.json();
      this.markUnsaved(false);
    } catch (err) {
      console.error("Failed to load portfolio-data.json:", err);
      this.showToast("Could not load data file. Initializing default template.", true);
      this.data = { meta: { version: "2.0.0" }, profile: {}, sections: [], contact: {} };
    }
  }

  /**
   * Mark unsaved state and update visual indicator
   */
  markUnsaved(isUnsaved = true) {
    this.hasUnsavedChanges = isUnsaved;
    const statusEl = document.getElementById("sync-status");
    const statusText = document.getElementById("sync-status-text");

    if (this.hasUnsavedChanges) {
      if (statusEl) statusEl.classList.add("unsaved");
      if (statusText) statusText.innerText = "Unsaved Changes";
      // Auto cache draft to localStorage
      if (this.data) {
        localStorage.setItem("portfolio_studio_draft", JSON.stringify(this.data));
      }
    } else {
      if (statusEl) statusEl.classList.remove("unsaved");
      if (statusText) statusText.innerText = "All Changes Synced";
    }
  }

  /**
   * Re-instantiate Lucide icons
   */
  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  /**
   * Show animated Toast notification
   */
  showToast(message, isError = false) {
    const toast = document.getElementById("studio-toast");
    const toastMsg = document.getElementById("toast-message");
    const toastIcon = document.getElementById("toast-icon");
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.toggle("toast-error", isError);
    if (toastIcon) {
      toastIcon.setAttribute("data-lucide", isError ? "alert-triangle" : "check-circle");
    }
    toast.removeAttribute("hidden");
    this.refreshIcons();

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.setAttribute("hidden", "true");
    }, 3800);
  }

  /**
   * Render Sidebar Navigation (Tabs and Sections list)
   */
  renderSidebarNav() {
    const sectionsList = document.getElementById("sections-nav-list");
    const countBadge = document.getElementById("sections-count");
    if (!sectionsList) return;

    const sections = this.data.sections || [];
    if (countBadge) countBadge.innerText = sections.length;

    // Active tab button styling
    const profileBtn = document.getElementById("nav-btn-profile");
    const contactBtn = document.getElementById("nav-btn-contact");
    if (profileBtn) profileBtn.classList.toggle("active", this.activeTab === "profile");
    if (contactBtn) contactBtn.classList.toggle("active", this.activeTab === "contact");

    // Sections list
    sectionsList.innerHTML = sections.map((sec, idx) => {
      const isSelected = this.activeTab === `section_${sec.id}`;
      const isEnabled = sec.enabled !== false;
      const numStr = String(idx + 1).padStart(2, "0");

      return `
        <div class="section-nav-card ${isSelected ? 'active' : ''}">
          <button type="button" class="sec-title-btn" data-sec-id="${sec.id}">
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-green);">${numStr}.</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${sec.navTitle || sec.heading || sec.id}</span>
          </button>
          
          <div class="sec-controls">
            <button type="button" class="btn btn-secondary btn-icon-only btn-sm sec-move-up" data-idx="${idx}" title="Move Up" ${idx === 0 ? 'disabled style="opacity: 0.3;"' : ''}>
              <i data-lucide="chevron-up"></i>
            </button>
            <button type="button" class="btn btn-secondary btn-icon-only btn-sm sec-move-down" data-idx="${idx}" title="Move Down" ${idx === sections.length - 1 ? 'disabled style="opacity: 0.3;"' : ''}>
              <i data-lucide="chevron-down"></i>
            </button>
            <button type="button" class="btn btn-secondary btn-icon-only btn-sm sec-toggle" data-idx="${idx}" title="${isEnabled ? 'Visible (Click to Hide)' : 'Hidden (Click to Show)'}">
              <i data-lucide="${isEnabled ? 'eye' : 'eye-off'}" style="${isEnabled ? 'color: var(--accent-green);' : 'color: var(--text-muted);'}"></i>
            </button>
            <button type="button" class="btn btn-danger btn-icon-only btn-sm sec-delete" data-idx="${idx}" title="Delete Section">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      `;
    }).join("");

    this.bindSidebarEvents();
    this.refreshIcons();
  }

  /**
   * Bind event listeners inside Sidebar
   */
  bindSidebarEvents() {
    // Select section
    document.querySelectorAll(".sec-title-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const secId = btn.getAttribute("data-sec-id");
        this.activeTab = `section_${secId}`;
        this.renderSidebarNav();
        this.renderActiveCanvas();
      });
    });

    // Move Section Up
    document.querySelectorAll(".sec-move-up").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        if (idx > 0) {
          const temp = this.data.sections[idx];
          this.data.sections[idx] = this.data.sections[idx - 1];
          this.data.sections[idx - 1] = temp;
          this.markUnsaved(true);
          this.renderSidebarNav();
          this.renderActiveCanvas();
        }
      });
    });

    // Move Section Down
    document.querySelectorAll(".sec-move-down").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        if (idx < this.data.sections.length - 1) {
          const temp = this.data.sections[idx];
          this.data.sections[idx] = this.data.sections[idx + 1];
          this.data.sections[idx + 1] = temp;
          this.markUnsaved(true);
          this.renderSidebarNav();
          this.renderActiveCanvas();
        }
      });
    });

    // Toggle Section Enabled
    document.querySelectorAll(".sec-toggle").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        const current = this.data.sections[idx].enabled !== false;
        this.data.sections[idx].enabled = !current;
        this.markUnsaved(true);
        this.renderSidebarNav();
        this.renderActiveCanvas();
      });
    });

    // Delete Section
    document.querySelectorAll(".sec-delete").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        const sec = this.data.sections[idx];
        const confirmDelete = window.confirm(`Are you sure you want to delete section "${sec.navTitle || sec.id}"?`);
        if (confirmDelete) {
          this.data.sections.splice(idx, 1);
          if (this.activeTab === `section_${sec.id}`) {
            this.activeTab = "profile";
          }
          this.markUnsaved(true);
          this.renderSidebarNav();
          this.renderActiveCanvas();
          this.showToast(`Section "${sec.navTitle || sec.id}" deleted.`);
        }
      });
    });
  }

  /**
   * Render Active Canvas according to activeTab
   */
  renderActiveCanvas() {
    const canvas = document.getElementById("canvas-container");
    if (!canvas) return;

    if (this.activeTab === "profile") {
      canvas.innerHTML = this.renderProfileEditor();
      this.bindProfileEditorEvents();
    } else if (this.activeTab === "contact") {
      canvas.innerHTML = this.renderContactEditor();
      this.bindContactEditorEvents();
    } else if (this.activeTab.startsWith("section_")) {
      const secId = this.activeTab.replace("section_", "");
      const sec = (this.data.sections || []).find(s => s.id === secId);
      if (sec) {
        canvas.innerHTML = this.renderSectionEditor(sec);
        this.bindSectionEditorEvents(sec);
      } else {
        canvas.innerHTML = `<div style="text-align: center; padding: 3rem;">Section not found.</div>`;
      }
    }

    this.refreshIcons();
  }

  /**
   * 1. Profile & Identity Editor HTML
   */
  renderProfileEditor() {
    const p = this.data.profile || {};
    return `
      <div class="canvas-header">
        <h2 class="canvas-title"><i data-lucide="user-check"></i> Profile & Developer Identity</h2>
        <span class="studio-badge">Global Profile Tokens</span>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label>Full Developer Name</label>
          <input type="text" id="prof-name" value="${p.fullName || ''}" placeholder="e.g. Basel Skayker" />
        </div>

        <div class="form-group">
          <label>Professional Headline</label>
          <input type="text" id="prof-headline" value="${p.headline || ''}" placeholder="e.g. Python Backend & AI Developer" />
        </div>

        <div class="form-group">
          <label>Location</label>
          <input type="text" id="prof-location" value="${p.location || ''}" placeholder="e.g. Accra, Ghana" />
        </div>

        <div class="form-group">
          <label>Timezone Tag</label>
          <input type="text" id="prof-utc" value="${p.utcTag || 'UTC+0'}" placeholder="e.g. UTC+0" />
        </div>

        <div class="form-group">
          <label>Status Badge Text</label>
          <input type="text" id="prof-status" value="${p.statusBadge || ''}" placeholder="e.g. Available for Projects & Roles" />
        </div>

        <div class="form-group">
          <label>Profile Avatar Path</label>
          <input type="text" id="prof-avatar" value="${p.avatarUrl || 'static/public/my-image.jfif'}" />
        </div>

        <div class="form-group full-width">
          <label>Short Bio / Tagline</label>
          <textarea id="prof-bio" rows="3">${p.shortBio || ''}</textarea>
        </div>
      </div>

      <!-- Hero Actions (CV & WhatsApp) -->
      <div class="items-section-header">
        <h3 class="items-section-title"><i data-lucide="mouse-pointer-click"></i> Primary Hero CTAs</h3>
      </div>
      <div class="form-grid" style="margin-top: 1rem;">
        <div class="form-group">
          <label>CV Button Label</label>
          <input type="text" id="cta-cv-label" value="${p.primaryActions?.[0]?.label || 'View / Download CV'}" />
        </div>
        <div class="form-group">
          <label>CV File URL</label>
          <input type="text" id="cta-cv-url" value="${p.primaryActions?.[0]?.url || 'static/public/cv.pdf'}" />
        </div>
        <div class="form-group">
          <label>WhatsApp CTA Label</label>
          <input type="text" id="cta-wa-label" value="${p.primaryActions?.[1]?.label || 'WhatsApp Me'}" />
        </div>
        <div class="form-group">
          <label>WhatsApp CTA URL</label>
          <input type="text" id="cta-wa-url" value="${p.primaryActions?.[1]?.url || ''}" />
        </div>
      </div>
    `;
  }

  /**
   * Bind Profile Editor inputs
   */
  bindProfileEditorEvents() {
    const bindInput = (id, callback) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          callback(el.value);
          this.markUnsaved(true);
        });
      }
    };

    bindInput("prof-name", v => this.data.profile.fullName = v);
    bindInput("prof-headline", v => this.data.profile.headline = v);
    bindInput("prof-location", v => this.data.profile.location = v);
    bindInput("prof-utc", v => this.data.profile.utcTag = v);
    bindInput("prof-status", v => this.data.profile.statusBadge = v);
    bindInput("prof-avatar", v => this.data.profile.avatarUrl = v);
    bindInput("prof-bio", v => this.data.profile.shortBio = v);

    bindInput("cta-cv-label", v => {
      if (!this.data.profile.primaryActions) this.data.profile.primaryActions = [];
      if (!this.data.profile.primaryActions[0]) this.data.profile.primaryActions[0] = { id: "act-cv" };
      this.data.profile.primaryActions[0].label = v;
    });

    bindInput("cta-cv-url", v => {
      if (this.data.profile.primaryActions?.[0]) this.data.profile.primaryActions[0].url = v;
    });

    bindInput("cta-wa-label", v => {
      if (this.data.profile.primaryActions?.[1]) this.data.profile.primaryActions[1].label = v;
    });

    bindInput("cta-wa-url", v => {
      if (this.data.profile.primaryActions?.[1]) this.data.profile.primaryActions[1].url = v;
    });
  }

  /**
   * 2. Section Editor HTML (Metadata + Layout-specific Items)
   */
  renderSectionEditor(sec) {
    const isEnabled = sec.enabled !== false;
    const isRichText = sec.layoutType === "RichTextAndCV";

    return `
      <div class="canvas-header">
        <h2 class="canvas-title">
          <i data-lucide="layers"></i>
          <span>Section: ${sec.navTitle || sec.heading || sec.id}</span>
        </h2>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="studio-badge">${sec.layoutType || 'CustomCardsGrid'}</span>
        </div>
      </div>

      <!-- Section Core Metadata -->
      <div class="form-grid">
        <div class="form-group">
          <label>Section ID (Anchor)</label>
          <input type="text" id="sec-edit-id" value="${sec.id}" />
        </div>

        <div class="form-group">
          <label>Nav Title (Sidebar)</label>
          <input type="text" id="sec-edit-navtitle" value="${sec.navTitle || ''}" />
        </div>

        <div class="form-group full-width">
          <label>Main Section Heading</label>
          <input type="text" id="sec-edit-heading" value="${sec.heading || ''}" />
        </div>

        <div class="form-group full-width">
          <label>Section Introduction Paragraph (Optional)</label>
          <textarea id="sec-edit-intro" rows="2">${sec.intro || ''}</textarea>
        </div>

        <div class="form-group">
          <label>Layout Style Type</label>
          <select id="sec-edit-layout">
            <option value="SkillCategoriesGrid" ${sec.layoutType === 'SkillCategoriesGrid' ? 'selected' : ''}>SkillCategoriesGrid (Skills with Pills)</option>
            <option value="ServicesGrid" ${sec.layoutType === 'ServicesGrid' ? 'selected' : ''}>ServicesGrid (Services with Deliverables & Guarantees)</option>
            <option value="ProjectsAndTimeline" ${sec.layoutType === 'ProjectsAndTimeline' ? 'selected' : ''}>ProjectsAndTimeline (Cards with Dimming & Links)</option>
            <option value="CustomCardsGrid" ${sec.layoutType === 'CustomCardsGrid' ? 'selected' : ''}>CustomCardsGrid (Generic Cards)</option>
            <option value="RichTextAndCV" ${sec.layoutType === 'RichTextAndCV' ? 'selected' : ''}>RichTextAndCV (About & Highlights)</option>
          </select>
        </div>

        <div class="form-group" style="justify-content: center;">
          <label>Display Visibility</label>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.35rem;">
            <input type="checkbox" id="sec-edit-enabled" ${isEnabled ? 'checked' : ''} style="width: 20px; height: 20px;" />
            <span style="font-size: 0.85rem; color: var(--text-white);">Enable Section in Live Navigation</span>
          </div>
        </div>
      </div>

      <!-- Specific Section Editors -->
      ${isRichText ? this.renderRichTextSectionEditor(sec) : this.renderItemsGridSectionEditor(sec)}
    `;
  }

  /**
   * Rich Text & CV Section Editor
   */
  renderRichTextSectionEditor(sec) {
    return `
      <div class="items-section-header">
        <h3 class="items-section-title"><i data-lucide="file-text"></i> Paragraphs & Architectural Vision</h3>
      </div>

      <div class="form-group full-width" style="margin-top: 1rem;">
        <label>Lead Paragraph (Prominent Styling)</label>
        <textarea id="about-lead-para" rows="3">${sec.leadParagraph || ''}</textarea>
      </div>

      <div class="form-group full-width">
        <label>Body Paragraphs (One per line or separate blocks)</label>
        <textarea id="about-body-para" rows="5">${(sec.paragraphs || []).join("\n\n")}</textarea>
      </div>

      <div class="items-section-header">
        <h3 class="items-section-title"><i data-lucide="globe"></i> Bilingual Proficiency Card</h3>
      </div>

      <div class="form-grid" style="margin-top: 1rem;">
        <div class="form-group">
          <label>Arabic Language Title</label>
          <input type="text" id="lang-ar-title" value="${sec.bilingual?.arabic?.title || 'Arabic (العربية)'}" />
        </div>
        <div class="form-group">
          <label>Arabic Description</label>
          <input type="text" id="lang-ar-desc" value="${sec.bilingual?.arabic?.desc || ''}" />
        </div>
        <div class="form-group">
          <label>English Language Title</label>
          <input type="text" id="lang-en-title" value="${sec.bilingual?.english?.title || 'English (Technical B1)'}" />
        </div>
        <div class="form-group">
          <label>English Description</label>
          <input type="text" id="lang-en-desc" value="${sec.bilingual?.english?.desc || ''}" />
        </div>
      </div>
    `;
  }

  /**
   * Generic Items Grid Section Editor (Skills, Services, Projects, Custom)
   */
  renderItemsGridSectionEditor(sec) {
    const items = sec.items || [];
    const isService = sec.layoutType === "ServicesGrid";
    const isProject = sec.layoutType === "ProjectsAndTimeline";

    const itemsHtml = items.map((item, itemIdx) => {
      const tags = item.tags || [];
      const links = item.links || [];

      return `
        <div class="item-editor-card" data-item-idx="${itemIdx}">
          <div class="item-card-top">
            <div class="item-card-heading">
              <span style="color: var(--accent-green); font-family: var(--font-mono);">#${itemIdx + 1}</span>
              <span>${item.title || 'Untitled Item'}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.35rem;">
              <button type="button" class="btn btn-secondary btn-icon-only btn-sm item-move-up" data-idx="${itemIdx}" title="Move Up" ${itemIdx === 0 ? 'disabled style="opacity: 0.3;"' : ''}>
                <i data-lucide="chevron-up"></i>
              </button>
              <button type="button" class="btn btn-secondary btn-icon-only btn-sm item-move-down" data-idx="${itemIdx}" title="Move Down" ${itemIdx === items.length - 1 ? 'disabled style="opacity: 0.3;"' : ''}>
                <i data-lucide="chevron-down"></i>
              </button>
              <button type="button" class="btn btn-danger btn-icon-only btn-sm item-delete" data-idx="${itemIdx}" title="Delete Item">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="item-input-title" data-idx="${itemIdx}" value="${item.title || ''}" />
            </div>

            <div class="form-group">
              <label>Icon (Lucide name)</label>
              <input type="text" class="item-input-icon" data-idx="${itemIdx}" value="${item.icon || 'server'}" placeholder="e.g. server, zap, bot, cpu, database" />
            </div>

            ${isProject ? `
              <div class="form-group">
                <label>Role / Timeline</label>
                <input type="text" class="item-input-role" data-idx="${itemIdx}" value="${item.role || ''}" placeholder="e.g. Lead Full-Stack Developer" />
              </div>
            ` : ''}

            ${isService ? `
              <div class="form-group full-width">
                <label>Guaranteed Engineering Deliverable</label>
                <input type="text" class="item-input-guarantee" data-idx="${itemIdx}" value="${item.guarantee || ''}" placeholder="e.g. Sub-100ms response latencies, zero thread starvation" />
              </div>
            ` : ''}

            <div class="form-group full-width">
              <label>Description</label>
              <textarea class="item-input-desc" data-idx="${itemIdx}" rows="3">${item.description || ''}</textarea>
            </div>

            <!-- Tags / Tech Pills Editor -->
            <div class="form-group full-width">
              <label>Technology Pills / Tags (Type and press Enter to add)</label>
              <div class="tags-chip-container" data-item-idx="${itemIdx}">
                ${tags.map((tag, tIdx) => `
                  <span class="tag-chip">
                    <span>${tag}</span>
                    <button type="button" class="tag-delete-btn" data-item-idx="${itemIdx}" data-tag-idx="${tIdx}">
                      <i data-lucide="x" style="width: 12px; height: 12px;"></i>
                    </button>
                  </span>
                `).join("")}
                <input type="text" class="new-tag-input" data-item-idx="${itemIdx}" placeholder="+ Add tag (Enter)..." />
              </div>
            </div>

            <!-- Links Editor (for Projects) -->
            ${isProject ? `
              <div class="form-group full-width">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                  <label>Links & Case Studies</label>
                  <button type="button" class="btn btn-secondary btn-sm btn-add-link" data-item-idx="${itemIdx}">
                    <i data-lucide="plus"></i> Add Link
                  </button>
                </div>
                ${links.map((link, lIdx) => `
                  <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; align-items: center;">
                    <input type="text" class="link-label-input" data-item-idx="${itemIdx}" data-link-idx="${lIdx}" value="${link.label || ''}" placeholder="Label" style="width: 35%;" />
                    <input type="text" class="link-url-input" data-item-idx="${itemIdx}" data-link-idx="${lIdx}" value="${link.url || ''}" placeholder="URL" style="flex: 1;" />
                    <button type="button" class="btn btn-danger btn-icon-only btn-sm btn-del-link" data-item-idx="${itemIdx}" data-link-idx="${lIdx}">
                      <i data-lucide="trash-2"></i>
                    </button>
                  </div>
                `).join("")}
              </div>
            ` : ''}

          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="items-section-header">
        <h3 class="items-section-title"><i data-lucide="grid"></i> Cards & Component Items (${items.length})</h3>
        <button type="button" id="btn-add-item-card" class="btn btn-outline btn-sm">
          <i data-lucide="plus"></i>
          <span>Add New Card / Item</span>
        </button>
      </div>

      <div id="items-editor-list" style="margin-top: 1rem;">
        ${itemsHtml || '<div style="color: var(--text-muted); padding: 1.5rem; text-align: center;">No cards inside this section yet. Click "Add New Card / Item" to create one.</div>'}
      </div>
    `;
  }

  /**
   * Bind Section Editor events
   */
  bindSectionEditorEvents(sec) {
    const bindVal = (id, prop) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          sec[prop] = el.value;
          this.markUnsaved(true);
          if (prop === "navTitle") this.renderSidebarNav();
        });
      }
    };

    bindVal("sec-edit-id", "id");
    bindVal("sec-edit-navtitle", "navTitle");
    bindVal("sec-edit-heading", "heading");
    bindVal("sec-edit-intro", "intro");

    const layoutSelect = document.getElementById("sec-edit-layout");
    if (layoutSelect) {
      layoutSelect.addEventListener("change", () => {
        sec.layoutType = layoutSelect.value;
        this.markUnsaved(true);
        this.renderActiveCanvas();
      });
    }

    const enabledCheck = document.getElementById("sec-edit-enabled");
    if (enabledCheck) {
      enabledCheck.addEventListener("change", () => {
        sec.enabled = enabledCheck.checked;
        this.markUnsaved(true);
        this.renderSidebarNav();
      });
    }

    // Rich Text bindings
    if (sec.layoutType === "RichTextAndCV") {
      const leadEl = document.getElementById("about-lead-para");
      if (leadEl) {
        leadEl.addEventListener("input", () => {
          sec.leadParagraph = leadEl.value;
          this.markUnsaved(true);
        });
      }

      const bodyEl = document.getElementById("about-body-para");
      if (bodyEl) {
        bodyEl.addEventListener("input", () => {
          sec.paragraphs = bodyEl.value.split("\n\n").map(p => p.trim()).filter(Boolean);
          this.markUnsaved(true);
        });
      }

      const bindBilingual = (id, lang, field) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener("input", () => {
            if (!sec.bilingual) sec.bilingual = {};
            if (!sec.bilingual[lang]) sec.bilingual[lang] = {};
            sec.bilingual[lang][field] = el.value;
            this.markUnsaved(true);
          });
        }
      };

      bindBilingual("lang-ar-title", "arabic", "title");
      bindBilingual("lang-ar-desc", "arabic", "desc");
      bindBilingual("lang-en-title", "english", "title");
      bindBilingual("lang-en-desc", "english", "desc");
    }

    // Add item button
    const addItemBtn = document.getElementById("btn-add-item-card");
    if (addItemBtn) {
      addItemBtn.addEventListener("click", () => {
        if (!sec.items) sec.items = [];
        sec.items.push({
          id: `item-${Date.now()}`,
          title: "New Item Title",
          icon: "cpu",
          description: "Description of the new skill, service, or architecture project.",
          tags: ["Python", "FastAPI"]
        });
        this.markUnsaved(true);
        this.renderActiveCanvas();
      });
    }

    // Item field inputs
    document.querySelectorAll(".item-input-title").forEach(el => {
      el.addEventListener("input", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        sec.items[idx].title = el.value;
        this.markUnsaved(true);
      });
    });

    document.querySelectorAll(".item-input-icon").forEach(el => {
      el.addEventListener("input", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        sec.items[idx].icon = el.value;
        this.markUnsaved(true);
      });
    });

    document.querySelectorAll(".item-input-role").forEach(el => {
      el.addEventListener("input", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        sec.items[idx].role = el.value;
        this.markUnsaved(true);
      });
    });

    document.querySelectorAll(".item-input-guarantee").forEach(el => {
      el.addEventListener("input", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        sec.items[idx].guarantee = el.value;
        this.markUnsaved(true);
      });
    });

    document.querySelectorAll(".item-input-desc").forEach(el => {
      el.addEventListener("input", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        sec.items[idx].description = el.value;
        this.markUnsaved(true);
      });
    });

    // Item Move Up / Move Down / Delete
    document.querySelectorAll(".item-move-up").forEach(el => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        if (idx > 0) {
          const temp = sec.items[idx];
          sec.items[idx] = sec.items[idx - 1];
          sec.items[idx - 1] = temp;
          this.markUnsaved(true);
          this.renderActiveCanvas();
        }
      });
    });

    document.querySelectorAll(".item-move-down").forEach(el => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        if (idx < sec.items.length - 1) {
          const temp = sec.items[idx];
          sec.items[idx] = sec.items[idx + 1];
          sec.items[idx + 1] = temp;
          this.markUnsaved(true);
          this.renderActiveCanvas();
        }
      });
    });

    document.querySelectorAll(".item-delete").forEach(el => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        if (window.confirm("Delete this card item?")) {
          sec.items.splice(idx, 1);
          this.markUnsaved(true);
          this.renderActiveCanvas();
        }
      });
    });

    // Tag chip deletion & additions
    document.querySelectorAll(".tag-delete-btn").forEach(el => {
      el.addEventListener("click", () => {
        const itemIdx = parseInt(el.getAttribute("data-item-idx"), 10);
        const tagIdx = parseInt(el.getAttribute("data-tag-idx"), 10);
        sec.items[itemIdx].tags.splice(tagIdx, 1);
        this.markUnsaved(true);
        this.renderActiveCanvas();
      });
    });

    document.querySelectorAll(".new-tag-input").forEach(el => {
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && el.value.trim()) {
          e.preventDefault();
          const itemIdx = parseInt(el.getAttribute("data-item-idx"), 10);
          if (!sec.items[itemIdx].tags) sec.items[itemIdx].tags = [];
          sec.items[itemIdx].tags.push(el.value.trim());
          this.markUnsaved(true);
          this.renderActiveCanvas();
        }
      });
    });

    // Project links add/delete/edit
    document.querySelectorAll(".btn-add-link").forEach(btn => {
      btn.addEventListener("click", () => {
        const itemIdx = parseInt(btn.getAttribute("data-item-idx"), 10);
        if (!sec.items[itemIdx].links) sec.items[itemIdx].links = [];
        sec.items[itemIdx].links.push({ label: "GitHub Profile", url: "https://github.com/Ba-se-l", icon: "github" });
        this.markUnsaved(true);
        this.renderActiveCanvas();
      });
    });

    document.querySelectorAll(".link-label-input").forEach(el => {
      el.addEventListener("input", () => {
        const itemIdx = parseInt(el.getAttribute("data-item-idx"), 10);
        const linkIdx = parseInt(el.getAttribute("data-link-idx"), 10);
        sec.items[itemIdx].links[linkIdx].label = el.value;
        this.markUnsaved(true);
      });
    });

    document.querySelectorAll(".link-url-input").forEach(el => {
      el.addEventListener("input", () => {
        const itemIdx = parseInt(el.getAttribute("data-item-idx"), 10);
        const linkIdx = parseInt(el.getAttribute("data-link-idx"), 10);
        sec.items[itemIdx].links[linkIdx].url = el.value;
        this.markUnsaved(true);
      });
    });

    document.querySelectorAll(".btn-del-link").forEach(el => {
      el.addEventListener("click", () => {
        const itemIdx = parseInt(el.getAttribute("data-item-idx"), 10);
        const linkIdx = parseInt(el.getAttribute("data-link-idx"), 10);
        sec.items[itemIdx].links.splice(linkIdx, 1);
        this.markUnsaved(true);
        this.renderActiveCanvas();
      });
    });
  }

  /**
   * 3. Contact & Channels Editor HTML
   */
  renderContactEditor() {
    const c = this.data.contact || {};
    const channels = c.channels || [];
    const services = c.form?.serviceOptions || [];

    return `
      <div class="canvas-header">
        <h2 class="canvas-title"><i data-lucide="message-square"></i> Direct Outreach & Contact Channels</h2>
        <span class="studio-badge">Contact Module</span>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label>Section Heading</label>
          <input type="text" id="contact-heading" value="${c.heading || ''}" />
        </div>

        <div class="form-group">
          <label>Sidebar Nav Title</label>
          <input type="text" id="contact-navtitle" value="${c.navTitle || 'Direct Contact'}" />
        </div>

        <div class="form-group full-width">
          <label>Introductory Subtitle</label>
          <textarea id="contact-intro" rows="2">${c.intro || ''}</textarea>
        </div>

        <div class="form-group">
          <label>Official Email Address</label>
          <input type="email" id="contact-email" value="${c.email || ''}" />
        </div>

        <div class="form-group">
          <label>Primary WhatsApp (Ghana)</label>
          <input type="text" id="contact-wa-gh" value="${c.whatsappPrimary || ''}" />
        </div>

        <div class="form-group">
          <label>Secondary WhatsApp (Syria)</label>
          <input type="text" id="contact-wa-sy" value="${c.whatsappSecondary || ''}" />
        </div>
      </div>

      <div class="items-section-header">
        <h3 class="items-section-title"><i data-lucide="share-2"></i> Outreach Channels</h3>
      </div>

      <div style="margin-top: 1rem;">
        ${channels.map((ch, idx) => `
          <div class="form-grid" style="background-color: var(--bg-input); padding: 0.85rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem;">
            <div class="form-group">
              <label>Channel Label</label>
              <input type="text" class="channel-label-input" data-idx="${idx}" value="${ch.label || ''}" />
            </div>
            <div class="form-group">
              <label>Display Value</label>
              <input type="text" class="channel-val-input" data-idx="${idx}" value="${ch.value || ''}" />
            </div>
            <div class="form-group full-width">
              <label>Action URL</label>
              <input type="text" class="channel-url-input" data-idx="${idx}" value="${ch.url || ''}" />
            </div>
          </div>
        `).join("")}
      </div>

      <div class="items-section-header">
        <h3 class="items-section-title"><i data-lucide="list"></i> Inquiry Form Service Options</h3>
      </div>

      <div class="form-group full-width" style="margin-top: 1rem;">
        <label>Service Options (One per line)</label>
        <textarea id="contact-services-list" rows="5">${services.join("\n")}</textarea>
      </div>
    `;
  }

  /**
   * Bind Contact Editor events
   */
  bindContactEditorEvents() {
    const c = this.data.contact;
    const bindVal = (id, prop) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          c[prop] = el.value;
          this.markUnsaved(true);
        });
      }
    };

    bindVal("contact-heading", "heading");
    bindVal("contact-navtitle", "navTitle");
    bindVal("contact-intro", "intro");
    bindVal("contact-email", "email");
    bindVal("contact-wa-gh", "whatsappPrimary");
    bindVal("contact-wa-sy", "whatsappSecondary");

    // Channels inputs
    document.querySelectorAll(".channel-label-input").forEach(el => {
      el.addEventListener("input", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        c.channels[idx].label = el.value;
        this.markUnsaved(true);
      });
    });

    document.querySelectorAll(".channel-val-input").forEach(el => {
      el.addEventListener("input", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        c.channels[idx].value = el.value;
        this.markUnsaved(true);
      });
    });

    document.querySelectorAll(".channel-url-input").forEach(el => {
      el.addEventListener("input", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        c.channels[idx].url = el.value;
        this.markUnsaved(true);
      });
    });

    // Services options list
    const servEl = document.getElementById("contact-services-list");
    if (servEl) {
      servEl.addEventListener("input", () => {
        if (!c.form) c.form = {};
        c.form.serviceOptions = servEl.value.split("\n").map(s => s.trim()).filter(Boolean);
        this.markUnsaved(true);
      });
    }
  }

  /**
   * Setup Global Header & Modal Listeners
   */
  initGlobalEventListeners() {
    // 1. Core navigation tabs
    const profileBtn = document.getElementById("nav-btn-profile");
    if (profileBtn) {
      profileBtn.addEventListener("click", () => {
        this.activeTab = "profile";
        this.renderSidebarNav();
        this.renderActiveCanvas();
      });
    }

    const contactBtn = document.getElementById("nav-btn-contact");
    if (contactBtn) {
      contactBtn.addEventListener("click", () => {
        this.activeTab = "contact";
        this.renderSidebarNav();
        this.renderActiveCanvas();
      });
    }

    // 2. Add Section Modal
    const addSecModal = document.getElementById("modal-add-section");
    const openAddBtn = document.getElementById("btn-add-section");
    const closeAddBtn = document.getElementById("btn-close-add-modal");
    const cancelAddBtn = document.getElementById("btn-cancel-add-section");
    const confirmAddBtn = document.getElementById("btn-confirm-add-section");

    if (openAddBtn) {
      openAddBtn.addEventListener("click", () => {
        if (addSecModal) addSecModal.removeAttribute("hidden");
        const idInput = document.getElementById("new-sec-id");
        if (idInput) { idInput.value = ""; idInput.focus(); }
      });
    }

    const closeAddModal = () => {
      if (addSecModal) addSecModal.setAttribute("hidden", "true");
    };

    if (closeAddBtn) closeAddBtn.addEventListener("click", closeAddModal);
    if (cancelAddBtn) cancelAddBtn.addEventListener("click", closeAddModal);

    if (confirmAddBtn) {
      confirmAddBtn.addEventListener("click", () => {
        const id = document.getElementById("new-sec-id")?.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-");
        const navTitle = document.getElementById("new-sec-navtitle")?.value.trim();
        const heading = document.getElementById("new-sec-heading")?.value.trim();
        const layoutType = document.getElementById("new-sec-layout")?.value || "CustomCardsGrid";

        if (!id || !navTitle) {
          alert("Please specify Section ID and Sidebar Nav Title.");
          return;
        }

        if (this.data.sections.some(s => s.id === id)) {
          alert(`Section with ID "${id}" already exists.`);
          return;
        }

        const newSec = {
          id,
          enabled: true,
          navTitle,
          heading: heading || navTitle,
          layoutType,
          intro: "",
          items: [
            {
              id: `item-${Date.now()}`,
              title: "Example Card",
              icon: "star",
              description: "Card details and description.",
              tags: ["FastAPI", "Python"]
            }
          ]
        };

        if (layoutType === "RichTextAndCV") {
          newSec.paragraphs = ["Initial paragraph content."];
          delete newSec.items;
        }

        this.data.sections.push(newSec);
        this.activeTab = `section_${id}`;
        this.markUnsaved(true);
        closeAddModal();
        this.renderSidebarNav();
        this.renderActiveCanvas();
        this.showToast(`Section "${navTitle}" created successfully!`);
      });
    }

    // 3. Live Preview
    const previewBtn = document.getElementById("btn-preview");
    if (previewBtn) {
      previewBtn.addEventListener("click", () => {
        localStorage.setItem("portfolio_studio_draft", JSON.stringify(this.data));
        window.open("index.html?preview=true", "_blank");
      });
    }

    // 4. Save to Disk (File System Access API)
    const saveDiskBtn = document.getElementById("btn-save-disk");
    if (saveDiskBtn) {
      saveDiskBtn.addEventListener("click", () => this.saveToLocalDisk());
    }

    // 5. Export / Import JSON
    const downloadJsonBtn = document.getElementById("btn-download-json");
    if (downloadJsonBtn) {
      downloadJsonBtn.addEventListener("click", () => this.exportJsonFile());
    }

    const importJsonBtn = document.getElementById("btn-import-json");
    const fileImportInput = document.getElementById("file-import-input");
    if (importJsonBtn && fileImportInput) {
      importJsonBtn.addEventListener("click", () => fileImportInput.click());
      fileImportInput.addEventListener("change", (e) => this.handleFileImport(e));
    }

    // 6. GitHub Settings Modal
    const ghModal = document.getElementById("modal-github-settings");
    const openGhBtn = document.getElementById("btn-github-settings");
    const closeGhBtn = document.getElementById("btn-close-gh-modal");
    const cancelGhBtn = document.getElementById("btn-cancel-gh-settings");
    const saveGhBtn = document.getElementById("btn-save-gh-settings");

    if (openGhBtn) {
      openGhBtn.addEventListener("click", () => {
        const repoEl = document.getElementById("gh-repo");
        const branchEl = document.getElementById("gh-branch");
        const tokenEl = document.getElementById("gh-token");
        const msgEl = document.getElementById("gh-commit-msg");

        if (repoEl) repoEl.value = this.ghConfig.repo || "Ba-se-l/my-portfolio";
        if (branchEl) branchEl.value = this.ghConfig.branch || "dev";
        if (tokenEl) tokenEl.value = this.ghConfig.token || "";
        if (msgEl) msgEl.value = this.ghConfig.commitMsg || "Update portfolio-data.json via Portfolio Studio CMS";

        if (ghModal) ghModal.removeAttribute("hidden");
      });
    }

    const closeGhModal = () => {
      if (ghModal) ghModal.setAttribute("hidden", "true");
    };

    if (closeGhBtn) closeGhBtn.addEventListener("click", closeGhModal);
    if (cancelGhBtn) cancelGhBtn.addEventListener("click", closeGhModal);

    if (saveGhBtn) {
      saveGhBtn.addEventListener("click", () => {
        this.ghConfig.repo = document.getElementById("gh-repo")?.value.trim() || "Ba-se-l/my-portfolio";
        this.ghConfig.branch = document.getElementById("gh-branch")?.value.trim() || "dev";
        this.ghConfig.token = document.getElementById("gh-token")?.value.trim() || "";
        this.ghConfig.commitMsg = document.getElementById("gh-commit-msg")?.value.trim() || "Update portfolio data";

        localStorage.setItem("portfolio_studio_gh_config", JSON.stringify(this.ghConfig));
        closeGhModal();
        this.showToast("GitHub settings saved in local storage.");
      });
    }

    // 7. Publish to GitHub Button
    const publishGhBtn = document.getElementById("btn-publish-github");
    if (publishGhBtn) {
      publishGhBtn.addEventListener("click", () => this.publishToGitHub());
    }
  }

  /**
   * Save directly to local disk (File System Access API with download fallback)
   */
  async saveToLocalDisk() {
    this.data.meta.lastUpdated = new Date().toISOString().split("T")[0];
    const jsonString = JSON.stringify(this.data, null, 2);

    if ("showSaveFilePicker" in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: "portfolio-data.json",
          types: [{
            description: "JSON Data File",
            accept: { "application/json": [".json"] }
          }]
        });

        const writable = await handle.createWritable();
        await writable.write(jsonString);
        await writable.close();

        this.markUnsaved(false);
        this.showToast("Successfully saved directly to disk (portfolio-data.json)!");
        return;
      } catch (err) {
        if (err.name === "AbortError") return; // User cancelled
        console.warn("File System Access API write failed:", err);
      }
    }

    // Fallback: trigger download
    this.exportJsonFile();
    this.showToast("Downloaded portfolio-data.json to Downloads folder.");
  }

  /**
   * Export JSON File
   */
  exportJsonFile() {
    this.data.meta.lastUpdated = new Date().toISOString().split("T")[0];
    const jsonString = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.markUnsaved(false);
  }

  /**
   * Handle JSON File Import
   */
  handleFileImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed.profile || !parsed.sections) {
          throw new Error("Invalid schema: missing 'profile' or 'sections' objects.");
        }
        this.data = parsed;
        this.markUnsaved(true);
        this.renderSidebarNav();
        this.renderActiveCanvas();
        this.showToast(`Imported ${file.name} successfully!`);
      } catch (err) {
        alert("Failed to parse JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset input
  }

  /**
   * Publish directly to GitHub repository via REST API
   */
  async publishToGitHub() {
    if (!this.ghConfig.token) {
      alert("GitHub Personal Access Token is required to publish directly to GitHub. Please configure it in 'GitHub Sync'.");
      document.getElementById("btn-github-settings")?.click();
      return;
    }

    const { repo, branch, token, commitMsg } = this.ghConfig;
    const filePath = "data/portfolio-data.json";
    const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;

    this.showToast("Connecting to GitHub API...", false);

    try {
      // 1. Fetch current file SHA from GitHub
      let sha = "";
      const getRes = await fetch(apiUrl, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json"
        }
      });

      if (getRes.ok) {
        const fileInfo = await getRes.json();
        sha = fileInfo.sha;
      } else if (getRes.status === 404) {
        console.log("File does not exist yet on remote, creating new file.");
      } else {
        const errJson = await getRes.json();
        throw new Error(errJson.message || `Failed to fetch file SHA (${getRes.status})`);
      }

      // 2. Prepare UTF-8 Base64 payload
      this.data.meta.lastUpdated = new Date().toISOString().split("T")[0];
      const jsonString = JSON.stringify(this.data, null, 2);
      const utf8Base64 = btoa(unescape(encodeURIComponent(jsonString)));

      // 3. Send PUT request to GitHub Contents API
      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: commitMsg || "Update portfolio-data.json via Portfolio Studio CMS",
          content: utf8Base64,
          sha: sha || undefined,
          branch: branch || "dev"
        })
      });

      if (!putRes.ok) {
        const errJson = await putRes.json();
        throw new Error(errJson.message || `HTTP ${putRes.status}`);
      }

      const result = await putRes.json();
      this.markUnsaved(false);
      this.showToast(`Published commit successfully to ${repo} (${branch})!`);
      console.log("GitHub commit details:", result.commit);
    } catch (err) {
      console.error("GitHub publish failed:", err);
      this.showToast(`GitHub Publish Error: ${err.message}`, true);
    }
  }
}

// Instantiate and start Studio once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const studio = new StudioCMS();
  studio.init();
});
