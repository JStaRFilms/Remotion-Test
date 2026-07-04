import React from 'react';
import { BrandLockup } from '../components/BrandLockup';
import { DepthDust, LightSweep, SceneShell } from '../components/SceneShell';
import { COLORS } from '../config';
import { map, t } from '../utils/animation';

export const Scene6Lockup: React.FC<{ frame: number }> = ({ frame }) => {
  const resolve = t(frame, 0, 46);
  return (
    <SceneShell vignette={0.76}>
      <DepthDust frame={frame + 690} intensity={0.35 * (1 - resolve)} />
      <LightSweep x={map(frame, [0, 60], [260, 880])} opacity={0.1 * (1 - resolve) + 0.05} />
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.34 * (1 - resolve) }} width="1920" height="1080" viewBox="0 0 1920 1080">
        <path d="M280 560 C650 250 1180 250 1640 540" fill="none" stroke={COLORS.blue} strokeWidth="2" strokeDasharray="8 24" strokeDashoffset={-frame * 10} />
        <path d="M400 720 C780 410 1150 710 1510 330" fill="none" stroke={COLORS.violet} strokeWidth="2" strokeDasharray="5 22" strokeDashoffset={frame * 8} />
      </svg>
      <BrandLockup frame={frame} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 7,
          background: `linear-gradient(90deg, transparent, ${COLORS.blue}, ${COLORS.violet}, transparent)`,
          opacity: t(frame, 40, 58) * 0.52,
        }}
      />
    </SceneShell>
  );
};
