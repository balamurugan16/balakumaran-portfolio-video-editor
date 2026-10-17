import React, { useState } from 'react';
import { Play, ExternalLink, Heart, Eye, Share2, Sparkles } from 'lucide-react';
import { ReelItem } from '../types/portfolio';

interface ReelCardProps {
  reel: ReelItem;
  onSelect: (reel: ReelItem) => void;
}

export const ReelCard: React.FC<ReelCardProps> = ({ reel, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-zinc-200/80 hover:border-zinc-400 transition-all duration-300 hover:shadow-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(reel)}
    >
      {/* 9:16 Vertical Video Frame */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-100">
        {!imageError ? (
          <img
            src={reel.coverImage}
            alt={reel.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
              isHovered ? 'scale-103' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-100">
            <Play className="w-10 h-10 text-zinc-400 mb-2" />
            <span className="font-display font-semibold text-zinc-900 text-xs">{reel.title}</span>
          </div>
        )}

        {/* Subtle Dark Gradient at Bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Top Overlay: Category Tag + High Reach Tag */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs z-10 gap-1.5">
          <span className="px-2.5 py-1 bg-black/65 backdrop-blur-sm text-white rounded-md text-[11px] font-mono truncate">
            {reel.categoryLabel}
          </span>

          {reel.isHighReach && (
            <span className="px-2 py-0.5 bg-amber-400 text-zinc-950 font-bold rounded text-[10px] font-mono flex items-center gap-1 shadow-sm shrink-0">
              <Sparkles className="w-3 h-3" />
              <span>Viral Reach</span>
            </span>
          )}
          {reel.viralStatus === 'unknown' && (
            <span className="px-2 py-0.5 bg-zinc-900/75 text-white rounded text-[10px] font-mono shrink-0">
              Reach Unknown
            </span>
          )}
        </div>

        {/* Center Play Button on Hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 pointer-events-none ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white/95 text-zinc-900 flex items-center justify-center shadow-md pl-0.5">
            <Play className="w-5 h-5 fill-zinc-900" />
          </div>
        </div>

        {/* Bottom Metadata inside 9:16 Frame */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1 z-10 text-white">
          <span className="text-[11px] font-mono text-zinc-300 truncate">{reel.client}</span>
          <h3 className="font-display font-bold text-sm text-white leading-tight line-clamp-2">
            {reel.title}
          </h3>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2.5 pt-2 text-xs font-mono text-white/90 border-t border-white/10">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-bold">{reel.views === 'Unavailable' ? 'Views unavailable' : `${reel.views} Views`}</span>
            </span>

            {reel.likes && (
              <>
                <span className="text-white/40">·</span>
                <span className="flex items-center gap-1 text-white/80">
                  <Heart className="w-3 h-3 text-pink-400" />
                  <span>{reel.likes}</span>
                </span>
              </>
            )}

            {reel.shares && (
              <>
                <span className="text-white/40">·</span>
                <span className="flex items-center gap-1 text-white/80">
                  <Share2 className="w-3 h-3 text-sky-400" />
                  <span>{reel.shares}</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="p-3 bg-white flex items-center justify-between text-xs border-t border-zinc-100">
        <span className="text-[11px] font-mono text-zinc-500 truncate mr-2">{reel.toolsUsed}</span>
        <span className="text-zinc-700 hover:text-black flex items-center gap-1 font-medium text-xs shrink-0">
          <span>Details</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </span>
      </div>
    </div>
  );
};
