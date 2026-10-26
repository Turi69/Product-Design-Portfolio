// Homepage content, captured from the live Framer site (turiux.framer.website).
export const img = (name: string) => `/assets/img/${name}`;
export const logo = (name: string) => `/assets/logos/${name}`;

export const links = {
  resume: '/Turi-Ogefere-Resume.pdf',
  linkedin: 'https://www.linkedin.com/in/turi-ogefere',
  phone: 'tel:+2349071841632',
  whatsapp: 'https://wa.me/2349071841632',
  twitter: 'https://twitter.com/_turi69',
  email: 'mailto:ogefere.efeturi@gmail.com',
};

export const brand = {
  mark: img('cj6hJvTrUydjTHyFeYFptewxrl0.png'),
  location: 'Lagos, Nigeria NG',
  timeZone: 'Africa/Lagos',
};

export const hero = {
  avatar: img('83TnHwrCHaAN3kycpWSgVlGQp8.jpg'),
  stack: [
    img('khNiXn5P2Ej2NeNjRjHWToD8ILc.png'),
    img('q9aY9OZMnDjMqovMiWDckTtJ6A.png'),
    img('C9ZyhOYZYnzufyHEImHTYvmUtHU.png'),
  ],
};

type LogoPart =
  | { kind: 'image'; src: string; w: number; h: number; /** Black ink that would vanish on the dark stage. */ tone?: 'invert' }
  | { kind: 'label'; lines: string[]; variant?: 'circuit' };

export type ClientLogo = { name: string; gap: number; parts: LogoPart[] };

export const clients: ClientLogo[] = [
  { name: 'University of Lagos', gap: 0, parts: [
    { kind: 'image', src: img('pSBPtWRoc3lDOyrqtGDmxcigvNE.png'), w: 48, h: 50 },
    { kind: 'label', lines: ['UNIVERSITY', 'OF LAGOS'] },
  ] },
  { name: 'EKO Development', gap: 8, parts: [
    { kind: 'image', src: logo('eko-0.svg'), w: 45, h: 28 },
    { kind: 'label', lines: ['EKO', 'Development'] },
  ] },
  { name: 'JA Africa', gap: 8, parts: [
    { kind: 'image', src: logo('ja-0.svg'), w: 32, h: 40 },
    { kind: 'label', lines: ['JA', 'Africa'] },
  ] },
  { name: 'Digital Jewels Africa', gap: 8, parts: [
    { kind: 'image', src: img('uEZs8Z0znr4kQ9qPNJEiIAicZXg.png'), w: 41, h: 48, tone: 'invert' },
    { kind: 'label', lines: ['Digital Jewels', 'Africa'] },
  ] },
  { name: 'Four Points by Sheraton', gap: 10, parts: [
    { kind: 'image', src: logo('fourpoints-0.svg'), w: 60, h: 40, tone: 'invert' },
  ] },
  { name: 'The Rising Tide Africa', gap: 10, parts: [
    { kind: 'image', src: logo('ebony-0.svg'), w: 77, h: 46 },
  ] },
  { name: 'Freyda', gap: 10, parts: [
    { kind: 'image', src: logo('freyda-0.svg'), w: 133, h: 32 },
  ] },
  { name: 'Christ Embassy', gap: 0, parts: [
    { kind: 'image', src: img('q4BdBikrAx4s7QBSbmKK5qKnd0.png'), w: 51, h: 40 },
    { kind: 'label', lines: ['Christ', 'Embassy'] },
  ] },
  { name: 'Circuit Mind', gap: 10, parts: [
    { kind: 'image', src: logo('circuitmind-0.svg'), w: 24, h: 25 },
    { kind: 'label', lines: ['CIRCUIT MIND'], variant: 'circuit' },
  ] },
];

export const about = {
  title: 'Designer with a Founder’s Mindset',
  skills: [
    'User Experience Design',
    'Mastery of Design Systems',
    'User Research and Testing',
    'Information Achitecture',
    'Highly Creative & Resourceful',
    'Detail Oriented',
    'Team Player',
    'Communication and Presentation',
  ],
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  description: string;
  image: string;
  animation: string;
};

