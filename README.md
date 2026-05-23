# Yash Gupta — Portfolio

Personal portfolio website hosted on GitHub Pages.

## File Structure

```
/
├── index.html          ← Main HTML (all sections)
├── style.css           ← All styles + light/dark theme
├── script.js           ← All interactivity
└── assets/
    └── Yash_Gupta_Resume.pdf   ← Drop your resume PDF here
```

## GitHub Setup (step-by-step)

### 1. Add your resume PDF
- Place your resume PDF inside the `assets/` folder
- Make sure the filename is exactly: `Yash_Gupta_Resume.pdf`
- The nav "↓ Resume" button will link to it automatically

### 2. Push to GitHub
```bash
git add .
git commit -m "Portfolio v3 — separated HTML/CSS/JS"
git push origin main
```

### 3. Your custom domain
- Already set up via your CNAME file — no changes needed
- GitHub Pages will serve your `index.html` automatically

## Customisation Checklist

- [ ] Add your photo (optional) — replace any `.art-tile` with an `<img>` tag
- [ ] Update `assets/Yash_Gupta_Resume.pdf` with your latest resume
- [ ] Add real gallery images — swap the CSS art tiles with `<img src="...">` inside `.art-tile`
- [ ] Add more projects — duplicate any `.project-card` block in `index.html`
- [ ] Add more awards — duplicate `.award-row` blocks
- [ ] Update skill bar percentages — change `data-width="XX"` on each `.skill-fill`
- [ ] For the contact form to actually send emails, integrate [Formspree](https://formspree.io):
  - Create a free account at formspree.io
  - Get your form endpoint (looks like `https://formspree.io/f/xxxxxxxx`)
  - Change `<form class="contact-form" id="contactForm">` to `<form action="https://formspree.io/f/xxxxxxxx" method="POST">`

## Interactive Features Included

| Feature | How it works |
|---|---|
| Typewriter hero | Cycles through titles, lands on "Yash Gupta" |
| Cursor glow | Gold radial glow follows mouse (desktop only) |
| Dark / Light toggle | Saves preference to localStorage |
| Mobile hamburger menu | Slide-in panel with overlay |
| Scroll fade-in | All sections animate up on scroll |
| Animated counters | Numbers count up when scrolled into view |
| Skill bars | Bars fill with stagger when scrolled into view |
| Gallery lightbox | Click any art card to open full detail view |
| Nav active highlight | Current section's nav link turns gold |
| Page transition | Subtle opacity dip on section navigation |
| Contact form | Shows success state (wire up Formspree to actually send) |
