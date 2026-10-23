import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LogoMarquee } from '../components/LogoMarquee';
import { SplitText } from '../components/SplitText';
import { works, type Category, type Industry, type Work } from '../data/projects';
import { usePrefersReducedMotion } from '../hooks';
import './Works.css';

type Filter = 'All' | Category;
type IndustryFilter = 'All' | Industry;
type Display = 'list' | 'grid';
const filters: Filter[] = ['All', 'Mobile', 'Web'];
const STORE = 'works-view';
// Platform and display controls are hidden for now; the page shows every platform as a list.
// Set to true to bring them back, with their URL and saved state.
const SHOW_VIEW_CONTROLS = false;

// Industries with the most projects first, then alphabetical.
const industries = [...new Set(works.map((w) => w.industry))].sort(
  (a, b) =>
    works.filter((w) => w.industry === b).length - works.filter((w) => w.industry === a).length || a.localeCompare(b),
);
const isIndustry = (v: string | null): v is Industry => !!v && (industries as string[]).includes(v);

function readStore(): {
  filter?: Filter;
  display?: Display;
  industry?: IndustryFilter;
} {
  try {
    return JSON.parse(localStorage.getItem(STORE) ?? '{}');
  } catch {
    return {};
  }
}

const StackIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    aria-hidden="true"
  >
    <path d="M8 2 14 5 8 8 2 5 8 2Z" strokeLinejoin="round" />
    <path d="m2 8 6 3 6-3M2 11l6 3 6-3" strokeLinejoin="round" />
  </svg>
);

const GridIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="5" height="5" rx="1" />
    <rect x="9" y="2" width="5" height="5" rx="1" />
    <rect x="2" y="9" width="5" height="5" rx="1" />
    <rect x="9" y="9" width="5" height="5" rx="1" />
  </svg>
);

/** Mockup that trails the cursor while a row is hovered. Pointer devices only. */
function HoverPreview({ work }: { work: Work | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      const k = reduced ? 1 : 0.16;
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={ref} className={`works-preview${work ? ' is-on' : ''}`} aria-hidden="true">
      <div className="works-preview__frame">
        {works.map((w) => (
          <img
            key={w.slug}
            src={w.mockup}
            alt=""
            className={w.slug === work?.slug ? 'is-current' : undefined}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}

export function Works() {
  const [params, setParams] = useSearchParams();
  const stored = useMemo(readStore, []);
  // While the controls are hidden, a saved platform or display must not apply unseen.
  const filter: Filter = SHOW_VIEW_CONTROLS ? (params.get('filter') as Filter) || stored.filter || 'All' : 'All';
  const display: Display = SHOW_VIEW_CONTROLS ? (params.get('view') as Display) || stored.display || 'list' : 'list';
  const fromUrl = params.get('industry');
  const industry: IndustryFilter = isIndustry(fromUrl)
    ? fromUrl
    : stored.industry && stored.industry !== 'All' && isIndustry(stored.industry)
      ? stored.industry
      : 'All';
  const [hovered, setHovered] = useState<Work | null>(null);

  const update = (next: { filter?: Filter; display?: Display; industry?: IndustryFilter }) => {
    const f = next.filter ?? filter;
    const d = next.display ?? display;
    const ind = next.industry ?? industry;
    const p = new URLSearchParams();
    if (f !== 'All') p.set('filter', f);
    if (ind !== 'All') p.set('industry', ind);
    if (d !== 'list') p.set('view', d);
    setParams(p, { replace: true });
    try {
      localStorage.setItem(STORE, JSON.stringify({ filter: f, display: d, industry: ind }));
    } catch {
      /* Private mode: the URL still carries the view. */
    }
  };

  // Industry counts follow the platform filter, so a chip never promises projects it cannot show.
  const onPlatform = works.filter((w) => filter === 'All' || w.category === filter);
  const shown = onPlatform.filter((w) => industry === 'All' || w.industry === industry);
  const sorted = [...shown].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="page works">
      <h1 className="works__title">
        <SplitText text="Selected Works" delay={100} />
      </h1>

      <LogoMarquee />

      <div className="works__bar">
        {SHOW_VIEW_CONTROLS && (
          <>
            <div className="works__group" role="group" aria-label="Filter by platform">
              <span className="label works__group-label" aria-hidden="true">
                Platform:
              </span>
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="chip"
                  aria-pressed={filter === f}
                  onClick={() => update({ filter: f })}
                >
                  {f === 'All' ? 'All' : f}
                </button>
              ))}
            </div>
            <div className="works__group" role="group" aria-label="Display">
              <span className="label works__group-label" aria-hidden="true">
                Display:
              </span>
              {(['list', 'grid'] as Display[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  className="chip chip--icon"
                  aria-pressed={display === d}
                  onClick={() => update({ display: d })}
                >
                  {d === 'list' ? <StackIcon /> : <GridIcon />}
                  {d === 'list' ? 'Stack' : 'Grid'}
                </button>
              ))}
            </div>
          </>
        )}
        <div className="works__group works__group--industry" role="group" aria-label="Filter by industry">
          <span className="label works__group-label" aria-hidden="true">
            Industry:
          </span>
          {(['All', ...industries] as IndustryFilter[]).map((ind) => {
            const count = ind === 'All' ? onPlatform.length : onPlatform.filter((w) => w.industry === ind).length;
            return (
              <button
                key={ind}
                type="button"
                className="chip chip--count"
                aria-pressed={industry === ind}
                disabled={count === 0 && industry !== ind}
                onClick={() => update({ industry: ind })}
              >
                {ind}
                <span className="chip__count" aria-hidden="true">
                  {count}
                </span>
                <span className="visually-hidden">
                  , {count} {count === 1 ? 'project' : 'projects'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {sorted.length} {sorted.length === 1 ? 'project' : 'projects'}
      </p>

      {sorted.length === 0 ? (
        <div className="works__empty">
          <p>
            No {filter === 'All' ? '' : `${filter.toLowerCase()} `}projects in {industry.toLowerCase()} yet.
          </p>
          <button type="button" className="chip" onClick={() => update({ filter: 'All', industry: 'All' })}>
            Show all projects
          </button>
        </div>
      ) : display === 'list' ? (
        <ul key={`list-${filter}-${industry}`} className="works__list" onPointerLeave={() => setHovered(null)}>
          {sorted.map((w, i) => {
            // Index letter appears only where the initial changes, like a dictionary thumb-tab.
            const initial = w.title[0].toUpperCase();
            const showInitial = i === 0 || sorted[i - 1].title[0].toUpperCase() !== initial;
            return (
              <li key={w.slug} style={{ '--i': Math.min(i, 8) } as CSSProperties}>
                <Link
                  to={`/work/${w.slug}`}
                  className="works__row"
                  aria-label={`${w.title}, ${w.year}, ${w.category}`}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(w)}
                  onFocus={() => setHovered(null)}
                >
                  <span className="works__name">{w.title}</span>
                  <span className="works__initial" aria-hidden="true">
                    {showInitial ? initial : ''}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul key={`grid-${filter}-${industry}`} className="works__grid">
          {sorted.map((w, i) => (
            <li key={w.slug} style={{ '--i': Math.min(i, 8) } as CSSProperties}>
              <Link to={`/work/${w.slug}`} className="works__card">
                <span className="works__card-media">
                  <img src={w.mockup} alt="" width={1280} height={960} loading="lazy" decoding="async" />
                </span>
                <span className="works__card-text">
                  <span className="works__card-title">{w.title}</span>
                  <span className="works__card-meta">
                    {w.year}, {w.category}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {display === 'list' && <HoverPreview work={hovered} />}
    </div>
  );
}
