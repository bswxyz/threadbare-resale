const MARQUEE_WORDS = ['Jackets', 'Knits', 'Denim', 'Dresses', 'Tees', 'Extras', 'Boots', 'Bags'];

function MarqueeRun() {
  return (
    <span className="mq-run">
      {MARQUEE_WORDS.map((w) => (
        <span key={w} className="mq-word">
          {w} <span className="mq-star">★</span>{' '}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero sec-cobalt" aria-labelledby="hero-title">
      <div className="wrap hero-inner">
        <p className="eyebrow hl hl-1">Circular-fashion resale · est. 2026</p>
        <h1 id="hero-title" className="hero-title">
          <span className="hline">
            <span className="hl hl-2">Loved once.</span>
          </span>
          <span className="hline">
            <span className="hl hl-3">
              Wanted <em>twice.</em>
            </span>
          </span>
        </h1>
        <p className="hero-sub hl hl-4">
          Threadbare is the marketplace where clothes go to live again — human-graded condition,
          a passport of everywhere they&rsquo;ve been, and the carbon math to prove second-hand
          is first-rate.
        </p>
        <div className="hero-ctas hl hl-5">
          <a className="btn btn-lemon" href="#rack">
            Shop the rack ↓
          </a>
          <a className="btn btn-ghost" href="#sell">
            Sell your stuff
          </a>
        </div>

        {/* sticker badges */}
        <div className="sticker sticker-1 hl hl-6" aria-hidden="true">
          <span>−92%</span> CO₂e vs buying new
        </div>
        <div className="sticker sticker-2 hl hl-6" aria-hidden="true">
          12,408 garments rehomed this month
        </div>
      </div>

      {/* category marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="mq-track">
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>
    </section>
  );
}
