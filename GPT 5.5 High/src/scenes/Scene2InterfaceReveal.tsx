import React from 'react';
import { Easing } from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { Cursor } from '../components/Cursor';
import { DepthDust, LightSweep, SceneShell } from '../components/SceneShell';
import { COLORS } from '../config';
import { map, t } from '../utils/animation';

export const Scene2InterfaceReveal: React.FC<{ frame: number }> = ({ frame }) => {
  const entry = t(frame, 0, 42, Easing.out(Easing.cubic));
  const push = t(frame, 38, 126, Easing.inOut(Easing.quad));
  const clickPulse = t(frame, 76, 98, Easing.out(Easing.circle));
  const focusRing = t(frame, 82, 112) * (1 - t(frame, 126, 146));
  const path = [
    { frame: 12, x: 1540, y: 260 },
    { frame: 42, x: 1228, y: 442 },
    { frame: 72, x: 972, y: 566 },
    { frame: 78, x: 948, y: 582 },
    { frame: 116, x: 1322, y: 384 },
    { frame: 142, x: 1470, y: 312 },
  ];
  return (
    <SceneShell vignette={0.64}>
      <DepthDust frame={frame + 90} intensity={0.65} />
      <LightSweep x={map(frame, [0, 150], [240, 1110])} opacity={0.18} />
      <div style={{ position: 'absolute', inset: 0, perspective: 1250, transformStyle: 'preserve-3d' }}>
        <AppWindow
          frame={frame}
          variant="board"
          scale={0.96 + push * 0.06}
          rotateX={56 - entry * 45 - push * 3}
          rotateY={-24 + entry * 16 + push * 4}
          rotateZ={-1.8 + entry * 1.2}
          y={36 - entry * 40 + push * -10}
          opacity={entry}
        />
        <div
          style={{
            position: 'absolute',
            left: 706,
            top: 485,
            width: 390 + clickPulse * 70,
            height: 95 + clickPulse * 18,
            borderRadius: 30,
            border: `2px solid rgba(56,183,255,${0.1 + focusRing * 0.74})`,
            boxShadow: `0 0 ${focusRing * 70}px rgba(56,183,255,0.35)`,
            opacity: focusRing,
            transform: `rotateX(${11}deg) rotateY(${-6}deg)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 232,
            top: 200,
            width: 278,
            padding: '18px 20px',
            borderRadius: 24,
            background: 'rgba(10,12,19,0.74)',
            border: `1px solid rgba(133,244,255,${0.12 + clickPulse * 0.4})`,
            boxShadow: '0 22px 60px rgba(0,0,0,0.35)',
            opacity: t(frame, 88, 112),
            transform: `translateY(${(1 - t(frame, 88, 112)) * 28}px)`,
            color: COLORS.softText,
            fontSize: 18,
          }}
        >
          Project context updates instantly.
        </div>
        <Cursor frame={frame} path={path} clickFrames={[78]} visibleFrom={10} visibleTo={142} />
      </div>
    </SceneShell>
  );
};
