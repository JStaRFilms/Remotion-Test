import React from 'react';
import { COLORS } from '../config';
import { map, t } from '../utils/animation';

export const OrbitSymbol: React.FC<{ frame: number; size?: number; progress?: number }> = ({ frame, size = 180, progress }) => {
  const p = progress ?? t(frame, 0, 34);
  const spin = map(frame, [0, 60], [-28, 0]);
  return (
    <div style={{ width: size, height: size, position: 'relative', transform: `rotate(${spin}deg) scale(${0.86 + p * 0.14})`, filter: 'drop-shadow(0 26px 72px rgba(56,183,255,0.24))' }}>
      <svg width={size} height={size} viewBox="0 0 200 200">
        <defs>
          <linearGradient id="orbitStroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={COLORS.blue} />
            <stop offset="0.52" stopColor={COLORS.violet} />
            <stop offset="1" stopColor={COLORS.cyan} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="53" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        <ellipse cx="100" cy="100" rx="84" ry="38" fill="none" stroke="url(#orbitStroke)" strokeWidth="8" strokeLinecap="round" pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 - p }} />
        <ellipse cx="100" cy="100" rx="84" ry="38" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" transform="rotate(58 100 100)" pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 - Math.max(0, p - 0.18) / 0.82 }} />
        <circle cx={100 + Math.cos((frame / 20) + 0.7) * 75} cy={100 + Math.sin((frame / 20) + 0.7) * 30} r="8" fill={COLORS.cyan} opacity={p} />
        <circle cx="100" cy="100" r="17" fill="white" opacity={p} />
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateY(${-12 * settle}px)` }}>
        <OrbitSymbol frame={frame} progress={symbol} />
        <div style={{ height: 36 }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, opacity: word, transform: `translateY(${(1 - word) * 28}px)` }}>
          <div style={{ fontSize: 104, fontWeight: 780, lineHeight: 0.9, letterSpacing: -4.6 }}>Orbit</div>
          <div style={{ width: 10, height: 10, borderRadius: 99, background: COLORS.blue, boxShadow: '0 0 24px rgba(56,183,255,0.8)' }} />
        </div>
        <div style={{ marginTop: 34, overflow: 'hidden' }}>
          <div style={{ color: COLORS.softText, fontSize: 34, fontWeight: 520, letterSpacing: -0.7, opacity: line, transform: `translateY(${(1 - line) * 34}px)` }}>
            Everything moves together.
          </div>
        </div>
      </div>
    </div>
  );
};
