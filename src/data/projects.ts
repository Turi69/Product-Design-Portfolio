// One list drives the homepage drum, the Works index and the project pages.
import { gallery, projects as featured } from './home';

export type Category = 'Mobile' | 'Web';
export type Industry =
  | 'Commerce'
  | 'Education'
  | 'Engineering'
  | 'Faith'
  | 'Fintech'
  | 'Health'
  | 'Logistics'
  | 'Mobility'
  | 'Property'
  | 'Social'
  | 'Sports';

export type Work = {
  slug: string;
  title: string;
  year: string;
  category: Category;
  summary: string;
  /** Very short subtitle for the Index label. */
  dub?: string;
  /** Industry, for the Works filter. */
  industry: Industry;
  /** Composited product mockup: a generated scene with the real screen fitted in. */
  mockup: string;
  paragraphs: string[];
  screens: string[];
  format: 'mobile' | 'web';
  /** Full case study still lives on the original site for these. */
  caseStudy?: string;
};

const mockup = (name: string) => `/assets/mockups/${name}.webp`;
const fromGallery = (label: string) => {
  const g = gallery.find((x) => x.label === label);
  if (!g) throw new Error(`Missing gallery item: ${label}`);
  return g;
};
const firstSentence = (p: string) => (p.match(/^[^.]+\./)?.[0] ?? p).trim();

const featuredWork = (slug: string, category: Category): Omit<Work, 'industry'> => {
  const p = featured.find((x) => x.slug === slug);
  if (!p) throw new Error(`Missing project: ${slug}`);
  return {
    slug,
    title: p.title,
    year: p.year,
    category,
    summary: p.description.replace(/\s+/g, ' '),
    mockup: mockup(slug),
    paragraphs: [p.description.replace(/\s+/g, ' ')],
    screens: [],
    format: category === 'Mobile' ? 'mobile' : 'web',
  };
};

const galleryWork = (slug: string, label: string, title: string): Omit<Work, 'industry'> => {
  const g = fromGallery(label);
  return {
    slug,
    title,
    year: label.match(/\d{4}$/)?.[0] ?? '',
    category: g.format === 'mobile' ? 'Mobile' : 'Web',
    summary: firstSentence(g.paragraphs[0]),
    mockup: mockup(slug),
    paragraphs: g.paragraphs,
    screens: g.images,
    format: g.format,
  };
};

/** One-line subtitle shown with the project name on the Index, drawn from each case study. */
const dubs: Record<string, string> = {
  wayfinder: 'Safer, fairer trips on Lagos transit',
  whodeygo: 'Send parcels with travellers already flying',
  outout: 'Plan it, split it, keep it, as a group',
  cwook: 'A social feed you can shop from',
  lemonsplit: 'Split group bills without the chasing',
  rhapsody: 'Today’s devotional, one tap away',
  jaa: 'A career platform for JA Africa alumni',
  circuitmind: 'AI circuit design, made legible',
  axe: 'Learning paths with human mentors',
  fantasy: 'Fantasy F1, head to head every weekend',
  azuri: 'One system for a three-tower estate',
};

/** Industry per project, condensed from each case study's sector or client. */
const industries: Record<string, Industry> = {
  wayfinder: 'Mobility',
  whodeygo: 'Logistics',
  outout: 'Social',
  cwook: 'Commerce',
  lemonsplit: 'Fintech',
  rhapsody: 'Faith',
  jaa: 'Education',
  circuitmind: 'Engineering',
  axe: 'Education',
  fantasy: 'Sports',
  azuri: 'Property',
};

export const works: Work[] = [
  featuredWork('wayfinder', 'Mobile'),
  ({
    slug: 'whodeygo',
    title: 'WhoDeyGo',
    year: '2026',
    category: 'Mobile',
    summary: 'A peer-to-peer app that matches people sending parcels abroad with travellers already flying that route.',
    mockup: mockup('whodeygo'),
    paragraphs: ['A peer-to-peer app that matches people sending parcels abroad with travellers already flying that route.'],
    screens: [],
    format: 'mobile',
  } satisfies Omit<Work, 'industry'>),
  ({
    slug: 'outout',
    title: 'OutOut',
    year: '2026',
    category: 'Mobile',
    summary: 'A mobile app for friend groups to agree a date, split costs and share photos from every outing.',
    mockup: mockup('outout'),
    paragraphs: ['A mobile app for friend groups to agree a date, split costs and share photos from every outing.'],
    screens: [],
    format: 'mobile',
  } satisfies Omit<Work, 'industry'>),
  featuredWork('cwook', 'Mobile'),
  galleryWork('lemonsplit', 'Lemon Split 2025', 'LemonSplit'),
  galleryWork('rhapsody', 'Rhapsody of Realities 2025', 'Rhapsody of Realities'),
  featuredWork('jaa', 'Web'),
  galleryWork('circuitmind', 'Circuitmind 2024', 'Circuitmind'),
  galleryWork('axe', 'AXE 2024', 'AXE'),
  galleryWork('fantasy', 'Fantasy One 2024', 'Fantasy One'),
  galleryWork('azuri', 'Azuri facility Management 2023', 'Azuri Facility Management'),
].map((w) => ({ ...w, dub: dubs[w.slug], industry: industries[w.slug] }));

export const workBySlug = (slug: string) => works.find((w) => w.slug === slug);
