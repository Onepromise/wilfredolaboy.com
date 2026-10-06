# wilfredolaboy.com — site notes

A static site (plain HTML/CSS/JS, no build step). Deploy anywhere static-friendly,
including **GitHub Pages**.

## Structure

- `index.html` — splash landing + both themed sides + shared contact section
- `styles.css` — theme tokens, splash tear effect, layout
- `script.js` — splash enter/home flow, side toggle, wipe transitions, form guard
- `assets/` — hero images (`hero-professional.webp`, `hero-ronin.webp`)
- `preview.html` — self-contained preview copy (regenerate after edits, see below)

## Previewing locally

```sh
cd ~/workspace/your_files/wilfredolaboy-site
python3 -m http.server 8931
# open http://localhost:8931/
```

## Adding a devlog / field-notes post

Posts are just cards. Copy one of the existing cards in `index.html`
(in the `#devlog` cards on the Ronin side, or the "Field notes" cards on the
professional side) and edit the tag, title, blurb, and link.

- **Devlog cards** are links (`<a class="card post-card post-link">`) — point the
  `href` at the real YouTube video or playlist URL (they currently point at
  `https://www.youtube.com/` as placeholders — search `TODO` in index.html).
- **Field-notes cards** are plain `<article>` cards. Change the `quest-tag`
  from "Coming soon" to a date or topic tag when published.

If the lists grow long, consider moving to a tiny static-site generator —
but hand-edited cards are fine well into the dozens.

## Wiring the contact form (Formspree)

1. Create a free account at https://formspree.io and create a form.
2. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` with your
   form ID: `https://formspree.io/f/<your-id>`.
3. Until then, submissions show a friendly notice pointing visitors at the
   email link (handled in `script.js`) — the form never silently fails.

## Deploying to GitHub Pages (custom domain)

1. Push this folder's contents to a repo (e.g. `wilfredolaboy/wilfredolaboy.github.io`
   or any repo name).
2. Repo **Settings → Pages → Deploy from a branch** → `main` / `/ (root)`.
3. **Settings → Pages → Custom domain**: enter `wilfredolaboy.com` (creates the
   `CNAME` file automatically).
4. In IONOS DNS for `wilfredolaboy.com`:
   - Four `A` records on `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - One `CNAME` on `www` → `<github-username>.github.io`
   - Leave `MX` records untouched so email keeps working.
5. Back in Pages settings, enable **Enforce HTTPS** once DNS resolves.

## Regenerating preview.html

`preview.html` is a single-file copy (CSS/JS inlined, images as base64) for
quick sharing. Regenerate after edits:

```sh
python3 - <<'EOF'
import base64
d = "/home/hatch/workspace/your_files/wilfredolaboy-site/"
html = open(d + "index.html").read()
css = open(d + "styles.css").read()
js = open(d + "script.js").read()
def b64(p):
    return "data:image/webp;base64," + base64.b64encode(open(d + p, "rb").read()).decode()
html = html.replace('src="assets/hero-professional.webp"', 'src="' + b64("assets/hero-professional.webp") + '"')
html = html.replace('src="assets/hero-ronin.webp"', 'src="' + b64("assets/hero-ronin.webp") + '"')
html = html.replace('<link rel="stylesheet" href="styles.css">', "<style>\n" + css + "\n</style>")
html = html.replace('<script src="script.js"></script>', "<script>\n" + js + "\n</script>")
open(d + "preview.html", "w").write(html)
print("preview regenerated")
EOF
```
