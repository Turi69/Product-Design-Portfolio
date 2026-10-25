import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavPill.css';

const items = [
  { label: 'Index', to: '/' },
  { label: 'Works', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/about#contact' },
];

function activeIndex(pathname: string, hash: string) {
  if (pathname === '/about' && hash === '#contact') return 3;
  if (pathname.startsWith('/about')) return 2;
  if (pathname.startsWith('/work')) return 1;
  return 0;
}

type Box = { x: number; w: number };

/**
 * Floating bottom nav. A white pill marks where you are and stays there; a quiet highlight
 * follows the pointer or keyboard, so pointing at a link never hides the current page.
 */
export function NavPill() {
  const { pathname, hash } = useLocation();
  const current = activeIndex(pathname, hash);
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);

  // Measure every item once (and on resize), so both the pill and the highlight can move to any of them.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () =>
      setBoxes([...list.children].map((el) => ({ x: (el as HTMLElement).offsetLeft, w: (el as HTMLElement).offsetWidth })));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  const pill = boxes[current];
  const ghost = hovered !== null && hovered !== current ? boxes[hovered] : null;

  return (
    <nav className="navpill" aria-label="Primary">
      {ghost && <span className="navpill__ghost" aria-hidden="true" style={{ transform: `translateX(${ghost.x}px)`, width: ghost.w }} />}
      {pill && <span className="navpill__pill" aria-hidden="true" style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} />}
      <ul ref={listRef} className="navpill__list" onMouseLeave={() => setHovered(null)}>
        {items.map((item, i) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className={`navpill__link${i === current ? ' is-lit' : ''}`}
              aria-current={i === current ? 'page' : undefined}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
