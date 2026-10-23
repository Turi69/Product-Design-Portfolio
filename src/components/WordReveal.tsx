import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks';
import './WordReveal.css';

/**
 * Statement that sharpens word by word as it scrolls through the viewport:
 * each word goes from faint and blurred to crisp, in reading order.
 */
export function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = [...el.querySelectorAll<HTMLElement>('.wreveal__w')];
    if (reduced) {
      spans.forEach((s) => s.style.setProperty('--p', '1'));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top reaches 85% of the viewport, 1 when its bottom reaches 55%.
      const start = vh * 0.85;
      const end = vh * 0.55 - r.height;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      const n = spans.length;
      spans.forEach((s, i) => {
        const local = Math.min(1, Math.max(0, p * n - i * 0.85));
        s.style.setProperty('--p', local.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced, text]);

  return (
    <p ref={ref} className={`wreveal ${className}`.trim()}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="wreveal__w">
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </p>
  );
}
