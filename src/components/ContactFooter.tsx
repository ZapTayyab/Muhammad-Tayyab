import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Phone,
  Plus,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import avatarPortrait from '../assets/images/tayyab_chatgpt_cutout.png';

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactFooter() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#0B0B0D] text-[#F5F5F3] border-t border-zinc-800/80 scroll-mt-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8">
        {/* TOP 3-COLUMN FOOTER ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Left Column: Headline + Interactive "Get In Touch +" Trigger */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight leading-[1.08] text-[#F5F5F3] headline-balance">
              Have a Cool Idea?
              <br />
              Let&apos;s Collaborate<span className="text-[#E61919]">.</span>
            </h2>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setModalOpen(true);
              }}
              className="mt-7 group inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-xl bg-[#161619] hover:bg-[#1D1D21] border border-zinc-800 hover:border-zinc-700 text-xs sm:text-sm font-semibold text-white transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E61919]"
            >
              <span>Get In Touch</span>
              <span className="w-7 h-7 rounded-lg bg-[#E61919] group-hover:bg-[#C81414] flex items-center justify-center text-white transition-colors">
                <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
              </span>
            </button>
          </div>

          {/* Middle Column: Location & Social */}
          <div className="lg:col-span-3 space-y-9">
            <div>
              <h3 className="font-display text-sm font-semibold text-white">Location</h3>
              <p className="mt-2.5 text-xs sm:text-[13px] text-zinc-400 leading-relaxed">
                Pakistan · Remote Worldwide
                <br />
                Full-Stack, Mobile &amp; AI Systems
              </p>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold text-white">Social</h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-[13px] text-zinc-300">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap"
                >
                  <Github className="w-3.5 h-3.5 text-[#E61919] shrink-0" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#E61919] shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Helpful Links */}
          <div className="lg:col-span-4 lg:text-right space-y-9">
            <div>
              <h3 className="font-display text-sm font-semibold text-white">Contact</h3>
              <div className="mt-2.5 space-y-1 text-xs sm:text-[13px] text-zinc-400">
                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                  className="block font-mono tabular-nums hover:text-white transition-colors"
                >
                  {PROFILE.phone}
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="block hover:text-white transition-colors"
                >
                  {PROFILE.email}
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold text-white">Helpful Links</h3>
              <nav
                aria-label="Footer navigation"
                className="mt-3 flex flex-wrap lg:justify-end items-center gap-x-3 gap-y-2 text-xs sm:text-[13px] text-zinc-300"
              >
                <a href="#overview" className="hover:text-white transition-colors whitespace-nowrap">
                  Overview
                </a>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#E61919]" />
                <a href="#projects" className="hover:text-white transition-colors whitespace-nowrap">
                  Work
                </a>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#E61919]" />
                <a href="#experience" className="hover:text-white transition-colors whitespace-nowrap">
                  Experience
                </a>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#E61919]" />
                <a href="#skills" className="hover:text-white transition-colors whitespace-nowrap">
                  Capabilities
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* HORIZONTAL METADATA CREDIT BAR */}
        <div className="mt-14 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="tabular-nums">© Muhammad Tayyab {new Date().getFullYear()}</p>

          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span aria-hidden="true" className="w-2 h-2 rounded-xs bg-[#E61919] rotate-12 inline-block" />
            <span>Back to Top</span>
          </a>

          <div className="inline-flex items-center gap-2.5">
            <span className="text-zinc-400">Created by</span>
            <span className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden inline-flex items-end justify-center shrink-0">
              <img
                src={avatarPortrait}
                alt="Muhammad Tayyab"
                className="w-full h-full object-cover object-top"
              />
            </span>
            <span className="font-display italic font-bold tracking-tight text-sm text-white">
              Tayyab
            </span>
          </div>
        </div>
      </div>

      {/* MONUMENTAL FULL-BLEED CRIMSON BANNER WORDMARK (COVERS FULL WIDTH EDGE TO EDGE) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
        className="relative w-full overflow-hidden bg-[#E61919] pt-4 sm:pt-6"
      >
        {/* Dramatic crimson-to-obsidian studio lighting wash matching the reference banner */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_78%_95%_at_18%_42%,rgba(255,60,40,0.92)_0%,rgba(210,18,18,0.82)_42%,rgba(28,6,6,0.92)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.08)_0%,transparent_45%,rgba(0,0,0,0.35)_100%)]"
        />

        {/* Edge-to-Edge Wordmark spanning 100% across both left and right sides */}
        <div aria-hidden="true" className="relative z-10 w-full select-none overflow-hidden">
          <svg
            viewBox="0 0 1000 200"
            preserveAspectRatio="xMidYMax meet"
            className="w-full h-auto block"
          >
            <text
              x="500"
              y="204"
              textAnchor="middle"
              textLength="1008"
              lengthAdjust="spacing"
              fontSize="255"
              fontWeight="900"
              className="font-display font-black uppercase fill-[#09090B] opacity-90"
            >
              TAYYAB
            </text>
          </svg>
        </div>
      </motion.div>

      {/* INTERACTIVE "GET IN TOUCH" INQUIRY MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.24, ease: EASE_EXPO }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-2xl bg-[#111113] border border-zinc-800 p-6 sm:p-8 text-white shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#E61919] font-semibold">
                    Direct Collaboration
                  </p>
                  <h3
                    id="contact-modal-title"
                    className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white"
                  >
                    Start a Conversation
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close contact dialog"
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Copy Contact Strip */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <span className="inline-flex items-center gap-2 text-xs text-zinc-300 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#E61919] shrink-0" />
                    <span className="truncate">{PROFILE.email}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.email, 'email')}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-medium text-zinc-200 shrink-0 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3 h-3 text-[#E61919]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <span className="inline-flex items-center gap-2 text-xs font-mono tabular-nums text-zinc-300 truncate">
                    <Phone className="w-3.5 h-3.5 text-[#E61919] shrink-0" />
                    <span>{PROFILE.phone}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.phone, 'phone')}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-medium text-zinc-200 shrink-0 cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3 h-3 text-[#E61919]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Message Composer */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-contact-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="modal-contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (submitted) setSubmitted(false);
                      }}
                      placeholder="Alex Mercer"
                      className="w-full px-3.5 py-2.5 text-sm text-white bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#E61919] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-contact-email" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="modal-contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (submitted) setSubmitted(false);
                      }}
                      placeholder="you@company.com"
                      className="w-full px-3.5 py-2.5 text-sm text-white bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#E61919] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-contact-message" className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Project or Role Details
                  </label>
                  <textarea
                    id="modal-contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (submitted) setSubmitted(false);
                    }}
                    placeholder="Tell me about your product, timeline, or engineering role..."
                    className="w-full px-3.5 py-2.5 text-sm text-white bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-[#E61919] transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#E61919] hover:bg-[#C81414] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Send Message</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  {submitted && (
                    <p role="status" className="text-xs font-medium text-red-400">
                      Mail draft prepared for {PROFILE.email}.
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
