# Yash Gupta Portfolio

Static multi-page portfolio for GitHub Pages.

## Pages

- `index.html` - home page with featured project hover previews.
- `about.html` - school, awards, leadership, speaking, and clubs.
- `projects.html` - masonry project index.
- `gallery.html` - art gallery page, separate from vision boards.
- `vision-boards.html` - vision boards and future direction.
- `contact.html` - contact details.
- `projects/biomass.html` - Green Designing of Biomass story.
- `projects/raksita.html` - Raksita story.
- `projects/neurohealth.html` - NeuroHealth story.
- `projects/cosmic-isolation.html` - Cosmic Isolation story.
- `projects/sanitary-pad-initiative.html` - Sanitary Pad Machine Initiative story.

## Hover Previews

Project cards use CSS placeholder art tiles for now. Each card has:

```html
class="project-card hover-preview"
data-preview="art-biomass"
```

To swap in real images later, either replace the CSS art backgrounds in `style.css`, or convert the preview element to use actual image URLs.

## Deploying On GitHub Pages

Put these files in the repository root, then enable GitHub Pages from the `main` branch root. For a custom domain, add your domain in the GitHub Pages settings and configure your DNS records with your domain provider.
