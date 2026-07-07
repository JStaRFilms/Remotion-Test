import React from 'react';
import {COLORS, TYPO} from '../config';
import {OrbitGlyph} from './MorphingShape';

export const BrandLockup: React.FC<{progress: number; settle: number}> = ({progress, settle}) => {
  const p = Math.max(0, Math.min(1, progress));
  const s = Math.max(0, Math.min(1, settle));
  return (
    <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: TYPO.font}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 34, transform: `translateY(${(1 - p) * 52 - s * 4}px) scale(${0.94 + p * 0.06})`, opacity: p}}>
        <OrbitGlyph size={186} progress={p} />
        <div>
          <div style={{fontSize: 98, lineHeight: 0.9, color: COLORS.white, fontWeight: 850, letterSpacing: -5.5}}>Orbit</div>
          <div style={{marginTop: 24, fontSize: 30, color: COLORS.white, fontWeight: 650, letterSpacing: -0.9}}>Everything moves together.</div>
        </div>
      </div>
      <div style={{position: 'absolute', bottom: 70, left: 120, right: 120, height: 1, background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.18 * p}), transparent)`}} />
      <div style={{position: 'absolute', width: 620, height: 620, borderRadius: 999, border: '1px solid rgba(255,255,255,0.06)', transform: `rotate(${p * 36 + s * 4}deg)`, opacity: p * 0.8}} />
    </div>
  );
};
