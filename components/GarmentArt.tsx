import type { ArtKind } from '@/lib/garments';

const INK = '#141414';

/**
 * Flat, editorial garment illustrations — the site's "product photos".
 * Every garment is drawn in a 200×220 box: a hard offset shadow (the
 * silhouette re-filled in ink, shifted 5px), then the garment in 2–3 flat
 * fills with thick ink strokes. No images anywhere.
 */
export default function GarmentArt({
  kind,
  body,
  accent,
}: {
  kind: ArtKind;
  body: string;
  accent: string;
}) {
  const stroke = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;
  const thin = { ...stroke, strokeWidth: 2 } as const;

  const TEE = 'M63 50 L86 36 Q100 50 114 36 L137 50 L160 86 L133 102 L133 184 L67 184 L67 102 L40 86 Z';
  const JEANS = 'M60 60 L140 60 L146 186 L110 186 L102 110 L98 110 L90 186 L54 186 Z';
  const SKIRT = 'M66 64 L134 64 L158 172 L42 172 Z';
  const BODICE = 'M70 50 L130 50 L124 102 L76 102 Z';
  const DRESS_SKIRT = 'M76 102 L124 102 L152 182 L48 182 Z';
  const SLIP = 'M84 62 L92 54 L100 62 L108 54 L116 62 L126 178 L74 178 Z';
  const DOME = 'M66 128 Q66 76 100 76 Q134 76 134 128 Z';
  const BRIM = 'M46 128 L154 128 L166 150 L34 150 Z';

  let shadow: React.ReactNode = null;
  let art: React.ReactNode = null;

  switch (kind) {
    case 'tee': {
      shadow = <path d={TEE} fill={INK} />;
      art = (
        <g>
          <path d={TEE} fill={body} {...stroke} />
          {/* ringer trims */}
          <path d="M86 36 Q100 50 114 36" fill="none" stroke={accent} strokeWidth={7} strokeLinecap="round" />
          <path d="M45 79 L69 94" stroke={accent} strokeWidth={7} strokeLinecap="round" />
          <path d="M155 79 L131 94" stroke={accent} strokeWidth={7} strokeLinecap="round" />
          {/* sun print */}
          <circle cx={100} cy={132} r={15} fill={accent} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1={100 + 21 * Math.cos((deg * Math.PI) / 180)}
              y1={132 + 21 * Math.sin((deg * Math.PI) / 180)}
              x2={100 + 27 * Math.cos((deg * Math.PI) / 180)}
              y2={132 + 27 * Math.sin((deg * Math.PI) / 180)}
              stroke={accent}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
          ))}
        </g>
      );
      break;
    }
    case 'band': {
      shadow = <path d={TEE} fill={INK} />;
      art = (
        <g>
          <path d={TEE} fill={body} {...stroke} />
          <path d="M86 36 Q100 50 114 36" fill="none" stroke={accent} strokeWidth={5} strokeLinecap="round" />
          {/* lightning bolt */}
          <path d="M110 88 L86 128 L100 128 L88 164 L120 118 L105 118 L120 88 Z" fill={accent} {...thin} />
          <line x1={82} y1={172} x2={118} y2={172} stroke={accent} strokeWidth={4} strokeLinecap="round" />
        </g>
      );
      break;
    }
    case 'trucker': {
      shadow = (
        <>
          <path d="M38 60 L60 56 L62 168 L28 168 Z" fill={INK} />
          <path d="M140 56 L162 60 L172 168 L138 168 Z" fill={INK} />
          <path d="M58 56 L142 56 L148 168 L52 168 Z" fill={INK} />
        </>
      );
      art = (
        <g>
          {/* sleeves */}
          <path d="M60 58 L38 62 Q32 64 31 84 L28 166 L58 166 Z" fill={body} {...stroke} />
          <path d="M140 58 L162 62 Q168 64 169 84 L172 166 L142 166 Z" fill={body} {...stroke} />
          {/* body */}
          <path d="M58 56 L142 56 L148 168 L52 168 Z" fill={body} {...stroke} />
          {/* collar */}
          <path d="M84 56 L100 74 L68 66 Z" fill={body} {...stroke} />
          <path d="M116 56 L100 74 L132 66 Z" fill={body} {...stroke} />
          {/* placket + buttons */}
          <line x1={100} y1={74} x2={100} y2={168} {...stroke} />
          {[92, 114, 136, 156].map((y) => (
            <circle key={y} cx={100} cy={y} r={3.5} fill={accent} stroke={INK} strokeWidth={2} />
          ))}
          {/* chest pockets with accent flaps */}
          <rect x={64} y={98} width={24} height={20} fill={body} {...thin} />
          <path d="M62 92 L90 92 L88 102 L64 102 Z" fill={accent} {...thin} />
          <rect x={112} y={98} width={24} height={20} fill={body} {...thin} />
          <path d="M110 92 L138 92 L136 102 L112 102 Z" fill={accent} {...thin} />
          {/* hem band */}
          <line x1={54} y1={156} x2={146} y2={156} {...thin} strokeDasharray="5 5" />
          {/* star patch — sewn on by owner #3 */}
          <path
            d="M126 130 L130 140 L141 140 L132 147 L136 158 L126 151 L116 158 L120 147 L111 140 L122 140 Z"
            fill={accent}
            {...thin}
          />
        </g>
      );
      break;
    }
    case 'puffer': {
      shadow = (
        <>
          <rect x={52} y={54} width={96} height={132} rx={16} fill={INK} />
          <rect x={28} y={64} width={26} height={98} rx={13} fill={INK} />
          <rect x={146} y={64} width={26} height={98} rx={13} fill={INK} />
        </>
      );
      art = (
        <g>
          {/* sleeves */}
          <rect x={28} y={64} width={26} height={98} rx={13} fill={body} {...stroke} />
          <rect x={146} y={64} width={26} height={98} rx={13} fill={body} {...stroke} />
          <line x1={30} y1={96} x2={52} y2={96} {...thin} />
          <line x1={30} y1={128} x2={52} y2={128} {...thin} />
          <line x1={148} y1={96} x2={170} y2={96} {...thin} />
          <line x1={148} y1={128} x2={170} y2={128} {...thin} />
          {/* collar */}
          <rect x={76} y={40} width={48} height={20} rx={9} fill={body} {...stroke} />
          {/* quilted body */}
          <rect x={56} y={58} width={88} height={34} rx={15} fill={body} {...stroke} />
          <rect x={53} y={90} width={94} height={34} rx={15} fill={body} {...stroke} />
          <rect x={52} y={122} width={96} height={34} rx={15} fill={body} {...stroke} />
          <rect x={54} y={154} width={92} height={30} rx={14} fill={body} {...stroke} />
          {/* zip */}
          <line x1={100} y1={46} x2={100} y2={180} stroke={accent} strokeWidth={3.5} strokeDasharray="7 5" strokeLinecap="round" />
          <circle cx={100} cy={186} r={4} fill={accent} />
        </g>
      );
      break;
    }
    case 'jeans': {
      shadow = <path d={JEANS} fill={INK} />;
      art = (
        <g>
          <path d={JEANS} fill={body} {...stroke} />
          {/* waistband */}
          <rect x={60} y={46} width={80} height={14} fill={body} {...stroke} />
          <circle cx={100} cy={53} r={3.5} fill={accent} />
          {/* fly + pocket stitches */}
          <path d="M100 60 Q95 74 98 92" fill="none" stroke={accent} strokeWidth={2.5} strokeDasharray="4 4" />
          <path d="M62 66 Q76 84 88 66" fill="none" stroke={accent} strokeWidth={2.5} strokeDasharray="4 4" />
          <path d="M138 66 Q124 84 112 66" fill="none" stroke={accent} strokeWidth={2.5} strokeDasharray="4 4" />
          {/* outseam stitches */}
          <line x1={64} y1={70} x2={58} y2={172} stroke={accent} strokeWidth={2.5} strokeDasharray="4 4" />
          <line x1={136} y1={70} x2={142} y2={172} stroke={accent} strokeWidth={2.5} strokeDasharray="4 4" />
          {/* cuffs */}
          <rect x={53} y={174} width={38} height={12} fill={accent} {...thin} />
          <rect x={109} y={174} width={38} height={12} fill={accent} {...thin} />
        </g>
      );
      break;
    }
    case 'skirt': {
      shadow = <path d={SKIRT} fill={INK} />;
      art = (
        <g>
          <path d={SKIRT} fill={body} {...stroke} />
          <rect x={66} y={50} width={68} height={14} fill={body} {...stroke} />
          {/* button placket */}
          <line x1={100} y1={64} x2={100} y2={172} {...thin} />
          {[80, 104, 128, 152].map((y) => (
            <circle key={y} cx={100} cy={y} r={4} fill={accent} stroke={INK} strokeWidth={2} />
          ))}
          {/* patch pockets */}
          <path d="M66 76 Q80 92 92 76" fill="none" stroke={accent} strokeWidth={2.5} strokeDasharray="4 4" />
          <path d="M134 76 Q120 92 108 76" fill="none" stroke={accent} strokeWidth={2.5} strokeDasharray="4 4" />
          {/* hem stitch */}
          <line x1={48} y1={162} x2={152} y2={162} stroke={accent} strokeWidth={2.5} strokeDasharray="5 5" />
        </g>
      );
      break;
    }
    case 'cardigan': {
      shadow = (
        <>
          <rect x={50} y={48} width={100} height={130} rx={14} fill={INK} />
          <rect x={26} y={58} width={24} height={102} rx={12} fill={INK} />
          <rect x={150} y={58} width={24} height={102} rx={12} fill={INK} />
        </>
      );
      art = (
        <g>
          <rect x={26} y={58} width={24} height={102} rx={12} fill={body} {...stroke} />
          <rect x={150} y={58} width={24} height={102} rx={12} fill={body} {...stroke} />
          <rect x={50} y={48} width={100} height={130} rx={14} fill={body} {...stroke} />
          {/* inner shirt at the V */}
          <path d="M84 48 L116 48 L100 94 Z" fill={accent} {...stroke} />
          <line x1={100} y1={94} x2={100} y2={178} {...stroke} />
          {/* buttons on the left placket */}
          {[108, 128, 148, 166].map((y) => (
            <circle key={y} cx={93} cy={y} r={3.5} fill={accent} stroke={INK} strokeWidth={2} />
          ))}
          {/* ribbed hem + cuffs */}
          <line x1={52} y1={166} x2={148} y2={166} {...thin} strokeDasharray="3 5" />
          <line x1={28} y1={148} x2={50} y2={148} {...thin} strokeDasharray="3 5" />
          <line x1={150} y1={148} x2={172} y2={148} {...thin} strokeDasharray="3 5" />
          {/* pockets */}
          <rect x={60} y={140} width={22} height={16} fill={body} {...thin} />
          <rect x={118} y={140} width={22} height={16} fill={body} {...thin} />
        </g>
      );
      break;
    }
    case 'breton': {
      shadow = (
        <>
          <path d="M54 52 L146 52 L150 178 L50 178 Z" fill={INK} />
          <rect x={28} y={58} width={24} height={104} rx={12} fill={INK} />
          <rect x={148} y={58} width={24} height={104} rx={12} fill={INK} />
        </>
      );
      art = (
        <g>
          <rect x={28} y={58} width={24} height={104} rx={12} fill={body} {...stroke} />
          <rect x={148} y={58} width={24} height={104} rx={12} fill={body} {...stroke} />
          <path d="M54 52 L146 52 L150 178 L50 178 Z" fill={body} {...stroke} />
          {/* stripes */}
          {[74, 98, 122, 146].map((y, i) => (
            <rect key={y} x={53 - i} y={y} width={94 + i * 2} height={9} fill={accent} stroke="none" />
          ))}
          <rect x={31} y={86} width={18} height={8} fill={accent} stroke="none" />
          <rect x={31} y={112} width={18} height={8} fill={accent} stroke="none" />
          <rect x={151} y={86} width={18} height={8} fill={accent} stroke="none" />
          <rect x={151} y={112} width={18} height={8} fill={accent} stroke="none" />
          {/* boat neck */}
          <rect x={72} y={45} width={56} height={12} rx={6} fill={accent} {...stroke} />
          {/* cuffs */}
          <rect x={28} y={152} width={24} height={10} rx={4} fill={accent} {...thin} />
          <rect x={148} y={152} width={24} height={10} rx={4} fill={accent} {...thin} />
        </g>
      );
      break;
    }
    case 'polka': {
      shadow = (
        <>
          <path d={BODICE} fill={INK} />
          <path d={DRESS_SKIRT} fill={INK} />
        </>
      );
      const dots: [number, number][] = [
        [84, 66], [104, 74], [118, 62], [92, 88], [114, 92],
        [70, 122], [96, 118], [124, 124], [82, 144], [110, 146],
        [64, 168], [92, 170], [122, 168], [140, 150],
      ];
      art = (
        <g>
          {/* puff sleeves */}
          <circle cx={62} cy={62} r={15} fill={body} {...stroke} />
          <circle cx={138} cy={62} r={15} fill={body} {...stroke} />
          <path d={BODICE} fill={body} {...stroke} />
          <path d={DRESS_SKIRT} fill={body} {...stroke} />
          {/* neckline */}
          <path d="M86 50 Q100 62 114 50" fill="none" {...stroke} />
          {dots.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill={accent} />
          ))}
          {/* waistband */}
          <rect x={73} y={98} width={54} height={9} fill={accent} {...thin} />
        </g>
      );
      break;
    }
    case 'slip': {
      shadow = <path d={SLIP} fill={INK} />;
      art = (
        <g>
          <line x1={86} y1={36} x2={90} y2={58} {...thin} />
          <line x1={114} y1={36} x2={110} y2={58} {...thin} />
          <path d={SLIP} fill={body} {...stroke} />
          {/* cherries */}
          <path d="M96 116 Q100 104 106 106" fill="none" stroke={accent} strokeWidth={2.5} />
          <path d="M105 120 Q104 108 106 106" fill="none" stroke={accent} strokeWidth={2.5} />
          <circle cx={94} cy={121} r={5.5} fill={accent} />
          <circle cx={106} cy={125} r={5.5} fill={accent} />
          {/* side slit + hem */}
          <line x1={120} y1={178} x2={116} y2={154} {...thin} />
          <line x1={78} y1={168} x2={122} y2={168} stroke={accent} strokeWidth={2} strokeDasharray="4 4" />
        </g>
      );
      break;
    }
    case 'bucket': {
      shadow = (
        <>
          <path d={DOME} fill={INK} />
          <path d={BRIM} fill={INK} />
        </>
      );
      art = (
        <g>
          <path d={DOME} fill={body} {...stroke} />
          <rect x={68} y={110} width={64} height={16} fill={accent} stroke="none" />
          <path d={DOME} fill="none" {...stroke} />
          <path d={BRIM} fill={body} {...stroke} />
          <line x1={44} y1={136} x2={156} y2={136} {...thin} strokeDasharray="5 4" />
          <line x1={40} y1={143} x2={160} y2={143} {...thin} strokeDasharray="5 4" />
          {/* top button */}
          <circle cx={100} cy={76} r={4} fill={accent} stroke={INK} strokeWidth={2} />
        </g>
      );
      break;
    }
    case 'tote': {
      shadow = <rect x={58} y={100} width={84} height={84} rx={5} fill={INK} />;
      art = (
        <g>
          <path d="M74 100 Q74 52 100 52 Q126 52 126 100" fill="none" stroke={INK} strokeWidth={8} />
          <path d="M74 100 Q74 52 100 52 Q126 52 126 100" fill="none" stroke={body} strokeWidth={3} />
          <rect x={58} y={100} width={84} height={84} rx={5} fill={body} {...stroke} />
          <line x1={62} y1={112} x2={138} y2={112} {...thin} strokeDasharray="5 4" />
          <line x1={62} y1={174} x2={138} y2={174} {...thin} strokeDasharray="5 4" />
          {/* smiley patch */}
          <circle cx={100} cy={144} r={19} fill={accent} {...thin} />
          <circle cx={93} cy={139} r={2.6} fill={body} />
          <circle cx={107} cy={139} r={2.6} fill={body} />
          <path d="M91 149 Q100 157 109 149" fill="none" stroke={body} strokeWidth={3} strokeLinecap="round" />
        </g>
      );
      break;
    }
  }

  return (
    <svg viewBox="0 0 200 220" role="presentation" aria-hidden="true" focusable="false">
      <g transform="translate(5 5)" opacity={0.9}>
        {shadow}
      </g>
      {art}
    </svg>
  );
}
