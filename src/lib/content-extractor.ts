import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

export class ContentExtractor {
  private originalPath: string;

  constructor(originalSitePath = '../isiahudofia.com') {
    this.originalPath = originalSitePath;
  }

  extractHeroContent() {
    console.log('📝 Extracting hero content...');
    const html = fs.readFileSync(
      path.join(this.originalPath, 'index.html'),
      'utf8'
    );
    const $ = cheerio.load(html);

    // Extract hero section - adapt selectors to your actual HTML structure
    const heroSection = $('.hero_text_wrapper, .hero-section, [data-hero]').first();

    return {
      name: "Isiah Udofia",
      title: $('h1, .hero_title, [data-hero-title]').first().text().trim() ||
             "AI-Native Designer & Developer",
      subtitle: $('.hero_subtitle, [data-hero-subtitle]').first().text().trim() ||
                "Yale Senior | Building intelligent design systems",
      description: $('.hero_description, .hero-text, p').first().text().trim() ||
                   "Portfolio showcasing AI-driven design and development work",
      ctaText: $('a.button, .cta-button, [data-cta]').first().text().trim() || "View Work",
      ctaLink: $('a.button, .cta-button, [data-cta]').first().attr('href') || "#projects"
    };
  }

  extractProjects() {
    console.log('📝 Extracting projects...');

    // Try to read projects.html first, fall back to index.html
    let html: string;
    const projectsPath = path.join(this.originalPath, 'projects.html');
    const indexPath = path.join(this.originalPath, 'index.html');

    if (fs.existsSync(projectsPath)) {
      html = fs.readFileSync(projectsPath, 'utf8');
    } else {
      html = fs.readFileSync(indexPath, 'utf8');
    }

    const $ = cheerio.load(html);

    // Find project items - adapt selectors to your HTML structure
    const projectSelectors = [
      '.project-item',
      '.project_item',
      '[data-project]',
      '.portfolio-item',
      '.work-item'
    ];

    let projects: any[] = [];

    for (const selector of projectSelectors) {
      const items = $(selector);
      if (items.length > 0) {
        projects = items.map((i, el) => {
          const $el = $(el);

          // Extract project data
          const title = $el.find('.project-title, .project_title, h2, h3').first().text().trim();
          const description = $el.find('.project-description, .project_description, p').first().text().trim();
          const image = $el.find('img').first().attr('src') || '';

          // Extract technologies/tags
          const technologies = $el.find('.tech-tag, .technology, .tag, .skill')
            .map((j, tech) => $(tech).text().trim())
            .get()
            .filter(t => t.length > 0);

          // Extract links
          const liveUrl = $el.find('a[href*="http"], .live-link, [data-live-url]')
            .filter((j, link) => !$(link).attr('href')?.includes('github'))
            .first()
            .attr('href') || null;

          const githubUrl = $el.find('a[href*="github"], .github-link, [data-github-url]')
            .first()
            .attr('href') || null;

          return {
            id: i + 1,
            slug: this.generateSlug(title),
            title,
            description,
            image: this.cleanImagePath(image),
            technologies,
            liveUrl,
            githubUrl,
            featured: $el.hasClass('featured') || $el.attr('data-featured') === 'true'
          };
        }).get();

        // Filter out empty projects
        projects = projects.filter(p => p.title && p.title.length > 0);

        if (projects.length > 0) {
          console.log(`  ✅ Found ${projects.length} projects using selector: ${selector}`);
          break;
        }
      }
    }

    if (projects.length === 0) {
      console.warn('  ⚠️  No projects found - manual data entry may be needed');
    }

    return projects;
  }

