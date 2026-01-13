# Phase 4 Backlog - Build Core Components

**Project**: Isiah Udofia Portfolio Migration
**Epic**: Core Component Development
**Version**: 1.0
**Date**: January 12, 2026

---

## Overview

This backlog breaks down Phase 4 (Build Core Components) into actionable GitHub Issues organized by Epic → Story → Task hierarchy. Each issue includes clear acceptance criteria, technical specifications, and integration notes.

**Total Epics**: 4
**Total Stories**: 13
**Estimated Tasks**: 35-40
**Estimated Duration**: 4-5 weeks

---

## Prerequisites (MUST COMPLETE FIRST)

Before creating any GitHub Issues, complete these setup tasks:

1. **Initialize GitHub Repository**
   ```bash
   cd /Users/iudofia/Documents/GitHub/isiahudofia-next
   gh repo create isiahudofia-next --public --source=. --remote=origin --push
   ```

2. **Migrate Assets**
   ```bash
   # Copy all images from ../isiahudofia.com/assets to public/images/
   # See PHASE_4_READINESS_ASSESSMENT.md for detailed commands
   ```

3. **Create Design System Document**
   - Document colors, typography, spacing, animations
   - Update Tailwind config with design tokens
   - Create component type definitions

Once these are complete, create GitHub Issues using the backlog below.

---

## Epic E1: Foundation & Design System

**Priority**: P0 (Critical)
**Business Value**: Establishes consistent design patterns, prevents rework, accelerates all subsequent component development
**Estimated Duration**: 1 week

---

### Story S1.1: Design System Implementation

**Parent**: E1
**Priority**: P0 (Critical)
**Complexity**: M
**Description**: Create comprehensive design system documentation and Tailwind CSS configuration with design tokens extracted from original site

**Acceptance Criteria**:
- [ ] Given the original site CSS, when analyzed, then extract all design tokens (colors, typography, spacing, shadows, border radius)
- [ ] Given a new design system doc, when created at `docs/DESIGN_SYSTEM.md`, then it includes all 7 sections: Colors, Typography, Spacing, Components, Animation, Breakpoints, Effects
- [ ] Given Tailwind config, when updated with custom theme, then all design tokens are configurable via Tailwind utilities
- [ ] Given dark mode, when implemented, then all color tokens have light/dark variants using CSS custom properties or Tailwind dark: prefix
- [ ] Given the design system, when reviewed by stakeholder, then it accurately reflects the original site's visual design

**Integration Notes**:
- Analyze `../isiahudofia.com/index.html` CSS variables and computed styles
- Extract colors: Primary (blue gradient), secondary, backgrounds, text colors
- Extract typography: Headings (font-weight, sizes), body text, captions
- Map Webflow's spacing units to Tailwind's 4px base scale
- Define animation easing functions (match GSAP defaults: power2.out, elastic.out)
- Reference: `tailwind.config.ts` (currently minimal)
- Type definitions needed: Export TypeScript interfaces for design tokens

**Technical Decisions**:
- Color format: HSL for easier dark mode manipulation
- Spacing scale: Tailwind default (4px base)
- Typography: Use system fonts to match original (-apple-system, etc.)
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

**Labels**: `design-system`, `tailwind`, `documentation`, `phase-4a`

---

### Story S1.2: Shared Animation Hooks

**Parent**: E1
**Priority**: P0 (Critical)
**Complexity**: M
**Description**: Create reusable React hooks for GSAP animations to ensure consistent animation patterns and proper cleanup

**Acceptance Criteria**:
- [ ] Given a new `src/hooks/useScrollAnimation.ts`, when created, then it provides scroll-triggered fade-up animations using Intersection Observer
- [ ] Given a new `src/hooks/useTextReveal.ts`, when created, then it implements character-by-character text reveal animations
- [ ] Given a new `src/hooks/useIntersectionObserver.ts`, when created, then it wraps Intersection Observer API for React components
- [ ] Given any animation hook, when used in a component, then animations properly clean up on unmount (no memory leaks)
- [ ] Given animation hooks, when tested, then they work with RefObject or HTMLElement targets
- [ ] Given the hooks, when integrated, then they follow GSAP best practices (will-change, transforms, 60fps)

