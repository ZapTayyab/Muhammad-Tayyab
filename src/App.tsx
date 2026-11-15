/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { IntroCurtain } from './components/IntroCurtain';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OverviewSection } from './components/OverviewSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSkillsSection } from './components/ExperienceSkillsSection';
import { ContactFooter } from './components/ContactFooter';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [heroRevealed, setHeroRevealed] = useState(Boolean(prefersReducedMotion));

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F5F5F6] text-[#111113]">
        <IntroCurtain onSplitStart={() => setHeroRevealed(true)} />
        <Navbar revealed={heroRevealed} />
        <main className="flex-1">
          <HeroSection revealed={heroRevealed} />
          <OverviewSection />
          <ProjectsSection />
          <ExperienceSkillsSection />
        </main>
        <ContactFooter />
      </div>
    </MotionConfig>
  );
}
