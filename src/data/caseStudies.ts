// Case studies in one fixed structure: overview, problem, solution, role, impact, screens.
// Problem and solution are deliberately short; the research lives in the role route as
// the artefacts of each stage of the work.
import { caseImageSizes } from './caseImageSizes';

export type Img = { src: string; w: number; h: number };

const c = (name: string): Img => {
  const size = caseImageSizes[name];
  if (!size) throw new Error(`Missing case image: ${name}`);
  return { src: `/assets/cases/${name}.webp`, w: size[0], h: size[1] };
};

export type Stat = { value: string; label: string; note?: string };
export type Point = { title: string; line: string };
export type Shot = { img: Img; caption?: string };

/** What a route stop shows beside the work: the real output of that stage. */
export type Artefact =
  | { kind: 'quote'; text: string; by: string }
  | { kind: 'people'; people: { name: string; note: string; avatar: Img }[] }
  | { kind: 'images'; images: { img: Img; alt: string }[]; format: 'mobile' | 'web' | 'figure' }
  | { kind: 'chips'; items: string[] };

export type Stop = { stage: string; did: string[]; artefact?: Artefact };

export type CaseStudy = {
  slug: string;
  title: string;
  meta: { label: string; value: string }[];
  /** Live product, where there is one. */
  website?: { label: string; href: string };
  overview: { statement: string; body: string[] };
  problem: { statement: string; points: Point[] };
  solution: { statement: string; points: Point[] };
  role: { summary: string; owned: string[]; stops: Stop[] };
  impact: { title: string; stats: Stat[]; caveat?: string };
  screens: { title: string; format: 'mobile' | 'web'; groups: { title?: string; shots: Shot[] }[]; prototype?: { src: string; note: string } };
};

export const sectionNames = ['Project overview', 'Problem', 'Solution', 'My role and work', 'Impact', 'Screens'] as const;

const shots = (names: string[]): Shot[] => names.map((n) => ({ img: c(n) }));

/* ------------------------------------------------------------------ WayFinder */

const wayfinder: CaseStudy = {
  slug: 'wayfinder',
  title: 'WayFinder',
  meta: [
    { label: 'Category', value: 'Mobile app' },
    { label: 'Sector', value: 'Urban mobility, Lagos' },
    { label: 'Role', value: 'Research and product design' },
    { label: 'Year', value: '2026' },
  ],
  overview: {
    statement: 'Lagos runs on informal transit. No app was built for it.',
    body: [
      'WayFinder is a mobile navigation app that helps Lagos commuters navigate Nigeria’s informal public transport system with transparency, safety, and confidence.',
      'Mobility is the single most defining factor of quality of life for the estimated 22 million residents of Lagos. It determines access to employment, the viability of businesses, and the physical health of the citizenry.',
    ],
  },
  problem: {
    statement: 'Commuters pay unpredictable fares, ride without safety checks, and navigate with no maps.',
    points: [
      { title: 'Economic strain', line: 'Unregulated, cash-only fares that surge up to 300% in rain or traffic.' },
      { title: 'Safety threats', line: '“One chance” robberies and harassment, with no driver verification.' },
      { title: 'Navigation gaps', line: 'No route maps, no schedules and no last-mile connections.' },
    ],
  },
  solution: {
    statement: 'One app for the whole trip: transparent fares, safer rides and door-to-door routes.',
    points: [
      { title: 'Cheapest-first routes', line: 'Results sorted by fare, with weekly and monthly zone passes.' },
      { title: 'Crowd-verified fares', line: 'Riders report what they paid; overcharges get flagged.' },
      { title: 'Driver ID and SOS', line: 'See who is driving, and share your location in one tap.' },
      { title: 'Door-to-door routing', line: 'Danfo, BRT, train, keke and ferry in one journey.' },
    ],
  },
  role: {
    summary: 'I researched and designed WayFinder end to end, from field observation to a clickable prototype.',
    owned: ['Field research', 'Interviews', 'Personas', 'Journey mapping', 'User flows', 'UI design', 'Prototyping'],
    stops: [
      {
        stage: 'Discover',
        did: [
          'Triangulated fares, routes and risks from policy reports and field observation, as no official data exists',
          'Interviewed commuters at bus stops and motor parks',
        ],
        artefact: { kind: 'quote', text: 'If I leave at 7, the same bus that costs 200 naira is now 500.', by: 'Adaeze, civil servant, Ikeja to Victoria Island' },
      },
      {
        stage: 'Define',
        did: ['Mapped five actors in the transit ecosystem', 'Chose the daily commuter as the primary user'],
        artefact: {
          kind: 'people',
          people: [
            { name: 'Commuter', note: 'Primary user', avatar: c('BRu6MhHhp9NjldqU9TTCEAEoGKg') },
            { name: 'Driver', note: 'Tight margins', avatar: c('rF8R4HRfIIVeHIkyicJBSDkmw4') },
            { name: 'Union agent', note: 'Controls the stop', avatar: c('abQLLUGKR3Cn3jHeb2gUrAKwfgc') },
            { name: 'Merchant', note: 'Cash bridge', avatar: c('0bMK3e9ZTCaM67xohTcTMdwLfc') },
            { name: 'LAMATA', note: 'Regulator', avatar: c('oPEuAzzztCp3oXzmiGqCWbK6ksI') },
          ],
        },
      },
      {
        stage: 'Map',
        did: ['Journey-mapped a real commute to find where the system breaks', 'Designed the flow for a multi-leg trip, from verification to arrival'],
        artefact: {
          kind: 'images',
          format: 'figure',
          images: [
            { img: c('X68mePSTdSUY4kuRp9EqIJBcIQ'), alt: 'Journey map of a commute from Ikeja to Victoria Island' },
            { img: c('84dOenqhHnWsx26laFAOUXDZGY'), alt: 'User flow from phone verification to trip completion' },
          ],
        },
      },
      {
        stage: 'Design',
        did: ['Designed 15 high-fidelity screens for outdoor, on-the-go use', 'Built a clickable prototype of the full trip'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('auRxZYzoFDd3IbF8vhgH2VP348'), alt: 'Home screen with map and search' },
            { img: c('j4WWqHjDvTEX81uLv8VRAy0zWM'), alt: 'Route options with fares and safety scores' },
            { img: c('xN2ZWHu6iMTHyWcUgSXJy5rQ3mQ'), alt: 'In-trip screen with the SOS button' },
          ],
        },
      },
      {
        stage: 'Reflect',
        did: ['Next iteration: one-tap fare reporting, suggested trip legs instead of manual check-ins, and a commuter-only v1'],
        artefact: { kind: 'chips', items: ['Untested so far', 'v1 scope: commuter only'] },
      },
    ],
  },
  impact: {
    title: 'One trip flow that holds four products together',
    caveat: 'WayFinder has not been user-tested yet, so these are counts from the work, not measured outcomes.',
    stats: [
      { value: '4', label: 'Problem spaces in one flow', note: 'Cost, safety, navigation and community reporting, each justified inside the active trip.' },
      { value: '5', label: 'Personas mapped', note: 'Commuter, driver, union agent, merchant and LAMATA.' },
      { value: '15', label: 'High-fidelity screens', note: 'From phone login to arrival, prototyped end to end.' },
    ],
  },
  screens: {
    title: 'Every screen earns its place in the trip',
    format: 'mobile',
    groups: [
      {
        shots: [
          { img: c('bBtB0Bf6udu7XBeRzBK2NdPXm78'), caption: 'Splash screen.' },
          { img: c('eQ7CdXhIFMMCwCdZ1x7BPybsIM'), caption: 'Onboarding across Danfo, BRT, train, ferry and keke.' },
          { img: c('NLrsGq6kGHYLIsttEGGglzEaI'), caption: 'Phone login with local code and an SMS cost notice.' },
          { img: c('LGPfBxF70wxtrehBMy0uv7BsuYI'), caption: 'OTP with auto focus, timer and resend.' },
          { img: c('TjDrQLh18HPhdJCxPs7rYnaeew'), caption: 'Location permission, explained, with “Not Now”.' },
          { img: c('auRxZYzoFDd3IbF8vhgH2VP348'), caption: 'Home with map, list and a draggable sheet.' },
          { img: c('vtsGHBYPbBVoC3xA9btLGfD7N0'), caption: 'Search prefilled from GPS.' },
          { img: c('j4WWqHjDvTEX81uLv8VRAy0zWM'), caption: 'Routes filtered by cost, time and safety.' },
          { img: c('f0SFw9Lluw6KwPSV6OfrrV4ymFI'), caption: 'Step-by-step legs with fares and landmarks.' },
          { img: c('mdEPdjnKUt3BtOzUS5au9n5iM4'), caption: 'Manual boarding confirmation.' },
          { img: c('OMvFCoWrLeM542ncBp5uj9TS6g'), caption: 'Pay by cash, card or Cowry.' },
          { img: c('g4Rg49xtGc7t9RtErJTMRpPL7U8'), caption: 'Fare entry that feeds live pricing.' },
          { img: c('xN2ZWHu6iMTHyWcUgSXJy5rQ3mQ'), caption: 'SOS and trip sharing.' },
          { img: c('AlKUFMK3YAGEbxX9N94bdZVUkc'), caption: 'Exit prompt to stop accidental endings.' },
          { img: c('WDh0WVq4pixALzxTd0Fpm6d7BM'), caption: 'Arrival summary and points.' },
        ],
      },
    ],
    prototype: { src: 'https://parse-album-57633362.figma.site/', note: 'For a better experience, open on your mobile phone.' },
  },
};

