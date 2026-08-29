/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ─── BRAND LOGOS ─────────────────────────────────────────────────────────────
// Supplied artwork is boxed: each logo has a baked-in solid background
// (black, orange, pink). <MonoLogo> keys that background out at runtime and
// re-renders the mark in one flat colour, so they read as a single set.
import brandBelushis     from './Assets/Brands Worked/brand-belushis.png';
import brandBoxpark      from './Assets/Brands Worked/brand-boxpark.png';
import brandDirtyMartini from './Assets/Brands Worked/brand-dirtymartini.png';
import brandJubel        from './Assets/Brands Worked/brand-jubel.png';
import brandLightbox     from './Assets/Brands Worked/brand-lightbox.png';
import brandSimmons      from './Assets/Brands Worked/brand-simmons.png';

// ─── ROSTER PHOTOGRAPHY ──────────────────────────────────────────────────────
// Primary photos (artist portraits)
import djAppzPhoto from './Assets/Roster/djappz/djappz-artist.png';
import jordanPhoto from './Assets/Roster/Jordan/Jordan-artist.png';
import djRamosPhoto from './Assets/Roster/djramos/DJRamos-artist.png';

// DJ Appz secondary images
import djAppzPrivate from './Assets/Roster/djappz/djappz-private.jpeg';
import djAppzWedding from './Assets/Roster/djappz/djappz-wedding2.jpg';

// Jordan secondary images
import jordanDj from './Assets/Roster/Jordan/jordan-Dj.jpeg';
import jordanKeni from './Assets/Roster/Jordan/jordan-keni2.jpeg';

// DJ Ramos secondary images
import djRamos1 from './Assets/Roster/djramos/DJRamos1.jpeg';
import djRamos2 from './Assets/Roster/djramos/DJRamos2.jpeg';

// ─── ABOUT PAGE PHOTOGRAPHY ──────────────────────────────────────────────────
// emmanuel-portrait.jpg is a 3:4 head-and-shoulders crop of the source (Emmanuel
// bio.jpeg, kept as the master and deliberately not imported — a 943x2048 studio
// shot with a black letterbox bar and a lot of plain t-shirt below the face).
// Cropped rather than left to CSS: the frame's aspect is close enough to the
// source's own that object-position alone couldn't get the face to fill the
// notehead — most of the frame would just show shirt.
import emmanuelPhoto from './Assets/About bio/emmanuel-portrait.jpg';
// jesse-portrait.jpg / aleks-portrait.jpg are cropped/compressed derivatives
// of Jesse-bio.png (1086x1448) and Aleks-bio.png (1254x1254) — both kept as
// masters, not imported (1.8-1.9MB PNGs, far too heavy to ship for a 260px
// frame). Jesse's original had a lot of empty backdrop above/below the
// subject, so it's cropped to head-and-shoulders; Aleks's was already a
// well-framed square, so this is a straight resize, no crop.
import jessePhoto from './Assets/About bio/jesse-portrait.jpg';
import aleksPhoto from './Assets/About bio/aleks-portrait.jpg';

// ─── PHOTOGRAPHY ─────────────────────────────────────────────────────────────
// Web-sized derivatives of the originals in this folder. The masters
// (WeddingDance2 (1)/(2).jpg, 6000x4000 and 5114x3403, 5.1MB together) are kept
// for re-exporting but must NOT be imported — they would ship to the browser.
//   hero-dancefloor.jpg   2400x1600  538KB   (was 3.4MB)
//   intro-dancefloor.jpg  1400x932   146KB   (was 1.7MB)
import heroPhoto  from './Assets/Cover Art/hero-dancefloor.jpg';
import introPhoto from './Assets/Cover Art/intro-dancefloor.jpg';

// Services page. Each stock photo was picked for the mood of its service, not
// just "a DJ photo": residencies reads as the ongoing club atmosphere, events
// as an energetic branded night, corporate as a polished smart-casual crowd,
// private as an intimate, gear-forward gathering. A fifth stock photo supplied
// alongside these ("Fun Disco.jpg") is a poolside/festival shot with revealing
// attire — not a fit for this client-facing, B2B page, so it's left unused here.
import serviceResidencies from './Assets/Cover Art/service-residencies.jpg';
import serviceEvents      from './Assets/Cover Art/service-events.jpg';
import serviceCorporate   from './Assets/Cover Art/service-corporate.jpg';
import servicePrivate     from './Assets/Cover Art/service-private.jpg';

// ─── EMAILJS CONFIG ──────────────────────────────────────────────────────────
const EJS = {
  serviceId:       'service_vkwuxrb',
  templateNotify:  'template_gg8tzfi',       // notification to Virtuoso team
  templateReply:   'template_c8zw31j',       // auto-reply to venue contact
  publicKey:       'iBIZDGwpqbEmiXcCW',
};

// ─── ROSTER DATA ─────────────────────────────────────────────────────────────
// photo / photoDecks / mixcloudEmbed: replace nulls with imported assets
// e.g. import dj1photo from './Assets/roster-dj1.jpg'
//
// `draft: true` keeps an entry out of the live site — nothing renders until the
// real details are in. Delete the flag to publish an artist.
//
// `focus` is the CSS object-position used wherever the photo is cropped. Roster
// images are cropped to squares, 3:4 cards and tall panels, and a plain centre
// crop lands on the torso of a full-length shot. Set this to the subject's face.
const ROSTER = [
  {
    id: 1,
    name: "DJ Appz",
    slug: "dj-appz",
    tagline: "The sound of every room.",
    bestFor: "Weddings · Corporate · Private Events · Venues",
    genres: ["R&B", "Hip-Hop", "Afrobeats", "Dancehall", "House", "Disco", "Commercial"],
    bio: "A London DJ and former professional dancer, Appz came to the booth from the floor — and it shows in how he works a room. Five years in, his sets move through R&B, hip-hop, afrobeats, dancehall and house, built around reading a crowd rather than running a prepared tracklist. He is a regular across some of London’s busiest rooms, including Boxpark, Dirty Martini, Lightbox Vauxhall, Simmons Bars, All Bar One and Proper Snacks, alongside weddings, private parties and corporate events UK-wide. For venues, that means a DJ who holds a floor on a quiet Thursday as reliably as a full Saturday.",
    photo: djAppzPhoto,
    secondaryPhotos: [djAppzPrivate, djAppzWedding],
    photoDecks: null,     // import djAppzDecks from ‘./Assets/Roster/djappz-decks.jpg’
    focus: "50% 8%",      // photo is already 3:4, so this only bites on square crops (nav thumbnail)
    face:  "43% 44%",     // where his face sits in the frame — used by the thumbnail
    thumbZoom: 1.4,       // push in for the 32px nav thumbnail only
    instagram: "@djappz",
    videos: [
      {
        title: 'DJ Appz Reel',
        embed: 'https://www.youtube.com/embed/tcQXc_Lp8yE',
        height: 600,
      },
      {
        title: 'KFC & Proper Corn Brand Launch Campaign',
        embed: 'https://www.youtube.com/embed/OOB4K2lTrxQ',
        height: 600,
      },
    ],
    mixes: [
      {
        title: 'Retune Episode 3 — R&B, Hip-Hop, 90s & 2000s',
        embed: 'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FDJAppz%2Fretune-episode-3-rnb-hip-hop-90s-2000s%2F',
      },
      {
        title: 'Retune — Brixton Radio (Dancehall, Hip-Hop)',
        embed: 'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fbrixtonradiolive%2Fretune-271225%2F',
      },
      {
        title: 'Retro — 70s, 80s & 90s',
        embed: 'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FDJAppz%2F70s-80s-90s-mix%2F',
      },
    ],
    mixcloudEmbed: null,  // superseded by `mixes` above
    mixcloudUser: 'DJAppz',
    website: 'https://www.dj-appz.com/',
  },
  {
    id: 2,
    name: "Jordan",
    slug: "jordan",
    tagline: "From the dance floor to the decks.",
    bestFor: "Private Events · Venues",
    genres: ["Commercial", "Latin", "Pop"],
    bio: "Jordan brings a dancer’s instinct to the booth — before DJing, he competed and won at UK dance championships and performed for Monster Energy, and that read of a room shows in every set. Since launching his residency at Simmons Bar in October 2023, he has built a fast-growing reputation across London’s Latin, commercial and pop-leaning nightlife, adding a residency at Lightbox Vauxhall alongside BAILE TRAMA, ITSAFLIP, BAILE LONDON, Brixton Radio and the UK’s largest Latin festival. For venues, that means a DJ who carries a themed Latin night and a mainstream commercial floor with equal confidence.",
    photo: jordanPhoto,
    secondaryPhotos: [jordanDj, jordanKeni],
    photoDecks: null,
    instagram: "@jordanblack_o",
    mixes: [
      {
        title: 'Listen on SoundCloud',
        embed: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user75551272&color=%23785417&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false',
        height: 300,   // SoundCloud's profile widget needs more room than Mixcloud's compact bar
      },
    ],
    mixcloudEmbed: null,
    mixcloudUser: null,
  },
  {
    draft: true,   // template — fill in and remove this flag to publish
    id: 3,
    name: 'DJ [NAME 3]',
    slug: 'dj-name-3',
    tagline: '[Short punchy tagline]',
    genres: ['Hip-Hop', 'Dancehall', 'UK Rap'],
    bio: '[Full bio for DJ 3.]',
    photo: null,
    photoDecks: null,
    instagram: '@[handle3]',
    mixcloudEmbed: null,
    mixcloudUser: '[mixcloud-username-3]',
  },
  {
    draft: true,   // template — fill in and remove this flag to publish
    id: 4,
    name: 'DJ [NAME 4]',
    slug: 'dj-name-4',
    tagline: '[Short punchy tagline]',
    genres: ['Drum & Bass', 'Jungle', 'Garage'],
    bio: '[Full bio for DJ 4.]',
    photo: null,
    photoDecks: null,
    instagram: '@[handle4]',
    mixcloudEmbed: null,
    mixcloudUser: '[mixcloud-username-4]',
  },
  {
    draft: true,   // template — fill in and remove this flag to publish
    id: 5,
    name: 'DJ [NAME 5]',
    slug: 'dj-name-5',
    tagline: '[Short punchy tagline]',
    genres: ['Commercial', 'Pop', 'Chart'],
    bio: '[Full bio for DJ 5.]',
    photo: null,
    photoDecks: null,
    instagram: '@[handle5]',
    mixcloudEmbed: null,
    mixcloudUser: '[mixcloud-username-5]',
  },
  {
    draft: true,   // template — fill in and remove this flag to publish
    id: 6,
    name: 'DJ [NAME 6]',
    slug: 'dj-name-6',
    tagline: '[Short punchy tagline]',
    genres: ['Latin', 'Reggaeton', 'Afro House'],
    bio: '[Full bio for DJ 6.]',
    photo: null,
    photoDecks: null,
    instagram: '@[handle6]',
    mixcloudEmbed: null,
    mixcloudUser: '[mixcloud-username-6]',
  },
  {
    id: 7,
    draft: true,
    name: 'DJ Pierre',
    slug: 'dj-pierre',
    tagline: 'Sleek, seamless, every set.',
    genres: ['House', 'R&B', 'Commercial', 'Pop', 'Retro'],
    // Archived — not currently available
    bio: 'DJ Pierre has built his reputation behind the decks in bars across London — including Dirty Martini, Boom Battle Bar and London Cocktail Club — with a body of work that extends UK-wide. Wherever the booking, his sets stay sleek and seamless — a through-line across a broad range that spans house, R&B, commercial, pop, retro and more. For venues, that versatility means one DJ who can hold a varied crowd rather than a single narrow lane.',
    photo: null,
    photoDecks: null,
    instagram: '@[handle]',
    mixes: [],
    mixcloudEmbed: null,
    mixcloudUser: '[mixcloud-username]',
  },
  {
    id: 8,
    name: "DJ Ramos",
    slug: "dj-ramos",
    tagline: "25+ years of open format mastery.",
    bestFor: "Weddings · Corporate · Private Events · Venues",
    genres: ["Hip-Hop", "R&B", "House", "Afrobeats", "Dancehall", "Garage", "Disco", "Commercial"],
    bio: "DJ Ramos has been an open format DJ for 25+ years. Playing across a variety of popular bars and clubs around London, such as Ministry of Sound, Bar Solo, and Scarla.\n\nAlso a professional and experienced DJ for corporate events, previously mixing for companies such as Google and Mattel. Mixing for The Jump Off gave DJ Ramos the platform to showcase his free styling talents on the turntables, whilst contestants battled on the dance floor. DJ Ramos was also part of the Sony BMG street team back in 2005, working with Hip-Hop and RnB artists like Chris Brown and Ciara. In his spare time he's also a videographer and has worked with artists such as RnB singer Lloyd, NDubz & British actress Thandiwe Newton. Whilst his musical taste is deeply rooted in Hip-hop, he is not limited to just this genre. Being very experienced in DJing at weddings and special occasions, he is very talented in mixing and playing an eclectic range of music. DJ Ramos can deliver a range of top tunes to create a buzzing atmosphere and keep any crowd on the dance floor.",
    photo: djRamosPhoto,
    secondaryPhotos: [djRamos1, djRamos2],
    photoDecks: null,     // import djRamosDecks from './Assets/Roster/djramos-decks.jpg'
    focus: "50% 15%",     // photo is portrait-oriented, face centered
    face:  "50% 35%",     // where his face sits in the frame
    thumbZoom: 1.6,       // push in for the 32px nav thumbnail
    instagram: "@[handle]",
    mixes: [],
    mixcloudEmbed: null,
    mixcloudUser: '[mixcloud-username]',
  },
];

// Everything on the site renders from this list, so unfinished template entries
// can never reach a visitor. Add real details and drop `draft` to publish.
const LIVE_ROSTER = ROSTER.filter(dj => !dj.draft);

