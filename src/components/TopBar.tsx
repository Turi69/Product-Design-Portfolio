import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { brand, links } from '../data/home';
import { useClock } from '../hooks';
import { ResumeViewer } from './ResumeViewer';
import { RollText } from './RollText';
import './TopBar.css';

const socials = [
  { short: 'IN', label: 'LinkedIn', href: links.linkedin },
  { short: 'X', label: 'X (Twitter)', href: links.twitter },
];

export function TopBar() {
  const time = useClock(brand.timeZone);
  const [resumeOpen, setResumeOpen] = useState(false);

  // A plain click opens the viewer; modified clicks keep the browser's own behaviour with the PDF.
  const openResume = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setResumeOpen(true);
  };

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
        <li>
          <a className="label" href={links.resume} onClick={openResume} aria-haspopup="dialog" aria-label="Résumé">
            <RollText>CV</RollText>
          </a>
        </li>
      </ul>
      <p className="topbar__clock label">
        LAGOS, <time aria-label={`Local time in Lagos ${time}`}>{time.replace(/\s?[AP]M$/i, '')}</time>
      </p>
      <ResumeViewer open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </header>
  );
}