**Integration Notes**:
- Dependencies: `gsap`, `@gsap/react`, `react`
- Pattern: Return `ref` and `controls` object for flexibility
- Cleanup: Always return cleanup function from useEffect
- Performance: Use `willChange` CSS property, prefer transforms over top/left
- TypeScript: Generic types for flexible element targeting
- Testing: Write unit tests for each hook in `__tests__/hooks/`

**Technical Specifications**:

```typescript
// src/hooks/useScrollAnimation.ts
interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animation?: gsap.TweenVars;
}

interface UseScrollAnimationReturn {
  ref: RefObject<HTMLElement>;
  isVisible: boolean;
  animate: () => void;
}

// src/hooks/useTextReveal.ts
interface UseTextRevealOptions {
  duration?: number;
  stagger?: number;
  ease?: string;
}

// src/hooks/useIntersectionObserver.ts
interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}
```

**Labels**: `hooks`, `animations`, `gsap`, `reusable`, `phase-4a`

---

### Story S1.3: Base Component Library

**Parent**: E1
**Priority**: P1 (High)
**Complexity**: S
**Description**: Create foundational UI components (Button, Card, Container, Grid) that will be reused across all page-level components

**Acceptance Criteria**:
- [ ] Given `src/components/base/Button.tsx`, when created, then it supports variants (primary, secondary, ghost), sizes (sm, md, lg), and proper accessibility (aria-labels, keyboard nav)
- [ ] Given `src/components/base/Card.tsx`, when created, then it provides consistent padding, borders, shadows, and hover states
- [ ] Given `src/components/base/Container.tsx`, when created, then it implements max-width constraints and responsive padding
- [ ] Given `src/components/base/Grid.tsx`, when created, then it provides responsive column layouts (1-4 columns)
- [ ] Given all base components, when exported from `src/components/base/index.ts`, then they can be imported throughout the app
- [ ] Given base components, when tested, then they pass accessibility audits (contrast, keyboard nav, screen reader)

**Integration Notes**:
- Use design system tokens from S1.1
- Support dark mode via Tailwind `dark:` prefix
- TypeScript interfaces for all props
- Example usage in Storybook or test page
- CSS Modules or Tailwind for styling (prefer Tailwind for consistency)

**Component Specifications**:

```typescript
// Button
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string; // If provided, renders as <a>
  children: React.ReactNode;
  onClick?: () => void;
}

// Card
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

// Container
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  className?: string;
}

// Grid
interface GridProps {
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}
```

**Labels**: `components`, `base-components`, `ui`, `reusable`, `phase-4a`

---

## Epic E2: Core UI Components

**Priority**: P0 (Critical)
**Business Value**: Creates the main visual framework and navigation for the entire site
**Estimated Duration**: 1 week

---

### Story S2.1: Hero Section Component

**Parent**: E2
**Priority**: P0 (Critical)
**Complexity**: M
**Description**: Build the homepage Hero section with name, title, location, and call-to-action button, featuring entrance animations

**Acceptance Criteria**:
- [ ] Given `src/components/Hero.tsx`, when created, then it displays the name ("Isiah Udofia"), title ("AI-Native Designer & Developer"), subtitle ("Senior @ Yale University"), and location ("New Haven, CT")
- [ ] Given the Hero component, when mounted, then elements animate in with staggered fade-up effect (name first, then title, then CTA)
- [ ] Given the "Work" CTA button, when clicked, then it smooth scrolls to the contact section
- [ ] Given the Hero, when viewed on mobile, then text scales appropriately and layout remains centered
- [ ] Given the Hero, when tested with `src/data/hero.json`, then it displays all data accurately
- [ ] Given the animations, when played, then they run at 60fps with proper cleanup

**Integration Notes**:
- Data source: `src/data/hero.json` (import and type the data)
- Animation: Use `useScrollAnimation` and custom GSAP timeline
- Responsive: Mobile (text-4xl), tablet (text-5xl), desktop (text-6xl) for name
- Accessibility: Semantic HTML (`<section>`, `<h1>`), proper heading hierarchy
- Styling: Match original site's gradient text effect for name
- Background: Subtle gradient (from-slate-50 to-slate-100 in light mode)

**Component Structure**:
```typescript
interface HeroProps {
  data: HeroData; // From src/data/hero.json
}

// Renders:
// <section className="min-h-screen flex items-center justify-center">
//   <Container>
//     <h1>Name (gradient text)</h1>
//     <p>Title</p>
//     <p>Subtitle</p>
//     <p>Location</p>
//     <Button href={ctaLink}>{ctaText}</Button>
//   </Container>
// </section>
```

