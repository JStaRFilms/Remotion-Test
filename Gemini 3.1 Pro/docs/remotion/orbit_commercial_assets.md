# 🎨 Asset Manifest: Orbit Commercial

## 1. Code-Generatable Components ✅
*All UI components, backgrounds, 3D elements, icons, logos, and avatars are generated 100% programmatically using React, SVG, Lucide React icons, CSS 3D/DOM transforms, and React Three Fiber to ensure deterministic rendering without external file dependencies.*

| Component | Description | Complexity |
|-----------|-------------|------------|
| `OrbitCommercial.tsx` | Main composition orchestrating all 6 scenes using Remotion Sequences | High |
| `Scene1Opening.tsx` | 3D orbital tesseract in space morphing into Orbit application window | High |
| `Scene2Interface.tsx` | Perspective floating AppWindow with animated Cursor click and UI response | High |
| `Scene3Transform.tsx` | UI cards detaching in Z-space and morphing into geometric feature symbols | Medium |
| `Scene4Captions.tsx` | Collaborative review UI with multi-user cursors and dynamic physical captions | High |
| `Scene5Montage.tsx` | Accelerated 5-feature montage with match cuts and orbital progress ring | High |
| `Scene6Lockup.tsx` | Final resolution into Orbit brand symbol and slogan | Medium |
| `AppWindow.tsx` | Reusable layered Orbit UI window with glass borders, sidebar, and content canvas | Medium |
| `Cursor.tsx` | Reusable animated cursor with position interpolation, click compression, and ripple | Low |
| `DynamicCaption.tsx` | Typographic caption blocks that attach to UI elements and transform in 3D space | Medium |
| `FeatureCard.tsx` | Reusable UI card component with depth, drop shadows, and glass styling | Low |
| `BrandLockup.tsx` | Programmatic SVG Orbit planetary emblem and geometric wordmark | Low |
| `CameraRig.tsx` | Reusable 3D / perspective camera container with smooth parallax panning | Medium |
| `theme.ts` | Centralized design system: colors, fonts, spring configs, timings, and mock data | Low |

---

## 2. Image & Audio Assets 📦
*Per the technical requirements: "Use local assets only unless a package is installed properly and remains available during rendering. No remote image URLs. No manually embedded base64 asset dumps."*

All UI avatars are generated as stylized SVG user initials/monograms with gradients.
All icons are rendered cleanly via `lucide-react`.
All background textures are generated using CSS radial/linear gradients and SVG grid patterns.

If audio is provided in `public/audio/music.mp3`, it will be loaded; if absent, the animation remains 100% renderable without errors as required ("If some sound assets are unavailable, keep the project renderable and document the missing optional sounds").

---

## 3. Verification & Compliance Checklist
- [x] 100% programmatic asset generation (no external URL dependencies)
- [x] Fully deterministic frame-based animation
- [x] Zero CSS transitions or Tailwind animation classes
- [x] Strict 30 FPS timing over 750 frames (exactly 25 seconds)
