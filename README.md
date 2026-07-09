# Threadbare

**Live:** https://bswxyz.github.io/threadbare-resale/ · **Build notes:** https://bswxyz.github.io/threadbare-resale/guide/

A circular-fashion resale marketplace concept with a working, animated filterable rack —
part of the [Parable 25 design showcase](https://bswxyz.github.io/fable-hub/).

---

## The concept

Threadbare is peer-to-peer clothing resale with pride instead of apology: every garment carries a
human-verified condition grade (NWT / EXC / GOOD / LOVED), a **story tag** — how many owners it's
had, which cities it's seen, the CO₂e it saved by not being made twice — and the marketplace keeps
a running wardrobe carbon counter. The site's job is to make second-hand feel first-rate in the
first five seconds: a shouting color-blocked hero, a dense rack you can actually filter and sort,
and cards that flip over to show their receipts.

## Design system

- **Palette (color-blocked):**
  `--cobalt:#2f4bff` · `--lemon:#ffe14d` · `--bubblegum:#ff8fb1` · `--ink:#141414` ·
  `--paper:#f6f3ee` · `--line:rgba(20,20,20,.14)`. Whole sections flip background —
  cobalt → paper → lemon → ink → bubblegum → paper → ink — with thick 2.5–3px ink borders and
  hard offset shadows (no blur anywhere). Contrast is checked per block: ink rides lemon and
  bubblegum; white rides cobalt; white never sits on bubblegum.
- **Type trio: `Schibsted Grotesk` (900/700, display) · `Inter` (body) · `Space Mono` (tags,
  grades, prices-adjacent chips).** Schibsted was chosen over Familjen Grotesk because it carries
  a true 900 Black — the headlines need to shout. The trio is unique in the 25-site lineage.
- **Signature motion:** one energetic overshoot curve — `--ease-pop: cubic-bezier(.3,1.45,.4,1)` —
  drives the grid re-flow, card flips, chip hovers and button presses; a clipped-line hero intro;
  a category marquee; counters with an expo-out settle.
- **Why it fits:** resale with personality means nothing is precious — stickers rotate, shadows
  are stamped, the marquee is slightly crooked — but the grading system underneath is rigorous,
  and the design mirrors that split: playful surfaces, systematic tokens.

## Stack

- **Next.js 14 (App Router), TypeScript, static export.** `output:'export'` +
  `basePath:'/threadbare-resale'` + `trailingSlash:true`; the build emits plain HTML/JS to `out/`,
  which is copied to `docs/` for GitHub Pages (with `.nojekyll`).
- **No animation library, no chart library, no images.** The FLIP-ish grid re-flow is absolute
  positioning + transform transitions; the card flip is CSS `preserve-3d` behind a real button;
  the twelve product "photos" are flat inline-SVG garment illustrations drawn in code.
- **`next/font`** self-hosts the three Google fonts at build time — the export makes zero runtime
  font requests.
- React earns its keep here: one filter model (category / size / condition / sort) drives twelve
  cards, a live result count, an empty state, and the animated re-flow.

## Running it locally

```bash
git clone https://github.com/bswxyz/threadbare-resale
cd threadbare-resale
npm install
npm run dev        # http://localhost:3000/threadbare-resale/
npm run build      # static export → out/
```

## Structure

```
app/layout.tsx            fonts, metadata, skip link, .js progressive-enhancement gate
app/page.tsx              section assembly (hero → rack → stories → carbon → sell → trust)
app/globals.css           all styling — design tokens live in :root at the top
app/guide/page.tsx        the "how it was built" write-up, styled to the site
components/Rack.tsx       the filterable grid + FLIP-ish re-flow (the signature)
components/GarmentCard.tsx  card front/back, accessible story flip, like + offer state
components/GarmentArt.tsx 12 flat SVG garment illustrations (the "product photos")
components/*.tsx          hero, story section, carbon counters, sell steps, trust band…
lib/garments.ts           the 12 fictional garments, grades, stories, impact stats
lib/hooks.ts              useReducedMotion · useInView · useCountUp
docs/                     the deployed static export (GitHub Pages serves this)
```

## Demo vs. real — what a production version would need

This is an intentionally-scoped demo. What's **mocked/static** today:

- **Every garment, seller, price, like-count and story is fictional**, hand-written in
  `lib/garments.ts`. There are 12 items; a real marketplace has millions and needs server-side
  search, pagination and ranking — the client-side filter here is the *interaction* demo, not the
  architecture.
- **No marketplace backend.** No accounts, auth, listings CRUD, messaging, offers engine,
  payments/escrow, shipping labels or buyer protection — the "Make an offer" button just flips
  local state. A real build needs all of it, plus fraud and dispute tooling.
- **Condition grading is a promise, not a pipeline.** Real human-verified grading means intake
  logistics, grader tooling, and appeal flows.
- **The carbon math is illustrative.** Figures use published per-garment lifecycle averages
  (WRAP / Ellen MacArthur Foundation); a defensible product would need per-item LCA methodology
  and third-party review before printing numbers on receipts.
- **Story tags would need provenance data** carried across resales — a genuinely fun schema
  problem (owner count, city stamps, transfer events) that this demo fakes in a JSON literal.

What's **real** and reusable as-is: the animated filterable-grid technique (absolute slots +
transform transitions + per-property visibility delays), the accessible button-driven card flip,
the reduced-motion strategy, the SVG illustration system, the grading design language, and the
whole responsive/keyboard/focus layer.

## License

[MIT](LICENSE). Design & build by **Parable** (Anthropic's Claude). No image assets — everything is
CSS and SVG.
