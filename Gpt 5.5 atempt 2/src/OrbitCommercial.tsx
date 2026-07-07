import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {AppWindow} from './components/AppWindow';
import {BrandLockup} from './components/BrandLockup';
import {Cursor, cursorPulse} from './components/Cursor';
import {CaptionAsUI, DynamicCaption} from './components/DynamicCaption';
import {FeatureCard, MicroBars} from './components/FeatureCard';
import {MorphingShape, OrbitGlyph} from './components/MorphingShape';
import {COLORS, SCENES, TYPO} from './config';
import {clamp, ease, easeInOut, easeOutBack, flicker, i, mix, norm} from './utils';

const Scene: React.FC<React.PropsWithChildren<{frame: number; start: number; end: number; style?: React.CSSProperties}>> = ({frame, start, end, style, children}) => {
  const fadeIn = clamp((frame - start) / 16);
  const fadeOut = clamp((end - frame) / 16);
  const opacity = Math.min(fadeIn, fadeOut);
  return <AbsoluteFill style={{opacity, ...style}}>{children}</AbsoluteFill>;
};

const Background: React.FC<{frame: number}> = ({frame}) => (
  <AbsoluteFill style={{background: `linear-gradient(180deg, ${COLORS.bg}, #090b12 55%, #06070b)`, overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: -220, background: `radial-gradient(circle at ${54 + Math.sin(frame / 120) * 6}% ${24 + Math.cos(frame / 100) * 4}%, rgba(79,195,255,0.14), transparent 30%), radial-gradient(circle at 72% 72%, rgba(139,92,255,0.13), transparent 28%)`}} />
    <div style={{position: 'absolute', inset: 0, opacity: 0.19, backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '64px 64px', transform: `perspective(900px) rotateX(62deg) translateY(${220 + Math.sin(frame / 90) * 14}px) scale(1.5)`, transformOrigin: '50% 70%'}} />
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 48%, transparent 0 44%, rgba(0,0,0,0.34) 82%)'}} />
  </AbsoluteFill>
);

const OpeningScene: React.FC<{frame: number}> = ({frame}) => {
  const p = norm(frame, 0, 89);
  const accel = easeInOut(norm(frame, 12, 62));
  const windowIn = easeOutBack(norm(frame, 54, 88));
  const dotSize = mix(10, 230, accel);
  const zBlur = mix(0, 18, norm(frame, 45, 70));
  const appScale = mix(0.18, 0.76, windowIn);
  const appRotate = mix(-18, -6, windowIn);
  return (
    <Scene frame={frame} start={0} end={98}>
      <div style={{position: 'absolute', inset: 0, perspective: 1200}}>
        <div style={{position: 'absolute', left: 960 - dotSize / 2, top: 520 - dotSize / 2, width: dotSize, height: dotSize, borderRadius: dotSize, background: `radial-gradient(circle, ${COLORS.white}, ${COLORS.blue} 34%, transparent 66%)`, opacity: 1 - windowIn * 0.68, filter: `blur(${zBlur}px)`, boxShadow: `0 0 ${90 + dotSize / 2}px rgba(79,195,255,0.45)`, transform: `translateZ(${mix(-620, 320, accel)}px)`}} />
        {Array.from({length: 5}).map((_, idx) => {
          const t = clamp(norm(frame, 8 + idx * 6, 70 + idx * 3));
          return <div key={idx} style={{position: 'absolute', left: 960 - (90 + idx * 110) / 2, top: 520 - (90 + idx * 110) / 2, width: 90 + idx * 110, height: 90 + idx * 110, borderRadius: 999, border: `1px solid rgba(79,195,255,${(1 - t) * 0.25})`, transform: `scale(${0.2 + t * 1.9}) rotateX(68deg)`, opacity: 1 - t}} />;
        })}
        <div style={{position: 'absolute', left: 220, top: 368, color: COLORS.white, fontFamily: TYPO.font, opacity: clamp(norm(frame, 28, 48) - norm(frame, 84, 96))}}>
          {['Your work.', 'In motion.'].map((line, idx) => <div key={line} style={{fontSize: idx ? 78 : 64, fontWeight: idx ? 850 : 620, letterSpacing: idx ? -4.5 : -2.4, lineHeight: 0.96, transform: `translateX(${(1 - ease(norm(frame, 28 + idx * 8, 52 + idx * 8))) * -48}px)`}}>{line}</div>)}
          <div style={{height: 2, width: 280, marginTop: 28, background: `linear-gradient(90deg, ${COLORS.blue}, transparent)`, transform: `scaleX(${ease(norm(frame, 44, 66))})`, transformOrigin: '0 50%'}} />
        </div>
        <div style={{position: 'absolute', left: 370, top: 250, transformStyle: 'preserve-3d', transform: `translate3d(${mix(380, 310, windowIn)}px, ${mix(210, 100, windowIn)}px, 0) rotateX(${mix(64, 12, windowIn)}deg) rotateY(${appRotate}deg) scale(${appScale})`, opacity: windowIn}}>
          <AppWindow frame={frame} mode="compact" />
        </div>
      </div>
    </Scene>
  );
};

