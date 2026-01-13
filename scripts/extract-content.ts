import { ContentExtractor } from '../src/lib/content-extractor';
import fs from 'fs-extra';
import path from 'path';

async function extractContent() {
  console.log('🚀 Starting content extraction from old site...\n');

  const extractor = new ContentExtractor('../isiahudofia.com');
  const dataDir = './src/data';

  // Ensure data directory exists
  await fs.ensureDir(dataDir);

  try {
    // Extract hero content
    const hero = extractor.extractHeroContent();
    await fs.writeJSON(path.join(dataDir, 'hero.json'), hero, { spaces: 2 });
    console.log('✅ Hero content saved\n');

    // Extract projects
    const projects = extractor.extractProjects();
    await fs.writeJSON(path.join(dataDir, 'projects.json'), projects, { spaces: 2 });
    console.log('✅ Projects saved\n');

    // Extract skills
    const skills = extractor.extractSkills();
    await fs.writeJSON(path.join(dataDir, 'skills.json'), skills, { spaces: 2 });
    console.log('✅ Skills saved\n');

    // Extract experience
    const experience = extractor.extractExperience();
    await fs.writeJSON(path.join(dataDir, 'experience.json'), experience, { spaces: 2 });
    console.log('✅ Experience saved\n');

    // Extract contact
    const contact = extractor.extractContact();
    await fs.writeJSON(path.join(dataDir, 'contact.json'), contact, { spaces: 2 });
    console.log('✅ Contact info saved\n');

    // Extract education
    const education = extractor.extractEducation();
    await fs.writeJSON(path.join(dataDir, 'education.json'), education, { spaces: 2 });
    console.log('✅ Education saved\n');

    // Summary
    console.log('📊 Extraction Summary:');
    console.log(`  - Hero: ${hero.name}`);
    console.log(`  - Projects: ${projects.length} found`);
    console.log(`  - Skills: ${Object.keys(skills).length} categories`);
    console.log(`  - Experience: ${experience.length} positions`);
    console.log(`  - Education: ${education.length} entries`);
    console.log(`  - Contact: ${contact.email || 'No email found'}`);
    console.log('\n🎉 Content extraction complete!');
    console.log(`📁 Data saved to: ${path.resolve(dataDir)}`);

  } catch (error) {
    console.error('❌ Error during extraction:', error);
    process.exit(1);
  }
}

extractContent();
