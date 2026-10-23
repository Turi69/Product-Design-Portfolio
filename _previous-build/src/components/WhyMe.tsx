import { whyMe } from '../data/home';
import { AudioPlayer } from './AudioPlayer';
import { Reveal } from './Reveal';
import './WhyMe.css';

export function WhyMe() {
  return (
    <section id="why-me" className="section why" aria-labelledby="why-title">
      <div className="why__copy">
        <Reveal className="why__header">
          <h2 id="why-title" className="section__title">
            {whyMe.title}
          </h2>
          <p className="lead why__intro">{whyMe.intro}</p>
        </Reveal>
        <Reveal as="ul" className="why__list" index={1}>
          {whyMe.industries.map((name) => (
            <li key={name} className="why__chip">
              <span className="pulse" aria-hidden="true" />
              {name}
            </li>
          ))}
        </Reveal>
      </div>

      <Reveal className="why__media" index={1}>
        <img
          className="why__portrait"
          src={whyMe.portrait}
          alt="Turi smiling in a navy suit with arms folded"
          width={400}
          height={400}
          loading="lazy"
        />
        <AudioPlayer src={whyMe.audio} label="Hear from me directly" />
      </Reveal>
    </section>
  );
}