const InterfaceScene: React.FC<{frame: number}> = ({frame}) => {
  const enter = easeOutBack(norm(frame, 90, 128));
  const push = ease(norm(frame, 118, 230));
  const click = cursorPulse(frame, 170, 24);
  const ship = cursorPulse(frame, 218, 22);
  return (
    <Scene frame={frame} start={82} end={250}>
      <div style={{position: 'absolute', inset: 0, perspective: 1500}}>
        <div style={{position: 'absolute', left: 430, top: 180, transform: `translateZ(${push * 80}px) rotateX(${mix(22, 8, enter)}deg) rotateY(${mix(-28, -8, enter)}deg) rotateZ(${mix(3, 0, enter)}deg) translateX(${mix(130, 0, enter) - push * 44}px) scale(${mix(0.82, 0.94, enter)})`, transformStyle: 'preserve-3d'}}>
          <AppWindow frame={frame} clickPulse={click} shipPulse={ship} mode="hero" />
        </div>
        <div style={{position: 'absolute', left: 170, top: 128, width: 315, color: COLORS.white, fontFamily: TYPO.font, opacity: clamp(norm(frame, 96, 126) - norm(frame, 218, 240)), transform: `translateY(${(1 - enter) * 26}px)`}}>
          <div style={{fontSize: 15, color: COLORS.blue, fontWeight: 850, letterSpacing: 2.4}}>ACTIVE WORKSPACE</div>
          <div style={{fontSize: 40, lineHeight: 0.96, fontWeight: 820, letterSpacing: -2.2, marginTop: 14}}>Every project finds its rhythm.</div>
        </div>
        <Cursor frame={frame} visibleFrom={128} visibleTo={236} clicks={[170, 218]} points={[{f: 128, x: 1540, y: 765}, {f: 152, x: 1200, y: 444}, {f: 170, x: 1134, y: 407}, {f: 196, x: 1430, y: 520}, {f: 218, x: 1442, y: 602}, {f: 236, x: 1550, y: 700}]} />
      </div>
    </Scene>
  );
};

