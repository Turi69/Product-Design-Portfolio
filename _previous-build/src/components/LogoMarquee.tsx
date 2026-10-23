import { clients, type ClientLogo } from '../data/home';
import './LogoMarquee.css';

function Logo({ logo }: { logo: ClientLogo }) {
  return (
    <div className="logo" style={{ gap: logo.gap }}>
      {logo.parts.map((part, i) =>
        part.kind === 'image' ? (
          <img key={i} src={part.src} width={part.w} height={part.h} alt="" loading="eager" />
        ) : (
          <span key={i} className={`logo__label${part.variant === 'circuit' ? ' logo__label--circuit' : ''}`}>
            {part.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        ),
      )}
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div className="marquee" role="region" aria-label="Clients">
      <ul className="visually-hidden">
        {clients.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <div className="marquee__track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee__set" key={copy}>
            {clients.map((c) => (
              <Logo key={c.name} logo={c} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
