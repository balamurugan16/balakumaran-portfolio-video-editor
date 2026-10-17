import React from 'react';

export const TopNav: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <span className="font-display font-bold text-lg tracking-tight text-zinc-900 group-hover:text-black transition-colors">
            BALAKUMARAN D
          </span>
          <span className="text-zinc-300 font-mono text-sm">/</span>
          <span className="text-zinc-500 font-mono text-xs">Junior Video Editor</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-7 text-sm font-medium text-zinc-600">
          <a href="#reels" className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0">
            My Work
          </a>
          <a href="#experience" className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0">
            Experience
          </a>
          <a href="#education" className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0">
            Education
          </a>
        </nav>
      </div>
    </header>
  );
};