  extractSkills() {
    console.log('📝 Extracting skills...');

    let html: string;
    const resumePath = path.join(this.originalPath, 'resume.html');
    const indexPath = path.join(this.originalPath, 'index.html');

    if (fs.existsSync(resumePath)) {
      html = fs.readFileSync(resumePath, 'utf8');
    } else {
      html = fs.readFileSync(indexPath, 'utf8');
    }

    const $ = cheerio.load(html);

    const categories: Record<string, string[]> = {};

    // Try different skill section structures
    $('.skills-section, .skill-section, [data-skills], .skills-container').each((i, section) => {
      const $section = $(section);
      const category = $section.find('.category-title, .skill-category, h3, h4').first().text().trim() ||
                       `Category ${i + 1}`;

      const skills = $section.find('.skill-item, .skill, li, .tag')
        .map((j, skill) => $(skill).text().trim())
        .get()
        .filter(s => s.length > 0 && s.length < 50); // Filter out long text

      if (skills.length > 0) {
        categories[category] = skills;
      }
    });

    // If no structured skills found, try to find any skills lists
    if (Object.keys(categories).length === 0) {
      const skillLists = $('ul, ol').filter((i, list) => {
        const $list = $(list);
        const items = $list.find('li');
        // Heuristic: if list has 3-20 short items, probably skills
        return items.length >= 3 && items.length <= 20 &&
               items.first().text().trim().length < 30;
      });

      skillLists.each((i, list) => {
        const $list = $(list);
        const category = $list.prev('h2, h3, h4, strong').text().trim() || `Skills ${i + 1}`;
        const skills = $list.find('li')
          .map((j, skill) => $(skill).text().trim())
          .get()
          .filter(s => s.length > 0);

        if (skills.length > 0) {
          categories[category] = skills;
        }
      });
    }

    if (Object.keys(categories).length === 0) {
      console.warn('  ⚠️  No skills found - manual data entry may be needed');
    } else {
      console.log(`  ✅ Found ${Object.keys(categories).length} skill categories`);
    }

    return categories;
  }

  extractExperience() {
    console.log('📝 Extracting experience...');

    let html: string;
    const resumePath = path.join(this.originalPath, 'resume.html');
    const indexPath = path.join(this.originalPath, 'index.html');

    if (fs.existsSync(resumePath)) {
      html = fs.readFileSync(resumePath, 'utf8');
    } else {
      html = fs.readFileSync(indexPath, 'utf8');
    }

    const $ = cheerio.load(html);

    const experiences = $('.experience-item, .work-item, [data-experience], .job')
      .map((i, el) => {
        const $el = $(el);

        return {
          id: i + 1,
          company: $el.find('.company-name, .company, [data-company], h3, strong').first().text().trim(),
          position: $el.find('.position-title, .position, .role, [data-position]').first().text().trim(),
          location: $el.find('.location, [data-location]').first().text().trim() || null,
          startDate: $el.find('.start-date, [data-start]').first().text().trim(),
          endDate: $el.find('.end-date, [data-end]').first().text().trim() || 'Present',
          description: $el.find('.description, [data-description], p').first().text().trim(),
          achievements: $el.find('.achievement, li')
            .map((j, achievement) => $(achievement).text().trim())
            .get()
            .filter(a => a.length > 0)
        };
      })
      .get()
      .filter(exp => exp.company && exp.company.length > 0);

    if (experiences.length === 0) {
      console.warn('  ⚠️  No experience found - manual data entry may be needed');
    } else {
      console.log(`  ✅ Found ${experiences.length} work experiences`);
    }

    return experiences;
  }

  extractContact() {
    console.log('📝 Extracting contact info...');

    let html: string;
    const infoPath = path.join(this.originalPath, 'info.html');
    const indexPath = path.join(this.originalPath, 'index.html');

    if (fs.existsSync(infoPath)) {
      html = fs.readFileSync(infoPath, 'utf8');
    } else {
      html = fs.readFileSync(indexPath, 'utf8');
    }

    const $ = cheerio.load(html);

    // Extract email
    let email = $('[data-email], .email a, a[href^="mailto:"]')
      .first()
      .text()
      .trim();

    if (!email) {
      const emailHref = $('a[href^="mailto:"]').first().attr('href');
      if (emailHref) {
        email = emailHref.replace('mailto:', '');
      }
    }

    // Extract social links
    const social = {
      linkedin: $('a[href*="linkedin"], [data-linkedin]').first().attr('href') || null,
      github: $('a[href*="github"], [data-github]').first().attr('href') || null,
      twitter: $('a[href*="twitter"], a[href*="x.com"], [data-twitter]').first().attr('href') || null,
      portfolio: null
    };

    const contact = {
      email: email || null,
      phone: $('[data-phone], .phone').first().text().trim() || null,
      location: $('[data-location], .location').first().text().trim() || "New Haven, CT",
      social
    };

    console.log(`  ✅ Contact info extracted`);
    return contact;
  }

  private cleanImagePath(oldPath: string | undefined): string | null {
    if (!oldPath) return null;

    // Convert messy paths to clean ones
    // "./Isiah Udofia – Senior...files/image.jpg" → "/images/projects/image.jpg"
    const filename = path.basename(oldPath);

    // Skip external URLs
    if (oldPath.startsWith('http://') || oldPath.startsWith('https://')) {
      return oldPath;
    }

    return `/images/projects/${filename}`;
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
