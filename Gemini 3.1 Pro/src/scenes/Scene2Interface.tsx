import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { THEME } from "../theme";
import { AppWindow } from "../components/AppWindow";
import { Cursor } from "../components/Cursor";
import { FeatureCard } from "../components/FeatureCard";

export const Scene2Interface: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Camera Parallax & Perspective rotation over 150 frames
  const cameraRotateY = interpolate(frame, [0, 150], [-12, 0], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraRotateX = interpolate(frame, [0, 150], [8, 3], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraScale = interpolate(frame, [0, 150], [0.94, 1.05], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor interpolation from bottom right to the Approve button
  // Start: x=1100, y=700 -> Move to Approve button at x=860, y=420 around frame 35-60
  const cursorMoveProgress = interpolate(frame, [25, 65], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorX = interpolate(cursorMoveProgress, [0, 1], [1150, 860]);
  const cursorY = interpolate(cursorMoveProgress, [0, 1], [680, 395]);

  // Click timing around frame 68-78
  const isClicking = frame >= 68 && frame <= 74;
  const clickProgress = interpolate(frame, [68, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // UI Response: Status change after click (frame >= 73)
  const isApproved = frame >= 73;
  const statusSpring = spring({
    frame: isApproved ? frame - 73 : 0,
    fps,
    config: THEME.springs.snappy,
  });

  // Notification Banner slide in after approval
  const bannerSpring = spring({
    frame: frame - 78,
    fps,
    config: THEME.springs.bouncy,
  });
  const bannerTranslateY = interpolate(bannerSpring, [0, 1], [-80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bannerOpacity = interpolate(bannerSpring, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
      {/* Background Lighting Glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Floating AppWindow with Parallax Camera */}
      <AppWindow
        title="Vision Campaign — Media Review"
        activeTab="Review"
        scale={cameraScale}
        rotateX={cameraRotateX}
        rotateY={cameraRotateY}
        glowOpacity={isApproved ? 0.6 : 0.3}
      >
        <div style={{ display: "flex", gap: 32, height: "100%", position: "relative" }}>
          {/* Left Hero Media Player Card */}
          <div
            style={{
              flex: 1.3,
              backgroundColor: "rgba(10, 11, 14, 0.8)",
              borderRadius: 16,
              border: `1px solid ${THEME.colors.border}`,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Video preview canvas simulation */}
            <div
              style={{
                flex: 1,
                borderRadius: 12,
                background: `linear-gradient(135deg, #1E1B4B 0%, #0F172A 50%, #0A0B0E 100%)`,
                border: `1px solid rgba(255,255,255,0.08)`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* Animated orbital rings simulation inside video canvas */}
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  border: `2px dashed ${THEME.colors.primary}`,
                  transform: `rotate(${frame * 1.5}deg)`,
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#FFF",
                  letterSpacing: 1,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  padding: "8px 18px",
                  borderRadius: 20,
                  backdropFilter: "blur(8px)",
                }}
              >
                Vision_Master_4K.mov
              </div>
            </div>

            {/* Timeline Scrub Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 13, color: THEME.colors.textMuted, fontFamily: THEME.fonts.mono }}>00:14:08</div>
              <div style={{ flex: 1, height: 6, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 3, position: "relative" }}>
                <div style={{ width: `${60 + Math.sin(frame * 0.05) * 15}%`, height: "100%", backgroundColor: THEME.colors.secondary, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 13, color: THEME.colors.textMuted, fontFamily: THEME.fonts.mono }}>00:25:00</div>
            </div>
          </div>

          {/* Right Action Sidebar & Approval Card */}
          <div style={{ flex: 0.9, display: "flex", flexDirection: "column", gap: 20 }}>
            <FeatureCard
              title="Approve Master Delivery"
              subtitle="Ready for Apple client review"
              status={isApproved ? "Approved" : "In Review"}
              statusColor={isApproved ? THEME.colors.success : THEME.colors.warning}
              iconType="deliver"
              width={340}
              highlighted={isApproved}
              scale={1 + statusSpring * 0.04}
            />

            <FeatureCard
              title="Color Grading v3"
              subtitle="Shadows adjusted per Sarah's note"
              status="Completed"
              statusColor={THEME.colors.secondary}
              progress={100}
              iconType="video"
              width={340}
            />

            {/* Action Approve Button */}
            <div
              style={{
                marginTop: "auto",
                padding: "16px 24px",
                borderRadius: 14,
                backgroundColor: isApproved ? THEME.colors.success : THEME.colors.primary,
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: isApproved
                  ? `0 10px 30px rgba(16, 185, 129, 0.5)`
                  : `0 10px 30px rgba(99, 102, 241, 0.5)`,
                border: `1px solid rgba(255,255,255,0.2)`,
                transform: `scale(${isClicking ? 0.94 : 1})`,
              }}
            >
              <span>{isApproved ? "✓ Master Approved" : "Approve Delivery"}</span>
            </div>
          </div>

          {/* Slide-down Notification Banner inside AppWindow */}
          {frame > 75 && (
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 24,
                padding: "14px 24px",
                borderRadius: 16,
                backgroundColor: "rgba(16, 185, 129, 0.95)",
                color: "#FFF",
                fontWeight: 700,
                fontSize: 14,
                boxShadow: "0 16px 30px rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transform: `translate3d(0, ${bannerTranslateY}px, 0)`,
                opacity: bannerOpacity,
                zIndex: 50,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#FFF" }} />
              <span>Team notified: Asset locked for production!</span>
            </div>
          )}
        </div>
      </AppWindow>

      {/* Animated Cursor */}
      <Cursor
        x={cursorX}
        y={cursorY}
        clicking={isClicking}
        clickProgress={clickProgress}
        label="Alex L."
        color={THEME.colors.secondary}
      />
    </div>
  );
};
