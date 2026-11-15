import { useState } from 'react';
import { ArrowDownRight, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_DISCIPLINES, PROFILE } from '../data/portfolioData';
import heroPortraitImg from '../assets/images/tayyab_chatgpt_cutout.png';
import heroBackdropImg from '../assets/images/hero_studio_monochrome_1794727467655.jpg';

interface HeroSectionProps {
  revealed?: boolean;
}

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection({ revealed = false }: HeroSectionProps) {
  const [activeId, setActiveId] = useState<string>('fullstack');
  const [portraitLoaded, setPortraitLoaded] = useState(true);
  const [backdropLoaded, setBackdropLoaded] = useState(true);

  const activeDiscipline =
    HERO_DISCIPLINES.find((item) => item.id === activeId) ?? HERO_DISCIPLINES[2];

  return (
    <section
      id="top"
        className="relative w-full min-h-[100svh] lg:h-[100svh] lg:min-h-[680px] pt-20 lg:pt-0 overflow-hidden bg-[#F5F5F3] flex flex-col lg:block"
      >
        {/* LAYER 0: Bright Studio Radial Wash on Left Canvas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_45%,#FFFFFF_0%,#F5F5F3_64%,#EAEAE7_100%)]"
        />

        {/* LAYER 10: Stationary Diagonal Obsidian (#0B0B0D) + Ambient Animated Crimson Studio Wing */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0.4, x: 48 }}
          animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0.4, x: 48 }}
          transition={{ duration: 0.85, ease: EASE_EXPO }}
          className="hidden lg:block lg:h-full lg:w-[34%] lg:absolute lg:inset-y-0 lg:right-0 z-10 bg-[#0B0B0D] overflow-hidden lg:[clip-path:polygon(24%_0%,100%_0%,100%_100%,0%_100%)]"
        >
          {/* Base Crimson Radial Studio Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_48%,rgba(230,25,25,0.85)_0%,rgba(160,18,18,0.45)_38%,rgba(11,11,13,0.98)_78%)]" />

          {/* Ambient Breathing Crimson Pulse along left edge & studio backdrop */}
          <motion.div
            initial={{ opacity: 0.45, scale: 1 }}
            animate={{
              opacity: [0.45, 0.85, 0.45],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -inset-6 bg-[radial-gradient(circle_at_32%_55%,rgba(230,25,25,0.42)_0%,rgba(220,38,38,0.2)_36%,transparent_70%)]"
          />

          {/* Subtle Diagonal Light Sweep passing smoothly across the crimson wing */}
          <motion.div
            initial={{ opacity: 0.25, y: '-25%' }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: ['-25%', '25%', '-25%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-x-0 -top-1/2 h-[200%] bg-[linear-gradient(125deg,transparent_36%,rgba(255,75,75,0.2)_50%,transparent_64%)]"
          />

          {/* Crisp Ambient Crimson Edge Line along the diagonal split */}
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-[linear-gradient(104deg,rgba(239,68,68,0.35)_0%,rgba(239,68,68,0.08)_12%,transparent_28%)]"
          />
        </motion.div>

        {/* LAYER 20: CLEAN CUTOUT PORTRAIT CENTERED 50/50 ACROSS THE DIAGONAL SPLIT */}
        <div className="relative h-[340px] sm:h-[460px] lg:h-full lg:w-full lg:absolute lg:inset-0 z-20 overflow-hidden pointer-events-none">
          {/* Mobile-only dark crimson studio backdrop with subtle ambient pulse */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute inset-0 bg-[radial-gradient(circle_at_84%_45%,rgba(230,25,25,0.78)_0%,rgba(145,14,16,0.45)_38%,rgba(11,11,13,0.98)_76%)]"
          />
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="lg:hidden absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(230,25,25,0.35)_0%,transparent_68%)]"
          />

          {portraitLoaded ? (
            /* Portrait rises and settles cleanly right as the center curtain parts */
            <motion.div
              initial={{ opacity: 0.15, y: 28, scale: 1.06 }}
              animate={
                revealed
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0.15, y: 28, scale: 1.06 }
              }
              transition={{ duration: 0.95, delay: revealed ? 0.12 : 0, ease: EASE_EXPO }}
              className="relative mx-auto lg:mx-0 lg:absolute bottom-0 lg:right-[30%] lg:translate-x-1/2 h-[86%] lg:h-[89%] max-h-[820px] w-auto aspect-[940/1028] flex items-end justify-center select-none mt-auto"
            >
              <img
                src={heroPortraitImg}
                alt="Muhammad Tayyab — Software Engineer"
                referrerPolicy="no-referrer"
                onError={() => setPortraitLoaded(false)}
                className="relative z-10 h-full w-auto max-w-none object-contain object-bottom"
              />
            </motion.div>
          ) : (
            <div className="relative z-10 w-full h-full flex items-center justify-center text-zinc-400 font-display text-lg">
              {PROFILE.name}
            </div>
          )}
        </div>

        {/* LAYER 30: LEFT STUDIO CONTENT & CHOREOGRAPHED MOTION GRAPHIC TYPOGRAPHY */}
        <div className="relative z-30 w-full lg:absolute lg:inset-0 lg:pointer-events-none px-6 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-12 lg:p-0 flex-1 flex flex-col justify-between order-first">
          {/* Image 1: Upper-Left Faded Monochrome Studio Visual */}
          {backdropLoaded && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.94, x: -16 }}
              animate={
                revealed
                  ? { opacity: 1, scale: 1, x: 0 }
                  : { opacity: 0, scale: 0.94, x: -16 }
              }
              transition={{ duration: 0.8, delay: revealed ? 0.2 : 0, ease: EASE_EXPO }}
              className="pointer-events-none hidden sm:block lg:absolute lg:top-[15%] lg:left-[5%] lg:w-[23%] lg:h-[38%] overflow-hidden"
            >
              <img
                src={heroBackdropImg}
                alt=""
                referrerPolicy="no-referrer"
                onError={() => setBackdropLoaded(false)}
                className="w-full h-full object-cover object-center grayscale opacity-[0.2] contrast-110 mix-blend-multiply [mask-image:radial-gradient(ellipse_80%_78%_at_50%_46%,black_36%,transparent_95%)]"
              />
            </motion.div>
          )}

          {/* 5-Item Vertical Specialty Selector with Staggered Motion Entrance */}
          <div className="lg:absolute lg:top-[22%] lg:left-[30%] z-30 mb-8 lg:mb-0 lg:pointer-events-auto">
            <div
              role="tablist"
              aria-label="Core engineering disciplines"
              className="flex flex-col items-start space-y-2"
            >
              {HERO_DISCIPLINES.map((item, idx) => {
                const isActive = item.id === activeId;
                return (
                  <motion.button
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(item.id)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={
                      revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }
                    }
                    transition={{
                      duration: 0.45,
                      delay: revealed ? 0.34 + idx * 0.055 : 0,
                      ease: EASE_EXPO,
                    }}
                    className={`group relative flex items-center text-left font-display text-xs sm:text-[13px] lg:text-sm tracking-[0.08em] uppercase transition-colors duration-150 whitespace-nowrap shrink-0 py-0.5 pl-3.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] rounded-sm ${
                      isActive
                        ? 'font-bold text-[#111113]'
                        : 'font-medium text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="hero-discipline-bar"
                        aria-hidden="true"
                        transition={{ duration: 0.2, ease: EASE_EXPO }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-[#E61919]"
                      />
                    )}
                    {!isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-2.5 rounded-full bg-zinc-300 transition-all duration-150"
                      />
                    )}
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Lower-Left 3-Line Stacked Motion Graphic Lockup + Clean CTA Strip */}
          <div className="lg:absolute lg:left-[5%] lg:bottom-[9%] z-30 lg:pointer-events-auto">
            <h1 className="font-display headline-balance select-none">
              {/* Line 1: Word + Stamped Crimson Highlight Box */}
              <span className="flex flex-wrap items-center gap-2 sm:gap-3 pl-2 sm:pl-10 lg:pl-12 text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold tracking-tight text-[#111113] leading-none overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.6, delay: revealed ? 0.22 : 0, ease: EASE_EXPO }}
                  className="inline-block"
                >
                  Muhammad
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -16, scaleX: 0.72 }}
                  animate={
                    revealed
                      ? { opacity: 1, x: 0, scaleX: 1 }
                      : { opacity: 0, x: -16, scaleX: 0.72 }
                  }
                  transition={{ duration: 0.55, delay: revealed ? 0.32 : 0, ease: EASE_EXPO }}
                  className="relative inline-block origin-left overflow-hidden bg-[#E61919] text-white px-2.5 sm:px-3.5 py-0.5 sm:py-1 leading-none"
                >
                  <span className="relative z-10">Tayyab</span>
                  {/* Subtle continuous studio light sheen across the crimson name box */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ x: '-120%' }}
                    animate={{ x: ['-120%', '140%'] }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                  />
                </motion.span>
              </span>

              {/* Line 2: Massive Tight-Tracked Charcoal-to-Slate Display Word */}
              <span className="block mt-1.5 overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 48 }}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
                  transition={{ duration: 0.7, delay: revealed ? 0.38 : 0, ease: EASE_EXPO }}
                  className="block font-black tracking-[-0.045em] leading-[0.86] text-[3.35rem] sm:text-[4.85rem] lg:text-[5.5rem] xl:text-[6.25rem] bg-gradient-to-r from-[#111113] via-[#1C1C20] to-[#9CA3AF] bg-clip-text text-transparent"
                >
                  Software
                </motion.span>
              </span>

              {/* Line 3: Tucked Crimson Focal Word */}
              <span className="block overflow-hidden -mt-1 sm:-mt-1.5">
                <motion.span
                  initial={{ opacity: 0, y: 36, x: -16 }}
                  animate={
                    revealed ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 36, x: -16 }
                  }
                  transition={{ duration: 0.65, delay: revealed ? 0.48 : 0, ease: EASE_EXPO }}
                  className="block font-black tracking-[-0.035em] leading-[0.88] text-[2.25rem] sm:text-[3.5rem] lg:text-[3.85rem] xl:text-[4.45rem] text-[#E61919] pl-8 sm:pl-40 lg:pl-48"
                >
                  Engineer
                </motion.span>
              </span>
            </h1>

            {/* Compact Hero Action Row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.55, delay: revealed ? 0.6 : 0, ease: EASE_EXPO }}
              className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#E61919] hover:bg-[#C81414] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] focus-visible:ring-offset-2"
              >
                <span>Explore Projects</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#111113] bg-white/90 border border-zinc-300 hover:border-[#111113] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111113]"
              >
                <FileText className="w-4 h-4" />
                <span>Resume PDF</span>
              </a>
              <span className="hidden xl:inline-flex items-center gap-2 text-xs font-mono text-zinc-500 pl-2">
                <span>{activeDiscipline.stack}</span>
              </span>
            </motion.div>
          </div>
        </div>
      </section>
  );
}
