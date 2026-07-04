import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { TIMINGS } from "./constants";
import { Scene1 } from "./components/Scene1";
import { Scene2 } from "./components/Scene2";
import { Scene3 } from "./components/Scene3";
import { Scene4 } from "./components/Scene4";
import { Scene5 } from "./components/Scene5";
import { Scene6 } from "./components/Scene6";

export const OrbitComposition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0F" }}>
      {/* Scene 1: Controlled opening (0-89) */}
      <Sequence
        from={TIMINGS.Scene1.start}
        durationInFrames={TIMINGS.Scene1.duration}
        premountFor={1 * fps}
      >
        <Scene1 />
      </Sequence>

      {/* Scene 2: Interface reveal (90-239) */}
      <Sequence
        from={TIMINGS.Scene2.start}
        durationInFrames={TIMINGS.Scene2.duration}
        premountFor={1 * fps}
      >
        <Scene2 />
      </Sequence>

      {/* Scene 3: Shape-to-interface transformation (240-389) */}
      <Sequence
        from={TIMINGS.Scene3.start}
        durationInFrames={TIMINGS.Scene3.duration}
        premountFor={1 * fps}
      >
        <Scene3 />
      </Sequence>

      {/* Scene 4: Dynamic captions and collaborative review (390-569) */}
      <Sequence
        from={TIMINGS.Scene4.start}
        durationInFrames={TIMINGS.Scene4.duration}
        premountFor={1 * fps}
      >
        <Scene4 />
      </Sequence>

      {/* Scene 5: Accelerated product montage (570-689) */}
      <Sequence
        from={TIMINGS.Scene5.start}
        durationInFrames={TIMINGS.Scene5.duration}
        premountFor={1 * fps}
      >
        <Scene5 />
      </Sequence>

      {/* Scene 6: Final brand lockup (690-749) */}
      <Sequence
        from={TIMINGS.Scene6.start}
        durationInFrames={TIMINGS.Scene6.duration}
        premountFor={1 * fps}
      >
        <Scene6 />
      </Sequence>
    </AbsoluteFill>
  );
};
