import React from 'react';
import {COLORS, TYPO} from '../config';

export const FeatureCard: React.FC<{
  label: string;
  kicker?: string;
  accent?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({label, kicker, accent = COLORS.blue, style, children}) => (
  <div
    style={{
      position: 'absolute',
      width: 270,
      height: 160,
      borderRadius: 26,
      padding: 22,
      background: 'linear-gradient(145deg, rgba(29,34,51,0.95), rgba(12,14,22,0.92))',
      border: '1px solid rgba(255,255,255,0.14)',
      boxShadow: `0 34px 70px rgba(0,0,0,0.42), 0 0 50px ${accent}22, inset 0 1px 0 rgba(255,255,255,0.07)`,
      fontFamily: TYPO.font,
      overflow: 'hidden',
      ...style,
    }}
  >
    <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 84% 18%, ${accent}33, transparent 36%)`}} />
    <div style={{position: 'relative', color: COLORS.dim, fontSize: 11, fontWeight: 850, letterSpacing: 2.3}}>{kicker}</div>
    <div style={{position: 'relative', color: COLORS.white, fontSize: 34, lineHeight: 1, marginTop: 14, fontWeight: 840, letterSpacing: -1.4}}>{label}</div>
    <div style={{position: 'relative'}}>{children}</div>
  </div>
);

export const MicroBars: React.FC<{accent?: string; count?: number}> = ({accent = COLORS.blue, count = 4}) => (
  <div style={{display: 'flex', gap: 7, marginTop: 22, alignItems: 'end'}}>
    {Array.from({length: count}).map((_, idx) => <span key={idx} style={{width: 34, height: 10 + idx * 9, borderRadius: 99, background: idx === count - 1 ? accent : 'rgba(255,255,255,0.16)'}} />)}
  </div>
);
