import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers, X } from 'lucide-react';
import { AnimatePresence, motion, useAnimationFrame, useReducedMotion } from 'motion/react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';

type CategoryFilter = 'All' | ProjectItem['category'];

const FILTER_OPTIONS: CategoryFilter[] = ['All', 'AI & ML', 'Mobile', 'Full-Stack', '3D & Games'];

const PROCESS_STEPS = [
  { num: '#01', label: 'Architecture & Specs' },
  { num: '#02', label: 'Full-Stack & Mobile' },
  { num: '#03', label: 'Cypress & QA Checks' },
  { num: '#04', label: 'Cloud & Store Launch' },
];

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const BASE_DRIFT_SPEED = 0.22; // calm continuous horizontal drift in cards/sec

// Algebraically solved cylinder curve for 132x212 cards (P=640) locking ~15-18px gaps at ALL phases
const X_CURVE = [0, 148.3, 278.7, 371.5, 487.1];
const Z_CURVE = [-125, -97.8, -17.2, 113.8, 195];
const RY_CURVE = [0, 11, 22, 33, 40];

function sampleSymmetricSpline(pts: number[], t: number, oddSymmetry: boolean): number {
  const clamped = Math.max(0, Math.min(pts.length - 1, t));
  const i = Math.min(pts.length - 2, Math.floor(clamped));
  const f = clamped - i;
  const p0 = i === 0 ? (oddSymmetry ? -pts[1] : pts[1]) : pts[i - 1];
  const p1 = pts[i];
  const p2 = pts[i + 1];
  const p3 = i + 2 >= pts.length ? pts[pts.length - 1] + (pts[pts.length - 1] - pts[pts.length - 2]) : pts[i + 2];
  const f2 = f * f;
  const f3 = f2 * f;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * f +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * f2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * f3)
  );
}

