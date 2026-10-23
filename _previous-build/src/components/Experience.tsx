import { experience, stack } from '../data/home';
import { Reveal } from './Reveal';
import './Experience.css';

export function Experience() {
  return (
    <section id="experience" className="section experience" aria-label="Experience and stack">
      <div className="experience__block">
        <Reveal as="h2" className="section__title">
          Experience
        </Reveal>
        <ul className="experience__list">
          {experience.map((job, i) => (
            <Reveal as="li" className="experience__row" key={job.company} index={i}>
              <div className="experience__company">
                <img src={job.logo} alt="" width={26} height={26} loading="lazy" />
                <span>{job.company}</span>
              </div>
              <div className="experience__meta">
                <span className="experience__role">{job.role}</span>
                <span className="mono experience__years">{job.years}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="experience__block">
        <Reveal as="h2" className="section__title">
          My stack
        </Reveal>
        <ul className="stack">
          {stack.map((tool, i) => (
            <Reveal as="li" className="stack__card" key={tool.name} index={i % 3}>
              <img src={tool.icon} alt="" width={40} height={40} loading="lazy" />
              <div className="stack__text">
                <span className="stack__name">{tool.name}</span>
                <span className="stack__use">{tool.use}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
