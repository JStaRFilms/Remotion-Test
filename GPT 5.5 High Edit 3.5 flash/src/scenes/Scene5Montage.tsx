import React from 'react';
import { Easing } from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { Cursor } from '../components/Cursor';
import { DepthDust, SceneShell } from '../components/SceneShell';
import { COLORS, TYPO } from '../config';
import { map, t } from '../utils/animation';

const Label: React.FC<{ frame: number; from: number; text: string; x: number; y: number; color: string }> = ({ frame, from, text, x, y, color }) => {
  const p = t(frame, from, from + 10) * (1 - t(frame, from + 28, from + 38));
  return (
    <div 
      style={{ 
        position: 'absolute', 
        left: x, 
        top: y, 
        color: COLORS.text, 
        opacity: p, 
        transform: `translateY(${(1 - p) * 24}px)`, 
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 6,
        padding: '3px 8px',
        borderRadius: 2, // Squared pill
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        alignSelf: 'start',
      }}>
        <div style={{ width: 5, height: 5, borderRadius: 0, background: color }} />
        <span style={{ fontSize: 9, fontFamily: TYPO.mono, fontWeight: 700, textTransform: 'uppercase', color: COLORS.muted }}>
          Module
        </span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, color: COLORS.text, textShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
        {text.toUpperCase()}
      </div>
    </div>
  );
};

const FloatingTile: React.FC<{ frame: number }> = ({ frame }) => {
  const x = map(frame, [0, 120], [-520, 540], Easing.inOut(Easing.cubic));
  const y = map(frame, [0, 28, 56, 86, 120], [-190, -70, 122, -84, 44], Easing.inOut(Easing.quad));
  const r = map(frame, [0, 120], [-10, 8]);
  const scale = map(frame, [0, 32, 72, 120], [0.74, 1.05, 0.88, 0.62]);
  
  return (
    <div 
      style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '50%', 
        width: 280, 
        height: 170, 
        borderRadius: 4, // Squared floating tile
        background: '#090a0e', 
        border: '1px solid rgba(255,255,255,0.06)', 
        boxShadow: '0 24px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)', 
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 180px) rotateY(${r * 2}deg) rotateZ(${r}deg) scale(${scale})`, 
        overflow: 'hidden', 
        zIndex: 10,
        backdropFilter: 'blur(8px)',
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: 0, background: COLORS.cyan }} />
          <span style={{ fontSize: 9, fontFamily: TYPO.mono, fontWeight: 700, textTransform: 'uppercase', color: COLORS.muted }}>
            Timeline v2
          </span>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: 0, background: 'rgba(255,255,255,0.08)' }} />
      </div>
      
      <div style={{ display: 'flex', gap: 6, alignItems: 'end', height: 70, zIndex: 2 }}>
        {[40, 68, 92, 54, 76].map((h, i) => (
          <div 
            key={i} 
            style={{ 
              flex: 1, 
              height: `${h}%`, 
              borderRadius: 0, // Squared bars
              background: i === 2 ? COLORS.violet : 'rgba(255,255,255,0.06)',
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export const Scene5Montage: React.FC<{ frame: number }> = ({ frame }) => {
  const variant = frame < 28 ? 'board' : frame < 56 ? 'review' : frame < 84 ? 'analytics' : frame < 108 ? 'review' : 'complete';
  const flash1 = t(frame, 26, 32) * (1 - t(frame, 32, 38));
  const flash2 = t(frame, 54, 60) * (1 - t(frame, 60, 66));
  const flash3 = t(frame, 82, 88) * (1 - t(frame, 88, 94));
  const flash4 = t(frame, 104, 110) * (1 - t(frame, 110, 116));
  const cutEnergy = Math.max(flash1, flash2, flash3, flash4);
  const cursorPath = [
    { frame: 16, x: 1240, y: 652 },
    { frame: 38, x: 1136, y: 488 },
    { frame: 64, x: 1416, y: 682 },
    { frame: 91, x: 1326, y: 728 },
    { frame: 112, x: 1518, y: 610 },
  ];
  return (
    <SceneShell vignette={0.58}>
      <DepthDust frame={frame + 570} intensity={0.65} />
      <div style={{ position: 'absolute', inset: 0, perspective: 1240, transformStyle: 'preserve-3d' }}>
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${1 + cutEnergy * 0.032}) rotateZ(${cutEnergy * -0.25}deg)`, transformStyle: 'preserve-3d' }}>
          <AppWindow frame={frame} variant={variant} scale={0.92} rotateX={9 - cutEnergy * 6} rotateY={-5 + cutEnergy * 8} compact={variant !== 'complete'} clickAt={frame < 84 ? 38 : 91} />
        </div>
        <FloatingTile frame={frame} />
        <Label frame={frame} from={0} text="Organise" x={168} y={174} color={COLORS.blue} />
        <Label frame={frame} from={28} text="Review" x={1348} y={186} color={COLORS.violet} />
        <Label frame={frame} from={56} text="Measure" x={182} y={764} color={COLORS.cyan} />
        <Label frame={frame} from={84} text="Approve" x={1330} y={760} color={COLORS.green} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(255,255,255,${cutEnergy * 0.05})`, mixBlendMode: 'screen' }} />
        <div
          style={{
            position: 'absolute',
            left: 142,
            bottom: 82,
            fontFamily: TYPO.mono,
            color: COLORS.muted,
            fontSize: 14,
            letterSpacing: 1.4,
            opacity: 0.75,
          }}
        >
          04 MATCHED CUTS / ONE WORKFLOW
        </div>
        <Cursor frame={frame} path={cursorPath} clickFrames={[38, 91]} visibleFrom={14} visibleTo={112} />
      </div>
    </SceneShell>
  );
};
