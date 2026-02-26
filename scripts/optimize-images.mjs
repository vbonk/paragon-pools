/**
 * One-off script to optimize downloaded Wix images for the Next.js site.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { join } from "path";

const RAW = "scripts/scraped-data/raw-images";
const OUT = "public/images";

async function resize(input, output, maxWidth, quality = 80) {
  await sharp(join(RAW, input))
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(join(OUT, output));
  console.log(`  ✓ ${output}`);
}

async function main() {
  // Ensure output dirs exist
  for (const dir of ["hero", "gallery", "logos", "backgrounds"]) {
    await mkdir(join(OUT, dir), { recursive: true });
  }

  console.log("Processing hero images (1920px, q80)...");
  await resize("SNY00655.jpg", "hero/pool-project-1.jpg", 1920, 80);
  await resize("SNY00551.jpg", "hero/pool-project-2.jpg", 1920, 80);
  await resize("DJI_0836.jpg", "hero/pool-aerial-1.jpg", 1920, 80);
  await resize("DJI_0892.jpg", "hero/pool-aerial-2.jpg", 1920, 80);
  await resize("beach-ball-pool.jpg", "hero/beach-ball-pool.jpg", 1920, 80);
  await resize("poolside-chairs.jpg", "hero/poolside-chairs.jpg", 1920, 80);

  console.log("Processing gallery images (800px, q85)...");
  for (let i = 1; i <= 9; i++) {
    await resize(`product-${i}.jpg`, `gallery/product-${i}.jpg`, 800, 85);
  }
  await resize("custom-pool-design.jpg", "gallery/custom-pool-design.jpg", 800, 85);
  await resize("pool-construction.jpg", "gallery/pool-construction.jpg", 800, 85);
  await resize("pool-water.jpg", "gallery/pool-water.jpg", 800, 85);

  console.log("Processing logos (800px, q85)...");
  await resize("latham-dealer.jpg", "logos/latham-dealer.jpg", 800, 85);

  console.log("Processing backgrounds (1920px, q80)...");
  await resize("testimonials-bg.jpg", "backgrounds/testimonials-bg.jpg", 1920, 80);
  await resize("pool-view.jpg", "backgrounds/packages-bg.jpg", 1920, 80);

  console.log("Generating OG image (1200x630)...");
  await sharp(join(RAW, "SNY00655.jpg"))
    .resize({ width: 1200, height: 630, fit: "cover" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile("public/og-image.jpg");
  console.log("  ✓ public/og-image.jpg");

  console.log("\nDone! All images optimized.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
