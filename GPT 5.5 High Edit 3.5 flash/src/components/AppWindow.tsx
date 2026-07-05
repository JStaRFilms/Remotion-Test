import React from 'react';
import { COLORS, projects, TYPO } from '../config';
import { map, t } from '../utils/animation';

type Variant = 'board' | 'review' | 'analytics' | 'complete';

type AppWindowProps = {
  frame: number;
  variant?: Variant;
  scale?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  x?: number;
  y?: number;
  opacity?: number;
  clickAt?: number;
  compact?: boolean;
};

// Razor-sharp flat shadow representing solid industrial layering
const cardShadow = '0 30px 90px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05) inset, 0 0 0 1px rgba(0,0,0,0.5)';

const StatusPill: React.FC<{ label: string; color: string; active?: boolean }> = ({ label, color, active }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 4, // Sharp corners
      border: `1px solid ${active ? `${color}44` : 'rgba(255,255,255,0.05)'}`,
      background: active ? `${color}12` : 'rgba(255,255,255,0.015)',
      color: active ? color : 'rgba(255,255,255,0.4)',
      fontSize: 11,
      fontFamily: TYPO.mono,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    }}
  >
    <span style={{ 
      width: 5, 
      height: 5, 
      borderRadius: 0, // Squared technical status dot
      backgroundColor: color, 
    }} />
    {label}
  </div>
);

