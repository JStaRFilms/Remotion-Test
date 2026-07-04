import React from 'react';
import { Composition } from 'remotion';
import { OrbitCommercial } from './OrbitCommercial';
import { VIDEO } from './config';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={VIDEO.id}
        component={OrbitCommercial}
        durationInFrames={VIDEO.durationInFrames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
    </>
  );
};
