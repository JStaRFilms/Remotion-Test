export const THEME = {
  colors: {
    bg: "#0A0B0E",
    surface: "#14161C",
    surfaceElevated: "#1F222B",
    surfaceGlass: "rgba(31, 34, 43, 0.75)",
    primary: "#6366F1",
    primaryGlow: "rgba(99, 102, 241, 0.4)",
    secondary: "#38BDF8",
    secondaryGlow: "rgba(56, 189, 248, 0.4)",
    accent: "#8B5CF6",
    success: "#10B981",
    successGlow: "rgba(16, 185, 129, 0.4)",
    warning: "#F59E0B",
    text: "#FFFFFF",
    textMuted: "#94A3B8",
    textDim: "#64748B",
    border: "rgba(255, 255, 255, 0.12)",
    borderHighlight: "rgba(255, 255, 255, 0.25)",
    borderGlow: "rgba(99, 102, 241, 0.6)",
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  springs: {
    smooth: { damping: 200 }, // No bounce, premium smooth Apple style
    snappy: { damping: 20, stiffness: 200 }, // Immediate responsive UI feedback
    bouncy: { damping: 12, stiffness: 150 }, // Playful pop-in
    heavy: { damping: 25, stiffness: 100, mass: 1.5 }, // Spatial card movement
    spatial: { damping: 30, stiffness: 120, mass: 1.2 }, // 3D camera and card elevation
  },
  timings: {
    fps: 30,
    totalFrames: 750,
    scenes: {
      scene1: { start: 0, duration: 90 },
      scene2: { start: 90, duration: 150 },
      scene3: { start: 240, duration: 150 },
      scene4: { start: 390, duration: 180 },
      scene5: { start: 570, duration: 120 },
      scene6: { start: 690, duration: 60 },
    },
  },
  mockData: {
    projects: [
      { id: "1", title: "Apple Vision Commercial", status: "In Review", progress: 84, team: ["SR", "AL", "MK"] },
      { id: "2", title: "Cyberpunk UI Design System", status: "Approved", progress: 100, team: ["AL", "JD"] },
      { id: "3", title: "Keynote Motion Deck 2026", status: "In Progress", progress: 62, team: ["MK", "SR", "JD"] },
    ],
    comments: [
      { id: "c1", author: "Sarah R.", avatar: "SR", time: "0:14", text: "Drop the color grading slightly in shadows." },
      { id: "c2", author: "Alex L.", avatar: "AL", time: "0:18", text: "Hero transition animation looks incredible!" },
      { id: "c3", author: "Liam K.", avatar: "LK", time: "0:22", text: "Approved for final client presentation." },
    ],
    milestones: [
      { title: "Storyboarding & Animatic", completed: true },
      { title: "3D Spatial Rigging", completed: true },
      { title: "Collaborative Realtime Review", completed: true },
      { title: "Final Master Delivery (4K 60FPS)", completed: true },
    ],
  },
};
