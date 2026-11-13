# AGENTS.md

Marketing site for {Dr.Code}. Plain HTML/CSS/JS, no build step.

> **Estándares de diseño, tokens y tipografía: ver el `AGENTS.md` del workspace root (`Proyectos/`).** Este archivo solo guarda el cableado crítico del repo.

## Critical wiring (easy to miss)

- Header, footer, and contact modal are NOT in the HTML. They are template strings in `PARTIALS` in `js/main.js`, injected into `<div id="header-container">`, `<div id="footer-container">`, `<div id="modal-container">`. Edit navigation/footer/contact form in `js/main.js`.
- The nav includes an external "Landing" link (`https://idroj001.github.io/DrCode-landing/`) between Skills and Contacto. It must NOT have a `data-page`: the `aria-current` logic only marks internal pages, and tests rely on that.
- Every page includes the blocking inline `<head>` script that reads `localStorage.drcode_theme` and sets `data-theme` before CSS (prevents theme flash). Copy it when adding a page.
- Pages containing `main form` get no injected modal (`loadPartials` skips it) to avoid duplicate field IDs; pages needing the modal must include `#modal-container`.
- No backend: forms build `https://wa.me/...` URLs; the number is `WHATSAPP_NUMBER` at the top of `js/main.js`.
- Calendar: state in `localStorage.drcode_slots`; "admin mode" is client-side only (`ADMIN_PASSWORD = 'admin123'`, Ctrl+Shift+click on `h1`). Never present it as real authentication.
- Floating buttons: `syncFloatsWithFooter()` toggles the `--above` classes **and** sets an inline `bottom: footer.offsetHeight + 16px` when the footer intersects (any viewport; recalculated on resize). The `--above` classes have no CSS transform anymore — do not reintroduce a fixed `translateY`. `tests/floats.spec.mjs` verifies equal heights/deltas, "outside the footer" on mobile (375px) and no overlap at 320px.
- `servicios.html` "Ver demo" links: tarjeta → tarjeta-drcode, landing → DrCode-landing, carrito → catalogo-drcode are absolute external links with `target="_blank" rel="noopener"`. The other three (`demo-web`, `demo-menu`, `demo-automatizacion`) are still local stubs. The smoke test expects exactly 6 "Ver demo" links and `demo-web.html` as the first `.service-preview` href.

## Testing

- First setup: `npm install` then `npx playwright install chromium`.
- `npm test` runs the full Playwright suite on `127.0.0.1:4173`. Debug: `npm run test:headed` / `test:ui` / `test:report`.
- Keep `workers: 1` in `playwright.config.mjs`: parallel headless browsers make focus assertions flaky.
- `tests/support/fixtures.mjs` blocks CDNs, fails on page errors, and replaces `window.open`; assert WhatsApp URLs with `openedWhatsAppText(page)`, never navigate to `wa.me`.
- To prove a spec depends on app JS: `BLOCK_MAIN=1 npx playwright test ...` (the server serves an empty `js/main.js` and the spec must fail).
