import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

export class ContentExtractor {
  private originalPath: string;

  constructor(originalSitePath = '../isiahudofia.com') {
    this.originalPath = originalSitePath;
  }

  extractHeroContent() {
    console.log('📝 Extracting hero content from index.html...');
    const html = fs.readFileSync(
      path.join(this.originalPath, 'index.html'),
      'utf8'
    );
    const $ = cheerio.load(html);

    // Extract name from home title text - use desktop version only
    // The HTML has both desktop and mobile versions, so we need to be specific
    const firstName = $('.home_title_text.is-desktop').first().text().trim() ||
                      $('.home_title_text').first().text().trim();

    // Get last name from the second title text element (desktop version preferred)
    const lastName = $('.home_title_text.is-desktop').eq(1).text().trim() ||
                     $('.home_title_text').eq(1).text().trim();

    const fullName = `${firstName} ${lastName}`.trim();

    // Extract bio and location from home info text - use desktop version
    const infoTextsDesktop = $('.home_info_text.is-desktop');
    const bioText = infoTextsDesktop.eq(0).text().trim() ||
                   $('.home_info_text').eq(1).text().trim(); // Line 2 has "Senior @"

    const universityText = infoTextsDesktop.eq(1).text().trim() ||
                          $('.home_info_text').eq(2).text().trim(); // Line 3 has "Yale University"

    const locationText = infoTextsDesktop.filter((i, el) => $(el).attr('data-line') === 'location').first().text().trim() ||
                        $('.home_info_text').filter((i, el) => $(el).attr('data-line') === 'location').first().text().trim();

    // Extract CTA button text
    const ctaText = $('.nav_btn_text').first().text().trim() || "Contact";

    return {
      name: fullName || "Isiah Udofia",
      firstName: firstName || "Isiah",
      lastName: lastName || "Udofia",
      title: "AI-Native Designer & Developer",
      subtitle: `${bioText} ${universityText}`.trim() || "Yale Senior | Building intelligent design systems",
      description: `${bioText} ${universityText}`.trim(),
      location: locationText || "New Haven, CT",
      ctaText,
      ctaLink: "#contact"
    };
  }

  extractProjects() {
    console.log('📝 Extracting projects from index.html showcase...');
    // Always extract from index.html showcase since that's where all projects are listed
    return this.extractProjectsFromIndex();
  }

  extractProjectsFromIndex() {
    console.log('📝 Extracting projects from index.html showcase...');
    const html = fs.readFileSync(
      path.join(this.originalPath, 'index.html'),
      'utf8'
    );
    const $ = cheerio.load(html);

    const projects: any[] = [];
    const seenTitles = new Set<string>();

    // Extract from showcase items (both desktop and mobile versions exist, so we need to deduplicate)
    $('.showcase_cms_item').each((i, el) => {
      const $el = $(el);
      // The data-project-title is on the child .showcase_item element, not on .showcase_cms_item
      const $showcaseItem = $el.find('.showcase_item').first();

      const title = $showcaseItem.attr('data-project-title') || '';
      const name = $showcaseItem.attr('data-project-name') || '';
      const year = $showcaseItem.attr('data-project-year') || '';

      // Skip if we've already seen this title (handles duplicate desktop/mobile entries)
      if (!title || seenTitles.has(title)) {
        return;
      }
      seenTitles.add(title);

      // Skip "Coming Soon" placeholders and "About Me" which isn't a project
      if (title === 'Coming Soon' || title === 'About Me' || title === 'Isiah Udofia') {
        return;
      }

      // Extract services (technologies)
      const services = [
        $showcaseItem.attr('data-project-service1'),
        $showcaseItem.attr('data-project-service2'),
        $showcaseItem.attr('data-project-service3')
      ].filter(s => s && s.trim().length > 0 && s !== 'Coming Soon');

      // Extract image
      const image = $el.find('.showcase_img').first().attr('src');

      // Extract link
      const link = $el.find('.showcase_link').first().attr('href');

      // Determine if this is a real project (has a real link, not javascript:void(0))
      const isRealProject = link && !link.startsWith('javascript:');

      projects.push({
        id: projects.length + 1,
        slug: this.generateSlug(title),
        title,
        name,
        year: year || '2025',
        description: `${title}${services.length > 0 ? ` - ${services.join(', ')}` : ''}`,
        image: this.cleanImagePath(image),
        images: image ? [this.cleanImagePath(image)] : [],
        technologies: services,
        liveUrl: isRealProject ? link : null,
        githubUrl: null,
        featured: projects.length < 3 // First 3 real projects are featured
      });
    });

    if (projects.length > 0) {
      console.log(`  ✅ Found ${projects.length} projects from showcase`);
    } else {
      console.warn('  ⚠️  No projects found');
    }

    return projects;
  }

