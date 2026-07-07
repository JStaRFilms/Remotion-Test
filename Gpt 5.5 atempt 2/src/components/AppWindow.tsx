import React from 'react';
import {COLORS, DATA, TYPO} from '../config';
import {clamp, ease, i, norm} from '../utils';

type AppWindowProps = {
  frame: number;
  mode?: 'hero' | 'review' | 'montage' | 'compact';
  clickPulse?: number;
  shipPulse?: number;
  transform?: string;
  opacity?: number;
  scale?: number;
};

const Panel: React.FC<React.PropsWithChildren<{style?: React.CSSProperties; className?: string}>> = ({children, style}) => (
  <div
    style={{
      background: `linear-gradient(180deg, ${COLORS.panel2}, ${COLORS.panel})`,
      border: `1px solid ${COLORS.line}`,
      boxShadow: '0 18px 48px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.06)',
      borderRadius: 22,
      ...style,
    }}
  >
    {children}
  </div>
);

const MiniAvatar: React.FC<{label: string; index: number}> = ({label, index}) => (
  <div
    style={{
      width: 34,
      height: 34,
      borderRadius: 999,
      display: 'grid',
      placeItems: 'center',
      marginLeft: index ? -9 : 0,
      color: COLORS.white,
      font: `700 12px ${TYPO.font}`,
      background: index % 2 ? `linear-gradient(135deg, ${COLORS.violet}, #4036ff)` : `linear-gradient(135deg, ${COLORS.blue}, #1d698d)`,
      border: '2px solid #111521',
    }}
  >
    {label}
  </div>
);