export const projects: Project[] = [
  {
    slug: 'wayfinder',
    title: 'WayFinder',
    year: '2026',
    description:
      'WayFinder is a mobile navigation app that helps Lagos commuters navigate Nigeria’s informal public transport system with transparency, safety, and confidence.',
    image: img('aISX1lErHXxclb7sZohheACmZfs.jpg'),
    animation: '/assets/lottie/wayfinder.json',
  },
  {
    slug: 'cwook',
    title: 'Cwook',
    year: '2025',
    description:
      'A social media platform that merges the fun of user interaction and community building of a conventional social media platform with the robust payment and delivery capabilities of an e-commerce platform.',
    image: img('zcbPU7BfcKi6zXZyyVzoT8rYbc.jpg'),
    animation: '/assets/lottie/cwook.json',
  },
  {
    slug: 'jaa',
    title: 'JAA Career Matching Platform',
    year: '2024',
    description:
      'A  networking solution designed to help JAA alumni students take their careers to new heights by matches them with exciting job opportunities, and provides access to valuable learning resources to improve their skills.',
    image: img('knFKnNqiUahDq92GiWAVdj8KO8c.jpg'),
    animation: '/assets/lottie/jaa.json',
  },
];

export type GalleryItem = {
  label: string;
  format: 'mobile' | 'web';
  paragraphs: string[];
  images: string[];
};

const imgs = (...names: string[]) => names.map(img);

