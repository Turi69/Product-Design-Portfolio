import { hero } from '../data/home';
import { FlickerGrid } from './FlickerGrid';
import { LogoMarquee } from './LogoMarquee';
import { Meteors } from './Meteors';
import './Hero.css';

const stackTilt = [-3, 3, -4];

export function Hero() {
  return (
    <section id="hero" className="section hero" aria-labelledby="hero-title">
      <Meteors />
      <FlickerGrid className="hero__grid" />

      <div className="hero__content">
        {/* Phone copy, as on the original: avatar sits between "I'm" and "Turi". */}
        <h1 className="hero__title hero__title--phone" tabIndex={-1}>
          <span className="hero__line" style={{ '--i': 0 } as React.CSSProperties}>
            Hello, I’m
            <span className="hero__slot hero__slot--avatar" aria-hidden="true">
              <span className="hero__tile" style={{ '--tilt': '4deg' } as React.CSSProperties}>
                <img src={hero.avatar} alt="" width={41} height={43} />
              </span>
            </span>
            Turi Delighted to have you explore my portfolio
          </span>{' '}
          <span className="hero__line" style={{ '--i': 1 } as React.CSSProperties}>
            <span className="hero__slot hero__slot--stack" aria-hidden="true">
              {hero.stack.map((src, i) => (
                <span
                  key={src}
                  className="hero__tile"
                  style={{ '--tilt': `${stackTilt[i]}deg`, '--n': i } as React.CSSProperties}
                >
                  <img src={src} alt="" width={41} height={42} />
                </span>
              ))}
            </span>
            I craft standout designs for <span className="hero__muted">Full-time positions.</span>
          </span>
        </h1>

        <h1 id="hero-title" className="hero__title hero__title--wide" tabIndex={-1}>
          <span className="hero__line" style={{ '--i': 0 } as React.CSSProperties}>
            Hello, I’m Turi
            <span className="hero__slot hero__slot--avatar" aria-hidden="true">
              <span className="hero__tile" style={{ '--tilt': '4deg' } as React.CSSProperties}>
                <img src={hero.avatar} alt="" width={49} height={51} />
              </span>
            </span>
            Delighted to have you explore
          </span>{' '}
          <span className="hero__line" style={{ '--i': 1 } as React.CSSProperties}>
            my portfolio
            <span className="hero__slot hero__slot--stack" aria-hidden="true">
              {hero.stack.map((src, i) => (
                <span
                  key={src}
                  className="hero__tile"
                  style={{ '--tilt': `${stackTilt[i]}deg`, '--n': i } as React.CSSProperties}
                >
                  <img src={src} alt="" width={48} height={50} />
                </span>
              ))}
            </span>
            I create standout digital
          </span>{' '}
          <span className="hero__line" style={{ '--i': 2 } as React.CSSProperties}>
            experiences for <span className="hero__muted">full-time positions.</span>
          </span>
        </h1>

        <div className="hero__clients">
          <p className="hero__clients-label">I have designed products for</p>
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
