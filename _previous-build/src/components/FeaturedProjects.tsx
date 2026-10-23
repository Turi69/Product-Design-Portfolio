import { projects } from '../data/home';
import { LottieMedia } from './LottieMedia';
import { Reveal } from './Reveal';
import './FeaturedProjects.css';

export function FeaturedProjects() {
  return (
    <section id="work" className="section projects" aria-labelledby="projects-title">
      <div className="projects__content">
        <Reveal as="h2" className="section__title">
          <span id="projects-title">Featured Projects</span>
        </Reveal>

        <ul className="projects__list">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} index={i % 2}>
              {/* Case studies are not rebuilt yet; until they are, cards open the live pages. */}
              <a
                href={`https://turiux.framer.website/${p.slug}`}
                target="_blank"
                rel="noreferrer"
                className="project-card"
              >
                <LottieMedia
                  className="project-card__media"
                  src={p.animation}
                  poster={p.image}
                  alt={`${p.title} screens`}
                />
                <div className="project-card__head">
                  <h3 className="project-card__title">{p.title}</h3>
                  <span className="mono project-card__year">{p.year}</span>
                </div>
                <p className="project-card__desc">{p.description}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