// Unfilled fields in this file are written as '[like this]'. A published artist
// can still have gaps, so treat those as empty rather than printing the bracket
// text to visitors.
// Matches anywhere in the string, so '@[handle]' counts as unfilled too.
const filled = v => (typeof v === 'string' && /\[[^\]]*\]/.test(v) ? null : v) || null;

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    title: 'Weddings',
    icon: '◈',
    tagline: 'From the first entrance to the final record.',
    description: 'Premium DJ services for your wedding day. From ceremony to celebration, we create the perfect soundtrack for your special moments.',
    features: ['Bespoke setlists', 'Seamless coordination', 'Dedicated attention'],
    photo: servicePrivate,
  },
  {
    id: 2,
    title: 'Birthdays & Private Events',
    icon: '◉',
    tagline: 'A soundtrack built around the people in the room.',
    description: 'Create the perfect atmosphere for your celebration. Whether intimate or lavish, we tailor the music to match your guests and the vibe you want.',
    features: ['Guest-focused curation', 'Flexible setlists', 'Luxury presentation'],
    photo: serviceEvents,
  },
  {
    id: 3,
    title: 'Corporate & Brand Events',
    icon: '◇',
    tagline: 'Professional, adaptable and audience-aware.',
    description: 'Premium entertainment for corporate events, product launches, and brand experiences. Polished talent calibrated to your audience and objectives.',
    features: ['Professional presentation', 'Audience adaptation', 'Seamless integration'],
    photo: serviceCorporate,
  },
  {
    id: 4,
    title: 'Venues & Residencies',
    icon: '◎',
    tagline: 'Consistent programming and DJs who understand the room.',
    description: 'Build a signature sound for your venue. From residencies to one-off events, we handle talent, scheduling, and logistics while you focus on your guests.',
    features: ['Curated talent matching', 'Flexible scheduling', 'Consistent brand alignment'],
    photo: serviceResidencies,
  },
];

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How does a venue partnership with Virtuoso Collective work?",
    a: "We begin with a discovery call to understand your venue, audience, and goals. From there we propose a tailored entertainment package — residency, one-off events, or a hybrid. Once agreed, we handle talent, scheduling, and logistics while you remain the decision-maker throughout.",
  },
  {
    q: "Can we choose which DJ from your roster performs at our venue?",
    a: "Absolutely. We'll present you with matched talent based on your venue profile and guest demographic, but the final choice is always yours. You can also request auditions or trial sets before committing.",
  },
  {
    q: "What geographic areas do you cover?",
    a: "We're primarily based around the Greater London area, and that's where most of our residencies and events sit. We can also provision DJs for cities across the UK given ample notice — get in touch with your dates and location and we'll let you know what's possible.",
  },
  {
    q: "Do you provide sound and production equipment?",
    a: "Our DJs arrive with personal performance setups. For full production requirements — PA, lighting, staging — we work with trusted suppliers and can coordinate this as part of a full event production package.",
  },
  {
    q: "What's the minimum commitment for a residency?",
    a: "We typically propose an initial three-month trial period, allowing both parties to assess fit before committing to a longer arrangement. One-off bookings are also available.",
  },
  {
    q: "How quickly can you staff an event?",
    a: "For planned events we recommend four to six weeks' notice. For urgent bookings, contact us directly — subject to availability, we can often move within 72 hours.",
  },
  {
    q: "Can I provide my own playlist?",
    a: "Absolutely! I actively encourage you to provide a playlist. Whether it's big or small, anywhere from 20 to 200 songs, it helps to put a microscope on exactly the music you love. I will then use it as a blueprint to compliment it. You may also provide genres.",
  },
];

// ─── PARTNERS / BRAND LOGOS ───────────────────────────────────────────────────
// Rendered by <BrandPanel /> directly beneath the hero, always in black & white.
// Replace nulls with: import brand1 from './Assets/brand-[venue].png'
// Until a logo is supplied the brand renders as a monochrome wordmark, so the
// panel is populated and legible with no assets at all.
const PARTNERS = [
  { name: 'Belushi’s',     logo: brandBelushis },
  { name: 'Boxpark',       logo: brandBoxpark },
  { name: 'Dirty Martini', logo: brandDirtyMartini },
  { name: 'Jubel',         logo: brandJubel },
  { name: 'Lightbox',      logo: brandLightbox },
  { name: 'Simmons Bars',  logo: brandSimmons },
];

// ─── STATS ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 'Premium', label: 'Curated DJ Roster' },
  { value: '100+', label: 'Events Across Our Collective' },
  { value: '20+', label: 'Venues Worked With' },
  { value: '25+', label: 'Years of Combined Experience' },
];

// ─── COLOUR TOKENS ───────────────────────────────────────────────────────────
// Every text pairing below is WCAG 2.1 AA (>=4.5:1); UI lines meet 3:1.
// Ratios noted per token — re-check with scripts/audit-contrast.mjs if you change one.
const C = {
  // Surfaces
  ivory:    '#f5f0e8',
  stone:    '#ebe5da',
  white:    '#ffffff',
  nearBlack:'#171512',

  // Text
  ink:      '#171512',  // primary   — 16.1:1 on ivory, 14.5:1 on stone
  mid:      '#4a4540',  // secondary —  8.4:1 on ivory,  7.6:1 on stone
  onDark:   'rgba(255,255,255,0.78)', // secondary on nearBlack — 11.3:1

  // Gold, split by job. Small-text gold must be dark; the brand gold is
  // reserved for fills and rules, where it never has to pass 4.5:1.
  goldText:  '#785417', // gold TEXT on light   — 6.0:1 ivory, 5.4:1 stone
  goldOnDark:'#d6a95c', // gold TEXT on dark    — 8.4:1 on nearBlack
  goldSolid: '#8c641e', // FILL behind white text — 5.3:1
  gold:      '#a97b2e', // decorative rules/borders only (3.3:1) — never text
  goldLight: 'rgba(140,100,30,0.12)',
  line:      'rgba(140,100,30,0.22)',
};

// ─── TYPE SCALE ──────────────────────────────────────────────────────────────
// One scale, eleven steps. Nothing below 0.8125rem (13px), body sits at 16px.
// Use these tokens — do not hand-write a fontSize.
const T = {
  micro: '0.8125rem',                        // 13 — tracked uppercase labels
  small: '0.875rem',                         // 14 — captions, meta
  body:  '1rem',                             // 16 — default
  lead:  '1.125rem',                         // 18 — intro paragraphs
  lg:    '1.25rem',                          // 20
  xl:    '1.5rem',                           // 24
  h4:    '1.75rem',                          // 28
  h3:    'clamp(1.5rem, 3vw, 2rem)',         // 24–32
  h2:    'clamp(1.875rem, 4vw, 2.5rem)',     // 30–40
  h1:    'clamp(2.25rem, 5vw, 3.25rem)',     // 36–52
  hero:  'clamp(2.75rem, 7vw, 4.5rem)',      // 44–72
  stat:  'clamp(2rem, 4vw, 2.75rem)',        // 32–44 — display numerals

  // Hero banner. Kept as named steps rather than inline clamps so the banner
  // still belongs to the scale instead of reintroducing one-off sizes.
  heroName:    'clamp(3rem, 9.5vw, 6.5rem)',        // 48–104 — "Virtuoso"
  heroSub:     'clamp(0.875rem, 2.4vw, 1.6rem)',    // 14–25.6 — "ENTERTAINMENT"
  heroTagline: 'clamp(1.25rem, 2.6vw, 1.75rem)',    // 20–28 — tagline
  statement:   'clamp(1.75rem, 4vw, 2.75rem)',      // 28–44 — editorial opener
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: ${C.ivory};
    color: ${C.nearBlack};
    font-family: 'Outfit', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Noise texture overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  h1, h2, h3, h4 {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }

  a { color: inherit; text-decoration: none; }

  ::selection {
    background: ${C.goldLight};
    color: ${C.nearBlack};
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.ivory}; }
  ::-webkit-scrollbar-thumb { background: ${C.gold}; border-radius: 3px; }

  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const GoldLine = ({ style = {} }) => (
  <div style={{ width: 40, height: 2, background: C.gold, margin: '0 auto 1.5rem', ...style }} />
);

// `onDark` swaps to the light gold — the dark-surface gold text token.
// Gold on near-black only reaches 2.7:1 without it.
const SectionLabel = ({ children, onDark = false }) => (
  <p style={{
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 600,
    fontSize: T.micro,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: onDark ? C.goldOnDark : C.goldText,
    marginBottom: '0.75rem',
  }}>{children}</p>
);

// Shows only the first paragraph, with a "Read More" toggle that reveals the
// rest — used on the About page so three side-by-side bios don't force the
// section to the height of the longest one by default.
function BioParagraphs({ paragraphs, note = C.goldText }) {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = paragraphs;
  return (
    <>
      <p style={{ color: C.mid, lineHeight: 1.9, marginBottom: rest.length ? '1.1rem' : 0 }}>{first}</p>
      {expanded && rest.map((para, i) => (
        <p key={i} style={{ color: C.mid, lineHeight: 1.9, marginBottom: i < rest.length - 1 ? '1.1rem' : 0 }}>{para}</p>
      ))}
      {rest.length > 0 && (
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            display: 'block', marginTop: '0.85rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: note, transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >{expanded ? 'Read Less' : 'Read More'}</button>
      )}
    </>
  );
}

// ─── WORDMARK ─────────────────────────────────────────────────────────────────
// V♩RTUOSO — the quaver stands in for the "I". Everything is sized in `em` so
// the note tracks whatever font-size the caller sets, and the accessible name
// restores the real word (the visible glyphs only spell "VRTUOSO").
function Wordmark({ colour = C.nearBlack, note = C.goldSolid, style = {} }) {
  return (
    <span
      role="img"
      aria-label="Virtuoso"
      style={{ fontStyle: 'italic', display: 'inline-flex', alignItems: 'baseline', gap: 0, lineHeight: 1, ...style }}
    >
      <span style={{ color: colour }}>V</span>
      <span aria-hidden="true" style={{
        display: 'inline-block', position: 'relative',
        width: '0.375em', height: '1.5em',
        marginLeft: '-0.027em', marginRight: '0.027em',
      }}>
        <svg viewBox="0 0 14 56" preserveAspectRatio="xMidYMax meet"
             style={{ overflow: 'visible', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}>
          <ellipse cx="3" cy="52" rx="7" ry="5" fill={note} transform="rotate(-15 3 52)" />
          <line x1="9" y1="48" x2="9" y2="2" stroke={note} strokeWidth="2.5" strokeLinecap="square" />
          <path d="M 9,2 C 20,7 21,19 13,27" fill="none" stroke={note} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </span>
      <span style={{ color: colour }}>RTUOSO</span>
    </span>
  );
}

// ─── QUAVER PHOTO FRAME ────────────────────────────────────────────────────────
// Team/roster portraits cut to a tilted oval — a nod to the wordmark's quaver
// notehead, without the stem/flag (dropped: they kept fighting the photo for
// space and never read cleanly at this size). Coordinates are fractions of
// the frame's own box (objectBoundingBox), so the shape scales cleanly at
// any size without redrawing it.
//
// The box is sized to the oval itself, not to a tall stem-shaped silhouette —
// an earlier version reserved room above the notehead for a stem that's gone
// now, which left a large empty gap of plain background at the top of every
// card for no reason.
const QUAVER_SHAPE = {
  notehead: { cx: 0.5, cy: 0.5, rx: 0.47, ry: 0.44, rotate: -8 },
};

// Rendered once per page that uses <QuaverPhoto> — every instance references
// this single clipPath by id, so it isn't duplicated per photo.
function QuaverClipDefs() {
  const { notehead: n } = QUAVER_SHAPE;
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <clipPath id="quaverPhotoMask" clipPathUnits="objectBoundingBox">
          <ellipse cx={n.cx} cy={n.cy} rx={n.rx} ry={n.ry} transform={`rotate(${n.rotate} ${n.cx} ${n.cy})`} />
        </clipPath>
      </defs>
    </svg>
  );
}

// Plain object-fit: cover — the imageScale/offsetX/offsetY transform system
// this used to need existed specifically to compensate for the old tall,
// stem-shaped box (cover-fit alone couldn't get a face to land in a narrow
// oval sitting in the bottom third of a much taller frame). With the box now
// sized to the oval itself, that problem doesn't exist — cover-fit crops a
// normal portrait into a normal-ish oval the same way it would for any other
// photo card on the site.
function QuaverPhoto({ photo, alt, placeholderLabel, facePosition = '50% 25%', maxWidth = 260 }) {
  return (
    <div style={{ maxWidth, margin: '0 auto' }}>
      <div style={{ position: 'relative', aspectRatio: '1 / 1.08' }}>
        <div style={{
          position: 'absolute', inset: 0, clipPath: 'url(#quaverPhotoMask)', overflow: 'hidden',
          background: C.stone,
        }}>
          {photo && (
            <img src={photo} alt={alt} style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: facePosition,
              // Monochrome, matching the brand-logo treatment elsewhere on the
              // site — a slight contrast lift keeps a grayscale face from
              // reading as flat/washed out.
              filter: 'grayscale(1) contrast(1.08)',
            }} />
          )}
        </div>
      </div>
      {/* Caption sits outside the clipped shape — a name/label inside the mask
          risks being cropped by the notehead's curve. */}
      {!photo && placeholderLabel && (
        <p style={{
          textAlign: 'center', marginTop: '0.75rem', color: C.mid, fontSize: T.micro,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>{placeholderLabel}</p>
      )}
    </div>
  );
}

// ─── DEV-ONLY: PHOTO ADJUSTER ───────────────────────────────────────────────
// X/Y sliders that drive a QuaverPhoto's facePosition live, plus a Save button
// that POSTs to the local endpoint in setupProxy.js, which writes the value
// straight into this file's own source. Simpler than the version this
// replaced: now that the frame is sized to fit the oval (no more tall empty
// box), positioning is just plain object-position — no scale/offset transform
// needed, so there's only X/Y to expose here.
// Only ever rendered when `process.env.NODE_ENV === 'development'` (checked
// at each call site) — CRA dead-code-eliminates that branch from production
// builds, and the save endpoint itself only exists under `react-scripts
// start` in the first place, so none of this can reach the live site either way.
function PhotoAdjuster({ personKey, value, onChange }) {
  const [status, setStatus] = useState('idle'); // idle | saving | saved | error

  const save = async () => {
    setStatus('saving');
    try {
      const res = await fetch('/__dev/save-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personKey, ...value }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Save failed');
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2500);
    } catch (e) {
      console.error('[PhotoAdjuster] save failed:', e);
      setStatus('error');
    }
  };

  const row = (label, key) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 11, fontFamily: 'monospace', color: '#666' }}>
      <span style={{ width: 52, flexShrink: 0 }}>{label}</span>
      <input
        type="range" min={0} max={100} step={1}
        value={value[key]}
        onChange={e => onChange({ ...value, [key]: parseFloat(e.target.value) })}
        style={{ flex: 1 }}
      />
      <span style={{ width: 34, textAlign: 'right', flexShrink: 0 }}>{value[key]}%</span>
    </label>
  );

  const saveLabel = status === 'saving' ? 'Saving…'
    : status === 'saved' ? 'Saved to App.js ✓'
    : status === 'error' ? 'Save failed — retry'
    : 'Save to file';

  return (
    <div style={{
      marginTop: '0.75rem', padding: '0.6rem 0.75rem', border: '1px dashed #999',
      background: '#fafafa', display: 'flex', flexDirection: 'column', gap: '0.35rem',
    }}>
      <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Dev only — adjust photo position
      </div>
      {row('Position X', 'x')}
      {row('Position Y', 'y')}
      <button
        onClick={save}
        disabled={status === 'saving'}
        style={{
          marginTop: '0.25rem', fontSize: 11, fontFamily: 'monospace', padding: '0.35rem 0.6rem',
          background: status === 'saved' ? '#2a7' : status === 'error' ? '#c33' : '#333',
          color: '#fff', border: 'none', cursor: status === 'saving' ? 'default' : 'pointer',
        }}
      >{saveLabel}</button>
    </div>
  );
}

