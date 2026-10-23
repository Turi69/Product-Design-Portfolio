import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Drum } from '../components/Drum';
import { SplitText } from '../components/SplitText';
import { works } from '../data/projects';
import './Index.css';

// The CV's headline disciplines.
const disciplines = [
  'Product Design',
  'Design Systems',
  'AI-Assisted Front-End Development',
  'AI Automation & Orchestration',
];

export function Index() {
  // Announce only the visitor's own moves; the drift would otherwise speak every 8 seconds.
  const [announced, setAnnounced] = useState<number | null>(null);
  const onChange = useCallback((i: number, auto: boolean) => {
    if (!auto) setAnnounced(i);
  }, []);
  const w = announced !== null ? works[announced] : null;

  // The index is a single fixed scene: the wheel drives the stack, not the page.
  useEffect(() => {
    document.documentElement.classList.add('is-stage');
    return () => document.documentElement.classList.remove('is-stage');
  }, []);

  return (
    <div className="index">
      <h1 className="visually-hidden">Turi Ogefere, Senior Product Designer and Team Lead</h1>

      <section className="index__stage" aria-label="Selected projects. Scroll or use the arrow keys to browse.">
        <Drum items={works} onChange={onChange} />
      </section>

      <p className="index__name" aria-hidden="true">
        <SplitText text="TURI" delay={250} />
        <br />
        <SplitText text="OGEFERE" delay={370} />
      </p>

      <div className="index__intro">
        <p className="index__tagline">
          <SplitText
            text="Senior product designer and team lead. I design and build digital products for consumers and enterprises."
            delay={520}
            stagger={10}
          />
        </p>
        <ul className="index__disciplines mono-label" aria-label="Disciplines">
          {disciplines.map((d, i) => (
            <li key={d} style={{ '--i': i } as CSSProperties}>
              {d}
            </li>
          ))}
        </ul>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {w && `${w.title}, ${w.year}, project ${announced! + 1} of ${works.length}`}
      </p>
    </div>
  );
}
