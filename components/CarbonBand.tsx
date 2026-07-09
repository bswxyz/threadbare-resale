'use client';

import { useCountUp, useInView } from '@/lib/hooks';
import { IMPACT } from '@/lib/garments';

function Stat({
  value,
  active,
  label,
  equiv,
  format,
}: {
  value: number;
  active: boolean;
  label: string;
  equiv: string;
  format?: (n: number) => string;
}) {
  const n = useCountUp(value, active);
  const fmt = format ?? ((x: number) => x.toLocaleString('en-US'));
  return (
    <div className="cstat">
      <span className="cstat-num">{fmt(n)}</span>
      <span className="cstat-label">{label}</span>
      <span className="cstat-equiv">{equiv}</span>
    </div>
  );
}

/**
 * The wardrobe CARBON COUNTER — animated counters with equivalence microcopy.
 * Counts up once when scrolled into view; reduced motion snaps instantly.
 */
export default function CarbonBand() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);

  return (
    <section id="impact" className="sec sec-ink carbon" aria-labelledby="impact-title">
      <div className="wrap" ref={ref}>
        <p className="eyebrow">The wardrobe carbon counter</p>
        <h2 id="impact-title" className="sec-title">
          Worn in, <em>not</em> worn out.
        </h2>
        <p className="sec-sub carbon-sub">
          Every rehomed garment is one that didn&rsquo;t have to be grown, dyed, sewn and shipped
          twice. The community counter, live-ish:
        </p>
        <div className="cstats">
          <Stat
            value={IMPACT.co2Kg}
            active={inView}
            label="kg CO₂e saved"
            equiv="≈ 535 flights LHR → JFK not taken"
          />
          <Stat
            value={IMPACT.rehomed}
            active={inView}
            label="garments rehomed"
            equiv="≈ one mid-size landfill politely declined"
          />
          <Stat
            value={IMPACT.waterL}
            active={inView}
            label="litres of water spared"
            equiv="≈ 38 Olympic pools still full"
            format={(n) => (n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n.toLocaleString('en-US'))}
          />
        </div>
        <p className="carbon-note">
          Estimates use WRAP &amp; Ellen MacArthur Foundation lifecycle averages per garment
          class. Your mileage may vary; the planet&rsquo;s gratitude won&rsquo;t.
        </p>
      </div>
    </section>
  );
}
