# Self Review

## Successfully implemented

- Complete Remotion/React/TypeScript project with composition ID `OrbitCommercial`.
- Exact technical format: 1920 × 1080, 30 FPS, 750 frames / 25 seconds.
- Six-scene narrative matching the requested frame ranges.
- Reusable components for the app window, cursor, captions, feature cards, morphing shapes and brand lockup.
- Convincing dimensional motion using CSS perspective, rotation, parallax layers, translateZ-style layering, shadows and highlights.
- Two visible cursor interactions that change the interface state:
  - Review/playback click updates the media review state.
  - Approval/ship click updates the approval/completion state.
- Dynamic captions for:
  - “Drop the idea.”
  - “Shape it together.”
  - “Ship it while it matters.”
- Caption-as-UI moment where “Ship it” becomes a product status component.
- Local audio only: provided BGM plus generated local SFX cues.
- Representative stills rendered for every scene in `frames/`.
- Final MP4 rendered at `out/orbit-commercial.mp4`.

## Review steps performed

1. Installed dependencies with `npm install`.
2. Confirmed TypeScript with `npm run lint`.
3. Confirmed composition availability with `npx remotion compositions src/index.ts`.
4. Rendered representative frames with `npm run render:frames`.
5. Rendered the complete video with `npm run render`.
6. Probed the final MP4 with `ffprobe`:
   - 1920 × 1080
   - 30 FPS
   - 750 frames
   - 25.000 seconds video duration
7. Generated `frames/contact-sheet.jpg` for broad pacing/layout review.

## What changed after reviewing the first render

The first rendered review showed the Scene 2 headline sitting too aggressively over the interface window, creating a hierarchy clash. I revised the composition by:

- Moving the application window slightly to the right.
- Reducing and repositioning the Scene 2 headline.
- Updating cursor path coordinates to stay aligned with the shifted interface interactions.
- Re-rendering the representative frames and final MP4 after the change.

## What remains imperfect

- The UI is a stylised fictional interface, not a fully functional app simulation.
- Some fast montage information is intentionally impressionistic; it communicates feature categories more than detailed workflows.
- True optical motion blur is not used; depth and speed are created with frame-based transforms, glows and shadows.
- The music was selected from the available local library rather than custom-composed for exact beat hits.

## Final status

The project renders successfully and includes all requested deliverables: source project, MP4, README, design notes, self-review and scene stills.
