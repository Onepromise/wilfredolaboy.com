# wilfredolaboy.com

Wilfredo Laboy's personal + professional site. Design: **Dual Current** —
a clean, serious single page for the professional side, with one vivid
"Forge current" panel bridging to the Crescent Cove studio site.

## Structure

- `index.html` — the whole page (nav, hero, work, writing, about, forge panel, contact, footer)
- `styles.css` — all styling, no frameworks
- `script.js` — mobile nav toggle, contact-form guard, footer year (plain JS)
- `assets/hero-professional.webp` — hero banner image

## Deploy

Static site — push to `main` and GitHub Pages serves it. No build step.

## Still to wire up

- Contact form: replace `YOUR_FORM_ID` in the form `action` with the real
  Formspree form ID (until then the form shows a "not wired up yet" note
  instead of submitting).
- LinkedIn URL in the footer is a placeholder — needs the real profile handle.
