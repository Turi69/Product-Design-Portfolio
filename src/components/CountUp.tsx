import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks';

/**
 * Counts the leading number of a value up from zero when it first scrolls into view,
 * keeping any prefix and suffix ("$173 billion", "40%", "9/10"). Values whose number
 * is not the only figure ("2m 30s") are shown as written.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const match = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
  const countable = !!match && !/\d/.test(match[3].replace(/^\/\d+/, ''));
  const target = countable ? Number(match![2]) : 0;
  const decimals = countable ? (match![2].split('.')[1]?.length ?? 0) : 0;
  const [shown, setShown] = useState(countable && !reduced ? 0 : target);

  useEffect(() => {
    if (!countable || reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Already scrolled past (deep link or a fast jump): show the real figure, no count.
          if (entry.boundingClientRect.bottom < 0) {
            io.disconnect();
            setShown(target);
          }
          return;
        }
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4); // quart out: fast start, soft landing
          setShown(target * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [countable, reduced, target, duration]);

  if (!countable) return <span>{value}</span>;
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {match![1]}
        {shown.toFixed(decimals)}
        {match![3]}
      </span>
    </span>
  );
}
