# Mishpat Capital Management — website

A single-page site. Astro (static output) + Tailwind CSS v4 + `@astrojs/sitemap`.
No CMS, no database, no forms, no build-time data fetching.

## Run it

Requires Node 22+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built output
```

## Before launch

**Domain.** `site:` in `astro.config.mjs` sets canonical URLs and the sitemap.
Update it if the real domain differs from `https://www.mishpatcapital.com`.

Optional: drop a `public/og-image.png` (1200×630) in place — the meta tags
already point at it.

There is nothing else to wire up. The contact section is plain text and a
`mailto:` link, so no form service, no API keys, no server.

## Structure

```
src/
  pages/index.astro         the entire site — hero + four sections
  data/site.ts              nav, contact details, firm description — edit here first
  layouts/BaseLayout.astro  <head>, meta/OG tags, header + footer, schema.org
  components/
    Nav.astro               sticky grey header, anchor links, scroll spy
    Footer.astro            section links, investor contact, legal disclaimers
    DawnStrip.astro         3px gradient rule used as a divider
    Logo.astro              the columns mark, inline SVG
    Wordmark.astro          the "MISHPAT" wordmark, inline SVG
  styles/global.css         palette tokens, fonts, gradient, motion
public/                     favicon.svg, robots.txt, logo assets
```

Everything lives in one route. Copy sits inline in `index.astro`; repeated data
(nav labels, contact details) lives in `src/data/site.ts`.

### One page, four sections

| Section | Anchor | Contents |
|---|---|---|
| Hero | — | Mark, positioning line, two calls to action |
| About | `#about` | Firm overview, founding, and the meaning of the name |
| Investment Philosophy | `#philosophy` | Downside-first thesis and the five underwriting principles |
| What We Do | `#what-we-do` | Four strategies, then six representative transactions |
| Contact | `#contact` | Uri Szapiro — email, phone, geographic focus |

Header links scroll to these anchors rather than loading pages. `scroll-margin-top:
5rem` on `section[id]` stops the sticky header covering each heading on arrival,
and an `IntersectionObserver` in `Nav.astro` marks the section currently in view.
Smooth scrolling is disabled automatically under `prefers-reduced-motion`.

Adding a section means adding a `<section id="…">` in `index.astro` and an entry
in `site.nav` — the scroll spy picks it up with no further wiring.

## Design notes

**Structure.** Modelled on diametercap.com: one continuous page, anchor
navigation, and section-level contrast doing the work that page boundaries used
to. The earlier six-page version put About, What We Do, Why Us, Team and Contact
behind separate loads; all of that content now reads in one scroll, minus the
team roster.

**Contact.** Plain contact information, no form — Uri Szapiro only. Dov Szapiro
and the Vice President are not listed anywhere on the site, and partner
biographies were removed earlier.

**Contrast.** Sections alternate deep navy against white, closing on the brand
grey that the header also uses. Light blue is reserved for small accents. The
palette hexes are unchanged from the brand spec, but small text uses
higher-contrast members of the same family:

| Use | Colour | Ratio |
|---|---|---|
| Body copy on white | `#3F4A6B` | 8.7:1 |
| Eyebrows / meta on white | `#2F5496` | 7.4:1 |
| Eyebrows on navy | `#93C0EA` | 7.4:1 |
| Header links on grey | `#3F4A6B` on `#E7E6E6` | 7.0:1 |

All text clears WCAG AA; body and headline pairs clear AAA. The hero gradient
resolves to light blue at the bottom, so no text is placed there.

**Palette** (unchanged, from the logo and presentation XML)

`#1C2951` navy · `#2F3F75` logo blue · `#2F5496` heading blue · `#4472C4` accent ·
`#5B9BD5` light blue · `#E7E6E6` light grey · `#333333` charcoal

**Type**: Fraunces (display serif) + Segoe UI / Inter (sans), via Google Fonts.

## Logo

Taken from `MISHPAT_LOGO_NO_TAGLINE_CENTRED.pdf`. The mark is six columns on a
140×140 grid — stroke 10, pitch 26 — measured off the artwork and rebuilt as plain
SVG rectangles, so it stays sharp at any size. The wordmark outlines are lifted
from the PDF's own vector paths, so the letterforms are the real ones rather than
a font substitution.

Both inherit `currentColor`:

- **Header** — grey band (`#E7E6E6`), mark in logo navy `#2F3F75`, wordmark in the
  artwork's black `#373435`. The primary colourway.
- **Footer** — reversed to white on navy.
- **Hero** — mark alone in white, since the firm name follows in text.

Standalone assets for decks and email signatures:

| File | What it is |
|---|---|
| `public/logo-mark.svg` | mark only, navy |
| `public/logo-wordmark.svg` | wordmark only |
| `public/logo-lockup.svg` | stacked lockup — matches the source PDF |
| `public/favicon.svg` | white mark on a navy tile |

## Deploy

Static output — Cloudflare Pages, Vercel, and Netlify all work unchanged.

**Updating the existing Netlify site:** open the site in Netlify → **Deploys** →
drag the new `dist` folder onto the deploy area. It replaces the live version in
seconds; no rebuild or CLI needed.

**Cloudflare Pages:** push to GitHub → Pages → Create project → connect the repo →
build command `npm run build`, output directory `dist`, Node version `22`.

### Preview builds

Three environment variables adapt the build to a preview host without editing
links:

```bash
BASE_PATH=/some-subpath \        # if the host serves from a subdirectory
SITE_URL=https://preview.example \
PUBLIC_NOINDEX=true \            # adds <meta robots="noindex">, drops canonical
npm run build
```

Leave all three unset for production.

### Restricting who can see it

A Netlify Drop URL is unlisted, not private — unguessable and excluded from search
engines, but anyone holding the link can open it. For genuine access control, put
Cloudflare Access in front of a Cloudflare Pages deployment and allow specific
email addresses; each viewer gets a one-time code by email. Free for up to 50
users.
