document.addEventListener("DOMContentLoaded", () => {
  const glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    document.addEventListener("mousemove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    });
  } else if (glow) {
    glow.style.display = "none";
  }

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });
  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".fade-up").forEach((element) => fadeObserver.observe(element));

  const hoverPreviewCards = document.querySelectorAll(".hover-preview[data-preview]");
  if (hoverPreviewCards.length && window.matchMedia("(pointer:fine)").matches) {
    const preview = document.createElement("div");
    preview.className = "hover-image";
    document.body.appendChild(preview);

    const movePreview = (event) => {
      const pad = 26;
      const width = 230;
      const height = 160;
      const x = Math.min(event.clientX, window.innerWidth - width - pad);
      const y = Math.min(event.clientY, window.innerHeight - height - pad);
      preview.style.left = `${x}px`;
      preview.style.top = `${y}px`;
    };

    hoverPreviewCards.forEach((card) => {
      card.addEventListener("mouseenter", (event) => {
        preview.className = `hover-image visible ${card.dataset.preview}`;
        movePreview(event);
      });
      card.addEventListener("mousemove", movePreview);
      card.addEventListener("mouseleave", () => {
        preview.className = "hover-image";
      });
    });
  }
});
