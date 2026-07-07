# Orbit Commercial — Remotion

A 25-second premium application commercial for the fictional creative team product **Orbit**.

- Composition ID: `OrbitCommercial`
- Format: 1920 × 1080, 30 FPS
- Duration: 750 frames / 25 seconds
- Final render: `out/orbit-commercial.mp4`

## Setup

```bash
npm install
```

## Preview

```bash
npm run preview
```

## Render representative frames

```bash
npm run render:frames
```

Still frames are written to `frames/`.

## Render final MP4

```bash
npm run render
```

The MP4 is written to `out/orbit-commercial.mp4`.

## Validate TypeScript

```bash
npm run lint
```

## Project structure

```text
src/
  index.ts                 Remotion entry
  Root.tsx                 Composition registration
  OrbitCommercial.tsx      Scene orchestration and audio placement
  config.ts                Timing, colour, typography and product data
  utils.ts                 Deterministic interpolation helpers
  components/
    AppWindow.tsx          Reusable fictional Orbit UI
    Cursor.tsx             Animated cursor with click compression/ripple
    DynamicCaption.tsx     Spatial caption typography
    FeatureCard.tsx        Cards used in morph and montage scenes
    MorphingShape.tsx      Orbit glyph and transforming shapes
    BrandLockup.tsx        Final symbol and wordmark
public/audio/
  orbit-bgm.mp3            Local music copied from provided audio library
  *.wav                    Generated local UI/SFX cues
frames/                    Representative stills and review contact sheet
out/                       Final MP4 output
```

## Packages used

- `remotion`
- `@remotion/cli`
- `@remotion/renderer`
- `react`
- `react-dom`
- `typescript`

No remote image URLs or base64 asset dumps are used. All audio used by the render is local under `public/audio/`.
