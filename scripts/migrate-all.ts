import { ContentExtractor } from '../src/lib/content-extractor';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

async function runFullMigration() {
  console.log('🚀 Starting full automated migration...\n');
  console.log('=' .repeat(60));

  const startTime = Date.now();

  try {
    // Step 1: Extract content
    console.log('\n📝 Step 1/5: Extracting content from old site...');
    execSync('npm run extract:content', { stdio: 'inherit' });

    // Step 2: Migrate images
    console.log('\n🖼️  Step 2/5: Migrating images...');
    execSync('npm run migrate:images', { stdio: 'inherit' });

    // Step 3: Migrate videos
    console.log('\n🎥 Step 3/5: Migrating videos...');
    execSync('npm run migrate:videos', { stdio: 'inherit' });

    // Step 4: Copy resume
    console.log('\n📄 Step 4/5: Copying resume...');
    const resumeSrc = '../isiahudofia.com/isiah_udofia_resume.pdf';
    const resumeDest = './public/resume.pdf';

    if (await fs.pathExists(resumeSrc)) {
      await fs.copy(resumeSrc, resumeDest);
      console.log('  ✅ Resume copied to public/resume.pdf');
    } else {
      console.log('  ⚠️  Resume not found at expected location');
    }

    // Step 5: Generate summary
    console.log('\n📊 Step 5/5: Generating migration summary...');
    await generateMigrationSummary();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log('✨ Full migration complete!');
    console.log(`⏱️  Total time: ${duration}s`);
    console.log('='.repeat(60));
    console.log('\n🎉 Ready to start development!');
    console.log('   Run: npm run dev');
    console.log('   Or: npm run dev:compare (to see both sites)\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

async function generateMigrationSummary() {
  const dataDir = './src/data';
  const imagesDir = './public/images';
  const videosDir = './public/videos';

  const summary: any = {
    timestamp: new Date().toISOString(),
    content: {},
    assets: {}
  };

  // Count data files
  if (await fs.pathExists(dataDir)) {
    const dataFiles = await fs.readdir(dataDir);
    summary.content.dataFiles = dataFiles.length;

    for (const file of dataFiles) {
      const data = await fs.readJSON(path.join(dataDir, file));
      const key = path.parse(file).name;

      if (Array.isArray(data)) {
        summary.content[key] = data.length;
      } else if (typeof data === 'object') {
        summary.content[key] = Object.keys(data).length;
      }
    }
  }

  // Count images
  if (await fs.pathExists(imagesDir)) {
    const countImages = async (dir: string): Promise<number> => {
      let count = 0;
      const items = await fs.readdir(dir, { withFileTypes: true });

      for (const item of items) {
        if (item.isDirectory()) {
          count += await countImages(path.join(dir, item.name));
        } else if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(item.name)) {
          count++;
        }
      }

      return count;
    };

    summary.assets.images = await countImages(imagesDir);
  }

  // Count videos
  if (await fs.pathExists(videosDir)) {
    const videoFiles = await fs.readdir(videosDir);
    summary.assets.videos = videoFiles.filter(f =>
      /\.(mp4|mov|webm|avi|mkv)$/i.test(f)
    ).length;
  }

  // Save summary
  await fs.writeJSON('./migration-summary.json', summary, { spaces: 2 });

  console.log('\n  Migration Summary:');
  console.log(`    - Data files: ${summary.content.dataFiles || 0}`);
  console.log(`    - Projects: ${summary.content.projects || 0}`);
  console.log(`    - Skills categories: ${summary.content.skills || 0}`);
  console.log(`    - Work experiences: ${summary.content.experience || 0}`);
  console.log(`    - Images: ${summary.assets.images || 0}`);
  console.log(`    - Videos: ${summary.assets.videos || 0}`);
  console.log(`\n  ✅ Summary saved to migration-summary.json`);
}

runFullMigration();
