# IronForge Fitness

A four-page gym website with program pages, membership tiers and a validated contact form that hands off to WhatsApp.

**Live:** https://gym-ironforge-lyart.vercel.app

Source code is in this repo — hand-written HTML/CSS/vanilla JS, no build step. Serve the folder locally (see below).

## About

IronForge Fitness is a demo gym site: a four-page build for a training centre in Lahore, covering the homepage, the program list, the about page and contact. It is the most complete of the gym builds in this set — photography, membership pricing and a form that validates input before passing the enquiry to WhatsApp.

## Tech stack

| | |
|---|---|
| Markup | HTML5, four pages |
| Styling | `css/style.css`, CSS custom properties, `clamp()` type scale |
| Script | `js/main.js` — vanilla JS in one IIFE, no dependencies |
| Fonts | Google Fonts |
| Images | 12 local JPEGs in `images/` (`gym-01.jpg` … `gym-12.jpg`) |
| Icons | `favicon.svg` and `favicon.ico` |
| Build | None. No `package.json`, no dependencies |
| Hosting | Vercel, static hosting |

## Features

Everything below is implemented in the repo.

- **Four pages** — `index.html`, `programs.html`, `about.html`, `contact.html` — sharing one stylesheet and one script.
- **Program library** — six training styles (strength, conditioning/HIIT, CrossFit, yoga, group and women's training), each with its own WhatsApp enquiry button carrying a pre-filled programme name.
- **Membership pricing** — monthly, quarterly and annual tiers, with the middle tier flagged as featured.
- **Photo gallery** on the about page, built from the local `images/` files with captions.
- **Validated contact form** (`#contact-form`) — checks that the name is at least two characters, that the phone matches a digits/spaces/brackets pattern, and that a fitness goal is selected. Errors render inline per field via `.form-error` / `.has-error`, and nothing is sent until the form is valid.
- **WhatsApp handoff** — a valid submission opens WhatsApp with the name, phone, goal and any note formatted as a message.
- **Count-up statistics** — animated from 0 to their `data-count` target on scroll, with thousands separators.
- **Scroll progress bar** and **reveal-on-scroll** via `IntersectionObserver`.
- **Staggered reveals** — grid children get an incremental `transition-delay`.
- **Hero parallax** — the hero background layer translates on scroll, throttled through `requestAnimationFrame`.
- **Cursor spotlight** — cards track the pointer and expose `--mx` / `--my` custom properties.
- **Mobile navigation** — header-level `nav-open` class with `aria-expanded` kept in sync.
- **Accessibility / motion** — `prefers-reduced-motion: reduce` disables parallax and the spotlight; scroll listeners are `passive`.
- **Responsive** — breakpoints at 1020px and 640px.
- Google Maps link on the contact page.

## Project structure

```
.
├── index.html        # homepage
├── programs.html     # training programs
├── about.html        # story + gallery
├── contact.html      # contact + validated form
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/           # gym-01.jpg … gym-12.jpg
├── favicon.svg
├── favicon.ico
├── .gitignore        # ignores .vercel
└── .vercel/          # Vercel project link (projectName: gym)
```

## Local preview

No install step. The pages cross-link each other and load `css/`, `js/` and `images/` by relative path, so serve them over HTTP:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- **Practice build.** The gym, its location, coaches, prices, opening hours and member testimonials are sample content written for the demo — not a real business and not a delivered client project.
- The WhatsApp number in `js/main.js` is Abdul's own, used here as the demo's contact channel.
- `gym-landing` in the same collection is the single-page version of this same brand, built as a lead-capture campaign page.
- There is no backend. The form validates client-side and then hands off to WhatsApp.
