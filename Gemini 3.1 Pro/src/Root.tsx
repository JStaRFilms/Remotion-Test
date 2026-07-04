import React from "react";
import { Composition } from "remotion";
import { OrbitCommercial } from "./OrbitCommercial";
import { THEME } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OrbitCommercial"
        component={OrbitCommercial}
        durationInFrames={THEME.timings.totalFrames} // exactly 750 frames / 25 seconds
        fps={THEME.timings.fps} // 30 FPS
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
