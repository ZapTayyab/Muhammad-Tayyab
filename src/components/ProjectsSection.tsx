import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers, X } from 'lucide-react';
import { AnimatePresence, motion, useAnimationFrame, useReducedMotion } from 'motion/react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';
import onyxCodeImg from '../assets/images/projects/onyx_code.jpg';
import funderaaImg from '../assets/images/projects/funderaa.jpg';
import crossencoderImg from '../assets/images/projects/crossencoder.jpg';
import fitfortisImg from '../assets/images/projects/fitfortis.jpg';
import neonArenaImg from '../assets/images/projects/neon_arena_game.jpg';
import aurumUaeImg from '../assets/images/projects/aurum-uae.jpg';
import amazonCloneImg from '../assets/images/projects/amazon-clone.jpg';
import mandelbulb3dImg from '../assets/images/projects/mandelbulb_3d.jpg';

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

const PROJECT_MEDIA: Record<
  ProjectItem['visualTheme'],
  { src: string; alt: string; objectPositionClass: string }
> = {
  onyx: {
    src: onyxCodeImg,
    alt: 'Onyx AI — LLM safety evaluation and automated Cypress regression testing code',
    objectPositionClass: 'object-center',
  },
  funderaa: {
    src: funderaaImg,
    alt: 'Funderaa — Google Play cross-platform startup investment app screenshot',
    objectPositionClass: 'object-top',
  },
  crossencoder: {
    src: crossencoderImg,
    alt: 'Cross-Encoder Reranking Model — glowing optical fiber semantic neural data streams',
    objectPositionClass: 'object-center',
  },
  fitfortis: {
    src: fitfortisImg,
    alt: 'Fitfortis — Google Play fitness challenges application screenshot',
    objectPositionClass: 'object-top',
  },
  neon: {
    src: neonArenaImg,
    alt: 'Neon Star Saler — 3D starfighter spaceship shooting crimson drones inside the glowing cyan arena',
    objectPositionClass: 'object-center',
  },
  aurum: {
    src: aurumUaeImg,
    alt: 'Aurum — UAE Dubai skyline architecture representing international business platform',
    objectPositionClass: 'object-center',
  },
  amazon: {
    src: amazonCloneImg,
    alt: 'Amazon Clone — online e-commerce storefront checkout workflow on laptop',
    objectPositionClass: 'object-center',
  },
  portfolio: {
    src: mandelbulb3dImg,
    alt: 'Three.js & GSAP Interactive Portfolio — sculptural 3D mathematical fractal render',
    objectPositionClass: 'object-center',
  },
};

function ProjectVisual({
  theme,
  compact = false,
  lazy = false,
}: {
  theme: ProjectItem['visualTheme'];
  compact?: boolean;
  lazy?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const media = PROJECT_MEDIA[theme];

  useEffect(() => {
    setImgFailed(false);
  }, [theme]);

  return (
    <div className="relative w-full h-full bg-[#111113] overflow-hidden select-none">
      {!imgFailed ? (
        <img
          src={media.src}
          alt={media.alt}
          referrerPolicy="no-referrer"
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          draggable={false}
          onError={() => setImgFailed(true)}
          className={`w-full h-full object-cover ${media.objectPositionClass} transition-transform duration-500 ease-out group-hover:scale-105 select-none`}
        />
      ) : (
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(230,25,25,0.35),#111113_78%)]" />
      )}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          compact
            ? 'bg-gradient-to-t from-black/35 via-transparent to-black/10'
            : 'bg-gradient-to-t from-black/55 via-black/10 to-black/15'
        }`}
      />
    </div>
  );
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
  const inViewRef = useRef<boolean>(true);
  const phaseRef = useRef<number>(0);
  const impulseRef = useRef<number>(0);
  const velocityRef = useRef<number>(BASE_DRIFT_SPEED);
  const hoveredRef = useRef<boolean>(false);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    lastX: number;
    lastTime: number;
    flingVelocity: number;
    moved: boolean;
  }>({ active: false, startX: 0, lastX: 0, lastTime: 0, flingVelocity: 0, moved: false });
  const lastReportedIdxRef = useRef<number>(0);

  const openProjectModal = (project: ProjectItem, source: 'carousel' | 'catalog') => {
    setSelectedProject(project);
    trackEvent('project_view', {
      project_id: project.id,
      project_title: project.title,
      source,
    });
  };

  const stepSelectedProject = (delta: number) => {
    if (!selectedProject) return;
    const currentIdx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    if (currentIdx === -1) return;
    const nextProject = PROJECTS[(currentIdx + delta + PROJECTS.length) % PROJECTS.length];
    setSelectedProject(nextProject);
  };

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
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const updateWidth = () => {
      if (stageRef.current) {
        stageWidthRef.current = stageRef.current.clientWidth;
        layoutCards();
      }
    };
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(stageEl);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { rootMargin: '120px 0px' }
    );
    visibilityObserver.observe(stageEl);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepSelectedProject(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepSelectedProject(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProject]);

  // Continuous 60fps curved 3D horizontal stream via direct GPU compositor transforms (pauses off-screen)
  useAnimationFrame((_, deltaMs) => {
    if (!inViewRef.current && Math.abs(impulseRef.current) < 0.001) return;

    const dt = Math.min(deltaMs, 48) / 1000;
    const n = PROJECTS.length;

    const targetVelocity =
      prefersReducedMotion ||
      hoveredRef.current ||
      dragRef.current.active ||
      selectedProject !== null
        ? 0
        : BASE_DRIFT_SPEED;

    velocityRef.current += (targetVelocity - velocityRef.current) * Math.min(1, dt * 4.2);
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
              lastTime: performance.now(),
              flingVelocity: 0,
              moved: false,
            };
          }}
          onPointerMove={(e) => {
            if (!dragRef.current.active) return;
            const now = performance.now();
            const dt = Math.max(8, now - dragRef.current.lastTime) / 1000;
            const dx = e.clientX - dragRef.current.lastX;
            if (Math.abs(e.clientX - dragRef.current.startX) > 6) {
              dragRef.current.moved = true;
            }
            const dPhase = -dx / 135;
            phaseRef.current += dPhase;
            dragRef.current.flingVelocity = Math.max(-6, Math.min(6, dPhase / dt));
            dragRef.current.lastX = e.clientX;
            dragRef.current.lastTime = now;
          }}
          onPointerUp={() => {
            if (dragRef.current.active && dragRef.current.moved) {
              velocityRef.current = dragRef.current.flingVelocity;
            }
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
                openProjectModal(project, 'carousel');
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
                      onClick={() => openProjectModal(project, 'catalog')}
                      className="w-full h-40 text-left cursor-pointer focus-visible:outline-none"
                    >
                      <ProjectVisual theme={project.visualTheme} compact lazy />
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
                            onClick={() => openProjectModal(project, 'catalog')}
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
                          onClick={() => openProjectModal(project, 'catalog')}
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
                <div className="absolute top-4 left-4 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => stepSelectedProject(-1)}
                    aria-label="Previous project"
                    className="w-9 h-9 rounded-lg bg-[#111113]/85 text-white hover:bg-[#E61919] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepSelectedProject(1)}
                    aria-label="Next project"
                    className="w-9 h-9 rounded-lg bg-[#111113]/85 text-white hover:bg-[#E61919] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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
