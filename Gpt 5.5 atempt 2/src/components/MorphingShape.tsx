import React from 'react';
import {COLORS} from '../config';

export const OrbitGlyph: React.FC<{size?: number; progress?: number; accent?: string; style?: React.CSSProperties}> = ({size = 160, progress = 1, accent = COLORS.blue, style}) => {
  const p = Math.max(0, Math.min(1, progress));
  const dash = 520;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{overflow: 'visible', ...style}}>
      <defs>
        <linearGradient id="orbitGlyphGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={COLORS.white} />
          <stop offset="0.45" stopColor={accent} />
          <stop offset="1" stopColor={COLORS.violet} />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="100" rx="72" ry="36" fill="none" stroke="url(#orbitGlyphGradient)" strokeWidth="11" strokeLinecap="round" strokeDasharray={dash} strokeDashoffset={dash * (1 - p)} transform="rotate(-24 100 100)" />
      <ellipse cx="100" cy="100" rx="72" ry="36" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="4" transform="rotate(22 100 100)" />
      <circle cx="100" cy="100" r={26 + 4 * p} fill="rgba(247,248,255,0.96)" />
      <circle cx="100" cy="100" r={12} fill={COLORS.bg} />
      <circle cx="160" cy="72" r={8 + 3 * p} fill={accent} filter="drop-shadow(0 0 15px rgba(79,195,255,0.7))" />
    </svg>
  );
};

export const MorphingShape: React.FC<{
  type?: 'circle' | 'diamond' | 'panel' | 'pill';
  accent?: string;
  style?: React.CSSProperties;
}> = ({type = 'circle', accent = COLORS.blue, style}) => {
  const radius = type === 'circle' ? 999 : type === 'pill' ? 999 : type === 'panel' ? 24 : 18;
  return (
    <div
      style={{
        position: 'absolute',
        width: type === 'pill' ? 210 : type === 'panel' ? 250 : 92,
        height: type === 'pill' ? 62 : type === 'panel' ? 138 : 92,
        borderRadius: radius,
        transform: `${type === 'diamond' ? 'rotate(45deg)' : ''}`,
        background: `linear-gradient(145deg, ${accent}33, rgba(255,255,255,0.07))`,
        border: `1px solid ${accent}66`,
        boxShadow: `0 24px 58px rgba(0,0,0,0.34), 0 0 42px ${accent}33, inset 0 1px 0 rgba(255,255,255,0.13)`,
        ...style,
      }}
    />
  );
};
