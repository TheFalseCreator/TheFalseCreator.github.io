/* ═══════════════════════════════════════════
   YASH GUPTA — PORTFOLIO  |  script.js
   ═══════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  /* ─── 1. CURSOR GLOW ─── */
  const glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    document.addEventListener("mousemove", e => {
      glow.style.left = e.clientX + "px";
      glow.style.top  = e.clientY + "px";
    });
  } else if (glow) {
    glow.style.display = "none";
  }


  /* ─── 2. THEME TOGGLE ─── */
  const themeToggle = document.getElementById("themeToggle");
  const html        = document.documentElement;
  const saved       = localStorage.getItem("yg-theme") || "dark";
  html.setAttribute("data-theme", saved);

  themeToggle?.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("yg-theme", next);
  });


  /* ─── 3. MOBILE HAMBURGER ─── */
  const hamburger    = document.getElementById("hamburger");
  const mobileMenu   = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");

  function closeMenu() {
    hamburger?.classList.remove("open");
    mobileMenu?.classList.remove("open");
    mobileOverlay?.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
    mobileMenu?.setAttribute("aria-hidden", "true");
  }

  hamburger?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add("open");
      mobileMenu?.classList.add("open");
      mobileOverlay?.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
      mobileMenu?.setAttribute("aria-hidden", "false");
    }
  });

  mobileOverlay?.addEventListener("click", closeMenu);

  // Close on link click
  mobileMenu?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", closeMenu);
  });


  /* ─── 4. SCROLL FADE-UP (IntersectionObserver) ─── */
  const fadeEls = document.querySelectorAll(".fade-up");
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => fadeObserver.observe(el));


  /* ─── 5. TYPEWRITER HERO ─── */
  const typeEl = document.getElementById("typewriter");
  const lines = ["Yash\nGupta", "Researcher", "Innovator", "Student Leader", "Yash\nGupta"];

  let lineIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pause    = false;

  function renderLine(text) {
    // Support newlines as <br>
    return text.replace(/\n/g, '<br>');
  }

  function type() {
    if (!typeEl) return;
    const current = lines[lineIdx];
    const display = current.slice(0, charIdx);

    // For the final "Yash\nGupta" — stay permanently
    if (lineIdx === lines.length - 1 && charIdx === current.length) {
      typeEl.innerHTML = renderLine(display);
      return; // stop
    }

    typeEl.innerHTML = renderLine(display);

    if (pause) {
      pause = false;
      setTimeout(type, 1400);
      return;
    }

    if (!deleting) {
      charIdx++;
      if (charIdx > current.length) {
        deleting = true;
        pause    = true;
        setTimeout(type, 100);
        return;
      }
      setTimeout(type, charIdx === 1 ? 200 : 75);
    } else {
      charIdx--;
      if (charIdx < 0) {
        deleting = false;
        charIdx  = 0;
        lineIdx  = (lineIdx + 1) % lines.length;
        pause    = true;
        setTimeout(type, 100);
        return;
      }
      setTimeout(type, 38);
    }
  }

  // Small delay before starting
  setTimeout(type, 500);


  /* ─── 6. ANIMATED COUNTERS ─── */
  const counters = document.querySelectorAll(".counter");

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || "0");
    const suffix   = el.dataset.suffix || "";
    const start    = parseFloat(el.textContent) || 0;
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + (target - start) * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => counterObserver.observe(el));


  /* ─── 7. SKILL BAR ANIMATION ─── */
  const skillFills = document.querySelectorAll(".skill-fill");

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width || "0";
        // Slight stagger based on position in parent
        const idx = [...fill.closest(".skill-bar-list").querySelectorAll(".skill-fill")].indexOf(fill);
        setTimeout(() => {
          fill.style.width = width + "%";
        }, idx * 160);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(el => skillObserver.observe(el));


  /* ─── 8. GALLERY LIGHTBOX ─── */
  const lightbox      = document.getElementById("lightbox");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxArt   = document.getElementById("lightboxArt");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc  = document.getElementById("lightboxDesc");

  // Art tile class mapping (gallery card order → art class)
  const artClasses = ["art-one", "art-two", "art-three", "art-four"];

  function openLightbox(card) {
    const title = card.dataset.title || "";
    const desc  = card.dataset.desc  || "";

    // Find which art class this card uses
    const artTile = card.querySelector(".art-tile");
    const artClass = artTile ? [...artTile.classList].find(c => c.startsWith("art-")) : "";

    lightboxArt.className  = "lightbox-art " + (artClass || "");
    lightboxTitle.textContent = title;
    lightboxDesc.textContent  = desc;

    lightbox?.classList.add("open");
    lightbox?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox?.classList.remove("open");
    lightbox?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach(card => {
    card.addEventListener("click", () => openLightbox(card));
    // Keyboard support
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") openLightbox(card);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });


  /* ─── 9. CONTACT FORM ─── */
  const form        = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  form?.addEventListener("submit", e => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.textContent    = "Sent ✓";
    btn.style.background = "transparent";
    btn.style.color      = "var(--gold)";
    btn.style.borderColor = "var(--gold)";
    formSuccess?.classList.add("show");

    setTimeout(() => {
      btn.textContent      = "Send Message →";
      btn.style.background = "";
      btn.style.color      = "";
      btn.style.borderColor = "";
      formSuccess?.classList.remove("show");
      form.reset();
    }, 3500);
  });


  /* ─── 10. NAV SCROLL HIGHLIGHT ─── */
  const sections  = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".nav-links a");

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute("href") === "#" + entry.target.id
            ? "var(--gold)"
            : "";
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(s => navObserver.observe(s));


  /* ─── 11. SMOOTH SECTION PAGE TRANSITIONS ─── */
  // Brief opacity dip when clicking a nav link for a "page turn" feel
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      // Fade sections briefly
      document.querySelectorAll(".section").forEach(s => {
        s.style.opacity = "0.6";
        setTimeout(() => { s.style.opacity = ""; }, 400);
      });
    });
  });

});