export const gallery: GalleryItem[] = [
  {
    label: 'Lemon Split 2025',
    format: 'mobile',
    paragraphs: [
      'LemonSplit solves a problem most Nigerian groups face after every hangout, shared rental, or family contribution: nobody remembers who paid what. Research with 24 young professionals in Lagos showed 78% rely on screenshots and memory to track group spending, and 6 in 10 had lost a friendship or felt awkward over unpaid balances. Mixed payment methods like bank transfers, OPay, and cash made reconciliation worse.',
      'I designed LemonSplit to remove the social friction from group money. Users create an expense, the app splits the bill across selected members, and each person confirms payment with a tap. Polite, pre-written reminders handle the awkward follow-up.',
      'The design uses plain-language summaries, three-tap entry flows, and a warm visual tone to lower the barrier to honest record-keeping. In closed beta with 40 users across 12 groups, payment reconciliation time dropped from an average of 4 days to under 6 hours, and 92% of testers said they would replace their current tracking method (notes app or WhatsApp) with LemonSplit.',
    ],
    images: imgs(
      'vJ1jrzlTmceJtMfciI0GFbcGW0.png', '5WHhHp8D7lFifS9KmJkIqFpPV90.png', 'QAEBqmsCRWNHvlcqdOInRB8Q1k.png',
      'vqVlk4wvYG5Uz5QaEzk5qIVNxSc.png', 'cIsQe5V5ENia1kbXr14mE4xpls.png', 'K1e1JBoFU9FOAgFFqE5NOht0BM.png',
      '66DJWZMqG3aUOp6sQKrINj90o.png', '2qyXhrFJLlniyqW5CDUNoF40s.png', 'fLwRQygfJl0XAwD8TLwx9MsHeA.png',
      'fMcpqo7bCL1cSPkR92iVpCdlg4c.png', '3rllamfcPUROKAAXIOOgzWboumM.png', 'DFO1RaQrqw5FMkRGJisZfGXwYg.png',
      '0otNHgihZfbgmlwQe3QiHQZswI.png', 'DqxudKj6BIlOPnl9m4YyHQtZsn4.png',
    ),
  },
  {
    label: 'Rhapsody of Realities 2025',
    format: 'mobile',
    paragraphs: [
      'Rhapsody of Realities reaches over 7 million daily readers across 242 countries, but the legacy mobile app suffered from a cluttered home screen, deep navigation, and a 41% week-one churn rate. User interviews with 30 readers across Nigeria, Ghana, and the UK revealed three pain points: finding today’s article took too many taps, language switching was buried in settings, and audio playback broke when the screen locked.',
      'I led the redesign of the reading experience and information architecture. The new home screen surfaces today’s article, audio version, and language picker within one tap. I rebuilt the settings hierarchy from 4 levels deep to 2, and worked with engineering to fix background audio.',
      'Post-launch metrics measured against a 6-week baseline showed average session duration rising from 3.2 to 5.8 minutes, week-one retention improving by 27%, and audio plays increasing 3.4x. Support tickets about language settings dropped by 64%. The app’s rating moved from 3.6 to 4.5 stars on Google Play within 90 days.',
    ],
    images: imgs(
      'yql0eRXnFITLGF93BwqvxhaVXAs.png', 'Rmxy2xyIALBl7smTCqCCrb8frQU.png', 'G5imiWo65UKuMh0HhHOjrXrhwg.png',
      'EGIl8tB0uBUFicPD6BxQMeiBHno.png', '72bRWsijoUpNQ78JbQ3LP1LsQG8.png', 'LioOMlw2l83M4lu17jd1BQO7Xw8.png',
      'fg8Lf91yLtm9B1k7OMgakhSxRjA.png', '484HlXqOJB3przOHYZ2Ql851ns.png', 'fa7OzRsck0NFwAOOjdtVX885A3c.png',
    ),
  },
  {
    label: 'Circuitmind 2024',
    format: 'web',
    paragraphs: [
      'Circuitmind builds AI tooling for electronic circuit design. Their flagship platform helped engineers automate schematic generation, but onboarding was a wall: new users abandoned the product before completing their first design, with a 71% drop-off rate inside week one. The core issue, surfaced through 12 user interviews and session recordings, was that engineers did not understand how the AI co-pilot fit into their existing workflow.',
      'I redesigned the onboarding flow and the main workspace. The new flow walks engineers through a guided first project using their own component library, with contextual tips replacing the previous static documentation. I introduced a workspace shell with three clear panes: input, AI suggestions, and validation output.',
      'After release, week-one activation (defined as completing a first schematic) climbed from 29% to 62%. Time-to-first-design fell from 47 minutes to 18. The sales team reported a 2x increase in trial-to-paid conversion within the first quarter, and Circuitmind used the redesigned onboarding as the core demo in investor meetings.',
    ],
    images: imgs(
      'EppeMWBHHRSaR1neLbFIg4CdppY.png', '8DIFSsfVi4pR5CfcRlmFB6MEnjI.png',
      '4iQLGuyVperGb93vQKmOax8PD7A.png', '4EgoUuzWzyUQ4rrzMjg0eX6Jvns.png',
    ),
  },
  {
    label: 'AXE 2024',
    format: 'web',
    paragraphs: [
      'An innovative Learning Management System (LMS) designed to deliver highly personalized learning experiences by blending advanced machine learning with human mentorship. Our mission was to create a platform that adapts seamlessly to individual and group learning needs, serving both individuals looking to acquire new skills and businesses aiming to upskill their teams.',
      'My responsibilities included leading UI design and prototyping, while also supporting user research and usability testing phases. Collaborating closely with in-house AI specialists in transforming traditional teaching methods into sophisticated machine-learning models capable of personalized instruction posed my biggest challenge.',
      'Key features I designed include adaptive learning paths, reward-based engagement systems, adaptive content delivery, collaboration and task management tools, virtual classroom environments, and integrated assessment functionalities.',
      'The prototype has successfully undergone testing in multiple UK locations, receiving positive feedback and putting us on track for securing funding to further develop the product.',
    ],
    images: imgs(
      'jbOwhEKcOIF0QHJAKGrxM13owQ.png', 'BWxDwlWgPHPnKeVzDMLWjhkDM.png', 'paTxf6QzXqSnuMsynzT83e2y0I.png',
      'LOZEEKJ4sg0hsnGfiX8KWKSGQjI.png', 's4BD6G5TnDpdt0KnCAnogyuCGc.png', 'aCYAGGJmFgzrvqeGh6wNefMIYbs.png',
    ),
  },
  {
    label: 'Fantasy One 2024',
    format: 'mobile',
    paragraphs: [
      'I led the design for Fantasy F1, a social app where friends draft their dream Formula 1 teams and compete across the season. My responsibilities spanned UI wireframes, a unified design system, interactive prototypes, and user testing to ensure a fast, game‑day experience.',
      'Key features include head‑to‑head matchups, live race schedules with real‑time results, and detailed profiles for every F1 driver, letting users make data‑driven lineup decisions on the fly.',
      'Early feedback highlighted the app’s intuitive flow and competitive fun. The product is now live, steadily attracting motorsport fans worldwide.',
    ],
    images: imgs(
      'DT4u7wFh9mPxVwlZXUu7QFLycw.png', 'mTSRTcys7gexgCDxw5NielQAog.png', '1aeVQhOurrSv5IGF2JOFN1H5v7U.png',
      'AmhWpsVTzHi5jnks27KPzG47zE.png', 'hEVGKhZxV74N36fcpcHIlc7gMyA.png', 'gWSZ5mAHTRoSFRLayvJYqfeOPFU.png',
      'EilMTuZE43hWSxLtxPWPwhz4tIs.png', 'OCOsBemGDKTH03q3IZUxp8ZDLgs.png', 'hLXbHKEjhCsR2TRVirUEwduBVI.png',
      'rcUG5Jf3Ip7AKM1jBNGJhairRPI.png',
    ),
  },
  {
    label: 'Tendarly 2023',
    format: 'mobile',
    paragraphs: [
      'As the lead designer for Tendarly, a telemedicine application, I created an intuitive interface that combines an AI-powered chatbot with real-time doctor consultations. The app’s advanced language model collects patient symptoms and medical history, automatically connecting them with available physicians without delay.',
      'My responsibilities included creating UI wireframes, developing a cohesive design system, and creating interactive prototypes for internal review.',
      'Notable features include AI-driven symptom assessment, secure patient-doctor transitions, comprehensive medical chat histories, detailed consultation notes, actionable follow-ups, and insightful doctor performance dashboards.',
    ],
    images: imgs(
      'CBC5dl58Z9KnCA38TARH1UhppDw.png', 'yyUuhJ2yJokcchgViER5aNmOqU.png', 'zC9L9pOD28UerxtJgwjb5WM3Yk.png',
      'jW9Id3dkbO3SQe1Xl3vUjVMxhc.png', 'lp316SCuTVyD0EHeMBjibjcAUE.png', 'ohfo1MXEdgMicY1iU8tqrcPDxY.png',
      'Gc4CDBfDDSOT2pbh8E1bmvi5sg.png', 'Gnp6OwHdnqoVJjyNjY7KTBqO1cE.png', 'vg2t5f405utpIi8J6oHofBJX6rk.png',
      'DaYzve7eKT6Bto845mtxV3QER8.png',
    ),
  },
  {
    label: 'Azuri facility Management 2023',
    format: 'web',
    paragraphs: [
      'I led the design of Azuri’s web‑based Facility Management System, unifying finance, maintenance, security, inventory, and space management for a three‑tower mixed‑use complex owned by EKO Development Group. My work covered information architecture, role‑based user flows, high‑fidelity prototypes, and a scalable design system.',
      'Key highlights include real‑time analytics dashboards, an interactive 3D property view, automated maintenance and vendor workflows, and comprehensive finance and electricity billing modules.',
      'The system is now live and actively used by EKO Development Group. Early feedback confirms markedly smoother workflows and higher operational efficiency across their facilities.',
    ],
    images: imgs(
      'dH1IuDss3uGKOsvHeTDL4bHtF8k.png', 'TjQLUXIVu5IVC0V35Y826TqiYE.png', 'f6ZrkFkC7q60T94DfQqnzTdkbXU.png',
      '4lGtRekp8itXvuh4aHHhls3RIek.png', '5bpYA4RPJb8RqYkwCR45rdgM.png', 'YYDujWkfuASEySMAPu1wtwhVo.png',
    ),
  },
];

