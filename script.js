/**
 * ==========================================================================
 * BASEL SKAYKER — PORTFOLIO RUNTIME ENGINE
 * Pure Vanilla JavaScript — High Performance, Zero Runtime Bloat
 * Features:
 * 1. Lucide Icons Instantiation
 * 2. High-Performance Radial Cursor Spotlight (RAF throttled)
 * 3. IntersectionObserver Scroll-Spy for Sticky Navigation
 * 4. 1-Click Clipboard Email Copy with Visual Feedback
 * 5. Serverless Dual-Action Form (WhatsApp & Email Direct Dispatch)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. Lucide Icons Initialization
  // ------------------------------------------------------------------------
  const initIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };
  initIcons();

  // ------------------------------------------------------------------------
  // 2. High-Performance Cursor Spotlight (RequestAnimationFrame)
  // ------------------------------------------------------------------------
  const spotlight = document.getElementById("spotlight");
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

  // ------------------------------------------------------------------------
  // 3. Scroll-Spy Navigation (IntersectionObserver)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".section-nav .nav-link");

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      // Focus detection on upper-middle viewport
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

  // ------------------------------------------------------------------------
  // 4. One-Click Clipboard Email Copy
  // ------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const copyBtnText = document.getElementById("copy-btn-text");
  const emailAddress = "baselskaiker21@gmail.com";

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailAddress);
        } else {
          // Fallback for non-https or older browsers
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

        // Visual feedback
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

  // ------------------------------------------------------------------------
  // 5. Serverless Dual-Action Form (WhatsApp & Email Direct Dispatch)
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById("quick-contact-form");
  const sendEmailBtn = document.getElementById("send-email-btn");

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

  // Submit via WhatsApp
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

      const targetUrl = `https://wa.me/233592121895?text=${encodeURIComponent(formattedText)}`;
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Submit via Email
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
});