const ProjectRows: React.FC<{ frame: number; selected?: number }> = ({ frame, selected = 0 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    {projects.map((project, i) => {
      const rowIn = t(frame, 8 + i * 4, 28 + i * 4);
      const selectedGlow = selected === i ? t(frame, 68, 86) : 0;
      const isSelected = selected === i;
      
      return (
        <div
          key={project.name}
          style={{
            height: 74,
            borderRadius: 6, // Sharp technical corner
            border: `1px solid ${isSelected ? `${project.color}55` : 'rgba(255,255,255,0.04)'}`,
            background: isSelected 
              ? `linear-gradient(135deg, rgba(255,255,255,0.03), ${project.color}08)` 
              : 'rgba(255,255,255,0.01)',
            padding: '14px 18px',
            opacity: rowIn,
            transform: `translateX(${(1 - rowIn) * -26}px) scale(${1 + selectedGlow * 0.02})`,
            boxShadow: isSelected 
              ? `0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)` 
              : '0 2px 10px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ 
                width: 6, 
                height: 6, 
                borderRadius: 0, // Squared dot
                background: project.color, 
              }} />
              <div style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{project.name}</div>
            </div>
            <div style={{ 
              color: isSelected ? project.color : COLORS.muted, 
              fontSize: 11, 
              fontFamily: TYPO.mono,
              fontWeight: 600, 
              textTransform: 'uppercase', 
            }}>{project.status}</div>
          </div>
          
          <div style={{ height: 3, borderRadius: 0, background: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${map(frame, [10 + i * 6, 58 + i * 6], [8, project.progress])}%`,
                borderRadius: 0,
                background: project.color, // Solid technical colors
              }}
            />
          </div>
        </div>
      );
    })}
  </div>
);

const MediaTimeline: React.FC<{ frame: number; pulse?: number }> = ({ frame, pulse = 0 }) => {
  const playhead = map(frame, [0, 110], [11, 88]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Viewport Screen */}
      <div
        style={{
          height: 262,
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.05)',
          background: '#090a0d',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02)',
        }}
      >
        {/* Technical layout crosshair grid */}
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.01)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, borderLeft: '1px dashed rgba(255,255,255,0.02)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, borderTop: '1px dashed rgba(255,255,255,0.02)', pointerEvents: 'none' }} />
        
        {/* Header bar of the video player */}
        <div style={{ position: 'absolute', left: 20, top: 18, display: 'flex', alignItems: 'center', gap: 8, zIndex: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: 0, background: COLORS.danger }} />
          <span style={{ color: COLORS.text, fontSize: 11, fontFamily: TYPO.mono, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Hero_cut_v07.mov
          </span>
        </div>
        
        <div style={{ position: 'absolute', right: 20, top: 16, padding: '4px 8px', borderRadius: 2, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.04)', fontSize: 10, fontFamily: TYPO.mono, color: COLORS.cyan, fontWeight: 600, zIndex: 5 }}>
          00:18 / 00:30
        </div>

        {/* Floating layered frames representing 3D layers in space */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 100 + i * 110,
              top: 90 + i * 18,
              width: 220 - i * 30,
              height: 120 - i * 14,
              borderRadius: 4,
              border: `1px solid rgba(255,255,255,${0.04 + i * 0.03})`,
              background: `rgba(255,255,255,${0.01 + i * 0.01})`,
              transform: `translateZ(${i * 20}px) rotate(${i * -1.5}deg)`,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
              opacity: 0.85,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '85%', height: '65%', borderRadius: 2, background: `rgba(99, 102, 241, ${0.05 + i * 0.05})`, border: '1px solid rgba(255,255,255,0.03)' }} />
          </div>
        ))}
        
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.4))', pointerEvents: 'none' }} />
      </div>
      
      {/* Timeline tracks (Brutalist style) */}
      <div style={{ height: 64, borderRadius: 6, border: '1px solid rgba(255,255,255,0.04)', background: '#0b0c10', padding: '12px 16px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 4, height: 18 }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const isWave = i % 3 === 0;
            const isPurple = i % 3 === 1;
            const trackColor = isWave 
              ? `rgba(99, 102, 241, 0.4)` 
              : isPurple 
                ? `rgba(139, 92, 246, 0.3)` 
                : 'rgba(255, 255, 255, 0.06)';
            return (
              <div
                key={i}
                style={{
                  flex: i % 4 === 0 ? 1.4 : 1,
                  borderRadius: 2,
                  background: trackColor,
                  border: `1px solid rgba(255,255,255,0.03)`,
                }}
              />
            );
          })}
        </div>
        
        {/* Playhead marker */}
        <div style={{ position: 'absolute', left: `${playhead}%`, top: 6, bottom: 6, width: 1, background: '#fff', boxShadow: `0 0 10px ${COLORS.cyan}` }}>
          {/* Square Technical Playhead handle */}
          <div style={{ position: 'absolute', top: -4, left: -3, width: 7, height: 7, background: '#fff', border: `1px solid ${COLORS.cyan}` }} />
        </div>
      </div>
    </div>
  );
};

const ReviewPanel: React.FC<{ frame: number; clickAt?: number }> = ({ frame, clickAt = 64 }) => {
  const pulse = t(frame, clickAt, clickAt + 18);
  const second = t(frame, 126, 142);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.85fr', gap: 18 }}>
      <MediaTimeline frame={frame} pulse={pulse} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 2 }}>
          <StatusPill label="Open" color={COLORS.blue} active />
          <StatusPill label="2 notes" color={COLORS.violet} />
        </div>
        {['Tighten the cold open', 'Color pass approved', 'Export for launch'].map((text, i) => {
          const active = (i === 1 && pulse > 0) || (i === 2 && second > 0);
          const cardColor = i === 1 ? COLORS.blue : i === 2 ? COLORS.cyan : COLORS.violet;
          
          return (
            <div
              key={text}
              style={{
                borderRadius: 6, // Sharp Technical
                padding: '12px 16px',
                border: `1px solid ${active ? `${cardColor}44` : 'rgba(255,255,255,0.04)'}`,
                background: active 
                  ? `rgba(99, 102, 241, 0.06)` 
                  : 'rgba(255,255,255,0.01)',
                transform: `translateX(${active ? -6 : 0}px) scale(${active ? 1.02 : 1})`,
                boxShadow: active 
                  ? `0 8px 24px rgba(0,0,0,0.4)` 
                  : 'none',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: active ? cardColor : 'transparent' }} />
              
              <div>
                <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 700 }}>{text}</div>
                <div style={{ color: COLORS.muted, fontSize: 11, fontFamily: TYPO.mono, marginTop: 4, fontWeight: 500 }}>
                  {i === 2 && second > 0 ? 'ready to ship' : `${i + 1} task collaborator${i === 0 ? '' : 's'}`}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {Array.from({ length: Math.min(3, i + 1) }).map((_, av) => {
                  const colors = [COLORS.blue, COLORS.violet, COLORS.cyan];
                  return (
                    <div
                      key={av}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 3, // Sharp square collaborator avatar
                        background: colors[(i + av) % 3],
                        border: '1px solid #111520',
                        marginLeft: av > 0 ? -6 : 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 9,
                        fontFamily: TYPO.mono,
                        fontWeight: 'bold',
                        color: '#000',
                      }}
                    >
                      {String.fromCharCode(65 + i + av)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        
        <div 
          style={{ 
            marginTop: 'auto', 
            height: 44, 
            borderRadius: 4, 
            background: COLORS.violet, // Technical solid brand button
            opacity: 0.16 + second * 0.84,
            boxShadow: second > 0 ? `0 8px 24px rgba(139, 92, 246, 0.2)` : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontFamily: TYPO.mono,
          }}
        >
          {second > 0 ? 'Approve & Deliver' : 'Awaiting Approval'}
        </div>
      </div>
    </div>
  );
};

const AnalyticsPanel: React.FC<{ frame: number }> = ({ frame }) => {
  const bars = [64, 82, 46, 92, 72, 98];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 18 }}>
      <div style={{ 
        borderRadius: 8, 
        padding: '20px 24px', 
        background: 'rgba(255,255,255,0.01)', 
        border: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 28, fontFamily: TYPO.mono }}>
          Progress Velocity
        </div>
        
        <div style={{ position: 'absolute', left: 24, right: 24, top: 60, bottom: 50, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none', opacity: 0.04 }}>
          {[0, 1, 2, 3].map((g) => (
            <div key={g} style={{ borderBottom: '1px dashed #fff', width: '100%' }} />
          ))}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'end', gap: 14, height: 200, position: 'relative', zIndex: 2 }}>
          {bars.map((b, i) => {
            const isActive = i === 5;
            const barHeight = map(frame, [i * 5, 44 + i * 4], [4, b]);
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div 
                  style={{ 
                    width: '100%', 
                    height: `${barHeight}%`, 
                    borderRadius: '2px 2px 0 0', 
                    background: isActive ? COLORS.violet : 'rgba(255,255,255,0.06)',
                    border: isActive ? `1px solid ${COLORS.cyan}` : 'none',
                  }} 
                />
                <span style={{ fontSize: 9, fontFamily: TYPO.mono, color: isActive ? COLORS.cyan : COLORS.muted, fontWeight: 'bold' }}>
                  W{i+1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {['On time', 'Approved', 'In delivery'].map((label, i) => {
          const colors = [COLORS.cyan, COLORS.violet, COLORS.green];
          const val = Math.round(map(frame, [i * 8, 54 + i * 7], [0, [94, 31, 12][i]]));
          return (
            <div 
              key={label} 
              style={{ 
                flex: 1, 
                borderRadius: 8, 
                padding: '14px 18px', 
                background: 'rgba(255,255,255,0.01)', 
                border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: TYPO.mono }}>
                  {label}
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, fontFamily: TYPO.mono, marginTop: 4, color: COLORS.text }}>
                  {val}{i === 2 ? '' : '%'}
                </div>
              </div>
              
              {/* Technical square node */}
              <div style={{ width: 14, height: 14, border: `1.5px solid ${colors[i]}`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 4, height: 4, background: colors[i] }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CompletePanel: React.FC<{ frame: number }> = ({ frame }) => {
  const done = t(frame, 8, 42);
  return (
    <div style={{ 
      display: 'grid', 
      placeItems: 'center', 
      height: 400, 
      borderRadius: 8, 
      border: `1px solid rgba(139,92,246,${0.08 + done * 0.2})`, 
      background: 'rgba(255,255,255,0.005)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background technical squared lines */}
      <div style={{ position: 'absolute', width: 260, height: 260, border: `1px dashed rgba(255,255,255,${0.02 * done})`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 180, height: 180, border: `1px solid rgba(255,255,255,${0.03 * done})`, pointerEvents: 'none', transform: `scale(${0.9 + done * 0.1})` }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Square Checked Technical Badge */}
        <div style={{ 
          width: 80, 
          height: 80, 
          borderRadius: 4, // Square Checked Badge
          margin: '0 auto 24px', 
          border: `2px solid ${COLORS.violet}`, 
          display: 'grid', 
          placeItems: 'center', 
          background: 'rgba(0,0,0,0.4)',
          transform: `scale(${0.86 + done * 0.14})` 
        }}>
          <svg viewBox="0 0 100 100" width="38" height="38">
            <path 
              d="M28 52 L44 68 L74 34" 
              fill="none" 
              stroke={COLORS.violet} 
              strokeWidth="10" 
              strokeLinecap="square" 
              strokeLinejoin="miter" 
              pathLength="1" 
              style={{ strokeDasharray: 1, strokeDashoffset: 1 - done }} 
            />
          </svg>
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, color: COLORS.text }}>Launch Package Delivered</div>
        <div style={{ marginTop: 12, color: COLORS.softText, fontSize: 14, fontFamily: TYPO.mono, opacity: 0.7 }}>
          12 assets &bull; approvals complete &bull; team synced
        </div>
      </div>
    </div>
  );
};

export const AppWindow: React.FC<AppWindowProps> = ({ frame, variant = 'board', scale = 1, rotateX = 0, rotateY = 0, rotateZ = 0, x = 0, y = 0, opacity = 1, clickAt, compact = false }) => {
  const title = variant === 'board' ? 'Orbit // Projects' : variant === 'review' ? 'Orbit // Review' : variant === 'analytics' ? 'Orbit // Progress' : 'Orbit // Complete';
  const selected = variant === 'board' ? (frame > 75 ? 1 : 0) : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: compact ? 920 : 1180,
        height: compact ? 570 : 690,
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transformStyle: 'preserve-3d',
        opacity,
        borderRadius: 8, // Technical sharp window
        background: '#090a0d', // Flat matte obsidian
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: cardShadow,
        overflow: 'hidden',
      }}
    >
      {/* Title Bar */}
      <div style={{ height: 64, borderBottom: `1px solid rgba(255,255,255,0.06)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', transform: 'translateZ(28px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[COLORS.danger, COLORS.amber, COLORS.green].map((c) => <div key={c} style={{ width: 8, height: 8, borderRadius: 0, background: c }} />)}
          </div>
          <div style={{ color: COLORS.softText, fontSize: 13, fontFamily: TYPO.mono, fontWeight: 600 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <StatusPill label="Creative" color={COLORS.violet} active={variant !== 'board'} />
          <StatusPill label="Live" color={COLORS.cyan} active={variant === 'complete'} />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '180px 1fr' : '220px 1fr', height: 'calc(100% - 64px)', transformStyle: 'preserve-3d' }}>
        {/* Sidebar */}
        <aside style={{ padding: 20, borderRight: `1px solid rgba(255,255,255,0.06)`, background: 'rgba(0,0,0,0.1)', transform: 'translateZ(18px)' }}>
          {/* Logo container */}
          <div style={{ 
            width: 44, 
            height: 44, 
            borderRadius: 4, // Squared logo badge
            background: `conic-gradient(from ${frame * 1.2}deg, ${COLORS.blue}, ${COLORS.violet}, ${COLORS.cyan}, ${COLORS.blue})`, 
            marginBottom: 24, 
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: 0, background: '#fff' }} />
          </div>
          
          {['Projects', 'Media', 'Notes', 'Progress'].map((item, i) => {
            const active = (variant === 'board' && i === 0) || (variant === 'review' && i === 1) || (variant === 'analytics' && i === 3) || (variant === 'complete' && i === 3);
            const activeColor = variant === 'board' ? COLORS.blue : variant === 'review' ? COLORS.violet : COLORS.cyan;
            return (
              <div 
                key={item} 
                style={{ 
                  height: 38, 
                  borderRadius: 4, // Squared options
                  padding: '0 12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 8,
                  marginBottom: 6, 
                  background: active ? 'rgba(255,255,255,0.03)' : 'transparent', 
                  borderLeft: active ? `2px solid ${activeColor}` : '2px solid transparent',
                  color: active ? COLORS.text : COLORS.muted, 
                  fontSize: 13, 
                  fontWeight: active ? 700 : 500,
                  fontFamily: TYPO.font,
                }}
              >
                {item}
              </div>
            );
          })}
        </aside>
        
        {/* Main Content Area */}
        <main style={{ padding: compact ? 24 : 30, transform: 'translateZ(42px)', fontFamily: TYPO.font }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ color: COLORS.muted, fontSize: 10, fontFamily: TYPO.mono, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>System Status // Active</div>
              <div style={{ color: COLORS.text, fontSize: compact ? 26 : 32, fontWeight: 800, letterSpacing: -1, marginTop: 4 }}>
                {variant === 'board' ? 'Launch Command Center' : variant === 'review' ? 'Review without waiting' : variant === 'analytics' ? 'Momentum you can see' : 'Ready for release'}
              </div>
            </div>
            <div style={{ 
              width: 218, 
              height: 34, 
              borderRadius: 4, // Squared search bar
              background: 'rgba(0,0,0,0.3)', 
              border: '1px solid rgba(255,255,255,0.04)', 
              display: 'flex', 
              alignItems: 'center', 
              padding: '0 12px', 
              color: 'rgba(255,255,255,0.25)', 
              fontSize: 12,
              fontFamily: TYPO.mono,
            }}>
              Search workspace...
            </div>
          </div>
          {variant === 'board' && <ProjectRows frame={frame} selected={selected} />}
          {variant === 'review' && <ReviewPanel frame={frame} clickAt={clickAt} />}
          {variant === 'analytics' && <AnalyticsPanel frame={frame} />}
          {variant === 'complete' && <CompletePanel frame={frame} />}
        </main>
      </div>
    </div>
  );
};
