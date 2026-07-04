import React from 'react';
import { Composition } from 'remotion';
import { OrbitCommercial } from './OrbitCommercial';
import { TOTAL_FRAMES, FPS, LAYOUT } from './config';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OrbitCommercial"
      component={OrbitCommercial}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={LAYOUT.width}
      height={LAYOUT.height}
    />
  );
};
