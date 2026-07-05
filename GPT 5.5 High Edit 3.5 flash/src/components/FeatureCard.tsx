import React from 'react';
import { COLORS } from '../config';
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
        borderRadius: `${24 + shape * (index === 1 ? 92 : 14)}px`,
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${80 + index * 50}px) rotateX(${18 - p * 10}deg) rotateY(${-16 + p * 28}deg) rotateZ(${r}deg)`,
        background: `linear-gradient(135deg, ${accent}${shape > 0.45 ? '66' : '28'}, rgba(255,255,255,0.075))`,
        border: `1px solid ${accent}77`,
        boxShadow: `0 32px 90px rgba(0,0,0,0.45), 0 0 ${26 + p * 34}px ${accent}24`,
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 16, borderRadius: 18, border: '1px solid rgba(255,255,255,0.09)', opacity: 1 - shape }} />
      <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: 999, background: `radial-gradient(circle, ${accent}44, transparent 58%)`, transform: `translate(${index * 20 - 30}px, ${index * -24}px)` }} />
      <div
        style={{
          fontSize: 64,
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: -2.4,
          color: COLORS.text,
          opacity: word,
          transform: `translateY(${(1 - word) * 28}px) scale(${0.88 + word * 0.12})`,
          textShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        {title}
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
        borderRadius: 34,
        background: 'rgba(15,18,28,0.82)',
        border: `1px solid rgba(255,255,255,${0.08 + inP * 0.12})`,
        boxShadow: '0 36px 120px rgba(0,0,0,0.44)',
        opacity: inP,
        transform: `translateX(${(1 - inP) * 72}px) rotateY(${-22 + inP * 22}deg)`,
        transformStyle: 'preserve-3d',
        padding: 34,
      }}
    >
      <div style={{ color: COLORS.muted, fontSize: 16, textTransform: 'uppercase', letterSpacing: 1.8 }}>Team operating system</div>
      <div style={{ color: COLORS.text, fontSize: 42, fontWeight: 760, letterSpacing: -1.1, marginTop: 12 }}>One connected workspace</div>
      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[COLORS.blue, COLORS.violet, COLORS.green].map((c, i) => (
          <div key={c} style={{ height: 42, borderRadius: 999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(100, line - i * 16)}%`, background: `linear-gradient(90deg, ${c}, rgba(255,255,255,0.38))`, borderRadius: 999 }} />
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', right: 34, bottom: 32, width: 92, height: 92, borderRadius: 28, background: `conic-gradient(${COLORS.blue}, ${COLORS.violet}, ${COLORS.green}, ${COLORS.blue})`, opacity: 0.86, boxShadow: '0 0 40px rgba(56,183,255,0.26)' }} />
    </div>
  );
};
