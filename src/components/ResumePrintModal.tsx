import React from 'react';
import { X, Printer, Mail, Phone, Instagram, MapPin } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { ToolLogo } from './ToolLogo';

interface ResumePrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ResumePrintModal: React.FC<ResumePrintModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-zinc-200 shadow-2xl p-6 sm:p-10 my-auto text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6 print:hidden">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
            CV Widget · Minimal Resume
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Minimal Resume */}
        <div className="space-y-6 text-zinc-800 font-sans text-xs">
          {/* Header */}
          <div className="border-b border-zinc-200 pb-5">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-sm font-medium text-zinc-600 mt-0.5">
              {profile.title}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-600 mt-3">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>{profile.email}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <span>{profile.phone}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5 text-zinc-400" />
                <span>{profile.instagramHandle}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{profile.location}</span>
              </span>
            </div>
          </div>

          {/* About Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider mb-1.5">
              Summary
            </h2>
            <p className="text-zinc-600 leading-relaxed text-xs">
              {profile.bio}
            </p>
          </div>

          {/* Software Skills Stack */}
          <div>
            <h2 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Editing Software Stack
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {profile.softwareSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/80 flex items-start gap-2.5"
                >
                  <ToolLogo name={skill.name} className="w-8 h-8 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-zinc-900 truncate">{skill.name}</span>
                      <span className="font-mono text-[10px] text-zinc-600 shrink-0">{skill.experience}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience (The 3 Real Items) */}
          <div>
            <h2 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider mb-2.5">
              Work Experience (3 Focus Areas)
            </h2>
            <div className="space-y-4">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-950 text-xs">
                      {exp.role} · <span className="font-normal text-zinc-600">{exp.organization}</span>
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500">{exp.period}</span>
                  </div>
                  <p className="text-zinc-600 leading-relaxed">{exp.summary}</p>
                  <ul className="list-disc list-inside text-zinc-500 text-[11px] space-y-0.5 pl-1">
                    {exp.deliverables.map((deliv, i) => (
                      <li key={i}>{deliv}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Specialized Cohort Training */}
          {profile.education && profile.education.length > 0 && (
            <div>
              <h2 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider mb-2.5">
                Education & Specialized Cohort
              </h2>
              <div className="space-y-3">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-950 text-xs">
                        {edu.program} · <span className="font-normal text-zinc-600">{edu.institution}</span>
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 font-semibold bg-white px-2 py-0.5 rounded border border-zinc-200">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-zinc-600 leading-relaxed text-[11px]">{edu.summary}</p>
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-200/60">
                      {edu.skillsLearned.slice(0, 4).map((s) => (
                        <div key={s.title} className="text-[10px]">
                          <span className="font-semibold text-zinc-800">{s.title}:</span>{' '}
                          <span className="text-zinc-500">{s.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