const TransformScene: React.FC<{frame: number}> = ({frame}) => {
  const p = norm(frame, 240, 389);
  const out = norm(frame, 240, 282);
  const morph = ease(norm(frame, 280, 345));
  const words = [
    {word: 'Plan', x0: 655, y0: 365, x: 340, y: 375, c: COLORS.violet, r: -10},
    {word: 'Review', x0: 910, y0: 360, x: 820, y: 280, c: COLORS.blue, r: 6},
    {word: 'Deliver', x0: 1085, y0: 540, x: 1215, y: 430, c: COLORS.green, r: 12},
  ];
  return (
    <Scene frame={frame} start={232} end={402}>
      <div style={{position: 'absolute', inset: 0, perspective: 1300, fontFamily: TYPO.font}}>
        <div style={{position: 'absolute', left: 390, top: 190, transform: `rotateX(${mix(9, 54, out)}deg) rotateY(${mix(-7, 18, out)}deg) scale(${mix(0.92, 0.72, out)}) translateY(${-out * 70}px)`, opacity: 1 - norm(frame, 262, 300)}}>
          <AppWindow frame={frame} mode="hero" clickPulse={0.5} />
        </div>
        {words.map((w, idx) => {
          const local = easeOutBack(norm(frame, 252 + idx * 8, 318 + idx * 7));
          const x = mix(w.x0, w.x, local);
          const y = mix(w.y0, w.y, local);
          const shapeT = ease(norm(frame, 302 + idx * 5, 348 + idx * 5));
          return (
            <React.Fragment key={w.word}>
              <FeatureCard label={w.word} kicker={idx === 0 ? 'MAP' : idx === 1 ? 'SYNC' : 'RELEASE'} accent={w.c} style={{left: x, top: y, transform: `rotate(${mix(0, w.r, local)}deg) scale(${mix(0.56, 1, local)})`, opacity: local}}>
                <MicroBars accent={w.c} count={idx + 3} />
              </FeatureCard>
              <MorphingShape type={idx === 1 ? 'circle' : idx === 2 ? 'pill' : 'diamond'} accent={w.c} style={{left: mix(x + 80, 742 + idx * 98, shapeT), top: mix(y + 46, 614 - idx * 92, shapeT), opacity: shapeT * (1 - norm(frame, 366, 392)), transform: `${idx === 0 ? 'rotate(45deg)' : ''} scale(${0.75 + shapeT * 0.3})`}} />
            </React.Fragment>
          );
        })}
        <div style={{position: 'absolute', left: 670, top: 420, width: 590, height: 235, borderRadius: 34, padding: 30, background: 'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035))', border: '1px solid rgba(255,255,255,0.16)', boxShadow: '0 40px 120px rgba(0,0,0,0.48)', opacity: morph, transform: `translateY(${(1 - morph) * 50}px) scale(${0.96 + morph * 0.04})`}}>
          <div style={{display: 'flex', justifyContent: 'space-between', color: COLORS.dim, fontSize: 12, letterSpacing: 2, fontWeight: 850}}><span>CREATIVE FLOW</span><span>LIVE</span></div>
          <div style={{marginTop: 26, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16}}>
            {words.map((w, idx) => <div key={w.word} style={{height: 112, borderRadius: 22, background: `${w.c}18`, border: `1px solid ${w.c}55`, padding: 16}}><div style={{color: w.c, fontSize: 13, fontWeight: 850}}>0{idx + 1}</div><div style={{color: COLORS.white, fontSize: 29, fontWeight: 840, marginTop: 15, letterSpacing: -1.2}}>{w.word}</div></div>)}
          </div>
        </div>
      </div>
    </Scene>
  );
};

