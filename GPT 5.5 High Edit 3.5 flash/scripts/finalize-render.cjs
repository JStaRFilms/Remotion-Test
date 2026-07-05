const { spawnSync } = require('node:child_process');
const { existsSync, unlinkSync } = require('node:fs');
const raw = 'out/orbit-commercial-raw.mp4';
const final = 'out/orbit-commercial.mp4';

const result = spawnSync('ffmpeg', [
  '-y',
  '-i', raw,
  '-t', '25.000',
  '-c:v', 'copy',
  '-c:a', 'aac',
  '-movflags', '+faststart',
  final,
], { stdio: 'inherit' });

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (existsSync(raw)) {
  unlinkSync(raw);
}

console.log(`Finalized exact 25.000s MP4: ${final}`);
