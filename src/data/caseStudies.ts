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

/** A product call: what was there before, what was chosen, why, and what it cost. Images are labelled ("Version 1", "A"). */
export type Decision = {
  title: string;
  before: string;
  chose: string;
  why: string;
  tradeoff: string;
  images?: { img: Img; alt: string; label: string }[];
};

/** A photo between sections that carries the product's story. `after` is the section index (0 to 4). */
export type Interlude = { after: number; img: Img; alt: string; time: string; line: string };

export type CaseStudy = {
  slug: string;
  title: string;
  meta: { label: string; value: string }[];
  /** Live product links, where there are any. `kind` replaces the "Live product" label. */
  website?: { label: string; href: string; kind?: string }[];
  overview: { statement: string; body: string[] };
  problem: { statement: string; points: Point[] };
  solution: { statement: string; points: Point[] };
  role: { summary: string; owned: string[]; stops: Stop[]; decisions?: Decision[] };
  impact: { title: string; stats: Stat[]; caveat?: string; reflection?: string[] };
  screens: { title: string; format: 'mobile' | 'web'; groups: { title?: string; shots: Shot[] }[]; prototype?: { src: string; note: string } };
  interludes?: Interlude[];
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

/* ------------------------------------------------------------------- WhoDeyGo */

const w = (n: number) => c(`whodeygo-${String(n).padStart(2, '0')}`);

const whodeygo: CaseStudy = {
  slug: 'whodeygo',
  title: 'WhoDeyGo',
  meta: [
    { label: 'Category', value: 'Mobile app' },
    { label: 'Sector', value: 'Peer-to-peer logistics' },
    { label: 'Role', value: 'Design lead and product' },
    { label: 'Year', value: '2026' },
  ],
  overview: {
    statement: 'Send parcels abroad with travellers already making the trip.',
    body: [
      'WhoDeyGo is a mobile marketplace where senders pay verified travellers to carry parcels in their luggage, starting on the London to Lagos route. Payment sits in escrow until the parcel is handed over.',
      'Any user can send, carry or receive, and the role is set per transaction rather than per account. With no product manager on the team, I led the product definition alongside the design, and a team of 2 designers through version 2.',
    ],
  },
  problem: {
    statement: 'Couriers on the corridor are slow and costly, and carrying for strangers lacks trust.',
    points: [
      { title: 'No trust', line: 'Senders hand goods to strangers with no evidence trail.' },
      { title: 'Fixed roles', line: 'The first version forced one role choice at sign-up.' },
      { title: 'Posting into the void', line: 'Senders requested, then waited with no sign of progress.' },
      { title: 'Blind acceptance', line: 'Travellers accepted carries without seeing what was inside.' },
    ],
  },
  solution: {
    statement: 'Per-transaction roles, escrow and evidence at every handoff make carrying for strangers workable.',
    points: [
      { title: 'Send, carry or receive', line: 'One account and one home, whatever your part in each parcel.' },
      { title: 'A fair price, held safe', line: 'The going rate for the route is shown, and payment waits in escrow.' },
      { title: 'Know what you carry', line: 'Every item declared, checked and photographed before anyone says yes.' },
      { title: 'Trust when it counts', line: 'Identity and flights are checked at the moment they matter, not at sign-up.' },
    ],
  },
  role: {
    summary: 'I led design, product definition and a team of 2 designers, and took part in research and testing.',
    owned: ['Product definition', 'Requirements', 'Design leadership', 'UI design', 'Design tokens', 'Prototyping', 'Research', 'Usability testing'],
    stops: [
      {
        stage: 'Discover',
        // Inferred: the research subject (Turi confirmed taking part in research, not its focus).
        did: ['Took part in user research with senders and travellers', 'Reviewed the traveller booking flow and navigation with the team'],
        artefact: { kind: 'chips', items: ['Traveller booking flow', 'Four-tab navigation', 'Instant Match deferred'] },
      },
      {
        stage: 'Define',
        did: [
          'Led the product definition, requirements and feature set, standing in for a product manager',
          'Turned the review into 20 changes from version 1 to version 2, covering roles, pricing, the receiver journey and navigation',
        ],
        artefact: { kind: 'chips', items: ['Per-transaction roles', 'Escrow', 'Just-in-time verification', 'Declared contents'] },
      },
      {
        stage: 'Design',
        did: [
          'Took the flows to hi-fi screens and design tokens, 32 screens in the version 2 prototype',
          'Designed sending, carrying and receiving as one shared transaction view',
        ],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: w(4), alt: 'Home with active and upcoming transactions' },
            { img: w(8), alt: 'Declaring package contents, with a prohibited item flagged' },
            { img: w(18), alt: 'Shared transaction view listing the declared items' },
          ],
        },
      },
      {
        stage: 'Lead',
        // Inferred: how the work was split and reviewed; Turi confirmed leading 2 designers.
        did: [
          'Led 2 designers, splitting the work by journey: sending, carrying and receiving',
          'Reviewed every journey against one set of design tokens, so the three read as one product',
        ],
        artefact: { kind: 'chips', items: ['2 designers', 'Design reviews', 'Design tokens'] },
      },
      {
        stage: 'Test',
        did: [
          'Took part in usability testing on Android with a three-role script: sender, traveller and receiver',
          'Played the traveller, creating trips for a sender to find and match',
        ],
        artefact: { kind: 'chips', items: ['Sender', 'Traveller', 'Receiver'] },
      },
    ],
    // Before comes from the version 1 review and the v0.1 to v0.2 edit list; the images are final screens, by Turi's choice.
    // Inferred: the why and trade-off lines, and the "before" of the last two decisions; Turi to confirm.
    decisions: [
      {
        title: 'Roles belong to the parcel, not the person',
        before: 'Version 1 asked new users to choose one role at sign-up: sender or traveller.',
        chose: 'Roles are set per transaction. One home lists everything active and upcoming, anyone can send a package or be a traveller from it, and receivers became a third role.',
        why: 'The same person sends a parcel home one month and carries one the next. A role at sign-up made them decide before they had a reason to.',
        tradeoff: 'One home now holds three kinds of transaction, so every card carries its role and status.',
        images: [
          { img: w(4), alt: 'Home with active and upcoming transactions across roles', label: 'Home' },
          { img: w(5), alt: 'Empty home with both ways to start', label: 'First visit' },
          { img: w(20), alt: 'Deliveries, each tagged sending, receiving or travelling', label: 'Deliveries' },
        ],
      },
      {
        title: 'Declare every item, checked as you go',
        before: 'A sender could describe a package in their own words, which no one could check.',
        chose: 'Each item is declared on its own line and checked against the destination’s rules as it is added. Prohibited items are flagged, medication asks for a prescription, and every item gets a photo.',
        why: 'The traveller answers for the bag at customs. A description can’t be checked; a list can.',
        tradeoff: 'Declaring takes the sender longer, so items go in one line at a time and each is checked while they type.',
        images: [
          { img: w(8), alt: 'Declared contents, with a prohibited item flagged', label: 'Contents' },
          { img: w(9), alt: 'Taking a photo of each declared item', label: 'Photos' },
        ],
      },
      {
        title: 'See inside before saying yes',
        before: 'In version 1, travellers accepted carries without seeing what was inside.',
        chose: 'A traveller reviews the package first: whether it is safe to carry, each declared item with its photos, and who the sender is. Then they choose interested or not.',
        why: 'Nobody should agree to carry a stranger’s bag on a fee and a title.',
        tradeoff: 'One more screen before accepting, so the safe-to-carry verdict sits at the top and the choice is two buttons.',
        images: [
          { img: w(17), alt: 'Package review: safe to carry, items and sender, before showing interest', label: 'Review' },
          { img: w(18), alt: 'Declared items with their photos', label: 'Items' },
        ],
      },
      {
        title: 'Evidence, not self-report',
        before: 'Trust rested on what people said: identity asked for up front, trip details taken on their word.',
        chose: 'Sign up with an email code, and identity is checked only when an action needs it. Travellers upload their booking, so a name mismatch is caught before the trip is listed and free carry capacity is worked out from the flight.',
        why: 'Asking for ID before someone has seen the app loses them. The trust that matters is at the moment of carrying, and a booking is evidence where typed details are only a claim.',
        tradeoff: 'Verification interrupts a first send or trip, so it is one short step with the reason shown.',
        images: [
          { img: w(12), alt: 'Uploading the flight booking', label: 'Booking' },
          { img: w(13), alt: 'A passenger name mismatch, caught before the trip is listed', label: 'Mismatch' },
          { img: w(14), alt: 'Free carry capacity worked out from the flight', label: 'Capacity' },
        ],
      },
    ],
  },
  impact: {
    title: 'A trusted way to carry, now in device testing',
    caveat: 'WhoDeyGo is in internal device testing and not yet released, so there are no user outcomes yet.',
    // Inferred: the reflection; Turi to confirm or rewrite.
    reflection: [
      'I would put version 2 in front of real senders and travellers before polishing it. Fixed roles and blind acceptance surfaced in an internal review; people outside the team would have found the next problem sooner.',
      'Next, release has to show what matters for a marketplace: how long a request waits for its first offer, how many matches end in a handover, and what senders pay against a courier quote for the same parcel.',
    ],
    stats: [
      { value: '3', label: 'Roles in one account', note: 'Send, carry and receive, set per transaction instead of at sign-up.' },
      { value: 'Testing', label: 'On Android devices', note: 'Internal builds, tested with a three-role script: sender, traveller and receiver.' },
      { value: '2', label: 'Designers led', note: 'Alongside the product definition, with no product manager on the team.' },
      { value: '20', label: 'Fixes to version 1', note: 'Roles, pricing, the receiver journey and navigation, from the product review.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'mobile',
    groups: [
      {
        title: 'Getting started',
        shots: [
          { img: w(1), caption: 'Sign in with a one-time code.' },
          { img: w(2), caption: 'Create an account.' },
          { img: w(3), caption: 'Identity verified, only when an action needs it.' },
          { img: w(4), caption: 'Home: active and upcoming transactions in one place.' },
          { img: w(5), caption: 'Empty home, with both ways to start.' },
        ],
      },
      {
        title: 'Sending',
        shots: [
          { img: w(6), caption: 'Route and timeline, with the going rate shown.' },
          { img: w(7), caption: 'Choosing a pickup airport.' },
          { img: w(8), caption: 'Declared contents, checked against the destination’s rules.' },
          { img: w(9), caption: 'A photo of every item.' },
          { img: w(10), caption: 'Weight, luggage type and fragile handling.' },
          { img: w(11), caption: 'Declarations before the request goes out.' },
        ],
      },
      {
        title: 'Carrying',
        shots: [
          { img: w(12), caption: 'Uploading the flight booking.' },
          { img: w(13), caption: 'A name mismatch, caught before the trip is listed.' },
          { img: w(14), caption: 'Free carry capacity, worked out from the flight.' },
          { img: w(15), caption: 'Trip summary with layovers.' },
          { img: w(16), caption: 'Declarations before the trip is published.' },
          { img: w(17), caption: 'Reviewing a package before showing interest.' },
        ],
      },
      {
        title: 'In transit',
        shots: [
          { img: w(18), caption: 'Declared items, with attached photos.' },
          { img: w(19), caption: 'Chat between sender, traveller and receiver.' },
          { img: w(20), caption: 'All deliveries, by status.' },
        ],
      },
    ],
  },
  // Staged scenes generated in Figma, following one parcel from London to Lagos.
  // Only one is a mockup (the sofa), with the real package review screen composited on.
  interludes: [
    {
      after: 0,
      img: c('whodeygo-story-pack'),
      alt: 'A woman in a London flat packing gifts into a small box for her family.',
      time: 'Thursday, 19:30',
      line: 'In London, a box of gifts for her mother in Lagos.',
    },
    {
      after: 2,
      img: c('whodeygo-story-review'),
      alt: 'Over a traveller’s shoulder: his phone shows WhoDeyGo’s package review, safe to carry, beside a half-packed suitcase.',
      time: 'Friday, 08:10',
      line: 'A traveller flying home on Saturday checks what’s inside before he says yes.',
    },
    {
      after: 3,
      img: c('whodeygo-story-handover'),
      alt: 'In an airport departures hall, the sender hands the box to the traveller beside his suitcase.',
      time: 'Saturday, 10:40',
      line: 'At the airport, the handover is confirmed in two taps.',
    },
    {
      after: 4,
      img: c('whodeygo-story-arrive'),
      alt: 'At a family home in Lagos, an older woman smiles as the traveller hands her the box.',
      time: 'Sunday, 16:20',
      line: 'In Lagos, her mother receives it, and the traveller is paid.',
    },
  ],
};

/* --------------------------------------------------------------------- OutOut */

// Event covers in these screens are a neutral gradient: the Figma file uses third-party artwork there.
const o = (n: number) => c(`outout-${String(n).padStart(2, '0')}`);

const outout: CaseStudy = {
  slug: 'outout',
  title: 'OutOut',
  meta: [
    { label: 'Category', value: 'Mobile app' },
    { label: 'Sector', value: 'Consumer social, event planning' },
    { label: 'Role', value: 'Design lead and product' },
    { label: 'Year', value: '2026' },
  ],
  overview: {
    statement: 'Plan it, split it, keep it. Group outings in one app.',
    body: [
      'OutOut helps friend groups organise outings in one place: agree a date, RSVP, split costs, chat and share photos. It is built for 18 to 35 year olds and folds in an earlier gifting concept.',
      'Version 2 rebuilt the app around the event itself. With no product manager on the team, I led the product definition alongside the design.',
    ],
  },
  problem: {
    statement: 'Group plans scatter across chats, polls, banking apps and camera rolls, and stall on picking a date.',
    points: [
      { title: 'No agreed date', line: 'Hosts guess; guests’ availability goes unasked.' },
      { title: 'Messy shared costs', line: 'Who paid what gets lost after the night.' },
      { title: 'Scattered memories', line: 'Photos end up spread across individual phones.' },
      { title: 'A broken first version', line: 'Version 1 invite links failed for new users.' },
    ],
  },
  solution: {
    statement: 'One place for the group to pick a date, settle up and keep the night.',
    points: [
      { title: 'A date that works', line: 'Guests vote on options or mark when they’re free, so the host stops guessing.' },
      { title: 'Know who’s coming', line: 'Guests answer in a tap, and the host sees who’s in before booking.' },
      { title: 'No chasing money', line: 'Costs are split inside the event, so everyone sees what they owe.' },
      { title: 'Every photo, one album', line: 'Everyone’s shots from the night land in one shared album.' },
    ],
  },
  role: {
    summary: 'I led design and product definition, worked on research and testing, and built frontend screens.',
    owned: ['Product definition', 'Requirements', 'Design leadership', 'UI design', 'Design system', 'Prototyping', 'Research', 'Usability testing', 'Frontend build'],
    stops: [
      {
        stage: 'Discover',
        // Inferred: that the cash-gift survey was part of the research Turi took part in.
        did: ['Took part in research, including a survey on cash gifts', 'Reviewed version 1 bugs and screens to find where it broke'],
        artefact: { kind: 'chips', items: ['Version 1 bug review', 'Cash-gift survey', 'Moodboard'] },
      },
      {
        stage: 'Define',
        did: [
          'Led the product definition, requirements and feature set, standing in for a product manager',
          'Merged the gifting concept into OutOut',
          'Set a roadmap and feature priorities that leadership signed off, which took version 2 to a pilot',
        ],
        artefact: { kind: 'chips', items: ['Three date modes', 'Splits inside events', 'Shared albums', 'Gifting merger'] },
      },
      {
        stage: 'Design',
        did: [
          'Led a team of 2 to 3 designers through 192 hi-fi frames, from sign-up to shared albums',
          'Unified the design style into one set of specs, so engineers built with fewer back-and-forths',
          'Explored three home layouts and seven navigation bars before settling the structure',
        ],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('outout-design-fixed'), alt: 'Creating an event with a cover photo and a fixed date' },
            { img: c('outout-design-window'), alt: 'A guest marking the days they are free in a date window' },
            { img: o(14), alt: 'Expenses across all events' },
          ],
        },
      },
      {
        stage: 'Lead',
        did: ['Held weekly design reviews against one shared component set, so three people’s screens read as one product'],
        artefact: { kind: 'chips', items: ['Weekly reviews', 'Shared components'] },
      },
      {
        stage: 'Build',
        did: ['Worked on the Flutter frontend, building screens from the designs, home page first'],
        artefact: { kind: 'chips', items: ['Flutter', 'Claude Code', 'Design tokens'] },
      },
      {
        stage: 'Test',
        did: ['Took part in usability testing of the version 2 flows', 'Version 2 then went into a pilot with over 100 users'],
        artefact: { kind: 'quote', text: 'This new version is sooo much more better than the first version. Very intuitive and enjoyable to use.', by: 'Pilot user' },
      },
    ],
    // Before, chose and the frame counts come from the version 1 and version 2 Figma files.
    // Inferred: the "why" and "trade-off" lines; Turi to confirm.
    decisions: [
      {
        title: 'One event, not trips and outings',
        before: 'Hosts first chose between a trip and an outing, two separate flows across 110 frames, each with one suggested date for guests to vote on.',
        chose: 'One event form with the date mode set up front: a fixed date, a poll, or a date window. 37 frames in all.',
        why: 'The trip or outing choice came before anything useful, and plans stalled on the date, not the label.',
        tradeoff: 'Three modes in one form is more to design and build, so Fixed stays the default and simple plans take one step.',
        images: [
          { img: c('outout-v1-create'), alt: 'Version 1: Create outing, with a single suggested date', label: 'Version 1' },
          { img: o(9), alt: 'Version 2: creating an event with a poll of two dates', label: 'Version 2' },
        ],
      },
      {
        title: 'A code, not a password',
        before: 'Email and password, forgotten-password and reset flows, then a step to pick five interests. 35 screens.',
        chose: 'Email, a one-time code, a name and an optional photo. 16 screens, sign-in included.',
        why: 'Most people arrive from a friend’s invite. Every extra step stood between them and the event they were invited to.',
        tradeoff: 'No interests to personalise suggestions with. We chose to learn from the events people actually create instead.',
        images: [
          { img: c('outout-v1-signup'), alt: 'Version 1: create an account with email and password', label: 'Version 1' },
          { img: c('outout-v2-signup'), alt: 'Version 2: verify your email with a one-time code', label: 'Version 2' },
        ],
      },
      {
        title: 'A look built for the night out',
        before: 'A light interface with a yellow and orange palette and styles that varied from flow to flow.',
        chose: 'A dark interface where event covers and photos lead, a new wordmark, and one component set shared by the whole team.',
        why: 'The photos carry the mood of an outing, and a dark base lets them do it. One system kept three designers consistent.',
        tradeoff: 'Every screen was redrawn, which only fitted 10 weeks because the component set came first.',
        images: [
          { img: c('outout-v1-home'), alt: 'Version 1: light home screen with upcoming trips', label: 'Version 1' },
          { img: c('outout-v2-home'), alt: 'Version 2: dark home feed with stories and upcoming events', label: 'Version 2' },
        ],
      },
      {
        title: 'Create in the middle, chat inside the event',
        before: 'Version 1’s tabs were Home, Photos, Plan, Expenses and Profile, and chats sat apart from the plans they were about.',
        chose: 'Home, Calendar, Create, Expenses and Albums, with Create in the centre and each event’s chat opened from the event.',
        why: 'Creating a plan is the action that starts everything. Group chat already lives elsewhere; money and photos are what people come back for.',
        tradeoff: 'Chat is one tap deeper, so every event carries a View chat button. We explored seven navigation bars to get there.',
        images: [
          { img: c('outout-explore-a'), alt: 'Navigation exploration A: Create as a tab, with Chats', label: 'Exploration A' },
          { img: c('outout-explore-b'), alt: 'Navigation exploration B: a raised Create button', label: 'Exploration B' },
          { img: c('outout-explore-c'), alt: 'Navigation exploration C: a floating create button with five tabs', label: 'Exploration C' },
        ],
      },
    ],
  },
  impact: {
    title: 'One clear product, now in pilot with real groups',
    caveat: 'OutOut is in a pilot, not yet on public release. Adoption compares new users reaching their first created or joined event before and after the redesign.',
    // Inferred: the reflection; Turi to confirm or rewrite.
    reflection: [
      'I would put version 2 in front of real friend groups earlier. Version 1’s broken invite links only showed up after release, and a handful of groups in the first weeks would have caught the next problem sooner.',
      'Next, the pilot needs to show whether groups come back for a second event, not only their first. After that, gifting returns inside events, and splits by item join the three ways to split a bill.',
    ],
    stats: [
      { value: '20%', label: 'More new users reach a first event', note: 'Sign-up to first created or joined event, after the version 2 redesign.' },
      { value: '10', label: 'Weeks from kick-off to pilot', note: 'From the version 2 kick-off to a pilot build in testers’ hands.' },
      { value: '100+', label: 'Pilot users', note: 'Version 2 is in pilot testing with friend groups, on a direction leadership signed off.' },
      { value: '4/5', label: 'Pilot rating', note: 'Average rating from pilot users of version 2.' },
      { value: '2–3', label: 'Designers led', note: 'One design style and one set of specs, so engineers built with fewer back-and-forths.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'mobile',
    groups: [
      {
        title: 'Getting started',
        shots: [
          { img: o(1), caption: 'Splash screen.' },
          { img: o(2), caption: 'Welcome: find a date for everyone.' },
          { img: o(3), caption: 'Welcome: relive memories together.' },
          { img: o(4), caption: 'Email verification code.' },
          { img: o(5), caption: 'Choosing a display name.' },
          { img: o(6), caption: 'Profile photo, skippable.' },
          { img: o(7), caption: 'Empty home, with a calendar import to start.' },
        ],
      },
      {
        title: 'Planning an event',
        shots: [
          { img: o(8), caption: 'New event, fixed date by default.' },
          { img: o(9), caption: 'Poll: suggest dates and let guests decide.' },
          { img: o(10), caption: 'Date window: a range and how long it lasts.' },
        ],
      },
      {
        title: 'Responding',
        shots: [
          { img: o(11), caption: 'An invite waiting on the host’s date.' },
          { img: o(12), caption: 'Voting on the dates that work.' },
          { img: o(13), caption: 'Attending, with a way to change the response.' },
        ],
      },
      {
        title: 'Costs and memories',
        shots: [
          { img: o(14), caption: 'What you owe and are owed, across events.' },
          { img: o(15), caption: 'Albums, organised by event.' },
          { img: o(16), caption: 'An event album with photos and videos.' },
          { img: o(17), caption: 'Sharing a photo to a story or an album.' },
          { img: o(18), caption: 'Event chats.' },
        ],
      },
    ],
  },
  // Staged scenes generated in Figma; where a phone faces the camera, the real screen is composited on.
  interludes: [
    {
      after: 0,
      img: c('outout-story-plan'),
      alt: 'Two friends on a sofa at night, one holding up a phone with OutOut open.',
      time: 'Tuesday, 21:40',
      line: 'Saturday, or the one after? The host suggests two dates and the group votes from the sofa.',
    },
    {
      after: 2,
      img: c('outout-story-party'),
      alt: 'Friends dancing at a street party at golden hour, under string lights.',
      time: 'Saturday, 18:30',
      line: 'The date most of the group could make, picked by the group.',
    },
    {
      after: 3,
      img: c('outout-story-split'),
      alt: 'A dinner table from above, plates shared between friends, with OutOut’s expenses open on a phone.',
      time: 'Saturday, 23:10',
      line: 'Dinner goes into the event’s expenses, split evenly, before anyone leaves the table.',
    },
    {
      after: 4,
      img: c('outout-story-keep'),
      alt: 'A phone on a bedsheet the morning after, showing a shared album, beside coffee and instant photos.',
      time: 'Sunday, 10:15',
      line: 'Everyone’s photos from the night, in one album.',
    },
  ],
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
    { label: 'Role', value: 'Lead designer and front end' },
    { label: 'Year', value: '2024' },
  ],
  overview: {
    statement: 'A learning platform that blends machine learning with human mentorship.',
    body: [
      'AXE is a learning platform that adapts to each learner. It serves three groups: learners, tutors, and organisations upskilling their teams.',
      'As lead designer I set the design direction, created the design system and made the key calls on what to build, then co-built the Next.js, React and TypeScript front end.',
    ],
  },
  problem: {
    // Inferred: framed from the solution features and the tutor screens; the original copy does not state the problem.
    statement: 'Courses move everyone at one pace, tutors rebuild what they already have, and nobody sees who is falling behind.',
    points: [
      { title: 'One pace for all', line: 'Content doesn’t adapt to what a learner already knows.' },
      { title: 'Slow to build', line: 'Tutors recreate material that already exists in their documents.' },
      { title: 'Progress hidden', line: 'Tutors and team leads can’t see who needs help until it’s late.' },
    ],
  },
  solution: {
    statement: 'Learners move at their own pace, tutors build from what they have, and everyone can see progress.',
    points: [
      { title: 'Learn in short steps', line: 'Lessons come as short slides with check-in questions, and help is a click away.' },
      { title: 'Courses from your notes', line: 'Tutors import a lesson document or build one from scratch.' },
      { title: 'See who needs help', line: 'Progress, scores and task performance for every student, at a glance.' },
      { title: 'Teams in one space', line: 'Organisations run teams, courses and reports from one workspace.' },
    ],
  },
  role: {
    summary: 'I led design: set the direction, built the design system, made the key feature calls, and co-built the front end.',
    owned: ['Design direction', 'Design system', 'Product decisions', 'UI design', 'Prototyping', 'User research', 'Usability testing', 'Front end build'],
    stops: [
      {
        stage: 'Discover',
        did: ['Supported user research and usability testing with learners, tutors and teams'],
        artefact: { kind: 'chips', items: ['Learners', 'Tutors', 'Organisations'] },
      },
      {
        stage: 'Translate',
        did: ['Worked with in-house AI specialists to turn teaching methods into machine-learning models for personalised instruction, the hardest part of the project'],
        artefact: { kind: 'images', format: 'web', images: [{ img: c('axe-tutor-builder'), alt: 'Lesson editor: a tutor building a lesson from content blocks, with the lesson outline beside it' }] },
      },
      {
        stage: 'Design',
        did: ['Took the learner side from wireframes to hi-fi, then designed the tutor workspace: courses, tasks, grading, students and reports'],
        artefact: {
          kind: 'images',
          format: 'web',
          images: [
            { img: c('axe-learner-home'), alt: 'Learner dashboard with live classes and courses in progress' },
            { img: c('axe-tutor-students'), alt: 'Tutor view of students ranked by course progress' },
          ],
        },
      },
      {
        stage: 'Lead',
        did: [
          'Set the design direction for the learner and tutor apps',
          'Created the design system both apps are built on',
          'Made the critical calls on which features to build and how',
        ],
        artefact: { kind: 'chips', items: ['Design direction', 'Design system', 'Feature calls'] },
      },
      {
        stage: 'Build',
        did: ['Co-built the front end with an engineer in a 56-route, multi-tenant product with CI checks'],
        artefact: { kind: 'chips', items: ['Learner app', 'Assignment submissions', 'Community forum', 'Verifiable PDF certificates'] },
      },
      {
        stage: 'Test',
        did: ['The whole internal team tested the learner and tutor apps end to end', 'Then a pilot with 2 tutors and 30 students'],
        artefact: { kind: 'chips', items: ['Internal test', 'Pilot: 2 tutors', 'Pilot: 30 students'] },
      },
    ],
    // Before and chose come from the AXE Design and AXE Tutor Application Figma files (wireframes, iterations, final screens).
    // Inferred: the "why" and "trade-off" lines; Turi to confirm.
    decisions: [
      {
        title: 'Lessons as short slides, not long modules',
        before: 'The wireframes showed a course as a list of long modules behind a buy button.',
        chose: 'Each lesson as numbered slides with check-in questions, and help one click away. Two iterations came before the final layout.',
        why: 'Short steps keep a learner moving, and the questions show the tutor exactly where understanding breaks.',
        tradeoff: 'Tutors have to break material into slides, which is why importing their own documents mattered.',
        images: [
          { img: c('axe-wire-course'), alt: 'Wireframe: course detail with a list of modules', label: 'Wireframe' },
          { img: c('axe-lesson-iter-a'), alt: 'Iteration: lesson with slides and questions', label: 'Iteration' },
          { img: c('axe-lesson-iter-b'), alt: 'Iteration: lesson with a question list', label: 'Iteration' },
          { img: c('axe-lesson'), alt: 'Final: lesson with slides, questions and next steps', label: 'Final' },
        ],
      },
      {
        title: 'Start from the tutor’s own notes',
        before: 'The wireframes covered the learner only: home, browse, course detail and profile. Tutors had no way to bring material in.',
        chose: 'An empty course offers two routes: import a lesson document, or create a lesson from scratch. Course setup sits in one dialog.',
        why: 'Tutors already have notes, slides and handouts. Starting from a blank page was the biggest barrier to a first course.',
        tradeoff: 'Imported documents still need the tutor to check them before learners see them.',
        images: [
          { img: c('axe-tutor-import'), alt: 'Empty course offering import or create a lesson', label: 'Tutor' },
          { img: c('axe-tutor-configure'), alt: 'Configure course dialog with cover image and title', label: 'Tutor' },
        ],
      },
      {
        title: 'Progress a tutor can act on',
        before: 'The learner wireframes showed only a learner’s own progress. There was no view across a class.',
        chose: 'A student list ranked by course progress, a task performance report, and grading with a score and comments.',
        why: 'A tutor with 30 students needs to spot who is behind at a glance, then act on it in the same place.',
        tradeoff: 'Colour alone fails some people and some screens, so every progress bar also carries a percentage.',
        images: [
          { img: c('axe-tutor-students'), alt: 'Students ranked by course progress', label: 'Students' },
          { img: c('axe-tutor-report'), alt: 'Task performance report', label: 'Report' },
          { img: c('axe-tutor-grading'), alt: 'Grading a submission with a score and comments', label: 'Grading' },
        ],
      },
      {
        title: 'One design system, three roles',
        before: 'Learner-first wireframes, with the tutor app designed in a separate file.',
        chose: 'One design system across the learner, tutor and organisation spaces, with the same navigation and a workspace switcher.',
        why: 'A small team had six months. Shared components let the front end ship both apps instead of building two.',
        tradeoff: 'Tutor screens are denser than learner ones, so the components had to hold both.',
        images: [
          { img: c('axe-learner-home'), alt: 'Learner dashboard', label: 'Learner' },
          { img: c('axe-tutor-task'), alt: 'Tutor creating a task: assignment, quiz, discussion or project', label: 'Tutor' },
        ],
      },
    ],
  },
  impact: {
    title: 'Funded, built in six months, and in pilot',
    caveat: 'AXE is in an early pilot, so there is no usage data yet. Before the pilot, the whole internal team tested it end to end.',
    // Inferred: the reflection; Turi to confirm or rewrite.
    reflection: [
      'I would bring real tutors in before the internal test. Our own team knew the product too well to stumble where a new tutor would.',
      'Next, the pilot has to show whether learners finish courses and come back, and whether tutors save time building them. Those numbers decide what we build next.',
    ],
    stats: [
      { value: 'Funded', label: 'Funding secured', note: 'Amount undisclosed, secured with a working, tested product.' },
      { value: '6', label: 'Months to build', note: 'From wireframes to a working learner and tutor product.' },
      { value: '30', label: 'Students in the pilot', note: 'Learning with 2 tutors running live courses.' },
      { value: '3', label: 'Roles, one design system', note: 'Learners, tutors and organisations.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'web',
    groups: [
      {
        title: 'Learners and teams',
        shots: [
          { img: c('axe-learner-home'), caption: 'Dashboard: live classes, courses in progress, chats and mentions.' },
          { img: c('axe-lesson'), caption: 'A lesson as slides, with check-in questions.' },
          { img: c('axe-lesson-slide'), caption: 'A lesson slide, with a hidden fact to keep learners curious.' },
          { img: c('axe-tutor-teams'), caption: 'Teams: team cards, and the learners still to be placed in one.' },
          { img: c('axe-report-team'), caption: 'Team report: points and task performance for each team.' },
          { img: c('axe-report-performance'), caption: 'Performance breakdown: points per task and the average score.' },
        ],
      },
      {
        title: 'Tutor workspace',
        shots: [
          { img: c('axe-course-overview'), caption: 'Course overview: description, level, price and reviews.' },
          { img: c('axe-tutor-import'), caption: 'A new course: import a document or create a lesson.' },
          { img: c('axe-tutor-configure'), caption: 'Course setup in one dialog.' },
          { img: c('axe-tutor-builder'), caption: 'Lesson editor: content blocks, with the lesson outline beside them.' },
          { img: c('axe-tutor-task'), caption: 'Creating a task: assignment, quiz, discussion or project.' },
          { img: c('axe-tutor-grading'), caption: 'Grading a submission with a score and comments.' },
          { img: c('axe-tutor-students'), caption: 'Students ranked by course progress.' },
          { img: c('axe-tutor-report'), caption: 'Task performance report.' },
        ],
      },
    ],
  },
  // Staged scenes generated in Figma. Only one is a mockup (the lesson laptop), with the real screen composited on.
  interludes: [
    {
      after: 0,
      img: c('axe-story-class'),
      alt: 'A tutor leading a morning class, several learners with hands raised.',
      time: 'Monday, 09:00',
      line: 'A tutor runs a live class from lessons she built out of her own notes.',
    },
    {
      after: 2,
      img: c('axe-story-learn'),
      alt: 'A learner at a kitchen table, with an AXE lesson open on a laptop.',
      time: 'Monday, 16:10',
      line: 'Later that day, one short lesson and its check-in questions.',
    },
    {
      after: 3,
      img: c('axe-story-team'),
      alt: 'Four colleagues around an office table, working through a course together on a laptop.',
      time: 'Wednesday, 10:00',
      line: 'At work, a team takes the same course together.',
    },
    {
      after: 4,
      img: c('axe-story-tutoring'),
      alt: 'A tutor sitting beside a learner in a library, pointing to a line in her notebook.',
      time: 'Friday, 15:30',
      line: 'The tutor sits with the student the progress view flagged as falling behind.',
    },
  ],
};

/* ---------------------------------------------------------------------- Azuri */

const azuri: CaseStudy = {
  slug: 'azuri',
  title: 'Azuri Facility Management',
  meta: [
    { label: 'Category', value: 'Enterprise web app' },
    { label: 'Client', value: 'Eko Development Company' },
    { label: 'Role', value: 'Co-designer, at Heckerbella' },
    { label: 'Year', value: '2023' },
  ],
  overview: {
    statement: 'One system to run a three-tower, mixed-use estate.',
    body: [
      'Azuri Facility Management is the web app Eko Development Company’s facility and operations teams use every day to run Azuri Towers in the Marina District of Eko Atlantic, Lagos: two residential towers and an office tower, with retail, car parks and lofts around them. It brings finance, maintenance, security, inventory and space into one system.',
      'I was co-designer at Heckerbella, working with the lead designer. I designed the property and occupant views, each tower’s dashboard with its maintenance requests and incidents, and members and roles.',
    ],
  },
  problem: {
    // Inferred: framed from what the system unifies; the original copy does not state the problem.
    statement: 'Running three towers meant juggling occupants, repairs, security and bills in separate places.',
    points: [
      { title: 'Scattered records', line: 'Residents, office tenants and units tracked in different places.' },
      { title: 'Slow repair loops', line: 'Maintenance requests and vendors handled by hand.' },
      { title: 'No estate-wide view', line: 'Occupancy and space hard to see across the towers.' },
      { title: 'Many teams', line: 'Operations, security and housekeeping each need their own access.' },
    ],
  },
  solution: {
    statement: 'One web app for the whole estate, from residents and offices to repairs and bills.',
    points: [
      { title: 'Every building at a glance', line: 'Space and occupancy for each tower, car park and retail floor on one overview.' },
      { title: 'Know who lives and works here', line: 'Residents, owners and office occupants, with tenancy, parking and service charges.' },
      { title: 'Repairs that route themselves', line: 'Maintenance requests reach the right team and vendor automatically.' },
      { title: 'Each team, its own access', line: 'Roles decide what operations, security and housekeeping staff can see and do.' },
    ],
  },
  role: {
    summary: 'I co-designed the system with the lead designer, owning property and occupants, the tower dashboards, and access.',
    owned: ['Property and occupants', 'Tower dashboards', 'Maintenance and incidents', 'Members and roles', 'Role-based flows', 'Hi-fi prototypes'],
    stops: [
      {
        stage: 'Structure',
        did: ['Mapped the estate into the property section: each tower, car park, retail floor and loft with its own space and occupancy'],
        artefact: { kind: 'chips', items: ['Azuri One', 'Azuri Two', 'Azuri Offices', 'Podium Retail', 'Car parks', 'Lofts'] },
      },
      {
        stage: 'Occupants',
        did: ['Designed resident and office occupant lists with a detail panel, so staff check tenancy, parking and service charges without leaving the list'],
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
        stage: 'Operate',
        did: ['Designed each tower’s dashboard: occupancy, maintenance requests and incident reports on one screen'],
        artefact: { kind: 'images', format: 'web', images: [{ img: c('dH1IuDss3uGKOsvHeTDL4bHtF8k'), alt: 'Azuri One dashboard with maintenance requests and incidents' }] },
      },
      {
        stage: 'Access',
        did: ['Designed members and roles, so each team sees only its own work'],
        artefact: { kind: 'images', format: 'web', images: [{ img: c('TjQLUXIVu5IVC0V35Y826TqiYE'), alt: 'Manage members, with roles and the reason for each member’s access' }] },
      },
      {
        stage: 'Partner',
        // Inferred: that the lead designer owned finance and billing, and how the two halves were kept consistent.
        did: [
          'Split the system with the lead designer: I took property, dashboards and access, while the lead took finance and billing',
          'Built my screens from the same component set, so both halves read as one product',
        ],
        artefact: { kind: 'chips', items: ['Co-design', 'Shared components', 'Role-based flows'] },
      },
      {
        stage: 'Launch',
        did: ['Shipped to Eko Development Company, whose facility and operations teams run the estate on it every day'],
        artefact: { kind: 'chips', items: ['Live', 'Daily use', 'Enterprise, no public access'] },
      },
    ],
    // No earlier versions survive, so "before" describes the usual way, and the images are final screens.
    // Inferred: the before, why and trade-off lines; Turi to confirm.
    decisions: [
      {
        title: 'The building is the way in',
        before: 'Facility tools usually start from modules: a finance screen, a maintenance screen, a long list of units.',
        chose: 'Property opens on a building overview, one card per tower, car park and retail floor with its space and occupancy. Each opens to its own residents and requests.',
        why: 'Staff think in buildings. An incident is in Azuri One, floor 21, apartment 34, so the system is organised the same way.',
        tradeoff: 'Lists across the whole estate take an extra step, so Residents also has an all-buildings view with a building filter.',
        images: [
          { img: c('4lGtRekp8itXvuh4aHHhls3RIek'), alt: 'Building overview of the towers, car parks, retail and lofts', label: 'Overview' },
          { img: c('5bpYA4RPJb8RqYkwCR45rdgM'), alt: 'Residents across the estate, filtered by building', label: 'All residents' },
        ],
      },
      {
        title: 'Details beside the list',
        before: 'Opening a record usually means leaving the list and losing your place in a long table.',
        chose: 'A detail panel opens beside the list: owner, tenant, apartment, parking lot and service charge, with deactivation at the bottom.',
        why: 'Staff check one occupant after another. Keeping the list in view keeps their place.',
        tradeoff: 'The list narrows while the panel is open, so it keeps the columns staff scan first: apartment, owner and resident.',
        images: [
          { img: c('f6ZrkFkC7q60T94DfQqnzTdkbXU'), alt: 'Residents list with the resident detail panel open', label: 'Residents' },
          { img: c('YYDujWkfuASEySMAPu1wtwhVo'), alt: 'Office occupants with the occupant detail panel open', label: 'Offices' },
        ],
      },
      {
        title: 'A dashboard for each tower',
        before: 'One dashboard for the whole estate mixes every tower’s requests, so a manager filters before they can act.',
        chose: 'Each tower has its own dashboard: occupancy, open maintenance requests and incident reports, with a switcher across the towers, offices, retail and lofts.',
        why: 'Operations managers answer for buildings, so their first screen should be their building.',
        tradeoff: 'Totals for the whole estate are a step away, on the building overview.',
        images: [{ img: c('dH1IuDss3uGKOsvHeTDL4bHtF8k'), alt: 'Azuri One dashboard with maintenance requests and incidents', label: 'Dashboard' }],
      },
      {
        title: 'Access by role, with a reason',
        before: 'Access granted person by person drifts as staff join, move and leave.',
        chose: 'Members are invited with a role that sets what they can see and do, and a super admin manages the list. Each member’s access carries a reason.',
        why: 'Operations, security and housekeeping need different parts of the system, and staff change.',
        tradeoff: 'Roles are broad, so the recorded reason is what tells an admin why someone has access.',
        images: [{ img: c('TjQLUXIVu5IVC0V35Y826TqiYE'), alt: 'Manage members, with roles, dates assigned and reasons', label: 'Members' }],
      },
    ],
  },
  impact: {
    title: 'Live, and running the estate every day',
    caveat: 'Azuri is an internal enterprise tool, so there is no public link. I don’t have usage figures to share.',
    // Inferred: the reflection; Turi to confirm or rewrite.
    reflection: [
      'I would spend a morning with the operations team before designing the dashboards. We worked from how the estate is organised; watching a manager start the day would have shown which requests deserve the top of the screen.',
      'Next, I would measure how long a maintenance request takes from report to fix, for each tower. It is the clearest sign of whether the system makes the estate easier to run.',
    ],
    stats: [
      { value: 'Daily', label: 'In use by the operations team', note: 'Eko Development Company’s facility and operations teams run Azuri Towers on it.' },
      { value: '3', label: 'Towers on one system', note: 'Azuri One, Azuri Two and Azuri Offices, with retail, car parks and lofts.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'web',
    groups: [
      {
        title: 'Property and occupants',
        shots: [
          { img: c('4lGtRekp8itXvuh4aHHhls3RIek'), caption: 'Building overview: every tower, car park and retail floor.' },
          { img: c('f6ZrkFkC7q60T94DfQqnzTdkbXU'), caption: 'Azuri One residents, with a resident’s details beside the list.' },
          { img: c('5bpYA4RPJb8RqYkwCR45rdgM'), caption: 'Residents across the estate, with service charge status.' },
          { img: c('YYDujWkfuASEySMAPu1wtwhVo'), caption: 'Office occupants and company details.' },
        ],
      },
      {
        title: 'Operations',
        shots: [
          { img: c('dH1IuDss3uGKOsvHeTDL4bHtF8k'), caption: 'Tower dashboard: occupancy, maintenance requests and incidents.' },
          { img: c('TjQLUXIVu5IVC0V35Y826TqiYE'), caption: 'Members, their roles and the reason for their access.' },
        ],
      },
    ],
  },
  // Staged scenes generated in Figma, modelled on Azuri Towers (white facades, terracotta bands, a dark glass office tower).
  // Only one is a mockup (the office), with the real Azuri One dashboard composited on.
  interludes: [
    {
      after: 0,
      img: c('azuri-story-arrive'),
      alt: 'An operations manager walking toward Azuri Towers in the morning: two white and terracotta residential towers either side of a dark glass office tower.',
      time: 'Monday, 07:20',
      line: 'The operations manager arrives before residents leave for work.',
    },
    {
      after: 2,
      img: c('azuri-story-office'),
      alt: 'The operations manager at her desk with Azuri One’s dashboard on screen, the neighbouring tower and the Atlantic through the window.',
      time: 'Monday, 08:05',
      line: 'Azuri One’s dashboard: new maintenance requests, and a stairwell light reported overnight.',
    },
    {
      after: 3,
      img: c('azuri-story-repair'),
      alt: 'A technician on a stepladder replacing a stairwell light, with the neighbouring tower and the coast through the window.',
      time: 'Monday, 10:30',
      line: 'The request reaches maintenance, and the light is fixed by mid-morning.',
    },
    {
      after: 4,
      img: c('azuri-story-dusk'),
      alt: 'Azuri Towers at dusk across the marina, apartment windows lit and reflected in the water.',
      time: 'Monday, 18:45',
      line: 'Residents home, offices emptying, and the day’s requests closed.',
    },
  ],
};

/* ---------------------------------------------------------------- Circuitmind */

const circuitmind: CaseStudy = {
  slug: 'circuitmind',
  title: 'Circuitmind',
  meta: [
    { label: 'Category', value: 'AI web platform' },
    { label: 'Client', value: 'Circuit Mind, London' },
    { label: 'Role', value: 'Design lead, version 1 redesign' },
    { label: 'Year', value: '2024' },
  ],
  website: [{ label: 'circuitmind.io', href: 'https://www.circuitmind.io/' }],
  overview: {
    statement: 'AI that designs circuits, made legible to the engineers who use it.',
    body: [
      'Circuit Mind builds AI for electronic circuit design. Engineers describe a system’s architecture and requirements, and the platform proposes candidate schematics, a bill of materials and files ready for their ECAD tools.',
      'Version 1 automated schematic generation, but most new users left before finishing a first design. I led the redesign as the only designer, working with the founders and engineers, starting with onboarding and the main workspace. I also designed the pitch deck that helped Circuit Mind raise US$900k.',
    ],
  },
  problem: {
    statement: 'Engineers couldn’t see where the AI co-pilot fit their workflow, so most quit before their first design.',
    points: [
      { title: '71% drop-off', line: 'Most new users left inside week one.' },
      { title: '47 minutes to value', line: 'Reaching a first design took most of an hour.' },
      { title: 'Static documentation', line: 'Help lived in docs, not in the product.' },
      { title: 'Unclear model', line: 'No line between what you input and what the AI suggests.' },
    ],
  },
  solution: {
    statement: 'A guided first project, and a workspace split into input, AI suggestions and validation.',
    points: [
      { title: 'Start with your own parts', line: 'A guided first project built from the engineer’s own component library.' },
      { title: 'Help where you are', line: 'Tips in context replace static documentation.' },
      { title: 'See what the AI did', line: 'Input, AI suggestions and validation output, side by side.' },
      { title: 'Check before you trust', line: 'Power tree, BoM and efficiency curves beside the design.' },
    ],
  },
  role: {
    summary: 'As the only designer, I led the version 1 redesign with the founders and engineers, then designed the pitch deck for their raise.',
    owned: ['User interviews', 'Session analysis', 'Onboarding', 'Workspace UX', 'Data visualisation', 'UI design', 'Pitch deck design'],
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
        artefact: { kind: 'chips', items: ['Own component library', 'Guided first project', 'Tips in context'] },
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
        stage: 'Lead',
        did: [
          'Led the design end to end as the only designer, setting direction with the founders',
          'Worked with the engineers through the build, so the release matched the design',
        ],
        artefact: { kind: 'chips', items: ['Founders', 'Engineers', 'Design lead'] },
      },
      {
        stage: 'Measure',
        did: ['Tracked the release with the team on three numbers: week-one activation, time to first design and trial-to-paid conversion'],
        artefact: { kind: 'chips', items: ['Activation', 'Time to first design', 'Trial to paid'] },
      },
      {
        stage: 'Pitch',
        did: ['Designed the founders’ pitch deck, with the redesigned onboarding as the core demo in investor meetings. Circuit Mind raised US$900k.'],
        artefact: { kind: 'chips', items: ['Pitch deck', 'Investor demo', 'US$900k raised'] },
      },
    ],
    // Before comes from the version 1 findings (drop-off, static docs, no line between input and AI). No version 1 screens survive.
    // Inferred: the why and trade-off lines, and the "before" of the last two decisions; Turi to confirm.
    decisions: [
      {
        title: 'Start from the engineer’s own parts',
        before: 'New users started cold, with help in static documentation, and 71% left in their first week.',
        chose: 'A guided first project built from the engineer’s own component library, with tips in context at each step.',
        why: 'Engineers trust parts they already use. Seeing the AI work with their own library showed where it fits their workflow, the gap every interview pointed to.',
        tradeoff: 'Bringing a library in is a step before the first design, so the guided project starts small and the rest of the library follows later.',
      },
      {
        title: 'Three panes: your input, the AI’s suggestions, the checks',
        before: 'There was no clear line between what an engineer put in and what the AI suggested.',
        chose: 'A workspace shell with three panes, input, AI suggestions and validation output, side by side.',
        why: 'Engineers answer for every part on the board. Giving the AI’s suggestions their own pane lets them accept, change or reject each one.',
        tradeoff: 'Three panes need a wide screen, so the analysis views open inside the panes rather than on new pages.',
        images: [{ img: c('EppeMWBHHRSaR1neLbFIg4CdppY'), alt: 'Workspace with the power tree above the bill of materials', label: 'Workspace' }],
      },
      {
        title: 'Analysis beside the design, not after it',
        before: 'Checking a design meant leaving it for separate reports.',
        chose: 'The power tree, bill of materials and efficiency curves sit beside the design, and each component opens to its schematic and electrical specs.',
        why: 'An engineer accepts a suggestion only once the numbers hold up. Seeing them in place turns the AI’s output into a design they can sign off.',
        tradeoff: 'These are dense views for a dense job, so the power tree leads and detail opens on demand.',
        images: [
          { img: c('4iQLGuyVperGb93vQKmOax8PD7A'), alt: 'Efficiency curves across load', label: 'Efficiency' },
          { img: c('8DIFSsfVi4pR5CfcRlmFB6MEnjI'), alt: 'Component detail with schematic and electrical specs', label: 'Component' },
        ],
      },
      {
        title: 'Count the first design, not the sign-up',
        before: 'A sign-up looked like success, and hid that most new users never finished a design.',
        chose: 'Activation means completing a first schematic in week one, tracked with time to first design and trial-to-paid conversion.',
        why: 'A first schematic is the moment the product proves its value. A sign-up proves nothing.',
        tradeoff: 'The stricter definition made the starting point look worse, 29%, but it showed exactly what to fix.',
      },
    ],
  },
  impact: {
    title: 'More engineers reached a first design, faster',
    caveat: 'Activation means completing a first schematic in week one. The sales team reported the conversion change in the first quarter after release.',
    // Inferred: the reflection; Turi to confirm or rewrite.
    reflection: [
      'I would watch new engineers try the guided project before release, not only interview them before it. The 12 interviews showed where people gave up; watching the fix in use would have shown sooner what still confused them.',
      'Next, I would follow engineers past their first design: how many come back for a second board, and how many of the AI’s suggestions they keep. Activation shows they start; those numbers show they trust it.',
    ],
    stats: [
      { value: '62%', label: 'Week-one activation', note: 'Up from 29%. Activation means completing a first schematic.' },
      { value: '18 min', label: 'Time to first design', note: 'Down from 47 minutes.' },
      { value: '2x', label: 'Trial-to-paid conversion', note: 'Reported by the sales team in the first quarter.' },
      { value: 'US$900k', label: 'Funding raised', note: 'After the redesign, with a pitch deck I designed and the new onboarding as its demo.' },
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
  // Staged scenes generated in Figma: one hardware engineer's week in a London lab.
  // Only one is a mockup (the desk), with the real power tree workspace composited on.
  interludes: [
    {
      after: 0,
      img: c('circuitmind-story-brief'),
      alt: 'A hardware engineer at a lab bench sketching a circuit block diagram in a notebook, a bare circuit board and test equipment beside her.',
      time: 'Monday, 09:10',
      line: 'A new board to design, starting from a block diagram in a notebook.',
    },
    {
      after: 2,
      img: c('circuitmind-story-design'),
      alt: 'Over the engineer’s shoulder: Circuit Mind’s power tree and bill of materials on her monitor.',
      time: 'Monday, 10:30',
      line: 'Her own parts in, and the AI’s suggestions back in their own pane, with the power tree beside them.',
    },
    {
      after: 3,
      img: c('circuitmind-story-review'),
      alt: 'Two engineers at a lab bench reviewing a prototype board under a magnifier lamp.',
      time: 'Wednesday, 14:00',
      line: 'The numbers hold up, so the team signs the design off.',
    },
    {
      after: 4,
      img: c('circuitmind-story-board'),
      alt: 'A hand holding a freshly assembled circuit board, its green status light on.',
      time: 'Friday, 16:45',
      line: 'The first boards are back, and they power up.',
    },
  ],
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
  website: [{ label: 'fantasy1.app', href: 'https://fantasy1.app/' }],
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
  website: [{ label: 'myapp.rhapsodyofrealities.org', href: 'https://myapp.rhapsodyofrealities.org/' }],
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
    { label: 'Category', value: 'Telemedicine apps' },
    { label: 'Company', value: 'Heckerbella' },
    { label: 'Role', value: 'Lead designer' },
    { label: 'Year', value: '2023' },
  ],
  website: [
    { kind: 'For patients', label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.tendarly.tendarly_patient&hl=en' },
    { kind: 'For doctors', label: 'App Store', href: 'https://apps.apple.com/us/app/tendarly-doctor/id6470204751' },
  ],
  overview: {
    statement: 'An assistant takes your history. A real doctor takes the call.',
    body: [
      'Tendarly is a telemedicine service in two apps. Patients describe their symptoms to an AI assistant, then talk to an available doctor in real time. Doctors run their consultations, notes and hours from Tendarly Doctor.',
      // Inferred: that the doctor app's design was in Turi's scope; the original copy lists doctor dashboards among the features.
      'At Heckerbella I led the design for both apps with the internal team assigned to the project, guided by our design team lead. Both are live on the app stores.',
    ],
  },
  problem: {
    // Inferred: the original copy does not state the problem.
    statement: 'Seeing a doctor meant waiting, repeating your story, and losing the record afterwards.',
    points: [
      { title: 'Slow access', line: 'Patients wait to reach any doctor at all.' },
      { title: 'Repeated history', line: 'Symptoms are explained from scratch at every visit.' },
      { title: 'Lost records', line: 'Notes and prescriptions don’t stay with the patient.' },
      { title: 'Limited reach', line: 'Doctors only see the patients who can get to them.' },
    ],
  },
  solution: {
    statement: 'Tell an assistant once, reach an available doctor, and leave with the note.',
    points: [
      { title: 'Tell your story once', line: 'The assistant gathers symptoms before the call, and the doctor reads them first.' },
      { title: 'A doctor without the wait', line: 'Start a session with any available doctor, or search for one you trust.' },
      { title: 'Leave with a record', line: 'Diagnosis, advice and prescription stay in the app, ready to download.' },
      { title: 'Doctors work from anywhere', line: 'Doctors set their hours, consult and write notes in Tendarly Doctor.' },
    ],
  },
  role: {
    summary: 'I led the design with the project’s internal team, guided by Heckerbella’s design team lead.',
    owned: ['Product design', 'Conversational UX', 'Wireframes', 'Design system', 'UI design', 'Prototyping', 'Design handoff'],
    stops: [
      {
        stage: 'Intake',
        did: ['Designed the assistant’s greeting and the pre-session chat that gathers symptoms for the doctor'],
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
        did: ['Designed the route to a doctor: any available doctor first, search second, and the fee explained before the session'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('zC9L9pOD28UerxtJgwjb5WM3Yk'), alt: 'Start a session or search for a doctor' },
            { img: c('lp316SCuTVyD0EHeMBjibjcAUE'), alt: 'The consultation fee, explained before the session' },
            { img: c('ohfo1MXEdgMicY1iU8tqrcPDxY'), alt: 'Connecting to an available doctor' },
          ],
        },
      },
      {
        stage: 'Consult',
        did: ['Designed doctor profiles with ratings and reviews, and a free first session for new patients'],
        artefact: {
          kind: 'images',
          format: 'mobile',
          images: [
            { img: c('Gc4CDBfDDSOT2pbh8E1bmvi5sg'), alt: 'Doctor profile with rating and reviews' },
            { img: c('Gnp6OwHdnqoVJjyNjY7KTBqO1cE'), alt: 'Free first session coupon' },
          ],
        },
      },
      {
        stage: 'Record',
        did: ['Structured the doctor’s final note: observation, diagnosis and recommendation, with the prescription and a download'],
        artefact: { kind: 'images', format: 'mobile', images: [{ img: c('vg2t5f405utpIi8J6oHofBJX6rk'), alt: 'Final consultation note' }] },
      },
      {
        stage: 'Lead',
        did: [
          'Led the design with the internal team assigned to the project, from wireframes to launch',
          // Inferred: how the reviews ran, and that one design system covered both apps; the original copy names prototypes for internal review and a cohesive design system.
          'Took each flow to review as an interactive prototype, with guidance from Heckerbella’s design team lead',
          'Built one design system for the patient and doctor apps, so engineers built both from the same components',
        ],
        artefact: { kind: 'chips', items: ['Interactive prototypes', 'Design reviews', 'Design system'] },
      },
      {
        stage: 'Launch',
        did: ['Both apps launched: Tendarly for patients on Google Play, and Tendarly Doctor on the App Store'],
        artefact: { kind: 'chips', items: ['Google Play', 'App Store', 'Live since 2023'] },
      },
    ],
    // No earlier versions survive, so "before" describes the usual way, and the images are final screens.
    // Inferred: the before, why and trade-off lines; Turi to confirm.
    decisions: [
      {
        title: 'The assistant listens, the doctor decides',
        before: 'In a clinic or on a call, the patient explains everything from the start, in the time they are paying for.',
        chose: 'An assistant takes symptoms in a short pre-session chat and passes them on. The doctor’s first message confirms they have read them.',
        why: 'The paid minutes go to care rather than history, and the patient tells their story once.',
        tradeoff: 'A chat before the call is one more step, so it stays short, never diagnoses, and ends by connecting a doctor.',
        images: [
          { img: c('DaYzve7eKT6Bto845mtxV3QER8'), alt: 'Pre-session chat with the assistant', label: 'Intake' },
          { img: c('jW9Id3dkbO3SQe1Xl3vUjVMxhc'), alt: 'Active session, with the doctor’s first message confirming the reported symptoms', label: 'Hand-over' },
        ],
      },
      {
        title: 'Any available doctor first',
        before: 'Most telemedicine apps open on a directory of doctors, so getting help starts with choosing one.',
        chose: 'Home leads with Start a session, which connects the next available doctor. Search for a specific doctor sits second.',
        why: 'Someone who feels unwell wants a doctor soon more than a choice of doctors.',
        tradeoff: 'Patients don’t pick their doctor on the fast route, so the match arrives with a name, a photo, ratings and reviews.',
        images: [
          { img: c('zC9L9pOD28UerxtJgwjb5WM3Yk'), alt: 'Home: start a session or search for a doctor', label: 'Home' },
          { img: c('ohfo1MXEdgMicY1iU8tqrcPDxY'), alt: 'Connecting to an available doctor', label: 'Matching' },
          { img: c('Gc4CDBfDDSOT2pbh8E1bmvi5sg'), alt: 'The matched doctor’s profile, rating and reviews', label: 'Profile' },
        ],
      },
      {
        title: 'The fee up front, the first session free',
        before: 'A fee that appears after the consultation comes as a surprise, and a new service asks for trust before it has earned any.',
        chose: 'The fee is explained in plain words before the session starts, and a new patient’s first consultation is free.',
        why: 'Nobody should finish a consultation unsure what it costs. A free first session lets people try a doctor on a phone before paying for one.',
        tradeoff: 'A payment step comes before care. The explanation can be hidden once read, and the coupon takes the cost out of a first visit.',
        images: [
          { img: c('lp316SCuTVyD0EHeMBjibjcAUE'), alt: 'The consultation fee, explained before the session', label: 'Fee' },
          { img: c('Gnp6OwHdnqoVJjyNjY7KTBqO1cE'), alt: 'Free first session coupon', label: 'First session' },
        ],
      },
      {
        title: 'A note the patient keeps',
        before: 'Advice given on a call is easy to forget, and the next doctor starts from nothing.',
        chose: 'Each consultation closes with a final note in three parts, observation, diagnosis and recommendation, plus the prescription, which the patient can download.',
        why: 'The patient leaves with something a pharmacist or another doctor can read, and the history grows with every visit.',
        tradeoff: 'Doctors write more after each call, so the note is a fixed structure to fill in, not a blank page.',
        images: [{ img: c('vg2t5f405utpIi8J6oHofBJX6rk'), alt: 'Final note with observation, diagnosis, recommendation and prescription', label: 'Final note' }],
      },
    ],
  },
  impact: {
    title: 'Two apps, live on the stores',
    caveat: 'Both apps are live. I don’t have usage figures to share, so these are launch facts, not performance.',
    // Inferred: the reflection; Turi to confirm or rewrite.
    reflection: [
      'I would agree the measures before launch: time to reach a doctor, repeat consultations, and whether doctors read the intake before the call. Without them I can show that the assistant shipped, not that it made care faster.',
      'I would also design for urgent symptoms from the first wireframe. When someone describes chest pain or trouble breathing, the assistant should point them to emergency care, not a queue for a chat.',
    ],
    stats: [
      { value: '2', label: 'Apps live', note: 'Tendarly for patients on Google Play, and Tendarly Doctor on the App Store since November 2023.' },
      { value: '1', label: 'Designer, end to end', note: 'From wireframes to launch, guided by Heckerbella’s design team lead.' },
    ],
  },
  screens: {
    title: 'Hi-fi screens',
    format: 'mobile',
    groups: [
      {
        title: 'Before the call',
        shots: [
          { img: c('CBC5dl58Z9KnCA38TARH1UhppDw'), caption: 'Splash screen.' },
          { img: c('yyUuhJ2yJokcchgViER5aNmOqU'), caption: 'The assistant introduces itself.' },
          { img: c('zC9L9pOD28UerxtJgwjb5WM3Yk'), caption: 'Start a session or search for a doctor.' },
          { img: c('DaYzve7eKT6Bto845mtxV3QER8'), caption: 'Pre-session chat with the assistant.' },
          { img: c('lp316SCuTVyD0EHeMBjibjcAUE'), caption: 'The fee, explained before the session.' },
          { img: c('Gnp6OwHdnqoVJjyNjY7KTBqO1cE'), caption: 'Free first session.' },
          { img: c('ohfo1MXEdgMicY1iU8tqrcPDxY'), caption: 'Connecting to an available doctor.' },
        ],
      },
      {
        title: 'With the doctor',
        shots: [
          { img: c('Gc4CDBfDDSOT2pbh8E1bmvi5sg'), caption: 'Doctor profile, rating and reviews.' },
          { img: c('jW9Id3dkbO3SQe1Xl3vUjVMxhc'), caption: 'An active session: the doctor has read the symptoms.' },
          { img: c('vg2t5f405utpIi8J6oHofBJX6rk'), caption: 'The doctor’s final note.' },
        ],
      },
    ],
  },
  // Staged scenes generated in Figma. Only one is a mockup (the kitchen), with the real pre-session chat composited on.
  interludes: [
    {
      after: 0,
      img: c('tendarly-story-morning'),
      alt: 'A man sitting on the edge of his bed in the early morning, coughing into his fist.',
      time: 'Tuesday, 06:50',
      line: 'Two weeks of a cough that won’t clear, and no time for a clinic queue before work.',
    },
    {
      after: 2,
      img: c('tendarly-story-intake'),
      alt: 'The same man in his kitchen, holding up a phone with Tendarly’s pre-session chat open.',
      time: 'Tuesday, 07:05',
      line: 'He tells the assistant his symptoms once, while the kettle boils.',
    },
    {
      after: 3,
      img: c('tendarly-story-doctor'),
      alt: 'A doctor in a white coat at her desk, talking to a patient on a laptop.',
      time: 'Tuesday, 07:12',
      line: 'A doctor picks up, already reading what he reported.',
    },
    {
      after: 4,
      img: c('tendarly-story-pharmacy'),
      alt: 'At a pharmacy counter, the man shows his phone to a pharmacist holding an inhaler.',
      time: 'Tuesday, 12:30',
      line: 'At lunch, the pharmacist reads his prescription from the final note.',
    },
  ],
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

export const caseStudies: Record<string, CaseStudy> = {
  wayfinder,
  whodeygo,
  outout,
  cwook,
  jaa,
  axe,
  azuri,
  circuitmind,
  fantasy,
  tendarly,
  rhapsody,
  lemonsplit,
};
