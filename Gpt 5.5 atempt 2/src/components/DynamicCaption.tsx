import React from 'react';
import {COLORS, TYPO} from '../config';
import {clamp} from '../utils';

export const DynamicCaption: React.FC<{
  text: string;
  frame: number;
  start: number;
  end: number;
  x: number;
  y: number;
  scale?: number;
  accent?: string;
  split?: boolean;
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
}> = ({text, frame, start, end, x, y, scale = 1, accent = COLORS.blue, split = false, align = 'left', style}) => {
  const inP = clamp((frame - start) / 14);
  const outP = clamp((end - frame) / 14);
  const show = Math.min(inP, outP);
  const words = text.split(' ');
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity: show,
        transform: `translate3d(0, ${(1 - show) * 22}px, 150px) scale(${scale * (0.96 + 0.04 * show)})`,
        transformOrigin: align === 'right' ? '100% 50%' : align === 'center' ? '50% 50%' : '0 50%',
        fontFamily: TYPO.font,
        textAlign: align,
        zIndex: 70,
        ...style,
      }}
    >
      {split ? (
        <div style={{display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', width: 500}}>
          {words.map((word, idx) => {
            const local = clamp((frame - start - idx * 3) / 10);
            return (
              <span key={`${word}-${idx}`} style={{display: 'inline-block', padding: idx === 0 ? '11px 16px' : '9px 14px', borderRadius: idx === 0 ? 18 : 999, color: idx === 0 ? '#061017' : COLORS.white, background: idx === 0 ? accent : 'rgba(255,255,255,0.09)', border: `1px solid ${idx === 0 ? accent : COLORS.lineStrong}`, fontSize: idx === 0 ? 32 : 24, fontWeight: 850, letterSpacing: -1, transform: `translateY(${(1 - local) * 24}px) scale(${0.92 + local * 0.08})`, opacity: local}}>{word}</span>
            );
          })}
        </div>
      ) : (
        <div style={{fontSize: 44, lineHeight: 0.92, fontWeight: 850, letterSpacing: -2.2, color: COLORS.white, textShadow: '0 18px 38px rgba(0,0,0,0.55)'}}>{text}</div>
      )}
    </div>
  );
};

export const CaptionAsUI: React.FC<{frame: number; start: number; x: number; y: number}> = ({frame, start, x, y}) => {
  const p = clamp((frame - start) / 26);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 318, height: 72, borderRadius: 20, background: p > 0.66 ? 'rgba(100,246,189,0.14)' : 'rgba(255,255,255,0.08)', border: `1px solid ${p > 0.66 ? 'rgba(100,246,189,0.48)' : COLORS.lineStrong}`, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 14, transform: `translateY(${(1 - p) * -24}px) scale(${0.96 + p * 0.04})`, opacity: p, boxShadow: '0 26px 60px rgba(0,0,0,0.38)', fontFamily: TYPO.font, zIndex: 74}}>
      <div style={{width: 38, height: 38, borderRadius: 12, background: COLORS.green, color: COLORS.bg, display: 'grid', placeItems: 'center', fontWeight: 900}}>✓</div>
      <div>
        <div style={{color: COLORS.white, fontWeight: 840, fontSize: 18}}>Ship it</div>
        <div style={{color: COLORS.muted, fontWeight: 650, fontSize: 12}}>caption became status</div>
      </div>
    </div>
  );
};