// ─── MONOCHROME LOGO ──────────────────────────────────────────────────────────
// The supplied brand artwork is boxed — every file has a solid baked-in
// background (Belushi's/Boxpark/Dirty Martini/Lightbox on black, Jubel on
// orange, Simmons on pink). A CSS grayscale() filter cannot unify those: you
// would get four black rectangles, one grey one and one near-white one.
//
// So we normalise on a canvas instead:
//   1. Find the dominant colour by histogram — that is the baked-in background.
//      (Sampling corners is not enough; several files have letterboxed edges.)
//   2. Alpha = how far each pixel sits from that background colour, which keeps
//      the anti-aliased edges of the lettering soft.
//   3. Repaint every remaining pixel in one flat colour.
// The result is a set of uniform silhouettes that read as one system.
function monochrome(img, rgb) {
  const w = img.naturalWidth, h = img.naturalHeight;
  if (!w || !h) return null;

  const cvs = document.createElement('canvas');
  cvs.width = w; cvs.height = h;
  const ctx = cvs.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);

  let data;
  try { data = ctx.getImageData(0, 0, w, h); }
  catch { return null; }          // tainted canvas — fall back to the raw image
  const px = data.data;
  const at = (x, y) => (y * w + x) * 4;

  // 1. Dominant colour, bucketed into 32-level bins to absorb compression noise.
  const bins = new Map();
  for (let i = 0; i < px.length; i += 4) {
    if (px[i+3] < 128) continue;  // ignore already-transparent pixels
    const key = (px[i] >> 5 << 10) | (px[i+1] >> 5 << 5) | (px[i+2] >> 5);
    const b = bins.get(key) || [0,0,0,0];
    b[0] += px[i]; b[1] += px[i+1]; b[2] += px[i+2]; b[3]++;
    bins.set(key, b);
  }
  let best = null;
  for (const b of bins.values()) if (!best || b[3] > best[3]) best = b;
  if (!best) return null;
  const bg = [best[0]/best[3], best[1]/best[3], best[2]/best[3]];

  // 2. Trim letterboxing. Jubel ships with a black bar across the top which is
  //    NOT the dominant colour, so keying alone would keep it as a solid slab.
  //    Peel off edge rows/columns that are internally uniform but differ from
  //    the background.
  const dist = (i, c) => Math.hypot(px[i] - c[0], px[i+1] - c[1], px[i+2] - c[2]);
  const uniformLine = (fixed, isRow) => {
    const n = isRow ? w : h;
    const first = isRow ? at(0, fixed) : at(fixed, 0);
    const c0 = [px[first], px[first+1], px[first+2]];
    for (let k = 1; k < n; k++) {
      const i = isRow ? at(k, fixed) : at(fixed, k);
      if (dist(i, c0) > 16) return null;
    }
    return c0;
  };
  let top = 0, bottom = h - 1, left = 0, right = w - 1;
  const BAR = 46;   // how far from the background a bar must sit to be a bar
  while (top < bottom)    { const c = uniformLine(top, true);     if (c && Math.hypot(c[0]-bg[0], c[1]-bg[1], c[2]-bg[2]) > BAR) top++;    else break; }
  while (bottom > top)    { const c = uniformLine(bottom, true);  if (c && Math.hypot(c[0]-bg[0], c[1]-bg[1], c[2]-bg[2]) > BAR) bottom--; else break; }
  while (left < right)    { const c = uniformLine(left, false);   if (c && Math.hypot(c[0]-bg[0], c[1]-bg[1], c[2]-bg[2]) > BAR) left++;   else break; }
  while (right > left)    { const c = uniformLine(right, false);  if (c && Math.hypot(c[0]-bg[0], c[1]-bg[1], c[2]-bg[2]) > BAR) right--;  else break; }

  // 3. Key out the background and repaint the mark, tracking the ink bounds so
  //    we can crop away the dead margin baked into each file.
  // Every pixel is repainted, including those outside the trimmed window —
  // those are simply cleared. Repainting only the window would leave original
  // artwork alive in the padding added at step 4.
  const CUTOFF = 78;              // rgb distance at which a pixel is fully opaque
  let iL = right, iR = left, iT = bottom, iB = top;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = at(x, y);
      const inside = y >= top && y <= bottom && x >= left && x <= right;
      const a = inside ? Math.min(1, dist(i, bg) / CUTOFF) * (px[i+3] / 255) : 0;
      px[i] = rgb[0]; px[i+1] = rgb[1]; px[i+2] = rgb[2];
      px[i+3] = Math.round(a * 255);
      if (a > 0.35) {
        if (x < iL) iL = x; if (x > iR) iR = x;
        if (y < iT) iT = y; if (y > iB) iB = y;
      }
    }
  }
  if (iR <= iL || iB <= iT) return null;
  ctx.putImageData(data, 0, 0);

  // 4. Emit the cropped mark, with a small uniform breathing margin.
  const pad = Math.round(Math.max(iR - iL, iB - iT) * 0.04);
  const cw = iR - iL + 1 + pad * 2, ch = iB - iT + 1 + pad * 2;
  const out = document.createElement('canvas');
  out.width = cw; out.height = ch;
  out.getContext('2d').drawImage(cvs, iL - pad, iT - pad, cw, ch, 0, 0, cw, ch);
  // Report the cropped dimensions — optical sizing must key off the trimmed
  // mark, not the original file's padding.
  return { url: out.toDataURL('image/png'), width: cw, height: ch };
}

const hexToRgb = h => [1,3,5].map(i => parseInt(h.slice(i, i+2), 16));

function MonoLogo({ src, alt, colour = C.ink }) {
  const [mono, setMono] = useState(null);
  const [ratio, setRatio] = useState(null);   // width / height of the source art

  useEffect(() => {
    let live = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!live) return;
      const out = monochrome(img, hexToRgb(colour));
      if (out) { setMono(out.url); setRatio(out.width / out.height); }
      else setRatio(img.naturalWidth / img.naturalHeight);
    };
    img.src = src;
    return () => { live = false; };
  }, [src, colour]);

  // Optical sizing, keyed off the *trimmed* mark. Once cropped the set ranges
  // from Lightbox at ~4.9:1 to Jubel at ~1.1:1; a single height cap would make
  // the squarer marks read far smaller, so they get more height to even out
  // their apparent weight.
  const maxHeight = ratio == null ? 44 : ratio > 3.6 ? 34 : ratio > 2.4 ? 40 : ratio > 1.4 ? 50 : 62;

  return (
    <img
      src={mono || src}
      alt={alt}
      style={{
        maxHeight, maxWidth: '100%', objectFit: 'contain', display: 'block',
        // Greyscale covers the brief moment before normalisation lands, and is
        // the permanent fallback if the canvas step ever fails — the panel is
        // never showing raw brand colours. Visibility never depends on a
        // transition finishing.
        filter: mono ? 'none' : 'grayscale(1) contrast(1.1)',
      }}
    />
  );
}

