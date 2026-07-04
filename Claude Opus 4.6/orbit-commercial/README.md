# Orbit Commercial — Remotion Video Project

A cinematic 25-second product showcase for **Orbit**, a fictional creative team collaboration platform. Built with Remotion, React, and TypeScript.

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm

### Setup
```bash
pnpm install
```

### Preview
```bash
pnpm start
# Opens Remotion Studio at http://localhost:3000
```

### Render
```bash
pnpm run render
# Outputs: out/orbit-commercial.mp4
```

### Render Still Frames
```bash
npx remotion still OrbitCommercial frames/scene1.png --frame=45
npx remotion still OrbitCommercial frames/scene2.png --frame=165
npx remotion still OrbitCommercial frames/scene3.png --frame=315
npx remotion still OrbitCommercial frames/scene4.png --frame=480
npx remotion still OrbitCommercial frames/scene5.png --frame=630
npx remotion still OrbitCommercial frames/scene6.png --frame=720
```

## Technical Specs
| Property | Value |
|----------|-------|
| Resolution | 1920 × 1080 |
| Frame Rate | 30 FPS |
| Duration | 25 seconds (750 frames) |
| Composition ID | `OrbitCommercial` |
| Output Format | MP4 |

## Project Structure
```
src/
├── index.ts              # Entry point
├── Root.tsx              # Composition registration
├── OrbitCommercial.tsx   # Main composition (scene orchestrator)
├── config.ts             # Design tokens, colours, timings, springs
├── utils/
│   ├── animations.ts     # Shared animation utilities
│   └── fonts.ts          # Font loading (Inter via Google Fonts)
├── components/
│   ├── CameraRig.tsx     # 3D perspective wrapper
│   ├── Cursor.tsx        # Animated cursor with click effects
│   └── OrbitLogo.tsx     # Brand logo SVG component
└── scenes/
    ├── Scene1Opening.tsx          # Frames 0-89
    ├── Scene2InterfaceReveal.tsx   # Frames 90-239
    ├── Scene3ShapeTransform.tsx    # Frames 240-389
    ├── Scene4DynamicCaptions.tsx   # Frames 390-569
    ├── Scene5Montage.tsx          # Frames 570-689
    └── Scene6BrandLockup.tsx      # Frames 690-749
```

## Packages Used
| Package | Purpose |
|---------|--------|
| `remotion` | Core video framework |
| `@remotion/cli` | CLI for preview and rendering |
| `@remotion/google-fonts` | Type-safe Google Font loading |
| `@remotion/transitions` | Scene transition utilities |
| `react` / `react-dom` | UI framework |
| `zod` | Schema validation |
| `typescript` | Type safety |

## Scenes Overview
1. **Opening** (0-89): Glowing point → logo → app window morph
2. **Interface Reveal** (90-239): 3D app window with cursor interaction
3. **Shape Transform** (240-389): Cards morph to shapes with feature words
4. **Dynamic Captions** (390-569): Spatial captions with review interface
5. **Montage** (570-689): Rapid masked feature panels
6. **Brand Lockup** (690-749): Logo + wordmark + tagline finale