  extractSkills() {
    console.log('📝 Extracting skills from resume.html...');

    const resumePath = path.join(this.originalPath, 'resume.html');

    if (!fs.existsSync(resumePath)) {
      console.warn('  ⚠️  resume.html not found');
      return {};
    }

    const html = fs.readFileSync(resumePath, 'utf8');
    const $ = cheerio.load(html);

    const categories: Record<string, string[]> = {};

    // Find Skills section
    const skillsSection = $('.resume_section')
      .filter((i, el) => $(el).find('h3').text().includes('Skills and Interests'))
      .first();

    if (skillsSection.length > 0) {
      // Extract each skill item
      skillsSection.find('ul > li').each((i, li) => {
        const $li = $(li);
        const text = $li.text().trim();

        // Parse format: "Category: value1, value2, ..."
        const colonIndex = text.indexOf(':');
        if (colonIndex > 0) {
          const category = text.substring(0, colonIndex).trim();
          const values = text.substring(colonIndex + 1)
            .split(',')
            .map(v => v.trim())
            .filter(v => v.length > 0);

          if (values.length > 0) {
            categories[category] = values;
          }
        }
      });

      console.log(`  ✅ Found ${Object.keys(categories).length} skill categories`);
    } else {
      console.warn('  ⚠️  Skills section not found');
    }

    // Also extract technical skills from projects showcase
    const indexHtml = fs.readFileSync(path.join(this.originalPath, 'index.html'), 'utf8');
    const $index = cheerio.load(indexHtml);

    const technicalSkills = new Set<string>();
    $index('.showcase_item[data-project-service1], .showcase_item[data-project-service2], .showcase_item[data-project-service3]').each((i, el) => {
      const $el = $index(el);
      [1, 2, 3].forEach(num => {
        const skill = $el.attr(`data-project-service${num}`);
        // Filter out noise and non-skill items
        if (skill && skill.trim() &&
            !skill.includes('Coming Soon') &&
            !skill.includes('Info Page') &&
            !skill.includes('Senior @') &&
            !skill.includes('Yale University') &&
            !skill.includes('New Haven')) {
          technicalSkills.add(skill.trim());
        }
      });
    });

    if (technicalSkills.size > 0) {
      categories['Technical Skills'] = Array.from(technicalSkills).sort();
    }

    return categories;
  }

  extractExperience() {
    console.log('📝 Extracting experience from resume.html...');

    const resumePath = path.join(this.originalPath, 'resume.html');

    if (!fs.existsSync(resumePath)) {
      console.warn('  ⚠️  resume.html not found');
      return [];
    }

    const html = fs.readFileSync(resumePath, 'utf8');
    const $ = cheerio.load(html);

    const experiences: any[] = [];

    // Find work experience section (usually the second .resume_section)
    const sections = $('.resume_section');

    sections.each((sectionIndex, section) => {
      const $section = $(section);
      const heading = $section.find('h3').first().text().toLowerCase();

      // Look for experience/work section
      if (heading.includes('experience') || heading.includes('work')) {
        // Find all job entries
        $section.find('div[style*="margin-bottom: 20px"]').each((i, jobDiv) => {
          const $job = $(jobDiv);

          // Extract the main paragraph with company, title, location, dates
          const mainP = $job.find('p').first();
          const dateSpan = mainP.find('span[style*="float: right"]');
          const dates = dateSpan.find('strong').text().trim();

          // Remove date span to get company/title/location text
          dateSpan.remove();
          const mainText = mainP.text().trim();

          // Parse: "COMPANY, TITLE, LOCATION"
          const parts = mainText.split(',').map(p => p.trim());
          const company = parts[0]?.replace(/\*\*/g, '') || '';
          const position = parts[1] || '';
          const location = parts[2] || '';

          // Parse dates: "MONTH YEAR - MONTH YEAR"
          const [startDate, endDate] = dates.split('-').map(d => d.trim());

          // Extract achievements
          const achievements = $job.find('ul > li')
            .map((j, li) => $(li).text().trim())
            .get()
            .filter(a => a.length > 0);

          if (company) {
            experiences.push({
              id: i + 1,
              company,
              position,
              location,
              startDate: startDate || '',
              endDate: endDate || 'Present',
              description: achievements.join('. '),
              achievements
            });
          }
        });
      }
    });

    if (experiences.length > 0) {
      console.log(`  ✅ Found ${experiences.length} work experiences`);
    } else {
      console.warn('  ⚠️  No experience found');
    }

    return experiences;
  }

