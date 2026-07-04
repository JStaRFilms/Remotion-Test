import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { THEME } from "../theme";
import { FeatureCard } from "../components/FeatureCard";

export const Scene5Montage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Rapid montage camera acceleration (continuous push forward)
  const cameraScale = interpolate(frame, [0, 120], [1, 1.15], { easing: Easing.in(Easing.quad) });
  const cameraRotateZ = interpolate(frame, [0, 120], [0, 2]);

  // BEAT 1: Project Organisation (Frames 0 - 26)
  const beat1Active = frame < 26;
  const beat1Spring = spring({ frame, fps, config: THEME.springs.snappy });
  const beat1Exit = interpolate(frame, [20, 26], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // BEAT 2: Media Review Split-Screen (Frames 24 - 50)
  const beat2Active = frame >= 24 && frame < 50;
  const beat2Spring = spring({ frame: frame - 24, fps, config: THEME.springs.snappy });
  const beat2Scale = interpolate(beat2Spring, [0, 1], [0.8, 1]);
  const beat2Exit = interpolate(frame, [44, 50], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const penX = interpolate(frame, [26, 46], [-140, 140], { easing: Easing.inOut(Easing.sin) });

  // BEAT 3: Comment & Approval Cascade (Frames 48 - 74)
  const beat3Active = frame >= 48 && frame < 74;
  const beat3Spring = spring({ frame: frame - 48, fps, config: THEME.springs.snappy });
  const beat3Z = interpolate(frame, [48, 74], [600, -200]); // rapid 3D zoom past camera
  const beat3Exit = interpolate(frame, [68, 74], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // BEAT 4: Progress & Analytics Ring (Frames 72 - 98)
  const beat4Active = frame >= 72 && frame < 98;
  const beat4Spring = spring({ frame: frame - 72, fps, config: THEME.springs.snappy });
  const progressValue = Math.min(100, Math.floor(interpolate(frame, [72, 94], [42, 100], { easing: Easing.out(Easing.cubic) })));
  const beat4Exit = interpolate(frame, [92, 98], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // BEAT 5: Successful Completion State & Particle Burst (Frames 96 - 119)
  const beat5Active = frame >= 96;
  const beat5Spring = spring({ frame: frame - 96, fps, config: THEME.springs.bouncy });
  const beat5Scale = interpolate(beat5Spring, [0, 1], [0.3, 1.05]);
  const burstRadius = interpolate(frame, [96, 119], [40, 600], { easing: Easing.out(Easing.exp) });
  const burstOpacity = interpolate(frame, [96, 105, 119], [1, 0.8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
        perspective: "1400px",
      }}
    >
      {/* Dynamic Montage Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)`,
          transform: `scale(${cameraScale}) rotateZ(${cameraRotateZ}deg)`,
          filter: "blur(40px)",
        }}
      />

      {/* BEAT 1: MATRIX KANBAN PROJECT ORGANISATION */}
      {beat1Active && (
        <div
          style={{
            position: "absolute",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            opacity: beat1Exit,
            transform: `scale(${interpolate(beat1Spring, [0, 1], [0.7, 1])})`,
          }}
        >
          {["Vision Campaign", "Cyberpunk OS", "Keynote 2026", "Brand Guidelines", "Spatial UI", "Motion Kit"].map((title, idx) => (
            <FeatureCard
              key={title}
              title={title}
              subtitle={`Project #${idx + 101}`}
              status={idx % 2 === 0 ? "Active" : "Review"}
              iconType="plan"
              width={300}
              scale={1}
              highlighted={idx === 0}
            />
          ))}
        </div>
      )}

      {/* BEAT 2: 4K MEDIA REVIEW SPLIT-SCREEN */}
      {beat2Active && (
        <div
          style={{
            position: "absolute",
            width: 1100,
            height: 640,
            borderRadius: 24,
            backgroundColor: THEME.colors.surface,
            border: `2px solid ${THEME.colors.primaryGlow}`,
            boxShadow: "0 30px 100px rgba(0,0,0,0.9)",
            display: "flex",
            overflow: "hidden",
            opacity: beat2Exit,
            transform: `scale(${beat2Scale})`,
          }}
        >
          <div style={{ flex: 1, backgroundColor: "#0F172A", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", borderRight: `2px solid ${THEME.colors.primary}` }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: THEME.colors.textMuted }}>RAW LOG COLOR</span>
          </div>
          <div style={{ flex: 1, background: `linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#FFF" }}>GRADED MASTER 4K</span>
            {/* Live Annotation Pen Feedback */}
            <div
              style={{
                position: "absolute",
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: THEME.colors.secondary,
                boxShadow: "0 0 20px #38BDF8",
                transform: `translate3d(${penX}px, ${Math.sin(frame * 0.3) * 60}px, 0)`,
              }}
            />
          </div>
        </div>
      )}

      {/* BEAT 3: APPROVAL CHECKMARK CASCADE IN Z-SPACE */}
      {beat3Active && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: beat3Exit,
            transformStyle: "preserve-3d",
            transform: `translate3d(0, 0, ${beat3Z}px)`,
          }}
        >
          <div
            style={{
              padding: "32px 64px",
              borderRadius: 30,
              backgroundColor: THEME.colors.success,
              color: "#FFF",
              fontSize: 64,
              fontWeight: 800,
              fontFamily: THEME.fonts.display,
              boxShadow: "0 0 80px rgba(16, 185, 129, 0.8)",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span>✓</span>
            <span>ALL TEAM APPROVED</span>
          </div>
        </div>
      )}

      {/* BEAT 4: ORBITAL PROGRESS ANALYTICS RING */}
      {beat4Active && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            opacity: beat4Exit,
            transform: `scale(${interpolate(beat4Spring, [0, 1], [0.5, 1])})`,
          }}
        >
          <div style={{ position: "relative", width: 320, height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Outer Progress SVG Ring */}
            <svg width="320" height="320" viewBox="0 0 320 320" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="160" cy="160" r="140" stroke="rgba(255,255,255,0.1)" strokeWidth="16" fill="none" />
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="url(#progressGradient)"
                strokeWidth="16"
                strokeDasharray="880"
                strokeDashoffset={880 - (880 * progressValue) / 100}
                strokeLinecap="round"
                fill="none"
                style={{ filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.8))" }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: "absolute", fontSize: 72, fontWeight: 800, color: "#FFF", fontFamily: THEME.fonts.display }}>
              {progressValue}%
            </div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: THEME.colors.secondary, letterSpacing: 2 }}>
            REALTIME RENDER VELOCITY
          </div>
        </div>
      )}

      {/* BEAT 5: SUCCESSFUL COMPLETION STATE WITH GEOMETRIC BURST */}
      {beat5Active && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                width: 16,
                height: 16,
                borderRadius: idx % 2 === 0 ? "50%" : "4px",
                backgroundColor: idx % 2 === 0 ? THEME.colors.secondary : THEME.colors.primary,
                transform: `
                  rotate(${angle}deg)
                  translate3d(${burstRadius}px, 0, 0)
                  rotate(${-angle}deg)
                `,
                opacity: burstOpacity,
                boxShadow: `0 0 16px ${THEME.colors.secondary}`,
              }}
            />
          ))}

          <div style={{ transform: `scale(${beat5Scale})`, zIndex: 20 }}>
            <FeatureCard
              title="All Milestones Completed"
              subtitle="Ready for Global Production Launch"
              status="100% SHIPPED"
              statusColor={THEME.colors.success}
              iconType="milestone"
              width={460}
              elevation={60}
              highlighted={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};
