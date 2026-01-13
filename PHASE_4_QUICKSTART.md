# Phase 4 Quick Start Guide

**Purpose**: Step-by-step instructions to begin Phase 4 development

---

## Step 1: Initialize GitHub Repository (5 minutes)

```bash
# Navigate to project
cd /Users/iudofia/Documents/GitHub/isiahudofia-next

# Create GitHub repository and push
gh repo create isiahudofia-next --public --source=. --remote=origin --push

# Verify remote is added
git remote -v

# Create main branch tracking
git branch -M main
```

**Expected Output**:
```
✓ Created repository iudofia2026/isiahudofia-next on GitHub
✓ Added remote origin
✓ Pushed commits to GitHub
```

---

## Step 2: Migrate Assets (10 minutes)

```bash
# Create directory structure
mkdir -p public/images/projects
mkdir -p public/images/icons
mkdir -p public/images/screenshots
mkdir -p public/videos

# Copy project images
cp ../isiahudofia.com/assets/academicindexbanner.png public/images/projects/
cp ../isiahudofia.com/assets/lamc-thumbnail.png public/images/projects/

# Copy project screenshots
cp -r ../isiahudofia.com/assets/academic_screenshots public/images/projects/
cp -r ../isiahudofia.com/assets/lamc_screenshots public/images/projects/

# Copy icons
cp ../isiahudofia.com/assets/favicon-*.png public/images/icons/
cp ../isiahudofia.com/assets/apple-touch-icon.png public/images/icons/
cp ../isiahudofia.com/assets/isiah-i-icon.jpeg public/images/icons/

# Copy videos (if needed)
# cp -r ../isiahudofia.com/assets/videos public/

# Verify files copied
ls -la public/images/projects/
ls -la public/images/icons/

# Commit assets
git add public/
git commit -m "Migrate assets from original site"
git push origin main
```

**Expected Result**:
- `public/images/projects/` contains 2 project images + 2 screenshot directories
- `public/images/icons/` contains favicons and logos
- Total: ~15-20 image files

---

## Step 3: Create Design System Document (30 minutes)

```bash
# Create docs directory
mkdir -p docs

# Create design system doc
touch docs/DESIGN_SYSTEM.md
```

Open `docs/DESIGN_SYSTEM.md` and add:

```markdown
# Design System - Isiah Udofia Portfolio

## 1. Colors

### Light Mode
- **Primary**: Blue gradient (to be extracted from original site)
- **Background**: #ffffff, #f8fafc (slate-50)
- **Text**: #0a0a0a (slate-900), #64748b (slate-500)
- **Accent**: #3b82f6 (blue-500)

### Dark Mode
- **Background**: #0a0a0a (slate-950), #1e293b (slate-800)
- **Text**: #ededed (slate-200), #94a3b8 (slate-400)

## 2. Typography

### Font Family
- **System fonts**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif

### Scale
- **h1**: text-6xl (4.5rem / 72px) - Hero name
- **h2**: text-4xl (2.25rem / 36px) - Section headings
- **h3**: text-2xl (1.5rem / 24px) - Card titles
- **body**: text-base (1rem / 16px)
- **small**: text-sm (0.875rem / 14px)

### Weights
- **Bold**: font-bold (700)
- **Semibold**: font-semibold (600)
- **Normal**: font-normal (400)

## 3. Spacing

### Scale (Tailwind default)
- **Base**: 4px
- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 2rem (32px)
- **lg**: 4rem (64px)
- **xl**: 8rem (128px)

### Patterns
- **Section padding**: py-20 (5rem top/bottom)
- **Container padding**: px-6 (1.5rem sides)
- **Gap between elements**: gap-4, gap-6, gap-8

## 4. Components

### Button
- **Variants**: primary (blue gradient), secondary (outline), ghost (transparent)
- **Sizes**: sm (py-2 px-4), md (py-3 px-6), lg (py-4 px-8)
- **Border radius**: rounded-lg (0.5rem)
- **Hover**: scale-105, shadow-lg

### Card
- **Padding**: p-6
- **Border radius**: rounded-xl (0.75rem)
- **Shadow**: shadow-md hover:shadow-xl transition
- **Background**: bg-white dark:bg-slate-800

## 5. Animation

### Timing
- **Fast**: 0.3s (button hover, small elements)
- **Medium**: 0.5s (fade-up, scale)
- **Slow**: 0.75s (complex sequences)

### Easing
- **Default**: power2.out
- **Bouncy**: elastic.out(1, 0.5)
- **Smooth**: power1.inOut

### Patterns
- **Fade-up**: y: 50, opacity: 0 → y: 0, opacity: 1
- **Stagger**: Delay each element by 0.1s
- **Scale-in**: scale: 0.9 → scale: 1

## 6. Breakpoints

- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (laptop)
- **xl**: 1280px (desktop)

## 7. Effects

### Shadows
- **sm**: shadow-sm (subtle)
- **md**: shadow-md (cards)
- **lg**: shadow-lg (elevated)
- **xl**: shadow-xl (modals/popovers)

### Border Radius
- **sm**: rounded-sm (0.125rem)
- **md**: rounded-lg (0.5rem)
- **lg**: rounded-xl (0.75rem)
- **full**: rounded-full (pill shape)

### Transitions
- **Default**: transition-all duration-300
- **Slow**: transition-all duration-500
```