const CaptionsScene: React.FC<{frame: number}> = ({frame}) => {
  const click = cursorPulse(frame, 456, 22);
  const ship = cursorPulse(frame, 529, 22);
  const camera = ease(norm(frame, 390, 569));
  return (
    <Scene frame={frame} start={382} end={580}>
      <div style={{position: 'absolute', inset: 0, perspective: 1400, fontFamily: TYPO.font}}>
        <div style={{position: 'absolute', left: 340, top: 174, transform: `rotateX(${mix(14, 5, camera)}deg) rotateY(${mix(-9, 5, camera)}deg) translateX(${mix(0, -80, camera)}px) scale(0.9)`}}>
          <AppWindow frame={frame} mode="review" clickPulse={click} shipPulse={ship} />
        </div>
        <DynamicCaption frame={frame} start={392} end={438} x={315} y={258} text="Drop the idea." split accent={COLORS.violet} style={{transform: `translate3d(${ease(norm(frame,392,424))*190}px, ${ease(norm(frame,392,424))*82}px, 220px) scale(1)`}} />
        <div style={{position: 'absolute', left: 585, top: 374, width: 220, height: 64, borderRadius: 18, border: `1px dashed rgba(139,92,255,${0.25 + clamp(norm(frame, 404, 430)) * 0.45})`, background: 'rgba(139,92,255,0.08)', opacity: clamp(norm(frame, 402, 430) - norm(frame, 446, 466)), display: 'grid', placeItems: 'center', color: COLORS.violet2, fontWeight: 820}}>idea captured</div>
        <DynamicCaption frame={frame} start={438} end={502} x={1040} y={256} text="Shape it together." split accent={COLORS.blue} style={{transform: `translate3d(${-ease(norm(frame,438,482))*210}px, ${ease(norm(frame,438,482))*118}px, 260px) scale(${1.08 + clamp(norm(frame,460,486))*0.18})`}} />
        <DynamicCaption frame={frame} start={498} end={560} x={1116} y={692} text="while it matters." scale={0.72} align="right" />
        <CaptionAsUI frame={frame} start={514} x={1010} y={586} />
        <Cursor frame={frame} visibleFrom={430} visibleTo={548} clicks={[456, 529]} points={[{f: 430, x: 1240, y: 430}, {f: 456, x: 1054, y: 494}, {f: 488, x: 1176, y: 560}, {f: 529, x: 1160, y: 620}, {f: 548, x: 1430, y: 710}]} />
      </div>
    </Scene>
  );
};

const MontageScene: React.FC<{frame: number}> = ({frame}) => {
  const beats = [570, 594, 615, 637, 660, 684];
  const panel = (idx: number) => clamp(norm(frame, beats[idx], beats[idx + 1]));
  const labels = ['Organise', 'Review', 'Approve', 'Measure', 'Complete'];
  const accents = [COLORS.violet, COLORS.blue, COLORS.amber, COLORS.green, COLORS.white];
  const active = beats.findIndex((b, idx) => frame >= b && frame < (beats[idx + 1] ?? 690));
  return (
    <Scene frame={frame} start={562} end={699}>
      <div style={{position: 'absolute', inset: 0, perspective: 1500, fontFamily: TYPO.font}}>
        <div style={{position: 'absolute', left: 250, top: 140, color: COLORS.white}}>
          <div style={{fontSize: 15, color: COLORS.blue, letterSpacing: 2.4, fontWeight: 850}}>ORBIT MOVES FAST</div>
          <div style={{fontSize: 58, lineHeight: 0.92, fontWeight: 850, letterSpacing: -3, width: 470, marginTop: 14}}>One flow. Every handoff.</div>
        </div>
        <div style={{position: 'absolute', left: 610, top: 210, width: 870, height: 540, transformStyle: 'preserve-3d', transform: `rotateX(${8 + Math.sin(frame / 25) * 1.5}deg) rotateY(${-10 + norm(frame,570,689)*18}deg)`}}>
          {labels.map((label, idx) => {
            const a = panel(idx);
            const prev = idx === 0 ? 1 : panel(idx - 1);
            const visible = idx === active || idx === active + 1 || (idx === 0 && frame < beats[1]);
            const x = mix(120 + idx * 22, 40 + idx * 26, a) + (idx - active) * 22;
            const y = mix(80 + idx * 18, 36 + idx * 16, a);
            const scale = idx === active ? 1.06 : 0.9;
            return <div key={label} style={{position: 'absolute', left: x, top: y, width: 650, height: 390, borderRadius: 34, padding: 30, background: 'linear-gradient(145deg, rgba(26,31,45,0.97), rgba(9,11,17,0.96))', border: `1px solid ${idx === active ? accents[idx] : 'rgba(255,255,255,0.12)'}`, boxShadow: `0 44px 100px rgba(0,0,0,0.55), 0 0 60px ${accents[idx]}24`, opacity: visible ? clamp(1.1 - Math.abs(idx - active) * 0.42) : 0, transform: `translateZ(${(4 - idx) * 38}px) translateX(${idx < active ? -prev * 680 : 0}px) rotateY(${idx < active ? -20 : 0}deg) scale(${scale})`, overflow: 'hidden'}}>
              <div style={{color: accents[idx], fontSize: 13, letterSpacing: 2.4, fontWeight: 900}}>0{idx + 1} · {label.toUpperCase()}</div>
              <div style={{color: COLORS.white, fontSize: 52, fontWeight: 850, letterSpacing: -2.5, marginTop: 22}}>{idx === 4 ? 'Done before the moment passes.' : label}</div>
              <div style={{position: 'absolute', left: 30, right: 30, bottom: 32, display: 'grid', gridTemplateColumns: idx === 3 ? '1fr 1fr 1fr' : 'repeat(4, 1fr)', gap: 14}}>
                {Array.from({length: idx === 3 ? 3 : 4}).map((_, n) => <div key={n} style={{height: idx === 3 ? 128 : 92, borderRadius: 18, background: idx === 4 ? 'rgba(100,246,189,0.12)' : 'rgba(255,255,255,0.065)', border: `1px solid ${idx === 4 ? 'rgba(100,246,189,0.36)' : 'rgba(255,255,255,0.10)'}`, padding: 14}}>
                  <div style={{width: idx === 3 ? 36 + n * 20 : 46 + n * 16, height: 7, borderRadius: 99, background: n === 0 ? accents[idx] : 'rgba(255,255,255,0.24)'}} />
                  <div style={{marginTop: 18, width: '74%', height: 7, borderRadius: 99, background: 'rgba(255,255,255,0.13)'}} />
                  {idx === 4 && <div style={{marginTop: 14, color: COLORS.green, fontSize: 38, fontWeight: 900}}>✓</div>}
                </div>)}
              </div>
            </div>;
          })}
        </div>
      </div>
    </Scene>
  );
};

