import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Artefact, Stop } from '../data/caseStudies';
import { usePrefersReducedMotion } from '../hooks';
import './RoleRoute.css';

const pad = (n: number) => String(n).padStart(2, '0');

function ArtefactView({ artefact }: { artefact: Artefact }) {
  switch (artefact.kind) {
    case 'quote':
      return (
        <figure className="route-quote">
          <blockquote>“{artefact.text}”</blockquote>
          <figcaption className="mono-label">{artefact.by}</figcaption>
        </figure>
      );

    case 'people':
      return (
        <ul className="route-people">
          {artefact.people.map((p, i) => (
            <li key={p.name} style={{ '--k': i } as CSSProperties}>
              <img src={p.avatar.src} width={p.avatar.w} height={p.avatar.h} alt="" loading="lazy" />
              <span className="route-people__name">{p.name}</span>
              <span className="route-people__note mono-label">{p.note}</span>
            </li>
          ))}
        </ul>
      );

    case 'chips':
      return (
        <ol className="route-chips">
          {artefact.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );

    case 'images':
      return (
        <ul className={`route-images route-images--${artefact.format}`}>
          {artefact.images.map((im, i) => (
            <li key={im.img.src} style={{ '--k': i, '--n': artefact.images.length } as CSSProperties}>
              <a href={im.img.src} target="_blank" rel="noreferrer" aria-label={`${im.alt}, open full size in a new tab`}>
                <img src={im.img.src} width={im.img.w} height={im.img.h} alt={im.alt} loading="lazy" decoding="async" />
              </a>
            </li>
          ))}
        </ul>
      );
  }
}

/**
 * "My role and work" as a route map: one line through the stages of the project, a stop
 * per stage. The line fills as you scroll; each stop lights up as it reaches mid-screen.
 */
export function RoleRoute({ stops }: { stops: Stop[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(-1);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const fill = list.querySelector<HTMLElement>('.route__fill');
    const markers = [...list.querySelectorAll<HTMLElement>('.route__stop')];
    if (reduced) {
      if (fill) fill.style.transform = 'scaleY(1)';
      setLit(stops.length - 1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      if (fill) fill.style.transform = `scaleY(${p.toFixed(4)})`;
      let last = -1;
      markers.forEach((m, i) => {
        if (m.getBoundingClientRect().top < mid) last = i;
      });
      setLit(last);
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
  }, [reduced, stops.length]);

  return (
    <ol ref={ref} className="route">
      <span className="route__track" aria-hidden="true">
        <span className="route__fill" />
      </span>
      {stops.map((s, i) => (
        <li key={s.stage} className={`route__stop${i <= lit ? ' is-lit' : ''}`}>
          <span className="route__marker" aria-hidden="true" />
          <div className="route__text">
            <p className="route__num mono-label">Stop {pad(i + 1)}</p>
            <h3 className="route__stage">{s.stage}</h3>
            <ul className="route__did">
              {s.did.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          {s.artefact && (
            <div className="route__artefact">
              <ArtefactView artefact={s.artefact} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
