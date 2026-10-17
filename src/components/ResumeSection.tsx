import React from 'react';
import { ProfileData } from '../types/portfolio';
import {
  Mail,
  Phone,
  Instagram,
  MapPin,
  Clock,
  Film,
  Sparkles,
  Camera,
  CheckCircle2,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface ResumeSectionProps {
  profile: ProfileData;
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ profile, onOpenResumeModal }) => {
  return (
    <section id="experience" className="py-16 bg-transparent border-b border-zinc-200/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Profile & Background
            </div>
            <h2 className="font-display text-3xl font-extrabold text-zinc-950 tracking-tight">
              About Me, Experience & Software Stack
            </h2>
          </div>

          <button
            onClick={onOpenResumeModal}
            className="px-4 py-2 text-xs font-medium text-zinc-800 hover:text-black bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
          >
            <FileText className="w-4 h-4 text-zinc-600" />
            <span>Open Resume</span>
          </button>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Who I Am Card + Honest Stack */}
          <div className="lg:col-span-5 space-y-6">
            {/* The Sick "Who I Am" Card */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src='/headshot.webp'
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover border border-zinc-200 shadow-sm"
                />
                <div>
                  <h3 className="font-display text-xl font-bold text-zinc-900 leading-tight">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-zinc-600 font-mono mt-0.5">{profile.title}</p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    <span>{profile.location}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed pt-3 border-t border-zinc-100">
                {profile.bio}
              </p>

              {/* Verified Contact Details & Handles */}
              <div className="mt-5 pt-4 border-t border-zinc-100 space-y-2.5 text-xs font-mono">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-zinc-700 hover:text-zinc-950 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium">{profile.email}</span>
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-2 text-zinc-700 hover:text-zinc-950 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium">{profile.phone}</span>
                </a>

                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-zinc-700 hover:text-zinc-950 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-500" />
                  <span className="font-medium">{profile.instagramHandle}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 ml-auto" />
                </a>
              </div>
            </div>

            {/* Honest Software Stack Card */}
            <div id="about" className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm scroll-mt-16">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display text-sm font-bold text-zinc-900 uppercase tracking-wider">
                  Editing Software Stack
                </h4>
              </div>

              <div className="space-y-3">
                {profile.softwareSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-zinc-50/80 hover:bg-zinc-50 border border-zinc-200/70 flex items-start gap-3.5 transition-colors shadow-2xs"
                  >
                    <img src={skill.icon} alt={skill.name} className="w-8 h-8 rounded-lg object-contain shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-bold text-xs text-zinc-900">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-200 shrink-0">
                          {skill.experience}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-snug mt-1">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: The 3 Core Experiences */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display text-base font-bold text-zinc-900">
                Professional Experience
              </h3>
              <span className="text-xs font-mono text-zinc-500">2023 – Present</span>
            </div>

            {/* Experience Card 1: Independent Studio (Weddings & Ceremonies) */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-zinc-900">
                      Independent Studio
                    </h4>
                    <span className="text-xs text-zinc-500">Wedding, Marital & Ceremonial Videos</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                  Studio Work
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Handling post-production for traditional and modern weddings, matrimonial events, and ceremonial celebrations. Sorting large multicam shoot footage, picking the emotional anchors, and cutting highlight reels for family distribution and Instagram.
              </p>

              <div className="space-y-1.5 pt-3 border-t border-zinc-100 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Cinematic 60s wedding reels synced to traditional & acoustic soundtracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Multi-camera ceremony cutdowns with noise reduction & audio leveling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Warm, golden color grading in DaVinci Resolve & Premiere Pro</span>
                </div>
              </div>
            </div>

            {/* Experience Card 2: Freelance Client 1 (Content Creator - Talking Head Reels) */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-zinc-900">
                      Junior Video Editor for Content Creator
                    </h4>
                    <span className="text-xs text-zinc-500">Talking Head Reels & Short-Form Content</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                  Creator Partner
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Partnered on a recurring basis with an active creator who posts speaking videos, advice, and industry explainers. Focus is on holding viewer retention through tight pacing, animated text, and visual context.
              </p>

              <div className="space-y-1.5 pt-3 border-t border-zinc-100 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Fast jump-cutting removing pauses, dead space, and filler words</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Custom visual assets and graphics created in Photoshop & Premiere</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Audio effects: subtle whooshes, chimes, and tasteful B-roll overlay</span>
                </div>
              </div>
            </div>

            {/* Experience Card 3: Junior Video Editor for Couple Videographer */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-zinc-900">
                      Junior Video Editor for Couple Videographer
                    </h4>
                    <span className="text-xs text-zinc-500">Couple Photoshoots, Reels & Portrait Films</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                  Videographer Collab
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Working closely with a professional portrait and event videographer to turn outdoor couple photoshoots, pre-wedding teasers, and romantic portrait sessions into reels ready for social media promotion.
              </p>

              <div className="space-y-1.5 pt-3 border-t border-zinc-100 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Aesthetic slow-motion and speed-ramped transitions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Natural outdoor lighting enhancement with film look curve adjustments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Delivery of high-converting teaser clips for the videographer's Instagram</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
