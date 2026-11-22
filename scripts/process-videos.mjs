import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpeg = require('ffmpeg-static');

const root = 'C:\\Users\\Shani Khan\\OneDrive\\Desktop\\muree-site';
const rawDir = path.join(root, 'raw-videos');
const videosOut = path.join(root, 'public', 'media', 'videos');

fs.mkdirSync(videosOut, { recursive: true });

const rawVideos = [
  { file: 'd.mp4', out: 'clip1.mp4' },
  { file: 'WhatsApp Video 2026-11-22 at 3.04.09 PM.mp4', out: 'clip2.mp4' },
  { file: 'WhatsApp Video 2026-11-22 at 3.04.10 PM.mp4', out: 'clip3.mp4' },
  { file: 'WhatsApp Video 2026-11-22 at 3.04.21 PM.mp4', out: 'clip4.mp4' },
  { file: 'WhatsApp Video 2026-11-22 at 3.04.23 PM.mp4', out: 'clip5.mp4' },
  { file: 'WhatsApp Video 2026-11-22 at 3.56.55 PM.mp4', out: 'clip6.mp4' },
  { file: 'WhatsApp Video 2026-11-22 at 3.56.55 PM (1).mp4', out: 'clip7.mp4' },
];

// Mountain color grading: emerald greens, warm gold tones, sharpened
const colorFilter = [
  'eq=contrast=1.15:brightness=0.02:saturation=1.4',
  'colorbalance=rs=-0.05:gs=0.08:bs=-0.1:rm=-0.05:gm=0.08:bm=-0.1:rh=-0.05:gh=0.1:bh=-0.1',
  'unsharp=5:5:0.8:3:3:0',
].join(',');

for (const v of rawVideos) {
  const input = path.join(rawDir, v.file);
  const output = path.join(videosOut, v.out);
  
  if (!fs.existsSync(input)) {
    console.log(`SKIP: ${v.file} not found`);
    continue;
  }
  
  console.log(`Processing ${v.file} -> ${v.out}...`);
  
  let duration = 30;
  try {
    execSync(`"${ffmpeg}" -i "${input}"`, { encoding: 'utf8' });
  } catch (e) {
    const out = (e.stderr || e.message || '').toString();
    const match = out.match(/Duration: (\d+):(\d+):(\d+)/);
    if (match) {
      duration = parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseInt(match[3]);
    }
  }
  
  const startSec = Math.floor(duration * 0.1);
  const clipLen = Math.min(8, Math.max(1, duration - startSec - 1));
  
  try {
    const cmd = `"${ffmpeg}" -y -ss ${startSec} -i "${input}" -t ${clipLen} -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,${colorFilter}" -c:v libx264 -preset fast -crf 26 -an -movflags +faststart "${output}"`;
    execSync(cmd, { stdio: 'pipe' });
    const size = fs.statSync(output).size;
    console.log(`  OK ${v.out} (${(size/1024/1024).toFixed(1)} MB)`);
  } catch (e) {
    console.error(`  ERR ${v.file}:`, e.message.substring(0, 200));
  }
}

// hero.mp4 = best landscape video (clip3 is longest/most likely scenic)
const bestSrc = path.join(videosOut, 'clip3.mp4');
const clip1Src = path.join(videosOut, 'clip1.mp4');
const heroDst = path.join(videosOut, 'hero.mp4');
const srcForHero = fs.existsSync(bestSrc) ? bestSrc : clip1Src;
if (fs.existsSync(srcForHero)) {
  fs.copyFileSync(srcForHero, heroDst);
  console.log('hero.mp4 created');
}

console.log('\nDone! Videos in public/media/videos:');
fs.readdirSync(videosOut).forEach(f => {
  const size = fs.statSync(path.join(videosOut, f)).size;
  console.log(`  ${f}: ${(size/1024).toFixed(0)} KB`);
});
