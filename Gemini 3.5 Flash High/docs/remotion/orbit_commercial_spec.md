# 🎬 Video Spec: Orbit Commercial

## Overview
| Property | Value |
|----------|-------|
| **Type** | Main Commercial |
| **Duration** | 25 seconds (750 frames @ 30fps) |
| **Resolution** | 1920 × 1080 |
| **FPS** | 30 |
| **Composition ID** | `OrbitCommercial` |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] transitions.md
- [x] text-animations.md
- [x] display-captions.md
- [x] fonts.md
- [x] 3d.md

## Creative Direction
A high-production, dark mode cinematic application commercial for **Orbit**. Orbit helps teams organize projects, review media, collaborate, and track progress. We establish a premium tech aesthetic: deep dark neutral background (`#0B0B0F`), crisp white typography, and vibrant royal blue / purple highlights (`#4F46E5`, `#818CF8`).

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Dark Background | `#0B0B0F` | Main scene environments |
| Card Background | `#161622` | App window and dashboard cards |
| Text Primary | `#FFFFFF` | Headings and titles |
| Text Secondary | `#8E939E` | Subtitles, labels, descriptions |
| Accent Violet | `#6366F1` | Primary branding, buttons, active elements |
| Accent Cyan/Blue | `#38BDF8` | Focus borders, highlights, cursor ripples |
| Success Green | `#34D399` | Completion states, checkmarks |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| Inter | 400 | 24px - 36px | Body, captions, labels |
| Inter | 700 / 800 | 64px - 96px | Premium display titles, key accents |

---

## Scene Breakdown

### Scene 1: Controlled Opening (Frames 0–89)
* **Duration**: 3.0 seconds (90 frames)
* **Visuals**: Start with a deep dark void. A single glowing violet particle rotates in 3D space, accelerates forward, and expands into a dark glowing wireframe card outline.
* **Text**: "Your work. In motion." (staggered letter fade-in with slide-up, starting at frame 20).
* **Animations**:
  * **Particle Intro**: `spring` scale from 0 to 1 (Frames 0-30, damping: 20).
  * **Particle Push**: Z-axis push towards camera (Frames 30-70).
  * **Text Fade/Slide**: `interpolate` from 0 to 1 opacity and 40px to 0px Y-translate (Frames 20-50).
  * **App Window Outline Scale/Reveal**: Outline scales up and opacity fades in (Frames 50-89).

### Scene 2: Interface Reveal (Frames 90–239)
* **Duration**: 5.0 seconds (150 frames)
* **Visuals**: The full Orbit dashboard resolves. The camera slowly pushes in and rotates subtly in 3D perspective (`rotateY` from -6deg to +3deg, `rotateX` from 12deg to 6deg). A cursor enters from bottom-right, speeds towards a "Projects" tab, hovers, and clicks.
* **Interaction**: Hover state glows, click generates a ripple effect and opens an asset review grid.
* **Animations**:
  * **3D perspective tilt**: `interpolate` frame value to angle (Frames 90-239).
  * **Cursor Move**: Bezier ease `interpolate` X/Y coordinates (Frames 100-160).
  * **Cursor Click**: Scale down (Frames 160-168) and scale up (ripple) on click targets.
  * **Grid Panel Reveal**: Spring scale of 4 project thumbnail cards (Frames 170-200, staggered by 5 frames).

### Scene 3: Shape-to-Interface Transformation (Frames 240–389)
* **Duration**: 5.0 seconds (150 frames)
* **Visuals**: One card detaches from the dashboard, floats closer to the camera, and morphs into a series of geometric outlines (circle, square, triangle) which then snap together to form three typographic columns.
* **Text**: Staggered, dynamic entries of:
  * **"Plan"**
  * **"Review"**
  * **"Deliver"**
* **Animations**:
  * **Card Detach**: Spring translateZ / rotateY (Frames 240-270).
  * **Shape Morphing**: Interpolate custom SVG paths (Frames 270-320).
  * **Text reveal**: Staggered scale/slide (Plan: 300-330, Review: 315-345, Deliver: 330-360).

### Scene 4: Dynamic Captions & Collaborative Review (Frames 390–569)
* **Duration**: 6.0 seconds (180 frames)
* **Visuals**: A high-fidelity media preview panel (video/image timeline). A virtual collaborator cursor joins the screen. Captions animate in, tracking near the cursor, before attaching to comments.
* **Timed Captions**:
  * Frame 395 - 440: **"Drop the idea."** (enters from left, follows cursor to the dropzone).
  * Frame 450 - 495: **"Shape it together."** (floats next to the collaborator cursor, then collapses into a chat comment bubble).
  * Frame 505 - 560: **"Ship it while it matters."** (scales up rapidly across the center, pushes the frame back).

### Scene 5: Accelerated Product Montage (Frames 570–689)
* **Duration**: 4.0 seconds (120 frames)
* **Visuals**: Rapid-fire, matched-perspective snapshots of Orbit in action:
  * 570-595: Project checklist items ticking off.
  * 595-620: Interactive progress ring filling up to 100%.
  * 620-645: A green "Approved" badge stamps down with realistic physics.
  * 645-689: Camera zoom-out showing all components flying back into a cohesive, organized ecosystem.

### Scene 6: Final Brand Lockup (Frames 690–749)
* **Duration**: 2.0 seconds (60 frames)
* **Visuals**: Orbit logo (a beautiful geometric central core with surrounding rings) scales down to center. Wordmark "Orbit" fades in.
* **Text**: "Everything moves together."
* **Animations**:
  * **Logo Resolve**: Rings rotate into alignment, center core glows (Frames 690-720).
  * **Wordmark & Subtitle Reveal**: Opacity + scale (Frames 710-740).
  * **Outro deceleration**: A slow camera-pullback keeping the brand card readable to the very last frame.

---

## Technical Requirements

### Props Schema (Zod)
We will make the commercial fully customizable using a Zod schema so the title and highlights can be modified:
```ts
import { z } from "zod";

export const OrbitCommercialSchema = z.object({
  title: z.string().default("Orbit"),
  accentColor: z.string().default("#6366F1"),
});
```

### Critical Rules
- ⛔ **NO CSS transitions/animations or Tailwind animation classes.** All visual timing must be driven by `useCurrentFrame()`.
- ⚡ **Use spring-based physics for spatial motion** and `interpolate()` with `extrapolateRight: 'clamp'` and `extrapolateLeft: 'clamp'` for camera curves.
- 📐 **Set up layout="none"** on sequence hierarchies where required, and ensure clean layers using `AbsoluteFill` and React elements.
- 🎨 **Use loaded fonts** (@remotion/google-fonts) to ensure type is pre-rendered correctly.