**Labels**: `component`, `hero`, `animations`, `phase-4b`

---

### Story S2.2: Navigation Component

**Parent**: E2
**Priority**: P0 (Critical)
**Complexity**: M
**Description**: Build responsive navigation with logo, menu links, and mobile hamburger menu

**Acceptance Criteria**:
- [ ] Given `src/components/Navigation.tsx`, when created, then it displays logo/name and navigation links (Home, Projects, Resume, Contact)
- [ ] Given desktop view, when rendered, then navigation displays as horizontal bar with links
- [ ] Given mobile view (< 768px), when rendered, then navigation shows hamburger icon that opens drawer menu
- [ ] Given a nav link, when clicked, then it smooth scrolls to the corresponding section (or navigates to page)
- [ ] Given the navigation, when scrolled, then it adds shadow/sticky state (if implementing sticky header)
- [ ] Given the mobile menu, when opened, then it has smooth slide-in animation and backdrop blur
- [ ] Given the navigation, when tested, then all links are accessible via keyboard and screen reader

**Integration Notes**:
- Sticky behavior: Consider `sticky top-0 z-50` for fixed positioning
- Active state: Highlight current page/section
- Mobile menu: Use GSAP for slide-in animation or Tailwind transitions
- Smooth scroll: Use CSS `scroll-behavior: smooth` or custom implementation
- Links: Either smooth-scroll to sections (`#projects`) or page routes (`/projects`)
- Accessibility: `aria-label`, `aria-expanded`, proper focus management

**Component Structure**:
```typescript
interface NavigationProps {
  links: NavLink[];
  logo?: string;
}

interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

// Renders:
// <nav className="sticky top-0 z-50">
//   <Container>
//     <Logo />
//     <DesktopNav links={links} />
//     <MobileMenu links={links} />
//   </Container>
// </nav>
```

**Labels**: `component`, `navigation`, `responsive`, `accessibility`, `phase-4b`

---

### Story S2.3: Footer Component

**Parent**: E2
**Priority**: P1 (High)
**Complexity**: XS
**Description**: Build site footer with copyright, social links, and optional sitemap

**Acceptance Criteria**:
- [ ] Given `src/components/Footer.tsx`, when created, then it displays copyright notice and social media links
- [ ] Given social links (GitHub, LinkedIn, Portfolio), when rendered, then they open in new tabs with proper `rel="noopener"`
- [ ] Given the footer, when styled, then it matches the design system (dark background, light text)
- [ ] Given the footer, when on mobile, then links stack vertically
- [ ] Given the footer, when tested, then all links are accessible and have proper hover states

**Integration Notes**:
- Data source: `src/data/contact.json` for social links
- Simple component to build confidence
- Use base Button component for social links
- Consider adding email link in footer

**Labels**: `component`, `footer`, `simple`, `phase-4b`

---

## Epic E3: Content Display Components

**Priority**: P1 (High)
**Business Value**: Displays the main content sections (projects, skills, experience, contact)
**Estimated Duration**: 1-2 weeks

---

### Story S3.1: Project Card Component

**Parent**: E3
**Priority**: P0 (Critical)
**Complexity**: M
**Description**: Build reusable project card component to display project thumbnails, titles, descriptions, and technology tags

**Acceptance Criteria**:
- [ ] Given `src/components/ProjectCard.tsx`, when created, then it displays project image, title, year, description, and technology tags
- [ ] Given the card, when hovered, then it has a subtle scale or shadow animation
- [ ] Given the "View Project" link, when clicked, then it opens the project page (or modal)
- [ ] Given project data from `src/data/projects.json`, when rendered, then both projects (Academic Index, LAMC Painting) display correctly
- [ ] Given the card, when on mobile, then it remains tappable with appropriate touch targets
- [ ] Given the card images, when loaded, then they use Next.js Image component for optimization

**Integration Notes**:
- Data: `src/data/projects.json` (import and type)
- Images: Use `next/image` for optimization and lazy loading
- Technologies: Map to pill-shaped tags
- Hover effect: Scale (1.02) or shadow increase
- Card variant: Use base Card component if applicable
- Responsive: Grid layout (1 col mobile, 2 col tablet, 3 col desktop)

