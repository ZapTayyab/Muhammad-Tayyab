import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, RotateCw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface BentoCardData {
  id: 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
  code: string;
  title: string;
  colSpanClass?: string;
  notch: 'top-right' | 'top-center' | 'bottom-right' | 'none';
  minHeightClass: string;
  frontPoints?: string[];
  frontBody?: string;
  detailHeadline: string;
  detailItems: string[];
  jumpTarget: string;
  jumpLabel: string;
}

const BENTO_CARDS: BentoCardData[] = [
  {
    id: 'a',
    code: '(a)',
    title: 'Full-Stack Architecture',
    notch: 'top-right',
    minHeightClass: 'min-h-[250px]',
    frontPoints: [
      'Flutter & Dart Cross-Platform',
      'React.js, Node.js & Express APIs',
      'Firebase, MongoDB & MySQL',
    ],
    detailHeadline: 'End-to-end client, API & persistence architecture',
    detailItems: [
      'Clean modular UI paired with typed Node/Express or PHP endpoints',
      'Auth, Firestore real-time state, and normalized SQL schemas',
    ],
    jumpTarget: '#skills',
    jumpLabel: 'Explore Stack',
  },
  {
    id: 'b',
    code: '(b)',
    title: 'AI Evaluation & ML',
    notch: 'top-center',
    minHeightClass: 'min-h-[250px]',
    frontBody:
      'Contributed to Onyx AI safety, robustness, and regression testing pipelines alongside fine-tuned Sentence Transformer cross-encoders for semantic reranking.',
    detailHeadline: 'LLM regression QA & transformer reranking',
    detailItems: [
      'Safety & adversarial payload checks on Onyx AI',
      'Cross-Encoder hard-negative model published on Hugging Face',
    ],
    jumpTarget: '#projects',
    jumpLabel: 'See AI Projects',
  },
  {
    id: 'c',
    code: '(c)',
    title: 'Production Software Engineer',
    colSpanClass: 'md:col-span-2',
    notch: 'bottom-right',
    minHeightClass: 'min-h-[250px]',
    frontBody:
      'Turning client requirements into responsive web platforms, Play Store mobile releases, and reliable backend architectures—verified end-to-end with Cypress, Selenium, and clean Gradle/Kotlin release workflows.',
    detailHeadline: 'Requirement-to-release engineering ownership',
    detailItems: [
      'Delivered client platforms across UAE hospitality, mobile startups, and remote teams',
      'Full lifecycle coverage from initial scoping through automated QA and live deployment',
    ],
    jumpTarget: '#experience',
    jumpLabel: 'View Timeline',
  },
  {
    id: 'd',
    code: '(d)',
    title: 'Google Play Apps',
    notch: 'none',
    minHeightClass: 'min-h-[245px]',
    frontBody:
      'Delivered Funderaa as solo developer and engineered Fitfortis backend services—both live in production on the Google Play Store.',
    detailHeadline: 'Production Android & cross-platform launches',
    detailItems: [
      'Funderaa: solo Flutter marketplace build & Play Console release',
      'Fitfortis: scalable backend architecture & multi-client API sync',
    ],
    jumpTarget: '#projects',
    jumpLabel: 'Inspect Releases',
  },
  {
    id: 'e',
    code: '(e)',
    title: 'Testing & Cloud',
    notch: 'top-right',
    minHeightClass: 'min-h-[245px]',
    frontBody:
      'Component and E2E automation with Cypress and Selenium, backed by Docker Engine, Git workflows, Vercel, Netlify, and Firebase Hosting.',
    detailHeadline: 'Automated verification & zero-friction deploys',
    detailItems: [
      'Cypress component & end-to-end regression suites',
      'Selenium browser automation & containerized Docker workflows',
    ],
    jumpTarget: '#skills',
    jumpLabel: 'QA Capabilities',
  },
];

