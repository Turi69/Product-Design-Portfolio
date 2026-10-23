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

/** Floating bottom nav. One white pill slides between items to mark where you are. */
export function NavPill() {
  const { pathname, hash } = useLocation();
  const current = activeIndex(pathname, hash);
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  const target = hovered ?? current;

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const el = list.children[target] as HTMLElement | undefined;
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [target]);

  return (
    <nav className="navpill" aria-label="Primary">
      <ul ref={listRef} className="navpill__list" onMouseLeave={() => setHovered(null)}>
        {items.map((item, i) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className={`navpill__link${i === target ? ' is-lit' : ''}`}
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
      {pill && (
        <span
          className="navpill__pill"
          aria-hidden="true"
          style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}
        />
      )}
    </nav>
  );
}