**Component Structure**:
```typescript
interface ProjectCardProps {
  project: Project; // From src/data/projects.json
}

// Renders:
// <Card>
//   <Image src={project.image} alt={project.title} />
//   <h3>{project.title}</h3>
//   <p>{project.year}</p>
//   <p>{project.description}</p>
//   <div>{project.technologies.map(...)}</div>
//   <Button href={project.liveUrl}>View Project</Button>
// </Card>
```

**Labels**: `component`, `project-card`, `content-display`, `phase-4c`

---

### Story S3.2: Projects Section / Grid

**Parent**: E3
**Priority**: P1 (High)
**Complexity**: S
**Description**: Create projects section that displays all projects using ProjectCard components in a responsive grid

**Acceptance Criteria**:
- [ ] Given `src/components/ProjectsSection.tsx`, when created, then it renders a section heading and grid of ProjectCard components
- [ ] Given the section, when scrolled into view, then cards animate in with stagger effect
- [ ] Given both projects from `src/data/projects.json`, when rendered, then they display in the grid
- [ ] Given the grid, when responsive, then it shows 1 column on mobile, 2 on tablet, 3 on desktop
- [ ] Given the section, when styled, then it uses proper spacing and section padding

**Integration Notes**:
- Reuse ProjectCard from S3.1
- Use base Grid component from S1.3
- Animation: Use `useScrollAnimation` for scroll-triggered fade-up
- Data: Import and map over `src/data/projects.json`

**Labels**: `component`, `projects-section`, `grid`, `phase-4c`

---

### Story S3.3: Skills Grid Component

**Parent**: E3
**Priority**: P1 (High)
**Complexity**: M
**Description**: Build skills display component showing categorized skills (Language, Interests, Technical) in a visually appealing grid layout

**Acceptance Criteria**:
- [ ] Given `src/components/SkillsGrid.tsx`, when created, then it displays 3 categories (Language Skills, Interests, Technical Skills) with their items
- [ ] Given the skills data from `src/data/skills.json`, when rendered, then all skills display accurately
- [ ] Given the grid, when styled, then category headings are distinct from skill items
- [ ] Given skill items, when rendered, then they display as tags/pills with consistent styling
- [ ] Given the component, when on mobile, then categories stack vertically
- [ ] Given the component, when scrolled into view, then items animate in with stagger effect

**Integration Notes**:
- Data: `src/data/skills.json`
- Layout: Grid with categories as columns or sections
- Skill items: Pill-shaped tags with hover effects
- Animation: Staggered fade-up for each category
- Colors: Consider color-coding categories or using accent colors

**Component Structure**:
```typescript
interface SkillsGridProps {
  skills: SkillsData; // From src/data/skills.json
}

// Renders:
// <section>
//   <h2>Skills</h2>
//   <Grid cols={3}>
//     <div>
//       <h3>Language Skills</h3>
//       <ul>{skills["Language Skills"].map(...)}</ul>
//     </div>
//     <div>
//       <h3>Interests</h3>
//       <ul>{skills["Interests"].map(...)}</ul>
//     </div>
//     <div>
//       <h3>Technical Skills</h3>
//       <ul>{skills["Technical Skills"].map(...)}</ul>
//     </div>
//   </Grid>
// </section>
```

**Labels**: `component`, `skills`, `grid`, `content-display`, `phase-4c`

---

### Story S3.4: Experience Timeline Component

**Parent**: E3
**Priority**: P1 (High)
**Complexity**: L
**Description**: Build vertical timeline component displaying work experiences with company, position, location, dates, and achievements

**Acceptance Criteria**:
- [ ] Given `src/components/ExperienceTimeline.tsx`, when created, then it displays 3 work experiences in vertical timeline format
- [ ] Given the timeline, when rendered, then each entry shows company, position, location, dates, description, and achievements
- [ ] Given the experience data from `src/data/experience.json`, when rendered, then all 3 experiences (UBS, Bain, Blinds To Go) display accurately
- [ ] Given achievements, when rendered, then they display as bulleted list items
- [ ] Given the timeline, when styled, then it has a vertical line connecting entries with dots/markers
- [ ] Given the component, when on mobile, then the timeline adapts (line moves to left, content stacks)
- [ ] Given the timeline, when scrolled, then entries animate in sequentially

**Integration Notes**:
- Data: `src/data/experience.json`
- Layout: Vertical line with dots (CSS border-left or SVG)
- Responsive: Desktop (line left, content right), Mobile (line left, content full width)
- Animation: Staggered fade-up for each entry
- Typography: Clear hierarchy (company name bold, dates muted)