const CARD_F: BentoCardData = {
  id: 'f',
  code: '(f)',
  title: '3D & Interactive Web',
  notch: 'top-right',
  minHeightClass: 'min-h-[245px]',
  frontBody:
    'Built Neon Star Saler 3D browser gameplay in JavaScript alongside Three.js and GSAP motion interfaces deployed live on Vercel.',
  detailHeadline: 'Real-time WebGL & choreographed motion',
  detailItems: [
    'Neon Star Saler: custom 3D gameplay loop & collision physics',
    'Three.js + GSAP spatial canvas scenes running smoothly at 60fps',
  ],
  jumpTarget: '#projects',
  jumpLabel: 'View 3D Works',
};

const ABOUT_MODES = [
  {
    id: 'overview',
    label: 'Summary',
    copy: PROFILE.summary,
  },
  {
    id: 'approach',
    label: 'Engineering Approach',
    copy: 'Focused on shipping fast, verifiable software without shortcuts—pairing clean Flutter & React frontends with structured Node.js/MySQL backends, Cypress/Selenium regression guards, and tactile WebGL motion.',
  },
];

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  align: 'left' | 'right';
  visual: 'mobile' | 'play' | 'ai';
  shipped: string[];
  roleLabel: string;
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: '2024',
    title: 'FREELANCE FULL-STACK & MOBILE',
    description:
      'Started remote freelance engineering delivering Flutter & Dart cross-platform apps, Firebase Auth + Firestore mobile MVPs, PHP/MySQL proposal automation, and React.js landing pages.',
    align: 'left',
    visual: 'mobile',
    roleLabel: 'Remote Client Delivery · Started July 2024',
    shipped: [
      'Built Flutter & Dart student-management mobile workflows for streamlined data entry',
      'Integrated Firebase Auth & Firestore persistence across client MVPs',
      'Delivered automated PHP & MySQL proposal generation + responsive React pages',
    ],
  },
  {
    year: '2025',
    title: 'GOOGLE PLAY RELEASES & ML',
    description:
      'Shipped Funderaa (solo blockchain-powered startup investment app) and Fitfortis backend architecture to Google Play Store, and trained Sentence Transformer cross-encoder models.',
    align: 'right',
    visual: 'play',
    roleLabel: 'Production Mobile & Spatial Web',
    shipped: [
      'Solo-engineered Funderaa from Flutter client to signed Google Play Store release',
      'Architected Fitfortis cloud API routes and database structure for Play launch',
      'Deployed custom Three.js & GSAP interactive spatial portfolio experience',
    ],
  },
  {
    year: '2026',
    title: 'ZYNVEX SOL & AI EVALUATION',
    description:
      'Joined ZYNVEX SOL as Full-Stack Developer Intern—verifying Onyx AI LLM safety and regression workflows with Cypress & Selenium, building Neon Star Saler 3D and Aurum UAE.',
    align: 'left',
    visual: 'ai',
    roleLabel: 'Full-Stack Developer Intern · Active',
    shipped: [
      'Wrote Cypress & Selenium E2E/component test suites for Onyx AI LLM safety pipelines',
      'Shipped Neon Star Saler 3D WebGL game on Vercel & Aurum UAE enterprise website',
      'Trained & published hard-negative Cross-Encoder reranking model + 8x Amazon workflow',
    ],
  },
];

