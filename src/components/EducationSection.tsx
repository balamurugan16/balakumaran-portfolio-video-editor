import React from 'react';
import { ProfileData } from '../types/portfolio';
import { ChevronDown, GraduationCap, Sparkles } from 'lucide-react';

interface EducationSectionProps {
  profile: ProfileData;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ profile }) => {
  const educationList = profile.education || [];
  if (educationList.length === 0) return null;

  const degrees = educationList.filter((item) => item.type === 'degree');
  const training = educationList.filter((item) => item.type === 'training');

  return (
    <section id="education" className="py-12 bg-transparent border-b border-zinc-200/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-zinc-600" />
          <span>Education & Training</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold text-zinc-950 tracking-tight mb-6">
          Education
        </h2>

        {degrees.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {degrees.map((degree) => (
              <article
                key={degree.id}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm"
              >
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-sm text-zinc-950">{degree.program}</h3>
                  <p className="text-xs text-zinc-600 mt-1">{degree.institution}</p>
                </div>
                <span className="text-[11px] font-mono font-semibold text-zinc-600 bg-zinc-50 border border-zinc-200/70 rounded-md px-2 py-1 shrink-0">
                  {degree.period}
                </span>
              </article>
            ))}
          </div>
        )}

        {training.map((item) => (
          <details key={item.id} className="group mt-3 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
            <summary className="flex list-none cursor-pointer items-center justify-between gap-4 p-4 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display font-bold text-sm text-zinc-950">{item.program}</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    {item.period}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 mt-1">
                  {item.institution}{item.cohort ? ` · ${item.cohort}` : ''}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 transition-transform group-open:rotate-180" />
            </summary>

            <div className="px-4 pb-4 pt-1 border-t border-zinc-100">
              {item.summary && (
                <p className="text-xs text-zinc-600 leading-relaxed max-w-4xl mt-3">
                  {item.summary}
                </p>
              )}
              {item.skillsLearned && item.skillsLearned.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.skillsLearned.map((skill) => (
                    <span
                      key={skill.title}
                      title={skill.description}
                      className="text-[11px] text-zinc-700 bg-zinc-50 border border-zinc-200/80 rounded-lg px-2.5 py-1.5"
                    >
                      {skill.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
