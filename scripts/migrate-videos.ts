import fs from 'fs-extra';
import path from 'path';

async function migrateVideos() {
  console.log('🚀 Starting video migration...\n');

  const videoSources = [
    '../isiahudofia.com/assets/videos/',
    '../isiahudofia.com/assets/'
  ];

  const videoTarget = './public/videos/';
  await fs.ensureDir(videoTarget);

  let totalVideos = 0;

  for (const videoSource of videoSources) {
    if (await fs.pathExists(videoSource)) {
      console.log(`📁 Checking ${videoSource}`);

      const files = await fs.readdir(videoSource, { withFileTypes: true });

      for (const file of files) {
        if (file.isFile() && /\.(mp4|mov|webm|avi|mkv)$/i.test(file.name)) {
          const srcPath = path.join(videoSource, file.name);
          const destPath = path.join(videoTarget, file.name);

          await fs.copy(srcPath, destPath);
          totalVideos++;
          console.log(`  ✅ Copied ${file.name}`);
        }
      }
    } else {
      console.log(`  ⚠️  Directory not found: ${videoSource}`);
    }
  }

  if (totalVideos === 0) {
    console.log('  ℹ️  No videos found to migrate');
  } else {
    console.log(`\n📊 Migrated ${totalVideos} video(s)`);
  }

  console.log('\n🎉 Video migration complete!');
}

migrateVideos().catch(console.error);
