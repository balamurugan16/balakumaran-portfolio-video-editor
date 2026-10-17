import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const TopNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <a href="#" onClick={closeMenu} className="flex min-w-0 items-center gap-2 group">
          <span className="font-display font-bold text-sm sm:text-lg tracking-tight text-zinc-900 group-hover:text-black transition-colors whitespace-nowrap">
            BALAKUMARAN D
          </span>
          <span className="hidden sm:inline text-zinc-300 font-mono text-sm">/</span>
          <span className="hidden sm:inline text-zinc-500 font-mono text-xs whitespace-nowrap">Junior Video Editor</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-zinc-600">
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

        <button
          type="button"
          className="md:hidden shrink-0 inline-flex items-center justify-center rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="md:hidden border-t border-zinc-200/80 bg-white px-4 py-2 shadow-lg">
          <a href="#reels" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
            My Work
          </a>
          <a href="#experience" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
            Experience
          </a>
          <a href="#education" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
            Education
          </a>
        </nav>
      )}
    </header>
  );
};
