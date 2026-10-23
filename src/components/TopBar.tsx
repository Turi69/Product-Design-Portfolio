import { Link } from 'react-router-dom';
import { brand, links } from '../data/home';
import { useClock } from '../hooks';
import { RollText } from './RollText';
import './TopBar.css';

const socials = [
  { short: 'IN', label: 'LinkedIn', href: links.linkedin },
  { short: 'X', label: 'X (Twitter)', href: links.twitter },
  { short: 'CV', label: 'Résumé', href: links.resume },
];

export function TopBar() {
  const time = useClock(brand.timeZone);
  return (
    <header className="topbar">
      <Link to="/" className="topbar__mark label" aria-label="Turi, home">
        TURI®
      </Link>
      <ul className="topbar__socials">
        {socials.map((s) => (
          <li key={s.short}>
            <a className="label" href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.label}, opens in a new tab`}>
              <RollText>{s.short}</RollText>
            </a>
          </li>
        ))}
      </ul>
      <p className="topbar__clock label">
        LAGOS, <time aria-label={`Local time in Lagos ${time}`}>{time.replace(/\s?[AP]M$/i, '')}</time>
      </p>
    </header>
  );
}
