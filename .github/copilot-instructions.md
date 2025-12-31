<!-- Copilot instructions for AI coding agents working on this repository -->

# Quick Context

This is a tiny, static single-page UI for a cafe mockup. There is no build system or server configuration in the repo — the app is served as plain HTML/CSS/JS.

Key files
- `index.html` — single-page structure and DOM elements
- `index.css` — all styling, grid layout and component modifiers
- `index.js` — minimal interaction (event binding for `.cta`)

**Big picture**
- A single UI surface composed of reusable card blocks (`.card`) with modifier classes (`.hero`, `.tall`, `.info`, `.small`).
- Layout is driven by CSS Grid in `index.css` (see the `.grid` rule).
- Interaction is very small and placed in `index.js`; scripts are included at the bottom of `index.html`, so DOM is available without a DOMContentLoaded wrapper.

Patterns and conventions to follow
- Component blocks: use `.card` as the base and add a modifier class for size/role (example: `.card.hero`, `.card.tall`).
- Visual primitives: `.text-line`, `.image-icon`, and `.logo` are used as skeleton placeholders; prefer these existing classes when adding new content so styling remains consistent.
- Interaction pattern: DOM event listeners are attached via `document.querySelector(...)` in `index.js`. New interactive behaviors should be added to `index.js` (or new files included at the end of `index.html`) rather than inline handlers.
- No frameworks or modules: keep JS and CSS simple, avoid introducing bundlers unless the project is intentionally migrated.

Examples (do this style)
- Add a click handler for a new button:

```javascript
// index.js (follow the existing pattern)
document.querySelector('.my-button').addEventListener('click', () => {
  // keep behavior small and self-contained
  console.log('my button clicked');
});
```

- Add a new card using existing classes in `index.html`:

```html
<div class="card info">
  <div class="text-line"></div>
  <div class="text-line short"></div>
</div>
```

Developer workflows
- No build step: open [index.html](index.html) in a browser to preview.
- Prefer a local static server for correct asset headers and history behavior. Examples:

```bash
# Python 3
python -m http.server 8000

# Node (if you have serve installed)
npx serve . -l 8000
```

- Debugging: use browser DevTools. JS is not minified; source maps are not relevant.

What NOT to change casually
- Avoid converting the project to a complex framework or adding a bundler as a first step — this repository is intentionally minimal.
- Don't move the inline script tag from the bottom of `index.html` without ensuring DOM readiness where scripts run.

Integration points & external dependencies
- There are no external APIs, package manifests, or CI definitions in this repo. Any external integration should be introduced deliberately and documented in a follow-up PR.

If merging with an existing `.github/copilot-instructions.md`
- Preserve any repo-specific developer notes; merge new sections above under "Patterns and conventions" and "Developer workflows".

Questions for the repo owner
- Should we add a simple `README.md` with the dev-server command and preferred browser testing matrix?
- Any plans to add accessibility guidelines or i18n? If yes, indicate preferred targets so suggestions can be tailored.

— End
