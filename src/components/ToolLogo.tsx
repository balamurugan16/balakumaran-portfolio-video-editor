import React from 'react';

interface ToolLogoProps {
  name: string;
  className?: string;
}

export const ToolLogo: React.FC<ToolLogoProps> = ({ name, className = 'w-10 h-10' }) => {
  const normalized = name.toLowerCase();

  // Adobe Premiere Pro
  if (normalized.includes('premiere')) {
    return (
      <svg
        viewBox="0 0 40 40"
        className={`shrink-0 rounded-xl shadow-xs overflow-hidden ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Adobe Premiere Pro"
      >
        <rect width="40" height="40" rx="9" fill="#00005B" />
        <rect x="0.5" y="0.5" width="39" height="39" rx="8.5" stroke="#9999FF" strokeWidth="1" strokeOpacity="0.3" />
        <text
          x="20"
          y="25.5"
          textAnchor="middle"
          fill="#9999FF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="-0.8"
        >
          Pr
        </text>
      </svg>
    );
  }

  // CapCut
  if (normalized.includes('capcut')) {
    return (
      <svg
        viewBox="0 0 40 40"
        className={`shrink-0 rounded-xl shadow-xs overflow-hidden ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CapCut"
      >
        <rect width="40" height="40" rx="9" fill="#09090B" />
        <rect x="0.5" y="0.5" width="39" height="39" rx="8.5" stroke="#27272A" strokeWidth="1" />
        {/* CapCut dual ribbon scissors */}
        <g fill="#FFFFFF">
          <path
            d="M9.5 13.5L20 19.5L30.5 13.5L30.5 17.5L20 23.5L9.5 17.5Z"
            fillRule="evenodd"
          />
          <path
            d="M9.5 26.5L20 20.5L30.5 26.5L30.5 22.5L20 16.5L9.5 22.5Z"
            fillRule="evenodd"
          />
        </g>
      </svg>
    );
  }

  // DaVinci Resolve
  if (normalized.includes('davinci') || normalized.includes('resolve')) {
    return (
      <svg
        viewBox="0 0 40 40"
        className={`shrink-0 rounded-xl shadow-xs overflow-hidden ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DaVinci Resolve"
      >
        <rect width="40" height="40" rx="9" fill="#121316" />
        <rect x="0.5" y="0.5" width="39" height="39" rx="8.5" stroke="#27272A" strokeWidth="1" />
        {/* DaVinci Resolve 3-Petal Color Pinwheel */}
        <g transform="translate(20, 20)">
          {/* Blue / Cyan blade */}
          <path
            d="M-2 -2.5 C-9 -10, -12 -3, -8 2 C-5 6, -1 3, -2 -2.5 Z"
            fill="#00B4D8"
          />
          {/* Red / Magenta blade */}
          <path
            d="M2 -2 C10 -6, 11 2, 7 6.5 C3.5 10, 0 5, 2 -2 Z"
            fill="#FF385C"
          />
          {/* Amber / Yellow blade */}
          <path
            d="M0 2.5 C-2 10.5, 6 11.5, 8.5 6 C10.5 2, 5 0, 0 2.5 Z"
            fill="#FFB703"
          />
          <circle cx="0" cy="0" r="1.8" fill="#121316" />
        </g>
      </svg>
    );
  }

  // Adobe After Effects
  if (normalized.includes('after effects') || normalized.includes('aftereffects')) {
    return (
      <svg
        viewBox="0 0 40 40"
        className={`shrink-0 rounded-xl shadow-xs overflow-hidden ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Adobe After Effects"
      >
        <rect width="40" height="40" rx="9" fill="#00005B" />
        <rect x="0.5" y="0.5" width="39" height="39" rx="8.5" stroke="#D291FF" strokeWidth="1" strokeOpacity="0.3" />
        <text
          x="20"
          y="25.5"
          textAnchor="middle"
          fill="#D291FF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="-0.8"
        >
          Ae
        </text>
      </svg>
    );
  }

  // Default fallback
  return (
    <div
      className={`shrink-0 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-xs ${className}`}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
};
