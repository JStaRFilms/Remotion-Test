# Video Spec: Orbit Commercial

## Overview

| Property | Value |
|---|---|
| Type | Application commercial |
| Duration | 25 seconds / 750 frames |
| Resolution | 1920x1080 |
| FPS | 30 |
| Composition ID | `OrbitCommercial` |

## Rules read before implementation

- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] transitions.md
- [x] text-animations.md
- [x] fonts.md
- [x] assets.md
- [x] audio.md
- [x] 3d.md
- [x] display-captions.md

## Creative direction

A premium, dark, spatial product showcase where one glowing point becomes a living creative-team workspace. Interface elements retain continuity as they detach, morph, become captions/UI components, then resolve into the Orbit brand.

## Scene breakdown

| Scene | Frames | Purpose |
|---|---:|---|
| Controlled opening | 0-89 | Establish depth and momentum; show “Your work. In motion.” |
| Interface reveal | 90-239 | Floating app screen, cursor click, UI response |
| Transformation | 240-389 | Cards detach and morph into Plan / Review / Deliver system |
| Captions/demo | 390-569 | Collaborative review with moving captions and UI note transform |
| Montage | 570-689 | Organization, review, analytics, approval and completion |
| Lockup | 690-749 | Orbit symbol, wordmark, final line |

## Technical approach

- Remotion frame-based animation only.
- CSS 3D transforms and perspective for dimensionality.
- Local synthetic audio via `staticFile()`.
- No remote images or copyrighted interface assets.
