import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

async function migrateImages() {
  console.log('🚀 Starting image migration...\n');

  const assetMappings = [
    {
      from: '../isiahudofia.com/assets/',
      to: './public/images/',
      category: 'general'
    },
    {
      from: '../isiahudofia.com/Isiah Udofia – Senior @ Yale University – New Haven, CT_files/',
      to: './public/images/legacy/',
      category: 'legacy-webflow'
    },
    {
      from: '../isiahudofia.com/template_files/',
      to: './public/images/templates/',
      category: 'templates'
    },
    {
      from: '../isiahudofia.com/Info – Isiah Udofia_files/',
      to: './public/images/info/',
      category: 'info-page'
    }
  ];

  let totalCopied = 0;
  let totalOptimized = 0;

  for (const { from, to, category } of assetMappings) {
    if (await fs.pathExists(from)) {
      console.log(`📁 Processing ${category} assets from ${from}`);

      await fs.ensureDir(to);

      const files = await fs.readdir(from);
      const imageFiles = files.filter(file =>
        /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)
      );

      for (const file of imageFiles) {
        const srcPath = path.join(from, file);
        const destPath = path.join(to, file);

        // Copy original
        await fs.copy(srcPath, destPath);
        totalCopied++;
        console.log(`  ✅ Copied ${file}`);

        // Generate optimized versions for non-SVG images
        if (!/\.svg$/i.test(file) && !/\.gif$/i.test(file)) {
          try {
            await generateOptimizedVersions(srcPath, to, file);
            totalOptimized++;
          } catch (error) {
            console.log(`  ⚠️  Could not optimize ${file}`);
          }
        }
      }

      console.log(`✅ Completed ${category} assets (${imageFiles.length} files)\n`);
    } else {
      console.log(`⚠️  Directory not found: ${from}\n`);
    }
  }

  console.log('📊 Migration Summary:');
  console.log(`  - Images copied: ${totalCopied}`);
  console.log(`  - Images optimized: ${totalOptimized}`);
  console.log('\n🎉 Image migration complete!');
}

async function generateOptimizedVersions(srcPath: string, destDir: string, filename: string) {
  const name = path.parse(filename).name;
  const ext = path.parse(filename).ext;

  try {
    const metadata = await sharp(srcPath).metadata();

    // Generate WebP version
    await sharp(srcPath)
      .webp({ quality: 85 })
      .toFile(path.join(destDir, `${name}.webp`));

    // Generate thumbnail if large image (> 800px wide)
    if (metadata.width && metadata.width > 800) {
      await sharp(srcPath)
        .resize(800, null, { withoutEnlargement: true })
        .toFile(path.join(destDir, `${name}-thumb${ext}`));

      // Also generate WebP thumbnail
      await sharp(srcPath)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(destDir, `${name}-thumb.webp`));
    }

    console.log(`  🎨 Generated optimized versions for ${filename}`);
  } catch (error) {
    throw error;
  }
}

migrateImages().catch(console.error);