export const AppWindow: React.FC<AppWindowProps> = ({
  frame,
  mode = 'hero',
  clickPulse = 0,
  shipPulse = 0,
  transform = '',
  opacity = 1,
  scale = 1,
}) => {
  const click = clamp(clickPulse);
  const ship = clamp(shipPulse);
  const reviewActive = click > 0 || mode === 'review';
  const progress = mode === 'montage' ? i(frame, [570, 690], [0.28, 1]) : i(frame, [150, 225], [0.44, 0.72]);
  const glow = reviewActive ? 0.22 + click * 0.35 : 0.1;

  return (
    <div
      style={{
        width: 1180,
        height: 704,
        borderRadius: 34,
        position: 'relative',
        overflow: 'hidden',
        opacity,
        transform: `${transform} scale(${scale})`,
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(140deg, rgba(24,29,44,0.98), rgba(10,12,19,0.98) 45%, rgba(16,18,29,0.98))',
        border: `1px solid rgba(255,255,255,${0.14 + glow})`,
        boxShadow: `0 44px 120px rgba(0,0,0,0.64), 0 0 ${70 + click * 80}px rgba(79,195,255,${glow}), inset 0 1px 0 rgba(255,255,255,0.08)`,
        fontFamily: TYPO.font,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 78% 12%, rgba(139,92,255,0.2), transparent 34%), radial-gradient(circle at 38% 95%, rgba(79,195,255,0.16), transparent 30%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{height: 56, borderBottom: `1px solid ${COLORS.line}`, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12}}>
        {[COLORS.red, COLORS.amber, COLORS.green].map((c) => <span key={c} style={{width: 12, height: 12, borderRadius: 12, background: c, opacity: 0.78}} />)}
        <div style={{marginLeft: 18, color: COLORS.white, fontWeight: 760, letterSpacing: -0.6, fontSize: 17}}>Orbit</div>
        <div style={{height: 28, width: 1, background: COLORS.line, marginLeft: 10}} />
        <div style={{color: COLORS.muted, fontSize: 13}}>Creative operations</div>
        <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
          {DATA.people.map((p, index) => <MiniAvatar key={p} label={p} index={index} />)}
        </div>
      </div>

      <div style={{position: 'absolute', top: 56, bottom: 0, left: 0, width: 248, borderRight: `1px solid ${COLORS.line}`, padding: 24}}>
        <div style={{color: COLORS.dim, fontSize: 11, letterSpacing: 2.2, fontWeight: 800, marginBottom: 20}}>PROJECTS</div>
        {DATA.projects.map((p, idx) => {
          const selected = idx === 0;
          return (
            <div key={p} style={{display: 'flex', alignItems: 'center', gap: 12, height: 48, padding: '0 14px', marginBottom: 8, borderRadius: 15, color: selected ? COLORS.white : COLORS.muted, background: selected ? 'rgba(255,255,255,0.075)' : 'transparent'}}>
              <span style={{width: 10, height: 10, borderRadius: 10, background: selected ? COLORS.blue : COLORS.dim, boxShadow: selected ? `0 0 20px ${COLORS.blue}` : 'none'}} />
              <span style={{fontSize: 14, fontWeight: selected ? 760 : 550}}>{p}</span>
            </div>
          );
        })}
        <Panel style={{position: 'absolute', left: 24, right: 24, bottom: 24, height: 142, padding: 16}}>
          <div style={{color: COLORS.white, fontWeight: 750, fontSize: 14}}>Launch health</div>
          <div style={{marginTop: 18, height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.09)', overflow: 'hidden'}}>
            <div style={{width: `${progress * 100}%`, height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${COLORS.violet}, ${COLORS.blue}, ${COLORS.green})`}} />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 18, color: COLORS.muted, fontSize: 12}}><span>{Math.round(progress * 100)}%</span><span>on track</span></div>
        </Panel>
      </div>

      <div style={{position: 'absolute', left: 272, top: 82, width: 565, height: 370}}>
        <Panel style={{height: '100%', padding: 18, transform: `translateZ(${mode === 'hero' ? 42 : 28}px)`}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}}>
            <div>
              <div style={{fontSize: 12, color: COLORS.dim, letterSpacing: 1.8, fontWeight: 800}}>MEDIA REVIEW</div>
              <div style={{fontSize: 24, color: COLORS.white, fontWeight: 780, letterSpacing: -0.8}}>Hero cut · v08</div>
            </div>
            <div style={{padding: '9px 13px', borderRadius: 999, color: reviewActive ? COLORS.green : COLORS.blue, background: reviewActive ? 'rgba(100,246,189,0.12)' : 'rgba(79,195,255,0.12)', fontSize: 12, fontWeight: 800}}>{reviewActive ? 'LIVE REVIEW' : 'READY'}</div>
          </div>
          <div style={{position: 'relative', height: 236, borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(135deg, #181c2b, #080a10 60%, #152536)', border: `1px solid ${COLORS.line}`}}>
            <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 35% 42%, rgba(79,195,255,0.45), transparent 18%), radial-gradient(circle at 62% 35%, rgba(139,92,255,0.38), transparent 24%), linear-gradient(120deg, transparent 0 48%, rgba(255,255,255,0.09) 49%, transparent 55%)'}} />
            <div style={{position: 'absolute', left: 38, bottom: 34, width: 310, height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.12)'}}>
              <div style={{width: `${(0.35 + click * 0.32) * 100}%`, height: '100%', borderRadius: 99, background: COLORS.white, boxShadow: '0 0 20px rgba(255,255,255,0.4)'}} />
            </div>
            <div style={{position: 'absolute', right: 34, bottom: 28, color: COLORS.white, fontSize: 13, fontWeight: 700}}>00:{reviewActive ? '18' : '12'}</div>
            <div style={{position: 'absolute', left: 240, top: 88, width: 58, height: 58, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.28)', transform: `scale(${1 + click * 0.14})`}}>
              <div style={{width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: `18px solid ${COLORS.white}`, marginLeft: 5}} />
            </div>
          </div>
          <div style={{display: 'flex', gap: 10, marginTop: 16}}>
            {DATA.assets.map((asset, idx) => <div key={asset} style={{height: 44, flex: 1, borderRadius: 13, background: idx === 0 ? 'rgba(79,195,255,0.12)' : 'rgba(255,255,255,0.055)', border: `1px solid ${idx === 0 ? 'rgba(79,195,255,0.38)' : COLORS.line}`, color: idx === 0 ? COLORS.white : COLORS.muted, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700}}>{asset}</div>)}
          </div>
        </Panel>
      </div>

      <div style={{position: 'absolute', right: 28, top: 82, width: 286, height: 370}}>
        <Panel style={{height: '100%', padding: 18, transform: 'translateZ(62px)'}}>
          <div style={{color: COLORS.dim, fontSize: 11, letterSpacing: 2.1, fontWeight: 800}}>COMMENTS</div>
          {[['M', 'Tighter cut at the reveal', COLORS.blue], ['AK', 'Lock this color grade', COLORS.violet], ['JS', reviewActive ? 'Approved for launch' : 'Needs one note', reviewActive ? COLORS.green : COLORS.amber]].map(([a, text, c], idx) => (
            <div key={idx} style={{marginTop: 15, padding: 14, borderRadius: 16, background: idx === 2 && reviewActive ? 'rgba(100,246,189,0.12)' : 'rgba(255,255,255,0.055)', border: `1px solid ${idx === 2 && reviewActive ? 'rgba(100,246,189,0.4)' : COLORS.line}`, transform: `translateX(${idx === 2 ? -click * 10 : 0}px)`}}>
              <div style={{display: 'flex', gap: 10, alignItems: 'center'}}><MiniAvatar label={a} index={0} /><span style={{color: COLORS.white, fontSize: 13, fontWeight: 700}}>{text}</span></div>
              <div style={{height: 4, width: idx === 2 ? `${55 + click * 35}%` : `${64 - idx * 10}%`, borderRadius: 99, background: String(c), marginTop: 11, opacity: 0.75}} />
            </div>
          ))}
          <button style={{position: 'absolute', left: 18, right: 18, bottom: 18, height: 46, borderRadius: 14, border: 0, color: '#07100d', background: ship > 0 ? COLORS.green : COLORS.white, fontWeight: 850, fontSize: 13, transform: `scale(${1 - ship * 0.045})`, boxShadow: ship > 0 ? `0 0 34px rgba(100,246,189,${0.28 + ship * 0.25})` : '0 12px 28px rgba(255,255,255,0.12)'}}>{ship > 0.2 ? 'Shipped' : 'Approve'}</button>
        </Panel>
      </div>

      <div style={{position: 'absolute', left: 272, right: 28, bottom: 28, height: 174}}>
        <Panel style={{height: '100%', padding: 18, transform: 'translateZ(22px)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', color: COLORS.dim, fontSize: 11, letterSpacing: 1.9, fontWeight: 800, marginBottom: 15}}><span>SPRINT TIMELINE</span><span>6 active milestones</span></div>
          <div style={{display: 'grid', gridTemplateColumns: '1.1fr .8fr 1.3fr .9fr', gap: 12}}>
            {['Brief', 'Review', 'Edit', 'Deliver'].map((label, idx) => {
              const active = idx <= Math.floor(progress * 4);
              return <div key={label} style={{height: 93, borderRadius: 16, padding: 14, background: active ? 'rgba(79,195,255,0.10)' : 'rgba(255,255,255,0.045)', border: `1px solid ${active ? 'rgba(79,195,255,0.35)' : COLORS.line}`}}>
                <div style={{height: 8, width: `${42 + idx * 13}%`, borderRadius: 99, background: active ? COLORS.blue : COLORS.dim, opacity: active ? 1 : 0.45}} />
                <div style={{marginTop: 18, color: active ? COLORS.white : COLORS.muted, fontSize: 16, fontWeight: 780}}>{label}</div>
                <div style={{marginTop: 7, height: 5, width: `${80 - idx * 9}%`, borderRadius: 99, background: 'rgba(255,255,255,0.12)'}} />
              </div>;
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
};
