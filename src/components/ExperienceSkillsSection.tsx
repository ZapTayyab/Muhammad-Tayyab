import { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Database,
  Layers,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import capabilityMobileImg from '../assets/images/capability_mobile_3d_1794739271406.jpg';
import capabilityBackendImg from '../assets/images/capability_backend_3d_1794739272845.jpg';
import capabilityFrontendImg from '../assets/images/capability_frontend_3d_1794739273226.jpg';
import capabilityAiImg from '../assets/images/capability_ai_3d_1794739273936.jpg';
import capabilityQaImg from '../assets/images/capability_qa_3d_1794739273715.jpg';

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ExperienceStageEntry {
  id: string;
  indexLabel: string;
  category: 'Experience' | 'Education';
  period: string;
  statusText: string;
  isCurrent?: boolean;
  role: string;
  organization: string;
  location: string;
  summary: string;
  highlights: string[];
  stackLine: string;
}

const EXPERIENCE_ENTRIES: ExperienceStageEntry[] = [
  {
    id: 'zynvex',
    indexLabel: '01',
    category: 'Experience',
    period: '2026 – Present',
    statusText: 'Current',
    isCurrent: true,
    role: 'Full-Stack Developer Intern',
    organization: 'ZYNVEX SOL',
    location: 'Remote',
    summary:
      'Contributing to AI safety evaluation tooling, interactive 3D web experiences, and international client delivery with automated regression suites.',
    highlights: [
      'Built end-to-end and component verification suites with Cypress and Selenium for Onyx AI, strengthening LLM safety and robustness regression checks.',
      'Engineered Neon Star Saler, a real-time 3D browser game built with JavaScript and WebGL visual effects deployed on Vercel.',
      'Delivered the Aurum production business platform for a UAE enterprise alongside custom web solutions for hospitality teams.',
      'Completed an Amazon-style e-commerce hiring assessment for 8x Careers featuring modular catalog and cart state workflows.',
    ],
    stackLine: 'Cypress · Selenium · React.js · Node.js · JavaScript · LLM Evaluation',
  },
  {
    id: 'freelance',
    indexLabel: '02',
    category: 'Experience',
    period: 'July 2024 – Present',
    statusText: 'Current',
    isCurrent: true,
    role: 'Freelance Full-Stack & Mobile Engineer',
    organization: 'Independent Practice',
    location: 'Remote',
    summary:
      'Translating client briefs into published Google Play mobile releases, cloud-backed MVPs, and automated business workflow systems.',
    highlights: [
      'Shipped cross-platform mobile applications with Flutter and Dart, including solo Play Store production delivery for Funderaa.',
      'Integrated Firebase Authentication and Firestore real-time cloud persistence across multi-client mobile MVPs.',
      'Developed an automated proposal-generation platform powered by PHP and MySQL to shorten client document turnaround.',
      'Built responsive React.js landing systems and resolved Android Gradle and Kotlin release pipeline configurations.',
    ],
    stackLine: 'Flutter · Dart · Firebase · React.js · PHP · MySQL · Kotlin',
  },
  {
    id: 'cusit',
    indexLabel: '03',
    category: 'Education',
    period: 'Undergraduate Track',
    statusText: 'Degree',
    role: 'BS in Software Engineering',
    organization: 'City University of Science & IT (CUSIT)',
    location: 'Peshawar, Pakistan',
    summary:
      'Core academic foundation across software architecture, relational databases, algorithms, automated verification, and cross-platform delivery.',
    highlights: [
      'Applied software design patterns, object-oriented modeling, and structured system decomposition across full-stack and mobile coursework.',
      'Designed normalized relational SQL schemas, indexing strategies, and transactional persistence models.',
      'Investigated machine learning text-pair scoring, shipping an open Cross-Encoder reranking model on Hugging Face Hub.',
    ],
    stackLine: 'Software Architecture · Algorithms · Relational SQL · OOP · Cross-Encoder NLP',
  },
  {
    id: 'certification',
    indexLabel: '04',
    category: 'Education',
    period: 'Completed Track',
    statusText: 'Certified',
    role: 'Full Stack Development Certificate',
    organization: 'ZYNVEX SOL Engineering Track',
    location: 'Remote',
    summary:
      'Intensive applied engineering track spanning modern frontend architectures, RESTful backend APIs, relational data layers, and production QA.',
    highlights: [
      'Architected full-stack web workflows pairing React component hierarchies with Node.js and Express REST endpoints.',
      'Structured relational database integrations and authentication boundaries across multi-environment builds.',
      'Executed automated browser verification suites and continuous deployment checklists prior to production release.',
    ],
    stackLine: 'Full-Stack Web · REST APIs · E2E Testing · Cloud Deployment',
  },
];

interface CapabilityPanel {
  id: string;
  title: string;
  subtitle: string;
  stack: string;
  icon: 'mobile' | 'backend' | 'frontend' | 'ai' | 'devops';
  iconColorClass: string;
  image: string;
  imageAlt: string;
}

const CAPABILITY_PANELS: CapabilityPanel[] = [
  {
    id: 'mobile',
    title: 'Mobile Systems',
    subtitle: 'Flutter, Dart & Google Play Store production builds',
    stack: 'Flutter · Dart · React Native · Kotlin · Gradle',
    icon: 'mobile',
    iconColorClass: 'text-[#E11010]',
    image: capabilityMobileImg,
    imageAlt: '3D studio render of floating obsidian smartphone hardware with glowing crimson UI glass planes',
  },
  {
    id: 'backend',
    title: 'Backend & Databases',
    subtitle: 'RESTful APIs, authentication & relational schemas',
    stack: 'Node.js · Express · PHP · MySQL · Supabase · Firebase',
    icon: 'backend',
    iconColorClass: 'text-[#D97706]',
    image: capabilityBackendImg,
    imageAlt: '3D studio render of modular obsidian server cubes connected by glowing crimson fiber conduits',
  },
  {
    id: 'frontend',
    title: 'Frontend & 3D Web',
    subtitle: 'Responsive React architectures, Three.js & GSAP motion',
    stack: 'React.js · TypeScript · Tailwind CSS · Three.js · WebGL',
    icon: 'frontend',
    iconColorClass: 'text-[#E11010]',
    image: capabilityFrontendImg,
    imageAlt: '3D studio render of sculptural matte-black geometric ribbons and wireframe spatial planes',
  },
  {
    id: 'ai',
    title: 'AI & ML Engineering',
    subtitle: 'LLM safety workflows & Sentence Transformer reranking',
    stack: 'Python · LLM Safety · Cross-Encoder NLP · Semantic Search',
    icon: 'ai',
    iconColorClass: 'text-[#059669]',
    image: capabilityAiImg,
    imageAlt: '3D studio render of crystalline obsidian neural nodes linked by glowing crimson synaptic beams',
  },
  {
    id: 'devops',
    title: 'Cloud & QA Automation',
    subtitle: 'Automated Cypress & Selenium verification pipelines',
    stack: 'Cypress · Selenium · Cloudflare · Docker · E2E Testing',
    icon: 'devops',
    iconColorClass: 'text-[#2563EB]',
    image: capabilityQaImg,
    imageAlt: '3D studio render of precision obsidian optical prisms aligned by crimson laser verification grids',
  },
];

function CapabilityIcon({ type, className }: { type: CapabilityPanel['icon']; className?: string }) {
  switch (type) {
    case 'mobile':
      return <Smartphone className={className} />;
    case 'backend':
      return <Database className={className} />;
    case 'frontend':
      return <Layers className={className} />;
    case 'ai':
      return <Cpu className={className} />;
    case 'devops':
    default:
      return <ShieldCheck className={className} />;
  }
}

function CapabilityBackdrop({
  image,
  alt,
  isActive,
}: {
  image: string;
  alt: string;
  isActive: boolean;
}) {
  return (
    <div className="absolute inset-0 bg-[#0B0B0D] overflow-hidden">
      <img
        src={image}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`w-full h-full object-cover object-center transition-[transform,opacity] duration-700 ease-out will-change-transform select-none ${
          isActive
            ? 'scale-100 opacity-100'
            : 'scale-105 opacity-75 group-hover:opacity-95'
        }`}
      />
    </div>
  );
}

