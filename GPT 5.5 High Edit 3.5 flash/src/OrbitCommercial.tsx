import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SCENES } from './config';
import { Scene1Opening } from './scenes/Scene1Opening';
import { Scene2InterfaceReveal } from './scenes/Scene2InterfaceReveal';
import { Scene3Transformation } from './scenes/Scene3Transformation';
import { Scene4Captions } from './scenes/Scene4Captions';
import { Scene5Montage } from './scenes/Scene5Montage';
import { Scene6Lockup } from './scenes/Scene6Lockup';

const SceneAudio: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Audio
      src={staticFile('audio/orbit-soundtrack.wav')}
      trimAfter={748}
      volume={(f) => {
        const fadeIn = Math.min(1, f / (fps * 1.2));
        const fadeOut = Math.min(1, (750 - frame) / (fps * 1.4));
        return 0.72 * fadeIn * fadeOut;
      }}
    />
  );
};

const FrameRender: React.FC<{ children: (frame: number) => React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  return <>{children(frame)}</>;
};

export const OrbitCommercial: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: '#050609' }}>
      <SceneAudio />
      <Sequence from={SCENES.opening.from} durationInFrames={SCENES.opening.duration} premountFor={fps}>
        <FrameRender>{(frame) => <Scene1Opening frame={frame} />}</FrameRender>
      </Sequence>
      <Sequence from={SCENES.interfaceReveal.from} durationInFrames={SCENES.interfaceReveal.duration} premountFor={fps}>
        <FrameRender>{(frame) => <Scene2InterfaceReveal frame={frame} />}</FrameRender>
      </Sequence>
      <Sequence from={SCENES.transformation.from} durationInFrames={SCENES.transformation.duration} premountFor={fps}>
        <FrameRender>{(frame) => <Scene3Transformation frame={frame} />}</FrameRender>
      </Sequence>
      <Sequence from={SCENES.captions.from} durationInFrames={SCENES.captions.duration} premountFor={fps}>
        <FrameRender>{(frame) => <Scene4Captions frame={frame} />}</FrameRender>
      </Sequence>
      <Sequence from={SCENES.montage.from} durationInFrames={SCENES.montage.duration} premountFor={fps}>
        <FrameRender>{(frame) => <Scene5Montage frame={frame} />}</FrameRender>
      </Sequence>
      <Sequence from={SCENES.lockup.from} durationInFrames={SCENES.lockup.duration} premountFor={fps}>
        <FrameRender>{(frame) => <Scene6Lockup frame={frame} />}</FrameRender>
      </Sequence>
    </AbsoluteFill>
  );
};