export const whyMe = {
  title: 'Why You Should Hire Me As Your Product Designer',
  intro:
    'I bring four (4) years of product design experience from two agencies. I have led design teams and collaborated with stakeholders to finish projects across the following industries:',
  industries: [
    'Religious technology', 'GOV Tech', 'Real estate', 'Non-profit', 'Health Tech', 'Ed-Tech', 'Retail',
    'IT consulting', 'Finance', 'Hospitality and tourisim', 'Fantasy sports', 'Electronics design automation (EDA)',
  ],
  portrait: img('1bPrU0g4bqlgyqVTNFZzpmHBhe4.jpg'),
  audio: img('3xxAqa2EGlEsqnPvOYPrM3Vm8g.mp3'),
};

export const experience = [
  { company: 'AIENAI Tech Ltd.', role: 'Senior Product Designer & Team Lead', years: '2023 - NOW', logo: img('C9ZyhOYZYnzufyHEImHTYvmUtHU.png') },
  { company: 'Heckerbella Ltd.', role: 'Product Designer', years: '2022 - 2023', logo: img('q9aY9OZMnDjMqovMiWDckTtJ6A.png') },
  { company: 'EasyMunch Ltd', role: 'Founder & Product Designer', years: '2021 - 2022', logo: img('khNiXn5P2Ej2NeNjRjHWToD8ILc.png') },
];

// Tools from the CV. Glyphs from Simple Icons (CC0), recoloured to the type colour.
const tool = (name: string) => `/assets/stack/${name}.svg`;
// Design tools lead; the build tools behind the vibe coding follow.
export const stack = [
  { name: 'Figma', use: 'Interface design and variables', icon: tool('figma') },
  { name: 'Framer', use: 'Web design', icon: tool('framer') },
  { name: 'Webflow', use: 'Websites without code', icon: tool('webflow') },
  { name: 'Adobe Creative Cloud', use: 'Brand and campaign assets', icon: tool('adobe-cc') },
  { name: 'Claude Code', use: 'Front-end builds with AI agents', icon: tool('claude-code') },
  { name: 'Codex', use: 'Agent builds and code review', icon: tool('codex') },
  { name: 'GitHub', use: 'Version control', icon: tool('github') },
  { name: 'Vercel', use: 'Deploys and previews', icon: tool('vercel') },
  { name: 'n8n', use: 'Workflow automation', icon: tool('n8n') },
];

export const cta = {
  title: 'Have a project idea in mind? Let’s chat about how we can bring it to life!',
  background: img('xHCSXyXEl4g13xXKz4gTvzU8Xnk.jpg'),
  dots: img('wGAHOWhVswEtWkOKTJN6s2CW0.svg'),
};
