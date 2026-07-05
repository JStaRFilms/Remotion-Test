import React from 'react';
import { COLORS, TYPO } from '../config';
import { map, t } from '../utils/animation';

export const OrbitSymbol: React.FC<{ frame: number; size?: number; progress?: number }> = ({ frame, size = 180, progress }) => {
  const p = progress ?? t(frame, 0, 34);
  const spin = map(frame, [0, 60], [-28, 0]);
  return (
    <div style={{ 
      width: size, 
      height: size, 
      position: 'relative', 
      transform: `rotate(${spin}deg) scale(${0.86 + p * 0.14})`, 
    }}>
      <svg width={size} height={size} viewBox="0 0 200 200" style={{ position: 'relative', zIndex: 1 }}>
        <defs>
          <linearGradient id="orbitStroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={COLORS.blue} />
            <stop offset="0.5" stopColor={COLORS.violet} />
            <stop offset="1" stopColor={COLORS.cyan} />
          </linearGradient>
        </defs>
        
        {/* Technical sharp coordinate guides */}
        <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4 8" />
        
        {/* Technical concentric boxes instead of soft circles */}
        <rect x="72" y="72" width="56" height="56" fill="transparent" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <rect x="47" y="47" width="106" height="106" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 4" />
        
        {/* Razor-thin elliptical orbits */}
        <ellipse cx="100" cy="100" rx="84" ry="38" fill="none" stroke="url(#orbitStroke)" strokeWidth="4" strokeLinecap="square" pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 - p }} />
        <ellipse cx="100" cy="100" rx="84" ry="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" transform="rotate(58 100 100)" pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 - Math.max(0, p - 0.18) / 0.82 }} />
        
        {/* Orbiting square nodes */}
        <rect x={97 + Math.cos((frame / 20) + 0.7) * 75} y={97 + Math.sin((frame / 20) + 0.7) * 30} width="6" height="6" fill={COLORS.cyan} opacity={p} />
        <rect x={98 - Math.cos((frame / 22) + 1.2) * 53} y={98 - Math.sin((frame / 22) + 1.2) * 22} width="4" height="4" fill={COLORS.violet} opacity={p * 0.7} />
        
        {/* Center core - technical square */}
        <rect x="94" y="94" width="12" height="12" fill="white" opacity={p} />
      </svg>
    </div>
  );
};

export const BrandLockup: React.FC<{ frame: number }> = ({ frame }) => {
  const symbol = t(frame, 0, 32);
  const word = t(frame, 14, 42);
  const line = t(frame, 31, 54);
  const settle = t(frame, 45, 59);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateY(${-16 * settle}px)` }}>
        <OrbitSymbol frame={frame} progress={symbol} />
        <div style={{ height: 40 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: word, transform: `translateY(${(1 - word) * 28}px)` }}>
          <div style={{ 
            fontSize: 90, 
            fontWeight: 800, 
            lineHeight: 1, 
            letterSpacing: -2.5,
            color: '#ffffff',
          }}>
            ORBIT
          </div>
          <div style={{ 
            width: 8, 
            height: 8, 
            borderRadius: 0, // Squared dot
            background: COLORS.violet, 
          }} />
        </div>
        <div style={{ marginTop: 24, overflow: 'hidden' }}>
          <div style={{ 
            color: COLORS.muted, 
            fontSize: 16, 
            fontWeight: 600, 
            letterSpacing: '0.14em', 
            transform: `translateY(${(1 - line) * 34}px)`,
            textTransform: 'uppercase',
            fontFamily: TYPO.mono,
            opacity: line * 0.72
          }}>
            Everything moves together.
          </div>
        </div>
      </div>
    </div>
  );
};