**Update Tailwind Config**:

Edit `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

**Commit**:
```bash
git add docs/ tailwind.config.ts
git commit -m "Add design system documentation and Tailwind config"
git push origin main
```

---

## Step 4: Create GitHub Issues (30 minutes)

### Option A: Create Issues Manually via GitHub CLI

```bash
# Navigate to project
cd /Users/iudofia/Documents/GitHub/isiahudofia-next

# Create Epic E1
gh issue create --title "Epic E1: Foundation & Design System" --body "## Description
Establish design system, shared hooks, and base components

## Stories
- S1.1: Design System Implementation
- S1.2: Shared Animation Hooks
- S1.3: Base Component Library

## Business Value
Prevents rework, ensures consistency, accelerates development

**Priority**: P0 | **Complexity**: L | **Duration**: 1 week" --label "epic,foundation,phase-4a"

# Note the issue number, then create stories that reference it
# Example: gh issue create --title "S1.1: Design System Implementation" --body "Parent: #E1_NUMBER..."
```

### Option B: Use GitHub Web UI

1. Go to: `https://github.com/iudofia2026/isiahudofia-next/issues`
2. Click "New Issue"
3. Use templates from `PHASE_4_BACKLOG.md`
4. Create issues in order: Epics first, then Stories, then Tasks

### Option C: Automated Script (Recommended for Bulk Creation)

Create `scripts/create-issues.ts`:

```typescript
import { execSync } from 'child_process';

const issues = [
  {
    title: 'E1: Foundation & Design System',
    body: '## Epic: Foundation & Design System\n\nPriority: P0\nDuration: 1 week\n\n### Stories\n- S1.1: Design System Implementation\n- S1.2: Shared Animation Hooks  \n- S1.3: Base Component Library',
    labels: ['epic', 'foundation', 'phase-4a']
  },
  // Add more issues from backlog...
];

issues.forEach(issue => {
  const cmd = `gh issue create --title "${issue.title}" --body "${issue.body}" --labels "${issue.labels.join(',')}"`;
  try {
    const output = execSync(cmd, { encoding: 'utf-8' });
    console.log(`Created: ${issue.title}`);
    console.log(output);
  } catch (error) {
    console.error(`Failed to create: ${issue.title}`, error);
  }
});
```

Run:
```bash
npx tsx scripts/create-issues.ts
```

---

## Step 5: Begin Development

### Start with Sprint 1

