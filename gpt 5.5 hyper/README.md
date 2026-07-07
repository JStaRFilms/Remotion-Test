# OrbitCommercial

A 25-second HyperFrames application commercial for the fictional creative-team product **Orbit**.

## Setup

```bash
npm install
```

## Preview

```bash
npm run dev
```

## Validate

```bash
npm run check
```

## Render

```bash
npm run render
```

Final MP4:

```text
dist/OrbitCommercial.mp4
```

## Representative stills

```bash
npm run frames
```

Stills are written to `frames/`.

## Project structure

```text
index.html                  Main HyperFrames composition, 1920x1080, 25s, 30fps
assets/orbit.css            Visual system and component styling
assets/orbit-commercial.js  Timeline source copy used while authoring
assets/vendor/gsap.min.js   Local GSAP runtime copied from npm package
assets/audio/               Local BGM and SFX copied from E:/Assets/Audio
dist/OrbitCommercial.mp4    Final rendered video
frames/                     One representative still per scene
review/                     Contact sheets used for self-review
```

## Packages used

- `hyperframes@0.7.38` through `npx` scripts.
- `gsap@3.14.2`, installed locally and copied into `assets/vendor/` so rendering does not depend on a remote CDN.

## Notes

The composition is exactly 750 video frames at 30fps. Local audio includes one music bed and short UI/whoosh/impact/logo cues from the provided audio folder.
