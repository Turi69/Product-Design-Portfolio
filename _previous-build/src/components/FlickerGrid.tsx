import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks';

// Grid of 4px squares on a 6px pitch at the foot of the hero. Pale grey base,
// with purple cells that flicker, denser towards the bottom edge.
type Props = {
  square?: number;
  gap?: number;
  base?: string;
  accent?: [number, number, number];
  className?: string;
};

export function FlickerGrid({
  square = 4,
  gap = 2,
  base = '#f5f5f5',
  accent = [114, 14, 158],
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pitch = square + gap;
    let cols = 0;
    let rows = 0;
    let cells = new Float32Array(0);
    let raf = 0;
    let last = 0;
    let running = true;

    const seed = (row: number) => {
      // Probability of a lit cell rises with depth: none at the top, ~9% on the bottom row.
      const depth = rows > 1 ? row / (rows - 1) : 1;
      const chance = Math.pow(depth, 1.8) * 0.09;
      return Math.random() < chance ? 0.3 + Math.random() * 0.7 : 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / pitch);
      rows = Math.ceil(height / pitch);
      cells = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells[r * cols + c] = seed(r);
      draw();
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      for (let r = 0; r < rows; r++) {
        const fade = rows > 1 ? 0.35 + 0.65 * (r / (rows - 1)) : 1;
        for (let c = 0; c < cols; c++) {
          const v = cells[r * cols + c];
          const x = c * pitch;
          const y = r * pitch;
          if (v > 0) {
            ctx.fillStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${(v * fade).toFixed(3)})`;
          } else {
            ctx.fillStyle = base;
          }
          ctx.fillRect(x, y, square, square);
        }
      }
    };

    const tick = (t: number) => {
      if (!running) return;
      if (t - last > 90) {
        // Re-roll a small share of cells each step so the field shimmers rather than strobes.
        const flips = Math.max(1, Math.round(cols * rows * 0.012));
        for (let i = 0; i < flips; i++) {
          const idx = (Math.random() * cells.length) | 0;
          cells[idx] = seed(Math.floor(idx / cols));
        }
        draw();
        last = t;
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only animate while on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      running = entry.isIntersecting && !reduced;
      if (running) raf = requestAnimationFrame(tick);
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [square, gap, base, accent, reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
