import React from 'react';
import { Play, FileText, Mail, Phone, Instagram } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenResumeModal: () => void;
  onScrollToReels: () => void;
  onScrollToExperience: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenResumeModal,
  onScrollToReels,
  onScrollToExperience,
}) => {
  return (
    <section className="pt-16 pb-20 bg-transparent border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-6">
        {/* Centered Hero Intro */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Kicker */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 mb-4 tracking-wide uppercase">
            <span>Junior Video Editor</span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span>Reels & Short-Form</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 tracking-tight leading-[1.12] mb-5 [text-wrap:balance]">
            Editing Reels for Wedding Studios, Creators & Videographers.
          </h1>

          {/* Lead Bio */}
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            Hi, I’m <strong>Balakumaran D</strong>. I edit engaging reels and short-form videos with clean narrative rhythm, retention-focused pacing, and natural color grading across Instagram and YouTube.
          </p>

          {/* Quick Contact & Handle Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-600 mb-8 font-mono">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors text-zinc-800"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              <span>{profile.email}</span>
            </a>

            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors text-zinc-800"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-500" />
              <span>{profile.phone}</span>
            </a>

            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors text-zinc-800"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>{profile.instagramHandle}</span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onScrollToReels}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>See my work</span>
            </button>

            <button
              onClick={onScrollToExperience}
              className="px-4 py-2.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl transition-colors cursor-pointer"
            >
              <span>Read Experience</span>
            </button>

            <button
              onClick={onOpenResumeModal}
              className="px-4 py-2.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>Open Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
