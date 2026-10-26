import { Link, useParams } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { SplitText } from '../components/SplitText';
import { caseStudies } from '../data/caseStudies';
import { workBySlug, works } from '../data/projects';
import { CaseStudy } from './CaseStudy';
import './Project.css';

export function Project() {
  const { slug = '' } = useParams();
  const study = caseStudies[slug];
  if (study) return <CaseStudy study={study} />;
  const work = workBySlug(slug);

  if (!work) {
    return (
      <div className="page project project--missing">
        <h1 className="project__title">Project not found</h1>
        <p className="project__lead">That link does not match any project. It may have been renamed.</p>
        <Link to="/work" className="project__button">
          See all works
        </Link>
      </div>
    );
  }

  const i = works.indexOf(work);
  const next = works[(i + 1) % works.length];

  return (
    <article className="page project" key={work.slug}>
      <header className="project__head">
        <h1 className="project__title">
          <SplitText text={work.title} delay={80} />
        </h1>
        <dl className="project__meta">
          <div>
            <dt className="label">Year</dt>
            <dd>{work.year}</dd>
          </div>
          <div>
            <dt className="label">Platform</dt>
            <dd>{work.category}</dd>
          </div>
        </dl>
      </header>

      <figure className="project__hero">
        <img src={work.mockup} alt={work.mockupAlt ?? `${work.title} on a ${work.format === 'mobile' ? 'phone' : 'laptop'}`} width={1280} height={960} />
      </figure>

      <section className="project__body" aria-labelledby="overview-label">
        <h2 id="overview-label" className="label project__label">
          Overview
        </h2>
        <div className="project__text">
          {work.paragraphs.map((p, n) => (
            <Reveal as="p" index={n} key={n}>
              {p}
            </Reveal>
          ))}
          {work.caseStudy && (
            <a className="project__button" href={work.caseStudy} target="_blank" rel="noreferrer">
              Read the full case study
            </a>
          )}
        </div>
      </section>

      {work.screens.length > 0 && (
        <section className="project__screens" aria-label={`${work.title} screens`}>
          <ul className={`project__strip project__strip--${work.format}`} tabIndex={0} aria-label="Scroll sideways for more screens">
            {work.screens.map((src, n) => (
              <li key={src}>
                <img src={src} alt={`${work.title} screen ${n + 1} of ${work.screens.length}`} loading="lazy" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link to={`/work/${next.slug}`} className="project__next">
        <span className="label">Next project</span>
        <span className="project__next-title">{next.title}</span>
      </Link>
    </article>
  );
}
