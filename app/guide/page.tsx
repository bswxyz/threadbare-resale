import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Threadbare was built — the guide',
  description:
    'Build notes for Threadbare: a Next.js static-export resale marketplace with a FLIP-animated filterable grid, story-tag card flips, and a color-blocked identity.',
};

export default function Guide() {
  return (
    <div className="guide-wrap">
      <div className="guide-top">
        <Link href="/">← Threadbare</Link>
        <span>The guide · how it was built</span>
      </div>

      <span className="guide-ey">Design showcase · build notes</span>
      <h1>
        A grid that <em>re-hangs itself.</em>
      </h1>
      <p className="guide-sub">
        Threadbare is a circular-fashion resale marketplace concept, built as a Next.js static
        export. There are no photos anywhere — every &ldquo;product shot&rdquo; is a flat SVG
        garment drawn in code — and the centerpiece is a dense, filterable rack whose re-flow is
        animated with nothing but CSS transitions and arithmetic.
      </p>

      <h2>The idea</h2>
      <p>
        Resale sites usually whisper. Threadbare shouts, because its pitch is pride, not
        compromise: <em>loved once, wanted twice.</em> The identity is a stack of color-blocked
        slabs — cobalt, paper, lemon, ink, bubblegum — with thick 2.5&ndash;3px ink borders and
        hard offset shadows (no blur, ever). The type is Schibsted Grotesk at weight 900 for the
        shouting, Inter for the reading, and Space Mono for anything that behaves like a tag:
        grades, sizes, prices-adjacent chips, story stamps.
      </p>
      <p>
        The interaction patterns came from shipped resale products on Mobbin: Depop&rsquo;s dense
        two-column grid with hearts-with-counts and minimal brand/size/price metadata,
        Grailed&rsquo;s fixed four-grade condition scale and live result counts, Vinted&rsquo;s
        seller-trust chip and offer culture, and Vestiaire Collective&rsquo;s plain-language grade
        definitions. Threadbare&rsquo;s own invention is the <strong>story tag</strong> — flip any
        card and the garment shows its passport: owners, cities, kilograms of CO₂e saved.
      </p>

      <h2>The stack</h2>
      <ul>
        <li>
          <strong>Next.js 14 (App Router) with <code>output: &lsquo;export&rsquo;</code>.</strong>{' '}
          The rack is genuinely stateful — one filter model drives twelve cards, a live count, an
          empty state and a sort order — so React earns its keep. The export is plain HTML/JS that
          GitHub Pages can serve.
        </li>
        <li>
          <strong>The Pages recipe:</strong> <code>basePath: &lsquo;/threadbare-resale&rsquo;</code>{' '}
          + <code>assetPrefix</code> + <code>trailingSlash: true</code>, copy <code>out/</code> to{' '}
          <code>docs/</code>, add <code>.nojekyll</code>, point Pages at <code>main /docs</code>.
        </li>
        <li>
          <strong>No animation library, no images.</strong> The grid re-flow, the card flips and
          the counters are hand-rolled; the twelve garments are inline SVG components with a
          shared drawing style (flat fills, 3px ink strokes, a hard 5px silhouette shadow).
        </li>
        <li>
          <strong>Schibsted Grotesk / Inter / Space Mono</strong> via <code>next/font</code> —
          self-hosted at build time, zero runtime font requests.
        </li>
      </ul>

      <h2>Signature technique #1 — the FLIP-ish rack re-flow</h2>
      <p>
        Animating a filtered grid usually means a layout-animation library. Threadbare uses the
        cheaper trick: every card is always in the DOM in a stable order, absolutely positioned,
        and the only thing a filter changes is each card&rsquo;s <code>transform</code>. Slot
        positions are arithmetic, so a plain CSS transition animates the entire re-flow:
      </p>
      <pre>
        <code>{`// slot i in a grid of \`cols\` columns is just arithmetic
const x = (i % cols) * (cardW + gap);
const y = Math.floor(i / cols) * (cardH + gap);

// visible cards animate to their slot; filtered-out cards
// keep their LAST slot and scale away in place
style = {
  transform: \`translate(\${x}px, \${y}px) scale(\${shown ? 1 : 0.82})\`,
  opacity: shown ? 1 : 0,
  visibility: shown ? 'visible' : 'hidden',
  // delays match transition-property order: transform, opacity, visibility
  transitionDelay: shown
    ? \`\${i * 24}ms, \${i * 24}ms, 0ms\`      // entrance stagger
    : '0ms, 0ms, 380ms',                    // exit keeps visibility until done
};`}</code>
      </pre>
      <p>
        Two details carry the craft. First, transitions are only enabled one frame <em>after</em>{' '}
        the first absolute-position paint, so cards don&rsquo;t fly in from the container origin
        on load. Second, <code>visibility</code> rides the transition with a per-property delay:
        instant on entry, delayed 380ms on exit — so departing cards stay visible while they scale
        away, then drop out of the tab order and the accessibility tree. Before JavaScript runs
        (and for no-JS visitors) the same markup renders as a static CSS grid, so the rack is
        never blank. The overshoot in every movement is one named curve,{' '}
        <code>--ease-pop: cubic-bezier(.3, 1.45, .4, 1)</code>.
      </p>

      <h2>Signature technique #2 — story-tag card flips</h2>
      <p>
        Flipping is a button, never a hover. The toggle lives <em>outside</em> the rotating plane,
        so it never disappears mid-flip and stays keyboard-reachable in both states:
      </p>
      <pre>
        <code>{`<div className={flipped ? 'card-inner flipped' : 'card-inner'}>
  <div className="face face-front" aria-hidden={flipped}>…art, badge, meta…</div>
  <div className="face face-back"  aria-hidden={!flipped}>…owners · cities · CO₂e…</div>
  <button aria-pressed={flipped} onClick={() => setFlipped(v => !v)}>
    {flipped ? '× close' : '★ story'}
  </button> {/* sibling of the faces — not a child of the rotating plane */}
</div>`}</code>
      </pre>
      <pre>
        <code>{`.card-inner { transform-style: preserve-3d; transition: transform .65s var(--ease-pop); }
.card-inner.flipped { transform: rotateY(180deg); }
.face { backface-visibility: hidden; }
.face-back { position: absolute; inset: 0; transform: rotateY(180deg); }
/* visibility swaps at mid-flip → hidden face leaves the tab order */
.face-front { transition: visibility 0s .2s; }
.flipped .face-front { visibility: hidden; }`}</code>
      </pre>
      <p>
        Under <code>prefers-reduced-motion</code> the rotation transition is removed, so the same
        button swaps the faces instantly — the story is still fully reachable, nothing spins.
      </p>

      <h2>Details that matter</h2>
      <ul>
        <li>
          <strong>Condition grades are a system, not a sticker.</strong> NWT / EXC / GOOD / LOVED
          each own a palette color, appear on cards, in the filters, and get plain-language
          definitions in the trust band — the same scale everywhere.
        </li>
        <li>
          <strong>The carbon counter counts once.</strong> An IntersectionObserver arms it, an
          expo-out curve lands the digits, and reduced motion snaps straight to the final values.
        </li>
        <li>
          <strong>Filters are real buttons.</strong> Every chip has <code>aria-pressed</code>, the
          result count is a <code>role=&quot;status&quot;</code> live region, and a zero-result
          state offers to loosen the filters.
        </li>
        <li>
          <strong>Contrast per block.</strong> Ink-on-lemon and ink-on-bubblegum clear WCAG AA
          with room to spare; white-on-cobalt passes for body text; white never sits on bubblegum.
        </li>
        <li>
          <strong>Focus is part of the brand.</strong> <code>:focus-visible</code> gets a thick{' '}
          <code>currentColor</code> outline, so the ring is ink on paper sections and paper on ink
          — always visible, always on-palette.
        </li>
      </ul>

      <h2>Ship it on GitHub Pages</h2>
      <pre>
        <code>{`# next.config.mjs
output: 'export'
basePath: '/threadbare-resale'
assetPrefix: '/threadbare-resale/'
trailingSlash: true

npm run build          # emits ./out + touches out/.nojekyll
rm -rf docs && cp -r out docs
git add -A && git commit && git push
# GitHub → Settings → Pages → Deploy from branch → main /docs`}</code>
      </pre>
      <p>
        <code>trailingSlash</code> makes every route a real directory (<code>/guide/index.html</code>),
        which is exactly what a static file host wants; <code>.nojekyll</code> stops Pages from
        swallowing the <code>_next/</code> asset directory.
      </p>

      <div className="guide-foot">
        <span>Designed &amp; built by Parable</span>
        <span>
          <Link href="/">threadbare</Link> · MIT
        </span>
      </div>
    </div>
  );
}
