import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { THEME } from "./theme";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2Interface } from "./scenes/Scene2Interface";
import { Scene3Transform } from "./scenes/Scene3Transform";
import { Scene4Captions } from "./scenes/Scene4Captions";
import { Scene5Montage } from "./scenes/Scene5Montage";
import { Scene6Lockup } from "./scenes/Scene6Lockup";

export const OrbitCommercial: React.FC = () => {
  const { fps } = useVideoConfig();
  const premount = 1 * fps; // 30 frames premounting for flawless transition rendering

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bg, overflow: "hidden" }}>
      {/* Optional Audio Track: To enable sound design, place music.mp3 in public/audio/ and uncomment below: */}
      {/* <Audio src={staticFile("audio/music.mp3")} volume={0.8} /> */}

      {/* Scene 1 — Controlled opening: Frames 0–89 (3 seconds) */}
      <Sequence from={0} durationInFrames={90} premountFor={premount} name="Scene 1: Controlled Opening">
        <Scene1Opening />
      </Sequence>

      {/* Scene 2 — Interface reveal: Frames 90–239 (5 seconds) */}
      <Sequence from={90} durationInFrames={150} premountFor={premount} name="Scene 2: Interface Reveal">
        <Scene2Interface />
      </Sequence>

      {/* Scene 3 — Shape-to-interface transformation: Frames 240–389 (5 seconds) */}
      <Sequence from={240} durationInFrames={150} premountFor={premount} name="Scene 3: Shape Transformation">
        <Scene3Transform />
      </Sequence>

      {/* Scene 4 — Dynamic captions & collaborative review: Frames 390–569 (6 seconds) */}
      <Sequence from={390} durationInFrames={180} premountFor={premount} name="Scene 4: Dynamic Captions">
        <Scene4Captions />
      </Sequence>

      {/* Scene 5 — Accelerated product montage: Frames 570–689 (4 seconds) */}
      <Sequence from={570} durationInFrames={120} premountFor={premount} name="Scene 5: Accelerated Montage">
        <Scene5Montage />
      </Sequence>

      {/* Scene 6 — Final brand lockup: Frames 690–749 (2 seconds) */}
      <Sequence from={690} durationInFrames={60} premountFor={premount} name="Scene 6: Final Brand Lockup">
        <Scene6Lockup />
      </Sequence>
    </AbsoluteFill>
  );
};
