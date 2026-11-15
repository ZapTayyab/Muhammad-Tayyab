import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  revealed?: boolean;
}

export function Navbar({ revealed = false }: NavbarProps) {
  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-[60] px-4 sm:px-8 lg:px-10 pointer-events-none flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, delay: revealed ? 0.42 : 0, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto inline-flex items-center gap-2.5 sm:gap-7 p-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_14px_38px_-10px_rgba(17,17,19,0.18),0_0_0_1px_rgba(17,17,19,0.06)] max-w-full"
      >
        {/* Zone 1: Circular Brand Emblem */}
        <a
          href="#top"
          aria-label={`${PROFILE.name} — Back to top`}
          className="group w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111113] text-white flex items-center justify-center shrink-0 transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919]"
        >
          <svg
            viewBox="0 0 28 28"
            className="w-5 h-5"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="14" cy="14" r="5" fill="#FFFFFF" />
            <ellipse
              cx="14"
              cy="14"
              rx="10.5"
              ry="3.6"
              transform="rotate(-24 14 14)"
              stroke="#E61919"
              strokeWidth="2"
            />
          </svg>
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-2.5 sm:gap-6 text-[11px] sm:text-sm font-semibold text-zinc-700"
        >
          <a
            href="#projects"
            className="hover:text-[#111113] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 decoration-[#E61919] decoration-2 hover:underline"
          >
            Work
          </a>
          <a
            href="#experience"
            className="hover:text-[#111113] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 decoration-[#E61919] decoration-2 hover:underline"
          >
            Experience
          </a>
          <a
            href="#skills"
            className="hover:text-[#111113] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 decoration-[#E61919] decoration-2 hover:underline"
          >
            <span className="sm:hidden">Skills</span>
            <span className="hidden sm:inline">Capabilities</span>
          </a>
        </nav>

        {/* Zone 3: High-Contrast Primary Contact Action Pill */}
        <a
          href="#contact"
          className="px-3 sm:px-5 py-2 rounded-full bg-[#111113] text-white hover:bg-[#E61919] text-[11px] sm:text-sm font-semibold tracking-tight transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919]"
        >
          <span className="sm:hidden">Contact</span>
          <span className="hidden sm:inline">{PROFILE.email}</span>
        </a>
      </motion.div>
    </header>
  );
}
