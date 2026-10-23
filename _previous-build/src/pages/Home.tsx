import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Experience } from '../components/Experience';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { Hero } from '../components/Hero';
import { UIGallery } from '../components/UIGallery';
import { WhyMe } from '../components/WhyMe';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <UIGallery />
      <WhyMe />
      <Experience />
      <Contact />
    </>
  );
}
