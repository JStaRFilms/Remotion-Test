# Orbit Application Commercial

A premium, high-production 25-second (750 frames at 30 FPS) spatial commercial for **Orbit**, built using the HyperFrames framework. 

The video showcases Orbit's capabilities: project organization, media reviews, collaboration workspace, and seamless pipeline flow, adhering to high-end design aesthetics (Apple-style premium tech advertisement).

## Project Structure

```
OrbitCommercial/
├── assets/
│   ├── bgm.mp3             # continuous background house track
│   └── sfx/                # precise sound design effects (whooshes, clicks, chime, ping)
├── compositions/
│   ├── scene1_opening.html       # Z-space grid, glowing core, outline window morph
│   ├── scene2_reveal.html        # Floating dashboard, folder click, media card expand
│   ├── scene3_transform.html     # Detaching cards, morphing features (Plan, Review, Deliver)
│   ├── scene4_collaboration.html # Drag-and-drop caption workspace, collaborator avatars
│   ├── scene5_montage.html       # Persistent browser frame, rapid beat timeline sweep, publish chime
│   └── scene6_outro.html         # Circular Orbit logo lockup and brand tagline fade
├── docs/
│   └── features/
│       └── OrbitCommercial.md    # Blueprint and detailed scene timelines
├── frames/                 # Midpoint visual still snapshots
├── index.html              # Main timeline modular orchestrator and audio player
├── package.json            # Scripts configuration
├── STORYBOARD.md           # Frame-by-frame visual and voiceover plans
└── README.md               # Main instructions (this file)
```

## Setup & Commands

All commands should be executed with `pnpm` instead of `npm`.

### 1. Verification and Lints
Run the comprehensive linting, headless Chrome contrast checking, and container layout analysis:
```bash
pnpm run check
```

### 2. Studio Timeline Preview
Open the live timeline editor in Studio to scrub, inspect, or tweak timings interactively:
```bash
npx hyperframes preview
```

### 3. Generate Stills (Snapshots)
Take still checkpoints of scene midpoints to eyeball correctness:
```bash
npx hyperframes snapshot --at 1.5,5.5,10.5,16.0,21.0,24.0
```

### 4. Build/Render Output Video
Render the finalized, production-grade 1080p MP4 file locally:
```bash
pnpm run render
```
*(The output video will be generated at `./OrbitCommercial.mp4`)*
