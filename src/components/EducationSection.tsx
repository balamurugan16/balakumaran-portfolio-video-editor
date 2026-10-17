import React from 'react';
import { ProfileData } from '../types/portfolio';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Brain,
  Layers,
  Volume2,
  Film,
  Palette,
  Zap,
} from 'lucide-react';

interface EducationSectionProps {
  profile: ProfileData;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ profile }) => {
  const educationList = profile.education || [];
  if (educationList.length === 0) return null;

  const getSkillIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Brain className="w-4 h-4 text-amber-600" />;
      case 1:
        return <Film className="w-4 h-4 text-sky-600" />;
      case 2:
        return <Volume2 className="w-4 h-4 text-emerald-600" />;
      case 3:
        return <Layers className="w-4 h-4 text-purple-600" />;
      case 4:
        return <Palette className="w-4 h-4 text-rose-600" />;
      case 5:
        return <Zap className="w-4 h-4 text-indigo-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-zinc-600" />;
    }
  };

  return (
    <section id="education" className="py-16 bg-transparent border-b border-zinc-200/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-zinc-600" />
              <span>Education & Specialized Training</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-zinc-950 tracking-tight">
              Education
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 max-w-sm sm:text-right">
            Practical, output-driven training in storytelling psychology, pacing, and post-production.
          </p>
        </div>

        {/* Education Cohort Cards */}
        <div className="space-y-8">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-sm"
            >
              {/* Cohort Header Info */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-zinc-100">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display font-bold text-lg sm:text-xl text-zinc-950">
                      {edu.program}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      {edu.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                    <span className="font-semibold text-zinc-900">{edu.institution}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="text-zinc-500">{edu.cohort}</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200/60 self-start">
                  Creator Economy Focus
                </div>
              </div>

              {/* Cohort Narrative Summary */}
              <div className="py-5">
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-4xl">
                  {edu.summary}
                </p>
              </div>

              {/* Skills Mastered Beyond The Tool */}
              <div className="pt-2">
                <h3 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span>Skills Mastered Beyond Just Software</span>
                  <span className="text-[11px] font-normal text-zinc-500 lowercase">(storytelling, retention & workflow)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {edu.skillsLearned.map((skill, index) => (
                    <div
                      key={skill.title}
                      className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/70 hover:bg-zinc-50 transition-colors flex flex-col gap-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-white border border-zinc-200/70 shadow-2xs">
                          {getSkillIcon(index)}
                        </div>
                        <h4 className="font-display font-bold text-xs text-zinc-900 leading-snug">
                          {skill.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed pl-7">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Takeaways & Methodology */}
              <div className="mt-6 pt-5 border-t border-zinc-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {edu.keyTakeaways.map((takeaway, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-zinc-700 bg-zinc-50/50 p-2.5 rounded-lg border border-zinc-100"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