// ─── BRAND PANEL ──────────────────────────────────────────────────────────────
// Sits directly beneath the hero. Strictly monochrome — every logo is repainted
// in a single ink tone, so the strip never competes with the hero or the gold
// accent. There is deliberately no colour-on-hover state.
const BrandPanel = () => (
  <section
    aria-label="Brands our DJs have worked with"
    style={{
      background: C.ivory,
      borderTop: `1px solid ${C.line}`,
      borderBottom: `1px solid ${C.line}`,
      padding: '3.5rem 2rem',
      position: 'relative',
      zIndex: 1,
    }}
  >
    <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
      <SectionLabel>Brands Our DJs Have Worked With</SectionLabel>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        alignItems: 'center',
        justifyItems: 'center',
        gap: '2.5rem 3rem',
        marginTop: '2.25rem',
      }}>
        {PARTNERS.map(p => (
          <div key={p.name} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 52, width: '100%',
          }}>
            {p.logo ? (
              <MonoLogo src={p.logo} alt={p.name} />
            ) : (
              // Wordmark fallback for brands with no artwork yet.
              // C.mid is 8.4:1 on ivory.
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: T.lead, fontWeight: 600, fontStyle: 'italic',
                color: C.mid, letterSpacing: '0.02em', lineHeight: 1.2,
              }}>{p.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ activePage, setPage, contactDropdown, setContactDropdown, mobileContactOpen, setMobileContactOpen, setPageAndScroll }) {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [rosterOpen, setRosterOpen]     = useState(false);   // desktop dropdown
  const [mobileRosterOpen, setMobileRosterOpen] = useState(false); // mobile accordion
  const rosterRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (rosterRef.current && !rosterRef.current.contains(e.target)) {
        setRosterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isRosterActive = activePage === 'Roster';

  // The bar is transparent until you scroll. On Home that means it floats over
  // the dark hero photo, where near-black links are invisible — so it flips to
  // a light-on-dark set. Every other page starts on ivory, and once scrolled the
  // bar has its own ivory background, so both of those use the dark set.
  const overHero = !scrolled && !mobileOpen && activePage === 'Home';
  const ink       = overHero ? C.white      : C.nearBlack;
  const accent    = overHero ? C.goldOnDark : C.goldText;
  const rule      = overHero ? 'rgba(255,255,255,0.5)' : C.gold;

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'background 0.4s ease, border-color 0.4s ease',
    background: scrolled ? 'rgba(245,240,232,0.96)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? `1px solid rgba(140,100,30,0.22)` : '1px solid transparent',
    // Over the hero the bar carries its own gradient scrim, so the links stay
    // legible no matter how bright the photo behind them is.
    backgroundImage: overHero
      ? 'linear-gradient(to bottom, rgba(23,21,18,0.55) 0%, rgba(23,21,18,0.28) 60%, rgba(23,21,18,0) 100%)'
      : 'none',
  };

  const linkStyle = (active) => ({
    fontFamily: 'Outfit, sans-serif', fontSize: T.small,
    fontWeight: active ? 600 : 500, letterSpacing: '0.08em', textTransform: 'uppercase',
    color: active ? accent : ink, cursor: 'pointer',
    padding: '0.3rem 0', borderBottom: active ? `1px solid ${rule}` : '1px solid transparent',
    transition: 'color 0.2s ease, border-color 0.2s ease', whiteSpace: 'nowrap',
    textShadow: overHero ? '0 1px 12px rgba(23,21,18,0.7)' : 'none',
  });

  const topNavItems = ['Home', 'About Us', 'Services', 'FAQ'];

  return (
    <>
      <style>{globalStyles}</style>
      <nav style={navStyle}>
        {/* Logo */}
        <div onClick={() => { setPage('Home'); setMobileOpen(false); }} style={{
          fontFamily: 'Playfair Display, serif', fontSize: T.h4, fontWeight: 700,
          color: ink, letterSpacing: '0.05em', cursor: 'pointer',
          textShadow: overHero ? '0 1px 14px rgba(23,21,18,0.7)' : 'none',
        }}>
          {/* Replace with: <img src={logo} alt="Virtuoso" style={{ height: 32 }} /> */}
          <Wordmark colour={ink} note={overHero ? C.goldOnDark : C.goldSolid} />
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>

          {topNavItems.map(item => (
            <span key={item} style={linkStyle(activePage === item)}
              onClick={() => setPage(item)}
              onMouseEnter={e => { if (activePage !== item) e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { if (activePage !== item) e.currentTarget.style.color = ink; }}
            >{item}</span>
          ))}

          {/* ── Roster dropdown ── */}
          <div ref={rosterRef} style={{ position: 'relative' }}>
            <span
              style={{ ...linkStyle(isRosterActive), display: 'flex', alignItems: 'center', gap: '0.3rem', userSelect: 'none' }}
              onClick={() => setRosterOpen(o => !o)}
              onMouseEnter={e => { if (!isRosterActive) e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { if (!isRosterActive) e.currentTarget.style.color = ink; }}
            >
              Roster
              <span style={{
                fontSize: T.micro, display: 'inline-block',
                transition: 'transform 0.25s ease',
                transform: rosterOpen ? 'rotate(180deg)' : 'none',
              }}>▼</span>
            </span>

            {/* Dropdown panel */}
            <div style={{
              position: 'absolute', top: 'calc(100% + 1rem)', left: '50%', transform: 'translateX(-50%)',
              background: C.white, border: `1px solid rgba(140,100,30,0.22)`,
              boxShadow: '0 12px 40px rgba(23,21,18,0.12)',
              minWidth: 220, zIndex: 2000, padding: '0.5rem 0',
              opacity: rosterOpen ? 1 : 0,
              visibility: rosterOpen ? 'visible' : 'hidden',
              transform: rosterOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-8px)',
              transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease',
            }}>
              {/* View all */}
              <div
                onClick={() => { setPage('Roster'); setRosterOpen(false); }}
                style={{
                  padding: '0.65rem 1.25rem', fontFamily: 'Outfit, sans-serif',
                  fontSize: T.micro, letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontWeight: 600, color: C.goldText, cursor: 'pointer',
                  borderBottom: `1px solid rgba(140,100,30,0.22)`, marginBottom: '0.25rem',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.stone}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >View Full Roster →</div>

              {/* Individual artists — scroll to roster page */}
              {LIVE_ROSTER.map(dj => (
                <div key={dj.id}
                  onClick={() => { setPage(`artist:${dj.slug}`); setRosterOpen(false); }}
                  style={{
                    padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.stone}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Thumbnail */}
                  {/* A full-length shot cropped to 32px leaves the face a few
                      pixels wide, so the thumbnail zooms in. This uses a
                      background image rather than <img>, because
                      background-position aligns a point on the IMAGE to the same
                      point on the BOX — which stays correct at any zoom, unlike
                      object-position plus a transform. */}
                  <div
                    aria-hidden="true"
                    style={{
                      width: 32, height: 32, borderRadius: '50%', background: C.stone,
                      flexShrink: 0, overflow: 'hidden', border: `1px solid rgba(140,100,30,0.2)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: T.micro, color: C.mid,
                      ...(dj.photo ? {
                        backgroundImage: `url(${dj.photo})`,
                        backgroundSize: `${(dj.thumbZoom || 1) * 100}%`,
                        backgroundPosition: dj.face || 'center',
                        backgroundRepeat: 'no-repeat',
                      } : null),
                    }}
                  >
                    {dj.photo ? null : dj.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 500, color: C.nearBlack }}>{dj.name}</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, color: C.mid }}>{dj.genres.slice(0,2).join(' · ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA - Contact Dropdown */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={() => setContactDropdown(!contactDropdown)} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white,
              background: C.goldSolid, padding: '0.6rem 1.4rem', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Contact
              <span style={{ fontSize: T.body, transition: 'transform 0.25s', transform: contactDropdown ? 'rotate(180deg)' : 'none' }}>▼</span>
            </button>
            {contactDropdown && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem',
                background: C.white, border: `1px solid rgba(140,100,30,0.3)`, borderRadius: '2px',
                boxShadow: '0 4px 16px rgba(23,21,18,0.15)', zIndex: 1000, minWidth: '220px',
              }}>
                <button onClick={() => { setPage('Book A DJ'); setContactDropdown(false); }} style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '1rem 1.25rem',
                  fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
                  color: C.nearBlack, background: 'transparent', border: 'none', cursor: 'pointer',
                  borderBottom: `1px solid rgba(140,100,30,0.15)`, transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.target.style.background = 'rgba(140,100,30,0.08)'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}
                >
                  <div style={{ letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Book a DJ</div>
                  <div style={{ fontSize: T.micro, color: C.mid, fontWeight: 400 }}>For your event</div>
                </button>
                <button onClick={() => { setPage('Partner With Virtuoso'); setContactDropdown(false); }} style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '1rem 1.25rem',
                  fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
                  color: C.nearBlack, background: 'transparent', border: 'none', cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.target.style.background = 'rgba(140,100,30,0.08)'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}
                >
                  <div style={{ letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Partner with Virtuoso</div>
                  <div style={{ fontSize: T.micro, color: C.mid, fontWeight: 400 }}>Business partnerships</div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', flexDirection: 'column', gap: 5 }}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 22, height: 1.5, background: ink, transition: 'all 0.3s ease',
              transform: mobileOpen ? (i===0?'rotate(45deg) translate(5px,5px)':i===2?'rotate(-45deg) translate(5px,-5px)':'scaleX(0)') : 'none',
            }}/>
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
        background: C.ivory, overflowY: 'auto', paddingTop: '5rem', paddingBottom: '3rem',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        opacity: mobileOpen ? 1 : 0, visibility: mobileOpen ? 'visible' : 'hidden',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          {topNavItems.map(item => (
            <span key={item} onClick={() => { setPage(item); setMobileOpen(false); }} style={{
              fontFamily: 'Playfair Display, serif', fontSize: T.h4, fontWeight: 600,
              color: activePage === item ? C.goldText : C.nearBlack, cursor: 'pointer', padding: '0.6rem 0',
            }}>{item}</span>
          ))}

          {/* Mobile roster accordion */}
          <div style={{ width: '100%', textAlign: 'center' }}>
            <span onClick={() => setMobileRosterOpen(o => !o)} style={{
              fontFamily: 'Playfair Display, serif', fontSize: T.h4, fontWeight: 600,
              color: isRosterActive ? C.goldText : C.nearBlack, cursor: 'pointer', padding: '0.6rem 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}>
              Roster
              <span style={{ fontSize: T.body, transition: 'transform 0.25s', transform: mobileRosterOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
            </span>

            {mobileRosterOpen && (
              <div style={{ padding: '0.5rem 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span onClick={() => { setPage('Roster'); setMobileOpen(false); }} style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: T.small, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: C.goldText, cursor: 'pointer', padding: '0.4rem 0',
                }}>View All →</span>
                {LIVE_ROSTER.map(dj => (
                  <span key={dj.id} onClick={() => { setPage(`artist:${dj.slug}`); setMobileOpen(false); setMobileRosterOpen(false); }} style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: T.body, fontWeight: 500,
                    color: C.mid, cursor: 'pointer', padding: '0.4rem 0',
                  }}>{dj.name}</span>
                ))}
              </div>
            )}
          </div>

          <div>
            <span onClick={() => setMobileContactOpen(!mobileContactOpen)} style={{
              fontFamily: 'Playfair Display, serif', fontSize: T.h4, fontWeight: 600,
              color: (activePage === 'Book A DJ' || activePage === 'Partner With Virtuoso') ? C.goldText : C.nearBlack,
              cursor: 'pointer', padding: '0.6rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              Contact
              <span style={{ fontSize: T.body, transition: 'transform 0.25s', transform: mobileContactOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
            </span>

            {mobileContactOpen && (
              <div style={{ padding: '0.5rem 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span onClick={() => { setPage('Book A DJ'); setMobileOpen(false); setMobileContactOpen(false); }} style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: T.body, fontWeight: 500,
                  color: C.mid, cursor: 'pointer', padding: '0.4rem 0',
                }}>Book a DJ</span>
                <span onClick={() => { setPage('Partner With Virtuoso'); setMobileOpen(false); setMobileContactOpen(false); }} style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: T.body, fontWeight: 500,
                  color: C.mid, cursor: 'pointer', padding: '0.4rem 0',
                }}>Partner with Virtuoso</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const videoRef = useRef(null);

  const sectionStyle = (bg = C.ivory) => ({
    background: bg, padding: '4.25rem 2rem', position: 'relative', zIndex: 1,
  });

  const containerStyle = { maxWidth: 1100, margin: '0 auto' };

  return (
    <div>
      {/* ── HERO ── */}
      {/* Full-bleed photo banner. The source frame is heavily cyan-lit and at its
          brightest dead centre — exactly where the wordmark sits — so the image
          is desaturated toward the warm palette and carries a centred scrim. */}
      {/* 78vh, not 100vh: at least 20% shorter than the old full-viewport
          height, with the name/subname sized up to fill the tighter frame
          rather than reading as empty. */}
      <div style={{ position: 'relative', height: '78vh', minHeight: 480, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={heroPhoto}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 42%',
            filter: 'saturate(0.42) contrast(1.06) brightness(0.62) sepia(0.16)',
          }}
        />

        {/* Scrim: a centred pool of shade for the wordmark, plus a fade into the
            ivory of the brand panel below so the two sections meet cleanly. */}
        <div style={{
          position: 'absolute', inset: 0,
          background:
            `radial-gradient(ellipse 60% 55% at 50% 45%, rgba(23,21,18,0.72) 0%, rgba(23,21,18,0.45) 55%, rgba(23,21,18,0.25) 100%),
             linear-gradient(to bottom, rgba(23,21,18,0.55) 0%, rgba(23,21,18,0.15) 40%, rgba(245,240,232,0.92) 100%)`,
        }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '5rem 2rem 0', maxWidth: 860 }}>
          {/* Logo wordmark overlay */}
          <div style={{ margin: '0 auto 1.5rem', lineHeight: 1 }}>
            <Wordmark colour={C.white} note={C.goldSolid} style={{
              fontSize: '4.5rem',
              filter: 'drop-shadow(0 2px 30px rgba(23,21,18,0.55))',
            }} />
          </div>
          <h1 style={{ margin: 0, lineHeight: 1 }}>
            <span style={{
              display: 'block',
              fontFamily: 'Outfit, sans-serif',
              fontSize: T.heroSub,
              fontWeight: 300, letterSpacing: '0.42em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.92)',
              marginLeft: '0.42em',   // offset the trailing letter-space
              textShadow: '0 1px 18px rgba(23,21,18,0.6)',
            }}>Collective</span>
          </h1>

          {/* Tagline subheading */}
          <p style={{
            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
            fontSize: T.heroTagline,
            color: 'rgba(255,255,255,0.94)', maxWidth: 620,
            margin: '1.5rem auto 0', fontWeight: 400, lineHeight: 1.5,
            textShadow: '0 1px 18px rgba(23,21,18,0.6)',
          }}>
            More than music
          </p>
          <div style={{ maxWidth: 720, margin: '0.85rem auto 2rem' }}>
            <p style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.body,
              color: 'rgba(255,255,255,0.88)', fontWeight: 300, lineHeight: 1.7,
              marginBottom: '1rem',
            }}>
              We place DJs in venues across London — from residencies, launch nights and private parties to weddings and corporate events — and stay involved after the booking is confirmed.
            </p>
            <p style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.body,
              color: 'rgba(255,255,255,0.88)', fontWeight: 300, lineHeight: 1.7,
              marginBottom: '1rem',
            }}>
              We handle programming, equipment, timings and the transition from speeches to the first track, making sure the night runs smoothly.
            </p>
            <p style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.body,
              color: 'rgba(255,255,255,0.88)', fontWeight: 300, lineHeight: 1.7,
            }}>
              Every DJ on our roster is vetted for skill and professionalism. They can read a room, adapt quickly and represent your venue properly.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('Work With Us')} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white,
              background: C.goldSolid, border: 'none', padding: '1rem 2.5rem', cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >Enquire</button>
            <button onClick={() => setPage('Roster')} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white,
              background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', padding: '1rem 2.5rem',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = C.white; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
            >View Our Roster</button>
          </div>

          {/* Scroll indicator — in-flow beneath the buttons, not pinned to the
              hero's bottom edge. A fixed bottom offset overlapped the buttons
              once the hero got shorter; sitting in the flow means it can never
              collide with content above it, whatever the hero's height. */}
          <div style={{
            marginTop: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.78)', fontSize: T.micro, letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            <span>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.3)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
            <style>{`@keyframes scrollPulse { 0%,100%{opacity:0.3;} 50%{opacity:1;} }`}</style>
          </div>
        </div>
      </div>

      {/* ── BRANDS WORKED WITH ── */}
      <BrandPanel />

      {/* ── STATS STRIP ── */}
      <div style={{ background: C.nearBlack, padding: '3rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: T.stat, fontWeight: 700, color: C.goldOnDark, marginBottom: '0.25rem' }}>{s.value}</div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATEMENT ── */}
      {/* Editorial opener: one long-form, plain-spoken block rather than a card
          grid, so the page opens with a voice instead of a feature list. */}
      <div style={{ ...sectionStyle(C.ivory), padding: '5rem 2rem 3.5rem' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel>Virtuoso Collective</SectionLabel>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: T.statement,
            lineHeight: 1.25, letterSpacing: '0.01em', marginBottom: '2rem',
          }}>
            A room only sounds right when someone is listening to it.
          </h2>
          <GoldLine />
          <p style={{ color: C.mid, fontSize: T.lead, lineHeight: 1.85, marginBottom: '1.5rem' }}>
            We place DJs in venues across London — residencies, launch nights, weddings, corporate
            floors — and we stay involved long after the booking is confirmed. Programming, equipment,
            timings, the awkward handover between speeches and the first record: that is the part
            most people forget, and the part that decides how the night actually feels.
          </p>
          <p style={{ color: C.mid, fontSize: T.body, lineHeight: 1.85 }}>
            Every artist on our roster has been vetted for the same thing — not just taste, but the
            judgement to read a floor and change course without being asked. You get a team that
            treats your venue's reputation as carefully as you do.
          </p>
        </div>
      </div>

      {/* ── INTRO ── */}
      <div style={sectionStyle(C.stone)}>
        <div className="intro-grid" style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.h2, marginBottom: '1.5rem' }}>
              The entertainment partner venues trust.
            </h2>
            <GoldLine style={{ margin: '0 0 1.5rem' }} />
            <p style={{ color: C.mid, lineHeight: 1.8, marginBottom: '1rem' }}>
              We place DJs in venues across London — from residencies and launch nights to birthday parties, weddings and corporate events — and stay involved long after the booking is confirmed.
            </p>
            <p style={{ color: C.mid, lineHeight: 1.8, marginBottom: '1rem' }}>
              From programming and equipment to timings and the handover from speeches to the first record, we manage the details that shape how the night feels.
            </p>
            <p style={{ color: C.mid, lineHeight: 1.8, marginBottom: '2rem' }}>
              Every artist on our roster has been vetted for the same thing — not just taste, but the judgement to read a floor and change course without being asked. You get a team that treats your venue's reputation as carefully as you do.
            </p>
            <button onClick={() => setPage('About Us')} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldText,
              background: 'transparent', border: `1px solid ${C.gold}`, padding: '0.75rem 1.75rem', cursor: 'pointer',
            }}>Learn More About Us</button>
          </div>
          {/* Capped rather than filling the column: at 1fr/1fr this photo was
              rendering taller than the text beside it and dominating the
              section. A narrower column ratio plus this max-width keep it a
              supporting image, not a second hero. */}
          <div style={{
            // width + maxWidth (not just maxWidth) — margin-left:auto otherwise
            // makes a grid item shrink-to-fit with no intrinsic size, and an
            // aspect-ratio box with nothing to size against collapses to 0.
            aspectRatio: '4/5', overflow: 'hidden', width: '100%', maxWidth: 380, marginLeft: 'auto',
            border: `1px solid ${C.line}`, background: C.stone,
          }}>
            <img
              src={introPhoto}
              alt="A packed dance floor at a Virtuoso Collective event"
              loading="lazy"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                // Held to the same warm, desaturated grade as the hero.
                filter: 'saturate(0.5) contrast(1.04) sepia(0.12)',
              }}
            />
          </div>
        </div>
        <style>{`@media(max-width:768px){
          .intro-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .intro-grid > div:last-child { max-width: 320px !important; margin: 0 auto !important; }
        }`}</style>
      </div>

      {/* ── SERVICES PREVIEW ── */}
      <div style={sectionStyle(C.ivory)}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SectionLabel>What We Do</SectionLabel>
            <h2 style={{ fontSize: T.h2 }}>Entertainment for every occasion</h2>
            <GoldLine />
          </div>
          {/* Cards emphasised: a gold top rule, a real shadow and a heavier
              border give each box definition against the ivory background —
              previously they read as faint outlines that barely separated
              from the page. Icons dropped; the titles carry the cards. */}
          <div className="service-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
            {SERVICES.map(s => (
              <div key={s.id} style={{
                background: C.white, padding: '2.25rem 1.75rem',
                border: `2px solid rgba(140,100,30,0.5)`,
                borderTop: `5px solid ${C.gold}`,
                boxShadow: '0 4px 20px rgba(23,21,18,0.12)',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.borderTopColor = C.gold; e.currentTarget.style.boxShadow = '0 8px 30px rgba(23,21,18,0.18)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(140,100,30,0.5)'; e.currentTarget.style.borderTopColor = C.gold; e.currentTarget.style.boxShadow = '0 4px 20px rgba(23,21,18,0.12)'; e.currentTarget.style.transform = 'none'; }}
              >
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '0.5rem' }}>{s.title}</h3>
                {s.tagline && <p style={{ color: C.goldText, fontSize: T.small, lineHeight: 1.6, marginBottom: '1rem', fontStyle: 'italic' }}>{s.tagline}</p>}
                <p style={{ color: C.mid, fontSize: T.body, lineHeight: 1.7, marginBottom: '1.25rem' }}>{s.description}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {s.features.map(f => (
                    <li key={f} style={{ fontSize: T.small, color: C.mid, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: C.goldText, fontSize: T.micro }}>◆</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setPage('Services')} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldText,
              background: 'transparent', border: `1px solid ${C.gold}`, padding: '0.75rem 2rem', cursor: 'pointer',
            }}>View All Services</button>
          </div>
          {/* On phones the auto-fit grid drops to a single column, which made
              each card a tall full-width block with a lot of internal padding.
              Tighter padding and gaps keep the section scannable rather than
              forcing four long scrolls. */}
          <style>{`@media (max-width: 600px) {
            .service-cards { gap: 1rem !important; }
            .service-cards > div { padding: 1.5rem 1.25rem !important; }
          }`}</style>
        </div>
      </div>

      {/* ── ROSTER PREVIEW ── */}
      {/* Tightened ~20%+ vs. the original: the grid was sized for a full row of
          three (300px cards), so with today's one-artist roster it left a tall
          band around a single small card. Cards now match the roster index's
          own size (240px cap) instead of being bigger than the index itself,
          and the section's own padding/margins are pulled in to match. */}
      <div style={{ ...sectionStyle(C.nearBlack), paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SectionLabel onDark>Our Artists</SectionLabel>
            <h2 style={{ fontSize: T.h2, color: C.white }}>Meet the roster</h2>
            <GoldLine />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            justifyContent: 'center',
            gap: '1.5rem',
          }}>
            {LIVE_ROSTER.slice(0, 4).map(dj => (
              <div key={dj.id}
                onClick={() => setPage(`artist:${dj.slug}`)}
                role="link"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPage(`artist:${dj.slug}`); } }}
                style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: C.stone, cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.querySelector('.dj-overlay').style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.querySelector('.dj-overlay').style.opacity = '0'; }}
              >
                {dj.photo
                  ? <img src={dj.photo} alt={dj.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: dj.focus || 'center' }} />
                  : <div style={{ width: '100%', height: '100%', background: C.stone, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.mid, fontSize: T.micro, letterSpacing: '0.1em', textTransform: 'uppercase' }}>[ DJ Photo ]</div>
                }
                <div className="dj-overlay" style={{
                  position: 'absolute', inset: 0, background: `rgba(23,21,18,0.88)`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.3s ease', padding: '1.5rem',
                }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', color: C.white, fontSize: T.lead, marginBottom: '0.5rem' }}>{dj.name}</h3>
                  {dj.bestFor && (
                    <p style={{ fontSize: T.small, color: C.goldOnDark, marginBottom: '0.75rem', fontWeight: 500 }}>Best for: {dj.bestFor}</p>
                  )}
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(transparent, rgba(23,21,18,0.8))' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', color: C.white, fontSize: T.body }}>{dj.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <button onClick={() => setPage('Roster')} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white,
              background: C.goldSolid, border: 'none', padding: '0.9rem 2.2rem', cursor: 'pointer',
            }}>View Full Roster</button>
          </div>
        </div>
      </div>

      {/* Partner logos now live in <BrandPanel /> directly beneath the hero. */}

      {/* ── CTA BANNER ── */}
      <div style={{ background: C.goldSolid, padding: '3.5rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.h2, color: C.white, marginBottom: '1rem' }}>
          Ready to elevate your venue?
        </h2>
        <p style={{ color: C.white, maxWidth: 480, margin: '0 auto 2.5rem', fontSize: T.body, fontWeight: 400 }}>
          Submit a partnership enquiry and we'll be in touch within 24 hours.
        </p>
        <button onClick={() => setPage('Work With Us')} style={{
          fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldText,
          background: C.white, border: 'none', padding: '1rem 2.5rem', cursor: 'pointer',
        }}>Submit an Enquiry</button>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  const sectionStyle = (bg = C.ivory) => ({ background: bg, padding: '4.25rem 2rem', position: 'relative', zIndex: 1 });
  const containerStyle = { maxWidth: 1100, margin: '0 auto' };

  // Rough starting guesses based on where each face actually sits in its
  // cropped photo, not QuaverPhoto's generic 50/25 default — refine with the
  // sliders below once the page is up.
  const [photoAdjust, setPhotoAdjust] = useState({
    jesse:    { x: 48, y: 35 },
    alek:     { x: 55, y: 35 },
    emmanuel: { x: 50, y: 25 },
  });
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div style={{ paddingTop: 72 }}>
      <QuaverClipDefs />

      {/* ── HEADER ── */}
      <div style={{ ...sectionStyle(C.ivory) }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel>Our Story</SectionLabel>
            <h1 style={{ fontSize: T.h1, marginBottom: '1rem' }}>About Virtuoso Collective</h1>
            <GoldLine />
          </div>

          {/* ── PREAMBLE ── */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: 800, margin: '0 auto 3.5rem' }}>
            <p style={{ color: C.mid, lineHeight: 1.8, fontSize: T.body }}>
              Providing DJs, curating playlists and coordinating a seamless experience is the key to lasting memories. We help our clients find consistency, quality and reliability for their events. Our musically inclined team is experienced in delivering premium talent, adept in reading the room.
            </p>
          </div>

          {/* ── THE PEOPLE BEHIND VIRTUOSO ── */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>The People Behind Virtuoso Collective</SectionLabel>
            <h2 style={{ fontSize: T.h3, marginBottom: '1.5rem' }}>
              Built by people who live for the dance floor.
            </h2>
            <GoldLine />
          </div>

          {/* Founder + Operations Manager, side by side */}
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3.5rem', marginBottom: '4.25rem' }}>

            {/* Jesse */}
            <div>
              <QuaverPhoto
                photo={jessePhoto}
                alt="Jesse Appiah, Founder of Virtuoso Collective"
                placeholderLabel="[ Jesse — Photo ]"
                facePosition={`${photoAdjust.jesse.x}% ${photoAdjust.jesse.y}%`}
              />
              {isDev && (
                <PhotoAdjuster
                  personKey="jesse"
                  value={photoAdjust.jesse}
                  onChange={v => setPhotoAdjust(p => ({ ...p, jesse: v }))}
                />
              )}
              <div style={{ marginTop: '1.5rem' }} />
              <SectionLabel>Founder</SectionLabel>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1rem' }}>Jesse Appiah</h3>
              <GoldLine style={{ margin: '0 0 1.25rem' }} />
              <BioParagraphs paragraphs={[
                "Jesse's earliest memories of music take him back to the living room — his mother's CD player spinning Bob Marley, the smell of the house, the feeling of the music filling the room. Then came Michael Jackson. He'd watch the music videos on repeat, moonwalking across the floor and trying to crack every move.",
                "Street dance followed naturally, soundtracked by Usher, Ne-Yo and Chris Brown — the artists who made you want to move before you even knew why. From the Step Up films to the dance floor, Jesse has spent over 10 years as a dancer, building an instinct for rhythm, energy and what makes a room come alive.",
                'Five years behind the decks later, that instinct shapes every set — reading the room, feeling the energy, and taking people somewhere.',
              ]} />
            </div>

            {/* Alek */}
            <div>
              <QuaverPhoto
                photo={aleksPhoto}
                alt="Aleksandar Shipman, Operations Manager at Virtuoso Collective"
                placeholderLabel="[ Alek — Photo ]"
                facePosition={`${photoAdjust.alek.x}% ${photoAdjust.alek.y}%`}
              />
              {isDev && (
                <PhotoAdjuster
                  personKey="alek"
                  value={photoAdjust.alek}
                  onChange={v => setPhotoAdjust(p => ({ ...p, alek: v }))}
                />
              )}
              <div style={{ marginTop: '1.5rem' }} />
              <SectionLabel>Operations Manager</SectionLabel>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1rem' }}>Aleksandar Shipman</h3>
              <GoldLine style={{ margin: '0 0 1.25rem' }} />
              <BioParagraphs paragraphs={[
                "Alek's earliest memories of music go back to school assembly halls — a trumpet in hand, keeping time in the brass band during his school days. That grounding stuck with him, even as his own taste pulled toward retro, pop and rock culture along the way.",
                "He's not the one behind the decks — he's the one who makes sure everything around them runs properly. A people person through and through, Alek is usually the first to get a reluctant crowd onto the floor, and the one keeping the night on track while everyone else is enjoying it.",
                'As Operations Manager, that same energy shapes how Virtuoso Collective runs day to day — organised, personable, and always ready to get the floor moving when the moment calls for it.',
              ]} />
            </div>

            {/* Emmanuel */}
            <div>
              <QuaverPhoto
                photo={emmanuelPhoto}
                alt="Emmanuel Ohuonu, Talent Acquisition Lead at Virtuoso Collective"
                placeholderLabel="[ Emmanuel — Photo ]"
                facePosition={`${photoAdjust.emmanuel.x}% ${photoAdjust.emmanuel.y}%`}
              />
              {isDev && (
                <PhotoAdjuster
                  personKey="emmanuel"
                  value={photoAdjust.emmanuel}
                  onChange={v => setPhotoAdjust(p => ({ ...p, emmanuel: v }))}
                />
              )}
              <div style={{ marginTop: '1.5rem' }} />
              <SectionLabel>Talent Acquisition Lead</SectionLabel>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1rem' }}>Emmanuel Ohuonu</h3>
              <GoldLine style={{ margin: '0 0 1.25rem' }} />
              <BioParagraphs paragraphs={[
                "Emmanuel's earliest musical memories are rooted in secondary school, where he played the saxophone — an instrument that gave him an ear for melody, timing and the architecture of a good set. That foundation led him to study Music Industry Management at degree level, where he developed a sharp understanding of the business behind the music, alongside a genuine penchant for A&R and spotting talent before the room catches on.",
                'From intimate venues to student events, Emmanuel built his experience behind the decks the hard way — earning the room rather than inheriting it. Sets at the Herefordshire Forum and hosting on university radio sharpened his ability to read a crowd, adapt in real time, and deliver exactly the right soundtrack for the moment. Specialising in Hip-Hop and contemporary R&B, he moves fluidly between the classics and the current — Usher, Ne-Yo and Chris Brown giving way to Drake, Brent Faiyaz, PARTYNEXTDOOR and SZA — in sets that feel both familiar and fresh.',
              ]} />
            </div>
          </div>

          <style>{`@media (max-width: 760px) {
            .team-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          }`}</style>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', borderTop: `1px solid rgba(140,100,30,0.2)`, paddingTop: '2.75rem' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: T.h1, fontWeight: 700, color: C.goldText }}>{s.value}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.mid, marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHAT WE DO ── */}
      <div style={{ ...sectionStyle(C.nearBlack) }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SectionLabel onDark>What We Cover</SectionLabel>
            <h2 style={{ fontSize: T.h2, color: C.white }}>Every occasion, covered.</h2>
            <GoldLine />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Residencies', body: 'Regular slots that keep your venue sounding its best, week in week out.' },
              { title: 'One-Off Events', body: 'A single night done properly — from concept through to last song.' },
              { title: 'Multi-Site', body: 'Multiple DJs for multiple venues on the same night. We coordinate it all.' },
              { title: 'DJ Cover', body: 'Last-minute or planned cover from a trusted artist who knows how to deliver.' },
            ].map(v => (
              <div key={v.title} style={{ padding: '2rem', borderTop: `2px solid ${C.goldOnDark}` }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: C.white, fontSize: T.lead, marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, fontSize: T.small }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHO WE WORK WITH ── */}
      <div style={{ ...sectionStyle(C.ivory) }}>
        <div style={{ ...containerStyle, textAlign: 'center' }}>
          <SectionLabel>Who We Work With</SectionLabel>
          <h2 style={{ fontSize: T.h3, marginBottom: '1rem' }}>
            Fashion parties. Influencer events. Bars and pubs. Private occasions.
          </h2>
          <GoldLine />
          <p style={{ color: C.mid, maxWidth: 620, margin: '0 auto', lineHeight: 1.8 }}>
            We do fashion parties, influencer parties, and private events — birthdays, weddings, and everything in between. We're just as much at home behind the bar, too — whether that's a one-off night or an ongoing residency in your bar or pub.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ ...sectionStyle(C.stone), textAlign: 'center' }}>
        <SectionLabel>Get Started</SectionLabel>
        <h2 style={{ fontSize: T.h3, marginBottom: '1rem' }}>Work with us today</h2>
        <p style={{ color: C.mid, maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Based in London and Greater London — ready to bring the energy to your next event or venue.
        </p>
        <button onClick={() => setPage('Work With Us')} style={{
          fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white,
          background: C.goldSolid, border: 'none', padding: '1rem 2.5rem', cursor: 'pointer',
        }}>Submit an Enquiry</button>
      </div>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  const sectionStyle = (bg) => ({ background: bg, padding: '4.25rem 2rem', position: 'relative', zIndex: 1 });
  const containerStyle = { maxWidth: 1100, margin: '0 auto' };

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ ...sectionStyle(C.ivory) }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
            <SectionLabel>What We Offer</SectionLabel>
            <h1 style={{ fontSize: T.h1 }}>Our Services</h1>
            <GoldLine />
            <p style={{ color: C.mid, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              Every venue is different. We tailor our entertainment solutions to match your space, audience, and brand.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {SERVICES.map((s, i) => (
              <div key={s.id} style={{
                display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: '3rem', alignItems: 'center', direction: i % 2 !== 0 ? 'rtl' : 'ltr',
                background: i % 2 === 0 ? C.white : C.stone,
                border: `1px solid rgba(140,100,30,0.22)`,
              }}>
                <div style={{ direction: 'ltr', padding: '3rem' }}>
                  <div style={{ fontSize: T.h4, color: C.goldText, marginBottom: '1rem' }}>{s.icon}</div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.h4, marginBottom: '1rem' }}>{s.title}</h2>
                  <GoldLine style={{ margin: '0 0 1.25rem' }} />
                  <p style={{ color: C.mid, lineHeight: 1.8, marginBottom: '1.5rem' }}>{s.description}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                    {s.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: C.mid, fontSize: T.body }}>
                        <span style={{ color: C.goldText, fontSize: T.micro }}>◆</span>{f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setPage('Work With Us')} style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldText,
                    background: 'transparent', border: `1px solid ${C.gold}`, padding: '0.75rem 1.75rem', cursor: 'pointer',
                  }}>Enquire About This</button>
                </div>
                <div style={{
                  direction: 'ltr', background: C.stone, minHeight: 320, alignSelf: 'stretch',
                  overflow: 'hidden',
                }}>
                  {s.photo
                    ? <img
                        src={s.photo}
                        alt={`${s.title} — Virtuoso Collective`}
                        loading="lazy"
                        style={{
                          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                          // Same warm, desaturated grade as the rest of the site's
                          // photography, so these read as one set rather than raw stock.
                          filter: 'saturate(0.55) contrast(1.05) sepia(0.1)',
                        }}
                      />
                    : <div style={{
                        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: C.mid, fontSize: T.micro, letterSpacing: '0.1em', textTransform: 'uppercase',
                      }}>[ Event Photo — {s.title} ]</div>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: C.goldSolid, padding: '3.5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.h2, color: C.white, marginBottom: '1rem' }}>
          Not sure which service you need?
        </h2>
        <p style={{ color: C.white, maxWidth: 480, margin: '0 auto 2.5rem', fontWeight: 400 }}>
          Tell us about your venue and we'll recommend the right entertainment solution.
        </p>
        <button onClick={() => setPage('Work With Us')} style={{
          fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldText,
          background: C.white, border: 'none', padding: '1rem 2.5rem', cursor: 'pointer',
        }}>Get in Touch</button>
      </div>
    </div>
  );
}

// ─── ARTIST PAGE ──────────────────────────────────────────────────────────────
// One page per artist, reachable at #/artist/<slug>. Holds the full bio, photo,
// genre tags and mix links; the roster page is just an index into these.
function ArtistPage({ slug, setPage }) {
  const dj = LIVE_ROSTER.find(a => a.slug === slug);

  // Deep link to an artist who is unpublished or renamed — fail gracefully
  // rather than crashing on an undefined lookup.
  if (!dj) return (
    <div style={{ paddingTop: 72, background: C.ivory, minHeight: '100vh', padding: '7rem 2rem 4.25rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <SectionLabel>Not Found</SectionLabel>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.h2, marginBottom: '1rem' }}>We can’t find that artist.</h1>
      <GoldLine />
      <p style={{ color: C.mid, marginBottom: '2rem' }}>They may not be on the roster any more.</p>
      <button onClick={() => setPage('Roster')} style={{
        fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white,
        background: C.goldSolid, border: 'none', padding: '0.9rem 2rem', cursor: 'pointer',
      }}>View the Roster</button>
    </div>
  );

  // Accept either a list of mixes or the single legacy embed field.
  const mixes = (dj.mixes && dj.mixes.length)
    ? dj.mixes
    : (dj.mixcloudEmbed ? [{ title: 'Latest Mix', embed: dj.mixcloudEmbed }] : []);

  // Videos (YouTube reels/campaigns)
  const videos = dj.videos || [];

  const linkStyle = {
    fontFamily: 'Outfit, sans-serif', fontSize: T.small, color: C.mid,
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    textDecoration: 'none', transition: 'color 0.2s',
    borderBottom: `1px solid ${C.line}`, paddingBottom: '0.15rem',
  };

  return (
    <div style={{ background: C.ivory, minHeight: '100vh', paddingTop: 72, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 2rem 0' }}>
        <span
          onClick={() => setPage('Roster')}
          style={{
            fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: C.goldText,
            cursor: 'pointer', display: 'inline-block', marginBottom: '2.5rem',
          }}
        >← Back to Roster</span>
      </div>

      {/* ── PROFILE — Single column layout ── */}
      <div style={{
        maxWidth: 800, margin: '0 auto', padding: '0 2rem 4rem',
      }}>
        {/* Header: Name, tagline, best for, genres */}
        <div style={{ marginBottom: '2.5rem' }}>
          <SectionLabel>DJ</SectionLabel>
          <h1 style={{
            fontFamily: 'Playfair Display, serif', fontSize: T.h1,
            fontWeight: 700, lineHeight: 1.05, marginBottom: '0.5rem',
          }}>{dj.name}</h1>

          {filled(dj.tagline) && (
            <p style={{
              fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
              fontSize: T.lead, color: C.mid, marginBottom: '1.25rem',
            }}>{filled(dj.tagline)}</p>
          )}

          {dj.bestFor && (
            <p style={{
              fontFamily: 'Outfit, sans-serif', fontSize: T.body, fontWeight: 600,
              letterSpacing: '0.05em', color: C.goldText, marginBottom: '1.5rem',
            }}>
              Best for: {dj.bestFor}
            </p>
          )}

          <GoldLine style={{ margin: '0 0 1.75rem' }} />

          {/* Genre tags */}
          {dj.genres && dj.genres.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
              {dj.genres.map(g => (
                <span key={g} style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: T.micro, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: C.nearBlack,
                  padding: '0.35rem 0.75rem', border: `1px solid ${C.line}`,
                }}>{g}</span>
              ))}
            </div>
          )}
        </div>

        {/* Photo section — main + secondary images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {/* Main photo — reduced by 30% */}
          <div style={{
            maxWidth: '70%', aspectRatio: '3/4', overflow: 'hidden', background: C.stone,
            border: `1px solid ${C.line}`,
          }}>
            {dj.photo
              ? <img src={dj.photo} alt={dj.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  objectPosition: dj.focus || 'center',
                }} />
              : <div aria-hidden="true" style={{
                  width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Playfair Display, serif', fontSize: T.hero, fontWeight: 700, color: 'rgba(23,21,18,0.08)',
                }}>{dj.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
            }
          </div>

          {/* Secondary images grid — 2-up layout (70% width to match primary) */}
          {dj.secondaryPhotos && dj.secondaryPhotos.length > 0 && (
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', maxWidth: '70%',
            }}>
              {dj.secondaryPhotos.slice(0, 2).map((photo, i) => (
                <div key={i} style={{
                  aspectRatio: '3/4', overflow: 'hidden', background: C.stone,
                  border: `1px solid ${C.line}`,
                }}>
                  <img src={photo} alt={`${dj.name} portrait ${i + 1}`} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    objectPosition: 'center',
                  }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bio section */}
        <div>
          {filled(dj.bio) ? (
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.body, color: C.mid, lineHeight: 1.85, marginBottom: '2rem' }}>
              {filled(dj.bio)}
            </p>
          ) : (
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.body, color: C.mid, lineHeight: 1.85, marginBottom: '2rem', fontStyle: 'italic' }}>
              Full biography coming soon.
            </p>
          )}

          {/* Decks / performing shot */}
          {dj.photoDecks && (
            <div style={{ marginBottom: '2rem', border: `1px solid ${C.line}`, overflow: 'hidden' }}>
              <img src={dj.photoDecks} alt={`${dj.name} performing`} loading="lazy"
                   style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }} />
            </div>
          )}

          {/* Links */}
          {(filled(dj.instagram) || filled(dj.mixcloudUser) || filled(dj.website)) && (
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {filled(dj.website) && (
                <a href={dj.website} target="_blank" rel="noopener noreferrer" style={linkStyle}
                   onMouseEnter={e => e.currentTarget.style.color = C.goldText}
                   onMouseLeave={e => e.currentTarget.style.color = C.mid}>
                  <span aria-hidden="true">◆</span> Website
                </a>
              )}
              {filled(dj.instagram) && (
                <a href={`https://instagram.com/${dj.instagram.replace('@', '')}`}
                   target="_blank" rel="noopener noreferrer" style={linkStyle}
                   onMouseEnter={e => e.currentTarget.style.color = C.goldText}
                   onMouseLeave={e => e.currentTarget.style.color = C.mid}>
                  <span aria-hidden="true">◈</span> {dj.instagram}
                </a>
              )}
              {filled(dj.mixcloudUser) && (
                <a href={`https://www.mixcloud.com/${dj.mixcloudUser}/`}
                   target="_blank" rel="noopener noreferrer" style={linkStyle}
                   onMouseEnter={e => e.currentTarget.style.color = C.goldText}
                   onMouseLeave={e => e.currentTarget.style.color = C.mid}>
                  <span aria-hidden="true">◎</span> Mixcloud
                </a>
              )}
            </div>
          )}

          {/* Videos — reduced by 30% */}
          {videos.length > 0 && (
            <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: '2rem', marginBottom: '2.5rem' }}>
              <SectionLabel>{videos.length > 1 ? 'Videos & Reels' : 'Video'}</SectionLabel>
              {videos.map((v, i) => (
                <div key={i} style={{ marginTop: '1.5rem' }}>
                  {v.title && (
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.small, color: C.nearBlack, fontWeight: 500, marginBottom: '0.75rem' }}>{v.title}</p>
                  )}
                  <div style={{ border: `1px solid ${C.line}`, overflow: 'hidden' }}>
                    <iframe title={`${dj.name} — ${v.title || 'video'}`} width="100%" height={v.height ? Math.round(v.height * 0.7) : 420}
                            src={v.embed} frameBorder="0" loading="lazy"
                            allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share"
                            style={{ display: 'block' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setPage('Work With Us')} style={{
            fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white,
            background: C.goldSolid, border: 'none', padding: '1rem 2.25rem', cursor: 'pointer',
          }}>Book {dj.name.split(' ').slice(-1)[0]}</button>
        </div>

        {/* Mixes section */}
        {mixes.length > 0 && (
          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: '2rem', marginTop: '2rem' }}>
            <SectionLabel>{mixes.length > 1 ? 'Selected Mixes' : 'Latest Mix'}</SectionLabel>
            {mixes.map((m, i) => (
              <div key={i} style={{ marginTop: '1rem' }}>
                {m.title && mixes.length > 1 && (
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.small, color: C.nearBlack, fontWeight: 500, marginBottom: '0.5rem' }}>{m.title}</p>
                )}
                <div style={{ border: `1px solid ${C.line}`, overflow: 'hidden' }}>
                  <iframe title={`${dj.name} — ${m.title || 'mix'}`} width="100%" height={m.height || 225}
                          src={m.embed} frameBorder="0" loading="lazy"
                          allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share"
                          style={{ display: 'block' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROSTER PAGE ──────────────────────────────────────────────────────────────
function RosterPage({ setPage }) {
  return (
    <div style={{ background: C.ivory, minHeight: '100vh', paddingTop: 72, position: 'relative', zIndex: 1 }}>

      {/* ── HEADER ── */}
      <div style={{ padding: '3.5rem 2.5rem 2.25rem', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid rgba(140,100,30,0.22)` }}>
        <SectionLabel>The Artists</SectionLabel>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.hero, color: C.nearBlack, lineHeight: 1.05 }}>
          Our Roster
        </h1>
        <div style={{ width: 40, height: 2, background: C.gold, margin: '1.5rem 0' }} />
        <p style={{ color: C.mid, maxWidth: 520, lineHeight: 1.7, fontSize: T.body }}>
          A curated collective of professional DJs — each selected for technical skill, audience awareness, and stage presence.
        </p>
        <button onClick={() => setPage('Join the Roster')} style={{
          marginTop: '1.5rem', fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white,
          background: C.goldSolid, border: 'none', padding: '0.75rem 1.75rem', cursor: 'pointer',
        }}>Interested in Joining?</button>
      </div>

      {/* ── ARTIST INDEX ── */}
      {/* A compact card grid rather than full-bleed rows: the roster is an index
          now, and each artist's detail lives on their own page. This also keeps
          the photos at a sane size when there are only one or two artists. */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2.5rem 3.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2.5rem 2rem',
        }}>
          {LIVE_ROSTER.map(dj => (
            <div
              key={dj.id}
              onClick={() => setPage(`artist:${dj.slug}`)}
              role="link"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPage(`artist:${dj.slug}`); } }}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={e => {
                const im = e.currentTarget.querySelector('img');
                if (im) im.style.transform = 'scale(1.04)';
                e.currentTarget.querySelector('[data-cta]').style.color = C.goldText;
              }}
              onMouseLeave={e => {
                const im = e.currentTarget.querySelector('img');
                if (im) im.style.transform = 'scale(1)';
                e.currentTarget.querySelector('[data-cta]').style.color = C.mid;
              }}
            >
              {/* Photo */}
              <div style={{
                aspectRatio: '3/4', overflow: 'hidden', background: C.stone,
                border: `1px solid ${C.line}`, marginBottom: '1.1rem',
              }}>
                {dj.photo
                  ? <img
                      src={dj.photo}
                      alt={dj.name}
                      loading="lazy"
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        objectPosition: dj.focus || 'center',
                        transition: 'transform 0.5s ease', display: 'block',
                      }}
                    />
                  : <div aria-hidden="true" style={{
                      width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Playfair Display, serif', fontSize: T.h4, fontWeight: 700, color: 'rgba(23,21,18,0.12)',
                    }}>{dj.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                }
              </div>

              <h2 style={{
                fontFamily: 'Playfair Display, serif', fontSize: T.lg,
                fontWeight: 700, marginBottom: '0.3rem', lineHeight: 1.2,
              }}>{dj.name}</h2>

              {filled(dj.tagline) && (
                <p style={{
                  fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
                  fontSize: T.small, color: C.mid, marginBottom: '0.6rem', lineHeight: 1.5,
                }}>{filled(dj.tagline)}</p>
              )}

              <p style={{
                fontFamily: 'Outfit, sans-serif', fontSize: T.micro,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: C.mid,
                marginBottom: '0.9rem',
              }}>{dj.genres.join(' · ')}</p>

              <span data-cta style={{
                fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: C.mid,
                marginTop: 'auto', transition: 'color 0.2s',
              }}>View Profile →</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOOKING CTA ── */}
      <div style={{ background: C.nearBlack, padding: '3.5rem 2rem', textAlign: 'center' }}>
        <SectionLabel onDark>Book an Artist</SectionLabel>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.h2, color: C.white, marginBottom: '1rem' }}>
          Interested in booking one of our artists?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.7, fontSize: T.body }}>
          Submit a partnership enquiry, let us know which artist caught your eye, and we'll be in touch within 24 hours.
        </p>
        <button onClick={() => setPage('Work With Us')} style={{
          fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white,
          background: C.goldSolid, border: 'none', padding: '1rem 2.5rem', cursor: 'pointer',
        }}>Submit an Enquiry</button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .roster-row { grid-template-columns: 1fr !important; }
          .roster-row > div { order: unset !important; }
        }
      `}</style>
    </div>
  );
}

function FAQPage() {
  const containerStyle = { maxWidth: 920, margin: '0 auto' };

  return (
    <div style={{ paddingTop: 72, background: C.ivory, minHeight: '100vh', padding: '5.5rem 2rem 4.25rem', position: 'relative', zIndex: 1 }}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <SectionLabel>Got Questions?</SectionLabel>
          <h1 style={{ fontSize: T.h1 }}>Frequently Asked Questions</h1>
          <GoldLine />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2rem' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: C.white, border: `2px solid rgba(140,100,30,0.3)`, borderTop: `4px solid ${C.gold}`,
              padding: '2rem', transition: 'box-shadow 0.3s ease',
              boxShadow: '0 2px 8px rgba(23,21,18,0.08)',
            }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.body, fontWeight: 600, color: C.nearBlack, marginBottom: '1rem', lineHeight: 1.5 }}>
                {faq.q}
              </h3>
              <p style={{ color: C.mid, lineHeight: 1.8, fontSize: T.small }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TALENT COMMUNITY PAGE (JOIN THE ROSTER) ──────────────────────────────────
function TalentCommunityPage() {
  const [form, setForm] = useState({
    artistName: '', genre: '', email: '', phone: '',
    experience: '', location: '', bio: '', links: '', privacy: false,
  });
  const [status, setStatus] = useState('idle');
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.privacy) { alert('Please accept the privacy policy to submit your application.'); return; }
    if (!form.artistName || !form.email || !form.genre) { alert('Please fill in all required fields.'); return; }
    setStatus('sending');
    try {
      await emailjs.send(EJS.serviceId, EJS.templateNotify, {
        venue_name: "Talent Community Application",
        contact_name: form.artistName,
        email: form.email,
        phone: form.phone || 'Not provided',
        venue_type: form.genre,
        location: form.location,
        capacity: form.experience,
        preferred_date: '',
        service_interest: 'Roster Application',
        message: form.bio + '\n\nLinks: ' + (form.links || 'None provided'),
      }, EJS.publicKey);
      await emailjs.send(EJS.serviceId, EJS.templateReply, {
        contact_name: form.artistName,
        email: form.email,
        venue_name: "Virtuoso Collective Roster",
      }, EJS.publicKey);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.1rem', fontFamily: 'Outfit, sans-serif',
    fontSize: T.body, color: C.nearBlack, background: C.white,
    border: `1px solid rgba(140,100,30,0.25)`, outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase', color: C.mid,
    display: 'block', marginBottom: '0.4rem',
  };

  const containerStyle = { maxWidth: 780, margin: '0 auto' };

  if (status === 'success') return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: C.ivory, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4.25rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <div style={{ fontSize: T.h1, marginBottom: '1.5rem' }}>◎</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.stat, marginBottom: '1rem' }}>Application Received</h1>
        <GoldLine />
        <p style={{ color: C.mid, lineHeight: 1.8, marginBottom: '1rem' }}>
          Thank you, <strong>{form.artistName}</strong>. We've received your application to join Virtuoso Collective and will review it shortly.
        </p>
        <p style={{ color: C.mid, lineHeight: 1.8, fontSize: T.body }}>
          A confirmation has been sent to <strong>{form.email}</strong>. If you don't see it, please check your spam folder.
        </p>
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: C.stone, border: `1px solid rgba(140,100,30,0.2)`, textAlign: 'left' }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldText, marginBottom: '0.75rem' }}>What Happens Next</p>
          {["Our team will review your application", "We'll assess your sound and style", "If we're a good fit, a member of our team will contact you within 5 business days", "We'll discuss opportunities and next steps"].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ color: C.goldText, fontWeight: 600, fontSize: T.small, flexShrink: 0 }}>{i + 1}.</span>
              <span style={{ color: C.mid, fontSize: T.small }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 72, background: C.ivory, minHeight: '100vh', padding: '5.5rem 2rem 4.25rem', position: 'relative', zIndex: 1 }}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <SectionLabel>Join Our Community</SectionLabel>
          <h1 style={{ fontSize: T.h1 }}>Apply to Join the Roster</h1>
          <GoldLine />
          <p style={{ color: C.mid, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            We're always looking for talented DJs to join Virtuoso Collective. Tell us about yourself and your sound.
          </p>
        </div>

        <div style={{ background: C.white, padding: '3rem', border: `1px solid rgba(140,100,30,0.22)` }}>
          {/* Artist Details */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: `1px solid rgba(140,100,30,0.2)` }}>Artist Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {[
                { label: 'Artist Name *', key: 'artistName', placeholder: 'Your stage name' },
                { label: 'Primary Genre *', key: 'genre', placeholder: 'e.g., House, Hip-Hop, R&B' },
                { label: 'Email Address *', key: 'email', placeholder: 'your@email.com', type: 'email' },
                { label: 'Phone', key: 'phone', placeholder: '+44 (optional)' },
                { label: 'Years of Experience', key: 'experience', placeholder: 'e.g., 5 years' },
                { label: 'Location', key: 'location', placeholder: 'City/Region' },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type={f.type || 'text'} placeholder={f.placeholder} value={form[f.key]} onChange={e => handleChange(f.key, e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = C.gold} onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'} />
                </div>
              ))}
            </div>
          </div>

          {/* Bio & Links */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: `1px solid rgba(140,100,30,0.2)` }}>About You</h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Tell us about your sound & experience</label>
              <textarea placeholder="Describe your music style, influences, key venues you've played at, and why you'd like to join Virtuoso Collective..." value={form.bio} onChange={e => handleChange('bio', e.target.value)} style={{ ...inputStyle, minHeight: '120px', fontFamily: 'Outfit, sans-serif', resize: 'vertical' }} onFocus={e => e.target.style.borderColor = C.gold} onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'} />
            </div>
            <div>
              <label style={labelStyle}>Links to Your Work</label>
              <input type="text" placeholder="Links to mixes, socials, or portfolio (comma separated)" value={form.links} onChange={e => handleChange('links', e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = C.gold} onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'} />
            </div>
          </div>

          {/* Privacy & Submit */}
          <div style={{ borderTop: `1px solid rgba(140,100,30,0.2)`, paddingTop: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.privacy} onChange={e => handleChange('privacy', e.target.checked)} style={{ marginTop: '0.3rem', cursor: 'pointer', width: 18, height: 18 }} />
              <span style={{ color: C.mid, fontSize: T.small, lineHeight: 1.6 }}>
                I agree to the <button onClick={() => setShowPrivacy(true)} style={{ background: 'none', border: 'none', color: C.goldText, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 'inherit' }}>privacy policy</button>
              </span>
            </label>
            <button onClick={handleSubmit} disabled={status === 'sending'} style={{
              width: '100%', padding: '1.1rem', fontFamily: 'Outfit, sans-serif', fontSize: T.body, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', background: C.goldSolid, color: C.nearBlack,
              border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}>
              {status === 'sending' ? 'Submitting Application…' : 'Submit Application'}
            </button>
            {status === 'error' && (
              <p style={{ color: 'rgb(220,38,38)', marginTop: '1rem', textAlign: 'center' }}>
                Something went wrong. Please try again or contact us directly.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: C.white, borderRadius: '8px', maxHeight: '80vh', overflowY: 'auto', padding: '2rem', maxWidth: '500px' }}>
            <button onClick={() => setShowPrivacy(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: T.xl, cursor: 'pointer', color: C.mid }}>×</button>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.xl, marginBottom: '1rem' }}>Privacy Policy</h2>
            <p style={{ fontSize: T.small, color: C.mid, lineHeight: 1.7 }}>
              By submitting this application, you agree to our <a href="#" onClick={e => { e.preventDefault(); }} style={{ color: C.goldText, textDecoration: 'underline' }}>privacy policy</a>. We'll use your information to review your application and contact you about opportunities with Virtuoso Collective.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BOOK A DJ PAGE (CLIENT ENQUIRY FORM) ────────────────────────────────────────
function BookADJPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventType: '', eventDate: '', eventLocation: '',
    guestCount: '', musicStyle: '', eventRequirements: '', privacy: false,
  });
  const [status, setStatus] = useState('idle');
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.privacy) { alert('Please accept the privacy policy to submit your booking enquiry.'); return; }
    if (!form.name || !form.email || !form.eventType) { alert('Please fill in all required fields.'); return; }
    setStatus('sending');
    try {
      await emailjs.send(EJS.serviceId, EJS.templateNotify, {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone || 'Not provided',
        event_type: form.eventType,
        date: form.eventDate,
        venue: form.eventLocation,
        guests: form.guestCount,
        notes: form.musicStyle && form.eventRequirements ? `${form.musicStyle}\n\n${form.eventRequirements}` : form.eventRequirements || form.musicStyle || 'No additional notes',
      }, EJS.publicKey);
      await emailjs.send(EJS.serviceId, EJS.templateReply, {
        from_name: form.name,
        from_email: form.email,
        event_type: form.eventType,
      }, EJS.publicKey);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.1rem', fontFamily: 'Outfit, sans-serif',
    fontSize: T.body, color: C.nearBlack, background: C.white,
    border: `1px solid rgba(140,100,30,0.25)`, outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase', color: C.mid,
    display: 'block', marginBottom: '0.4rem',
  };

  const containerStyle = { maxWidth: 780, margin: '0 auto' };

  if (status === 'success') return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: C.ivory, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4.25rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <div style={{ fontSize: T.h1, marginBottom: '1.5rem' }}>◆</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.stat, marginBottom: '1rem' }}>Booking Enquiry Received</h1>
        <GoldLine />
        <p style={{ color: C.mid, lineHeight: 1.8, marginBottom: '1rem' }}>
          Thank you, <strong>{form.name}</strong>. We have received your booking enquiry for your <strong>{form.eventType}</strong> and will be in touch within 24 hours.
        </p>
        <p style={{ color: C.mid, lineHeight: 1.8, fontSize: T.body }}>
          A confirmation has been sent to <strong>{form.email}</strong>. If you don't see it, please check your spam folder.
        </p>
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: C.stone, border: `1px solid rgba(140,100,30,0.2)`, textAlign: 'left' }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldText, marginBottom: '0.75rem' }}>What Happens Next</p>
          {['Our team reviews your event details', 'We match you with the right DJ from our collective', 'A Virtuoso Collective representative will contact you within 24 hours', 'We will confirm availability and discuss your event needs'].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ color: C.goldText, fontWeight: 600, fontSize: T.small, flexShrink: 0 }}>{i + 1}.</span>
              <span style={{ color: C.mid, fontSize: T.small }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 72, background: C.ivory, minHeight: '100vh', padding: '5.5rem 2rem 4.25rem', position: 'relative', zIndex: 1 }}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <SectionLabel>Book A DJ</SectionLabel>
          <h1 style={{ fontSize: T.h1 }}>Tell us about your event</h1>
          <GoldLine />
          <p style={{ color: C.mid, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Tell us about your event and we'll help match you with the right DJ from our curated collective.
          </p>
        </div>

        <div style={{ background: C.white, padding: '3rem', border: `1px solid rgba(140,100,30,0.22)` }}>
          {/* Event & Personal Details */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: `1px solid rgba(140,100,30,0.2)` }}>Your Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {[
                { label: 'Name *', key: 'name', placeholder: 'Your name' },
                { label: 'Email *', key: 'email', placeholder: 'your@email.com', type: 'email' },
                { label: 'Phone Number', key: 'phone', placeholder: '+44 7xxx xxxxxx', type: 'tel' },
              ].map(field => (
                <div key={field.key} style={{ gridColumn: field.key === 'name' ? '1 / 2' : 'auto' }}>
                  <label style={labelStyle}>{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => handleChange(field.key, e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = C.goldSolid}
                    onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Event Details */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: `1px solid rgba(140,100,30,0.2)` }}>Event Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Event Type *</label>
                <select value={form.eventType} onChange={e => handleChange('eventType', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Select event type</option>
                  {['Wedding', 'Birthday', 'Anniversary', 'Corporate Event', 'Brand Event', 'Private Party', 'Other'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Event Date *</label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={e => handleChange('eventDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = C.goldSolid}
                  onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Event Location</label>
                <input
                  type="text"
                  placeholder="City, postcode or venue name"
                  value={form.eventLocation}
                  onChange={e => handleChange('eventLocation', e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = C.goldSolid}
                  onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Guest Count (Approx)</label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={form.guestCount}
                  onChange={e => handleChange('guestCount', e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = C.goldSolid}
                  onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'}
                />
              </div>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Preferred Music Style / Genres</label>
              <input
                type="text"
                placeholder="e.g. House, Hip-Hop, Soul, Pop — or leave blank for recommendations"
                value={form.musicStyle}
                onChange={e => handleChange('musicStyle', e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = C.goldSolid}
                onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'}
              />
            </div>
          </div>

          {/* Event Requirements */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: `1px solid rgba(140,100,30,0.2)` }}>Additional Information</h3>
            <div>
              <label style={labelStyle}>Event Requirements & Notes</label>
              <textarea
                rows={5}
                placeholder="Tell us about your event atmosphere, any specific songs or artists you love, special moments (first dance, cake cutting, toasts), production requirements, or anything else we should know..."
                value={form.eventRequirements}
                onChange={e => handleChange('eventRequirements', e.target.value)}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                onFocus={e => e.target.style.borderColor = C.goldSolid}
                onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'}
              />
            </div>
          </div>

          {/* Privacy */}
          <div style={{ marginBottom: '2rem', padding: '1.25rem', background: C.stone, border: `1px solid rgba(140,100,30,0.22)` }}>
            <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.privacy} onChange={e => handleChange('privacy', e.target.checked)}
                style={{ marginTop: '0.2rem', width: 16, height: 16, flexShrink: 0, accentColor: C.goldSolid }} />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.small, color: C.mid, lineHeight: 1.6 }}>
                I have read and agree to Virtuoso Collective's{' '}
                <span onClick={() => setShowPrivacy(true)} style={{ color: C.goldText, cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>.
                {' '}I consent to my information being used to process this booking enquiry and for Virtuoso Collective to contact me regarding this event. *
              </span>
            </label>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={status === 'sending'} style={{
            width: '100%', fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: C.white,
            background: status === 'sending' ? C.mid : C.goldSolid,
            border: 'none', padding: '1.25rem', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}>
            {status === 'sending' ? 'Sending Enquiry…' : 'Send Booking Enquiry'}
          </button>
          {status === 'error' && (
            <p style={{ color: '#c0392b', fontSize: T.small, textAlign: 'center', marginTop: '1rem' }}>
              Something went wrong. Please try again or email us directly at jesse@virtuosocollective.co.uk.
            </p>
          )}
        </div>
      </div>
      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: C.white, borderRadius: '8px', maxHeight: '80vh', overflowY: 'auto', padding: '2rem', maxWidth: '500px' }}>
            <button onClick={() => setShowPrivacy(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: T.xl, cursor: 'pointer', color: C.mid }}>×</button>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.xl, marginBottom: '1rem' }}>Privacy Policy</h2>
            <p style={{ fontSize: T.small, color: C.mid, lineHeight: 1.7 }}>
              By submitting your booking enquiry, you agree to our privacy policy. We'll use your information to review your request and contact you about available DJ options for your event.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PARTNER PAGE (ENQUIRY FORM) ──────────────────────────────────────────────
function WorkWithUsPage() {
  const [form, setForm] = useState({
    venueName: '', contactName: '', email: '', phone: '',
    venueType: '', location: '', capacity: '', preferredDate: '',
    serviceInterest: '', message: '', privacy: false,
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.privacy) { alert('Please accept the privacy policy to submit your enquiry.'); return; }
    if (!form.venueName || !form.email || !form.contactName) { alert('Please fill in all required fields.'); return; }
    setStatus('sending');
    try {
      await emailjs.send(EJS.serviceId, EJS.templateNotify, {
        venue_name: form.venueName,
        contact_name: form.contactName,
        email: form.email,
        phone: form.phone || 'Not provided',
        venue_type: form.venueType,
        location: form.location,
        capacity: form.capacity,
        preferred_date: form.preferredDate,
        service_interest: form.serviceInterest,
        message: form.message,
      }, EJS.publicKey);
      await emailjs.send(EJS.serviceId, EJS.templateReply, {
        contact_name: form.contactName,
        email: form.email,
        venue_name: form.venueName,
      }, EJS.publicKey);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.1rem', fontFamily: 'Outfit, sans-serif',
    fontSize: T.body, color: C.nearBlack, background: C.white,
    border: `1px solid rgba(140,100,30,0.25)`, outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase', color: C.mid,
    display: 'block', marginBottom: '0.4rem',
  };

  const containerStyle = { maxWidth: 780, margin: '0 auto' };

  if (status === 'success') return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: C.ivory, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4.25rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <div style={{ fontSize: T.h1, marginBottom: '1.5rem' }}>◈</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.stat, marginBottom: '1rem' }}>Enquiry Received</h1>
        <GoldLine />
        <p style={{ color: C.mid, lineHeight: 1.8, marginBottom: '1rem' }}>
          Thank you, <strong>{form.contactName}</strong>. We've received your enquiry for <strong>{form.venueName}</strong> and will be in touch within 24 hours.
        </p>
        <p style={{ color: C.mid, lineHeight: 1.8, fontSize: T.body }}>
          A confirmation has been sent to <strong>{form.email}</strong>. If you don't see it, please check your spam folder.
        </p>
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: C.stone, border: `1px solid rgba(140,100,30,0.2)`, textAlign: 'left' }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.goldText, marginBottom: '0.75rem' }}>What Happens Next</p>
          {["Our team will review your enquiry", "We’ll match you with suitable artists from the roster", "A Virtuoso Collective representative will contact you within 24 hours", "We’ll schedule a discovery call at your convenience"].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ color: C.goldText, fontWeight: 600, fontSize: T.small, flexShrink: 0 }}>{i + 1}.</span>
              <span style={{ color: C.mid, fontSize: T.small }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 72, background: C.ivory, minHeight: '100vh', padding: '5.5rem 2rem 4.25rem', position: 'relative', zIndex: 1 }}>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <h1 style={{ fontSize: T.h1 }}>Partner With Virtuoso Collective</h1>
          <GoldLine />
          <p style={{ color: C.mid, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Tell us about your venue and what you're looking for. We'll be in touch within 24 hours.
          </p>
        </div>

        <div style={{ background: C.white, padding: '3rem', border: `1px solid rgba(140,100,30,0.22)` }}>
          {/* Venue Details */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: `1px solid rgba(140,100,30,0.2)` }}>Venue Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {[
                { label: 'Venue Name *', key: 'venueName', placeholder: 'Your venue name' },
                { label: 'Contact Name *', key: 'contactName', placeholder: 'Your name' },
                { label: 'Email Address *', key: 'email', placeholder: 'your@email.com', type: 'email' },
                { label: 'Phone Number', key: 'phone', placeholder: '+44 7xxx xxxxxx', type: 'tel' },
                { label: 'Venue Location', key: 'location', placeholder: 'City, UK' },
                { label: 'Approx Capacity', key: 'capacity', placeholder: 'e.g. 200' },
              ].map(field => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => handleChange(field.key, e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = C.goldSolid}
                    onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Enquiry Details */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.lead, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: `1px solid rgba(140,100,30,0.2)` }}>Enquiry Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Venue Type</label>
                <select value={form.venueType} onChange={e => handleChange('venueType', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Select venue type</option>
                  {['Nightclub / Bar', 'Hotel / Lounge', 'Restaurant', 'Events Space', 'Corporate Venue', 'Private Estate', 'Other'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Service Interest</label>
                <select value={form.serviceInterest} onChange={e => handleChange('serviceInterest', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Select a service</option>
                  {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  <option value="Not sure yet">Not sure yet — advise me</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Preferred Start Date / First Event</label>
              <input
                type="date"
                value={form.preferredDate}
                onChange={e => handleChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = C.goldSolid}
                onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'}
              />
            </div>
            <div>
              <label style={labelStyle}>Additional Information</label>
              <textarea
                rows={5}
                placeholder="Tell us more about your venue, your audience, any specific artists you're interested in, or anything else we should know..."
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                onFocus={e => e.target.style.borderColor = C.goldSolid}
                onBlur={e => e.target.style.borderColor = 'rgba(140,100,30,0.25)'}
              />
            </div>
          </div>

          {/* Privacy */}
          <div style={{ marginBottom: '2rem', padding: '1.25rem', background: C.stone, border: `1px solid rgba(140,100,30,0.22)` }}>
            <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.privacy} onChange={e => handleChange('privacy', e.target.checked)}
                style={{ marginTop: '0.2rem', width: 16, height: 16, flexShrink: 0, accentColor: C.goldSolid }} />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.small, color: C.mid, lineHeight: 1.6 }}>
                I have read and agree to Virtuoso Collective's{' '}
                <span onClick={() => setShowPrivacy(true)} style={{ color: C.goldText, cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>.
                {' '}I consent to my information being used to process this enquiry and for Virtuoso Collective to contact me in relation to entertainment services. *
              </span>
            </label>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={status === 'sending'} style={{
            width: '100%', fontFamily: 'Outfit, sans-serif', fontSize: T.small, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: C.white,
            background: status === 'sending' ? C.mid : C.goldSolid,
            border: 'none', padding: '1.25rem', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}>
            {status === 'sending' ? 'Sending Enquiry…' : 'Submit Partnership Enquiry'}
          </button>
          {status === 'error' && (
            <p style={{ color: '#c0392b', fontSize: T.small, textAlign: 'center', marginTop: '1rem' }}>
              Something went wrong. Please try again or email us directly at [VIRTUOSO EMAIL].
            </p>
          )}
        </div>
      </div>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(23,21,18,0.85)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
        }} onClick={() => setShowPrivacy(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: C.white, maxWidth: 640, width: '100%', maxHeight: '80vh',
            overflowY: 'auto', padding: '3rem', position: 'relative',
          }}>
            <button onClick={() => setShowPrivacy(false)} style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none',
              border: 'none', fontSize: T.xl, cursor: 'pointer', color: C.mid, lineHeight: 1,
            }}>×</button>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.xl, marginBottom: '0.5rem' }}>Privacy Policy</h2>
            <p style={{ fontSize: T.micro, color: C.mid, marginBottom: '1.5rem' }}>Last updated: [DATE] | Virtuoso Collective | London, UK</p>
            <GoldLine style={{ margin: '0 0 1.5rem' }} />
            {[
              { title: '1. Who We Are', body: 'Virtuoso Collective ("we", "us", "our") is an entertainment agency based in London, UK. Our email address is jesse@virtuosocollective.co.uk. We act as the data controller for personal information collected through this website.' },
              { title: '2. What Data We Collect', body: 'When you submit a partnership enquiry, we collect: your name, venue name, email address, phone number (optional), venue location, and any information provided in your message. We do not collect payment details through this website.' },
              { title: '3. How We Use Your Data', body: 'We use your data to: respond to your partnership enquiry; provide information about our services; contact you regarding potential bookings or partnerships; and improve our services. We will not send unsolicited marketing without your consent.' },
              { title: '4. Legal Basis for Processing', body: 'We process your data on the basis of: (a) your consent, given by ticking the checkbox on our enquiry form; and (b) our legitimate interest in responding to business enquiries.' },
              { title: '5. Data Retention', body: 'We retain enquiry data for a maximum of 24 months unless a partnership is formed, in which case we retain relevant data for the duration of the partnership plus seven years for legal and accounting purposes.' },
              { title: '6. Your Rights', body: 'Under UK GDPR, you have the right to: access your personal data; rectify inaccurate data; request erasure; restrict processing; data portability; and object to processing. To exercise any of these rights, contact us at jesse@virtuosocollective.co.uk.' },
              { title: '7. Third Parties', body: 'We use EmailJS to deliver enquiry form submissions. Your data is transmitted securely and is not sold to any third party. We do not use your data for advertising or profiling.' },
              { title: '8. Cookies', body: 'This website does not currently use tracking cookies or analytics cookies. Essential browser functionality only.' },
              { title: '9. Contact Us', body: 'For any privacy-related queries, contact us at jesse@virtuosocollective.co.uk. You also have the right to lodge a complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk.' },
            ].map(s => (
              <div key={s.title} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: T.body, marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ color: C.mid, fontSize: T.small, lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.nearBlack, padding: '4rem 2rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: T.h4, fontWeight: 700, color: C.white, marginBottom: '1rem' }}>
              <Wordmark colour={C.white} note={C.goldOnDark} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: T.small, lineHeight: 1.7 }}>
              Premium entertainment partnerships for venues that take their atmosphere seriously.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.goldOnDark, marginBottom: '1rem' }}>Navigate</p>
            {['Home', 'About Us', 'Services', 'Roster', 'FAQ', 'Work With Us'].map(item => (
              <div key={item} onClick={() => { setPage(item); window.scrollTo(0, 0); }} style={{
                fontFamily: 'Outfit, sans-serif', fontSize: T.small, color: 'rgba(255,255,255,0.78)',
                marginBottom: '0.5rem', cursor: 'pointer', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = C.white}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.78)'}
              >{item}</div>
            ))}
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.goldOnDark, marginBottom: '1rem' }}>Services</p>
            {SERVICES.map(s => (
              <div key={s.id} style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.small, color: 'rgba(255,255,255,0.78)', marginBottom: '0.5rem' }}>{s.title}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.goldOnDark, marginBottom: '1rem' }}>Contact</p>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.small, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              <a href="mailto:jesse@virtuosocollective.co.uk" style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.color = C.goldOnDark} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.78)'}>jesse@virtuosocollective.co.uk</a><br />124-128 City Road<br />London<br />EC1V 2NX
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              {['Instagram', 'LinkedIn'].map(s => (
                <a key={s} href="#" style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: T.micro, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)',
                  border: '1px solid rgba(255,255,255,0.15)', padding: '0.4rem 0.65rem',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.target.style.color = C.goldOnDark; e.target.style.borderColor = C.goldOnDark; }}
                  onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.78)'; e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, color: 'rgba(255,255,255,0.78)', marginBottom: '0.5rem' }}>
            VIRTUOSO COLLECTIVE LTD
          </p>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: T.micro, color: 'rgba(255,255,255,0.78)' }}>
            © {new Date().getFullYear()} Virtuoso Collective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
