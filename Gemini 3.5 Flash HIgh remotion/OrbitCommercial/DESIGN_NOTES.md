# Motion Design Notes: Orbit Commercial

## Visual Aesthetic & Directives
The commercial adopts a high-end spatial, tech-focused dark UI aesthetic. 
- **Palette**: Dark primary backgrounds (`#060608`) combined with subtle translucent panes, high-contrast text layers, and neon accents (indigo `#6366f1` and lavender `#a5b4fc`).
- **Typography**: 
  - *Outfit*: Bold, geometric, high-impact display font for main statements and headers.
  - *Inter*: Neutral, ultra-clean sans-serif for secondary interface values and captions.
  - *JetBrains Mono*: Precise, technical, spaced-out code elements for data points, tags, and subtitle metadata.
- **Lighting**: Subtle backdrops of radial indigo glow, glowing cores, and thin neon outlines to establish dimensional depth in 3D perspective space.

## Scene Pacing and Beats
1. **Scene 1 (0s - 3s - Opening)**: High Z-space depth. Begins in empty cosmic grid space with a fast flying glowing core that rushes past the camera, morphing instantly into a clean 3D browser outline. Fades out at the tagline beat: "Your work. In motion."
2. **Scene 2 (3s - 8s - Interface Reveal)**: Transitions to a floating dashboard. Slow continuous camera parallax drift. A cursor glides in smoothly using standard easing, highlights the "Review Files" card, compresses on click, and releases to reveal the media cards grid.
3. **Scene 3 (8s - 13s - Feature Morph)**: Cards detach in Z-space, rotate slightly, fade their placeholders, and morph into three high-contrast feature panels: Plan, Review, and Deliver. Each panel features custom micro-animations (timeline flow drawing, comment nodes popping, and progress bar heights rising).
4. **Scene 4 (13s - 19s - Collaboration)**: Introduces the drag-and-drop mechanism. The caption "Drop the idea" acts as a draggable object, sliding from top-left, carried by the cursor, and dropped on the lane placeholder which morphs instantly into a workspace card. Teammates avatars JD/SL pop speech bubble cues, and "Ship it while it matters" scales in Z-space.
5. **Scene 5 (19s - 23s - Montage)**: Rapid audio-synchronized transitions within a persistent browser frame. The beats trigger sequential stages: stack cards organization, timeline scrubber sweep, radial percentage count up, ending on a cursor click that triggers a successful chime and checkmark.
6. **Scene 6 (23s - 25s - Brand Lockup)**: Seamless resolution into the logo lockup. The Orbit circular emblem and orbiting rings rotate into place, text tracking-out letter-spacing spreads the name "Orbit", and tagline settles to a stable, premium rest state.

## Sound Design Mapping
All effects are layered on separate tracks in `index.html` to prevent overlapping and allow precise control:
- `assets/bgm.mp3`: Unified background electronica/house loop driving the tempo.
- `sfx-whoosh-1`: Fired at `0.0s` to emphasize the grid entrance and core zoom.
- `sfx-click-2`: Fired at `5.5s` synced with the click ripple on "Review Files".
- `sfx-morph-3`: Fired at `8.0s` as cards detach and morph.
- `sfx-whoosh-4`: Fired at `14.5s` during the caption drag-and-drop animation.
- `sfx-click-5a/b/c`: Rapid click feedback at `19.5s`, `20.5s`, and `21.5s` to sync with the montage transitions.
- `sfx-chime-5d`: Green checkmark chime at `22.0s`.
- `sfx-lockup-6`: Final brand logo lockup ping at `23.5s`.
