import { clients, type ClientLogo } from '../data/home';
import './LogoMarquee.css';

function Logo({ logo }: { logo: ClientLogo }) {
  return (
    <li className="logo" style={{ gap: logo.gap }}>
      {logo.parts.map((part, i) =>
        part.kind === 'image' ? (
          <img
            key={i}
            src={part.src}
            width={part.w}
            height={part.h}
            alt=""
            loading="lazy"
            decoding="async"
            className={part.tone === 'invert' ? 'logo__mark--invert' : undefined}
          />
        ) : (
          <span key={i} className={`logo__label${part.variant === 'circuit' ? ' logo__label--circuit' : ''}`}>
            {part.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        ),
      )}
    </li>
  );
}

/**
 * Clients, drifting left in one continuous line, in their original colours. Two copies of the
 * set make the loop seamless.
 */
export function LogoMarquee() {
  return (
    <section className="marquee-section" aria-labelledby="clients-label">
      <h2 id="clients-label" className="label marquee-section__label">
        I have designed products for
      </h2>
      <ul className="visually-hidden">
        {clients.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <ul className="marquee__set" key={copy}>
              {clients.map((c) => (
                <Logo key={c.name} logo={c} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
