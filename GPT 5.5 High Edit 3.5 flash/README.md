# Orbit Commercial — Remotion

A 25-second premium application commercial for the fictional creative-team app **Orbit**.

- Composition ID: `OrbitCommercial`
- Resolution: `1920x1080`
- Frame rate: `30fps`
- Duration: `750 frames / 25.000s`
- Final render: `out/orbit-commercial.mp4`

## Setup

```bash
pnpm install
```

## Preview

```bash
pnpm preview
# or
pnpm start
```

## Render final MP4

```bash
pnpm render
```

The render script creates a Remotion render and then finalizes the MP4 to exactly `25.000s` using `ffmpeg`.

## Render representative still frames

```bash
pnpm frames
```

Stills are written to `frames/scene1.png` through `frames/scene6.png`.

## Project structure

```text
src/
  components/       Reusable UI, cursor, captions, morphology, lockup
  scenes/           Six timed commercial scenes
  utils/            Deterministic interpolation helpers
  config.ts         Colors, timings, typography and data
  OrbitCommercial.tsx
  Root.tsx
public/audio/       Local synthetic soundtrack
frames/             Representative stills from every scene
out/                Final MP4 output
scripts/            Render finalization helper
```

## Packages used

- `remotion`
- `@remotion/cli`
- `@remotion/renderer`
- `react`
- `react-dom`
- `typescript`

No remote images, copyrighted brand assets, or embedded base64 assets are used.
