import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { links } from '../data/home';
import { resumePages } from '../data/resumePages';
import { DownloadIcon, MinusIcon, PlusIcon, XIcon } from './Icons';
import './ResumeViewer.css';

type View = { x: number; y: number; s: number };
type Box = { w: number; h: number };

// Zoom is relative to "fit width", so 100% always means the page fills the column.
const MIN = 0.5;
const MAX = 3;
const STEP = 1.25;
const PAGE_MAX = 860;
const GAP = 16;
// Room kept clear of the header (top) and the toolbar (bottom) when the sheet is larger than the stage.
const PAD = { side: 24, top: 72, bottom: 96 };

const clampScale = (s: number) => Math.min(MAX, Math.max(MIN, s));

/** The résumé as a full-screen sheet: fit to width, zoom with buttons, keys, wheel or pinch, pan by dragging. */
export function ResumeViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Box>({ w: 0, h: 0 });
  const [view, setView] = useState<View>({ x: 0, y: 0, s: 1 });
  const [closing, setClosing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [failed, setFailed] = useState(false);
  const [opened, setOpened] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const needsFit = useRef(false);

  // Base page width at 100%, and the height of the whole stack at that width.
  const base = Math.max(0, Math.min(PAGE_MAX, stage.w - PAD.side * 2));
  const stackHeight = resumePages.reduce((h, p) => h + (base * p.height) / p.width, 0) + GAP * (resumePages.length - 1);

  /** Keep the sheet reachable: centred on an axis where it fits, edge-limited where it does not. */
  const clamp = useCallback(
    (v: View): View => {
      const s = clampScale(v.s);
      const cw = base * s;
      const ch = stackHeight * s;
      const x = cw + PAD.side * 2 <= stage.w ? (stage.w - cw) / 2 : Math.min(PAD.side, Math.max(stage.w - cw - PAD.side, v.x));
      const y = ch + PAD.top + PAD.bottom <= stage.h ? (stage.h - ch) / 2 : Math.min(PAD.top, Math.max(stage.h - ch - PAD.bottom, v.y));
      return { x, y, s };
    },
    [base, stackHeight, stage.w, stage.h],
  );

  const fit = useCallback(() => setView(clamp({ x: 0, y: PAD.top, s: 1 })), [clamp]);

  /** Zoom by a factor, keeping the point under (cx, cy) still. Defaults to the stage centre. */
  const zoomBy = useCallback(
    (factor: number, cx = stage.w / 2, cy = stage.h / 2) =>
      setView((v) => {
        const s = clampScale(v.s * factor);
        const k = s / v.s;
        return clamp({ x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k, s });
      }),
    [clamp, stage.w, stage.h],
  );

  const panBy = useCallback((dx: number, dy: number) => setView((v) => clamp({ ...v, x: v.x + dx, y: v.y + dy })), [clamp]);

  // Open and close the native dialog; lock the page behind it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setOpened(true);
      needsFit.current = true;
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    if (!open && dialog.open) dialog.close();
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Measure the stage; refit when it changes size.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el || !open) return;
    const measure = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  // Fit once per opening; after that a resize only re-clamps, so the reader keeps their zoom.
  useEffect(() => {
    if (!open || !stage.w) return;
    if (needsFit.current) {
      needsFit.current = false;
      fit();
    } else {
      setView((v) => clamp(v));
    }
  }, [open, stage.w, stage.h, fit, clamp]);

  // Wheel pans; ctrl or cmd + wheel (and trackpad pinch, which reports as ctrl) zooms at the cursor.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientHeight : 1;
      if (e.ctrlKey || e.metaKey) {
        const r = el.getBoundingClientRect();
        // About 20% per mouse-wheel notch; trackpad pinches send small deltas, so they stay smooth.
        zoomBy(Math.exp(-e.deltaY * unit * 0.002), e.clientX - r.left, e.clientY - r.top);
      } else {
        panBy(-e.deltaX * unit, -e.deltaY * unit);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomBy, panBy]);

  /** Esc and the close button both leave through the same short exit. */
  const requestClose = useCallback(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return onClose();
    setClosing(true);
    window.setTimeout(onClose, 380);
  }, [onClose]);

  const onKeyDown = (e: KeyboardEvent) => {
    const step = 48;
    const keys: Record<string, () => void> = {
      '+': () => zoomBy(STEP),
      '=': () => zoomBy(STEP),
      '-': () => zoomBy(1 / STEP),
      '0': fit,
      ArrowUp: () => panBy(0, step),
      ArrowDown: () => panBy(0, -step),
      ArrowLeft: () => panBy(step, 0),
      ArrowRight: () => panBy(-step, 0),
      PageUp: () => panBy(0, stage.h * 0.8),
      PageDown: () => panBy(0, -stage.h * 0.8),
      Home: () => panBy(0, Infinity),
      End: () => panBy(0, -Infinity),
    };
    const run = keys[e.key];
    if (run && !e.altKey) {
      e.preventDefault();
      run();
    }
  };

  // One pointer drags; two pointers pinch around their midpoint.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // A pointer that is already gone cannot be captured; the drag still works without it.
    }
    setDragging(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const map = pointers.current;
    const prev = map.get(e.pointerId);
    if (!prev) return;
    if (map.size === 1) {
      panBy(e.clientX - prev.x, e.clientY - prev.y);
    } else if (map.size === 2) {
      const [other] = [...map.entries()].filter(([id]) => id !== e.pointerId).map(([, p]) => p);
      const before = Math.hypot(prev.x - other.x, prev.y - other.y);
      const after = Math.hypot(e.clientX - other.x, e.clientY - other.y);
      const r = e.currentTarget.getBoundingClientRect();
      if (before > 0) zoomBy(after / before, (e.clientX + other.x) / 2 - r.left, (e.clientY + other.y) / 2 - r.top);
    }
    map.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) setDragging(false);
  };

  const pct = Math.round(view.s * 100);
  const ready = loaded >= resumePages.length;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`resume${closing ? ' is-closing' : ''}`}
      aria-labelledby="resume-title"
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClose={() => {
        setClosing(false);
        onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <header className="resume__bar">
        <h2 id="resume-title" className="label resume__title">
          Résumé <span className="resume__count">{resumePages.length} pages</span>
        </h2>
        <button type="button" className="resume__close" onClick={requestClose} aria-label="Close résumé">
          <XIcon size={20} />
        </button>
      </header>

      <div
        ref={stageRef}
        className={`resume__stage${dragging ? ' is-dragging' : ''}`}
        aria-busy={!ready && !failed}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {opened && base > 0 && (
          <div
            className="resume__sheet"
            style={{ width: base * view.s, gap: GAP * view.s, transform: `translate3d(${view.x}px, ${view.y}px, 0)` }}
          >
            {resumePages.map((p, i) => (
              <img
                key={p.src}
                className="resume__page"
                src={p.src}
                width={p.width}
                height={p.height}
                alt={`Résumé, page ${i + 1} of ${resumePages.length}`}
                draggable={false}
                onLoad={() => setLoaded((n) => n + 1)}
                onError={() => setFailed(true)}
              />
            ))}
          </div>
        )}
        {failed && (
          <p className="resume__error" role="alert">
            The preview did not load. The PDF has the same résumé.{' '}
            <a href={links.resume} download>
              Download the PDF
            </a>
          </p>
        )}
      </div>

      <div className="resume__tools" role="toolbar" aria-label="Résumé controls">
        <button type="button" className="resume__tool" onClick={() => zoomBy(1 / STEP)} disabled={view.s <= MIN} aria-label="Zoom out">
          <MinusIcon size={18} />
        </button>
        <button type="button" className="resume__tool resume__pct" onClick={fit} aria-label={`Zoom ${pct}%. Reset to fit`}>
          {pct}%
        </button>
        <button type="button" className="resume__tool" onClick={() => zoomBy(STEP)} disabled={view.s >= MAX} aria-label="Zoom in">
          <PlusIcon size={18} />
        </button>
        <span className="resume__divider" aria-hidden="true" />
        <a className="resume__tool resume__download" href={links.resume} download>
          <DownloadIcon size={18} />
          <span className="resume__download-label">Download PDF</span>
        </a>
      </div>
    </dialog>,
    document.body,
  );
}