  extractContact() {
    console.log('📝 Extracting contact info from info.html...');

    const infoPath = path.join(this.originalPath, 'info.html');

    if (!fs.existsSync(infoPath)) {
      console.warn('  ⚠️  info.html not found, checking index.html');
      const indexPath = path.join(this.originalPath, 'index.html');
      return this.extractContactFromFile(indexPath);
    }

    return this.extractContactFromFile(infoPath);
  }

  private extractContactFromFile(filePath: string) {
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    // Extract email from data-clipboard attribute
    const email = $('[data-clipboard]').first().attr('data-clipboard') || null;

    // Extract location from info description
    let location = 'New Haven, CT'; // Default
    $('.info_desc_text, .home_info_text').each((i, el) => {
      const text = $(el).text();
      if (text.includes('New Haven') || text.includes('Connecticut')) {
        location = text.match(/New Haven[^.]+/)?.[0] || location;
      }
    });

    // Extract social links
    const social: any = {
      github: null,
      linkedin: null,
      portfolio: null,
      twitter: null
    };

    $('a[href*="github"]').each((i, el) => {
      social.github = $(el).attr('href');
    });

    $('a[href*="linkedin"]').each((i, el) => {
      social.linkedin = $(el).attr('href');
    });

    $('a[href*="zendigital"]').each((i, el) => {
      social.portfolio = $(el).attr('href');
    });

    $('a[href*="twitter"], a[href*="x.com"]').each((i, el) => {
      social.twitter = $(el).attr('href');
    });

    const contact = {
      email,
      phone: null, // Not found on website
      location,
      social
    };

    console.log(`  ✅ Contact info extracted`);
    return contact;
  }

  extractEducation() {
    console.log('📝 Extracting education from resume.html...');

    const resumePath = path.join(this.originalPath, 'resume.html');

    if (!fs.existsSync(resumePath)) {
      console.warn('  ⚠️  resume.html not found');
      return [];
    }

    const html = fs.readFileSync(resumePath, 'utf8');
    const $ = cheerio.load(html);

    const education: any[] = [];

    // Find education section (usually first .resume_section)
    const eduSection = $('.resume_section')
      .filter((i, el) => $(el).find('h3').text().toLowerCase().includes('education'))
      .first();

    if (eduSection.length > 0) {
      eduSection.find('div[style*="margin-bottom"]').each((i, div) => {
        const $div = $(div);

        // Extract school and location
        const mainP = $div.find('p').first();
        const dateSpan = mainP.find('span[style*="float: right"]');
        const graduationDate = dateSpan.find('strong').text().trim();

        dateSpan.remove();
        const schoolText = mainP.text().trim();
        const parts = schoolText.split(',').map(p => p.trim());
        const school = parts[0]?.replace(/\*\*/g, '') || '';
        const location = parts[1] || '';

        // Extract degree
        const degreeP = $div.find('p:nth-of-type(2)');
        const degree = degreeP.text().trim();

        // Extract coursework
        const courseworkP = $div.find('p:nth-of-type(3)');
        const coursework = courseworkP.text().replace('Relevant Coursework:', '').trim();

        // Extract GPA and awards
        const gpaP = $div.find('p:nth-of-type(4)');
        const gpaText = gpaP.text().trim();
        const gpaMatch = gpaText.match(/GPA:\s*([\d.]+)/);
        const gpa = gpaMatch ? gpaMatch[1] : null;
        const awards = gpaText.split('|').slice(1).map(a => a.trim());

        if (school) {
          education.push({
            id: i + 1,
            school,
            location,
            degree,
            graduationDate,
            coursework: coursework.split(',').map(c => c.trim()),
            gpa,
            awards
          });
        }
      });

      console.log(`  ✅ Found ${education.length} education entries`);
    } else {
      console.warn('  ⚠️  Education section not found');
    }

    return education;
  }

  private cleanImagePath(oldPath: string | undefined): string | null {
    if (!oldPath) return null;

    // Skip external URLs
    if (oldPath.startsWith('http://') || oldPath.startsWith('https://')) {
      return oldPath;
    }

    // Convert messy paths to clean ones
    const filename = path.basename(oldPath);
    return `/images/projects/${filename}`;
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
