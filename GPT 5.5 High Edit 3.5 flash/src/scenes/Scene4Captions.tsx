import React from 'react';
import { AppWindow } from '../components/AppWindow';
import { Cursor } from '../components/Cursor';
import { DynamicCaption, InterfaceNote } from '../components/DynamicCaption';
import { DepthDust, LightSweep, SceneShell } from '../components/SceneShell';
import { COLORS } from '../config';
import { map, t } from '../utils/animation';

export const Scene4Captions: React.FC<{ frame: number }> = ({ frame }) => {
  const camera = t(frame, 0, 170);
  const ideaAttach = t(frame, 28, 70);
  const shipPulse = t(frame, 126, 152);
  const cursorPath = [
    { frame: 0, x: 1540, y: 740 },
    { frame: 34, x: 1182, y: 564 },
    { frame: 62, x: 1164, y: 512 },
    { frame: 94, x: 774, y: 702 },
    { frame: 131, x: 1360, y: 760 },
    { frame: 158, x: 1510, y: 642 },
  ];
  return (
    <SceneShell vignette={0.63}>
      <DepthDust frame={frame + 390} intensity={0.55} />
      <LightSweep x={map(frame, [0, 180], [1120, 420])} opacity={0.11 + shipPulse * 0.14} rotate={13} />
      <div style={{ position: 'absolute', inset: 0, perspective: 1300, transformStyle: 'preserve-3d' }}>
        <div style={{ position: 'absolute', inset: 0, transform: `translate3d(${camera * -42}px, ${camera * -18}px, 0)`, transformStyle: 'preserve-3d' }}>
          <AppWindow frame={frame} variant="review" scale={1.03 + camera * 0.045} rotateX={8 - camera * 2} rotateY={-7 + camera * 5} clickAt={62} />
        </div>
        <DynamicCaption
          frame={frame}
          text="Drop the idea."
          start={2}
          end={76}
          accent={COLORS.blue}
          split
          attachAtEnd
          path={[
            { frame: 2, x: 420, y: 318 },
            { frame: 28, x: 660, y: 258 },
            { frame: 76, x: 1192, y: 435 },
          ]}
        />
        <div
          style={{
            position: 'absolute',
            left: 1070,
            top: 424,
            width: 248,
            height: 58,
            borderRadius: 4, // Sharp corners
            border: `1px solid rgba(99,102,241,${0.2 + ideaAttach * 0.45})`, // Indigo outline
            background: `rgba(99,102,241,${ideaAttach * 0.08})`,
            opacity: ideaAttach,
          }}
        />
        <DynamicCaption
          frame={frame}
          text="Shape it together."
          start={70}
          end={132}
          accent={COLORS.violet}
          split
          path={[
            { frame: 70, x: 1510, y: 268 },
            { frame: 98, x: 980, y: 210 },
            { frame: 132, x: 680, y: 385 },
          ]}
        />
        <InterfaceNote frame={frame} start={92} x={590} y={520} text="Caption becomes a pinned review note" color={COLORS.violet} />
        <DynamicCaption
          frame={frame}
          text="Ship it while it matters."
          start={122}
          end={178}
          accent={COLORS.green}
          split
          path={[
            { frame: 122, x: 760, y: 842 },
            { frame: 144, x: 1060, y: 770 },
            { frame: 178, x: 1328, y: 650 },
          ]}
        />
        <div
          style={{
            position: 'absolute',
            right: 224,
            bottom: 216,
            width: 326,
            height: 66,
            borderRadius: 4, // Sharp corners
            background: `rgba(167, 139, 250, ${shipPulse * 0.12})`, // Lilac wash
            border: `1px solid rgba(167, 139, 250, ${0.22 + shipPulse * 0.55})`,
            opacity: t(frame, 130, 158),
            boxShadow: `0 0 20px rgba(167, 139, 250, ${shipPulse * 0.2})`,
          }}
        />
        <Cursor frame={frame} path={cursorPath} clickFrames={[62, 132]} visibleFrom={0} visibleTo={166} label={frame > 115 ? 'approve' : undefined} />
      </div>
    </SceneShell>
  );
};
