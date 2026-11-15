import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface IntroCurtainProps {
  onSplitStart?: () => void;
}

export function IntroCurtain({ onSplitStart }: IntroCurtainProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<'idle' | 'split' | 'done'>('idle');

  if (phase === 'done') return null;

  const isSplitting = phase === 'split';

  const handleOpen = () => {
    if (isSplitting) return;
    onSplitStart?.();
    if (prefersReducedMotion) {
      setPhase('done');
      return;
    }
    setPhase('split');
    window.setTimeout(() => {
      setPhase('done');
    }, 950);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio welcome screen"
      className={`fixed inset-0 z-[90] overflow-hidden ${
        isSplitting ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* Left Half Black Screen */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: isSplitting ? '-100%' : '0%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-black"
      >
        <div className="w-[200%] h-full flex flex-col items-center justify-center pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black tracking-[-0.04em] leading-none text-white text-[5.5rem] sm:text-[9rem] md:text-[12rem] lg:text-[15rem] select-none"
          >
            hello
          </motion.h1>
        </div>
      </motion.div>

      {/* Right Half Black Screen */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: isSplitting ? '100%' : '0%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-black"
      >
        <div className="w-[200%] h-full -ml-[100%] flex flex-col items-center justify-center pb-16">
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black tracking-[-0.04em] leading-none text-white text-[5.5rem] sm:text-[9rem] md:text-[12rem] lg:text-[15rem] select-none"
          >
            hello
          </motion.span>
        </div>
      </motion.div>

      {/* Centered Interactive Enter Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: isSplitting ? 0 : 1,
          y: isSplitting ? 8 : 0,
        }}
        transition={{ duration: isSplitting ? 0.2 : 0.5, delay: isSplitting ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 bottom-[22%] sm:bottom-[20%] z-10 flex justify-center px-4"
      >
        <button
          type="button"
          onClick={handleOpen}
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#111113] hover:bg-[#E61919] hover:text-white text-sm sm:text-base font-semibold tracking-tight transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_14px_34px_-10px_rgba(255,255,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span>Enter Portfolio</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </div>
  );
}
