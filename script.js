document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("yg-theme") || "dark";
  html.setAttribute("data-theme", savedTheme);

  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("yg-theme", next);
  });

  const nav = document.querySelector(".site-nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    document.addEventListener("mousemove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    });
  } else if (glow) {
    glow.style.display = "none";
  }

  const descriptors = ["Researcher", "Innovator", "Student Leader", "Mr. Springdales", "Physics Club Founder", "Thinker"];
  const descriptor = document.querySelector("[data-random-descriptor]");
  if (descriptor) {
    descriptor.textContent = descriptors[Math.floor(Math.random() * descriptors.length)];
    setTimeout(() => descriptor.classList.add("ready"), 600);
  }

  const quotePool = [
    "The best ideas live at the intersection of disciplines.",
    "What if waste had value?",
    "Science is most powerful when it starts with a human problem.",
    "I build things that matter outside a classroom."
  ];
  const randomQuote = document.querySelector("[data-random-quote]");
  if (randomQuote) randomQuote.textContent = quotePool[Math.floor(Math.random() * quotePool.length)];

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".fade-up").forEach((element) => fadeObserver.observe(element));

  const counters = document.querySelectorAll(".counter");
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const start = parseFloat(el.textContent) || 0;
    const duration = 1600;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (start + (target - start) * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((counter) => counterObserver.observe(counter));

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = [...entry.target.querySelectorAll(".skill-fill")];
        fills.forEach((fill, index) => {
          setTimeout(() => {
            fill.style.width = `${fill.dataset.width || 0}%`;
          }, index * 150);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll(".skill-bars").forEach((bars) => skillObserver.observe(bars));

  const hoverCards = document.querySelectorAll(".hover-preview[data-preview]");
  if (hoverCards.length && window.matchMedia("(pointer:fine)").matches) {
    const preview = document.createElement("div");
    preview.className = "hover-image";
    document.body.appendChild(preview);
    const move = (event) => {
      const x = Math.min(event.clientX + 16, window.innerWidth - 300);
      const y = Math.max(100, Math.min(event.clientY, window.innerHeight - 100));
      preview.style.left = `${x}px`;
      preview.style.top = `${y}px`;
    };
    hoverCards.forEach((card) => {
      card.addEventListener("mouseenter", (event) => {
        preview.className = `hover-image visible ${card.dataset.preview}`;
        move(event);
      });
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", () => {
        preview.className = "hover-image";
      });
    });
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest("[data-filter-group]");
      const filter = button.dataset.filter;
      group.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      group.querySelectorAll("[data-category]").forEach((item) => {
        item.style.display = filter === "all" || item.dataset.category === filter ? "" : "none";
      });
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxArt = document.getElementById("lightboxArt");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const closeLightbox = document.getElementById("lightboxClose");
  let lastFocus = null;
  function openLightbox(item) {
    if (!lightbox) return;
    lastFocus = document.activeElement;
    const art = item.dataset.art || [...(item.querySelector(".art-tile")?.classList || [])].find((c) => c.startsWith("art-")) || "art-gallery";
    lightboxArt.className = `lightbox-art ${art}`;
    lightboxTitle.textContent = item.dataset.title || item.querySelector("h3")?.textContent || "";
    lightboxDesc.textContent = item.dataset.desc || item.querySelector("p")?.textContent || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    closeLightbox?.focus();
    document.body.style.overflow = "hidden";
  }
  function hideLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastFocus?.focus();
  }
  document.querySelectorAll("[data-lightbox]").forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.addEventListener("click", () => openLightbox(item));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(item);
      }
    });
  });
  closeLightbox?.addEventListener("click", hideLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) hideLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideLightbox();
    if (event.key === "Tab" && lightbox?.classList.contains("open")) {
      const focusables = [...lightbox.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(data.get("subject") || "Portfolio Contact");
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nSubject: ${data.get("subject")}\n\n${data.get("message")}`);
    document.getElementById("formSuccess")?.classList.add("show");
    window.location.href = `mailto:theyashgupta00@gmail.com?subject=${subject}&body=${body}`;
  });

  const quoteForm = document.getElementById("quoteForm");
  quoteForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nQuote: ${data.get("quote")}\nAttribution: ${data.get("attribution")}`);
    window.location.href = `mailto:theyashgupta00@gmail.com?subject=Suggested quote&body=${body}`;
  });

  const parallaxEls = document.querySelectorAll("[data-parallax]");
  function handleScroll() {
    const sy = window.scrollY;
    nav?.classList.toggle("scrolled", sy > 12);
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || "0.2");
      el.style.transform = `translateY(${sy * speed}px)`;
    });
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  const canvas = document.getElementById("heroCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let running = true;
    let t = 0;
    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    function drawArt(time) {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(180,140,80,0.055)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        for (let x = 0; x < W; x++) {
          const freq = 0.008 + i * 0.002;
          const amp = 40 + i * 18;
          const phase = time * 0.0004 + i * 1.1;
          const y = H / 2 + Math.sin(x * freq + phase) * amp + Math.cos(x * freq * 0.7 + phase * 1.3) * amp * 0.5;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(124,167,160,0.035)";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let y = 0; y < H; y++) {
          const x = W / 2 + Math.sin(y * 0.01 + time * 0.0003 + i * 2.1) * (80 + i * 30);
          y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
    function loop() {
      if (running) {
        t += 1;
        drawArt(t);
      }
      requestAnimationFrame(loop);
    }
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
    });
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    loop();
  }
});
