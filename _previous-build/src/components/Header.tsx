import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brand, links } from '../data/home';
import { useClock, useScrollDirectionVisible } from '../hooks';
import './Header.css';

const navLinks = [
  { label: 'My Resume', href: links.resume },
  { label: 'Linkedin', href: links.linkedin },
];

export function Header() {
  const visible = useScrollDirectionVisible();
  const time = useClock(brand.timeZone);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  // Close the phone menu on route change and on Escape, returning focus to the toggle.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const brandShown = visible && !open;

  return (
    <header className={`header${open ? ' is-open' : ''}`}>
      <div className="header__inner">
        <Link
          to="/"
          className={`header__brand${brandShown ? '' : ' is-hidden'}`}
          aria-label={`Turi, home. Based in ${brand.location}, local time ${time}`}
          tabIndex={brandShown ? 0 : -1}
        >
          <img className="header__mark" src={brand.mark} alt="" width={40} height={40} />
          <span className="header__meta" aria-hidden="true">
            <span className="header__location">{brand.location}</span>
            <span className="header__time">{time}</span>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
        </button>
      </div>

      <nav id={menuId} className="header__menu" aria-label="Menu" hidden={!open}>
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
