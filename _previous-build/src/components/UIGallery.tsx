import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { gallery, img } from '../data/home';
import { Reveal } from './Reveal';
import './UIGallery.css';

const prevArrow = img('6tTbkXggWgQCAJ4DO2QEdXXmgM.svg');
const nextArrow = img('11KSGbIZoRSg4pjdnUoif6MKHI.svg');

function Carousel({ images, format, label }: { images: string[]; format: 'mobile' | 'web'; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [images, update]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>('.carousel__item');
    const step = item ? item.offsetWidth + 10 : el.clientWidth * 0.8;
    const perPage = Math.max(1, Math.floor(el.clientWidth / step));
    el.scrollBy({ left: dir * step * perPage, behavior: 'smooth' });
  };

  return (
    <div className={`carousel carousel--${format}`}>
      <div
        ref={trackRef}
        className="carousel__track"
        onScroll={update}
        tabIndex={0}
        role="group"
        aria-label={`${label} screens, scroll sideways for more`}
      >
        {images.map((src, i) => (
          <div className="carousel__item" key={src}>
            <img src={src} alt={`${label} screen ${i + 1} of ${images.length}`} loading="lazy" />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="carousel__arrow carousel__arrow--prev"
        onClick={() => page(-1)}
        aria-label="Previous screens"
        hidden={edges.start}
      >
        <img src={prevArrow} alt="" width={40} height={40} />
      </button>
      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        onClick={() => page(1)}
        aria-label="Next screens"
        hidden={edges.end}
      >
        <img src={nextArrow} alt="" width={40} height={40} />
      </button>
    </div>
  );
}

export function UIGallery() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const item = gallery[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = gallery.length - 1;
    let next = active;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  // Warm the cache for the next tab's first screens so switching never shows an empty frame.
  useEffect(() => {
    const nextItem = gallery[(active + 1) % gallery.length];
    nextItem.images.slice(0, 3).forEach((src) => {
      const i = new Image();
      i.src = src;
    });
  }, [active]);

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <div className="gallery__content">
        <Reveal as="h2" className="section__title">
          <span id="gallery-title">UI Gallery</span>
        </Reveal>

        <Reveal className="gallery__body" index={1}>
          <div className="gallery__tabs" role="tablist" aria-label="Projects" onKeyDown={onKeyDown}>
            {gallery.map((g, i) => (
              <button
                key={g.label}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${baseId}-panel`}
                tabIndex={i === active ? 0 : -1}
                className="gallery__tab"
                onClick={() => setActive(i)}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div
            key={item.label}
            className="gallery__panel"
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${active}`}
          >
            <div className="gallery__text">
              {item.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <Carousel images={item.images} format={item.format} label={item.label.replace(/ \d{4}$/, '')} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