/* ---------------------------------------------------------------------- Cwook */

const cwook: CaseStudy = {
  slug: 'cwook',
  title: 'Cwook Social',
  meta: [
    { label: 'Category', value: 'Mobile app' },
    { label: 'Sector', value: 'Social commerce' },
    { label: 'Role', value: 'Research, UI and usability testing' },
    { label: 'Year', value: '2025' },
  ],
  overview: {
    statement: 'A social platform where what you discover, you can buy.',
    body: [
      'Cwook is an e-commerce social media platform that blends social interaction with sales capabilities, helping businesses turn engagement into direct sales.',
      'The platform seamlessly integrates payment and delivery capabilities, allowing users to purchase items they discover on the app with ease.',
    ],
  },
  problem: {
    statement: 'Social apps build community but can’t sell. Shops can sell but can’t build community.',
    points: [
      { title: 'Social media', line: 'Vendors have to send buyers elsewhere to pay.' },
      { title: 'E-commerce', line: 'Transactions work, but loyalty and community don’t.' },
      { title: 'Shoppers', line: 'Want deals, trusted reviews and connection in one place.' },
    ],
  },
  solution: {
    statement: 'A social feed and a shop in one app, with payment and delivery built in.',
    points: [
      { title: 'Discover and engage', line: 'Like, comment and share, as on any social app.' },
      { title: 'Buy where you found it', line: 'Check out without leaving the post.' },
      { title: 'Payment and delivery handled', line: 'Vendors never redirect buyers or deliver themselves.' },
      { title: 'Brand communities', line: 'Vendors build loyal followings and sell directly.' },
    ],
  },
  role: {
    summary: 'I ran the research, designed the app, and tested it with users before revising it.',
    owned: ['Interviews', 'Market analysis', 'Personas', 'Journey mapping', 'UI design', 'Prototyping', 'Usability testing'],
    stops: [
      {
        stage: 'Discover',
        did: ['In-depth interviews with three shopper archetypes', 'Market analysis across social media and e-commerce'],
        artefact: {
          kind: 'people',
          people: [
            { name: 'Sarah', note: 'Bargain hunter', avatar: c('BRu6MhHhp9NjldqU9TTCEAEoGKg') },
            { name: 'David', note: 'Quality first', avatar: c('GoWNvgKZvVTzmZQKHoh2Ccnk4E') },
            { name: 'Aisha', note: 'Social shopper', avatar: c('mUVPNgOqhd1MFYjLtFtiBwvxfY') },
          ],
        },
      },
      {
        stage: 'Define',
        did: ['Built three personas and an affinity map', 'Found the community gap: shoppers want connection, not just checkout'],
        artefact: {
          kind: 'people',
          people: [
            { name: 'Maria, 50', note: 'DIY hobbyist', avatar: c('XfjXHJ2H7SzzlzPr1bGFm1T9BpI') },
            { name: 'Samantha, 22', note: 'Fashion browser', avatar: c('GaxkgrTkzKlxI7B3EJtZp4dabI') },
            { name: 'Samson, 31', note: 'Trend seeker', avatar: c('40ioqcNOrsoBIVnpfGVsXh9jpM') },
          ],
        },
      },
      {
        stage: 'Map',
        did: ['Mapped the journey from first scroll to repeat purchase'],
        artefact: { kind: 'chips', items: ['Discovery', 'Engagement', 'Shopping', 'Purchasing', 'Brand interaction', 'Repeat purchase'] },
      },
      {
        stage: 'Design',
        did: ['Designed the hi-fi screens and an interactive prototype'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('oeZ0PZx5BS6ZkPp7EcK178QxCMY'), alt: 'Explore feed' },
            { img: c('jHiGMDuaGm0nm1uMhsDcMi5CA4'), alt: 'Product post' },
            { img: c('rEAipDSir4hqtxCJmDgx2Y14dY'), alt: 'Cart' },
          ],
        },
      },
      {
        stage: 'Test',
        did: ['Ran usability tests: purchase, interact and share tasks', 'Measured time on task, errors, drop off, ease of use and satisfaction', 'Revised sign-up and navigation from the findings'],
        artefact: { kind: 'quote', text: 'I found the app to be intuitive and easy to use, I was able to complete the tasks quickly and efficiently. No stress.', by: 'Test participant' },
      },
    ],
  },
  impact: {
    title: 'Tested with users, then revised',
    stats: [
      { value: '2m 30s', label: 'Average time on task', note: 'Range of 1 to 4 minutes.' },
      { value: '5%', label: 'User error rate', note: 'Mostly minor and easily corrected.' },
      { value: '10%', label: 'User drop off', note: 'Some cited technical difficulties.' },
      { value: '8/10', label: 'Ease of use', note: 'Average rating from testers.' },
      { value: '9/10', label: 'Satisfaction', note: 'Testers would use it again.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'mobile',
    groups: [
      { title: 'Onboarding', shots: shots(['0BOcr69q9xAwQMwgWWdLMtkMYCo']) },
      {
        title: 'Creating an account',
        shots: shots(['qbn1YFKVMctVeUE6wUw6eZHTxI', 'JhgTtxvY3EpPfgkRKc7Gt6EU6dE', 'yubj1oKhCG52lwNo2dBhJbIiMw', 'h9AORyJuWy7gcNhVjw86p4vVYcQ', 'qr7DWuARiv00jXhzaB15fke1CU', 'KxsvAp3B78rFckqipjMWQZfG24', 'qh6X8Y5vKvAPWqcYPoSUCVEsfw', 'PU3TDflRsm5E2gWjXDXtU2Ab4', '6hzjKVppC6uBCmjhDvtENSC28Bs', 'aKMmedJRzhCYanI3Vfm1JNZnjLc']),
      },
      {
        title: 'Explore feed',
        shots: shots(['oeZ0PZx5BS6ZkPp7EcK178QxCMY', 'Nrj9eSBZfZLVhNc8dslaB7dXWk', 'McAuUC5nnLzdm2NA4qrJqTpENVk', 'UpQJrdC2NcXsul6nsDqqVV9rXY', 'GzXJSceVmZwPoWR4VbAtDYHrXM', 'bzVFNiy4JmIOuAz9aGEJ95uQs', 'eyqihmcvwtslCPeRr2w60VmM1LY', 'jHiGMDuaGm0nm1uMhsDcMi5CA4']),
      },
      {
        title: 'Cart and checkout',
        shots: shots(['ylEttAtVD5bAI0rwXLjNdO4UWiY', 'XTbNLd3VZ8wPILWAMER3Gyk6aes', 'M8lg7GdKnT5bqE7Tv1F63ACqyu0', 'Etw6GjlVNEdbXU1ejk6LFzU5kF8', 'Y7RCihobVg36j87SjZGWOK4An8', 'rEAipDSir4hqtxCJmDgx2Y14dY', '4UILKOrpFp60OEcB9oiDMlcyrAc', 'zJgSmiU7FneNJOBRhRxv8drSM8', '5I1oVh3KcPpDgIEiIVGhsSAbU7A', 'PWDiq95AgFZbqWiyZONrhp5xtrk', 'lcZ3k5fuLZL86bUrvN6empzwuU', 'wbCYh0cZaY1jNUmSXSuDfTuuKO4']),
      },
    ],
  },
};

/* ------------------------------------------------------------------------ JAA */

const jaa: CaseStudy = {
  slug: 'jaa',
  title: 'JAA Career Matching Platform',
  meta: [
    { label: 'Category', value: 'Web platform' },
    { label: 'Client', value: 'Junior Achievement Africa' },
    { label: 'Role', value: 'Product design, research to hand-off' },
    { label: 'Year', value: '2024' },
  ],
  overview: {
    statement: 'Connecting JA Africa alumni with each other, and with the recruiters who need them.',
    body: [
      'Junior Achievement Africa (JA Africa) empowers students in financial literacy, work readiness, entrepreneurship, and digital literacy through hands-on programs.',
      'We’re creating a social platform for them to connect alumni with each other and with potential recruiters, helping them launch careers.',
    ],
  },
  problem: {
    statement: 'Alumni leave with new skills, but nowhere to use them, find work or stay connected.',
    points: [
      { title: 'Unused skills', line: 'Practice happens on platforms outside the programme, if at all.' },
      { title: 'No route to jobs', line: 'Skilled talent across Africa can’t reach the job market.' },
      { title: 'Lost connections', line: 'Classmates drift apart once the programme ends.' },
    ],
  },
  solution: {
    statement: 'A career platform that keeps alumni learning, connected and visible to recruiters.',
    points: [
      { title: 'Job board', line: 'Employers post roles straight to alumni.' },
      { title: 'Alumni portal', line: 'Batchmates and other sets stay in touch.' },
      { title: 'Skills tests', line: 'Sharpen skills and show recruiters your level.' },
      { title: 'Gamification', line: 'Points, badges and leaderboards keep alumni coming back.' },
    ],
  },
  role: {
    summary: 'My first project at the company: I took it from research to hand-off, working with the product team.',
    owned: ['User interviews', 'Problem framing', 'Information architecture', 'Responsive UI', 'Hand-off'],
    stops: [
      {
        stage: 'Discover',
        did: ['Interviewed a new graduate, an engineer and an employer from the alumni network'],
        artefact: {
          kind: 'people',
          people: [
            { name: 'John', note: 'First job', avatar: c('CPGgYEBeFy4gDXe5dDzh1qjQG1w') },
            { name: 'Jane', note: 'Networking', avatar: c('XfjXHJ2H7SzzlzPr1bGFm1T9BpI') },
            { name: 'Michael', note: 'Hiring', avatar: c('GoWNvgKZvVTzmZQKHoh2Ccnk4E') },
          ],
        },
      },
      {
        stage: 'Define',
        did: ['Framed three problems and a four-part solution: jobs, community, skills and motivation'],
        artefact: { kind: 'chips', items: ['Job matching', 'Gamification', 'Learning resources'] },
      },
      {
        stage: 'Architect',
        did: ['Structured three account types across seven product areas'],
        artefact: { kind: 'chips', items: ['Alumni', 'Recruiter', 'Organisation admin'] },
      },
      {
        stage: 'Design',
        did: ['Designed every screen at large (web), mid (tablet) and small (mobile) sizes'],
        artefact: {
          kind: 'images',
          format: 'web',
          images: [
            { img: c('pSgBivUXnLdra5NEpeeSTuXOmQ'), alt: 'Alumni dashboard' },
            { img: c('xgCBwQpDOn9a0a5RjnnGMEnAkEg'), alt: 'Job board' },
          ],
        },
      },
      {
        stage: 'Hand-off',
        did: ['Took on major responsibilities in a small design team, and handed off to the product team'],
      },
    ],
  },
  impact: {
    title: 'A complete, responsive platform ready to build',
    caveat: 'The platform was still being built at hand-off, so there is no usage data yet. These figures describe the scope delivered.',
    stats: [
      { value: '3', label: 'Account types', note: 'Alumni, recruiter and organisation admin.' },
      { value: '7', label: 'Product areas', note: 'Dashboard, recruitment, skill tests, courses, surveys, forum and profile.' },
      { value: '3', label: 'Breakpoints per screen', note: 'Web, tablet and mobile.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'web',
    groups: [
      { title: 'Dashboard', shots: shots(['pSgBivUXnLdra5NEpeeSTuXOmQ']) },
      { title: 'Recruitment', shots: shots(['CFRP08phAuXWYRPX1T6UbGRj8fY', 'xgCBwQpDOn9a0a5RjnnGMEnAkEg', 'HjsJM73bTmXDmo4e9C18M3FBMpY']) },
      { title: 'Skill test', shots: shots(['vaw0ThHAIufNS968GjnUCbYwc', 'Tt8zp9EIqUxUnHyiw1lvZu8K7VY', 'ueog2pp176P7lF6Ot8nzlydyxJw', 'jujgnUE3W6rYi7ScenfpcwptUk0']) },
      { title: 'Courses', shots: shots(['95LfmO4vvyLmiPUpPBnnLh6212E', 'ogKoSR6Bm1VlQPcsJmqmjV286VI']) },
      { title: 'Alumni surveys', shots: shots(['8221xnFGgzHEZXuRFqTOdeEk', '9Bz0hxzjW310M2MkW9RDYXK7uvA', 'deGCUl7IajgcuaHZ0ToZP5IbWk', 'uRT85pL9PPgmhfDqD2tMEgWmM2I']) },
      { title: 'Alumni forum', shots: shots(['ve7xpfvizvFEhT5VacKqGXTuh1U', '3ugIkzGZHBQGp0sVCCeRwRgb130']) },
      { title: 'Profile', shots: shots(['phSYTHIEKVBQlDRPAVDTQuTbUL4', 'vbHKzkTvzwPx7KTtM1b6Ymu9row']) },
    ],
  },
};

/*
 * The six below were written from lean notes, the resume, the live product sites and the
 * screens themselves. Lines marked "Inferred" are my reading, not a stated fact: confirm or
 * correct them before publishing.
 */

/* ------------------------------------------------------------------------ AXE */

const axe: CaseStudy = {
  slug: 'axe',
  title: 'AXE',
  meta: [
    { label: 'Category', value: 'Learning platform' },
    { label: 'Company', value: 'AIENAI' },
    { label: 'Role', value: 'Lead UI design and front end' },
    { label: 'Year', value: '2024' },
  ],
  overview: {
    statement: 'A learning platform that blends machine learning with human mentorship.',
    body: [
      'AXE is a learning management system that adapts to individual and group learning needs, for people learning new skills and for businesses upskilling their teams.',
      // Resume: "the learning platform for 13 to 19-year-olds". Gallery copy: individuals and businesses. Confirm the audience.
      'I designed the learner experience and co-built the Next.js, React and TypeScript front end with an engineer.',
    ],
  },
  problem: {
    // Inferred: framed from the solution features; the original copy does not state the problem.
    statement: 'Courses move every learner at one pace, and mentors can’t see who is falling behind.',
    points: [
      { title: 'One pace for all', line: 'Content doesn’t adapt to what a learner already knows.' },
      { title: 'Progress hidden', line: 'Mentors and team leads lack a live view of who needs help.' },
      { title: 'Motivation fades', line: 'Little to keep learners coming back between sessions.' },
    ],
  },
  solution: {
    statement: 'Personalised learning paths, with mentors and team leads watching progress live.',
    points: [
      { title: 'Adaptive paths', line: 'Content and pace adjust to each learner.' },
      { title: 'Rewards', line: 'Engagement systems that reward progress.' },
      { title: 'Classrooms and tasks', line: 'Virtual classes, collaboration and task management in one place.' },
      { title: 'Assessment and reports', line: 'Built-in assessments, with team performance at a glance.' },
    ],
  },
  role: {
    summary: 'I led UI design and prototyping, supported research and testing, and co-built the front end.',
    owned: ['UI design', 'Prototyping', 'User research', 'Usability testing', 'Front end build'],
    stops: [
      {
        stage: 'Discover',
        did: ['Supported user research and usability testing with learners and teams'],
        // Inferred: the three audiences, from the gallery copy and the team screens.
        artefact: { kind: 'chips', items: ['Individual learners', 'Teams upskilling', 'Mentors'] },
      },
      {
        stage: 'Translate',
        did: ['Worked with in-house AI specialists to turn teaching methods into machine-learning models for personalised instruction, the hardest part of the project'],
        artefact: { kind: 'images', format: 'web', images: [{ img: c('aCYAGGJmFgzrvqeGh6wNefMIYbs'), alt: 'AXE content builder assembling a course' }] },
      },
      {
        stage: 'Design',
        did: ['Designed the dashboard, classes, tasks and team reporting'],
        artefact: {
          kind: 'images',
          format: 'web',
          images: [
            { img: c('jbOwhEKcOIF0QHJAKGrxM13owQ'), alt: 'Learner dashboard with classes, tasks and mentions' },
            { img: c('BWxDwlWgPHPnKeVzDMLWjhkDM'), alt: 'Team report with submitted tasks and completion rate' },
          ],
        },
      },
      {
        stage: 'Build',
        did: ['Co-built the front end with an engineer in a 56-route, multi-tenant product with CI checks'],
        artefact: { kind: 'chips', items: ['Learner app', 'Assignment submissions', 'Community forum', 'Verifiable PDF certificates'] },
      },
      {
        stage: 'Test',
        did: ['Prototype tested in multiple UK locations, with positive feedback'],
        artefact: { kind: 'chips', items: ['UK prototype testing', 'On track for funding'] },
      },
    ],
  },
  impact: {
    title: 'A tested prototype, and a production front end',
    caveat: 'No usage data yet. UK prototype testing drew positive feedback and put the product on track for funding.',
    stats: [
      { value: '56', label: 'Routes in the product', note: 'Multi-tenant, with CI checks.' },
      { value: '4', label: 'Areas I owned in the build', note: 'Learner app, submissions, forum and certificates.' },
      { value: '6', label: 'Core features designed', note: 'Adaptive paths, rewards, adaptive content, collaboration, classrooms and assessment.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'web',
    groups: [
      {
        shots: [
          { img: c('jbOwhEKcOIF0QHJAKGrxM13owQ'), caption: 'Dashboard: upcoming classes, tasks for review, chats and mentions.' },
          { img: c('BWxDwlWgPHPnKeVzDMLWjhkDM'), caption: 'Team report: submitted tasks, completion rate and top scorers.' },
          { img: c('paTxf6QzXqSnuMsynzT83e2y0I'), caption: 'Participation: contribution time and coaching sessions.' },
          { img: c('LOZEEKJ4sg0hsnGfiX8KWKSGQjI'), caption: 'Performance tracking over time.' },
          { img: c('s4BD6G5TnDpdt0KnCAnogyuCGc'), caption: 'Lesson reader.' },
          { img: c('aCYAGGJmFgzrvqeGh6wNefMIYbs'), caption: 'Content builder putting a course together.' },
        ],
      },
    ],
  },
};

/* ---------------------------------------------------------------------- Azuri */

const azuri: CaseStudy = {
  slug: 'azuri',
  title: 'Azuri Facility Management',
  meta: [
    { label: 'Category', value: 'Web platform' },
    { label: 'Client', value: 'EKO Development Group' },
    { label: 'Role', value: 'Lead product designer, at Heckerbella' },
    { label: 'Year', value: '2023' },
  ],
  overview: {
    statement: 'One system to run a three-tower, mixed-use complex.',
    body: [
      'Azuri’s web-based facility management system unifies finance, maintenance, security, inventory and space management for a three-tower mixed-use complex owned by EKO Development Group.',
      // Public context (developer and trade press), worth confirming: the Azuri towers sit in the Marina District of Eko Atlantic, Lagos.
      'The complex sits in the Marina District of Eko Atlantic, Lagos, with residential towers and an office tower.',
    ],
  },
  problem: {
    // Inferred: framed from what the system unifies; the original copy does not state the problem.
    statement: 'Running three towers meant juggling finance, repairs, security and occupancy in separate places.',
    points: [
      { title: 'Scattered operations', line: 'Five operational areas, with no single source of truth.' },
      { title: 'Slow repair loops', line: 'Maintenance requests and vendors handled by hand.' },
      { title: 'No estate-wide view', line: 'Occupancy and billing hard to see across towers.' },
    ],
  },
  solution: {
    statement: 'A single web system for the whole estate, from residents and offices to bills and repairs.',
    points: [
      { title: 'Live dashboards', line: 'Occupancy, maintenance and incidents in real time.' },
      { title: '3D property view', line: 'Explore towers, floors and units visually.' },
      { title: 'Automated workflows', line: 'Maintenance and vendor work routed automatically.' },
      { title: 'Finance and billing', line: 'Finance and electricity billing built in.' },
    ],
  },
  role: {
    summary: 'I led the design at Heckerbella, from information architecture to a scalable design system.',
    owned: ['Information architecture', 'Role-based flows', 'Hi-fi prototypes', 'Design system'],
    stops: [
      {
        stage: 'Structure',
        did: ['Organised the estate into one information architecture across five operational areas'],
        artefact: { kind: 'chips', items: ['Finance', 'Maintenance', 'Security', 'Inventory', 'Space'] },
      },
      {
        stage: 'Roles',
        did: ['Designed role-based user flows, so each team sees its own work'],
        artefact: { kind: 'images', format: 'web', images: [{ img: c('TjQLUXIVu5IVC0V35Y826TqiYE'), alt: 'Manage members, with roles and access' }] },
      },
      {
        stage: 'Design',
        did: ['Designed the dashboards and the building overview across all three towers'],
        artefact: {
          kind: 'images',
          format: 'web',
          images: [
            { img: c('dH1IuDss3uGKOsvHeTDL4bHtF8k'), alt: 'Azuri One dashboard with maintenance requests and incidents' },
            { img: c('4lGtRekp8itXvuh4aHHhls3RIek'), alt: 'Building overview of Azuri One, Azuri Two and Azuri Offices' },
          ],
        },
      },
      {
        stage: 'Systemise',
        did: ['Built a scalable design system and high-fidelity prototypes for every module'],
        artefact: {
          kind: 'images',
          format: 'web',
          images: [
            { img: c('f6ZrkFkC7q60T94DfQqnzTdkbXU'), alt: 'Residents list with a resident detail panel' },
            { img: c('YYDujWkfuASEySMAPu1wtwhVo'), alt: 'Office occupants with company details' },
          ],
        },
      },
      {
        stage: 'Launch',
        did: ['Shipped to EKO Development Group, where it is live and in daily use'],
      },
    ],
  },
  impact: {
    title: 'Live, and running the estate',
    caveat: 'Early feedback reports markedly smoother workflows and higher operational efficiency; there are no measured figures yet.',
    stats: [
      { value: '3', label: 'Towers on one system', note: 'Azuri One, Azuri Two and Azuri Offices.' },
      { value: '5', label: 'Operational areas unified', note: 'Finance, maintenance, security, inventory and space.' },
      { value: 'Live', label: 'In use by EKO Development Group', note: 'Shipped and running day to day.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'web',
    groups: [
      {
        shots: [
          { img: c('dH1IuDss3uGKOsvHeTDL4bHtF8k'), caption: 'Tower dashboard: occupancy, maintenance requests and incidents.' },
          { img: c('TjQLUXIVu5IVC0V35Y826TqiYE'), caption: 'Manage members and their access.' },
          { img: c('f6ZrkFkC7q60T94DfQqnzTdkbXU'), caption: 'Residents, with tenancy and building details.' },
          { img: c('4lGtRekp8itXvuh4aHHhls3RIek'), caption: 'Building overview across the three towers.' },
          { img: c('5bpYA4RPJb8RqYkwCR45rdgM'), caption: 'Residents across the estate.' },
          { img: c('YYDujWkfuASEySMAPu1wtwhVo'), caption: 'Office occupants and company details.' },
        ],
      },
    ],
  },
};

/* ---------------------------------------------------------------- Circuitmind */

const circuitmind: CaseStudy = {
  slug: 'circuitmind',
  title: 'Circuitmind',
  meta: [
    { label: 'Category', value: 'Web platform' },
    { label: 'Client', value: 'Circuit Mind, London' },
    { label: 'Role', value: 'Onboarding and workspace design' },
    { label: 'Year', value: '2024' },
  ],
  website: { label: 'circuitmind.io', href: 'https://www.circuitmind.io/product' },
  overview: {
    statement: 'AI that designs circuits, made legible to the engineers who use it.',
    body: [
      'Circuitmind builds AI tooling for electronic circuit design. Its platform turns hardware requirements into candidate schematics, a bill of materials and files ready for ECAD tools.',
      'The platform automated schematic generation, but most new users left before finishing a first design. I redesigned the onboarding flow and the main workspace.',
    ],
  },
  problem: {
    statement: 'Engineers couldn’t see where the AI co-pilot fit their workflow, so most quit before their first design.',
    points: [
      { title: '71% drop-off', line: 'Most new users left inside week one.' },
      { title: 'Static documentation', line: 'Help lived in docs, not in the product.' },
      { title: 'Unclear model', line: 'No obvious line between what you input and what the AI suggests.' },
    ],
  },
  solution: {
    statement: 'A guided first project, and a workspace split into input, AI suggestions and validation.',
    points: [
      { title: 'Guided first project', line: 'Engineers start with their own component library.' },
      { title: 'Tips in context', line: 'Contextual guidance replaces static documentation.' },
      { title: 'Three-pane workspace', line: 'Input, AI suggestions and validation output, side by side.' },
      { title: 'Analysis in view', line: 'Power tree, BoM and efficiency curves beside the design.' },
    ],
  },
  role: {
    summary: 'I redesigned onboarding and the core workspace, grounded in interviews and session recordings.',
    owned: ['User interviews', 'Session analysis', 'Onboarding', 'Workspace UX', 'Data visualisation', 'UI design'],
    stops: [
      {
        stage: 'Discover',
        did: ['Ran 12 user interviews and studied session recordings to find where engineers gave up'],
        artefact: { kind: 'chips', items: ['12 interviews', 'Session recordings', '71% week-one drop-off'] },
      },
      {
        stage: 'Define',
        did: ['Found the core issue: engineers didn’t understand how the AI fitted their existing workflow'],
        artefact: { kind: 'chips', items: ['Requirements in', 'AI suggestions', 'Validated schematic out'] },
      },
      {
        stage: 'Onboard',
        did: ['Designed a guided first project using the engineer’s own component library, with contextual tips'],
      },
      {
        stage: 'Workspace',
        did: ['Designed the workspace shell with three clear panes, and the analysis views inside it'],
        artefact: {
          kind: 'images',
          format: 'web',
          images: [
            { img: c('EppeMWBHHRSaR1neLbFIg4CdppY'), alt: 'Power tree of circuit blocks above the bill of materials' },
            { img: c('4iQLGuyVperGb93vQKmOax8PD7A'), alt: 'Efficiency curves for a regulator' },
          ],
        },
      },
      {
        stage: 'Measure',
        did: ['After release, activation, time to first design and conversion were measured'],
        artefact: { kind: 'chips', items: ['Activation', 'Time to first design', 'Trial to paid'] },
      },
    ],
  },
  impact: {
    title: 'More engineers reached a first design, faster',
    stats: [
      { value: '62%', label: 'Week-one activation', note: 'Up from 29%. Activation means completing a first schematic.' },
      { value: '18 min', label: 'Time to first design', note: 'Down from 47 minutes.' },
      { value: '2x', label: 'Trial-to-paid conversion', note: 'Reported by the sales team in the first quarter.' },
    ],
  },
  screens: {
    title: 'The workspace',
    format: 'web',
    groups: [
      {
        shots: [
          { img: c('EppeMWBHHRSaR1neLbFIg4CdppY'), caption: 'Power tree with the bill of materials beneath.' },
          { img: c('8DIFSsfVi4pR5CfcRlmFB6MEnjI'), caption: 'Component detail: schematic and electrical specs.' },
          { img: c('4iQLGuyVperGb93vQKmOax8PD7A'), caption: 'Efficiency curves across load.' },
          { img: c('4EgoUuzWzyUQ4rrzMjg0eX6Jvns'), caption: 'Component summary.' },
        ],
      },
    ],
  },
};

/* ---------------------------------------------------------------- Fantasy One */

const fantasy: CaseStudy = {
  slug: 'fantasy',
  title: 'Fantasy One',
  meta: [
    { label: 'Category', value: 'Mobile app' },
    { label: 'Sector', value: 'Fantasy sports' },
    { label: 'Role', value: 'Lead designer' },
    { label: 'Year', value: '2024' },
  ],
  website: { label: 'fantasy1.app', href: 'https://fantasy1.app/' },
  overview: {
    statement: 'Fantasy Formula 1 for friends, settled head-to-head every race weekend.',
    body: [
      'Fantasy One is a social app where friends draft their dream Formula 1 teams and compete across the season.',
      'Each race week, players draft drivers and face one opponent in their league. It is live on iOS, Android and the web.',
    ],
  },
  problem: {
    // Inferred: the original copy does not state the problem.
    statement: 'Fantasy F1 tends to be a slow, solo, season-long grind. Fans wanted a rivalry every weekend.',
    points: [
      { title: 'Season-long wait', line: 'Results only feel meaningful at the end of the year.' },
      { title: 'Little rivalry', line: 'You compete with a leaderboard, not your friends.' },
      { title: 'Data elsewhere', line: 'Schedules, results and driver form live in other apps.' },
    ],
  },
  solution: {
    statement: 'Private leagues, weekly head-to-heads, and the race data to pick a lineup on the fly.',
    points: [
      { title: 'Leagues with friends', line: 'Create a league or join one with an invite code.' },
      { title: 'Weekly head-to-head', line: 'Draft drivers and face one opponent per race.' },
      { title: 'Live schedule and results', line: 'Race weekends with real-time scoring.' },
      { title: 'Driver profiles', line: 'Detail on every driver for data-driven picks.' },
    ],
  },
  role: {
    summary: 'I led the design: wireframes, a unified design system, interactive prototypes and user testing.',
    owned: ['Wireframes', 'Design system', 'UI design', 'Prototyping', 'User testing'],
    stops: [
      {
        stage: 'Wireframe',
        did: ['Mapped the core loop of a race week'],
        artefact: { kind: 'chips', items: ['Join a league', 'Draft drivers', 'Race weekend', 'Head-to-head result'] },
      },
      {
        stage: 'System',
        did: ['Built one design system for a fast, game-day feel'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('DT4u7wFh9mPxVwlZXUu7QFLycw'), alt: 'Fantasy One splash screen' },
            { img: c('AmhWpsVTzHi5jnks27KPzG47zE'), alt: 'Create your team and pick a crest' },
            { img: c('hEVGKhZxV74N36fcpcHIlc7gMyA'), alt: 'Sign in screen' },
          ],
        },
      },
      {
        stage: 'Design',
        did: ['Designed the draft, standings and race-day scoring'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('OCOsBemGDKTH03q3IZUxp8ZDLgs'), alt: 'Assign drivers, three of three selected' },
            { img: c('EilMTuZE43hWSxLtxPWPwhz4tIs'), alt: 'League standings and driver selections left' },
            { img: c('rcUG5Jf3Ip7AKM1jBNGJhairRPI'), alt: 'Head-to-head score with each driver’s points' },
          ],
        },
      },
      {
        stage: 'Test',
        did: ['Ran user testing to keep the game-day experience fast'],
        artefact: { kind: 'chips', items: ['Intuitive flow', 'Competitive fun'] },
      },
    ],
  },
  impact: {
    title: 'Live, and racing every weekend',
    caveat: 'The app is live; I don’t have player numbers to share.',
    stats: [
      { value: '3', label: 'Platforms live', note: 'iOS, Android and the web.' },
      { value: '4', label: 'Disciplines I led', note: 'Wireframes, design system, prototypes and user testing.' },
    ],
  },
  screens: {
    title: 'Race week, screen by screen',
    format: 'mobile',
    groups: [
      {
        shots: [
          { img: c('DT4u7wFh9mPxVwlZXUu7QFLycw'), caption: 'Splash.' },
          { img: c('mTSRTcys7gexgCDxw5NielQAog'), caption: 'Welcome and a quick guide.' },
          { img: c('1aeVQhOurrSv5IGF2JOFN1H5v7U'), caption: 'Join or create a league.' },
          { img: c('AmhWpsVTzHi5jnks27KPzG47zE'), caption: 'Name your team and pick a crest.' },
          { img: c('hEVGKhZxV74N36fcpcHIlc7gMyA'), caption: 'Sign in.' },
          { img: c('gWSZ5mAHTRoSFRLayvJYqfeOPFU'), caption: 'League members, ready to draft.' },
          { img: c('EilMTuZE43hWSxLtxPWPwhz4tIs'), caption: 'Standings and selections left.' },
          { img: c('OCOsBemGDKTH03q3IZUxp8ZDLgs'), caption: 'Assign drivers.' },
          { img: c('hLXbHKEjhCsR2TRVirUEwduBVI'), caption: 'Race weekend result.' },
          { img: c('rcUG5Jf3Ip7AKM1jBNGJhairRPI'), caption: 'Head-to-head scorecard.' },
        ],
      },
    ],
  },
};

/* ----------------------------------------------------- Rhapsody of Realities */

const rhapsody: CaseStudy = {
  slug: 'rhapsody',
  title: 'Rhapsody of Realities',
  meta: [
    { label: 'Category', value: 'Mobile app' },
    { label: 'Sector', value: 'Faith and devotional' },
    { label: 'Role', value: 'Lead designer, reading and IA' },
    { label: 'Year', value: '2025' },
  ],
  website: { label: 'myapp.rhapsodyofrealities.org', href: 'https://myapp.rhapsodyofrealities.org/' },
  overview: {
    statement: 'Today’s devotional, one tap away.',
    body: [
      // Reach figures are from my own notes; the product site does not state them. Confirm before publishing.
      'Rhapsody of Realities reaches over 7 million daily readers across 242 countries.',
      'The app brings daily devotionals, study plans, audio, communities and rewards together, with experiences for adults, teens and children. I led the redesign of the reading experience and information architecture.',
    ],
  },
  problem: {
    statement: 'Finding today’s devotion took too many taps, language hid in settings, and audio stopped when the screen locked.',
    points: [
      { title: '41% week-one churn', line: 'The legacy app lost readers fast.' },
      { title: 'Deep navigation', line: 'Today’s article sat several taps away.' },
      { title: 'Broken audio', line: 'Playback cut out with the screen locked.' },
    ],
  },
  solution: {
    statement: 'A home built around today’s devotion, with audio and language one tap away.',
    points: [
      { title: 'Today first', line: 'Article, audio and language picker within one tap.' },
      { title: 'Shallower settings', line: 'Rebuilt from four levels deep to two.' },
      { title: 'Background audio', line: 'Fixed with engineering, so listening continues.' },
      { title: 'Room to grow', line: 'Study plans, rewards, kids and live programmes.' },
    ],
  },
  role: {
    summary: 'I led the redesign of the reading experience and information architecture.',
    owned: ['Reader interviews', 'Information architecture', 'Reading UX', 'Audio UX', 'UI design', 'Engineering collaboration'],
    stops: [
      {
        stage: 'Discover',
        did: ['Interviewed 30 readers across three countries and found three pain points'],
        artefact: { kind: 'chips', items: ['Nigeria', 'Ghana', 'United Kingdom'] },
      },
      {
        stage: 'Restructure',
        did: ['Put today’s devotion at the centre of home', 'Cut the settings hierarchy from four levels to two'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('G5imiWo65UKuMh0HhHOjrXrhwg'), alt: 'Home with today’s devotion and rewards' },
            { img: c('Rmxy2xyIALBl7smTCqCCrb8frQU'), alt: 'Welcome screen' },
            { img: c('fa7OzRsck0NFwAOOjdtVX885A3c'), alt: 'Theme settings' },
          ],
        },
      },
      {
        stage: 'Listen',
        did: ['Designed the audio devotion and worked with engineering to keep it playing in the background'],
        artefact: { kind: 'images', format: 'mobile', images: [{ img: c('LioOMlw2l83M4lu17jd1BQO7Xw8'), alt: 'Audio player for today’s devotion' }] },
      },
      {
        stage: 'Extend',
        did: ['Designed study plans, subscription plans and a children’s experience'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('EGIl8tB0uBUFicPD6BxQMeiBHno'), alt: 'Study plans by category' },
            { img: c('484HlXqOJB3przOHYZ2Ql851ns'), alt: 'Rhapsody for Kids' },
            { img: c('72bRWsijoUpNQ78JbQ3LP1LsQG8'), alt: 'Choose a plan' },
          ],
        },
      },
      {
        stage: 'Measure',
        did: ['Post-launch metrics were measured against a six-week baseline'],
        artefact: { kind: 'chips', items: ['Six-week baseline', 'Retention', 'Audio plays', 'Store rating'] },
      },
    ],
  },
  impact: {
    title: 'Longer sessions, more listening, fewer tickets',
    stats: [
      { value: '5.8 min', label: 'Average session', note: 'Up from 3.2 minutes.' },
      { value: '+27%', label: 'Week-one retention', note: 'Against a six-week baseline.' },
      { value: '3.4x', label: 'Audio plays', note: 'With background playback fixed.' },
      { value: '−64%', label: 'Language support tickets', note: 'Language picker moved to home.' },
      { value: '4.5', label: 'Google Play rating', note: 'Up from 3.6 within 90 days.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'mobile',
    groups: [
      {
        shots: [
          { img: c('yql0eRXnFITLGF93BwqvxhaVXAs'), caption: 'Splash.' },
          { img: c('Rmxy2xyIALBl7smTCqCCrb8frQU'), caption: 'Welcome.' },
          { img: c('G5imiWo65UKuMh0HhHOjrXrhwg'), caption: 'Home: today’s devotion, read or listen.' },
          { img: c('EGIl8tB0uBUFicPD6BxQMeiBHno'), caption: 'Study plans by category.' },
          { img: c('72bRWsijoUpNQ78JbQ3LP1LsQG8'), caption: 'Basic, premium and family plans.' },
          { img: c('LioOMlw2l83M4lu17jd1BQO7Xw8'), caption: 'Audio devotion.' },
          { img: c('fg8Lf91yLtm9B1k7OMgakhSxRjA'), caption: 'Live programme with comments.' },
          { img: c('484HlXqOJB3przOHYZ2Ql851ns'), caption: 'Rhapsody for Kids.' },
          { img: c('fa7OzRsck0NFwAOOjdtVX885A3c'), caption: 'Theme and colour settings.' },
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------- Tendarly */

const tendarly: CaseStudy = {
  slug: 'tendarly',
  title: 'Tendarly',
  meta: [
    { label: 'Category', value: 'Mobile app' },
    { label: 'Sector', value: 'Telemedicine' },
    // Inferred: the App Store lists Heckerbella as the developer of Tendarly Doctor, matching my time there.
    { label: 'Role', value: 'Lead designer, at Heckerbella' },
    { label: 'Year', value: '2023' },
  ],
  overview: {
    statement: 'An assistant takes your history. A real doctor takes the call.',
    body: [
      'Tendarly is a telemedicine app that pairs an AI-powered chatbot with real-time doctor consultations.',
      'The assistant collects symptoms and medical history, then connects the patient to an available physician without delay.',
    ],
  },
  problem: {
    // Inferred: the original copy does not state the problem.
    statement: 'Seeing a doctor meant waiting, repeating your story, and losing the record afterwards.',
    points: [
      { title: 'Slow access', line: 'Patients wait to reach any doctor at all.' },
      { title: 'Repeated history', line: 'Symptoms explained again at every visit.' },
      { title: 'Lost records', line: 'Notes and follow-ups don’t stay with the patient.' },
    ],
  },
  solution: {
    statement: 'Intake by an assistant, then straight to an available doctor, with every note kept.',
    points: [
      { title: 'AI symptom intake', line: 'The assistant gathers symptoms before the call.' },
      { title: 'Instant matching', line: 'Connect with any available doctor, or search for one.' },
      { title: 'Notes and follow-ups', line: 'Consultation notes and chat history stay in the app.' },
      { title: 'Doctor dashboards', line: 'Performance insight for the doctors themselves.' },
    ],
  },
  role: {
    summary: 'I led the design: wireframes, a cohesive design system and interactive prototypes for internal review.',
    owned: ['Wireframes', 'Conversational UX', 'Design system', 'UI design', 'Prototyping'],
    stops: [
      {
        stage: 'Intake',
        did: ['Designed the assistant’s greeting and pre-session chat'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('yyUuhJ2yJokcchgViER5aNmOqU'), alt: 'Assistant greeting' },
            { img: c('DaYzve7eKT6Bto845mtxV3QER8'), alt: 'Pre-session chat collecting symptoms' },
          ],
        },
      },
      {
        stage: 'Connect',
        did: ['Designed payment, matching and the hand-over from assistant to doctor'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('zC9L9pOD28UerxtJgwjb5WM3Yk'), alt: 'Start a session or search for a doctor' },
            { img: c('lp316SCuTVyD0EHeMBjibjcAUE'), alt: 'Secure payment before the session' },
            { img: c('ohfo1MXEdgMicY1iU8tqrcPDxY'), alt: 'Connecting to a doctor' },
          ],
        },
      },
      {
        stage: 'Consult',
        did: ['Designed doctor profiles with ratings, and a free first-session offer'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('Gc4CDBfDDSOT2pbh8E1bmvi5sg'), alt: 'Doctor profile with rating and reviews' },
            { img: c('Gnp6OwHdnqoVJjyNjY7KTBqO1cE'), alt: 'Free session coupon' },
          ],
        },
      },
      {
        stage: 'Record',
        did: ['Structured the doctor’s final note: observation, diagnosis and recommendation'],
        artefact: { kind: 'images', format: 'mobile', images: [{ img: c('vg2t5f405utpIi8J6oHofBJX6rk'), alt: 'Final consultation note' }] },
      },
      {
        stage: 'System',
        did: ['Built a cohesive design system and interactive prototypes for internal review'],
        artefact: { kind: 'chips', items: ['Wireframes', 'Design system', 'Interactive prototypes'] },
      },
    ],
  },
  impact: {
    title: 'From symptom to doctor in one flow',
    caveat: 'Designed and prototyped for internal review, so there are no outcome figures yet.',
    stats: [
      { value: '6', label: 'Core features designed', note: 'Symptom intake, hand-over, chat history, notes, follow-ups and doctor dashboards.' },
      { value: '3', label: 'Deliverables', note: 'Wireframes, a design system and interactive prototypes.' },
    ],
  },
  screens: {
    title: 'The consult, screen by screen',
    format: 'mobile',
    groups: [
      {
        shots: [
          { img: c('CBC5dl58Z9KnCA38TARH1UhppDw'), caption: 'Splash.' },
          { img: c('yyUuhJ2yJokcchgViER5aNmOqU'), caption: 'The assistant introduces itself.' },
          { img: c('zC9L9pOD28UerxtJgwjb5WM3Yk'), caption: 'Start a session or search for a doctor.' },
          { img: c('jW9Id3dkbO3SQe1Xl3vUjVMxhc'), caption: 'Active sessions.' },
          { img: c('lp316SCuTVyD0EHeMBjibjcAUE'), caption: 'Secure payment before the session.' },
          { img: c('ohfo1MXEdgMicY1iU8tqrcPDxY'), caption: 'Connecting to an available doctor.' },
          { img: c('Gc4CDBfDDSOT2pbh8E1bmvi5sg'), caption: 'Doctor profile and reviews.' },
          { img: c('Gnp6OwHdnqoVJjyNjY7KTBqO1cE'), caption: 'Free first session.' },
          { img: c('vg2t5f405utpIi8J6oHofBJX6rk'), caption: 'The doctor’s final note.' },
          { img: c('DaYzve7eKT6Bto845mtxV3QER8'), caption: 'Pre-session chat with the assistant.' },
        ],
      },
    ],
  },
};

