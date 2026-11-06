import React from 'react';

export default function Logo({ size = 'default', showTagline = false }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const iconDimensions = isLarge ? 'w-12 h-12' : isSmall ? 'w-7 h-7' : 'w-9 h-9';
  const titleSize = isLarge ? 'text-2xl' : isSmall ? 'text-lg' : 'text-xl';

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      <div className={`relative ${iconDimensions} flex items-center justify-center`}>
        {/* Outer Orbit Ring with glowing satellite */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full transform transition-transform duration-700 group-hover:rotate-45"
        >
          <defs>
            <linearGradient id="logoAquaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#20D9D0" />
              <stop offset="50%" stopColor="#319BFF" />
              <stop offset="100%" stopColor="#36D69A" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Elliptical satellite orbit path */}
          <ellipse 
            cx="50" 
            cy="50" 
            rx="44" 
            ry="20" 
            fill="none" 
            stroke="url(#logoAquaGrad)" 
            strokeWidth="2.5" 
            strokeDasharray="6 4"
            transform="rotate(-25 50 50)" 
            opacity="0.85"
          />

          {/* Satellite Node on Orbit */}
          <circle cx="88" cy="40" r="4.5" fill="#20D9D0" filter="url(#logoGlow)" />
          <line x1="84" y1="40" x2="78" y2="40" stroke="#319BFF" strokeWidth="2" />
          <line x1="92" y1="40" x2="98" y2="40" stroke="#319BFF" strokeWidth="2" />

          {/* Planet Earth Disc */}
          <circle cx="50" cy="50" r="28" fill="#0A202C" stroke="#17496A" strokeWidth="2" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="#20D9D0" strokeWidth="1" opacity="0.4" />

          {/* Latitude / Longitude Curvature lines */}
          <ellipse cx="50" cy="50" rx="16" ry="28" fill="none" stroke="#1C5272" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="22" y1="50" x2="78" y2="50" stroke="#1C5272" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

          {/* Water Droplet Core Symbol */}
          <path 
            d="M50 30 C43 41 38 48 38 56 A12 12 0 0 0 62 56 C62 48 57 41 50 30 Z" 
            fill="url(#logoAquaGrad)"
            filter="url(#logoGlow)"
          />
          {/* Inner droplet light reflection */}
          <ellipse cx="46" cy="52" rx="2.5" ry="5" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 46 52)" />
        </svg>

        {/* Ambient Halo */}
        <div className="absolute inset-0 bg-aqua/20 rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-bold tracking-tight text-white ${titleSize}`}>
            Aqua<span className="text-transparent bg-clip-text bg-gradient-to-r from-aqua to-electric">Sentinel</span>
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-aqua/10 text-aqua border border-aqua/30 uppercase tracking-widest">
            v2.4
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-text-secondary tracking-wider font-mono">
            EARTH OBSERVATION INTELLIGENCE
          </span>
        )}
      </div>
    </div>
  );
}
