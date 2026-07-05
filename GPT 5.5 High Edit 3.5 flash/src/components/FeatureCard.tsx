import React from 'react';
import { COLORS, TYPO } from '../config';
import { map, t } from '../utils/animation';

export const FeatureCard: React.FC<{
  frame: number;
  index: number;
  title: string;
  from: { x: number; y: number; r: number };
  to: { x: number; y: number; r: number };
  accent: string;
  delay?: number;
}> = ({ frame, index, title, from, to, accent, delay = 0 }) => {
  const p = t(frame, 20 + delay, 86 + delay);
  const word = t(frame, 70 + delay, 105 + delay);
  const shape = t(frame, 48 + delay, 82 + delay);
  const x = from.x + (to.x - from.x) * p;
  const y = from.y + (to.y - from.y) * p;
  const r = from.r + (to.r - from.r) * p;
  const finalWidth = title === 'Deliver' ? 320 : title === 'Review' ? 272 : 248;
  const finalHeight = title === 'Deliver' ? 210 : 210 - index * 22;
  const width = map(frame, [34 + delay, 76 + delay], [330, finalWidth]);
  const height = map(frame, [34 + delay, 76 + delay], [156, finalHeight]);
  
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width,
        height,
        borderRadius: 4, // Completely sharp squared corners
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${80 + index * 50}px) rotateX(${18 - p * 10}deg) rotateY(${-16 + p * 28}deg) rotateZ(${r}deg)`,
        background: 'rgba(9, 10, 14, 0.92)',
        border: `1.5px solid ${accent}`, // Crisp bright solid borders
        boxShadow: `0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)`,
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Precision square sub-border */}
      <div style={{ position: 'absolute', inset: 8, border: '1px dashed rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
      
      {/* Title */}
      <div
        style={{
          fontSize: 48,
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: -1.5,
          color: COLORS.text,
          opacity: word,
          transform: `translateY(${(1 - word) * 24}px) scale(${0.88 + word * 0.12})`,
        }}
      >
        {title.toUpperCase()}
      </div>
    </div>
  );
};

export const MorphingPanel: React.FC<{ frame: number }> = ({ frame }) => {
  const inP = t(frame, 94, 124);
  const line = map(frame, [110, 142], [0, 100]);
  
  return (
    <div
      style={{
        position: 'absolute',
        left: 1120,
        top: 270,
        width: 470,
        height: 392,
        borderRadius: 6, // Sharp corner
        background: '#090a0e',
        border: `1px solid rgba(255,255,255,0.05)`,
        boxShadow: '0 30px 90px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)',
        opacity: inP,
        transform: `translateX(${(1 - inP) * 72}px) rotateY(${-22 + inP * 22}deg)`,
        transformStyle: 'preserve-3d',
        padding: 30,
      }}
    >
      <div style={{ color: COLORS.muted, fontSize: 11, fontFamily: TYPO.mono, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        System // Unified Matrix
      </div>
      <div style={{ color: COLORS.text, fontSize: 30, fontWeight: 800, letterSpacing: -1, marginTop: 10 }}>
        One connected workspace.
      </div>
      
      {/* Brutalist Flat Sliders */}
      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[COLORS.blue, COLORS.violet, COLORS.green].map((c, i) => {
          const widthVal = Math.min(100, line - i * 16);
          return (
            <div 
              key={c} 
              style={{ 
                height: 18, 
                borderRadius: 0, // Sharp square slots
                background: 'rgba(255,255,255,0.015)', 
                border: '1px solid rgba(255,255,255,0.03)',
                position: 'relative',
              }}
            >
              {/* Flat solid color progress */}
              <div 
                style={{ 
                  height: '100%', 
                  width: `${widthVal}%`, 
                  background: c, 
                }} 
              />
              {/* Squared slider thumb indicator */}
              {widthVal > 0 && (
                <div style={{
                  position: 'absolute',
                  left: `calc(${widthVal}% - 6px)`,
                  top: -2,
                  width: 12,
                  height: 22,
                  background: '#ffffff',
                  border: `1px solid ${c}`,
                }} />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Square Conic core widget */}
      <div style={{ 
        position: 'absolute', 
        right: 30, 
        bottom: 30, 
        width: 80, 
        height: 80, 
        borderRadius: 4, 
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'grid',
        placeItems: 'center',
      }}>
        <div style={{ 
          width: 54, 
          height: 54, 
          borderRadius: 0, // Squared conic badge
          background: `conic-gradient(${COLORS.blue}, ${COLORS.violet}, ${COLORS.green}, ${COLORS.blue})`, 
          opacity: 0.85, 
          display: 'grid',
          placeItems: 'center',
        }}>
          <div style={{ width: 24, height: 24, background: '#090a0e', border: '1px solid rgba(255,255,255,0.08)' }} />
        </div>
      </div>
    </div>
  );
};