/* ----------------------------------------------------------------- LemonSplit */

const lemonsplit: CaseStudy = {
  slug: 'lemonsplit',
  title: 'LemonSplit',
  meta: [
    { label: 'Category', value: 'Mobile app' },
    { label: 'Sector', value: 'Personal finance' },
    // Inferred: the original copy says "I designed LemonSplit"; scope beyond design is not stated.
    { label: 'Role', value: 'Product designer' },
    { label: 'Year', value: '2025' },
  ],
  overview: {
    statement: 'Group money, without the awkward follow-up.',
    body: [
      'LemonSplit is a mobile app for splitting and tracking shared expenses: hangouts, shared rent and family contributions.',
      'It splits the bill, lets each person confirm payment with a tap, and sends polite reminders, so nobody has to chase anyone.',
    ],
  },
  problem: {
    statement: 'After every hangout or shared bill, nobody remembers who paid what, and chasing it strains friendships.',
    points: [
      { title: 'Memory and screenshots', line: '78% of young Lagos professionals tracked group spending that way.' },
      { title: 'Awkward debts', line: '6 in 10 had lost a friendship or felt awkward over unpaid balances.' },
      { title: 'Mixed payments', line: 'Bank transfers, OPay and cash make reconciling harder.' },
    ],
  },
  solution: {
    statement: 'Create an expense, split it, confirm with a tap. Reminders handle the rest.',
    points: [
      { title: 'Three-step expense', line: 'Invite your crew, add the amount, choose the split.' },
      { title: 'Clear balances', line: 'Plain-language summaries of what you owe and are owed.' },
      { title: 'One-tap confirmation', line: 'Each person marks their share as paid.' },
      { title: 'Polite reminders', line: 'Pre-written nudges for pending balances.' },
    ],
  },
  role: {
    summary: 'I designed LemonSplit to take the social friction out of group money.',
    owned: ['User research', 'UX flows', 'UX writing', 'UI design', 'Beta testing'],
    stops: [
      {
        stage: 'Discover',
        // Inferred: that I ran this research myself; the copy reports it without saying who ran it.
        did: ['Researched how 24 young professionals in Lagos track group spending'],
        artefact: { kind: 'chips', items: ['24 people', '78% rely on memory', '6 in 10 felt awkward'] },
      },
      {
        stage: 'Define',
        did: ['Reduced the job to four moves, matching how groups already settle money'],
        artefact: { kind: 'chips', items: ['Create', 'Split', 'Confirm', 'Remind'] },
      },
      {
        stage: 'Design',
        did: ['Designed a three-step expense flow with a warm visual tone to lower the barrier to honest record-keeping'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('K1e1JBoFU9FOAgFFqE5NOht0BM'), alt: 'Step 1: invite your crew' },
            { img: c('66DJWZMqG3aUOp6sQKrINj90o'), alt: 'Step 2: add the amount and due date' },
            { img: c('2qyXhrFJLlniyqW5CDUNoF40s'), alt: 'Step 3: choose how to split' },
          ],
        },
      },
      {
        stage: 'Settle',
        did: ['Designed paying a share by card, bank transfer, USSD or QR, with status for every participant'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('DFO1RaQrqw5FMkRGJisZfGXwYg'), alt: 'Participants with paid and pending status' },
            { img: c('0otNHgihZfbgmlwQe3QiHQZswI'), alt: 'Choose a payment option' },
            { img: c('DqxudKj6BIlOPnl9m4YyHQtZsn4'), alt: 'Payment successful' },
          ],
        },
      },
      {
        stage: 'Beta',
        did: ['Tested in a closed beta with 40 users across 12 groups'],
        artefact: { kind: 'chips', items: ['40 users', '12 groups', 'Closed beta'] },
      },
    ],
  },
  impact: {
    title: 'Settled in hours, not days',
    caveat: 'Figures from a closed beta of 40 users across 12 groups.',
    stats: [
      { value: '<6 hrs', label: 'Payment reconciliation', note: 'Down from an average of 4 days.' },
      { value: '92%', label: 'Would switch to LemonSplit', note: 'From their notes app or WhatsApp.' },
      { value: '12', label: 'Groups in the beta', note: '40 users in total.' },
    ],
  },
  screens: {
    title: 'From a split bill to settled',
    format: 'mobile',
    groups: [
      {
        shots: [
          { img: c('vJ1jrzlTmceJtMfciI0GFbcGW0'), caption: 'Splash.' },
          { img: c('5WHhHp8D7lFifS9KmJkIqFpPV90'), caption: 'Split bills, settle easily.' },
          { img: c('QAEBqmsCRWNHvlcqdOInRB8Q1k'), caption: 'Complete your profile.' },
          { img: c('vqVlk4wvYG5Uz5QaEzk5qIVNxSc'), caption: 'Empty state: no pending expenses.' },
          { img: c('cIsQe5V5ENia1kbXr14mE4xpls'), caption: 'Create an expense.' },
          { img: c('K1e1JBoFU9FOAgFFqE5NOht0BM'), caption: 'Invite your crew.' },
          { img: c('66DJWZMqG3aUOp6sQKrINj90o'), caption: 'Add the amount and due date.' },
          { img: c('2qyXhrFJLlniyqW5CDUNoF40s'), caption: 'Choose a split.' },
          { img: c('fLwRQygfJl0XAwD8TLwx9MsHeA'), caption: 'Expense created; invites sent.' },
          { img: c('fMcpqo7bCL1cSPkR92iVpCdlg4c'), caption: 'Home: what you owe and are owed.' },
          { img: c('3rllamfcPUROKAAXIOOgzWboumM'), caption: 'All expenses by date.' },
          { img: c('DFO1RaQrqw5FMkRGJisZfGXwYg'), caption: 'Who has paid, and who hasn’t.' },
          { img: c('0otNHgihZfbgmlwQe3QiHQZswI'), caption: 'Pay by card, transfer, USSD or QR.' },
          { img: c('DqxudKj6BIlOPnl9m4YyHQtZsn4'), caption: 'Payment successful.' },
        ],
      },
    ],
  },
};

