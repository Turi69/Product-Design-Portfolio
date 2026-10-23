import { useMemo, type CSSProperties } from 'react';
import './Meteors.css';

// Faint diagonal streaks drifting across the hero, like the original's "BG - Meteors" layer.
// Seeded so server and client agree and the layout is stable between renders.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function Meteors({ count = 17 }: { count?: number }) {
  const meteors = useMemo(() => {
    const rand = seeded(42);
    return Array.from({ length: count }, () => ({
      left: `${-10 + rand() * 90}%`,
      top: `${-15 + rand() * 60}%`,
      length: Math.round(60 + rand() * 50),
      duration: `${5 + rand() * 6}s`,
      delay: `${-rand() * 10}s`,
    }));
  }, [count]);

  return (
    <div className="meteors" aria-hidden="true">
      {meteors.map((m, i) => (
        <span
          key={i}
          className="meteors__item"
          style={
            {
              left: m.left,
              top: m.top,
              width: m.length,
              animationDuration: m.duration,
              animationDelay: m.delay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
