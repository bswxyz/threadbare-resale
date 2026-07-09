'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  CATEGORIES,
  CATEGORY_LABELS,
  CONDITIONS,
  CONDITION_LABELS,
  GARMENTS,
  SIZES,
  type Category,
  type Condition,
  type Size,
} from '@/lib/garments';
import GarmentCard from './GarmentCard';

type Sort = 'new' | 'lo' | 'hi';

const SORTS: { id: Sort; label: string }[] = [
  { id: 'new', label: 'Newest' },
  { id: 'lo', label: 'Price ↑' },
  { id: 'hi', label: 'Price ↓' },
];

/**
 * THE RACK — a dense, filterable grid with an animated FLIP-ish re-flow.
 *
 * Every card is always in the DOM in a stable order. Once the container is
 * measured, cards switch to absolute positioning and each visible card gets a
 * computed translate(x, y); filtering/sorting only changes those transforms,
 * so a plain CSS transition animates the whole re-flow — no animation library.
 * Filtered-out cards keep their last slot and scale away in place.
 *
 * Pre-measure (and pre-JS) the same markup renders as a static CSS grid, so
 * the rack works without JavaScript. Reduced motion: transitions are removed
 * in CSS → instant swaps.
 */
export default function Rack() {
  const [cat, setCat] = useState<'all' | Category>('all');
  const [sizes, setSizes] = useState<Size[]>([]);
  const [conds, setConds] = useState<Condition[]>([]);
  const [sort, setSort] = useState<Sort>('new');

  const wrapRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [cardH, setCardH] = useState(0);
  const lastPos = useRef<Map<string, { x: number; y: number }>>(new Map());

  // ---- filtering + sorting -------------------------------------------------
  const visible = useMemo(() => {
    const list = GARMENTS.filter(
      (g) =>
        (cat === 'all' || g.category === cat) &&
        (sizes.length === 0 || sizes.includes(g.size)) &&
        (conds.length === 0 || conds.includes(g.condition)),
    );
    list.sort((a, b) =>
      sort === 'new' ? a.listed - b.listed : sort === 'lo' ? a.price - b.price : b.price - a.price,
    );
    return list;
  }, [cat, sizes, conds, sort]);

  const hasFilters = cat !== 'all' || sizes.length > 0 || conds.length > 0;

  const clearAll = useCallback(() => {
    setCat('all');
    setSizes([]);
    setConds([]);
  }, []);

  const toggle = <T,>(list: T[], v: T): T[] =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  // ---- measurement ---------------------------------------------------------
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el || !('ResizeObserver' in window)) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setWidth(Math.round(e.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cols = width < 560 ? 2 : width < 880 ? 3 : 4;
  const gap = width < 560 ? 14 : 20;
  const cardW = width > 0 ? (width - gap * (cols - 1)) / cols : 0;

  useLayoutEffect(() => {
    const el = probeRef.current;
    if (!el || !('ResizeObserver' in window)) return;
    const ro = new ResizeObserver(() => setCardH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const measured = width > 0 && cardH > 0;

  // enable transitions one frame AFTER the first absolute-position paint, so
  // cards don't animate in from the container origin on load
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    if (!measured || anim) return;
    let id2 = 0;
    const id = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setAnim(true));
    });
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(id2);
    };
  }, [measured, anim]);

  // ---- slot positions ------------------------------------------------------
  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number; i: number }>();
    visible.forEach((g, i) => {
      map.set(g.id, {
        x: (i % cols) * (cardW + gap),
        y: Math.floor(i / cols) * (cardH + gap),
        i,
      });
    });
    return map;
  }, [visible, cols, cardW, cardH, gap]);

  useEffect(() => {
    positions.forEach((p, id) => lastPos.current.set(id, { x: p.x, y: p.y }));
  }, [positions]);

  const rows = Math.max(1, Math.ceil(visible.length / cols));
  const rackH = visible.length === 0 ? 320 : rows * cardH + (rows - 1) * gap;

  // ---- chips ---------------------------------------------------------------
  const chip = (pressed: boolean) => `chip${pressed ? ' on' : ''}`;

  return (
    <section id="rack" className="sec sec-paper rack-sec" aria-labelledby="rack-title">
      <div className="wrap">
        <div className="rack-head">
          <h2 id="rack-title" className="sec-title">
            The rack
          </h2>
          <p className="rack-count" role="status">
            Showing <strong>{visible.length}</strong> of {GARMENTS.length}
          </p>
        </div>

        <div className="filters">
          <div className="f-group" role="group" aria-label="Filter by category">
            <span className="f-label" aria-hidden="true">
              Category
            </span>
            <button type="button" className={chip(cat === 'all')} aria-pressed={cat === 'all'} onClick={() => setCat('all')}>
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={chip(cat === c)}
                aria-pressed={cat === c}
                onClick={() => setCat(cat === c ? 'all' : c)}
              >
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>

          <div className="f-group" role="group" aria-label="Filter by size">
            <span className="f-label" aria-hidden="true">
              Size
            </span>
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className={chip(sizes.includes(s))}
                aria-pressed={sizes.includes(s)}
                aria-label={`Size ${s}`}
                onClick={() => setSizes((v) => toggle(v, s))}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="f-group" role="group" aria-label="Filter by condition">
            <span className="f-label" aria-hidden="true">
              Condition
            </span>
            {CONDITIONS.map((c) => (
              <button
                key={c}
                type="button"
                className={chip(conds.includes(c))}
                aria-pressed={conds.includes(c)}
                aria-label={`Condition: ${CONDITION_LABELS[c]}`}
                title={CONDITION_LABELS[c]}
                onClick={() => setConds((v) => toggle(v, c))}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="f-group" role="group" aria-label="Sort listings">
            <span className="f-label" aria-hidden="true">
              Sort
            </span>
            {SORTS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={chip(sort === s.id)}
                aria-pressed={sort === s.id}
                onClick={() => setSort(s.id)}
              >
                {s.label}
              </button>
            ))}
            {hasFilters && (
              <button type="button" className="chip chip-clear" onClick={clearAll}>
                Clear all ×
              </button>
            )}
          </div>
        </div>

        <div
          ref={wrapRef}
          className={`rack${measured ? ' rack-abs' : ' rack-static'}${anim ? ' rack-anim' : ''}`}
          style={measured ? { height: rackH } : undefined}
        >
          {GARMENTS.map((g, domIndex) => {
            const pos = positions.get(g.id);
            const last = lastPos.current.get(g.id) ?? { x: 0, y: 0 };
            const shown = !!pos;
            const style: React.CSSProperties | undefined = measured
              ? {
                  width: cardW,
                  transform: `translate(${(pos ?? last).x}px, ${(pos ?? last).y}px) scale(${shown ? 1 : 0.82})`,
                  opacity: shown ? 1 : 0,
                  visibility: shown ? 'visible' : 'hidden',
                  zIndex: shown ? 1 : 0,
                  // delays match transition-property order in CSS:
                  // transform, opacity, visibility — exits keep visibility
                  // until the scale-away finishes; entrances stagger by slot
                  transitionDelay: shown
                    ? `${(pos?.i ?? 0) * 24}ms, ${(pos?.i ?? 0) * 24}ms, 0ms`
                    : '0ms, 0ms, 380ms',
                }
              : undefined;
            return (
              <article
                key={g.id}
                ref={domIndex === 0 ? probeRef : undefined}
                className={`card${shown ? '' : ' card-out'}`}
                style={style}
              >
                <GarmentCard g={g} />
              </article>
            );
          })}

          {visible.length === 0 && (
            <div className="rack-empty">
              <p>Nothing on the rack matches all of that.</p>
              <button type="button" className="chip chip-clear" onClick={clearAll}>
                Loosen the filters ×
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