export function ExperienceSkillsSection() {
  const [selectedExpIndex, setSelectedExpIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(2);
  const [showAllDetails, setShowAllDetails] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 55%'],
  });
  const railScaleY = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  const activeExperience = EXPERIENCE_ENTRIES[selectedExpIndex];

  const handleStepExperience = (delta: number) => {
    setSelectedExpIndex(
      (prev) => (prev + delta + EXPERIENCE_ENTRIES.length) % EXPERIENCE_ENTRIES.length
    );
  };

  return (
    <div className="bg-[#F5F5F3] text-[#0B0B0D] border-t border-[#E2E2DF]">
      {/* BAND 1 — 02. EXPERIENCE: CHOREOGRAPHED INTERACTIVE TIMELINE & STAGE */}
      <section
        id="experience"
        className="py-20 sm:py-28 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="mb-12 sm:mb-16"
          >
            <p className="font-mono text-xs tracking-[0.14em] text-[#E11010] font-semibold uppercase">
              02. Experience
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B0B0D] headline-balance">
              Engineering Timeline &amp; Delivery
            </h2>
          </motion.div>

          {/* Split-Stage Career Timeline: Interactive Left Rail + Animated Obsidian Stage */}
          <div
            ref={timelineRef}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            {/* Left Column (5 cols): Scroll-Tracked Spine & Interactive Role Selector */}
            <div
              role="tablist"
              aria-label="Career and education timeline entries"
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                  e.preventDefault();
                  handleStepExperience(1);
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  handleStepExperience(-1);
                }
              }}
              className="lg:col-span-5 relative pl-7 sm:pl-9 space-y-3"
            >
              {/* Static Hairline Vertical Axis */}
              <div
                aria-hidden="true"
                className="absolute left-2.5 sm:left-3 top-4 bottom-4 w-px bg-[#E2E2DF]"
              />

              {/* Scroll-Driven Crimson Progress Line (Compositor-Only scaleY) */}
              <motion.div
                aria-hidden="true"
                style={{ scaleY: railScaleY }}
                className="origin-top absolute left-2.5 sm:left-3 top-4 bottom-4 w-px bg-[#E11010]"
              />

              {EXPERIENCE_ENTRIES.map((entry, idx) => {
                const isSelected = idx === selectedExpIndex;
                return (
                  <motion.button
                    key={entry.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedExpIndex(idx)}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.07, ease: EASE_EXPO }}
                    className={`group relative w-full text-left rounded-2xl p-5 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11010] ${
                      isSelected
                        ? 'text-[#0B0B0D]'
                        : 'text-zinc-600 hover:bg-white/70 hover:text-[#0B0B0D]'
                    }`}
                  >
                    {/* Shared-Element Sliding White Card Surface */}
                    {isSelected && (
                      <motion.div
                        layoutId="experience-active-surface"
                        transition={{ duration: 0.35, ease: EASE_EXPO }}
                        className="absolute inset-0 rounded-2xl bg-white border border-[#E2E2DF] shadow-[0_14px_34px_-16px_rgba(11,11,13,0.14)]"
                      />
                    )}

                    {/* Timeline Axis Node Indicator */}
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[23px] sm:-left-[29px] top-7 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#E11010] border-[#E11010] scale-125'
                          : 'bg-[#F5F5F3] border-[#B4B4B0] group-hover:border-[#E11010]'
                      }`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3 text-xs font-mono tabular-nums">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <span className={isSelected ? 'text-[#E11010] font-semibold' : ''}>
                            {entry.indexLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{entry.period}</span>
                        </div>
                        <span
                          className={`text-[11px] font-medium tracking-wide ${
                            entry.isCurrent ? 'text-[#E11010]' : 'text-zinc-500'
                          }`}
                        >
                          {entry.statusText}
                        </span>
                      </div>

                      <h3
                        className={`mt-2 font-display text-lg sm:text-xl font-bold tracking-tight transition-colors duration-200 ${
                          isSelected ? 'text-[#0B0B0D]' : 'text-[#0B0B0D]/85 group-hover:text-[#0B0B0D]'
                        }`}
                      >
                        {entry.role}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        {entry.organization} <span aria-hidden="true">·</span> {entry.location}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Column (7 cols): Sticky Pitch-Black Interactive Dossier Stage */}
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-[28px] bg-[#0B0B0D] text-white p-6 sm:p-9 lg:p-10 shadow-[0_24px_64px_-22px_rgba(11,11,13,0.45)]">
                {/* Ambient Studio Crimson Edge Illumination */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-28 -right-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(225,16,16,0.22)_0%,transparent_70%)]"
                />

                <AnimatePresence mode="wait">
                  <motion.article
                    key={activeExperience.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: EASE_EXPO }}
                    className="relative z-10"
                  >
                    {/* Clean Unboxed Metadata Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400 tabular-nums">
                        <span className="text-[#E11010] font-semibold">
                          {activeExperience.indexLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{activeExperience.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-zinc-200">{activeExperience.period}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeExperience.location}</span>
                      </div>

                      <span className="font-mono text-xs text-zinc-400 tabular-nums">
                        {String(selectedExpIndex + 1).padStart(2, '0')} /{' '}
                        {String(EXPERIENCE_ENTRIES.length).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <div className="mt-6">
                      <p className="text-sm font-medium text-zinc-400">
                        {activeExperience.organization}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white headline-balance">
                        {activeExperience.role}
                      </h3>
                      <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {activeExperience.summary}
                      </p>
                    </div>

                    {/* Staggered Deliverables */}
                    <div className="mt-7 pt-6 border-t border-white/10">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400 mb-4">
                        Key Engineering Outcomes
                      </p>
                      <ul className="space-y-3.5">
                        {activeExperience.highlights.map((bullet, bIdx) => (
                          <motion.li
                            key={bullet}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.28,
                              delay: 0.06 + bIdx * 0.045,
                              ease: EASE_EXPO,
                            }}
                            className="flex items-start gap-3.5 text-sm text-zinc-200 leading-relaxed"
                          >
                            <span className="font-mono text-xs text-[#E11010] tabular-nums pt-0.5 shrink-0">
                              {String(bIdx + 1).padStart(2, '0')}
                            </span>
                            <span>{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Clean Spec Stack & Stage Stepper Footer */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                        {activeExperience.stackLine}
                      </p>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStepExperience(-1)}
                          aria-label="Previous experience entry"
                          className="w-10 h-10 rounded-full border border-white/15 hover:border-[#E11010] hover:text-[#E11010] flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStepExperience(1)}
                          aria-label="Next experience entry"
                          className="w-10 h-10 rounded-full border border-white/15 hover:border-[#E11010] hover:text-[#E11010] flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 2 — 03. CAPABILITIES: EXPANDING CAPSULE ACCORDION DESIGN */}
      <section
        id="skills"
        className="py-20 sm:py-28 border-t border-[#E2E2DF] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#E11010] font-semibold">
                03. Capabilities
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B0B0D] headline-balance">
                Technical Capabilities Matrix
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 max-w-xl leading-relaxed">
              Full-lifecycle engineering across mobile binaries, 3D WebGL interfaces, scalable backends, AI evaluation, and automated verification.
            </p>
          </motion.div>

          {/* Desktop & Tablet (sm+): Exact Horizontal Expanding Capsule Strip */}
          <div className="hidden sm:block max-w-5xl mx-auto">
            <div
              role="tablist"
              aria-label="Engineering capabilities showcase"
              className="flex items-stretch gap-3 sm:gap-3.5 h-[370px] md:h-[410px] lg:h-[440px]"
            >
              {CAPABILITY_PANELS.map((panel, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={panel.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-label={`${panel.title} — ${panel.subtitle}`}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`group relative overflow-hidden cursor-pointer transition-[flex-grow,border-radius,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11010] ${
                      isActive
                        ? 'flex-[5.8] rounded-[30px] md:rounded-[34px] shadow-[0_24px_54px_-18px_rgba(11,11,13,0.35)]'
                        : 'flex-[0.65] min-w-[54px] md:min-w-[66px] rounded-[36px] md:rounded-[40px] hover:flex-[0.82]'
                    }`}
                  >
                    <CapabilityBackdrop
                      image={panel.image}
                      alt={panel.imageAlt}
                      isActive={isActive}
                    />

                    {/* Smooth Dark Bottom Vignette Gradient for Crisp Text Legibility */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-0 bottom-0 transition-opacity duration-500 bg-[linear-gradient(to_top,rgba(11,11,13,0.95)_15%,rgba(11,11,13,0.35)_60%,transparent_100%)] ${
                        isActive ? 'h-56 opacity-100' : 'h-32 opacity-90'
                      }`}
                    />

                    {/* Bottom Icon + Smooth Text Reveal Row */}
                    {isActive ? (
                      <motion.div
                        key={panel.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: EASE_EXPO }}
                        className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex items-center gap-3.5 md:gap-4 text-left"
                      >
                        <span
                          className={`w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center shrink-0 ${panel.iconColorClass}`}
                        >
                          <CapabilityIcon type={panel.icon} className="w-5 h-5" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-white leading-tight truncate">
                            {panel.title}
                          </h3>
                          <p className="mt-0.5 text-xs md:text-sm text-white/85 leading-snug line-clamp-1">
                            {panel.subtitle}
                          </p>
                          <p className="mt-1 font-mono text-[10px] md:text-[11px] text-white/65 tracking-wide truncate">
                            {panel.stack}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="absolute inset-x-0 bottom-4 md:bottom-5 flex justify-center">
                        <span
                          className={`w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${panel.iconColorClass}`}
                        >
                          <CapabilityIcon type={panel.icon} className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom-Right Circular Expand Matrix Toggle (mirrors reference lower-right toggle button) */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAllDetails((prev) => !prev)}
                aria-label={showAllDetails ? 'Collapse full capabilities list' : 'Expand full capabilities list'}
                title={showAllDetails ? 'Collapse full list' : 'View all capabilities'}
                className="w-10 h-10 rounded-full bg-white border border-[#E2E2DF] hover:border-[#E11010] text-[#0B0B0D] hover:text-[#E11010] shadow-sm flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11010]"
              >
                {showAllDetails ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile (< 640px): Clean Vertical Expanding Capsule Accordion */}
          <div className="sm:hidden space-y-3">
            {CAPABILITY_PANELS.map((panel, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-full overflow-hidden rounded-[24px] text-left transition-all duration-300 cursor-pointer ${
                    isActive ? 'h-56 shadow-lg' : 'h-16'
                  }`}
                >
                  <CapabilityBackdrop
                    image={panel.image}
                    alt={panel.imageAlt}
                    isActive={isActive}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,13,0.95)_15%,rgba(11,11,13,0.35)_60%,transparent_100%)]"
                  />
                  <div
                    className={`relative z-10 h-full px-4 py-3 flex gap-3 ${
                      isActive ? 'items-end pb-4' : 'items-center'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center shrink-0 ${panel.iconColorClass}`}
                    >
                      <CapabilityIcon type={panel.icon} className="w-4 h-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-bold text-white leading-tight truncate">
                        {panel.title}
                      </h3>
                      {isActive && (
                        <>
                          <p className="mt-0.5 text-xs text-white/85 line-clamp-2">
                            {panel.subtitle}
                          </p>
                          <p className="mt-1 font-mono text-[10px] text-white/70 truncate">
                            {panel.stack}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Optional Clean Expanded Summary Matrix toggled by Bottom-Right Control */}
          <AnimatePresence initial={false}>
            {showAllDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
                className="overflow-hidden max-w-5xl mx-auto"
              >
                <div className="mt-6 rounded-2xl bg-white border border-[#E2E2DF] divide-y divide-[#E2E2DF]">
                  {CAPABILITY_PANELS.map((panel) => (
                    <div
                      key={panel.id}
                      className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center"
                    >
                      <div className="md:col-span-4 font-display text-sm font-bold text-[#0B0B0D]">
                        {panel.title}
                      </div>
                      <div className="md:col-span-8 font-mono text-xs text-zinc-600">
                        {panel.stack}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
