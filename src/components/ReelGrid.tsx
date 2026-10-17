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
            <p className="text-zinc-600 text-sm mt-1 max-w-3xl">
              From brand promotional advertisements, million-view romantic couple teasers and emotional wedding ceremonies to high-retention creator talking head and fast street transitions.
            </p>
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
                Multiple reels generated lakhs and millions of views on Instagram
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
