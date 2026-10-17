/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ReelItem, ProfileData } from './types/portfolio';
import { PROFILE_DATA, REELS_DATA } from './data/portfolioData';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { ReelGrid } from './components/ReelGrid';
import { ResumeSection } from './components/ResumeSection';
import { EducationSection } from './components/EducationSection';
import { Footer } from './components/Footer';
import { ReelModal } from './components/ReelModal';
import { ResumePrintModal } from './components/ResumePrintModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [profile] = useState<ProfileData>(PROFILE_DATA);
  const [reels] = useState<ReelItem[]>(REELS_DATA);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  const handleScrollToReels = () => {
    const el = document.getElementById('reels');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToExperience = () => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-transparent text-[#18181B] flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Minimal Sticky Top Navigation */}
      <TopNav />

      <main className="flex-1">
        {/* Clean Hero Section with 3D Lens and Direct Handles */}
        <HeroSection
          profile={profile}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onScrollToReels={handleScrollToReels}
          onScrollToExperience={handleScrollToExperience}
        />

        {/* Selected Reel Showcase (Weddings, Talking Heads, Couple Shoots) */}
        <ReelGrid
          reels={reels}
          onSelectReel={(reel) => setSelectedReel(reel)}
        />

        {/* Experience Dossier: Sick Profile Card, Honest Stack & The 3 Workflows */}
        <ResumeSection
          profile={profile}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* Education & Cohort Training (Aevy TV Video Editing Cohort) */}
        <EducationSection profile={profile} />
      </main>

      {/* Clean White Minimal Footer */}
      <Footer profile={profile} />

      {/* Minimal Reel Inspection Modal */}
      {selectedReel && (
        <ReelModal
          reel={selectedReel}
          onClose={() => setSelectedReel(null)}
        />
      )}

      {/* Minimal Printable CV Widget */}
      {isResumeModalOpen && (
        <ResumePrintModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
          profile={profile}
        />
      )}

      {/* Minimal Contact Modal */}
      {isContactModalOpen && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          profile={profile}
        />
      )}
    </div>
  );
}