```bash
# Pull latest changes
git pull origin main

# Create feature branch for first task
git checkout -b feature/design-system

# Start working on S1.1: Design System Implementation
# Reference: PHASE_4_BACKLOG.md -> Story S1.1 -> Task T1.1.1
```

### Daily Workflow

1. **Morning**: Pull latest changes, check GitHub issues for assignments
2. **Development**: Work on task, commit frequently
3. **Testing**: Run tests (`npm run test:unit`, `npm run test:integration`)
4. **End of Day**: Push changes, update issue with progress

### Commit Message Convention

```bash
# Feature
git commit -m "feat(hero): add Hero component with animations"

# Bug fix
git commit -m "fix(navigation): mobile menu not closing on link click"

# Documentation
git commit -m "docs: add component architecture doc"

# Refactor
git commit -m "refactor(skills): extract SkillTag as reusable component"
```

---

## Step 6: Verification Checklist

Before marking any task complete, verify:

- [ ] Code committed and pushed to GitHub
- [ ] All acceptance criteria met (check GitHub issue)
- [ ] Tests passing (`npm run test:unit && npm run test:integration`)
- [ ] No console errors or warnings
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices)
- [ ] Accessibility validated (keyboard navigation, screen reader)
- [ ] Code reviewed (if working with team)

---

## Step 7: Track Progress

### Weekly Review

At end of each sprint (week):

1. **Review completed issues**: Check closed issues in GitHub
2. **Update metrics**:
   - Story points completed
   - Test pass rate
   - Lighthouse scores
3. **Plan next sprint**: Assign issues for upcoming week
4. **Retrospective**: What went well? What needs improvement?

### Dashboard (Optional)

Create `PROJECT_STATUS.md`:

```markdown
# Phase 4 Progress Tracker

## Sprint 1 (Week 1): Foundation
- [ ] S1.1: Design System (3 tasks)
- [ ] S1.2: Shared Hooks (2 tasks)
- [ ] S1.3: Base Components (4 tasks)

**Progress**: 0/9 tasks complete
**Velocity**: 0 story points

## Sprint 2 (Week 2): Core UI
- [ ] S2.2: Navigation (3 tasks)
- [ ] S2.1: Hero (3 tasks)
- [ ] S2.3: Footer (2 tasks)

**Progress**: 0/8 tasks complete

## Overall Progress
**Epics Complete**: 0/4
**Stories Complete**: 0/13
**Tasks Complete**: 0/35-40
**Percentage**: 0%

## Blockers
- None currently

## Risks
- Asset migration pending (Step 2)
```

---

## Support & Troubleshooting

### Common Issues

**Issue**: `gh` command not found
**Solution**: Install GitHub CLI: `brew install gh` (macOS)

**Issue**: Git push fails
**Solution**: Check remote: `git remote -v`, add if needed: `git remote add origin <url>`

**Issue**: Images not loading
**Solution**: Verify asset migration (Step 2) completed, check file paths in components

**Issue**: Tests failing after component changes
**Solution**: Update test selectors to match new component structure (see S4.3)

### Getting Help

1. Review `PHASE_4_READINESS_ASSESSMENT.md` for context
2. Review `PHASE_4_BACKLOG.md` for detailed task specifications
3. Check original site: `../isiahudofia.com/index.html` for design reference
4. Run `npm run dev:compare` to view old and new sites side-by-side

---

## Success Criteria

Phase 4 is complete when:

- ✅ All 4 Epics complete
- ✅ All 13 Stories closed
- ✅ 35-40 Tasks completed
- ✅ 95%+ E2E tests passing (548/575)
- ✅ Lighthouse score > 90
- ✅ Zero console errors
- ✅ Fully responsive
- ✅ WCAG AA accessible

**Estimated Timeline**: 4-5 weeks
**Confidence**: HIGH

---

**Ready to begin? Start with Step 1!**

**Created**: January 12, 2026
**Author**: Agile Backlog Manager
