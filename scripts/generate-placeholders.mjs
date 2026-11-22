import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// Ensure directories exist
['public/media/activities', 'public/media/blogs', 'public/media/flats'].forEach(dir => {
  mkdirSync(path.join(ROOT, dir), { recursive: true });
});

// Generate a mountain gradient JPEG using raw pixel data
async function generateGradient(outputPath, options = {}) {
  const {
    width = 800,
    height = 600,
    r1 = 15, g1 = 36, b1 = 29,   // top color
    r2 = 27, g2 = 59, b2 = 48,   // bottom color
  } = options;

  // Create raw RGB pixel buffer with gradient
  const pixels = Buffer.alloc(width * height * 3);
  
  for (let y = 0; y < height; y++) {
    const t = y / height;
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      
      // Add mountain silhouette in top 60%
      if (y < height * 0.65) {
        // Simple mountain shape using sin waves
        const mountainHeight1 = height * 0.5 * (0.3 + 0.4 * Math.sin(x / width * Math.PI * 2.5));
        const mountainHeight2 = height * 0.6 * (0.4 + 0.3 * Math.sin(x / width * Math.PI * 1.8 + 1));
        const isMountain = y > mountainHeight1 || y > mountainHeight2;
        
        if (isMountain) {
          // Darker mountain color
          pixels[idx] = Math.min(255, r + 10);
          pixels[idx + 1] = Math.min(255, g + 15);
          pixels[idx + 2] = Math.min(255, b + 10);
        } else {
          // Sky - slightly lighter
          pixels[idx] = Math.max(0, r - 5);
          pixels[idx + 1] = Math.max(0, g - 5);
          pixels[idx + 2] = Math.max(0, b + 10);
        }
      } else {
        // Lower area - forest/ground
        const forestNoise = Math.sin(x * 0.1) * 5;
        pixels[idx] = Math.max(0, r - 5 + forestNoise);
        pixels[idx + 1] = Math.max(0, g + forestNoise);
        pixels[idx + 2] = Math.max(0, b - 5);
      }
    }
  }

  await sharp(pixels, {
    raw: { width, height, channels: 3 }
  })
  .jpeg({ quality: 85 })
  .toFile(outputPath);

  console.log('  Created:', path.relative(ROOT, outputPath));
}

const activities = [
  { file: 'horse-riding.jpg', r1: 92, g1: 64, b1: 51, r2: 15, g2: 36, b2: 29 },
  { file: 'chairlift.jpg', r1: 15, g1: 36, b1: 55, r2: 10, g2: 25, b2: 40 },
  { file: 'mall-road.jpg', r1: 27, g1: 59, b1: 48, r2: 15, g2: 36, b2: 29 },
  { file: 'pine-forest.jpg', r1: 10, g1: 40, b1: 20, r2: 5, g2: 20, b2: 10 },
  { file: 'coffee-cafe.jpg', r1: 92, g1: 64, b1: 51, r2: 60, g2: 40, b2: 30 },
  { file: 'valley-view.jpg', r1: 30, g1: 50, b1: 70, r2: 15, g2: 36, b2: 29 },
];

const blogs = [
  { file: 'snowfall-murree.jpg', r1: 50, g1: 70, b1: 100, r2: 20, g2: 30, b2: 60, w: 1200, h: 630 },
  { file: 'pine-forest-life.jpg', r1: 10, g1: 40, b1: 20, r2: 5, g2: 25, b2: 10, w: 1200, h: 630 },
  { file: 'cloud-living.jpg', r1: 60, g1: 80, b1: 110, r2: 20, g2: 40, b2: 60, w: 1200, h: 630 },
  { file: 'weekend-escape.jpg', r1: 27, g1: 59, b1: 48, r2: 15, g2: 36, b2: 29, w: 1200, h: 630 },
];

const flatFallbacks = [
  { file: 'flat1-a.jpg' }, { file: 'flat1-b.jpg' },
  { file: 'flat2-a.jpg' }, { file: 'flat2-b.jpg' },
  { file: 'flat3-a.jpg' }, { file: 'flat3-b.jpg' },
  { file: 'flat4-a.jpg' }, { file: 'flat4-b.jpg' },
  { file: 'flat5-a.jpg' }, { file: 'flat5-b.jpg' },
  { file: 'flat6-a.jpg' }, { file: 'flat6-b.jpg' },
];

// Slight color variations for each flat
const flatColors = [
  { r1: 15, g1: 45, b1: 30, r2: 10, g2: 25, b2: 15 },
  { r1: 20, g1: 40, b1: 25, r2: 15, g2: 30, b2: 20 },
  { r1: 15, g1: 36, b1: 55, r2: 10, g2: 25, b2: 40 },
  { r1: 10, g1: 50, b1: 20, r2: 5, g2: 30, b2: 10 },
  { r1: 92, g1: 64, b1: 51, r2: 60, g2: 40, b2: 30 },
  { r1: 20, g1: 36, b1: 29, r2: 10, g2: 20, b2: 15 },
  { r1: 15, g1: 45, b1: 30, r2: 10, g2: 25, b2: 15 },
  { r1: 20, g1: 40, b1: 25, r2: 15, g2: 30, b2: 20 },
  { r1: 10, g1: 20, b1: 40, r2: 5, g2: 10, b2: 25 },
  { r1: 15, g1: 36, b1: 29, r2: 10, g2: 20, b2: 15 },
  { r1: 92, g1: 64, b1: 51, r2: 60, g2: 40, b2: 30 },
  { r1: 20, g1: 36, b1: 55, r2: 10, g2: 20, b2: 35 },
];

async function main() {
  console.log('🎨 Generating placeholder images...\n');
  console.log('Activities:');
  for (const act of activities) {
    await generateGradient(
      path.join(ROOT, 'public/media/activities', act.file),
      { r1: act.r1, g1: act.g1, b1: act.b1, r2: act.r2, g2: act.g2, b2: act.b2 }
    );
  }

  console.log('\nBlogs:');
  for (const blog of blogs) {
    await generateGradient(
      path.join(ROOT, 'public/media/blogs', blog.file),
      { r1: blog.r1, g1: blog.g1, b1: blog.b1, r2: blog.r2, g2: blog.g2, b2: blog.b2, width: blog.w, height: blog.h }
    );
  }

  console.log('\nFlat images:');
  for (let i = 0; i < flatFallbacks.length; i++) {
    const dest = path.join(ROOT, 'public/media/flats', flatFallbacks[i].file);
    if (!existsSync(dest)) {
      const c = flatColors[i] || flatColors[0];
      await generateGradient(dest, c);
    } else {
      console.log('  Skipped (exists):', flatFallbacks[i].file);
    }
  }

  console.log('\n✅ All placeholder images generated!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
