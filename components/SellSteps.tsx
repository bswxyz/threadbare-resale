import Reveal from './Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Shoot it',
    copy: 'Three photos, any wall, any light. Our listing flow does the cropping and the flattering.',
    art: (
      <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false">
        <rect x="22" y="14" width="76" height="60" rx="8" fill="#f6f3ee" stroke="#141414" strokeWidth="3" />
        <circle cx="60" cy="44" r="17" fill="#2f4bff" stroke="#141414" strokeWidth="3" />
        <circle cx="60" cy="44" r="8" fill="#f6f3ee" stroke="#141414" strokeWidth="3" />
        <rect x="30" y="6" width="18" height="12" rx="4" fill="#ffe14d" stroke="#141414" strokeWidth="3" />
        <circle cx="88" cy="26" r="3.5" fill="#ff8fb1" stroke="#141414" strokeWidth="2" />
        <path d="M14 84 L38 84" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
        <path d="M46 84 L58 84" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Tag its story',
    copy: 'Grade the condition (we verify it), stamp the cities, pass the story tag forward.',
    art: (
      <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false">
        <path d="M30 22 L74 22 L96 44 L74 66 L30 66 Z" fill="#ffe14d" stroke="#141414" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="42" cy="44" r="5" fill="#f6f3ee" stroke="#141414" strokeWidth="3" />
        <path d="M56 36 L80 36" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
        <path d="M56 44 L84 44" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
        <path d="M56 52 L74 52" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
        <path d="M18 74 Q34 88 52 78" fill="none" stroke="#2f4bff" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Cash out',
    copy: 'Ship with our prepaid label. Money lands when the buyer smiles — usually about a day.',
    art: (
      <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false">
        <rect x="24" y="26" width="72" height="46" rx="6" fill="#2f4bff" stroke="#141414" strokeWidth="3" />
        <circle cx="60" cy="49" r="13" fill="#ffe14d" stroke="#141414" strokeWidth="3" />
        <path d="M60 42 L60 56 M55 47 Q60 41 64 47 M55 51 Q60 57 64 51" stroke="#141414" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="32" y="18" width="24" height="12" rx="6" fill="#ff8fb1" stroke="#141414" strokeWidth="3" />
        <path d="M96 20 L104 12 M100 24 L110 20" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function SellSteps() {
  return (
    <section id="sell" className="sec sec-pink" aria-labelledby="sell-title">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Sell your stuff</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="sell-title" className="sec-title">
            Your closet is
            <br />a <em>warehouse.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="sec-sub">
            The average wardrobe holds 26 garments that haven&rsquo;t moved in a year. That&rsquo;s
            not clutter, that&rsquo;s inventory. Three steps and it&rsquo;s somebody&rsquo;s new
            favourite:
          </p>
        </Reveal>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 90} className="step">
              <span className="step-n">{s.n}</span>
              <div className="step-art">{s.art}</div>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <p className="sell-cta-row">
            <a className="btn btn-ink" href="#top">
              Start selling — it&rsquo;s free
            </a>
            <span className="sell-fee">10% only when it sells. Zero listing fees, ever.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
