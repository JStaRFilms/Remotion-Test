import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { THEME } from "../theme";
import { FeatureCard } from "../components/FeatureCard";

export const Scene3Transform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Phase 1: Cards detach from interface (frames 0-40)
  const detachProgress = spring({
    frame,
    fps,
    config: THEME.springs.heavy,
  });
  const windowOpacity = interpolate(detachProgress, [0, 1], [0.8, 0.1]);
  const windowScale = interpolate(detachProgress, [0, 1], [1, 0.8]);
  const cardsTranslateZ = interpolate(detachProgress, [0, 1], [0, 220]);

  // Phase 2: Shape Morphing (frames 30-80)
  const morphProgress = interpolate(frame, [30, 75], [0, 1], {
    easing: Easing.inOut(Easing.exp),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card 1 (Plan) -> Circle Node at Left (-420px)
  const card1Width = interpolate(morphProgress, [0, 1], [340, 240]);
  const card1Height = interpolate(morphProgress, [0, 1], [140, 240]);
  const card1Radius = interpolate(morphProgress, [0, 1], [18, 120]); // becomes circle
  const card1X = interpolate(morphProgress, [0, 1], [-380, -440]);
  const card1Y = interpolate(morphProgress, [0, 1], [0, -40]);
  const card1Bg = morphProgress > 0.5 ? THEME.colors.primary : THEME.colors.surfaceElevated;

  // Card 2 (Review) -> Rounded Waveform Box at Center (0px)
  const card2Width = interpolate(morphProgress, [0, 1], [340, 360]);
  const card2Height = interpolate(morphProgress, [0, 1], [140, 240]);
  const card2Radius = interpolate(morphProgress, [0, 1], [18, 36]);
  const card2X = interpolate(morphProgress, [0, 1], [0, 0]);
  const card2Y = interpolate(morphProgress, [0, 1], [0, -40]);

  // Card 3 (Deliver) -> Diamond / Hexagon at Right (440px)
  const card3Width = interpolate(morphProgress, [0, 1], [340, 240]);
  const card3Height = interpolate(morphProgress, [0, 1], [140, 240]);
  const card3Radius = interpolate(morphProgress, [0, 1], [18, 48]);
  const card3RotateZ = interpolate(morphProgress, [0, 1], [0, 45]);
  const card3X = interpolate(morphProgress, [0, 1], [380, 440]);
  const card3Y = interpolate(morphProgress, [0, 1], [0, -40]);

  // Phase 3: Feature words reveal and interaction (frames 50-149)
  const planSpring = spring({ frame: frame - 45, fps, config: THEME.springs.bouncy });
  const reviewSpring = spring({ frame: frame - 55, fps, config: THEME.springs.bouncy });
  const deliverSpring = spring({ frame: frame - 65, fps, config: THEME.springs.bouncy });

  // Scrubbing marker for Review
  const scrubX = interpolate(frame, [60, 140], [-120, 120], {
    easing: Easing.inOut(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Reorganization into unified dashboard panel around frame 105-149
  const mergeProgress = interpolate(frame, [105, 145], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const unifiedY = interpolate(mergeProgress, [0, 1], [0, 40]);
  const unifiedScale = interpolate(mergeProgress, [0, 1], [1, 1.08]);

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: THEME.colors.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1600px",
      }}
    >
      {/* Ghost AppWindow receding into background */}
      <div
        style={{
          position: "absolute",
          opacity: windowOpacity,
          transform: `scale(${windowScale})`,
          filter: "blur(4px)",
        }}
      >
        <div style={{ width: 1440, height: 860, borderRadius: 24, backgroundColor: THEME.colors.surface, border: `1px solid ${THEME.colors.border}` }} />
      </div>

      {/* Transform Container with Z-elevation and Merge scale */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate3d(0, ${unifiedY}px, ${cardsTranslateZ}px) scale(${unifiedScale})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* SHAPE 1: PLAN (Circle Blueprint Node) */}
        <div
          style={{
            position: "absolute",
            width: card1Width,
            height: card1Height,
            borderRadius: card1Radius,
            backgroundColor: card1Bg,
            border: `2px solid ${THEME.colors.primaryGlow}`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(99, 102, 241, 0.4)`,
            transform: `translate3d(${card1X * (1 - mergeProgress * 0.4)}px, ${card1Y}px, 0)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            transition: "none",
          }}
        >
          {morphProgress < 0.5 ? (
            <FeatureCard title="Plan Architecture" subtitle="Roadmap & Milestones" iconType="plan" width={340} elevation={0} />
          ) : (
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyItems: "center" }}>
              {/* Orbiting ring inside circle */}
              <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", border: `1.5px dashed rgba(255,255,255,0.4)`, transform: `rotate(${frame * 2}deg)` }} />
              <span style={{ fontSize: 44, fontWeight: 800, color: "#FFF", fontFamily: THEME.fonts.display, transform: `scale(${planSpring})`, textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}>
                Plan
              </span>
            </div>
          )}
        </div>

        {/* SHAPE 2: REVIEW (Rounded Waveform Box) */}
        <div
          style={{
            position: "absolute",
            width: card2Width * (1 + mergeProgress * 0.8),
            height: card2Height,
            borderRadius: card2Radius,
            backgroundColor: THEME.colors.surfaceElevated,
            border: `2px solid ${THEME.colors.secondaryGlow}`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(56, 189, 248, 0.4)`,
            transform: `translate3d(${card2X}px, ${card2Y}px, 0)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            transition: "none",
            zIndex: 10,
          }}
        >
          {morphProgress < 0.5 ? (
            <FeatureCard title="Review Media" subtitle="Realtime Team Collaboration" iconType="review" width={340} elevation={0} status="Active" />
          ) : (
            <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyItems: "center", padding: "0 40px", justifyContent: "center" }}>
              {/* Scrubbing Waveform Bar inside Review Box */}
              <div style={{ position: "absolute", bottom: 40, left: 40, right: 40, height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
                <div style={{ position: "absolute", left: `${50 + (scrubX / 120) * 40}%`, top: -8, width: 20, height: 20, borderRadius: "50%", backgroundColor: THEME.colors.secondary, boxShadow: "0 0 12px #38BDF8" }} />
              </div>
              <span style={{ fontSize: 48, fontWeight: 800, color: THEME.colors.secondary, fontFamily: THEME.fonts.display, transform: `scale(${reviewSpring})`, textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}>
                Review
              </span>
            </div>
          )}
        </div>

        {/* SHAPE 3: DELIVER (Diamond Badge -> Rocket Polygon) */}
        <div
          style={{
            position: "absolute",
            width: card3Width,
            height: card3Height,
            borderRadius: card3Radius,
            backgroundColor: morphProgress > 0.5 ? THEME.colors.accent : THEME.colors.surfaceElevated,
            border: `2px solid rgba(139, 92, 246, 0.6)`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(139, 92, 246, 0.4)`,
            transform: `translate3d(${card3X * (1 - mergeProgress * 0.4)}px, ${card3Y}px, 0) rotateZ(${card3RotateZ * (1 - mergeProgress)}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            transition: "none",
          }}
        >
          {morphProgress < 0.5 ? (
            <FeatureCard title="Deliver Master" subtitle="Automated Client Exports" iconType="deliver" width={340} elevation={0} />
          ) : (
            <div style={{ transform: `rotateZ(${-card3RotateZ * (1 - mergeProgress)}deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 44, fontWeight: 800, color: "#FFF", fontFamily: THEME.fonts.display, transform: `scale(${deliverSpring})`, textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}>
                Deliver
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
