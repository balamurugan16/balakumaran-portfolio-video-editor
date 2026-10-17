import React, { useEffect, useState } from 'react';
import { X, Play, Heart, Eye, MessageCircle, Share2, Bookmark, ExternalLink, Sparkles } from 'lucide-react';
import { ReelItem } from '../types/portfolio';

interface ReelModalProps {
  reel: ReelItem | null;
  onClose: () => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ reel, onClose }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    if (!reel) return;
    setIsPlayingVideo(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reel, onClose]);

  if (!reel) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-mono text-zinc-600">
            <span className="font-semibold text-zinc-900">{reel.categoryLabel}</span>
            <span>·</span>
            <span>{reel.client}</span>
            {reel.isHighReach && (
              <>
                <span>·</span>
                <span className="text-amber-600 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>High Reach</span>
                </span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-6">
          {/* Left: 9:16 Video / Frame */}
          <div className="sm:col-span-5 flex justify-center">
            <div className="relative aspect-[9/16] w-full max-w-[240px] rounded-2xl overflow-hidden bg-black shadow-md flex items-center justify-center group">
              {reel.videoUrl && isPlayingVideo ? (
                <video
                  src={reel.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={reel.coverImage}
                    alt={reel.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3.5">
                    {reel.videoUrl ? (
                      <button
                        onClick={() => setIsPlayingVideo(true)}
                        className="mb-2 self-center w-12 h-12 rounded-full bg-white/95 text-zinc-900 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-zinc-900 ml-0.5" />
                      </button>
                    ) : (
                      <div className="mb-2 self-center w-10 h-10 rounded-full bg-white/80 text-zinc-900 flex items-center justify-center shadow-md">
                        <Play className="w-4 h-4 fill-zinc-900 ml-0.5" />
                      </div>
                    )}
                    <span className="text-white text-xs font-medium leading-snug line-clamp-2">
                      {reel.title}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Metrics & Details */}
          <div className="sm:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-display font-bold text-lg text-zinc-950 mb-1">
                {reel.title}
              </h3>
              <p className="text-xs text-zinc-500 font-mono mb-4">
                Software: {reel.toolsUsed}
              </p>

              {/* Engagement Stats Box */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 font-mono text-center text-xs mb-4">
                <div>
                  <span className="block font-bold text-zinc-900 text-sm">{reel.views}</span>
                  <span className="text-[10px] text-zinc-500 uppercase">Views</span>
                </div>
                {reel.likes && (
                  <div>
                    <span className="block font-bold text-zinc-900 text-sm">{reel.likes}</span>
                    <span className="text-[10px] text-zinc-500 uppercase">Likes</span>
                  </div>
                )}
                {reel.shares && (
                  <div>
                    <span className="block font-bold text-zinc-900 text-sm">{reel.shares}</span>
                    <span className="text-[10px] text-zinc-500 uppercase">Shares</span>
                  </div>
                )}
                {reel.saves && (
                  <div>
                    <span className="block font-bold text-zinc-900 text-sm">{reel.saves}</span>
                    <span className="text-[10px] text-zinc-500 uppercase">Saves</span>
                  </div>
                )}
              </div>

              {/* Overview Description */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="block font-semibold text-zinc-900 mb-1">About This Edit:</span>
                  <p className="text-zinc-600 leading-relaxed bg-zinc-50/70 p-3 rounded-lg border border-zinc-100">
                    {reel.description}
                  </p>
                </div>

                {reel.hookSummary && (
                  <div>
                    <span className="block font-semibold text-zinc-900 mb-1">Hook & Pacing Strategy:</span>
                    <p className="text-zinc-600 leading-relaxed bg-zinc-50/70 p-3 rounded-lg border border-zinc-100">
                      {reel.hookSummary}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              {reel.instagramUrl ? (
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <span>Open on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={onClose}
                className="px-3 py-2 text-xs text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
