import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import './Intro.css';

/*
 * Opening sequence, once per visit. Mechanic after studio-onto.com's loader, rebuilt for TURI:
 * thin lines rise into blocks, each block carves down into its letter, the word holds,
 * U, R and I slide into the T, then the T keeps growing towards the viewer while it dissolves and the
 * dark stage lifts, so the page comes through the letter. The screen never turns white.
 *
 * Beats (ms), each overlapping the last so nothing stops dead:
 *   rise 0–910 · carve 900–2140 · hold to 2300 · merge 2300–3100 · zoom 2950–4750
 *   T dissolves 3490–4480 · stage lifts and page arrives 3580–4750
 */
const WORD = 'TURI';
const FONT = '600 100px Switzer';
const GAP = 7; // between blocks, in font units (the font is set at 100)
const RISE_STAGGER = 130;
const CARVE_START = 900;
const CARVE_STAGGER = 80;
const HOLD_UNTIL = 2300;
const MERGE = 800;
const MERGE_STAGGER = 60;
const ZOOM_LEAD = 150; // the zoom starts as the merge settles, not after it
const ZOOM = 1800;
const FILL_HEIGHT = 2.4; // the T grows until it is 2.4 screens tall: it fills the view, its stem never covers it
const DISSOLVE = [0.3, 0.85] as const; // the T fades across this stretch of the zoom
const LIFT_AT = 0.35; // the dark stage starts to lift at this point of the zoom, the page arriving with it
const STEM = 0.5; // the T's stem centre, as a fraction of its width
const SEEN_KEY = 'turi-intro-seen';

type Glyph = { ch: string; x: number; left: number; width: number };
type Layout = { glyphs: Glyph[]; ascent: number; descent: number; width: number };

function seen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Storage blocked: the intro may play again next load, which is harmless.
  }
}

/** Ink boxes of each capital, laid out with an even gap so the blocks read as separate pieces. */
function measure(): Layout {
  const ctx = document.createElement('canvas').getContext('2d')!;
  ctx.font = FONT;
  let ascent = 0;
  let descent = 0;
  let x = 0;
  const glyphs = [...WORD].map((ch) => {
    const m = ctx.measureText(ch);
    ascent = Math.max(ascent, m.actualBoundingBoxAscent);
    descent = Math.max(descent, m.actualBoundingBoxDescent);
    const width = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    const g = { ch, x, left: m.actualBoundingBoxLeft, width };
    x += width + GAP;
    return g;
  });
  return { glyphs, ascent, descent, width: x - GAP };
}

/** The site's own motion curve, read from the tokens so the intro always matches the pages. */
function moveCurve() {
  return getComputedStyle(document.documentElement).getPropertyValue('--ease-move').trim() || 'cubic-bezier(0.45, 0, 0.25, 1)';
}

/**
 * Keyframes for a zoom that feels even: scale grows geometrically, so each moment multiplies
 * the size by the same amount. A straight 1 → 100 tween does nothing for most of its run, then rushes.
 */
function zoomFrames(to: number, steps = 32): Keyframe[] {
  return Array.from({ length: steps + 1 }, (_, i) => ({
    offset: i / steps,
    transform: `scale(${Math.pow(to, i / steps)})`,
  }));
}