**Component Structure**:
```typescript
interface ExperienceTimelineProps {
  experiences: Experience[]; // From src/data/experience.json
}

// Renders:
// <section>
//   <h2>Experience</h2>
//   <div className="timeline">
//     {experiences.map(exp => (
//       <div className="timeline-entry">
//         <div className="timeline-dot" />
//         <div className="timeline-content">
//           <h3>{exp.position}</h3>
//           <p>{exp.company}</p>
//           <p>{exp.location} | {exp.startDate} - {exp.endDate}</p>
//           <p>{exp.description}</p>
//           <ul>{exp.achievements.map(...)}</ul>
//         </div>
//       </div>
//     ))}
//   </div>
// </section>
```

**Labels**: `component`, `timeline`, `experience`, `complex`, `phase-4c`

---

### Story S3.5: Education Section Component

**Parent**: E3
**Priority**: P2 (Medium)
**Complexity**: S
**Description**: Build education section displaying Yale University degree, coursework, GPA, and awards

**Acceptance Criteria**:
- [ ] Given `src/components/EducationSection.tsx`, when created, then it displays school, location, degree, graduation date, GPA, coursework, and awards
- [ ] Given the education data from `src/data/education.json`, when rendered, then the Yale entry displays accurately
- [ ] Given coursework, when rendered, then it displays as a list or tags
- [ ] Given awards, when rendered, then they display as a highlighted section or list
- [ ] Given the component, when styled, then it matches the timeline aesthetic (or reuses timeline component)

**Integration Notes**:
- Data: `src/data/education.json`
- Consider reusing ExperienceTimeline with slight modifications
- Or create simpler card-style layout
- Animation: Fade-up on scroll

**Labels**: `component`, `education`, `content-display`, `phase-4c`

---

### Story S3.6: Contact Section Component

**Parent**: E3
**Priority**: P1 (High)
**Complexity**: M
**Description**: Build contact section with email, location, and social media links

**Acceptance Criteria**:
- [ ] Given `src/components/ContactSection.tsx`, when created, then it displays email address, location, and social links (GitHub, LinkedIn, Portfolio)
- [ ] Given the email, when rendered, then it's a clickable `mailto:` link
- [ ] Given social links, when clicked, then they open in new tabs
- [ ] Given the contact data from `src/data/contact.json`, when rendered, then all fields display accurately
- [ ] Given the section, when styled, then it has a call-to-action feel (encourages contact)
- [ ] Given the section, when on mobile, then links stack vertically for easy tapping

**Integration Notes**:
- Data: `src/data/contact.json`
- Icons: Use SVG icons for social links (GitHub, LinkedIn, Email)
- Layout: Centered or grid layout
- Consider adding copy-to-clipboard for email
- Use base Button component for social links

**Labels**: `component`, `contact`, `social-links`, `phase-4c`

---

## Epic E4: Page Integration & Testing

**Priority**: P1 (High)
**Business Value**: Assembles all components into working pages and ensures quality
**Estimated Duration**: 1 week

---

### Story S4.1: Homepage Assembly

**Parent**: E4
**Priority**: P0 (Critical)
**Complexity**: M
**Description**: Assemble the homepage by integrating all sections (Hero, Projects, Skills, Experience, Contact) into the main page component

**Acceptance Criteria**:
- [ ] Given `src/app/page.tsx`, when updated, then it renders Hero, ProjectsSection, SkillsGrid, ExperienceTimeline, and ContactSection
- [ ] Given the homepage, when loaded, then all sections render in correct order with proper spacing
- [ ] Given smooth scrolling, when implemented, then navigation links scroll to corresponding sections
- [ ] Given the page, when tested, then it loads in < 2 seconds on 3G
- [ ] Given the page, when validated, then it has no console errors or warnings
- [ ] Given the page, when tested, then all components render with their animations

**Integration Notes**:
- Update `src/app/page.tsx` to import and render all sections
- Remove placeholder content
- Add section IDs for smooth scrolling (`#projects`, `#skills`, etc.)
- Ensure proper section spacing (padding-y)
- Test performance (Lighthouse, bundle size)

**Labels**: `integration`, `homepage`, `assembly`, `phase-4d`

---

### Story S4.2: Responsive Testing & Fixes

