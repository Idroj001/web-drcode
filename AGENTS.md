# AGENTS.md

Marketing site for {Dr.Code}. Plain HTML/CSS/JS, no build step.

> **Estándares de diseño, tokens y tipografía: ver el `AGENTS.md` del workspace root (`Proyectos/`).** Este archivo solo guarda el cableado crítico del repo.

## Critical wiring (easy to miss)

- Header, footer, and contact modal are NOT in the HTML. They are template strings in `PARTIALS` in `js/main.js`, injected into `<div id="header-container">`, `<div id="footer-container">`, `<div id="modal-container">`. Edit navigation/footer/contact form in `js/main.js`.
- The footer has a single home icon (`.footer-home` → `index.html`); the old WhatsApp/email/agenda icons were removed on purpose. Do not re-add social icons without asking.
- Share metadata lives in every real page: `<link rel="canonical">` plus Open Graph/Twitter tags with `https://idroj001.github.io/web-drcode/assets/og-image.jpg` (1200×630). The card is rendered with Playwright from `assets/og-source.html`; edit that file and re-screenshot if the brand changes. `demo-*.html` carry `noindex`.
- `404.html`, `robots.txt` and `sitemap.xml` are part of the deploy (GitHub Pages serves `404.html` automatically). Keep the 404 inside the same header/footer/theme wiring.
- The nav has no external links: Inicio, Servicios, Skills, Contacto and Agendamiento. All internal links carry `data-page` for the `aria-current` logic. Landing is no longer linked from the nav; `servicios.html` still links to it from the "Landing Pages" demo card.
- Every page includes the blocking inline `<head>` script that reads `localStorage.drcode_theme` and sets `data-theme` before CSS (prevents theme flash). Copy it when adding a page.
- Pages containing `main form` get no injected modal (`loadPartials` skips it) to avoid duplicate field IDs; pages needing the modal must include `#modal-container`.
- No backend: forms build `https://wa.me/...` URLs; the number is `WHATSAPP_NUMBER` at the top of `js/main.js`.
- Calendar: state in `localStorage.drcode_slots`; "admin mode" is client-side only (`ADMIN_PASSWORD = 'admin123'`, Ctrl+Shift+click on `h1`). Never present it as real authentication. Bookings do not reach the owner: the copy must stay as a request ("Solicita tu Cita" / "Solicitar Cita" + WhatsApp confirmation), never as a real booking system. On mobile (≤480px) each row is a `grid` of `5.25rem 1fr` with the day name/date stacked, so every row stays uniform regardless of the day name length.
- Floating buttons: `syncFloatsWithFooter()` toggles the `--above` classes **and** sets an inline `bottom: footer.offsetHeight + 16px` when the footer intersects (any viewport; recalculated on resize). The `--above` classes have no CSS transform anymore — do not reintroduce a fixed `translateY`. `tests/floats.spec.mjs` verifies equal heights/deltas, "outside the footer" on mobile (375px) and no overlap at 320px.
- `servicios.html` uses terminal price panels (`.term-panel`, 4 panels) with `.term-cta` "Solicitar" buttons (11) that call `openModalFor(...)`. The portfolio has 6 `.work-card` with a "Vista previa" button (opens `#workModal` with `assets/trabajos/*.jpg`) and a "Visitar sitio" link (absolute to the deployed repos, or `index.html` for the corporate demo). There are no "Ver demo" links anymore; the old `demo-*.html` stubs are kept but `noindex`. The smoke test expects 4 `.term-panel`, 11 `.term-cta`, 6 `.work-card` with 6 "Vista previa" and 5 "Visitar sitio" (the dashboard card is marked "Proyecto interno").
- Copy in **first person singular** ("Creo", "domino", "Contáctame", "te responderé"): the brand is one person. Do not go back to the plural.
- Prices in `servicios.html` are launch prices: the `.includes-note` states "Precio de lanzamiento (75% OFF)…" and that the custom domain is optional and paid separately ($20/year). Keep that note and its twin answer in the `contacto.html` FAQ/JSON-LD in sync.
- `index.html` has a testimonial section (`#testimonios`) that ships **hidden** with three `<!-- TESTIMONIO n -->` slots. Never fill it with invented quotes; replace with real, authorized testimonials and remove `hidden` from the section.
- Titles are uppercase **via CSS only** (`h1, h2, h3, h4 { text-transform: uppercase; }`). Keep the HTML in normal case for SEO, screen readers and JSON-LD.
- `contacto.html` carries the FAQ (`#faq`, six native `<details class="faq-item">`). The same six answers are duplicated in its `FAQPage` JSON-LD; edit both. The delivery time is **2–3 días hábiles** and also appears in the "Entrega Rápida" card of `index.html`.

## Testing

- First setup: `npm install` then `npx playwright install chromium`.
- `npm test` runs the full Playwright suite on `127.0.0.1:4173`. Debug: `npm run test:headed` / `test:ui` / `test:report`.
- Keep `workers: 1` in `playwright.config.mjs`: parallel headless browsers make focus assertions flaky.
- `tests/support/fixtures.mjs` blocks CDNs, fails on page errors, and replaces `window.open`; assert WhatsApp URLs with `openedWhatsAppText(page)`, never navigate to `wa.me`.
- To prove a spec depends on app JS: `BLOCK_MAIN=1 npx playwright test ...` (the server serves an empty `js/main.js` and the spec must fail).