export function Intro() {
  // Reduced motion: no intro at all; the page's own fades are enough of an arrival.
  const [active, setActive] = useState(() => !seen() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [layout, setLayout] = useState<Layout | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const letterRefs = useRef<(SVGGElement | null)[]>([]);

  // Hold the page's own entrance before the first paint, so it plays as the intro lifts.
  useLayoutEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    html.dataset.intro = '';
    return () => {
      delete html.dataset.intro;
    };
  }, [active]);

  const finish = () => {
    markSeen();
    setActive(false);
  };

  // Wait for Switzer so the letters never draw in the fallback face; give up quietly if it is slow.
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const timeout = new Promise<'late'>((r) => setTimeout(() => r('late'), 1500));
    Promise.race([document.fonts.load(FONT).then(() => 'ok' as const), timeout]).then((res) => {
      if (cancelled) return;
      if (res === 'ok' && document.fonts.check(FONT)) setLayout(measure());
      else finish();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Hold, merge, fill and lift, once the letters are on screen.
  useEffect(() => {
    if (!active || !layout) return;
    const html = document.documentElement;
    const move = moveCurve();
    const timers: number[] = [];
    const animations: Animation[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    let started = false;
    let ending = false;

    const finale = () => {
      if (started) return;
      started = true;
      const svg = svgRef.current!;
      const r = svg.getBoundingClientRect();
      const unit = r.width / layout.width;
      const t = layout.glyphs[0];

      // Merge: U, R and I slide into the T and dissolve as they overlap it; the T moves to the centre.
      layout.glyphs.slice(1).forEach((g, i) => {
        const el = letterRefs.current[i + 1];
        if (!el) return;
        animations.push(
          // Opacity trails the slide, so each letter visibly travels before it dissolves into the T.
          el.animate(
            [
              { transform: 'none', opacity: 1 },
              { opacity: 1, offset: 0.35 },
              { transform: `translateX(${t.x - g.x}px)`, opacity: 0 },
            ],
            { duration: MERGE, delay: i * MERGE_STAGGER, easing: move, fill: 'forwards' },
          ),
        );
      });
      const stemX = r.left + (t.x + t.width * STEM) * unit;
      const stemY = r.top + layout.ascent * 0.62 * unit; // inside the stem, below the bar
      const dx = window.innerWidth / 2 - stemX;
      animations.push(moveRef.current!.animate([{ transform: 'none' }, { transform: `translateX(${dx}px)` }], { duration: MERGE, easing: move, fill: 'forwards' }));

      // Zoom: the T grows from inside its stem towards the viewer, at an even perceived speed
      // (geometric keyframes) on a soft ease-in-out, until it is taller than the screen.
      const zoomAt = MERGE - ZOOM_LEAD;
      const scale = (window.innerHeight * FILL_HEIGHT) / (layout.ascent * unit);
      svg.style.transformOrigin = `${stemX - r.left}px ${stemY - r.top}px`;
      animations.push(svg.animate(zoomFrames(scale), { duration: ZOOM, delay: zoomAt, easing: move, fill: 'forwards' }));

      // Dissolve: the T fades while it is still growing, so it never settles into a flat white screen.
      const [fadeFrom, fadeTo] = DISSOLVE;
      animations.push(
        svg.animate(
          [
            { opacity: 1, offset: 0 },
            { opacity: 1, offset: fadeFrom, easing: move },
            { opacity: 0, offset: fadeTo },
            { opacity: 0, offset: 1 },
          ],
          { duration: ZOOM, delay: zoomAt, fill: 'forwards' },
        ),
      );

      // The dark stage lifts underneath at the same time, so the page comes through the growing letter.
      const liftAt = zoomAt + ZOOM * LIFT_AT;
      at(liftAt, () => {
        ending = true;
        animations.push(bgRef.current!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ZOOM * (1 - LIFT_AT), easing: move, fill: 'forwards' }));
        delete html.dataset.intro;
      });
      at(zoomAt + ZOOM + 40, finish);
    };

    at(HOLD_UNTIL, finale);
    // Any input skips ahead: the visitor came for the work, not the intro.
    const skip = () => {
      if (ending) return;
      ending = true;
      timers.forEach(clearTimeout);
      animations.push(rootRef.current!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, easing: move, fill: 'forwards' }));
      delete html.dataset.intro;
      at(640, finish);
    };
    const events = ['pointerdown', 'keydown', 'wheel', 'touchmove'] as const;
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));

    return () => {
      timers.forEach(clearTimeout);
      animations.forEach((a) => a.cancel());
      events.forEach((e) => window.removeEventListener(e, skip));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, layout]);

  if (!active) return null;

  const vbH = layout ? layout.ascent + layout.descent : 0;

  return (
    <div ref={rootRef} className="intro" aria-hidden="true">
      <div ref={bgRef} className="intro__bg" />
      {layout && (
        <div ref={moveRef} className="intro__move">
          <svg
            ref={svgRef}
            className="intro__word"
            viewBox={`0 ${-layout.ascent} ${layout.width} ${vbH}`}
            style={{ aspectRatio: `${layout.width} / ${vbH}` }}
          >
            <defs>
              {layout.glyphs.map((g, i) => (
                <clipPath id={`intro-cell-${i}`} key={g.ch + i}>
                  <rect x={g.x} y={-layout.ascent} width={g.width} height={vbH} />
                </clipPath>
              ))}
            </defs>
            {layout.glyphs.map((g, i) => (
              // The outer group moves (merge); the inner one rises and carves inside its own cell.
              <g key={g.ch + i} ref={(el) => (letterRefs.current[i] = el)} className="intro__piece">
                <g
                  className="intro__letter"
                  clipPath={`url(#intro-cell-${i})`}
                  style={
                    {
                      '--rise-delay': `${i * RISE_STAGGER}ms`,
                      '--carve-delay': `${CARVE_START + i * CARVE_STAGGER}ms`,
                      transformOrigin: `${g.x + g.width / 2}px ${layout.descent}px`,
                    } as CSSProperties
                  }
                >
                  <text className="intro__glyph" x={g.x + g.left} y={0}>
                    {g.ch}
                  </text>
                </g>
              </g>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}
