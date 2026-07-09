import Reveal from './Reveal';

/**
 * STORY TAGS — the feature section. A big annotated "story passport" card
 * shows what flipping any rack card reveals: owners, cities, CO2e, the note.
 */
export default function StorySection() {
  return (
    <section id="stories" className="sec sec-lemon" aria-labelledby="stories-title">
      <div className="wrap story-grid">
        <div className="story-copy">
          <Reveal>
            <p className="eyebrow">Story tags</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="stories-title" className="sec-title">
              Every garment
              <br />
              has <em>receipts.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="sec-sub">
              New clothes arrive with a barcode. Ours arrive with a biography. Flip any card on
              the rack and you get the garment&rsquo;s story tags — how many people loved it,
              which cities it&rsquo;s seen, and the carbon it saved by not being made twice.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="story-points">
              <li>
                <strong>Owners, counted.</strong> Sellers pass the tag forward — provenance
                without the paperwork.
              </li>
              <li>
                <strong>Cities, stamped.</strong> A jacket that&rsquo;s done Lisbon → Berlin →
                Leeds has stories your new-in-box one never will.
              </li>
              <li>
                <strong>Carbon, receipted.</strong> Each resale logs the CO₂e a new-make would
                have cost. Bragging rights included.
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="story-visual-wrap">
          <figure className="passport" aria-label="Example story passport for the broke-in trucker jacket">
            <figcaption className="passport-head">
              <span>Story passport</span>
              <span className="passport-no">Nº 04211</span>
            </figcaption>
            <h3 className="passport-item">Broke-in trucker jacket</h3>
            <div className="passport-tags">
              <span className="ptag ptag-cobalt">3 owners</span>
              <span className="ptag ptag-pink">3 cities</span>
              <span className="ptag ptag-ink">19 kg CO₂e saved</span>
            </div>
            <ol className="passport-route">
              <li>
                <span className="stamp">01</span> Lisbon — bought full price, worn to one
                heartbreak
              </li>
              <li>
                <span className="stamp">02</span> Berlin — three winters, two festivals
              </li>
              <li>
                <span className="stamp">03</span> Leeds — star patch added. Improved.
              </li>
            </ol>
            <p className="passport-foot">
              ≈ 19 kg CO₂e saved · that&rsquo;s 158 phone charges the planet skipped
            </p>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
