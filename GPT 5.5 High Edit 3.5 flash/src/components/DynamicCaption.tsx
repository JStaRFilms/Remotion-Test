import React from 'react';
import { COLORS, TYPO } from '../config';
import { map, Point, pathPoint, t } from '../utils/animation';

export const DynamicCaption: React.FC<{
  frame: number;
  text: string;
  start: number;
  end: number;
  path: Point[];
  accent?: string;
  split?: boolean;
  attachAtEnd?: boolean;
}> = ({ frame, text, start, end, path, accent = COLORS.blue, split = false, attachAtEnd = false }) => {
  const point = pathPoint(frame, path);
  const enter = t(frame, start, start + 14);
  const exit = 1 - t(frame, end - 12, end);
  const opacity = enter * exit;
  const emphasis = Math.sin(t(frame, start + 8, start + 28) * Math.PI);
  const attach = attachAtEnd ? t(frame, end - 32, end - 8) : 0;
  const words = text.split(' ');
  
  return (
    <div
      style={{
        position: 'absolute',
        left: point.x,
        top: point.y,
        opacity,
        transform: `translate(-50%, -50%) scale(${map(frame, [start, start + 20], [0.84, 1]) - attach * 0.14 + emphasis * 0.035})`,
        transformOrigin: 'center',
        zIndex: 30,
        maxWidth: 640,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: split ? 10 : 0,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          padding: attach > 0.65 ? '10px 16px' : '0',
          borderRadius: 4, // Sharp corners
          border: attach > 0.65 ? `1px solid ${accent}` : '1px solid transparent',
          background: attach > 0.65 ? 'rgba(9,11,18,0.92)' : 'transparent',
          boxShadow: attach > 0.65 ? '0 12px 36px rgba(0,0,0,0.6)' : undefined,
          backdropFilter: attach > 0.65 ? 'blur(8px)' : 'none',
        }}
      >
        {split ? (
          words.map((word, i) => {
            const wi = t(frame, start + i * 4, start + 14 + i * 4);
            const isLast = i === words.length - 1;
            
            return (
              <span
                key={`${word}-${i}`}
                style={{
                  display: 'inline-flex',
                  padding: isLast ? '8px 14px' : '6px 0',
                  color: isLast ? '#000000' : COLORS.text,
                  background: isLast ? accent : 'transparent', // Solid bright accent block
                  borderRadius: isLast ? 2 : 0, // Sharp square highlights
                  fontSize: isLast ? 36 : 36,
                  lineHeight: 1,
                  fontWeight: 800,
                  letterSpacing: -1.2,
                  transform: `translateY(${(1 - wi) * 24}px) rotate(${(1 - wi) * -2}deg)`,
                  opacity: wi,
                }}
              >
                {word}
              </span>
            );
          })
        ) : (
          <div
            style={{
              color: COLORS.text,
              fontSize: 48,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: -1.5,
              textShadow: '0 8px 24px rgba(0,0,0,0.6)',
            }}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export const InterfaceNote: React.FC<{ frame: number; start: number; x: number; y: number; text: string; color?: string }> = ({ frame, start, x, y, text, color = COLORS.violet }) => {
  const p = t(frame, start, start + 18);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 250,
        padding: '14px 16px',
        borderRadius: 4, // Sharp Brutalist card
        background: 'rgba(9,11,18,0.92)',
        border: `1px solid rgba(255,255,255,0.06)`,
        borderTop: `3px solid ${color}`, // Top colored line indicator
        boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        color: COLORS.text,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.4,
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px) scale(${0.92 + p * 0.08})`,
        zIndex: 34,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 9, fontFamily: TYPO.mono, fontWeight: 700, textTransform: 'uppercase', color: color }}>
          [note // active]
        </span>
      </div>
      <div style={{ color: COLORS.softText }}>
        {text}
      </div>
    </div>
  );
};
