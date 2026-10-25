import { Fragment, useEffect, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { WordReveal } from '../components/WordReveal';
import { experience, links, stack } from '../data/home';
import './About.css';

const focus: Record<string, string> = {
  'AIENAI Tech Ltd.': 'Product',
  'Heckerbella Ltd.': 'Product',
  'EasyMunch Ltd': 'Product',
};

// From the CV's core skills; each proof is a figure the CV states.
const services = [
  {
    name: 'Product design',
    note: 'Web and mobile products taken from problem to high-fidelity UI.',
    skills: ['Wireframing', 'Prototyping', 'Interaction design', 'Accessibility (WCAG AA)', 'UX writing'],
    proof: '11+ products, end to end',
  },
  {
    name: 'Leadership',
    note: 'Leading a design team, setting its standards and hiring the people who join it.',
    skills: ['Team leadership', 'Hiring', 'Mentoring', 'Design critique', 'Design standards'],
    proof: 'Hiring panels: C54 News, Barbados',
  },
  {
    name: 'Research',
    note: 'Interviews, usability tests and usage data to decide what to build and fix first.',
    skills: ['User research', 'Journey mapping', 'Usability testing', 'Analytics reviews'],
    proof: 'Activation 29% to 62%',
  },
  {
    name: 'Design systems',
    note: 'Tokens, components and docs that keep many products consistent.',
    skills: ['DTCG tokens', 'Figma variables', 'Component libraries', 'Theming', 'Versioning'],
    proof: '471 tokens, 103 components',
  },
  {
    name: 'Front-end build',
    note: 'I build what I design: React front ends made with AI coding agents from written specs, details polished by hand.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS v4', 'Claude Code', 'Codex'],
    proof: 'First load cut by 79%',
  },
];

const bio = [
  'I started as a founder. In 2021 I built Easymunch, a three-sided food delivery marketplace in Benin City, and designed the customer, restaurant and rider sides of it.',
  'Today I lead design at AIENAI, a UK AI and product consultancy, with a team of 4 designers. We often work without a product manager, so I own product direction as well as the design.',
  'I also hire. I helped build my own team, led designer hiring at C54 News, and sat on hiring panels for the Government of Barbados.',
];

const headline = 'Designer with a founder’s mindset';

export function About() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <div className="about">
      <section className="about-hero" aria-labelledby="about-title">
        <picture className="about-hero__media">
          <source media="(max-width: 809px)" srcSet="/assets/mockups/portrait-1200.webp" />
          <img
            src="/assets/mockups/portrait-2400.webp"
            alt="Turi smiling in a navy suit, arms folded"
            width={2400}
            height={3000}
            {...{ fetchpriority: 'high' }}
          />
        </picture>
        <div className="about-hero__content">
          <h1 id="about-title" className="about-hero__title" aria-label={headline}>
            {headline.split(' ').map((w, i) => (
              <span key={i} className="about-hero__word" style={{ '--i': i } as CSSProperties} aria-hidden="true">
                {w}{' '}
              </span>
            ))}
          </h1>
          <p className="about-hero__intro">
            Senior Product Designer &amp; Team Lead. 5+ years across fintech, edtech and SaaS. Based in Lagos, working
            with UK teams.
          </p>
        </div>
      </section>

      <section className="about-section about-approach" aria-labelledby="approach-label">
        <h2 id="approach-label" className="label about-section__label">
          My approach
        </h2>
        <WordReveal
          className="about-approach__text"
          text="I take products from problem to launch, often in place of a product manager. I set the direction, lead the designers who deliver it, and build the front end when that gets it shipped."
        />
      </section>

      <section className="about-section" aria-labelledby="bio-label">
        <h2 id="bio-label" className="label about-section__label">
          About me
        </h2>
        <div className="about-bio">
          {bio.map((p, i) => (
            <Reveal as="p" className="about-bio__text" index={i} key={i}>
              {p}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-section" aria-labelledby="experience-label">
        <h2 id="experience-label" className="visually-hidden">
          Experience
        </h2>
        <table className="about-table">
          <colgroup>
            <col className="about-table__col-year" />
            <col />
            <col />
            <col className="about-table__col-focus" />
          </colgroup>
          <thead>
            <tr className="label">
              <th scope="col">Year</th>
              <th scope="col">Company</th>
              <th scope="col">Role</th>
              <th scope="col">Focus</th>
            </tr>
          </thead>
          <tbody>
            {experience.map((job, i) => (
              <Reveal as="tr" index={i} key={job.company}>
                <td className="about-table__year">{job.years.replace(' - ', '–')}</td>
                <td>
                  <span className="about-table__company">
                    <img src={job.logo} alt="" width={20} height={20} />
                    {job.company}
                  </span>
                </td>
                <td className="about-table__caps">{job.role}</td>
                <td className="about-table__caps">{focus[job.company]}</td>
              </Reveal>
            ))}
          </tbody>
        </table>
      </section>

      <section className="about-section about-services" aria-labelledby="services-label">
        <h2 id="services-label" className="label about-section__label">
          What I do
        </h2>
        <ol className="about-services__list">
          {services.map((s, i) => (
            <Reveal as="li" className="about-services__item" index={i} key={s.name}>
              <span className="about-services__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="about-services__name">{s.name}</span>
              <span className="about-services__body">
                <span className="about-services__note">{s.note}</span>
                <span className="about-services__skills">
                  {s.skills.map((k, n) => (
                    <Fragment key={k}>
                      <span>{k}</span>
                      {n < s.skills.length - 1 && ' · '}
                    </Fragment>
                  ))}
                </span>
              </span>
              <span className="about-services__proof">{s.proof}</span>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="about-section about-tools" aria-labelledby="tools-label">
        <h2 id="tools-label" className="label about-section__label">
          My stack
        </h2>
        <ul className="about-tools__grid">
          {stack.map((t, i) => (
            <Reveal as="li" className="about-tools__card" index={i % 3} key={t.name}>
              <span className="about-tools__media">
                <img src={t.icon} alt="" width={48} height={48} loading="lazy" />
              </span>
              <span className="about-tools__name">{t.name}</span>
              <span className="about-tools__use">{t.use}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section id="contact" className="about-contact" aria-labelledby="contact-title">
        <h2 id="contact-title" className="visually-hidden">
          Contact
        </h2>
        <a className="about-contact__card" href={links.email}>
          <span className="about-contact__lead">
            Interested in working together?
            <span className="about-contact__meta">{links.email.replace('mailto:', '')}</span>
          </span>
          <span className="about-contact__cta">Get in touch</span>
        </a>
        <a className="about-contact__card" href={links.resume} download>
          <span className="about-contact__lead">Want the full picture?</span>
          <span className="about-contact__cta">Download résumé</span>
        </a>
      </section>

      <footer className="about-footer">
        <p className="label">© 2026 Turi Ogefere</p>
        <ul className="about-footer__links">
          <li>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </li>
          <li>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={links.twitter} target="_blank" rel="noreferrer">
              X (Twitter)
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
