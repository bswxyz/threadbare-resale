import Reveal from './Reveal';
import { CONDITIONS, CONDITION_LABELS } from '@/lib/garments';

const GRADE_COPY: Record<string, string> = {
  NWT: 'Never worn, tags attached. Somebody’s optimism, your gain.',
  EXC: 'Worn a handful of times. Looks new unless you interrogate the seams.',
  GOOD: 'Honest wear, zero flaws that matter. Photographed, not filtered.',
  LOVED: 'Visibly lived-in — fades, softness, character. Priced like it, loved like it.',
};

export default function TrustBand() {
  return (
    <section className="sec sec-paper trust" aria-labelledby="trust-title">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">The grade scale</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="trust-title" className="sec-title">
            Graded by humans.
            <br />
            Guaranteed by <em>us.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="sec-sub">
            Every listing is condition-checked by a Threadbare grader before it ships — the grade
            on the tag is the garment in your hands, or your money back.
          </p>
        </Reveal>

        <ul className="grades">
          {CONDITIONS.map((c, i) => (
            <Reveal key={c} as="li" delay={i * 80} className="grade">
              <span className={`badge badge-lg badge-${c.toLowerCase()}`}>{c}</span>
              <h3>{CONDITION_LABELS[c]}</h3>
              <p>{GRADE_COPY[c]}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={240}>
          <p className="trust-foot">
            <span className="tick" aria-hidden="true">
              ✓
            </span>
            Buyer protection on every order · misgraded? Full refund, return label on us.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
