import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CountUp } from '../components/CountUp';
import { Reveal } from '../components/Reveal';
import { RoleRoute } from '../components/RoleRoute';
import { WordReveal } from '../components/WordReveal';
import { sectionNames, type CaseStudy as Case, type Point, type Stat } from '../data/caseStudies';
import { workBySlug, works } from '../data/projects';
import { usePrefersReducedMotion } from '../hooks';
import './CaseStudy.css';

const pad = (n: number) => String(n).padStart(2, '0');
const sectionId = (i: number) => `section-${i + 1}`;

/** Full-bleed hero that drifts slightly slower than the page as you scroll past it. */
function ParallaxHero({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    const img = el?.querySelector('img');
    if (!el || !img || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      img.style.transform = `translate3d(0, ${(-r.top * 0.18).toFixed(1)}px, 0) scale(1.08)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);
  return (
    <div ref={ref} className="case-hero">
      {/* Lowercase attribute: React 18 does not know the camelCase prop. */}
      <img src={src} alt={alt} width={1280} height={960} {...{ fetchpriority: 'high' }} />
    </div>
  );
}

function ImpactCards({ stats }: { stats: Stat[] }) {
  return (
    <ul className="case-impact">
      {stats.map((s, i) => (
        <Reveal as="li" className="case-impact__card" index={i} key={s.label}>
          <span className="case-impact__value">
            <CountUp value={s.value} />
          </span>
          <span className="case-impact__label">{s.label}</span>
          {s.note && <span className="case-impact__note">{s.note}</span>}
        </Reveal>
      ))}
    </ul>
  );
}

/** Tight row of one-line points under a statement. */
function Points({ points }: { points: Point[] }) {
  return (
    <ul className="case-points" style={{ '--n': points.length } as CSSProperties}>
      {points.map((p, i) => (
        <Reveal as="li" index={i} key={p.title}>
          <span className="case-points__num mono-label">{pad(i + 1)}</span>
          <span className="case-points__title">{p.title}</span>
          <span className="case-points__line">{p.line}</span>
        </Reveal>
      ))}
    </ul>
  );
}

function Section({ index, title, children }: { index: number; title: string; children?: ReactNode }) {
  return (
    <section id={sectionId(index)} className="case-section" aria-labelledby={`${sectionId(index)}-k`}>
      <header className="case-section__head">
        <h2 className="case-section__kicker mono-label" id={`${sectionId(index)}-k`}>
          <span>{pad(index + 1)}</span>
          {sectionNames[index]}
        </h2>
        <WordReveal className="case-section__title" text={title} />
      </header>
      {children}
    </section>
  );
}

/** Live prototype, loaded only when asked for so the page stays light. */
function Prototype({ src, note, title }: { src: string; note: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="case-proto">
      <h3 className="case-gallery__title">Prototype</h3>
      <div className="case-proto__frame">
        {on ? (
          <iframe src={src} title={`${title} interactive prototype`} loading="lazy" allow="fullscreen" />
        ) : (
          <button type="button" className="case-proto__start" onClick={() => setOn(true)}>
            <span className="case-proto__play" aria-hidden="true">
              ▶
            </span>
            Load the interactive prototype
          </button>
        )}
      </div>
      <p className="case-proto__note">
        {note}{' '}
        <a href={src} target="_blank" rel="noreferrer">
          Open it in a new tab
        </a>
      </p>
    </div>
  );
}

/** Sticky index of the six sections; highlights the one in view. Desktop only. */
function SectionRail() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const els = sectionNames.map((_, i) => document.getElementById(sectionId(i))).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(els.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav className="case-rail" aria-label="Case study sections">
      <ol>
        {sectionNames.map((name, i) => (
          <li key={name}>
            <a href={`#${sectionId(i)}`} className="mono-label" aria-current={i === current ? 'true' : undefined}>
              <span>{pad(i + 1)}</span>
              {name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CaseStudy({ study }: { study: Case }) {
  const work = workBySlug(study.slug);
  const i = works.findIndex((w) => w.slug === study.slug);
  const next = works[(i + 1) % works.length];

  return (
    <article className="case">
      <header className="page case-top">
        <h1 className="case-title" aria-label={study.title}>
          {study.title.split(' ').map((w, n) => (
            <span key={n} className="case-title__word" style={{ '--i': n } as CSSProperties} aria-hidden="true">
              {w}{' '}
            </span>
          ))}
        </h1>
        <dl className="case-meta">
          {study.meta.map((m) => (
            <div key={m.label}>
              <dt className="mono-label">{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {work && <ParallaxHero src={work.mockup} alt={`${study.title} on a ${work.format === 'mobile' ? 'phone' : 'laptop'}`} />}

      <div className="case-body">
        <SectionRail />

        <div className="case-sections">
          <Section index={0} title={study.overview.statement}>
            <div className="case-prose">
              {study.overview.body.map((p, n) => (
                <Reveal as="p" index={n} key={n}>
                  {p}
                </Reveal>
              ))}
            </div>
            {study.website && (
              <a className="case-live" href={study.website.href} target="_blank" rel="noreferrer">
                <span className="case-live__dot" aria-hidden="true" />
                <span>
                  <span className="mono-label case-live__label">Live product</span>
                  <span className="case-live__host">{study.website.label}</span>
                </span>
                <span className="case-live__arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="visually-hidden">, opens in a new tab</span>
              </a>
            )}
          </Section>

          <Section index={1} title={study.problem.statement}>
            <Points points={study.problem.points} />
          </Section>

          <Section index={2} title={study.solution.statement}>
            <Points points={study.solution.points} />
          </Section>

          <Section index={3} title={study.role.summary}>
            <div className="case-owned">
              <p className="mono-label case-owned__label">What I owned</p>
              <ul>
                {study.role.owned.map((o, k) => (
                  <Reveal as="li" index={k % 6} key={o}>
                    {o}
                  </Reveal>
                ))}
              </ul>
            </div>
            <RoleRoute stops={study.role.stops} />
          </Section>

          <Section index={4} title={study.impact.title}>
            <ImpactCards stats={study.impact.stats} />
            {study.impact.caveat && <p className="case-caveat">{study.impact.caveat}</p>}
          </Section>

          <Section index={5} title={study.screens.title}>
            {study.screens.groups.map((g, gi) => (
              <div className="case-gallery" key={gi}>
                {g.title && <h3 className="case-gallery__title">{g.title}</h3>}
                <ul className={`case-gallery__grid case-gallery__grid--${study.screens.format}`}>
                  {g.shots.map((s, k) => (
                    <Reveal as="li" index={k % 4} key={s.img.src}>
                      <figure className="case-shot">
                        <span className="case-shot__frame">
                          <img
                            src={s.img.src}
                            width={s.img.w}
                            height={s.img.h}
                            alt={s.caption ?? `${study.title}, ${g.title ?? 'screen'} ${k + 1}`}
                            loading="lazy"
                            decoding="async"
                          />
                        </span>
                        {s.caption && <figcaption>{s.caption}</figcaption>}
                      </figure>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
            {study.screens.prototype && <Prototype {...study.screens.prototype} title={study.title} />}
          </Section>
        </div>
      </div>

      <Link to={`/work/${next.slug}`} className="case-next">
        <span className="case-next__kicker">Next</span>
        <span className="case-next__title">{next.title}</span>
      </Link>

      <footer className="case-footer">
        <p className="label">© 2026 Turi Ogefere</p>
        <Link to="/work" className="case-footer__link">
          All works
        </Link>
      </footer>
    </article>
  );
}
