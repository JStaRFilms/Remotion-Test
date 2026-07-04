import React from 'react';
import { Easing } from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { DepthDust, LightSweep, SceneShell } from '../components/SceneShell';
import { COLORS, SAFE } from '../config';
import { map, t } from '../utils/animation';

export const Scene1Opening: React.FC<{ frame: number }> = ({ frame }) => {
  const approach = t(frame, 0, 74, Easing.in(Easing.exp));
  const lock = t(frame, 58, 89, Easing.out(Easing.cubic));
  const orbScale = map(frame, [0, 74], [0.22, 18], Easing.in(Easing.exp));
  const orbY = map(frame, [0, 70], [-42, 10], Easing.inOut(Easing.quad));
  const textIn = t(frame, 25, 48, Easing.out(Easing.cubic));
  const textTravel = t(frame, 43, 82, Easing.inOut(Easing.cubic));
  const appIn = t(frame, 62, 89, Easing.out(Easing.cubic));
  return (
    <SceneShell vignette={0.82}>
      <DepthDust frame={frame} intensity={1 - lock * 0.55} />
      <LightSweep x={map(frame, [0, 89], [-320, 760])} opacity={0.13 + approach * 0.18} />
      <div style={{ position: 'absolute', inset: 0, perspective: 1100, transformStyle: 'preserve-3d' }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 26,
            height: 26,
            borderRadius: 999,
            background: `radial-gradient(circle, white, ${COLORS.cyan} 36%, ${COLORS.blue} 58%, transparent 70%)`,
            transform: `translate(-50%, -50%) translateY(${orbY}px) translateZ(${map(frame, [0, 74], [-820, 380], Easing.in(Easing.exp))}px) scale(${orbScale})`,
            opacity: 1 - appIn * 0.9,
            filter: `blur(${map(frame, [0, 52, 74], [0, 0.5, 5])}px)`,
            boxShadow: `0 0 ${34 + approach * 130}px rgba(56,183,255,${0.36 + approach * 0.26})`,
          }}
        />
        <svg style={{ position: 'absolute', left: 0, top: 0, opacity: 0.62 * (1 - lock) }} width="1920" height="1080" viewBox="0 0 1920 1080">
          <path d="M426 596 C686 336 1034 350 1428 556" fill="none" stroke="rgba(133,244,255,0.22)" strokeWidth="2" strokeDasharray="6 22" strokeDashoffset={-frame * 7} />
          <path d="M500 668 C784 454 1054 492 1338 388" fill="none" stroke="rgba(140,108,255,0.18)" strokeWidth="1.4" strokeDasharray="3 18" strokeDashoffset={frame * 4} />
        </svg>
        <div
          style={{
            position: 'absolute',
            left: SAFE + textTravel * 250,
            top: 650 - textTravel * 270,
            opacity: textIn * (1 - t(frame, 72, 89)),
            transform: `translateZ(${80 + textTravel * 150}px) rotateY(${-12 + textTravel * 10}deg)`,
          }}
        >
          <div style={{ fontSize: 82, fontWeight: 770, letterSpacing: -3.5, lineHeight: 0.95 }}>
            Your work.<br />In motion.
          </div>
          <div style={{ marginTop: 26, width: 315, height: 2, background: `linear-gradient(90deg, ${COLORS.blue}, transparent)`, transform: `scaleX(${textIn})`, transformOrigin: 'left' }} />
        </div>
        <AppWindow frame={frame} variant="board" compact scale={0.42 + appIn * 0.54} rotateX={66 - appIn * 53} rotateY={-28 + appIn * 20} y={-8 + (1 - appIn) * 130} opacity={appIn} />
      </div>
    </SceneShell>
  );
};
