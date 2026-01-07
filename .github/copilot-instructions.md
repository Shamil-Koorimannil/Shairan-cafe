<!-- Copilot instructions for AI coding agents working on this repository -->

# Quick Context

This repository is a small, static website that models a cafe UI. It's composed of plain HTML, CSS, and minimal JavaScript — there is no build system, no package.json, and no server-side code.

Key files and locations
- `Home_page/index.html` — main home page markup and DOM structure
- `Home_page/index.css` — primary layout and visual rules (Grid + card modifiers)
- `Home_page/script.js` — home-page interactions
- `Products_page/products.html` — products view (separate markup + assets usage)
- `Products_page/products.js` — product carousel/logic
- `global.css` — common variables and base styles
- `assets/` — images and logo (used by pages via relative paths)

Big picture
- Single-page / multi-HTML static site: each view lives in its folder and includes page-specific JS/CSS at the bottom of the HTML file.
- Layout is CSS-driven: grid layouts and `.card` components are reused across pages (`.card`, `.hero`, `.tall`, `.info`).
- Interaction surface is intentionally small and localized to page scripts (no SPA routing or frameworks).

Conventions and patterns to preserve
- Keep scripts linked at the bottom of the page HTML. Pages rely on this so DOM is available without `DOMContentLoaded` listeners (example: `Products_page/products.html` includes `products.js` then `navbar.js`).
- Use the `.card` base class plus modifier classes for new UI blocks (see `Home_page/index.css`).
- Reuse visual primitives: `.text-line`, `.image-icon`, `.logo` for consistent skeleton/placeholder styling.
- Page-specific JS: add behavior to the page's JS file (e.g., `Home_page/script.js` or `Products_page/products.js`) rather than injecting inline handlers.
- Do not add bundlers or module systems unless explicitly requested; this repo is intended to remain framework-free and runnable by opening HTML or via a static server.

Developer workflows
- Preview locally (any static server). Quick commands:

```bash
# Python 3
python -m http.server 8000

# Node (if you have serve installed)
npx serve . -l 8000
```

- Open the page in a browser (e.g., http://localhost:8000/Home_page/index.html) and use DevTools for CSS/JS debugging.

Project-specific notes
- Image and asset paths are relative; when adding images put them under `assets/images/` or `assets/logo/` and reference them with the same relative structure (example: `../assets/images/Chai cup.png` used in `Products_page/products.html`).
- Fonts are loaded via Google Fonts in the HTML head — avoid modifying network calls unless needed.
- Navbar: there is a `navbar.js` referenced from pages; if you change navigation behavior, update `navbar.js` and all pages that include it.

Integration points & external deps
- External resources are limited to Google Fonts and placeholder images used as fallbacks. There are no NPM packages or CI configs.

When editing
- Make minimal, focused changes. Keep HTML/CSS/JS simple and colocated.
- If you must add a new script, include it at the end of the target HTML file and follow existing patterns for selecting DOM elements via `document.querySelector(...)`.

Examples
- Add a click handler in `Products_page/products.js`:

```javascript
document.querySelector('#next-btn').addEventListener('click', () => {
  // small, self-contained behavior
});
```

- Add a new product card in `Products_page/products.html` using existing classes:

```html
<div class="card info">
  <div class="text-line"></div>
  <div class="text-line short"></div>
</div>
```

Questions / followups
- Would you like a short `README.md` added to the repo with the two preview commands and a recommended browser list?
- Any plans to add accessibility guidelines (contrast, semantics)? If yes, indicate priorities so I can add automated checks or a style checklist.

If something in these instructions is unclear, tell me which file or behavior you'd like me to expand on and I'll iterate.
