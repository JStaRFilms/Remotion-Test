import {execSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
mkdirSync('frames', {recursive: true});
const frames = [
  ['scene-1-opening', 54],
  ['scene-2-interface', 160],
  ['scene-3-transform', 318],
  ['scene-4-captions', 466],
  ['scene-5-montage', 620],
  ['scene-6-lockup', 724],
];
for (const [name, frame] of frames) {
  console.log(`Rendering ${name} at frame ${frame}`);
  execSync(`npx remotion still src/index.ts OrbitCommercial frames/${name}.png --frame=${frame}`, {stdio: 'inherit', shell: true});
}
