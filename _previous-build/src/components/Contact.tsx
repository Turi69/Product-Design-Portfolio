import { cta, links } from '../data/home';
import { ArrowUpIcon, EnvelopeIcon, PhoneIcon, TwitterIcon, WhatsappIcon } from './Icons';
import { Reveal } from './Reveal';
import './Contact.css';

const actions = [
  { label: 'Book a short call', href: links.phone, Icon: PhoneIcon },
  { label: 'Chat on Whatsapp', href: links.whatsapp, Icon: WhatsappIcon },
  { label: 'Connect on X (Twitter)', href: links.twitter, Icon: TwitterIcon },
  { label: 'Shoot me a mail', href: links.email, Icon: EnvelopeIcon },
];

export function Contact() {
  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const titles = document.querySelectorAll<HTMLElement>('.hero__title');
    [...titles].find((t) => t.offsetParent !== null)?.focus({ preventScroll: true });
  };

  return (
    <footer id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__bg" aria-hidden="true">
        <img src={cta.background} alt="" loading="lazy" />
        <span className="contact__dots" style={{ backgroundImage: `url(${cta.dots})` }} />
      </div>

      <div className="contact__content">
        <Reveal as="h2" className="contact__title">
          <span id="contact-title">{cta.title}</span>
        </Reveal>
        <Reveal as="ul" className="contact__actions" index={1}>
          {actions.map(({ label, href, Icon }) => {
            const external = href.startsWith('http');
            return (
              <li key={label}>
                <a
                  className="contact__action"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <Icon size={19} />
                  {label}
                </a>
              </li>
            );
          })}
        </Reveal>
      </div>

      <div className="contact__foot">
        <a href="#hero" className="contact__top" onClick={toTop}>
          <ArrowUpIcon size={14} />
          Back to top
        </a>
      </div>
    </footer>
  );
}
