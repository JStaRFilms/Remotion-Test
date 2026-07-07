(() => {
  const DURATION = 25;
  const sceneTimes = {
    opening: [0, 3],
    interface: [3, 8],
    transform: [8, 13],
    captions: [13, 19],
    montage: [19, 23],
    lockup: [23, 25]
  };

  window.__timelines = window.__timelines || {};

  const sparkPositions = [
    [238, 326], [410, 178], [1518, 232], [1626, 628], [590, 824], [1040, 174],
    [1220, 802], [770, 318], [318, 704], [1438, 846], [1740, 402], [958, 914]
  ];

  const tl = window.__orbitTimeline || gsap.timeline({ paused: true });
  window.__timelines['OrbitCommercial'] = tl;

  function showScene(id, start, end) {
    tl.set(id, { visibility: 'visible', opacity: 1 }, start);
    if (end !== undefined) {
      tl.to(id, { opacity: 0, duration: 0.28, ease: 'power1.inOut' }, end - 0.28);
      tl.set(id, { visibility: 'hidden' }, end);
    }
  }

  function moveCursor(time, x, y, duration = 0.75, ease = 'power3.inOut') {
    tl.to('#cursor', { x, y, duration, ease }, time);
  }

  function click(time) {
    tl.to('#cursor .click-compress', { scale: 0.82, duration: 0.07, transformOrigin: '8px 4px', ease: 'power2.out', overwrite: 'auto' }, time);
    tl.to('#cursor .click-compress', { scale: 1, duration: 0.18, ease: 'back.out(2.4)', overwrite: 'auto' }, time + 0.08);
    tl.fromTo('#cursor-ring', { opacity: 0.9, scale: 0.18 }, { opacity: 0, scale: 1.28, duration: 0.46, ease: 'power2.out' }, time + 0.02);
  }

  showScene('#scene1', sceneTimes.opening[0], 3.05);
  showScene('#scene2', 2.35, 8.08);
  showScene('#scene3', 7.78, 13.08);
  showScene('#scene4', 12.82, 19.15);
  showScene('#scene5', 18.82, 23.15);
  showScene('#scene6', 22.72);
  tl.set("#scene2", { visibility: "hidden" }, 8.08);
  tl.set("#scene3", { visibility: "hidden" }, 13.08);
  tl.set("#scene4", { visibility: "hidden" }, 19.15);
  tl.set("#scene5", { visibility: "hidden" }, 23.15);
  tl.set("#scene6", { visibility: "hidden" }, 25);

  tl.set(['#scene2', '#scene3', '#scene4', '#scene5', '#scene6'], { opacity: 0 }, 0);
  tl.set('#app-wrap', { transformPerspective: 1500, rotationX: 12, rotationY: -22, rotationZ: -2, z: -420, scale: 0.52, opacity: 0 }, 0);
  tl.set('.mini-card', { y: 18, opacity: 0 }, 0);
  tl.set('#cursor', { x: -120, y: 720, opacity: 0, scale: 1 }, 0);
  tl.set('#montage-frame', { transformPerspective: 1300, rotationX: 0, rotationY: 0, scale: 1 }, 0);

  // Scene 1 — controlled opening.
  tl.fromTo('#grid', { opacity: 0 }, { opacity: 0.23, duration: 1.2 }, 0);
  tl.fromTo('#opening-line', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.out' }, 0.28);
  tl.fromTo('#opening-title', { opacity: 0, x: -34, y: 18 }, { opacity: 1, x: 0, y: 0, duration: 0.92, ease: 'power3.out' }, 0.42);
  tl.fromTo('#orbit-ring-a', { opacity: 0, scale: 0.5, rotationZ: -36 }, { opacity: 0.95, scale: 1, rotationZ: 18, duration: 1.0, ease: 'power3.out' }, 0.55);
  tl.fromTo('#orbit-ring-b', { opacity: 0, scale: 0.28, rotationZ: 35 }, { opacity: 0.62, scale: 1, rotationZ: -22, duration: 1.25, ease: 'power3.out' }, 0.72);
  tl.fromTo('#orbital-point', { scale: 0.25, z: -620, x: -120, y: -60, opacity: 0.4 }, { scale: 1.6, z: 120, x: 220, y: 12, opacity: 1, duration: 1.15, ease: 'expo.in' }, 0.9);
  tl.fromTo('#streak-a', { opacity: 0, scaleX: 0.1, x: -320, y: -44 }, { opacity: 0.9, scaleX: 1, x: -35, y: -8, duration: 0.38, ease: 'power2.out' }, 1.62);
  tl.fromTo('#streak-b', { opacity: 0, scaleX: 0.1, x: -260, y: 80 }, { opacity: 0.72, scaleX: 1.2, x: 48, y: 24, duration: 0.42, ease: 'power2.out' }, 1.72);
  tl.to(['#streak-a', '#streak-b', '#orbit-ring-a', '#orbit-ring-b'], { opacity: 0, duration: 0.38, ease: 'power2.in' }, 2.12);
  tl.to('#orbital-point', { scale: 14, opacity: 0, duration: 0.55, ease: 'expo.inOut' }, 2.05);
  tl.to('#opening-title', { opacity: 0, x: -20, duration: 0.36, ease: 'power2.in' }, 2.34);

  // Scene 2 — interface reveal and first cursor interaction.
  tl.to('#app-wrap', { opacity: 1, z: 0, scale: 1, rotationX: 7, rotationY: -12, rotationZ: -1, duration: 1.0, ease: 'expo.out' }, 2.36);
  tl.to('#app-wrap', { rotationX: 3, rotationY: -5, x: 28, y: -10, duration: 2.7, ease: 'power2.inOut' }, 3.38);
  tl.fromTo('#media-card', { y: 42, opacity: 0, z: -40 }, { y: 0, opacity: 1, z: 44, duration: 0.8, ease: 'power3.out' }, 3.08);
  tl.fromTo('#review-panel', { y: 34, opacity: 0, z: -20 }, { y: 0, opacity: 1, z: 74, duration: 0.88, ease: 'power3.out' }, 3.22);
  tl.to('.mini-card', { opacity: 1, y: 0, duration: 0.58, stagger: 0.08, ease: 'power3.out' }, 3.58);
  tl.fromTo('.wave i', { scaleY: 0.35, opacity: 0.35 }, { scaleY: 1, opacity: 0.9, duration: 0.52, stagger: 0.026, ease: 'back.out(1.5)' }, 4.02);
  tl.to('#cursor', { opacity: 1, duration: 0.22 }, 4.18);
  moveCursor(4.18, 1420, 474, 0.9, 'power3.out');
  moveCursor(5.08, 1320, 392, 0.58, 'power2.inOut');
  click(5.66);
  tl.to('#comment-b', { backgroundColor: 'rgba(95,119,255,.18)', duration: 0.22 }, 5.72);
  tl.to('#response-chip', { opacity: 1, y: -2, duration: 0.28, ease: 'back.out(1.8)' }, 5.78);
  tl.to('#sync-status', { backgroundColor: 'rgba(117,139,255,.22)', color: '#ffffff', duration: 0.26 }, 5.84);
  moveCursor(6.2, 1048, 728, 0.75, 'power3.inOut');
  click(6.96);
  tl.to('#mini-review', { y: -10, backgroundColor: 'rgba(140,240,202,.12)', duration: 0.26 }, 7.02);
  tl.to('#mini-review', { y: 0, duration: 0.34, ease: 'elastic.out(1, .55)' }, 7.30);
  tl.to('#app-wrap', { x: -80, y: 16, rotationY: -14, scale: 0.96, duration: 0.72, ease: 'power2.inOut' }, 7.24);

  // Scene 3 — interface cards detach and become a system.
  tl.fromTo(['#card-plan', '#card-review', '#card-deliver'],
    { opacity: 0, y: 210, rotationX: 18, rotationY: -16, scale: 0.72 },
    { opacity: 1, y: 0, rotationX: 0, rotationY: 0, scale: 1, duration: 0.72, stagger: 0.08, ease: 'expo.out' }, 8.0);
  tl.set('#card-plan', { x: 324, y: 245 }, 8.0);
  tl.set('#card-review', { x: 660, y: 438 }, 8.0);
  tl.set('#card-deliver', { x: 1008, y: 252 }, 8.0);
  tl.to('#card-plan', { x: 214, y: 230, rotationZ: -8, duration: 0.85, ease: 'power3.inOut' }, 8.62);
  tl.to('#card-review', { x: 548, y: 268, rotationZ: 5, duration: 0.85, ease: 'power3.inOut' }, 8.68);
  tl.to('#card-deliver', { x: 884, y: 230, rotationZ: 10, duration: 0.85, ease: 'power3.inOut' }, 8.74);
  tl.fromTo('.geo-shape', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.44, stagger: 0.04, ease: 'back.out(2)' }, 9.18);
  tl.to('#shape-a', { x: 260, y: 610, rotationZ: 65, duration: 0.85, ease: 'power3.inOut' }, 9.2);
  tl.to('#shape-b', { x: 590, y: 610, rotationZ: 18, duration: 0.85, ease: 'power3.inOut' }, 9.24);
  tl.to('#shape-c', { x: 888, y: 652, scaleX: 3.2, duration: 0.85, ease: 'power3.inOut' }, 9.28);
  tl.to('#shape-d', { x: 1150, y: 610, rotationZ: -30, duration: 0.85, ease: 'power3.inOut' }, 9.32);
  tl.to('#card-plan', { scale: 0.62, x: 190, y: 140, borderRadius: 34, duration: 0.72, ease: 'power3.inOut' }, 9.74);
  tl.to('#card-review', { scale: 0.62, x: 520, y: 640, borderRadius: 80, duration: 0.72, ease: 'power3.inOut' }, 9.8);
  tl.to('#card-deliver', { scale: 0.62, x: 870, y: 138, borderRadius: 34, duration: 0.72, ease: 'power3.inOut' }, 9.86);
  tl.fromTo('#word-plan', { opacity: 0, x: 140, y: 442 }, { opacity: 1, x: 180, y: 420, duration: 0.52, ease: 'power3.out' }, 9.72);
  tl.fromTo('#word-review', { opacity: 0, x: 595, y: 356, scale: 0.82 }, { opacity: 1, x: 625, y: 352, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, 10.36);
  tl.fromTo('#word-deliver', { opacity: 0, x: 1045, y: 504, scale: 1.14 }, { opacity: 1, x: 1020, y: 500, scale: 1, duration: 0.48, ease: 'power3.out' }, 11.05);
  tl.to(['#word-plan', '#word-review', '#word-deliver'], { y: '+=20', opacity: 0.22, duration: 0.58, stagger: 0.05, ease: 'power2.in' }, 11.8);
  tl.fromTo('#feature-panel', { opacity: 0, x: 160, y: 24, rotationY: -22, scale: 0.78 }, { opacity: 1, x: 0, y: 0, rotationY: 0, scale: 1, duration: 0.86, ease: 'expo.out' }, 11.72);
  tl.to(['#card-plan', '#card-review', '#card-deliver', '.geo-shape'], { opacity: 0, scale: 0.42, duration: 0.45, ease: 'power2.in' }, 12.42);
  tl.to('#feature-panel', { x: -190, y: -24, rotationY: 8, scale: 0.9, opacity: 0, duration: 0.46, ease: 'power2.in' }, 12.62);

  // Scene 4 — dynamic captions behave like UI.
  tl.fromTo('#collab-canvas', { opacity: 0, y: 34, rotationX: 8 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.66, ease: 'power3.out' }, 13.0);
  tl.fromTo('#caption-drop', { opacity: 0, x: -80, y: 28, scale: 0.82 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, 13.18);
  tl.to('#caption-drop .unit:first-child', { x: 150, y: 302, scale: 0.42, duration: 0.72, ease: 'power3.inOut' }, 13.78);
  tl.to('#caption-drop .unit:last-child', { x: 352, y: 270, scale: 0.34, duration: 0.72, ease: 'power3.inOut' }, 13.84);
  tl.to('#caption-drop', { opacity: 0.18, duration: 0.25 }, 14.42);
  tl.to('#idea-comment', { backgroundColor: 'rgba(117,139,255,.18)', duration: 0.25 }, 14.18);
  tl.fromTo('#idea-chip', { opacity: 0, scale: 0.75, y: -14 }, { opacity: 1, scale: 1, y: 0, duration: 0.34, ease: 'back.out(2)' }, 14.36);
  moveCursor(14.0, 925, 590, 0.62, 'power3.inOut');
  click(14.62);
  tl.fromTo('#caption-shape', { opacity: 0, x: 120, y: -36, scale: 0.8 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.54, ease: 'power3.out' }, 15.02);
  tl.to('#caption-shape .unit:first-child', { x: -190, y: 208, scale: 0.48, duration: 0.76, ease: 'power3.inOut' }, 15.58);
  tl.to('#caption-shape .unit:last-child', { x: 285, y: 306, scale: 0.52, duration: 0.76, ease: 'power3.inOut' }, 15.64);
  tl.fromTo('#ui-chip', { opacity: 0, scale: 0.8, y: 8 }, { opacity: 1, scale: 1, y: 0, duration: 0.32, ease: 'back.out(2)' }, 16.05);
  moveCursor(15.45, 1324, 673, 0.72, 'power3.inOut');
  click(16.18);
  tl.fromTo('#approval-card', { opacity: 0, y: 40, rotationY: -18, scale: 0.88 }, { opacity: 1, y: 0, rotationY: 0, scale: 1, duration: 0.58, ease: 'expo.out' }, 16.24);
  tl.to('#caption-shape', { opacity: 0, duration: 0.25 }, 16.62);
  tl.set('#caption-shape', { visibility: 'hidden' }, 16.9);
  tl.fromTo('#caption-ship', { opacity: 0, x: 110, y: 44, scale: 0.82 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.54, ease: 'power3.out' }, 17.05);
  moveCursor(17.38, 1396, 751, 0.72, 'power3.inOut');
  click(18.16);
  tl.to('#approve-btn', { backgroundColor: '#8cf0ca', color: '#0f1320', scale: 0.98, duration: 0.12 }, 18.18);
  tl.to('#approve-btn', { scale: 1, duration: 0.24, ease: 'back.out(2.2)' }, 18.3);
  tl.to('#caption-ship .unit:first-child', { x: -296, y: 119, scale: 0.42, duration: 0.56, ease: 'power3.inOut' }, 18.38);
  tl.to('#caption-ship .unit:last-child', { opacity: 0.2, y: 24, duration: 0.36, ease: 'power2.in' }, 18.58);
  tl.to('#cursor', { opacity: 0, duration: 0.32 }, 18.52);
  tl.to('#collab-canvas', { scale: 0.92, y: -26, opacity: 0.35, duration: 0.5, ease: 'power2.inOut' }, 18.55);

  // Scene 5 — accelerated product montage with one continuous shell.
  tl.fromTo('#montage', { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 18.92);
  const states = ['#state-org', '#state-media', '#state-approval', '#state-analytics', '#state-complete'];
  const starts = [19.05, 19.78, 20.52, 21.22, 22.03];
  states.forEach((state, i) => {
    tl.fromTo(state, { opacity: 0, x: i % 2 ? 90 : -90, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.24, ease: 'power2.out' }, starts[i]);
    if (i < states.length - 1) tl.to(state, { opacity: 0, x: i % 2 ? -70 : 70, scale: 1.02, duration: 0.2, ease: 'power2.in' }, starts[i] + 0.58);
  });
  tl.fromTo('#mask-wipe', { x: '-105%', opacity: 0.0 }, { x: '105%', opacity: 0.28, duration: 0.34, ease: 'power3.inOut' }, 19.72);
  tl.fromTo('#mask-wipe', { x: '-105%', opacity: 0.0 }, { x: '105%', opacity: 0.28, duration: 0.34, ease: 'power3.inOut' }, 20.46);
  tl.fromTo('#mask-wipe', { x: '-105%', opacity: 0.0 }, { x: '105%', opacity: 0.24, duration: 0.32, ease: 'power3.inOut' }, 21.16);
  tl.fromTo('#mask-wipe', { x: '-105%', opacity: 0.0 }, { x: '105%', opacity: 0.2, duration: 0.32, ease: 'power3.inOut' }, 21.96);
  tl.to('#montage-frame', { rotationY: -6, rotationX: 3, scale: 0.98, duration: 1.1, ease: 'power2.inOut' }, 19.2);
  tl.to('#montage-frame', { rotationY: 5, rotationX: -2, scale: 1.02, duration: 1.3, ease: 'power2.inOut' }, 20.35);
  tl.to('#montage-frame', { rotationY: 0, rotationX: 0, scale: 0.84, y: -10, duration: 0.62, ease: 'expo.inOut' }, 22.42);

  // Shared sparkle accents and final brand lockup.
  tl.fromTo('.spark', { opacity: 0, scale: 0 }, { opacity: 0.9, scale: 1, duration: 0.18, stagger: 0.018, ease: 'power2.out' }, 22.45);
  tl.to('.spark', { x: (i) => 960 - sparkPositions[i][0], y: (i) => 540 - sparkPositions[i][1], scale: 0.35, opacity: 0, duration: 0.8, stagger: 0.018, ease: 'expo.inOut' }, 22.86);
  tl.fromTo('#brand-lock', { opacity: 0, scale: 0.76, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 22.95);
  tl.fromTo('#orbit-symbol', { rotation: -36, scale: 0.84 }, { rotation: 0, scale: 1, duration: 0.72, ease: 'back.out(1.4)' }, 22.98);
  tl.to('#end-rule', { scaleX: 1, duration: 0.76, ease: 'expo.out' }, 23.58);
  tl.to('#brand-lock', { scale: 1.018, duration: 0.52, ease: 'sine.inOut' }, 24.12);
  tl.to('#brand-lock', { scale: 1, duration: 0.5, ease: 'sine.inOut' }, 24.64);
  tl.to('#bgm', { volume: 0.16, duration: 1.2, ease: 'power1.inOut' }, 23.6);
})();
