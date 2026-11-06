# AGENTS.md

Spanish-language marketing site for {Dr.Code}. Plain HTML/CSS/JS with no build step. npm exists only for Playwright E2E tests; there is no lint or CI.

## Preview & verification
- Open `index.html` directly in a browser, or serve the folder with any static file server.
- First setup: `npm install` then `npx playwright install chromium`.
- `npm test` runs the full Playwright suite. Focused runs: `npm run test:calendar`, `npx playwright test tests/contact.spec.mjs`, or `npx playwright test -g "texto del test"`.
- Use `npm run test:headed` / `npm run test:ui` to debug and `npm run test:report` for the last HTML report.
- Runtime dependencies are CDN-only (Font Awesome, Google Fonts, devicon/simpleicons); there is no vendoring or lockfile.

## Structure
- Real pages: `index.html`, `servicios.html`, `skills.html`, `contacto.html`, `calendario.html`.
- `demo-*.html` are placeholder stubs (title + CTAs only) linked from `servicios.html` as "Ver demo". Don't assume they are working demos.
- `css/style.css` is the single monolithic stylesheet (~1600 lines).
- `js/main.js` holds all shared behavior and injected markup; `js/canvas.js` is the matrix background.
- `tests/*.spec.mjs` are Playwright specs; `tests/support/` holds the static test server and shared fixtures.

## Critical wiring (easy to miss)
- Header, footer, and contact modal are NOT in the HTML. They are template strings in `PARTIALS` in `js/main.js`, injected into `<div id="header-container">`, `<div id="footer-container">`, `<div id="modal-container">`. Edit navigation/footer/contact form in `js/main.js`.
- Every page must include `#header-container` and `#footer-container`, and load `js/canvas.js` then `js/main.js` at the end of `<body>`.
- Pages that contain `main form` get no injected modal (`loadPartials` skips it) to avoid duplicate field IDs; pages needing the modal must include `#modal-container`.
- Every page's `<head>` has a blocking inline script that reads `localStorage.drcode_theme` and sets `data-theme` before CSS to prevent a theme flash. Copy that block when adding a page.
- Theme tokens: light in `:root`, dark overrides in `[data-theme="dark"]` near the end of `css/style.css`. Legacy aliases (`--white`, `--gray-*`, `--cortina-*`) are deprecated aliases; prefer the semantic tokens.
- `openDialog` focuses `[data-autofocus]` ~80 ms after opening. The field must be visible by then: avoid `transition: all` on overlays/form fields, because `visibility` is inherited and animating it makes `focus()` a no-op.
- Only the `.modal-overlay` carries `aria-hidden`; never hardcode `aria-hidden="true"` on an inner `.modal`, or it stays hidden from assistive tech when opened.

## Behavior & data
- No backend. Form submits build a `https://wa.me/...` URL with a prefilled message; the number is `WHATSAPP_NUMBER` at the top of `js/main.js`.
- Calendar state is per-browser in `localStorage.drcode_slots`; bookings are not shared between users.
- Calendar "admin mode" is client-side only (`ADMIN_PASSWORD = 'admin123'`), entered via Ctrl+Shift+click on the page `h1` and exited with Ctrl+Shift+L. Never present this as real authentication.
- `openModal`, `openModalFor`, and `closeModal` are exposed on `window`; service buttons call them via inline `onclick`.

## Testing
- `npm test` starts `tests/support/static-server.mjs` on `127.0.0.1:4173` and runs Chromium only.
- `tests/support/fixtures.mjs` blocks external CDNs, fails on uncaught page errors, and replaces `window.open`. Assert WhatsApp URLs with `openedWhatsAppText(page)`; never navigate to `wa.me`.
- Time-sensitive specs freeze only the date with `page.clock.setFixedTime()` (`America/Guayaquil`, `es-EC`); carousel specs use `page.clock.install()` + `fastForward`.
- Keep `workers: 1` in `playwright.config.mjs`: parallel headless browsers make focus assertions (`toBeFocused`) flaky.
- To prove a spec depends on app JS, run with `BLOCK_MAIN=1` (PowerShell: `$env:BLOCK_MAIN='1'; npx playwright test ...`). The server returns an empty `js/main.js` and the spec must fail.

## Conventions
- Keep all UI copy in Spanish (`<html lang="es">`).
- Preserve accessibility patterns: skip link, `#main tabindex="-1"`, focus trap + inert background in `openDialog`, and `prefers-reduced-motion` handling.
- Use existing CSS variables and `css/style.css`; no CSS framework.
- UI icons use Font Awesome classes (`fa-solid ...`); local SVGs live in `assets/`. Skills-carousel brand icons are remote URLs in `js/main.js`.
