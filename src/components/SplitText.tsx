import type { CSSProperties } from 'react';
import './SplitText.css';

type Props = {
  text: string;
  /** Delay before the first letter, in ms. */
  delay?: number;
  /** Stagger per letter, in ms. Capped so long strings still finish quickly. */
  stagger?: number;
  className?: string;
};

/** Letters rise out of a mask one after another. Screen readers get the plain string. */
export function SplitText({ text, delay = 0, stagger = 28, className = '' }: Props) {
  const words = text.split(' ');
  let n = 0;
  const step = Math.min(stagger, 500 / Math.max(text.length, 1));
  return (
    <span className={`split ${className}`.trim()} aria-label={text} role="text">
      {words.map((word, w) => (
        <span className="split__word" key={w} aria-hidden="true">
          {[...word].map((ch) => {
            const i = n++;
            return (
              <span className="split__mask" key={i}>
                <span className="split__char" style={{ '--d': `${delay + i * step}ms` } as CSSProperties}>
                  {ch}
                </span>
              </span>
            );
          })}
          {w < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}
