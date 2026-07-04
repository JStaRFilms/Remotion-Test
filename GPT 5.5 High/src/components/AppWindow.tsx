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

const cardShadow = '0 34px 120px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.14) inset';

const StatusPill: React.FC<{ label: string; color: string; active?: boolean }> = ({ label, color, active }) => (
  <div
    style={{
      padding: '7px 12px',
      borderRadius: 999,
      border: `1px solid ${active ? color : 'rgba(255,255,255,0.1)'}`,
      background: active ? `${color}22` : 'rgba(255,255,255,0.045)',
      color: active ? '#fff' : COLORS.softText,
      fontSize: 15,
      letterSpacing: 0.2,
      boxShadow: active ? `0 0 26px ${color}33` : undefined,
    }}
  >
    {label}
  </div>
);

const ProjectRows: React.FC<{ frame: number; selected?: number }> = ({ frame, selected = 0 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
    {projects.map((project, i) => {
      const rowIn = t(frame, 8 + i * 4, 28 + i * 4);
      const selectedGlow = selected === i ? t(frame, 68, 86) : 0;
      return (
        <div
          key={project.name}
          style={{
            height: 76,
            borderRadius: 24,
            border: `1px solid ${selected === i ? `${project.color}66` : COLORS.stroke}`,
            background: selected === i ? `linear-gradient(120deg, ${project.color}18, rgba(255,255,255,0.055))` : 'rgba(255,255,255,0.045)',
            padding: '15px 16px',
            opacity: rowIn,
            transform: `translateX(${(1 - rowIn) * -26}px) scale(${1 + selectedGlow * 0.025})`,
            boxShadow: selected === i ? `0 0 ${22 + selectedGlow * 32}px ${project.color}22` : undefined,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 10, height: 10, borderRadius: 99, background: project.color, boxShadow: `0 0 18px ${project.color}` }} />
              <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 650 }}>{project.name}</div>
            </div>
            <div style={{ color: COLORS.muted, fontSize: 14 }}>{project.status}</div>
          </div>
          <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${map(frame, [10 + i * 6, 58 + i * 6], [8, project.progress])}%`,
                borderRadius: 99,
                background: `linear-gradient(90deg, ${project.color}, ${COLORS.cyan})`,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          height: 262,
          borderRadius: 30,
          border: '1px solid rgba(255,255,255,0.11)',
          background:
            'radial-gradient(circle at 28% 24%, rgba(56,183,255,0.34), transparent 25%), radial-gradient(circle at 70% 68%, rgba(140,108,255,0.34), transparent 30%), linear-gradient(135deg, #171C29, #07080C)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: pulse > 0 ? `0 0 ${80 * pulse}px rgba(56,183,255,${0.18 * pulse})` : undefined,
        }}
      >
        <div style={{ position: 'absolute', left: 34, top: 30, color: '#fff', fontSize: 18, letterSpacing: 2.4, textTransform: 'uppercase', opacity: 0.82 }}>
          Hero cut v07
        </div>
        <div style={{ position: 'absolute', right: 34, top: 30, padding: '8px 12px', borderRadius: 999, background: 'rgba(0,0,0,0.34)', border: '1px solid rgba(255,255,255,0.11)', fontSize: 13 }}>
          00:18 / 00:30
        </div>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 94 + i * 120,
              top: 98 + i * 22,
              width: 230 - i * 36,
              height: 132 - i * 16,
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.12)',
              background: `rgba(255,255,255,${0.05 + i * 0.025})`,
              transform: `translateZ(${i * 28}px) rotate(${i * -2}deg)`,
              opacity: 0.82,
            }}
          />
        ))}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 74, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.44))' }} />
      </div>
      <div style={{ height: 76, borderRadius: 24, border: '1px solid rgba(255,255,255,0.11)', background: 'rgba(255,255,255,0.045)', padding: 17, position: 'relative' }}>
        <div style={{ display: 'flex', gap: 8, height: 28 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: i % 4 === 0 ? 1.35 : 1,
                borderRadius: 8,
                background: i % 3 === 0 ? 'rgba(56,183,255,0.33)' : i % 3 === 1 ? 'rgba(140,108,255,0.25)' : 'rgba(255,255,255,0.13)',
              }}
            />
          ))}
        </div>
        <div style={{ position: 'absolute', left: `${playhead}%`, top: 12, bottom: 10, width: 2, background: '#fff', boxShadow: '0 0 16px rgba(133,244,255,0.8)' }} />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <StatusPill label="Open" color={COLORS.blue} active />
          <StatusPill label="2 notes" color={COLORS.violet} />
        </div>
        {['Tighten the cold open', 'Color pass approved', 'Export for launch'].map((text, i) => {
          const active = (i === 1 && pulse > 0) || (i === 2 && second > 0);
          return (
            <div
              key={text}
              style={{
                borderRadius: 22,
                padding: '17px 18px',
                border: `1px solid ${active ? COLORS.blue : 'rgba(255,255,255,0.1)'}`,
                background: active ? 'rgba(56,183,255,0.13)' : 'rgba(255,255,255,0.045)',
                transform: `translateX(${active ? -6 : 0}px) scale(${active ? 1.02 : 1})`,
                boxShadow: active ? '0 0 34px rgba(56,183,255,0.2)' : undefined,
              }}
            >
              <div style={{ color: COLORS.text, fontSize: 18, fontWeight: 620 }}>{text}</div>
              <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 7 }}>{i === 2 && second > 0 ? 'ready to ship' : `${i + 1} collaborator${i === 0 ? '' : 's'}`}</div>
            </div>
          );
        })}
        <div style={{ marginTop: 'auto', height: 48, borderRadius: 18, background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.cyan})`, opacity: 0.16 + second * 0.84 }} />
      </div>
    </div>
  );
};