**Parent**: E4
**Priority**: P0 (Critical)
**Complexity**: M
**Description**: Test all components across mobile, tablet, and desktop viewports and fix responsive issues

**Acceptance Criteria**:
- [ ] Given all components, when tested on mobile (375px), then they display correctly without horizontal scroll
- [ ] Given all components, when tested on tablet (768px), then layouts adapt appropriately
- [ ] Given all components, when tested on desktop (1440px), then they use full width effectively
- [ ] Given the homepage, when tested at breakpoints, then no content overlaps or breaks
- [ ] Given navigation, when tested on mobile, then hamburger menu works smoothly
- [ ] Given images, when responsive, then they scale properly and don't overflow

**Integration Notes**:
- Use Chrome DevTools device emulation
- Test on real devices if possible
- Update Tailwind breakpoints if needed
- Fix any z-index or overflow issues
- Ensure touch targets are at least 44x44px

**Labels**: `testing`, `responsive`, `mobile`, `phase-4d`

---

### Story S4.3: E2E Test Updates

**Parent**: E4
**Priority**: P1 (High)
**Complexity**: L
**Description**: Update end-to-end Playwright tests to pass with new components (currently 575 failing E2E tests)

**Acceptance Criteria**:
- [ ] Given the failing E2E tests, when reviewed, then they are categorized into component-specific batches
- [ ] Given component tests, when updated, then they assert correct content from JSON data
- [ ] Given navigation tests, when updated, then they test smooth scrolling and mobile menu
- [ ] Given all E2E tests, when run, then at least 95% pass (548/575)
- [ ] Given critical user flows, when tested, then all pass (homepage navigation, contact, projects)
- [ ] Given tests, when failing, then they have clear error messages for debugging

**Integration Notes**:
- Current E2E tests expect original HTML structure
- Update selectors to target new component classes and IDs
- Update assertions to match JSON data
- Add tests for new features (animations, responsive behavior)
- Run tests in CI/CD pipeline

**Labels**: `testing`, `e2e`, `playwright`, `phase-4d`

---

### Story S4.4: Animation Performance Optimization

**Parent**: E4
**Priority**: P2 (Medium)
**Complexity**: M
**Description**: Optimize animations for performance, ensuring 60fps playback and proper cleanup

**Acceptance Criteria**:
- [ ] Given all animations, when profiled with Chrome DevTools Performance, then they maintain 60fps
- [ ] Given animations, when tested, then they use `willChange` CSS property sparingly
- [ ] Given components, when unmounted, then all GSAP animations properly clean up (no memory leaks)
- [ ] Given the page, when tested with Lighthouse, then Performance score is > 90
- [ ] Given scroll animations, when implemented, then they use Intersection Observer for efficiency
- [ ] Given animations, when on low-end devices, then they gracefully degrade or disable

**Integration Notes**:
- Use Chrome DevTools Performance tab to profile
- Check for layout thrashing (avoid reading/writing DOM in same frame)
- Use `transform` and `opacity` instead of `top`, `left`, `width`, `height`
- Implement `prefers-reduced-motion` media query support
- Test on mobile devices for performance

**Labels**: `optimization`, `performance`, `animations`, `phase-4d`

---

### Story S4.5: Accessibility Audit & Fixes

**Parent**: E4
**Priority**: P1 (High)
**Complexity**: M
**Description**: Conduct accessibility audit and fix issues to ensure WCAG AA compliance

**Acceptance Criteria**:
- [ ] Given all components, when tested with axe DevTools, then they have no critical or serious accessibility issues
- [ ] Given the page, when tested with keyboard, then all interactive elements are focusable and accessible via Tab
- [ ] Given the page, when tested with screen reader, then all content is announced correctly
- [ ] Given images, when rendered, then they have proper alt text
- [ ] Given the page, when tested, then it has proper heading hierarchy (h1 → h2 → h3)
- [ ] Given the page, when validated, then it achieves WCAG AA compliance (Lighthouse Accessibility > 90)

**Integration Notes**:
- Use axe DevTools Chrome extension
- Test with VoiceOver (macOS) or NVDA (Windows)
- Ensure focus indicators are visible
- Add ARIA labels where needed
- Test color contrast ratios (4.5:1 for text)
- Support keyboard navigation throughout

**Labels**: `accessibility`, `a11y`, `wcag`, `phase-4d`

---

## Task Breakdown Examples