const LockupScene: React.FC<{frame: number}> = ({frame}) => {
  const p = easeOutBack(norm(frame, 690, 724));
  const settle = ease(norm(frame, 724, 749));
  return (
    <Scene frame={frame} start={682} end={760}>
      <BrandLockup progress={p} settle={settle} />
    </Scene>
  );
};

export const OrbitCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: COLORS.bg, overflow: 'hidden'}}>
      <Background frame={frame} />
      <OpeningScene frame={frame} />
      <InterfaceScene frame={frame} />
      <TransformScene frame={frame} />
      <CaptionsScene frame={frame} />
      <MontageScene frame={frame} />
      <LockupScene frame={frame} />

      <Audio src={staticFile('audio/orbit-bgm.mp3')} volume={(f) => Math.min(0.28, f / 80) * (1 - clamp((f - 724) / 34) * 0.35)} />
      <Sequence from={58}><Audio src={staticFile('audio/whoosh.wav')} volume={0.42} /></Sequence>
      <Sequence from={170}><Audio src={staticFile('audio/ui-click.wav')} volume={0.34} /></Sequence>
      <Sequence from={218}><Audio src={staticFile('audio/ui-confirm.wav')} volume={0.34} /></Sequence>
      <Sequence from={286}><Audio src={staticFile('audio/morph.wav')} volume={0.28} /></Sequence>
      <Sequence from={456}><Audio src={staticFile('audio/ui-click.wav')} volume={0.36} /></Sequence>
      <Sequence from={529}><Audio src={staticFile('audio/ui-confirm.wav')} volume={0.38} /></Sequence>
      {[570, 594, 615, 637, 660].map((f) => <Sequence key={f} from={f}><Audio src={staticFile('audio/soft-impact.wav')} volume={0.18} /></Sequence>)}
      <Sequence from={692}><Audio src={staticFile('audio/lockup.wav')} volume={0.32} /></Sequence>
    </AbsoluteFill>
  );
};
