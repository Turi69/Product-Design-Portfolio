import { about } from '../data/home';
import { Reveal } from './Reveal';
import './About.css';

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="about__content">
        <Reveal as="h2" className="section__title">
          <span id="about-title">{about.title}</span>
        </Reveal>

        <Reveal className="about__body lead" index={1}>
          <p>
            Hey! I&apos;m Turi, a <strong>Senior Product Designer and Team Lead</strong> with experience shaping
            products for education, enterprise services, fintech, and consumer apps. I lead end to-end design
            processes from research and problem framing to interface design and implementation. I work closely with
            cross functional teams, guiding product decisions with clear reasoning and structured workflows.
          </p>
          <p>
            I have led the design of web and mobile platforms, design systems, onboarding flows, analytics
            dashboards, and internal tools. My work focuses on clarity in interaction patterns, strong visual
            hierarchy, and measurable improvements in user outcomes. I have delivered results in both early stage
            product environments and established teams.
          </p>
          <p>
            I have also coached and mentored aspiring designers through a structured training academy, developing
            curriculum, guiding live projects, and supporting professional growth paths. He work with stakeholders,
            researchers, designers, writers, and engineers to align decisions and maintain design quality.
          </p>
          <p>
            I supports my work with thoughtful communication, documentation, and continuous iteration. My approach
            is grounded in understanding user needs, defining clear problem statements, and driving execution with
            consistency and accountability.
          </p>
        </Reveal>

        <Reveal className="about__skills" index={2}>
          <h3 className="mono about__skills-label">SKILLS</h3>
          <ul className="about__chips">
            {about.skills.map((skill) => (
              <li key={skill} className="about__chip">
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
