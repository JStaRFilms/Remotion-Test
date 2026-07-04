# Orbit — Premium Application Commercial (Remotion)

An Apple-style, high-production 25-second commercial for **Orbit**, an advanced collaborative workspace application for creative teams. Built programmatically with [Remotion v4](https://www.remotion.dev), React 18, TypeScript, and Three.js / React Three Fiber.

---

## 🎬 Master Deliverables

| Asset | Location | Format | Description |
|---|---|---|---|
| **Master Video** | `out/orbit_commercial.mp4` | MP4 (1920x1080 @ 30fps) | Full 25-second high-bitrate commercial render (10.2 MB) |
| **Scene 1 Keyframe** | `frames/scene1_opening.png` | PNG Still (Frame 45) | 3D R3F Orb and "Your work. In motion." typography |
| **Scene 2 Keyframe** | `frames/scene2_interface.png` | PNG Still (Frame 165) | 3D Parallax AppWindow with active cursor approval click |
| **Scene 3 Keyframe** | `frames/scene3_transform.png` | PNG Still (Frame 315) | Detaching interface cards morphing into geometric symbols |
| **Scene 4 Keyframe** | `frames/scene4_captions.png` | PNG Still (Frame 480) | Multi-user collaborative review and attached/split captions |
| **Scene 5 Keyframe** | `frames/scene5_montage.png` | PNG Still (Frame 640) | Rapid feature velocity montage & particle burst completion |
| **Scene 6 Keyframe** | `frames/scene6_lockup.png` | PNG Still (Frame 720) | Planetary emblem lockup and promotional end card |

---

## 💎 Project Specifications

- **Composition ID**: `OrbitCommercial`
- **Duration**: Exactly 750 frames (25.00 seconds)
- **Frame Rate**: 30 FPS
- **Resolution**: 1920x1080 Full HD (Aspect Ratio 16:9)
- **Color Stack**: Deep Obsidian (`#0A0B0E`), Electric Violet (`#6366F1`), Cyan Glow (`#38BDF8`), Surface Charcoal (`#14161C`).
- **Typography**: Display headlines set in geometric **Outfit / Inter**; UI metadata set in monospace numerals.
- **3D Engine**: React Three Fiber via `@remotion/three` `<ThreeCanvas>` and CSS 3D perspective transforms (`CameraRig`).

---

## 🚀 Quickstart & Rendering

### Prerequisites
- Node.js >= 18
- `pnpm` >= 9.0 (Recommended package manager)

### Installation
```bash
pnpm install
```

### Preview in Studio
Launch the real-time Remotion Studio timeline viewer:
```bash
pnpm start
# or
npx remotion preview
```

### Render Full Master Video
Render the complete 25-second MP4 video locally with multi-core concurrency:
```bash
pnpm run build
# or
npx remotion render OrbitCommercial out/orbit_commercial.mp4 --concurrency=4
```

### Capture Documentation Keyframes
To regenerate the still PNG keyframes across all scenes into the `frames/` directory:
```bash
npx remotion still OrbitCommercial frames/scene1_opening.png --frame=45
npx remotion still OrbitCommercial frames/scene2_interface.png --frame=165
npx remotion still OrbitCommercial frames/scene3_transform.png --frame=315
npx remotion still OrbitCommercial frames/scene4_captions.png --frame=480
npx remotion still OrbitCommercial frames/scene5_montage.png --frame=640
npx remotion still OrbitCommercial frames/scene6_lockup.png --frame=720
```

---

## 🏗️ Architecture & Project Structure

```
├── remotion.config.ts          # Remotion configuration with Windows browser auto-detection
├── src/
│   ├── index.ts                # Entry point registering RemotionRoot
│   ├── Root.tsx                # Composition registration (OrbitCommercial @ 750 frames)
│   ├── theme.ts                # Centralized design system tokens, spring configs, color palettes
│   ├── OrbitCommercial.tsx     # Master timeline orchestrating 6 sequential scenes with premounting
│   ├── components/             # Foundational reusable UI building blocks
│   │   ├── AppWindow.tsx       # 3D-styled macOS/spatial application container with header & tabs
│   │   ├── BrandLockup.tsx     # Animated SVG planetary emblem and typography wordmark
│   │   ├── CameraRig.tsx       # Spatial 3D perspective container for camera pans and rotations
│   │   ├── Cursor.tsx          # Interpolated cursor with click compression and radial ripple
│   │   ├── DynamicCaption.tsx  # Physical typography supporting attached, split, and ui-transform modes
│   │   └── FeatureCard.tsx     # Depth-enabled UI cards with status tags and progress indicators
│   └── scenes/                 # 6 dedicated scene modules
│       ├── Scene1Opening.tsx   # Controlled opening (Frames 0–89, 0s–3s)
│       ├── Scene2Interface.tsx # Interface reveal & interaction (Frames 90–239, 3s–8s)
│       ├── Scene3Transform.tsx # Shape transformation (Frames 240–389, 8s–13s)
│       ├── Scene4Captions.tsx  # Collaborative review & captions (Frames 390–569, 13s–19s)
│       ├── Scene5Montage.tsx   # Accelerated feature montage (Frames 570–689, 19s–23s)
│       └── Scene6Lockup.tsx    # Final brand lockup (Frames 690–749, 23s–25s)
├── docs/                       # Architectural specifications and review documentation
│   ├── DESIGN_NOTES.md         # Deep-dive design philosophy and mathematical motion models
│   ├── SELF_REVIEW.md          # Exhaustive self-review against benchmark criteria
│   └── remotion/               # Initial planning spec and asset manifests
└── out/                        # Output folder containing rendered MP4 and stills
```

---

## ⚡ Technical & Motion Engineering Highlights

1. **Strict Determinism**: Every animation across all 750 frames is computed strictly from `useCurrentFrame()`, `useVideoConfig()`, `spring()`, and `interpolate()`. CSS transitions, CSS `@keyframes`, and asynchronous timers are completely forbidden.
2. **Zero-Flicker Sequence Premounting**: All `<Sequence>` blocks in `OrbitCommercial.tsx` use `premountFor={1 * fps}` to ensure components, Three.js meshes, and fonts are fully initialized in browser memory before becoming active.
3. **Physical Spring Models**: Instead of linear tweens, motion velocity follows Apple-style physics using customized damping and stiffness coefficients defined in `theme.ts` (`snappy`, `smooth`, `heavy`, `bouncy`).
4. **Spatial UI & Parallax**: Interfaces float in 3D space with subtle camera rotations (`rotateX`, `rotateY`) and depth separation (`translateZ`), creating a palpable sense of dimensional hardware realism.
5. **Dynamic Typography Integration**: Text is never treated as static subtitles. In Scene 4, captions physically attach to dropped cards, split across collaborative user cursors, and morph directly into interactive UI action buttons (`mode="ui-transform"`).

---

## 📜 License & Copyright
Designed and engineered for Orbit Workspace © 2026. Built with VibeCoding precision and the Vercel/Remotion high-performance stack.
