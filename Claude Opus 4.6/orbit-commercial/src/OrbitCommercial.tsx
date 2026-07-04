import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig, staticFile, Img } from 'remotion';
import { COLORS, SCENES } from './config';
import { Scene1Opening } from './scenes/Scene1Opening';
import { Scene2InterfaceReveal } from './scenes/Scene2InterfaceReveal';
import { Scene3ShapeTransform } from './scenes/Scene3ShapeTransform';
import { Scene4DynamicCaptions } from './scenes/Scene4DynamicCaptions';
import { Scene5Montage } from './scenes/Scene5Montage';
import { Scene6BrandLockup } from './scenes/Scene6BrandLockup';

export const OrbitCommercial: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Scene 1: Controlled Opening (0-89) */}
      <Sequence
        from={SCENES.opening.start}
        durationInFrames={SCENES.opening.duration}
        premountFor={fps}
      >
        <Scene1Opening />
      </Sequence>
      {/* Scene 2: Interface Reveal (90-239) */}
      <Sequence
        from={SCENES.interfaceReveal.start}
        durationInFrames={SCENES.interfaceReveal.duration}
        premountFor={fps}
      >
        <Scene2InterfaceReveal />
      </Sequence>
      {/* Scene 3: Shape-to-Interface Transformation (240-389) */}
      <Sequence
        from={SCENES.shapeTransform.start}
        durationInFrames={SCENES.shapeTransform.duration}
        premountFor={fps}
      >
        <Scene3ShapeTransform />
      </Sequence>
      {/* Scene 4: Dynamic Captions (390-569) */}
      <Sequence
        from={SCENES.dynamicCaptions.start}
        durationInFrames={SCENES.dynamicCaptions.duration}
        premountFor={fps}
      >
        <Scene4DynamicCaptions />
      </Sequence>
      {/* Scene 5: Accelerated Montage (570-689) */}
      <Sequence
        from={SCENES.montage.start}
        durationInFrames={SCENES.montage.duration}
        premountFor={fps}
      >
        <Scene5Montage />
      </Sequence>
      {/* Scene 6: Brand Lockup (690-749) */}
      <Sequence
        from={SCENES.brandLockup.start}
        durationInFrames={SCENES.brandLockup.duration}
        premountFor={fps}
      >
        <Scene6BrandLockup />
      </Sequence>
    </AbsoluteFill>
  );
};
