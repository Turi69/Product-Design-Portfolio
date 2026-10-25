import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import type { Work } from '../data/projects';
import { usePrefersReducedMotion } from '../hooks';
import { ArrowRightIcon } from './Icons';
import './Drum.css';

type Props = {
  items: Work[];
  /** `auto` is true when the drift moved the stack, false when the visitor did. */
  onChange?: (index: number, auto: boolean) => void;
};

const VISIBLE = 3.2; // cards beyond this distance from centre are hidden
const SETTLE_MS = 140; // idle time after wheel input before snapping to a card
const DRIFT = 0.12; // cards per second, about one every 8 seconds, as the reference
const RESUME_MS = 1500; // quiet time after the visitor's own input before the drift returns
const RAMP_UP_MS = 600; // drift eases back in
const RAMP_DOWN_MS = 140; // and stops quickly when keyboard focus or a tap holds a card

/** Signed distance from the centre on a looping list, in [-n/2, n/2). */
function wrap(d: number, n: number) {
  return ((((d + n / 2) % n) + n) % n) - n / 2;
}

/**
 * Receding card stack that drifts slowly towards the viewer. Cards below the centre are
 * near and out of focus, cards above recede and dim; only the centre card is sharp.
 * Wheel, drag, arrow keys and focus all move it and it rests on a whole card with no
 * overshoot. The card under the mouse is named in a trailing label while the drift runs on.
 */