/* --------------------------------------------------------------------- Freyda */

const freyda: CaseStudy = {
  slug: 'freyda',
  title: 'Freyda',
  meta: [
    { label: 'Category', value: 'Web platform' },
    // Public context (directory listings), worth confirming: Freyda is a London fintech.
    { label: 'Client', value: 'Freyda, London' },
    { label: 'Role', value: 'Product designer, review experience' },
    { label: 'Year', value: '2024' },
  ],
  overview: {
    statement: 'AI extraction that analysts can actually trust.',
    body: [
      'Freyda is an AI document extraction tool that investment analysts use to pull structured data from fund reports.',
      'Its customers include institutional investors such as pension funds, endowments and insurers. I redesigned the review interface around verification.',
    ],
  },
  problem: {
    statement: 'Analysts couldn’t check what the AI extracted, so they did the work twice, then asked for refunds.',
    points: [
      { title: '22% refunds', line: 'Requested inside the first 30 days.' },
      { title: 'No way to verify', line: 'Extracted values sat apart from the source PDF.' },
      { title: 'Double work', line: 'Analysts re-checked everything by hand.' },
    ],
  },
  solution: {
    statement: 'Every extracted value sits beside its source, so checking is a glance, not a hunt.',
    points: [
      { title: 'Side-by-side review', line: 'Each field links to the highlighted passage in the PDF.' },
      { title: 'Inline corrections', line: 'Confirm or fix a value where you see it.' },
      { title: 'Confidence per field', line: 'Know where to look first.' },
      { title: 'Bulk approve', line: 'Clear high-confidence rows in one action.' },
    ],
  },
  role: {
    summary: 'I redesigned the review experience around verification, starting from why analysts didn’t trust it.',
    owned: ['Analyst research', 'Review UX', 'Information design', 'UI design'],
    stops: [
      {
        stage: 'Discover',
        did: ['Researched with 9 analysts and found the real issue was trust, not extraction quality'],
        artefact: { kind: 'chips', items: ['9 analysts', 'Trust gap', '22% refunds'] },
      },
      {
        stage: 'Verify',
        did: ['Put each extracted field next to its highlighted source passage, with inline confirm and correct'],
        artefact: { kind: 'images', format: 'web', images: [{ img: c('9IdPhNKqorV03EFMHcHPum3A'), alt: 'Extracted fields beside the source PDF' }] },
      },
      {
        stage: 'Prioritise',
        did: ['Added a confidence indicator on every field and bulk approve for high-confidence rows'],
        artefact: { kind: 'chips', items: ['Confidence per field', 'Bulk approve'] },
      },
      {
        stage: 'Structure',
        // Inferred: these screens are in my gallery; the copy does not say I designed import, repository and schema builder.
        did: ['Designed the import, repository and schema builder around the same review model'],
        artefact: {
          kind: 'images',
          format: 'web',
          images: [
            { img: c('AjzBsQyrz5cZetNSMnxNigDUJbY'), alt: 'Document repository with statuses' },
            { img: c('SKiKh56w2aEYzMeGAZjclHIF9Go'), alt: 'Schema builder with pinned metrics' },
          ],
        },
      },
      {
        stage: 'Audit',
        did: ['After launch, exported data was audited across a sample of 200 reports'],
        artefact: { kind: 'chips', items: ['200-report audit', 'Accuracy', 'Review time'] },
      },
    ],
  },
  impact: {
    title: 'Fewer refunds, faster reviews, cleaner data',
    stats: [
      { value: '4%', label: '30-day refund rate', note: 'Down from 22% within two months of launch.' },
      { value: '14 min', label: 'Review time per report', note: 'Down from 38 minutes.' },
      { value: '97%', label: 'Exported data accuracy', note: 'Up from 89%, in an audit of 200 reports.' },
      { value: '3', label: 'Pilots to annual contracts', note: 'The verification UI became a lead feature in the sales deck.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'web',
    groups: [
      {
        shots: [
          { img: c('MmEGU4xPDJA2mPVKyU3qHt0zmhI'), caption: 'Import: drag in fund reports.' },
          { img: c('1zrCBSEJ5l0H710rlNm8LXTXJW4'), caption: 'Import in progress, with extraction status.' },
          { img: c('AjzBsQyrz5cZetNSMnxNigDUJbY'), caption: 'Repository of every document and its status.' },
          { img: c('9IdPhNKqorV03EFMHcHPum3A'), caption: 'Verification: fields beside the source PDF.' },
          { img: c('mO9jSWfV5TC2nd11EKAexHsHKRY'), caption: 'Entities and their relationships.' },
          { img: c('MhRyYdDwKrwrOVuH6GMuOlrL7jo'), caption: 'Schema builder, empty state.' },
          { img: c('SKiKh56w2aEYzMeGAZjclHIF9Go'), caption: 'Choosing metrics for a schema.' },
          { img: c('a7NcgGkbi0kQgho114E6XgJ6WI4'), caption: 'Building views from pinned metrics.' },
          { img: c('Hf6yswPtoqGX0tGdBvW42FNbps'), caption: 'Creating a view.' },
        ],
      },
    ],
  },
};

export const caseStudies: Record<string, CaseStudy> = {
  wayfinder,
  cwook,
  jaa,
  axe,
  azuri,
  circuitmind,
  fantasy,
  rhapsody,
  tendarly,
  lemonsplit,
  freyda,
};