Below are example task-level issues for selected stories. Each story should decompose into 2-5 tasks.

### Example Tasks for Story S1.1 (Design System)

#### Task T1.1.1: Extract Color Tokens
**Parent**: S1.1
**Priority**: P0
**Complexity**: XS
**Description**: Extract all color values from original site CSS and document in design system

**Acceptance Criteria**:
- [ ] Given original site CSS, when analyzed, then all color values are documented with hex codes and usage
- [ ] Given colors, when categorized, then they are grouped into: primary, secondary, background, text, accent
- [ ] Given colors, when tested for contrast, then all combinations meet WCAG AA standards

**Integration Notes**: Use Chrome DevTools to inspect computed styles on `index.html`

**Labels**: `design-system`, `colors`, `phase-4a`

---

#### Task T1.1.2: Extract Typography Scale
**Parent**: S1.1
**Priority**: P0
**Complexity**: XS
**Description**: Extract font sizes, weights, line-heights from original site

**Acceptance Criteria**:
- [ ] Given original site typography, when analyzed, then all heading sizes (h1-h6) are documented
- [ ] Given body text, when measured, then font size, line-height, and weight are recorded
- [ ] Given the scale, when documented, then it follows a modular scale (e.g., 1.250 ratio)

**Labels**: `design-system`, `typography`, `phase-4a`

---

#### Task T1.1.3: Update Tailwind Config
**Parent**: S1.1
**Priority**: P0
**Complexity**: S
**Description**: Update `tailwind.config.ts` with extracted design tokens

**Acceptance Criteria**:
- [ ] Given Tailwind config, when updated, then custom colors are defined in `theme.colors`
- [ ] Given Tailwind config, when updated, then custom fonts are defined in `theme.extend.fontSize`
- [ ] Given the config, when tested, then Tailwind generates the expected utility classes

**Integration Notes**: Reference existing `tailwind.config.ts` and extend theme object

**Labels**: `design-system`, `tailwind`, `config`, `phase-4a`

---

### Example Tasks for Story S2.1 (Hero Section)

#### Task T2.1.1: Create Hero Component Structure
**Parent**: S2.1
**Priority**: P0
**Complexity**: S
**Description**: Create base Hero component with static HTML and Tailwind classes

**Acceptance Criteria**:
- [ ] Given `src/components/Hero.tsx`, when created, then it renders name, title, subtitle, location, and CTA
- [ ] Given the component, when styled, then it matches the original site's layout (centered, vertical)
- [ ] Given the component, when rendered, then it uses semantic HTML (`<section>`, `<h1>`)

**Labels**: `component`, `hero`, `structure`, `phase-4b`

---

#### Task T2.1.2: Integrate Hero Data
**Parent**: S2.1
**Priority**: P0
**Complexity**: XS
**Description**: Import and use hero.json data in Hero component

**Acceptance Criteria**:
- [ ] Given `src/data/hero.json`, when imported, then the component uses the data for all text fields
- [ ] Given the component, when rendered, then it displays the exact data from the JSON file
- [ ] Given TypeScript, when configured, then the data is properly typed

**Labels**: `component`, `hero`, `data-integration`, `phase-4b`

---

#### Task T2.1.3: Implement Hero Animations
**Parent**: S2.1
**Priority**: P0
**Complexity**: M
**Description**: Add GSAP animations to Hero component using shared hooks

**Acceptance Criteria**:
- [ ] Given the Hero component, when mounted, then elements animate in with stagger effect
- [ ] Given the animations, when tested, then they run smoothly at 60fps
- [ ] Given the component, when unmounted, then animations properly clean up

**Integration Notes**: Use `useScrollAnimation` or `useTextReveal` from S1.2

**Labels**: `component`, `hero`, `animations`, `gsap`, `phase-4b`

---

## GitHub Issue Creation Template

Use this template when creating issues in GitHub:

```markdown
## [Task/Story/Issue] Title

**Parent**: [Parent Issue Number]
**Priority**: P[0-4]
**Complexity**: [XS/S/M/L/XL]
**Estimated Duration**: [X hours/days]

### Description
[Detailed description of what needs to be done]

### Acceptance Criteria
- [ ] Given [context], when [action], then [outcome]
- [ ] [Additional criteria]
- [ ] [etc.]

### Integration Notes
- [Dependencies]
- [API contracts]
- [Data models]
- [Technical considerations]

### Technical Specifications
```typescript
// Type definitions, interfaces, or code snippets
```

### Labels
`[label1]`, `[label2]`, `[label3]`

### Definition of Done
- [ ] Code written and committed
- [ ] Tests passing
- [ ] No console errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessibility validated
- [ ] Code reviewed (if applicable)
```

