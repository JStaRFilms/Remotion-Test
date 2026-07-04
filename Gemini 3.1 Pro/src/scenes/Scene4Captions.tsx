import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { THEME } from "../theme";
import { AppWindow } from "../components/AppWindow";
import { DynamicCaption } from "../components/DynamicCaption";
import { Cursor } from "../components/Cursor";
import { FeatureCard } from "../components/FeatureCard";

export const Scene4Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // CAMERA PARALLAX & CONTINUITY
  const cameraRotateY = interpolate(frame, [0, 180], [0, -6], { easing: Easing.inOut(Easing.quad) });
  const cameraScale = interpolate(frame, [0, 180], [1.02, 1.08]);

  // PHASE 1: "Drop the idea." (Local frames 0 - 55)
  // Media asset card dropped from top (-300px to 0px) around frame 10-35
  const dropSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, stiffness: 140 }, // physical drop bounce
  });
  const dropY = interpolate(dropSpring, [0, 1], [-400, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dropOpacity = interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cap1Opacity = interpolate(frame, [8, 15, 50, 56], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // PHASE 2: "Shape it together." (Local frames 56 - 115)
  // Multi-user cursors entering from different angles to shape annotation box
  const shapeProgress = interpolate(frame, [56, 95], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursor1X = interpolate(shapeProgress, [0, 1], [-200, 380]);
  const cursor1Y = interpolate(shapeProgress, [0, 1], [800, 320]);
  
  const cursor2X = interpolate(shapeProgress, [0, 1], [1600, 920]);
  const cursor2Y = interpolate(shapeProgress, [0, 1], [100, 580]);

  const cap2Spring = spring({ frame: frame - 58, fps, config: THEME.springs.bouncy });
  const cap2Scale = interpolate(cap2Spring, [0, 1], [0.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cap2Opacity = interpolate(frame, [58, 66, 108, 115], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Annotation box resizing driven by cursors
  const boxWidth = interpolate(shapeProgress, [0, 1], [280, 540]);
  const boxHeight = interpolate(shapeProgress, [0, 1], [180, 360]);

  // PHASE 3: "Ship it while it matters." (Local frames 116 - 179)
  // Caption enters from Z-depth, scales up with emphasis, then transforms into UI button
  const shipEntry = spring({ frame: frame - 116, fps, config: THEME.springs.smooth });
  const shipTransformProgress = interpolate(frame, [140, 175], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  
  const cap3X = interpolate(shipTransformProgress, [0, 1], [width / 2, 1260]);
  const cap3Y = interpolate(shipTransformProgress, [0, 1], [height / 2 + 40, 68]);
  const cap3Scale = interpolate(shipEntry, [0, 1], [0.5, 1.2]) * (1 - shipTransformProgress * 0.35);
  const cap3Opacity = interpolate(frame, [116, 124], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* AppWindow Container */}
      <AppWindow
        title="Vision Campaign — Collaborative Canvas"
        activeTab="Deliverables"
        scale={cameraScale}
        rotateY={cameraRotateY}
        glowOpacity={0.45}
      >
        <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          
          {/* PHASE 1: Dropped Asset Card with Attached Caption */}
          <div
            style={{
              position: "absolute",
              transform: `translate3d(0, ${dropY}px, 0)`,
              opacity: dropOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              zIndex: 30,
            }}
          >
            <FeatureCard
              title="Creative_Concept_v1.mov"
              subtitle="Dropped onto shared canvas"
              status="Live Sync"
              statusColor={THEME.colors.secondary}
              iconType="video"
              width={380}
              elevation={40}
              scale={1}
            />
            {/* CAPTION 1: ATTACHED TO DROPPED CARD */}
            <div style={{ opacity: cap1Opacity, transform: `scale(${dropSpring})` }}>
              <DynamicCaption
                text="Drop the idea."
                subText="Instant Team Upload"
                mode="attached"
                accentColor={THEME.colors.secondary}
              />
            </div>
          </div>

          {/* PHASE 2: Multi-User Collaborative Resizing & Split Caption */}
          {frame >= 55 && frame <= 116 && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Resizable Annotation Boundary Box */}
              <div
                style={{
                  width: boxWidth,
                  height: boxHeight,
                  borderRadius: 24,
                  border: `2px dashed ${THEME.colors.primary}`,
                  backgroundColor: "rgba(99, 102, 241, 0.08)",
                  boxShadow: "0 0 40px rgba(99, 102, 241, 0.2)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.primary, letterSpacing: 1 }}>
                  SHARED ANNOTATION LAYER
                </div>

                {/* Corner drag handles */}
                <div style={{ position: "absolute", top: -8, left: -8, width: 16, height: 16, borderRadius: "50%", backgroundColor: THEME.colors.primary }} />
                <div style={{ position: "absolute", bottom: -8, right: -8, width: 16, height: 16, borderRadius: "50%", backgroundColor: THEME.colors.secondary }} />
              </div>

              {/* CAPTION 2: SPLIT TYPOGRAPHIC BLOCKS FLOATING BESIDE CURSORS */}
              <div style={{ position: "absolute", left: width / 2 - 200, top: height / 2 - 120, zIndex: 40 }}>
                <DynamicCaption
                  text="Shape it together."
                  mode="split"
                  scale={cap2Scale}
                  opacity={cap2Opacity}
                  accentColor={THEME.colors.primary}
                />
              </div>

              {/* Multi-User Collaborative Cursors */}
              <Cursor x={cursor1X} y={cursor1Y} label="Sarah R." color={THEME.colors.primary} clicking={frame > 75} />
              <Cursor x={cursor2X} y={cursor2Y} label="Liam K." color={THEME.colors.secondary} clicking={frame > 80} />
            </div>
          )}
        </div>
      </AppWindow>

      {/* PHASE 3: CAPTION 3 TRANSFORMING INTO UI BUTTON */}
      {frame >= 115 && (
        <DynamicCaption
          text="Ship it while it matters."
          mode="ui-transform"
          x={cap3X}
          y={cap3Y}
          scale={cap3Scale}
          opacity={cap3Opacity}
          uiTransformProgress={shipTransformProgress}
          rotateZ={interpolate(shipTransformProgress, [0, 1], [-3, 0])}
        />
      )}
    </div>
  );
};