// ─── ROUTING ──────────────────────────────────────────────────────────────────
// Hash routing, so every page — artist profiles especially — has a real URL that
// can be shared and bookmarked, and the browser back button behaves. Internally
// a page is either a nav label ('About') or 'artist:<slug>'.
// Navigation pages with contact dropdown routing
const PAGES = ['Home', 'About Us', 'Services', 'Roster', 'FAQ', 'Book A DJ', 'Partner With Virtuoso'];

const pageToHash = (p) => {
  if (p.startsWith('artist:')) return `#/artist/${p.slice(7)}`;
  if (p === 'Home') return '#/';
  return '#/' + p.toLowerCase().replace(/\s+/g, '-');
};

const hashToPage = (hash) => {
  const h = (hash || '').replace(/^#\/?/, '').replace(/\/$/, '');
  if (!h) return 'Home';
  if (h.startsWith('artist/')) return `artist:${h.slice(7)}`;
  const match = PAGES.find(p => p.toLowerCase().replace(/\s+/g, '-') === h);
  return match || 'Home';
};

export default function App() {
  const [page, setPage] = useState(() => hashToPage(window.location.hash));
  const [contactDropdown, setContactDropdown] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  const setPageAndScroll = (p) => {
    setContactDropdown(false);
    setPage(p);
    if (window.location.hash !== pageToHash(p)) window.location.hash = pageToHash(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back/forward buttons and pasted links.
  useEffect(() => {
    const onHash = () => {
      setPage(hashToPage(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    emailjs.init(EJS.publicKey);
  }, []);

  const renderPage = () => {
    if (page.startsWith('artist:')) {
      return <ArtistPage slug={page.slice(7)} setPage={setPageAndScroll} />;
    }
    switch (page) {
      case 'Home':            return <HomePage setPage={setPageAndScroll} />;
      case 'About Us':        return <AboutPage setPage={setPageAndScroll} />;
      case 'Services':        return <ServicesPage setPage={setPageAndScroll} />;
      case 'Roster':          return <RosterPage setPage={setPageAndScroll} />;
      case 'FAQ':             return <FAQPage />;
      case 'Join the Roster':  return <TalentCommunityPage />;
      case 'Book A DJ':        return <BookADJPage />;
      case 'Partner With Virtuoso': return <WorkWithUsPage />;
      case 'Work With Us':     return <WorkWithUsPage />;
      default:                return <HomePage setPage={setPageAndScroll} />;
    }
  };

  // An artist profile still counts as "Roster" for nav highlighting.
  const navPage = page.startsWith('artist:') ? 'Roster' : page;

  return (
    <>
      <Navbar activePage={navPage} setPage={setPageAndScroll} contactDropdown={contactDropdown} setContactDropdown={setContactDropdown} mobileContactOpen={mobileContactOpen} setMobileContactOpen={setMobileContactOpen} setPageAndScroll={setPageAndScroll} />
      <main>{renderPage()}</main>
      <Footer setPage={setPageAndScroll} />
    </>
  );
}
