import React from 'react';
import { Easing } from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { FeatureCard, MorphingPanel } from '../components/FeatureCard';
import { DepthDust, SceneShell } from '../components/SceneShell';
import { COLORS } from '../config';
import { map, t } from '../utils/animation';

export const Scene3Transformation: React.FC<{ frame: number }> = ({ frame }) => {
  const windowOut = 1 - t(frame, 18, 86, Easing.inOut(Easing.cubic));
  const tunnel = t(frame, 48, 112);
  return (
    <SceneShell vignette={0.7}>
      <DepthDust frame={frame + 240} intensity={0.8} />
      <div style={{ position: 'absolute', inset: 0, perspective: 1160, transformStyle: 'preserve-3d' }}>
        <AppWindow
          frame={frame + 76}
          variant="board"
          compact
          scale={0.86 + tunnel * 0.18}
          rotateX={10 - tunnel * 28}
          rotateY={-8 + tunnel * 36}
          x={-160 - tunnel * 360}
          y={-4 + tunnel * 44}
          opacity={windowOut * 0.82}
        />
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.24 + tunnel * 0.28 }} width="1920" height="1080" viewBox="0 0 1920 1080">
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${560 + i * 120} ${460 + i * 50} C 820 ${260 + i * 40}, 1140 ${740 - i * 90}, 1450 ${410 + i * 70}`} fill="none" stroke={i === 0 ? COLORS.blue : i === 1 ? COLORS.violet : COLORS.green} strokeWidth="2" strokeDasharray="8 20" strokeDashoffset={-frame * (8 + i * 3)} />
          ))}
        </svg>
        <FeatureCard frame={frame} index={0} title="Plan" accent={COLORS.blue} from={{ x: -278, y: -112, r: -7 }} to={{ x: -510, y: -40, r: -9 }} />
        <FeatureCard frame={frame} index={1} title="Review" accent={COLORS.violet} from={{ x: -112, y: 44, r: 2 }} to={{ x: -84, y: -86, r: 4 }} delay={10} />
        <FeatureCard frame={frame} index={2} title="Deliver" accent={COLORS.green} from={{ x: 92, y: -10, r: 8 }} to={{ x: 320, y: 95, r: 7 }} delay={20} />
        <MorphingPanel frame={frame} />
        <div
          style={{
            position: 'absolute',
            left: 180,
            bottom: 118,
            color: COLORS.muted,
            fontSize: 18,
            letterSpacing: 1.8,
            textTransform: 'uppercase',
            opacity: t(frame, 106, 136),
            transform: `translateX(${map(frame, [106, 136], [-30, 0])}px)`,
          }}
        >
          Objects keep their place — the workspace changes form.
        </div>
      </div>
    </SceneShell>
  );
};