export function Drum({ items, onChange }: Props) {
  const n = items.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0); // rendered position, in cards
  const target = useRef(0); // where it is heading
  const settleTimer = useRef<number>();
  const gestureFrom = useRef<number | null>(null); // whole card a wheel or drag gesture began on
  const drag = useRef<{ y: number; start: number; moved: boolean } | null>(null);
  const idleUntil = useRef(0); // drift waits until this time after the visitor's input
  const autoMove = useRef(true); // whether the latest change of card came from the drift
  const pointer = useRef<{ x: number; y: number } | null>(null); // mouse position, null when away
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null); // card under the mouse
  const [picked, setPicked] = useState<number | null>(null); // card chosen by a first tap
  const [focused, setFocused] = useState(false); // keyboard focus is on a card
  const reduced = usePrefersReducedMotion();
  const navigate = useNavigate();

  // The loop reads these through a ref so it never restarts on hover.
  const holds = useRef({ hovered, picked, focused });
  holds.current = { hovered, picked, focused };

  const goTo = useCallback((t: number) => {
    target.current = t;
  }, []);

  /** The visitor moved the stack themselves: hold the drift for a moment. */
  const touched = useCallback(() => {
    idleUntil.current = performance.now() + RESUME_MS;
    autoMove.current = false;
  }, []);

  /**
   * End of a wheel or drag gesture: any deliberate movement commits to the next card in
   * that direction (so one wheel notch always advances), tiny jitters fall back.
   */
  const settle = useCallback(() => {
    const from = gestureFrom.current ?? Math.round(target.current);
    const moved = target.current - from;
    gestureFrom.current = null;
    if (Math.abs(moved) < 0.12) goTo(from);
    else goTo(from + Math.sign(moved) * Math.max(1, Math.round(Math.abs(moved))));
  }, [goTo]);

  // Render loop: drift the target, then ease the position towards it (critically damped).
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let lastActive = -1;
    let vel = 0; // drift velocity, cards per second
    let lx = 0;
    let ly = 0;
    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      const h = holds.current;
      // Hover does not hold the drift; keyboard focus, a tapped card and a drag do.
      const held = h.picked !== null || h.focused || drag.current !== null;
      const want = reduced || held || now < idleUntil.current ? 0 : DRIFT;
      const tau = want > vel ? RAMP_UP_MS : RAMP_DOWN_MS;
      vel += (want - vel) * (1 - Math.exp(-dt / tau));
      if (vel < 0.0005 && want === 0) vel = 0;
      if (vel > 0) {
        target.current += (vel * dt) / 1000;
        autoMove.current = true;
      }

      const k = reduced ? 1 : 1 - Math.pow(0.006, dt / 1000); // ~90% of the way in 450ms: a glide, not a snap
      pos.current += (target.current - pos.current) * k;
      if (Math.abs(target.current - pos.current) < 0.0005) pos.current = target.current;

      const stage = stageRef.current;
      const cardH = stage ? (stage.querySelector<HTMLElement>('.drum__card')?.offsetHeight ?? 400) : 400;
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        // Positive d sits below the centre: nearer, larger, falling away downward. The
        // position grows over time, so cards travel from the far top towards the viewer.
        const d = wrap(pos.current - i, n);
        const ad = Math.abs(d);
        if (ad > VISIBLE) {
          el.style.visibility = 'hidden';
          continue;
        }
        el.style.visibility = 'visible';
        const scale = d > 0 ? 1 + d * 0.1 : Math.max(0.45, 1 + d * 0.12);
        const y = d > 0 ? d * cardH * 0.6 : d * cardH * 0.36;
        const blur = reduced ? 0 : Math.min(14, ad * 5);
        const dim = Math.max(0.35, 1 - ad * 0.18);
        const fade = d > 0 ? Math.max(0, 1 - Math.max(0, d - 1.4) * 0.6) : Math.max(0, 1 - Math.max(0, ad - 2.2) * 1.2);
        el.style.transform = `translate3d(-50%, calc(-50% + ${y.toFixed(1)}px), 0) scale(${scale.toFixed(4)})`;
        el.style.filter =
          blur > 0.2 ? `blur(${blur.toFixed(1)}px) brightness(${dim.toFixed(3)})` : `brightness(${dim.toFixed(3)})`;
        el.style.opacity = fade.toFixed(3);
        el.style.zIndex = String(100 + Math.round(d * 10));
      }

      // Cards slide under a still cursor, so find the one beneath it every frame.
      const p = pointer.current;
      let under: number | null = null;
      if (p) {
        const hit = document.elementFromPoint(p.x, p.y)?.closest('.drum__card');
        const i = hit ? cardRefs.current.indexOf(hit as HTMLAnchorElement) : -1;
        under = i >= 0 ? i : null;
      }
      if (under !== h.hovered) setHovered(under);

      // Label: trails the mouse, or sits on the bottom-left of a tapped card.
      const label = labelRef.current;
      if (label && (h.hovered !== null || h.picked !== null)) {
        let tx: number;
        let ty: number;
        if (h.picked !== null) {
          const r = cardRefs.current[h.picked]?.getBoundingClientRect();
          tx = (r?.left ?? 0) + 12;
          ty = (r?.bottom ?? 0) - 12 - label.offsetHeight;
        } else {
          // Offset from the cursor; flip to the left near the right edge.
          const w = label.offsetWidth;
          const { x, y } = p ?? { x: 0, y: 0 };
          tx = x + 20 + w > window.innerWidth - 16 ? x - 20 - w : x + 20;
          ty = Math.min(y + 20, window.innerHeight - label.offsetHeight - 16);
        }
        const jump = lx === 0 && ly === 0;
        const f = reduced || jump ? 1 : 1 - Math.pow(0.0001, dt / 1000);
        lx += (tx - lx) * f;
        ly += (ty - ly) * f;
        label.style.transform = `translate3d(${lx.toFixed(1)}px, ${ly.toFixed(1)}px, 0)`;
      } else {
        lx = 0;
        ly = 0;
      }

      const current = ((Math.round(pos.current) % n) + n) % n;
      if (current !== lastActive) {
        lastActive = current;
        setActive(current);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [n, reduced]);

  useEffect(() => onChange?.(active, autoMove.current), [active, onChange]);

  // Wheel: move freely while scrolling, then settle on the nearest card.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? 800 : 1;
      const delta = Math.max(-120, Math.min(120, (e.deltaY || e.deltaX) * unit));
      if (gestureFrom.current === null) gestureFrom.current = Math.round(target.current);
      touched();
      goTo(target.current + delta / 240);
      window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(settle, SETTLE_MS);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.clearTimeout(settleTimer.current);
    };
  }, [goTo, settle, touched]);

  // Keyboard: arrows and paging move one card at a time.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, [contenteditable]')) return;
      const r = Math.round(target.current);
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') goTo(r + 1);
      else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') goTo(r - 1);
      else return;
      touched();
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, touched]);

  // Track the mouse for the label; forget it when it leaves the window.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') pointer.current = { x: e.clientX, y: e.clientY };
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) pointer.current = null;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  // Touch and pen: drag the stack with the finger. Dragging also lets go of a tapped card.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    drag.current = { y: e.clientY, start: target.current, moved: false };
    gestureFrom.current = Math.round(target.current);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const cardH = stageRef.current?.querySelector<HTMLElement>('.drum__card')?.offsetHeight ?? 400;
    const dy = e.clientY - d.y;
    if (Math.abs(dy) > 6 && !d.moved) {
      d.moved = true;
      setPicked(null);
    }
    touched();
    goTo(d.start + dy / (cardH * 0.55));
  };
  const endDrag = () => {
    if (!drag.current) return;
    settle();
    window.setTimeout(() => {
      drag.current = null;
    }, 0);
  };

  // A tap anywhere off the cards lets go of the tapped card.
  useEffect(() => {
    if (picked === null) return;
    const onDown = (e: PointerEvent) => {
      if (!(e.target instanceof Element && e.target.closest('.drum__card'))) setPicked(null);
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [picked]);

  /** Nearest whole-card target that lands index i in the centre. */
  const targetFor = (i: number) => Math.round(target.current) + wrap(i - Math.round(target.current), n);

  const shown = picked ?? hovered;
  // Keep the last card's text while the label fades out.
  const lastShown = useRef<Work | null>(null);
  if (shown !== null) lastShown.current = items[shown];
  const work = lastShown.current;

  return (
    <>
      <div
        ref={stageRef}
        className="drum"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <ul className="drum__list">
          {items.map((w, i) => (
            <li key={w.slug}>
              <a
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                href={`/work/${w.slug}`}
                className="drum__card"
                aria-label={`${w.title}${w.dub ? `, ${w.dub}` : ''}. ${w.year}, ${w.category}. View case study. Project ${i + 1} of ${n}`}
                onFocus={(e) => {
                  // Keyboard focus brings the card to the centre; a mouse press does not.
                  if (!e.currentTarget.matches(':focus-visible')) return;
                  setFocused(true);
                  touched();
                  goTo(targetFor(i));
                }}
                onBlur={() => setFocused(false)}
                onClick={(e) => {
                  e.preventDefault();
                  if (drag.current?.moved) return;
                  const touch =
                    (e.nativeEvent as PointerEvent).pointerType === 'touch' ||
                    (e.nativeEvent as PointerEvent).pointerType === 'pen';
                  // Touch: the first tap holds the card and names it, the second opens it.
                  if (touch && picked !== i) {
                    setPicked(i);
                    touched();
                    if (i !== active) goTo(targetFor(i));
                    return;
                  }
                  navigate(`/work/${w.slug}`);
                }}
                draggable={false}
              >
                <img src={w.mockup} alt="" width={1280} height={960} draggable={false} decoding="async" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Names the card under the pointer. The card itself is the link, so this is decorative.
          Portalled to the body so it sits above the name and tagline, outside the stage's layer. */}
      {createPortal(
        <div
          ref={labelRef}
          className={`drum-label${shown !== null ? ' is-on' : ''}${picked !== null ? ' is-pinned' : ''}`}
          aria-hidden="true"
        >
          {work && (
            <>
              <span className="drum-label__title">{work.title}</span>
              <span className="drum-label__meta">
                {work.year} · {work.category}
              </span>
              {work.dub && <span className="drum-label__dub">{work.dub}</span>}
              <span className="drum-label__cta">
                {picked !== null ? 'Tap again to view case study' : 'View case study'}
                <ArrowRightIcon size={14} />
              </span>
            </>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}