---

## Implementation Order

### Sprint 1 (Week 1): Foundation
1. E1: Foundation & Design System
   - S1.1: Design System (3 tasks)
   - S1.2: Shared Hooks (2 tasks)
   - S1.3: Base Components (4 tasks)

### Sprint 2 (Week 2): Core UI
2. E2: Core UI Components
   - S2.2: Navigation (3 tasks) - **Do first, blocks other sections**
   - S2.1: Hero (3 tasks)
   - S2.3: Footer (2 tasks)

### Sprint 3 (Week 3): Content Components
3. E3: Content Display (Part 1)
   - S3.1: Project Card (4 tasks)
   - S3.2: Projects Section (2 tasks)
   - S3.3: Skills Grid (3 tasks)

### Sprint 4 (Week 4): Content Components Continued
4. E3: Content Display (Part 2)
   - S3.4: Experience Timeline (5 tasks)
   - S3.5: Education (2 tasks)
   - S3.6: Contact Section (3 tasks)

### Sprint 5 (Week 5): Integration & Polish
5. E4: Page Integration
   - S4.1: Homepage Assembly (3 tasks)
   - S4.2: Responsive Testing (4 tasks)
   - S4.3: E2E Test Updates (6 tasks)
   - S4.4: Animation Optimization (4 tasks)
   - S4.5: Accessibility Audit (5 tasks)

---

## Metrics & Success Criteria

### Phase 4 Success Metrics
- ✅ All components built and integrated
- ✅ 95%+ E2E tests passing (548/575)
- ✅ Lighthouse score > 90 (Performance, Accessibility, Best Practices)
- ✅ Zero console errors or warnings
- ✅ Responsive on all viewport sizes
- ✅ WCAG AA compliant
- ✅ Animations run at 60fps
- ✅ Bundle size < 200KB (gzipped)

### Velocity Tracking
- Track story points completed per sprint
- Monitor for scope creep
- Adjust estimates if tasks exceed complexity ratings

---

## Risk Register

| Risk | Probability | Impact | Mitigation | Owner |
|------|-------------|--------|------------|-------|
| Asset path mismatches | High | High | Complete asset migration first | S1.1 |
| Design inconsistency | High | Medium | Create design system doc | S1.1 |
| Animation performance issues | Medium | High | Use shared hooks, test early | S1.2, S4.4 |
| Scope creep (perfect animations) | Medium | Medium | Time-box tasks, prioritize MVP | All |
| E2E test failures | High | Medium | Update tests incrementally | S4.3 |
| Responsive gaps | Medium | Medium | Test on real devices | S4.2 |

---

## Dependencies

### External Dependencies
- Original site: `../isiahudofia.com/`
- Design reference: Inspect `index.html`, `resume.html` in browser
- Asset location: `../isiahudofia.com/assets/`

### Internal Dependencies
- S1.1 (Design System) → All other stories
- S1.2 (Shared Hooks) → S2.1, S3.2, S3.3, S3.4
- S1.3 (Base Components) → S2.2, S3.1
- S2.2 (Navigation) → S4.1 (Homepage)
- S3.1 (Project Card) → S3.2 (Projects Section)
- All content components → S4.1 (Homepage Assembly)

---

## Conclusion

This backlog provides a clear, actionable path for Phase 4 implementation. By completing the 3 prerequisites first (Git, Assets, Design System), and then following the dependency-ordered stories, the team can efficiently build all core components while maintaining architectural coherence and quality standards.

**Total Estimated Effort**: 35-40 tasks across 13 stories in 4 epics
**Recommended Team Size**: 1-2 developers
**Recommended Duration**: 4-5 weeks
**Confidence Level**: HIGH (strong foundation, clear requirements)

---

**Next Steps**:
1. ✅ Complete 3 prerequisites (Git repo, asset migration, design system doc)
2. ✅ Create GitHub repository and push code
3. ✅ Create GitHub Issues using this backlog
4. ✅ Begin Sprint 1 with Epic E1

**Prepared by**: Agile Backlog Manager
**Date**: January 12, 2026
**Version**: 1.0
