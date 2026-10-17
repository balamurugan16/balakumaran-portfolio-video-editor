import React from 'react';
import { Mail, Phone, Instagram, ArrowUp } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-12 bg-transparent border-t border-zinc-200/80 text-zinc-600 text-xs">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Wordmark */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="font-display font-bold text-base text-zinc-900 tracking-tight">
            {profile.name}
          </span>
          <span className="hidden sm:inline text-zinc-300">·</span>
          <span className="text-zinc-500 font-mono text-[11px]">
            {profile.title}
          </span>
        </div>

        {/* Contact info */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-600">
          <a href={`mailto:${profile.email}`} className="hover:text-zinc-950 transition-colors">
            {profile.email}
          </a>
          <span>·</span>
          <a href={`tel:${profile.phone}`} className="hover:text-zinc-950 transition-colors">
            {profile.phone}
          </a>
          <span>·</span>
          <a
            href={profile.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-950 transition-colors"
          >
            {profile.instagramHandle}
          </a>
        </div>

        {/* Back to top */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono">Top</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-6 pt-6 border-t border-zinc-100 flex items-center justify-center text-[11px] font-mono text-zinc-400 text-center">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
      </div>
    </footer>
  );
};
