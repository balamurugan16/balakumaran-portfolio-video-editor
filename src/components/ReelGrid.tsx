import React, { useState } from 'react';
import { ReelItem } from '../types/portfolio';
import { ReelCard } from './ReelCard';
import { Instagram, Sparkles, ArrowUpDown, Search } from 'lucide-react';

interface ReelGridProps {
  reels: ReelItem[];
  onSelectReel: (reel: ReelItem) => void;
}

export const ReelGrid: React.FC<ReelGridProps> = ({ reels, onSelectReel }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'views'>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterOptions = [
    { id: 'all', label: 'All Works', count: reels.length },
    {
      id: 'viral',
      label: '🔥 High Reach (Viral)',
      count: reels.filter((r) => r.isHighReach).length,
    },
    {
      id: 'weddings',
      label: 'Weddings & Ceremonies',
      count: reels.filter((r) => r.category === 'weddings').length,
    },
    {
      id: 'couples',
      label: 'Couple Videography',
      count: reels.filter((r) => r.category === 'couples').length,
    },
    {
      id: 'talking-head',
      label: 'Talking Head Reels',
      count: reels.filter((r) => r.category === 'talking-head').length,
    },
    {
      id: 'street',
      label: 'Street & Transitions',
      count: reels.filter((r) => r.category === 'street').length,
    },
  ];

  // Filter logic
  let filteredReels = reels.filter((reel) => {
    let matchesCategory = true;
    if (activeCategory === 'viral') {
      matchesCategory = !!reel.isHighReach;
    } else if (activeCategory !== 'all') {
      matchesCategory = reel.category === activeCategory;
    }

    const matchesSearch =
      searchQuery.trim() === '' ||
      reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.toolsUsed.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort logic
  if (sortBy === 'views') {
    filteredReels = [...filteredReels].sort((a, b) => (b.rawViews || 0) - (a.rawViews || 0));
  }

  const highReachCount = reels.filter((r) => r.isHighReach).length;

  return (
    <section id="reels" className="py-16 bg-transparent border-b border-zinc-200/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              <span>Extensive Portfolio</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span>{reels.length} Selected Projects</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              My Work
            </h2>
            <p className="text-zinc-600 text-sm mt-1 max-w-xl">
              From million-view romantic couple teasers and emotional wedding ceremonies to high-retention creator explainers and fast street transitions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.instagram.com/dbalakumaran23/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-700 hover:text-black bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg transition-colors shadow-sm"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>@dbalakumaran23 on Instagram</span>
            </a>
          </div>
        </div>

        {/* High Reach Spotlight Bar */}
        <div className="p-4 rounded-xl bg-white border border-zinc-200/80 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-xs shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-zinc-950">High Reach & Viral Showcase:</span>{' '}
              <span className="text-zinc-600">
                Multiple reels generated lakhs and millions of views across Instagram and vertical feeds.
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveCategory(activeCategory === 'viral' ? 'all' : 'viral')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors cursor-pointer shrink-0 ${
              activeCategory === 'viral'
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
            }`}
          >
            {activeCategory === 'viral' ? 'Show All Works' : `View ${highReachCount} Viral Reels`}
          </button>
        </div>

        {/* Filter & Controls Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveCategory(opt.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === opt.id
                    ? 'bg-zinc-900 text-white font-semibold shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950 bg-white hover:bg-zinc-100 border border-zinc-200/80'
                }`}
              >
                <span>{opt.label}</span>
                <span className="ml-1.5 font-mono text-[11px] opacity-70">({opt.count})</span>
              </button>
            ))}
          </div>

          {/* Search & Sort controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Search input */}
            <div className="relative w-48 sm:w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search reel, client, tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
              />
            </div>

            {/* Sort toggle */}
            <button
              onClick={() => setSortBy(sortBy === 'default' ? 'views' : 'default')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                sortBy === 'views'
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 hover:text-zinc-900 border-zinc-200'
              }`}
              title="Sort by highest views"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {sortBy === 'views' ? 'Highest Views' : 'Curated'}
              </span>
            </button>
          </div>
        </div>

        {/* 9:16 Video Grid (3-to-4 Columns) */}
        {filteredReels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredReels.map((reel) => (
              <ReelCard key={reel.id} reel={reel} onSelect={onSelectReel} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-zinc-200/80 shadow-sm">
            <h4 className="font-display font-semibold text-zinc-900 text-sm">No reels match this filter</h4>
            <p className="text-zinc-500 text-xs mt-1">Try resetting the search or category tab.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-3.5 py-1.5 text-xs font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