function MilestoneEmblem({
  type,
  isActive,
}: {
  type: 'mobile' | 'play' | 'ai';
  isActive: boolean;
}) {
  const isLeftAlign = type === 'play';

  return (
    <motion.div
      animate={{
        scale: isActive ? 1.07 : 1,
      }}
      whileHover={{ scale: 1.09 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: EASE_EXPO }}
      className="group/capsule relative w-40 h-24 sm:w-48 sm:h-28 flex items-center justify-center select-none"
    >
      {/* Interactive Tilted Red Capsule (#E61919) */}
      <motion.div
        aria-hidden="true"
        animate={{
          rotate: isActive ? (isLeftAlign ? 6 : -6) : isLeftAlign ? 12 : -12,
          scaleX: isActive ? 1.06 : 1,
        }}
        transition={{ duration: 0.3, ease: EASE_EXPO }}
        className={`w-36 h-16 sm:w-44 sm:h-[72px] rounded-full bg-[#E61919] transition-colors duration-200 ${
          isActive ? 'ring-2 ring-white/25' : ''
        }`}
      />

      {/* Crisp Floating Foreground Engineering Silhouette */}
      <motion.div
        animate={{ y: isActive ? -3 : 0 }}
        transition={{ duration: 0.28, ease: EASE_EXPO }}
        className="absolute z-10 flex items-center justify-center transition-transform duration-200 group-hover/capsule:-translate-y-1"
      >
        {type === 'mobile' && (
          <svg
            viewBox="0 0 80 96"
            className="w-16 h-20 drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)]"
            aria-hidden="true"
          >
            <rect
              x="16"
              y="6"
              width="48"
              height="84"
              rx="10"
              fill="#18181B"
              stroke="#F5F5F3"
              strokeWidth="2"
            />
            <rect x="30" y="12" width="20" height="3" rx="1.5" fill="#52525B" />
            <rect x="23" y="22" width="34" height="24" rx="4" fill="#27272A" />
            <rect x="23" y="52" width="24" height="6" rx="2" fill="#F5F5F3" />
            <rect x="23" y="63" width="34" height="5" rx="2" fill="#71717A" />
            <rect x="23" y="74" width="18" height="8" rx="3" fill="#E61919" />
          </svg>
        )}
        {type === 'play' && (
          <svg
            viewBox="0 0 96 96"
            className="w-20 h-20 drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)]"
            aria-hidden="true"
          >
            <rect
              x="14"
              y="14"
              width="68"
              height="68"
              rx="16"
              fill="#111113"
              stroke="#F5F5F3"
              strokeWidth="2"
            />
            <polygon points="39,31 66,48 39,65" fill="#F5F5F3" />
          </svg>
        )}
        {type === 'ai' && (
          <svg
            viewBox="0 0 96 88"
            className="w-20 h-20 drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)]"
            aria-hidden="true"
          >
            <polygon
              points="48,8 84,28 84,60 48,80 12,60 12,28"
              fill="#111113"
              stroke="#F5F5F3"
              strokeWidth="2"
            />
            <polyline
              points="12,28 48,48 84,28"
              fill="none"
              stroke="#F5F5F3"
              strokeWidth="1.5"
            />
            <line x1="48" y1="48" x2="48" y2="80" stroke="#F5F5F3" strokeWidth="1.5" />
            <circle cx="48" cy="48" r="6" fill="#E61919" />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}

function InteractiveBentoCard({
  card,
  delay,
  isFlipped,
  onToggle,
}: {
  card: BentoCardData;
  delay: number;
  isFlipped: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay, ease: EASE_EXPO }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-[20px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden ${
        card.minHeightClass
      } ${card.colSpanClass ?? ''} ${
        isFlipped
          ? 'bg-white text-[#111113] ring-1 ring-[#E61919]/55 shadow-[0_14px_34px_-16px_rgba(230,25,25,0.2)]'
          : 'bg-[#F5F5F3] text-[#111113] hover:bg-white transition-colors duration-200'
      }`}
    >
      {/* Architectural Stepped Notches matching Bento Silhouette */}
      {card.notch === 'top-right' && (
        <div
          aria-hidden="true"
          className="hidden sm:block absolute top-0 right-0 w-16 h-12 bg-[#0B0B0D] rounded-bl-[24px] pointer-events-none"
        />
      )}
      {card.notch === 'top-center' && (
        <div
          aria-hidden="true"
          className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-[#0B0B0D] rounded-b-xl pointer-events-none"
        />
      )}
      {card.notch === 'bottom-right' && (
        <div
          aria-hidden="true"
          className="hidden sm:block absolute bottom-0 right-0 w-24 h-6 bg-[#0B0B0D] rounded-tl-[20px] pointer-events-none"
        />
      )}

      {/* Top Row: Code Index + Interactive Flip Trigger */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isFlipped}
          aria-label={`${isFlipped ? 'Show summary for' : 'Inspect engineering specs for'} ${card.title}`}
          className="inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] rounded-md"
        >
          <span
            className={`font-display text-2xl sm:text-3xl font-semibold tracking-tight transition-colors duration-200 ${
              isFlipped
                ? 'text-[#E61919]'
                : 'text-[#111113] group-hover:text-[#E61919]'
            }`}
          >
            {card.code}
          </span>
        </button>

        <button
          type="button"
          onClick={onToggle}
          aria-label={`${isFlipped ? 'Flip back' : 'Inspect details'} — ${card.title}`}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] ${
            card.notch === 'top-right' ? 'mr-12 sm:mr-14' : ''
          } ${
            isFlipped
              ? 'bg-[#E61919] text-white rotate-180'
              : 'bg-black/5 text-zinc-600 group-hover:bg-[#E61919] group-hover:text-white'
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Card Content Body (Flips smoothly between Overview & Spec Proof) */}
      <div className="relative z-10 mt-8">
        <AnimatePresence mode="wait" initial={false}>
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE_EXPO }}
              onClick={onToggle}
              className="cursor-pointer"
            >
              <h3 className="font-display text-sm sm:text-base font-extrabold uppercase tracking-tight text-[#111113] group-hover:text-[#E61919] transition-colors">
                {card.title}
              </h3>

              {card.frontPoints ? (
                <ul className="mt-3 space-y-1.5 text-xs sm:text-[13px] text-zinc-700 font-medium">
                  {card.frontPoints.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-[#111113] group-hover:bg-[#E61919] transition-colors shrink-0"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className={`mt-2.5 text-xs sm:text-[13px] text-zinc-600 leading-relaxed ${
                    card.id === 'c' ? 'max-w-xl sm:pr-16' : ''
                  }`}
                >
                  {card.frontBody}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE_EXPO }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E61919] font-semibold">
                {card.title}
              </p>
              <h3 className="mt-1 font-display text-sm sm:text-base font-bold text-[#111113] leading-snug">
                {card.detailHeadline}
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-xs text-zinc-600 leading-relaxed">
                {card.detailItems.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E61919] shrink-0"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-2">
                <a
                  href={card.jumpTarget}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#111113] hover:text-[#E61919] transition-colors"
                >
                  <span>{card.jumpLabel}</span>
                  <ArrowDownRight className="w-3.5 h-3.5 text-[#E61919]" />
                </a>
                <button
                  type="button"
                  onClick={onToggle}
                  className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-[#111113] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function OverviewSection() {
  const [flippedCardId, setFlippedCardId] = useState<BentoCardData['id'] | null>(null);
  const [aboutModeIdx, setAboutModeIdx] = useState(0);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [activeYear, setActiveYear] = useState<string>('2026');

  const toggleCard = (id: BentoCardData['id']) => {
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  const toggleYear = (year: string) => {
    setActiveYear((prev) => (prev === year ? '' : year));
  };

  const activeAbout = ABOUT_MODES[aboutModeIdx];

  return (
    <section
      id="overview"
      className="relative bg-[#0B0B0D] text-[#F5F5F3] py-20 sm:py-28 border-t border-zinc-800/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP HEADER: Left quiet label + Centered bold title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="relative flex flex-col sm:flex-row sm:items-center justify-center mb-10 sm:mb-12"
        >
          <span className="sm:absolute sm:left-0 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-2 sm:mb-0">
            Overview
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase text-[#F5F5F3] text-left sm:text-center">
            MUHAMMAD TAYYAB
          </h2>
        </motion.div>

        {/* BENTO GRID PART 1 — ROW 1: (a) 1 col + (b) 1 col + (c) 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {BENTO_CARDS.map((card, idx) => (
            <InteractiveBentoCard
              key={card.id}
              card={card}
              delay={0.04 + idx * 0.045}
              isFlipped={flippedCardId === card.id}
              onToggle={() => toggleCard(card.id)}
            />
          ))}

          {/* Solid Crimson Focal CTA Card */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.18, ease: EASE_EXPO }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-[#E61919] hover:bg-[#C81414] text-white rounded-[20px] p-6 sm:p-7 min-h-[245px] flex flex-col items-center justify-center text-center transition-colors duration-150 shadow-[0_16px_40px_-14px_rgba(230,25,25,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] inline-flex items-center gap-1.5">
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.a>

          {/* Card (f) */}
          <InteractiveBentoCard
            card={CARD_F}
            delay={0.22}
            isFlipped={flippedCardId === CARD_F.id}
            onToggle={() => toggleCard(CARD_F.id)}
          />
        </div>

        {/* PART 2: INTERACTIVE ABOUT ME TITLE & ALTERNATING YEAR + RED CAPSULE TIMELINE */}
        <div className="mt-24 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="relative flex flex-col sm:flex-row sm:items-center justify-center"
          >
            <span className="sm:absolute sm:left-0 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-2 sm:mb-0">
              Background
            </span>

            {/* Interactive ABOUT ME Trigger Heading */}
            <button
              type="button"
              onClick={() => setAboutModeIdx((prev) => (prev + 1) % ABOUT_MODES.length)}
              onMouseEnter={() => setAboutHovered(true)}
              onMouseLeave={() => setAboutHovered(false)}
              aria-label="Toggle About Me summary and engineering approach"
              className="group relative inline-flex flex-col items-start sm:items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] rounded-lg px-2 py-1"
            >
              <motion.h2
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: EASE_EXPO }}
                className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase text-[#F5F5F3] group-hover:text-white transition-colors"
              >
                ABOUT <span className={aboutHovered || aboutModeIdx === 1 ? 'text-[#E61919] transition-colors' : 'transition-colors'}>ME</span>
              </motion.h2>
              <motion.span
                aria-hidden="true"
                initial={false}
                animate={{
                  scaleX: aboutHovered || aboutModeIdx === 1 ? 1 : 0.28,
                  backgroundColor: aboutHovered || aboutModeIdx === 1 ? '#E61919' : '#3F3F46',
                }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
                className="mt-1.5 h-[3px] w-28 sm:w-36 origin-left sm:origin-center rounded-full"
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE_EXPO }}
            className="mt-7 max-w-xl mx-auto sm:pl-16"
          >
            {/* Interactive Mode Switcher below ABOUT ME */}
            <div className="mb-3 flex items-center gap-4 text-xs font-mono">
              {ABOUT_MODES.map((mode, idx) => {
                const selected = idx === aboutModeIdx;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setAboutModeIdx(idx)}
                    className={`cursor-pointer transition-colors pb-1 border-b-2 ${
                      selected
                        ? 'text-white border-[#E61919]'
                        : 'text-zinc-500 border-transparent hover:text-zinc-300'
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeAbout.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE_EXPO }}
                className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed"
              >
                {activeAbout.copy}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* 3-Row Alternating Year + Red Capsule Interactive Timeline:
              2024 Left / Red Capsule Right
              2025 Red Capsule Left / Year Right
              2026 Left / Red Capsule Right */}
          <div className="mt-16 sm:mt-20 space-y-10 sm:space-y-14">
            {TIMELINE_ITEMS.map((item, idx) => {
              const isYearLeft = item.align === 'left';
              const isActive = activeYear === item.year;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE_EXPO }}
                  className={`relative border-t transition-colors duration-300 ${
                    isActive ? 'border-[#E61919]/60 bg-white/[0.02] rounded-2xl px-4 sm:px-6' : 'border-zinc-800/80'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 py-6 sm:py-8">
                    {/* Left Slot: Year (2024/2026) OR Red Capsule (2025) */}
                    <div
                      className={`md:col-span-4 flex ${
                        isYearLeft
                          ? 'order-1 md:order-none justify-start'
                          : 'order-3 md:order-none justify-start md:justify-start'
                      }`}
                    >
                      {isYearLeft ? (
                        <button
                          type="button"
                          onClick={() => toggleYear(item.year)}
                          aria-expanded={isActive}
                          aria-label={`Inspect ${item.year} engineering milestone`}
                          className="group/year inline-flex items-baseline gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] rounded-lg"
                        >
                          <motion.span
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ duration: 0.2, ease: EASE_EXPO }}
                            className={`font-display text-4xl sm:text-6xl font-black tracking-tight tabular-nums transition-colors duration-200 ${
                              isActive
                                ? 'text-[#E61919]'
                                : 'text-[#F5F5F3] group-hover/year:text-[#E61919]'
                            }`}
                          >
                            {item.year}
                          </motion.span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleYear(item.year)}
                          aria-expanded={isActive}
                          aria-label={`Inspect ${item.year} red capsule milestone`}
                          className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] rounded-full"
                        >
                          <MilestoneEmblem type={item.visual} isActive={isActive} />
                        </button>
                      )}
                    </div>

                    {/* Center Slot: Concise Milestone Copy (also clickable to toggle) */}
                    <button
                      type="button"
                      onClick={() => toggleYear(item.year)}
                      className="md:col-span-4 order-2 md:order-none text-left cursor-pointer group/copy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] rounded-lg"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#E61919] font-semibold">
                        {item.title}
                      </p>
                      <p className="mt-2 text-xs sm:text-sm text-zinc-400 group-hover/copy:text-zinc-200 transition-colors leading-relaxed">
                        {item.description}
                      </p>
                    </button>

                    {/* Right Slot: Red Capsule (2024/2026) OR Year (2025) */}
                    <div
                      className={`md:col-span-4 flex ${
                        isYearLeft
                          ? 'order-3 md:order-none justify-start md:justify-end'
                          : 'order-1 md:order-none justify-start md:justify-end'
                      }`}
                    >
                      {isYearLeft ? (
                        <button
                          type="button"
                          onClick={() => toggleYear(item.year)}
                          aria-expanded={isActive}
                          aria-label={`Inspect ${item.year} red capsule milestone`}
                          className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] rounded-full"
                        >
                          <MilestoneEmblem type={item.visual} isActive={isActive} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleYear(item.year)}
                          aria-expanded={isActive}
                          aria-label={`Inspect ${item.year} engineering milestone`}
                          className="group/year inline-flex items-baseline gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] rounded-lg"
                        >
                          <motion.span
                            whileHover={{ x: -4 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ duration: 0.2, ease: EASE_EXPO }}
                            className={`font-display text-4xl sm:text-6xl font-black tracking-tight tabular-nums transition-colors duration-200 ${
                              isActive
                                ? 'text-[#E61919]'
                                : 'text-[#F5F5F3] group-hover/year:text-[#E61919]'
                            }`}
                          >
                            {item.year}
                          </motion.span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Interactive Expandable Milestone Drawer */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: EASE_EXPO }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pt-4 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className="md:col-span-4 font-mono text-xs text-zinc-400">
                            {item.roleLabel}
                          </div>
                          <ul className="md:col-span-6 space-y-1.5 text-xs sm:text-sm text-zinc-200">
                            {item.shipped.map((line) => (
                              <li key={line} className="flex items-start gap-2.5">
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E61919] shrink-0"
                                />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="md:col-span-2 flex md:justify-end">
                            <a
                              href="#projects"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#E61919] transition-colors whitespace-nowrap"
                            >
                              <span>See Works</span>
                              <ArrowDownRight className="w-3.5 h-3.5 text-[#E61919]" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
