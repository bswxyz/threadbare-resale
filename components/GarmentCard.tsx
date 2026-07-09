'use client';

import { useState } from 'react';
import type { Garment } from '@/lib/garments';
import { CONDITION_LABELS } from '@/lib/garments';
import GarmentArt from './GarmentArt';

/**
 * One rack card. The front is the "photo" (flat SVG), condition badge, like
 * button and meta; the back is the garment's story (owners · cities · CO2e).
 * The flip is triggered by a real button that lives OUTSIDE the rotating
 * plane, so it never disappears mid-flip and stays keyboard-reachable.
 * Reduced motion: the rotation transition is removed → instant swap.
 */
export default function GarmentCard({ g }: { g: Garment }) {
  const [flipped, setFlipped] = useState(false);
  const [liked, setLiked] = useState(false);
  const [offered, setOffered] = useState(false);

  const likeCount = g.likes + (liked ? 1 : 0);

  return (
    <>
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>
        <div className="face face-front" aria-hidden={flipped}>
        <div className="art" style={{ background: g.art.bg }}>
          <GarmentArt kind={g.art.kind} body={g.art.body} accent={g.art.accent} />
          <span className={`badge badge-${g.condition.toLowerCase()}`} title={CONDITION_LABELS[g.condition]}>
            {g.condition}
          </span>
          <button
            type="button"
            className={`like${liked ? ' liked' : ''}`}
            aria-pressed={liked}
            aria-label={`Like ${g.name} (${likeCount} likes)`}
            onClick={() => setLiked((v) => !v)}
          >
            <svg viewBox="0 0 20 18" aria-hidden="true" focusable="false">
              <path d="M10 17 C4 12 1 8.5 1 5.5 C1 2.9 3 1 5.5 1 C7.3 1 9 2 10 3.8 C11 2 12.7 1 14.5 1 C17 1 19 2.9 19 5.5 C19 8.5 16 12 10 17 Z" />
            </svg>
            <span>{likeCount}</span>
          </button>
        </div>
        <div className="meta">
          <span className="brand">{g.brand}</span>
          <h3 className="gname">{g.name}</h3>
          <p className="meta-row">
            <span className="size-chip">{g.size}</span>
            <span className="price">${g.price}</span>
          </p>
        </div>
      </div>

      <div className="face face-back" aria-hidden={!flipped}>
        <p className="story-kicker">The story so far</p>
        <ul className="story-tags">
          <li>
            {g.story.owners} owner{g.story.owners > 1 ? 's' : ''}
          </li>
          <li>
            {g.story.cities.length} {g.story.cities.length > 1 ? 'cities' : 'city'}
          </li>
          <li>{g.story.co2} kg CO₂e saved</li>
        </ul>
        <p className="story-route">{g.story.cities.join(' → ')}</p>
        <p className="story-note">{g.story.note}</p>
        <p className="seller-chip">
          <span aria-hidden="true">★</span> {g.seller.rating.toFixed(1)} · {g.seller.name} ·{' '}
          {g.seller.sales} sales
        </p>
          <button
            type="button"
            className="offer-btn"
            onClick={() => setOffered(true)}
            disabled={offered}
          >
            {offered ? 'Offer sent · fingers crossed' : 'Make an offer'}
          </button>
        </div>
      </div>

      {/* outside the rotating plane — never mirrors, always reachable */}
      <button
        type="button"
        className="story-toggle"
        aria-pressed={flipped}
        aria-label={flipped ? `Hide story of ${g.name}` : `Read the story of ${g.name}`}
        onClick={() => setFlipped((v) => !v)}
      >
        {flipped ? '×' : '★'}
        <span className="st-label">{flipped ? 'close' : 'story'}</span>
      </button>
    </>
  );
}
