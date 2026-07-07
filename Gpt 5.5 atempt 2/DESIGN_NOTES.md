# Design Notes

## Creative concept

Orbit is presented as a spatial operating system for creative work: projects, review, collaboration and delivery are treated as objects moving in the same dimensional field. The guiding line is **“Everything your creative team needs, moving together.”**

The visual language is restrained: dark neutral space, bright white type, blue/violet accents, controlled glow and dimensional shadows rather than heavy neon or generic AI particles.

## Scene structure

1. **Controlled opening, frames 0–89**  
   A single glowing point accelerates through a dark perspective grid and resolves into the Orbit interface. The line “Your work. In motion.” sits off-centre and participates as a spatial title.

2. **Interface reveal, frames 90–239**  
   The application window enters with CSS 3D perspective, parallax, layered panels and realistic shadowing. A reusable cursor moves with eased acceleration, clicks playback/review and then approval. Both clicks produce immediate UI state changes.

3. **Shape-to-interface transformation, frames 240–389**  
   Interface cards detach, separate from the product surface, become geometric shapes and reorganise into a new creative-flow dashboard. “Plan”, “Review” and “Deliver” each have a distinct spatial role instead of appearing as static copy.

4. **Dynamic captions and review, frames 390–569**  
   The three required caption phrases travel through the product scene. Captions attach to UI regions, follow the cursor/camera, scale for emphasis and the “Ship it” idea becomes a status component inside the interface.

5. **Accelerated product montage, frames 570–689**  
   A rapid but continuous stack of feature panels shows project organisation, media review, approval, analytics/progress and completion. The panels use match-cut continuity and shared depth rather than unrelated slides.

6. **Final brand lockup, frames 690–749**  
   Movement resolves into an Orbit symbol and wordmark with the line “Everything moves together.” The final card remains visually complete on the last frame.

## Motion system

- Deterministic frame-based animation only.
- Shared helper functions in `src/utils.ts` handle interpolation, easing and path movement.
- Most scene changes use perspective, camera-like pushes and object continuity.
- UI responses use restrained pulses, compression, progress changes and colour-state changes.
- Speed ramps alternate dense movement with short holds to avoid constant motion noise.

## Typography system

The project uses a system UI sans stack with two main roles:

- Large bold display type for scene statements and feature words.
- Smaller uppercase metadata and UI labels for product realism.

Captions are intentionally not bottom subtitles. They are treated as scene objects: chips, UI-adjacent labels, moving typographic blocks and a status component.

## Spatial continuity

Continuity is built by reusing the same visual materials across scenes:

- The opening point becomes the application window.
- App cards detach from the interface and become feature panels/shapes.
- The review interface returns in the caption scene.
- The montage panels continue the card language from the transformation scene.
- The final Orbit symbol echoes the initial point/orbit geometry.

Depth is reinforced through CSS perspective, rotateX/rotateY transforms, translateZ layering, parallax backgrounds, shadows, highlights and cursor placement.

## Audio

The background track is local: `public/audio/orbit-bgm.mp3`, copied from the provided `E:\Assets\Audio` library. UI clicks, whooshes, morphs, impacts and lockup cues were generated as small local WAV files so the render remains self-contained.

## Compromises and limitations

- The app UI is fictional and drawn with React/CSS rather than imported product screenshots.
- Motion blur is simulated through glows, speed trails and fast interpolation rather than true per-object vector blur.
- No external fonts were fetched; the project uses system fonts to keep rendering deterministic and offline-safe.