function ProjectVisual({
  theme,
  compact = false,
}: {
  theme: ProjectItem['visualTheme'];
  compact?: boolean;
}) {
  switch (theme) {
    case 'onyx':
      return (
        <div className="relative w-full h-full bg-[#09090B] overflow-hidden flex flex-col justify-between p-3.5 sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(230,25,25,0.45),transparent_58%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(9,9,11,0.92)_100%)]" />
          <svg
            viewBox="0 0 240 190"
            className={`relative z-10 w-full ${compact ? 'h-full' : 'h-4/5 my-auto'}`}
            aria-hidden="true"
          >
            <rect x="14" y="16" width="212" height="152" rx="12" fill="#131317" stroke="rgba(255,255,255,0.14)" />
            <line x1="14" y1="46" x2="226" y2="46" stroke="rgba(255,255,255,0.08)" />
            <rect x="28" y="28" width="44" height="6" rx="3" fill="#E61919" />
            <rect x="82" y="28" width="32" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
            <rect x="28" y="62" width="184" height="44" rx="8" fill="#1A1A20" stroke="rgba(230,25,25,0.4)" />
            <polyline
              points="42,96 78,76 112,86 150,68 196,74"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="28" y="118" width="86" height="36" rx="6" fill="#1E1E24" />
            <rect x="124" y="118" width="88" height="36" rx="6" fill="#1E1E24" />
            <rect x="40" y="130" width="48" height="5" rx="2" fill="rgba(255,255,255,0.6)" />
            <rect x="136" y="130" width="54" height="5" rx="2" fill="#E61919" />
          </svg>
        </div>
      );
    case 'funderaa':
      return (
        <div className="relative w-full h-full bg-[#131316] overflow-hidden flex items-center justify-center p-3.5 sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_80%,rgba(230,25,25,0.38),transparent_62%)]" />
          <svg viewBox="0 0 220 220" className="relative z-10 w-full h-full max-h-[210px]" aria-hidden="true">
            <rect x="58" y="16" width="104" height="184" rx="18" fill="#1B1B20" stroke="rgba(255,255,255,0.24)" strokeWidth="1.5" />
            <rect x="92" y="25" width="36" height="4" rx="2" fill="rgba(255,255,255,0.22)" />
            <rect x="70" y="42" width="80" height="52" rx="9" fill="rgba(230,25,25,0.22)" stroke="#E61919" strokeWidth="1.3" />
            <polyline points="79,80 99,63 116,71 139,50" fill="none" stroke="#FFFFFF" strokeWidth="2.3" strokeLinecap="round" />
            <rect x="70" y="106" width="80" height="16" rx="4" fill="rgba(255,255,255,0.14)" />
            <rect x="70" y="130" width="56" height="11" rx="3" fill="rgba(255,255,255,0.09)" />
            <rect x="70" y="156" width="80" height="24" rx="7" fill="#E61919" />
          </svg>
        </div>
      );
    case 'crossencoder':
      return (
        <div className="relative w-full h-full bg-[#18181B] overflow-hidden flex items-center justify-center p-3.5 sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(230,25,25,0.32),transparent_60%)]" />
          <svg viewBox="0 0 220 200" className="relative z-10 w-full h-full max-h-[195px]" aria-hidden="true">
            <rect x="18" y="34" width="76" height="30" rx="6" fill="#27272A" stroke="rgba(255,255,255,0.18)" />
            <rect x="18" y="84" width="76" height="30" rx="6" fill="#27272A" stroke="rgba(255,255,255,0.18)" />
            <rect x="18" y="134" width="76" height="30" rx="6" fill="#27272A" stroke="rgba(255,255,255,0.18)" />
            <rect x="128" y="76" width="74" height="46" rx="10" fill="#E61919" />
            <rect x="140" y="95" width="50" height="7" rx="3" fill="#FFFFFF" />
            <path d="M94 49 C112 49, 112 99, 128 99" fill="none" stroke="#EF4444" strokeWidth="2.2" />
            <path d="M94 99 L128 99" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeDasharray="3 3" />
            <path d="M94 149 C112 149, 112 99, 128 99" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.6" />
          </svg>
        </div>
      );
    case 'fitfortis':
      return (
        <div className="relative w-full h-full bg-[#0F1013] overflow-hidden flex items-center justify-center p-3.5 sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_78%,rgba(230,25,25,0.38),transparent_58%)]" />
          <svg viewBox="0 0 220 200" className="relative z-10 w-full h-full max-h-[195px]" aria-hidden="true">
            <rect x="16" y="28" width="188" height="142" rx="14" fill="#18181D" stroke="rgba(255,255,255,0.15)" />
            <rect x="34" y="114" width="18" height="36" rx="4" fill="rgba(255,255,255,0.22)" />
            <rect x="62" y="90" width="18" height="60" rx="4" fill="rgba(255,255,255,0.38)" />
            <rect x="90" y="64" width="18" height="86" rx="4" fill="#E61919" />
            <rect x="118" y="78" width="18" height="72" rx="4" fill="rgba(255,255,255,0.48)" />
            <rect x="146" y="48" width="18" height="102" rx="4" fill="#EF4444" />
            <rect x="174" y="72" width="14" height="78" rx="4" fill="rgba(255,255,255,0.26)" />
          </svg>
        </div>
      );
    case 'neon':
      return (
        <div className="relative w-full h-full bg-[#070709] overflow-hidden flex items-center justify-center p-3.5 sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(230,25,25,0.48),transparent_65%)]" />
          <svg viewBox="0 0 220 200" className="relative z-10 w-full h-full max-h-[195px]" aria-hidden="true">
            <g stroke="rgba(255,255,255,0.14)" strokeWidth="1">
              <line x1="12" y1="165" x2="208" y2="165" />
              <line x1="36" y1="142" x2="184" y2="142" />
              <line x1="110" y1="88" x2="12" y2="178" />
              <line x1="110" y1="88" x2="208" y2="178" />
            </g>
            <polygon
              points="110,24 166,68 144,128 76,128 54,68"
              fill="rgba(230,25,25,0.22)"
              stroke="#EF4444"
              strokeWidth="2.2"
            />
            <polygon points="110,24 166,68 110,84" fill="rgba(255,255,255,0.16)" />
          </svg>
        </div>
      );
    case 'aurum':
      return (
        <div className="relative w-full h-full bg-[#141418] overflow-hidden flex items-center justify-center p-3.5 sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(230,25,25,0.34),transparent_55%)]" />
          <svg viewBox="0 0 220 200" className="relative z-10 w-full h-full max-h-[195px]" aria-hidden="true">
            <rect x="16" y="24" width="188" height="152" rx="12" fill="#1C1C22" stroke="rgba(255,255,255,0.16)" />
            <line x1="16" y1="50" x2="204" y2="50" stroke="rgba(255,255,255,0.1)" />
            <rect x="30" y="34" width="44" height="6" rx="2" fill="#FFFFFF" />
            <rect x="30" y="68" width="96" height="14" rx="3" fill="#F5F5F3" />
            <rect x="30" y="92" width="76" height="7" rx="2" fill="rgba(255,255,255,0.45)" />
            <rect x="30" y="114" width="58" height="22" rx="5" fill="#E61919" />
            <rect x="136" y="68" width="54" height="86" rx="8" fill="#09090B" stroke="rgba(230,25,25,0.45)" />
          </svg>
        </div>
      );
    case 'amazon':
      return (
        <div className="relative w-full h-full bg-[#1C1C20] overflow-hidden flex items-center justify-center p-3.5 sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(230,25,25,0.28),transparent_55%)]" />
          <svg viewBox="0 0 220 200" className="relative z-10 w-full h-full max-h-[195px]" aria-hidden="true">
            <rect x="16" y="24" width="188" height="152" rx="12" fill="#FFFFFF" stroke="#E4E4E7" />
            <rect x="16" y="24" width="188" height="28" rx="12" fill="#111113" />
            <rect x="28" y="66" width="48" height="92" rx="6" fill="#F4F4F5" stroke="#E4E4E7" />
            <rect x="86" y="66" width="48" height="92" rx="6" fill="#F4F4F5" stroke="#E4E4E7" />
            <rect x="144" y="66" width="48" height="92" rx="6" fill="#F4F4F5" stroke="#E4E4E7" />
            <rect x="35" y="136" width="34" height="11" rx="3" fill="#E61919" />
            <rect x="93" y="136" width="34" height="11" rx="3" fill="#111113" />
          </svg>
        </div>
      );
    case 'portfolio':
    default:
      return (
        <div className="relative w-full h-full bg-[#111113] overflow-hidden flex items-center justify-center p-3.5 sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,25,25,0.28),transparent_60%)]" />
          <svg viewBox="0 0 220 200" className="relative z-10 w-full h-full max-h-[195px]" aria-hidden="true">
            <circle cx="110" cy="100" r="64" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
            <circle cx="110" cy="100" r="42" fill="none" stroke="#E61919" strokeWidth="2.5" strokeDasharray="12 7" />
            <circle cx="110" cy="100" r="14" fill="#FFFFFF" />
          </svg>
        </div>
      );
  }
}

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndexDisplay, setActiveIndexDisplay] = useState(0);
  const [showAllGrid, setShowAllGrid] = useState(false);
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageWidthRef = useRef<number>(1280);
  const phaseRef = useRef<number>(0);
  const impulseRef = useRef<number>(0);
  const velocityRef = useRef<number>(BASE_DRIFT_SPEED);
  const hoveredRef = useRef<boolean>(false);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    lastX: number;
    moved: boolean;
  }>({ active: false, startX: 0, lastX: 0, moved: false });
  const lastReportedIdxRef = useRef<number>(0);

  const visibleGridProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const rotateBy = (delta: number) => {
    impulseRef.current += delta;
  };

  const layoutCards = () => {
    const n = PROJECTS.length;
    const w = stageWidthRef.current || 375;

    // Fluidly scale cylindrical stage from compact mobile screens (320px) to wide 1440px+ desktops
    const responsiveScale =
      w < 640
        ? Math.max(0.74, Math.min(0.88, w / 480))
        : w < 1024
        ? Math.max(0.82, Math.min(0.95, w / 920))
        : Math.max(0.8, Math.min(1.08, w / 1280));

    const pBase = 640;
    const pDist = pBase * responsiveScale;
    const halfN = n / 2;
    const fadeStart = w < 560 ? 2.15 : w < 900 ? 2.85 : 3.7;

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      let offset = (((i - phaseRef.current) % n) + n) % n;
      if (offset > halfN) offset -= n;

      const abs = Math.abs(offset);
      const sign = Math.sign(offset);

      const x = sign * sampleSymmetricSpline(X_CURVE, abs, true) * responsiveScale;
      const z = sampleSymmetricSpline(Z_CURVE, abs, false) * responsiveScale;
      const rotateY = -sign * sampleSymmetricSpline(RY_CURVE, abs, true);

      // Seamless edge fade tailored to narrow mobile vs full desktop width
      const edgeFade = abs > fadeStart ? Math.max(0, 1 - (abs - fadeStart) / 0.35) : 1;

      el.style.transform = `perspective(${pDist.toFixed(1)}px) translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${responsiveScale.toFixed(3)})`;
      el.style.opacity = edgeFade.toFixed(3);
      el.style.zIndex = String(Math.round(40 - abs * 6));
      el.style.pointerEvents = edgeFade < 0.25 ? 'none' : 'auto';
    }
  };

  useEffect(() => {
    const updateWidth = () => {
      if (stageRef.current) {
        stageWidthRef.current = stageRef.current.clientWidth;
        layoutCards();
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  // Continuous 60fps curved 3D horizontal stream via direct GPU compositor transforms
  useAnimationFrame((_, deltaMs) => {
    const dt = Math.min(deltaMs, 48) / 1000;
    const n = PROJECTS.length;

    const targetVelocity =
      prefersReducedMotion ||
      hoveredRef.current ||
      dragRef.current.active ||
      selectedProject !== null
        ? 0
        : BASE_DRIFT_SPEED;

    velocityRef.current += (targetVelocity - velocityRef.current) * Math.min(1, dt * 6);
    phaseRef.current += velocityRef.current * dt;

    if (Math.abs(impulseRef.current) > 0.001) {
      const step = impulseRef.current * Math.min(1, dt * 7);
      phaseRef.current += step;
      impulseRef.current -= step;
    }

    layoutCards();

    const wrappedCenter = ((Math.round(phaseRef.current) % n) + n) % n;
    if (wrappedCenter !== lastReportedIdxRef.current) {
      lastReportedIdxRef.current = wrappedCenter;
      setActiveIndexDisplay(wrappedCenter);
    }
  });

  return (
    <section
      id="projects"
      className="relative z-0 isolate bg-white text-[#111113] py-20 sm:py-24 border-t border-zinc-200/80 overflow-x-clip scroll-mt-24"
    >
      {/* CENTERED HEADER & PRIMARY ACTION BUTTON */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
        >
          <p className="font-display text-sm sm:text-base font-bold tracking-tight text-[#E61919]">
            Selected Works
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight leading-[1.06] text-[#111113] headline-balance">
            Curious What Else I&apos;ve
            <br />
            Engineered?
          </h2>
          <p className="mt-3.5 text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
            Explore production mobile apps, AI evaluation pipelines, 3D WebGL experiences, and full-stack web builds.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowAllGrid((prev) => !prev)}
              className="group inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-[#FAFAFA] hover:bg-zinc-100 border border-zinc-200 text-xs sm:text-sm font-semibold text-[#111113] shadow-[0_6px_20px_-8px_rgba(17,17,19,0.12)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919]"
            >
              <span>{showAllGrid ? 'Close All Projects' : 'See more Projects'}</span>
              <span className="w-7 h-7 rounded-full bg-[#E61919] group-hover:bg-[#C81414] text-white flex items-center justify-center transition-colors">
                {showAllGrid ? (
                  <Layers className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                )}
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* RESPONSIVE ALL-VIEWPORT CURVED 3D AMPHITHEATER RIBBON (MOBILE, TABLET & DESKTOP) */}
      <div
        className="relative mt-6 w-full select-none isolate z-0"
        onMouseEnter={() => {
          hoveredRef.current = true;
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
        }}
      >
        <div
          ref={stageRef}
          onPointerDown={(e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            dragRef.current = {
              active: true,
              startX: e.clientX,
              lastX: e.clientX,
              moved: false,
            };
          }}
          onPointerMove={(e) => {
            if (!dragRef.current.active) return;
            const dx = e.clientX - dragRef.current.lastX;
            if (Math.abs(e.clientX - dragRef.current.startX) > 6) {
              dragRef.current.moved = true;
            }
            phaseRef.current -= dx / 135;
            dragRef.current.lastX = e.clientX;
          }}
          onPointerUp={() => {
            dragRef.current.active = false;
            window.setTimeout(() => {
              dragRef.current.moved = false;
            }, 60);
          }}
          onPointerCancel={() => {
            dragRef.current.active = false;
            dragRef.current.moved = false;
          }}
          className="relative w-full h-[240px] sm:h-[295px] lg:h-[345px] xl:h-[385px] flex items-center justify-center overflow-hidden isolate touch-pan-y cursor-grab active:cursor-grabbing"
        >
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              type="button"
              onClick={() => {
                if (dragRef.current.moved) return;
                setSelectedProject(project);
              }}
              aria-label={`Inspect ${project.title}`}
              className="group absolute left-1/2 top-1/2 -ml-[66px] -mt-[106px] w-[132px] h-[212px] rounded-[20px] overflow-hidden border border-zinc-200/80 shadow-[0_18px_38px_-14px_rgba(17,17,19,0.3)] will-change-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919]"
            >
              <ProjectVisual theme={project.visualTheme} />

              {/* Bottom Subtle Gradient & Clean Project Title Overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-left">
                <p className="font-mono text-[8px] uppercase tracking-wider text-[#EF4444] font-semibold truncate">
                  {project.category}
                </p>
                <p className="mt-0.5 font-display text-[11px] font-bold text-white leading-tight line-clamp-2 group-hover:text-red-200 transition-colors">
                  {project.title.split(' — ')[0]}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Minimal Carousel Prev / Next Controls (40px touch target for mobile) */}
        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => rotateBy(-1)}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full border border-zinc-300 hover:border-[#111113] text-zinc-600 hover:text-[#111113] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-zinc-500 tabular-nums">
            {String(activeIndexDisplay + 1).padStart(2, '0')} /{' '}
            {String(PROJECTS.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => rotateBy(1)}
            aria-label="Next project"
            className="w-10 h-10 rounded-full border border-zinc-300 hover:border-[#111113] text-zinc-600 hover:text-[#111113] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919]"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4-STEP NUMBERED PROCESS ROW (#01 – #04) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 sm:mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 text-center">
          {PROCESS_STEPS.map((step) => (
            <div key={step.num}>
              <p className="font-mono text-xs font-bold tracking-wider text-[#D11515] tabular-nums">
                {step.num}
              </p>
              <p className="mt-1.5 font-display text-xs sm:text-[13px] font-medium text-zinc-700">
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* EXPANDABLE FILTERABLE ALL-PROJECTS CATALOG (OPENED VIA "SEE MORE PROJECTS") */}
      <AnimatePresence initial={false}>
        {showAllGrid && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
            className="overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-14 pt-10 sm:pt-12 border-t border-zinc-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#111113]">
                  All Shipped Projects ({visibleGridProjects.length})
                </h3>

                <div
                  role="group"
                  aria-label="Filter projects by category"
                  className="flex flex-wrap items-center gap-1 p-1 bg-zinc-100 rounded-xl self-start sm:self-auto border border-zinc-200/80"
                >
                  {FILTER_OPTIONS.map((option) => {
                    const active = filter === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFilter(option)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#111113] text-white shadow-sm'
                            : 'text-zinc-600 hover:text-[#111113]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {visibleGridProjects.map((project) => (
                  <article
                    key={project.id}
                    className="group bg-[#FAFAFA] rounded-2xl border border-zinc-200/90 overflow-hidden flex flex-col"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="w-full h-40 text-left cursor-pointer focus-visible:outline-none"
                    >
                      <ProjectVisual theme={project.visualTheme} compact />
                    </button>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{project.year}</span>
                        </div>
                        <h4 className="mt-1.5 font-display text-base font-bold tracking-tight text-[#111113] group-hover:text-[#E61919] transition-colors">
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="text-left cursor-pointer"
                          >
                            {project.title}
                          </button>
                        </h4>
                        <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed line-clamp-3">
                          {project.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-200/70 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-semibold text-zinc-700 hover:text-[#111113] underline-offset-4 hover:underline cursor-pointer"
                        >
                          Details
                        </button>
                        {project.links[0] && (
                          <a
                            href={project.links[0].url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#E61919] hover:text-[#111113]"
                          >
                            <span>{project.links[0].label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CASE STUDY MODAL / LIGHTBOX */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: EASE_EXPO }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="h-48 sm:h-56 relative shrink-0">
                <ProjectVisual theme={selectedProject.visualTheme} />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-[#111113]/85 text-white hover:bg-[#E61919] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                  <span>{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.role}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{selectedProject.year}</span>
                </div>

                <h3
                  id="modal-project-title"
                  className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111113]"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#E61919]">
                  {selectedProject.subtitle}
                </p>

                <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
                  {selectedProject.summary}
                </p>

                <div className="mt-6 pt-5 border-t border-zinc-200">
                  <h4 className="font-display text-sm font-bold text-[#111113]">
                    Key Contributions &amp; Outcomes
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                    {selectedProject.impact.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E61919] shrink-0"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs font-mono text-zinc-500">
                    {selectedProject.stack.join(' · ')}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {selectedProject.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#111113] hover:bg-[#E61919] rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