const AnalyticsPanel: React.FC<{ frame: number }> = ({ frame }) => {
  const bars = [64, 82, 46, 92, 72, 98];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <div style={{ borderRadius: 28, padding: 24, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.11)' }}>
        <div style={{ fontSize: 18, color: COLORS.muted, marginBottom: 28 }}>Progress velocity</div>
        <div style={{ display: 'flex', alignItems: 'end', gap: 13, height: 225 }}>
          {bars.map((b, i) => (
            <div key={i} style={{ flex: 1, height: `${map(frame, [i * 5, 44 + i * 4], [4, b])}%`, borderRadius: '14px 14px 6px 6px', background: i === 5 ? `linear-gradient(${COLORS.cyan}, ${COLORS.blue})` : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {['On time', 'Approved', 'In delivery'].map((label, i) => (
          <div key={label} style={{ flex: 1, borderRadius: 28, padding: 24, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.11)' }}>
            <div style={{ fontSize: 48, fontWeight: 760 }}>{Math.round(map(frame, [i * 8, 54 + i * 7], [0, [94, 31, 12][i]]))}{i === 2 ? '' : '%'}</div>
            <div style={{ color: COLORS.muted, fontSize: 17, marginTop: 8 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CompletePanel: React.FC<{ frame: number }> = ({ frame }) => {
  const done = t(frame, 8, 42);
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: 430, borderRadius: 34, border: `1px solid rgba(116,240,186,${0.22 + done * 0.42})`, background: `radial-gradient(circle, rgba(116,240,186,${0.18 * done}), rgba(255,255,255,0.045))` }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 120, height: 120, borderRadius: 999, margin: '0 auto 28px', border: `2px solid ${COLORS.green}`, display: 'grid', placeItems: 'center', boxShadow: `0 0 ${48 + done * 44}px rgba(116,240,186,0.28)`, transform: `scale(${0.86 + done * 0.14})` }}>
          <svg viewBox="0 0 100 100" width="76" height="76">
            <path d="M26 52 L43 68 L76 31" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 - done }} />
          </svg>
        </div>
        <div style={{ fontSize: 48, fontWeight: 760, letterSpacing: -1.2 }}>Launch package delivered</div>
        <div style={{ marginTop: 16, color: COLORS.softText, fontSize: 20 }}>12 assets • approvals complete • team synced</div>
      </div>
    </div>
  );
};

export const AppWindow: React.FC<AppWindowProps> = ({ frame, variant = 'board', scale = 1, rotateX = 0, rotateY = 0, rotateZ = 0, x = 0, y = 0, opacity = 1, clickAt, compact = false }) => {
  const title = variant === 'board' ? 'Orbit / Projects' : variant === 'review' ? 'Orbit / Review' : variant === 'analytics' ? 'Orbit / Progress' : 'Orbit / Complete';
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
        borderRadius: 42,
        background: 'linear-gradient(145deg, rgba(27,32,47,0.94), rgba(9,11,18,0.96))',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: cardShadow,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(255,255,255,0.11), transparent 22%, transparent 65%, rgba(56,183,255,0.055))', pointerEvents: 'none' }} />
      <div style={{ height: 74, borderBottom: COLORS.stroke, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px 0 30px', transform: 'translateZ(28px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {[COLORS.danger, COLORS.amber, COLORS.green].map((c) => <div key={c} style={{ width: 13, height: 13, borderRadius: 99, background: c, opacity: 0.82 }} />)}
          </div>
          <div style={{ color: COLORS.softText, fontSize: 18, letterSpacing: 0.2 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <StatusPill label="Creative" color={COLORS.violet} active={variant !== 'board'} />
          <StatusPill label="Live" color={COLORS.green} active={variant === 'complete'} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '190px 1fr' : '240px 1fr', height: 'calc(100% - 74px)', transformStyle: 'preserve-3d' }}>
        <aside style={{ padding: 24, borderRight: COLORS.stroke, background: 'rgba(0,0,0,0.16)', transform: 'translateZ(18px)' }}>
          <div style={{ width: 54, height: 54, borderRadius: 18, background: `conic-gradient(from ${frame * 1.2}deg, ${COLORS.blue}, ${COLORS.violet}, ${COLORS.cyan}, ${COLORS.blue})`, marginBottom: 30, boxShadow: '0 0 28px rgba(56,183,255,0.34)' }} />
          {['Projects', 'Media', 'Notes', 'Progress'].map((item, i) => {
            const active = (variant === 'board' && i === 0) || (variant === 'review' && i === 1) || (variant === 'analytics' && i === 3) || (variant === 'complete' && i === 3);
            return (
              <div key={item} style={{ height: 46, borderRadius: 16, padding: '0 14px', display: 'flex', alignItems: 'center', marginBottom: 8, background: active ? 'rgba(255,255,255,0.09)' : 'transparent', color: active ? COLORS.text : COLORS.muted, fontSize: 17, fontWeight: active ? 650 : 520 }}>
                {item}
              </div>
            );
          })}
        </aside>
        <main style={{ padding: compact ? 24 : 30, transform: 'translateZ(42px)', fontFamily: TYPO.font }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 23 }}>
            <div>
              <div style={{ color: COLORS.muted, fontSize: 15, letterSpacing: 1.6, textTransform: 'uppercase' }}>Everything in flow</div>
              <div style={{ color: COLORS.text, fontSize: compact ? 34 : 42, fontWeight: 760, letterSpacing: -1.4, marginTop: 5 }}>
                {variant === 'board' ? 'Launch command center' : variant === 'review' ? 'Review without waiting' : variant === 'analytics' ? 'Momentum you can see' : 'Ready for release'}
              </div>
            </div>
            <div style={{ width: 218, height: 42, borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)', display: 'flex', alignItems: 'center', padding: '0 15px', color: COLORS.muted, fontSize: 15 }}>
              Search team workspace
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
