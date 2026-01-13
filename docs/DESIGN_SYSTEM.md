# Design System - Isiah Udofia Portfolio

**Version:** 1.0
**Last Updated:** 2025-01-12
**Status:** Active

---

## Overview

This design system defines the visual language and component specifications for the isiahudofia.com portfolio rebuild. It ensures consistency across all pages and components while maintaining the clean, modern aesthetic of the original Webflow design.

**Design Principles:**
1. **Minimal & Clean** - Maximize whitespace, reduce visual noise
2. **Typography-First** - Text hierarchy drives layout decisions
3. **Subtle Animation** - Smooth transitions enhance, not distract
4. **Mobile-First** - Responsive by default
5. **Performance** - Fast load times, 60fps animations

---

## Color Palette

### Primary Colors
```css
/* Brand Blue - Used for links, accents, CTAs */
--color-brand-blue: #4B9CD3;
--color-brand-blue-hover: #3B8CC3;
--color-brand-blue-light: #E8F4FA;

/* Accent Green - Used for success states, some highlights */
--color-accent-green: #84D1AC;
--color-accent-green-light: #E8F8F0;
```

### Neutral Colors
```css
/* Text Colors */
--color-text-primary: #0A0A0A;      /* Near black */
--color-text-secondary: #666666;    /* Dark gray */
--color-text-tertiary: #999999;     /* Medium gray */
--color-text-inverse: #FFFFFF;       /* White text */

/* Background Colors */
--color-bg-primary: #FFFFFF;         /* Pure white */
--color-bg-secondary: #F7F7F7;       /* Light gray */
--color-bg-tertiary: #EDEDED;        /* Medium light gray */

/* Border Colors */
--color-border-light: #E5E5E5;
--color-border-medium: #D1D1D1;
--color-border-dark: #CCCCCC;
```

### Semantic Colors
```css
/* Status & Feedback */
--color-success: #84D1AC;
--color-warning: #F7EC88;
--color-error: #FFC1C1;
--color-info: #D6E8FF;

/* Link States */
--color-link: #4B9CD3;
--color-link-hover: #3B8CC3;
--color-link-visited: #6B9CD3;
```

---

## Typography

### Font Families
```css
/* Primary - Headings & Display */
--font-family-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
font-weight: 700;  /* Bold for headlines */

/* Secondary - Body & UI */
--font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
font-weight: 400;  /* Regular for body text */

/* Monospace - Code & Data */
--font-family-mono: 'DM Mono', 'Courier New', monospace;
```

### Type Scale
```css
/* Display Sizes */
--text-display-2xl: 3.5rem;   /* 56px - Hero name */
--text-display-xl: 3rem;      /* 48px - Section titles */
--text-display-lg: 2.5rem;    /* 40px - Page headings */

/* Heading Sizes */
--text-heading-xl: 2rem;      /* 32px - Section headings */
--text-heading-lg: 1.5rem;    /* 24px - Subsection headings */
--text-heading-md: 1.25rem;   /* 20px - Card titles */
--text-heading-sm: 1.125rem;  /* 18px - Small headings */

/* Body Sizes */
--text-body-xl: 1.125rem;     /* 18px - Large body */
--text-body-lg: 1rem;         /* 16px - Default body */
--text-body-md: 0.9375rem;    /* 15px - Medium body */
--text-body-sm: 0.875rem;     /* 14px - Small body */
--text-body-xs: 0.75rem;      /* 12px - Caption/meta */

/* Specialized */
--text-monospace: 0.875rem;   /* 14px - Code/tech stack */
```

### Font Weights
```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights
```css
--line-height-tight: 1.2;     /* Headings */
--line-height-normal: 1.5;    /* Body text */
--line-height-relaxed: 1.75;  /* Long-form content */
```

### Letter Spacing
```css
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em;
```

---

## Spacing System

### Base Unit
**4px base unit** - All spacing derived from multiples of 4

### Scale
```css
/* Micro Spacing (0-8px) */
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */

/* Small Spacing (12-24px) */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */

/* Medium Spacing (32-48px) */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */

/* Large Spacing (64-96px) */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */

/* Extra Large Spacing (128px+) */
--space-32: 8rem;    /* 128px */
--space-40: 10rem;   /* 160px */
```

### Component Spacing
```css
/* Section Padding */
--padding-section-vertical: var(--space-16);  /* 64px mobile */
--padding-section-horizontal: var(--space-4); /* 16px mobile */

@media (min-width: 768px) {
  --padding-section-vertical: var(--space-24);  /* 96px desktop */
  --padding-section-horizontal: var(--space-8); /* 32px desktop */
}

/* Card Spacing */
--padding-card: var(--space-6);      /* 24px */
--gap-cards: var(--space-6);         /* 24px between cards */

/* Button Spacing */
--padding-button-vertical: var(--space-3);   /* 12px */
--padding-button-horizontal: var(--space-6); /* 24px */
```

---

## Layout & Grid

### Container Widths
```css
/* Max Widths */
--width-container-sm: 640px;   /* Small content */
--width-container-md: 768px;   /* Medium content */
--width-container-lg: 1024px;  /* Large content */
--width-container-xl: 1280px;  /* Extra large content */
--width-container-full: 100%;   /* Full width */
```

### Grid System
```css
/* Desktop Grid - 10 columns (from original design) */
--grid-columns: 10;
--grid-gap: var(--space-4);  /* 16px gap */

/* Responsive Columns */
--columns-mobile: 1;
--columns-tablet: 2;
--columns-desktop: 3;
--columns-wide: 4;
```

### Breakpoints
```css
--breakpoint-xs: 375px;   /* Small mobile */
--breakpoint-sm: 640px;   /* Mobile */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Wide desktop */
--breakpoint-2xl: 1536px; /* Extra wide */
```

---

## Components

### Buttons

**Primary Button**
```css
.btn-primary {
  background: var(--color-brand-blue);
  color: var(--color-text-inverse);
  padding: var(--padding-button-vertical) var(--padding-button-horizontal);
  font-weight: var(--font-weight-semibold);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-brand-blue-hover);
  transform: translateY(-1px);
}
```

**Secondary Button**
```css
.btn-secondary {
  background: transparent;
  color: var(--color-brand-blue);
  border: 2px solid var(--color-brand-blue);
  padding: var(--padding-button-vertical) var(--padding-button-horizontal);
  font-weight: var(--font-weight-semibold);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--color-brand-blue-light);
}
```

**Link Button (CTA Style)**
```css
.btn-link {
  color: var(--color-brand-blue);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  border-bottom: 2px solid var(--color-brand-blue);
  padding-bottom: 2px;
  transition: all 0.2s ease;
}

.btn-link:hover {
  color: var(--color-brand-blue-hover);
  border-color: var(--color-brand-blue-hover);
}
```

### Cards

**Project Card**
```css
.card-project {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  padding: var(--padding-card);
  transition: all 0.3s ease;
}

.card-project:hover {
  border-color: var(--color-brand-blue);
  box-shadow: 0 4px 12px rgba(75, 156, 211, 0.15);
  transform: translateY(-2px);
}
```

**Experience Card**
```css
.card-experience {
  border-left: 3px solid var(--color-brand-blue);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
  background: var(--color-bg-primary);
}
```

### Navigation

**Desktop Navigation**
```css
.nav-desktop {
  display: flex;
  gap: var(--space-8);
  padding: var(--space-4) var(--space-8);
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  position: relative;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-brand-blue);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-brand-blue);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
```

**Mobile Navigation**
```css
.nav-mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-bg-primary);
  border-top: 1px solid var(--color-border-medium);
  padding: var(--space-4);
  display: flex;
  justify-content: space-around;
  z-index: 1000;
}

.nav-mobile-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-body-xs);
  color: var(--color-text-secondary);
}
```

---

## Animation

### Timing Functions
```css
--ease-out-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.6, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Durations
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 800ms;
```

### Key Animations

**Fade In**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out-smooth);
}
```

**Slide Up**
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp var(--duration-normal) var(--ease-out-smooth);
}
```

**Text Reveal (Shuffle Effect)**
```css
/* Character-by-character reveal using GSAP */
/* Duration: 500ms per character */
/* Stagger: 50ms between characters */
```

---

## Effects

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.2);

/* Brand Shadow (Blue tint) */
--shadow-brand: 0 4px 12px rgba(75, 156, 211, 0.15);
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### Transitions
```css
--transition-fast: 150ms var(--ease-out-smooth);
--transition-normal: 300ms var(--ease-out-smooth);
--transition-slow: 500ms var(--ease-out-smooth);
```

---

## Iconography

### Icon Sizes
```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

### Icon Colors
```css
--icon-default: var(--color-text-secondary);
--icon-hover: var(--color-brand-blue);
--icon-active: var(--color-brand-blue);
```

---

## Accessibility

### Focus States
```css
.focus-ring {
  outline: 2px solid var(--color-brand-blue);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-brand-blue);
  color: white;
  padding: var(--space-2) var(--space-4);
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Color Contrast
- **All text** meets WCAG AA standards (4.5:1 contrast ratio)
- **Large text** meets WCAG AAA standards (7:1 contrast ratio)
- **Interactive elements** have clear focus indicators

### Screen Reader Support
- All images have descriptive `alt` text
- Form inputs have associated labels
- Links have descriptive text (not "click here")

---

## Responsive Design

### Mobile-First Approach
All components designed mobile-first, then enhanced for larger screens.

### Container Queries (Future)
```css
/* When container queries are widely supported */
@container (min-width: 640px) {
  /* Enhanced layout for larger containers */
}
```

### Touch Targets
- **Minimum size:** 44×44px (iOS guideline)
- **Spacing:** At least 8px between targets

---

## Content Guidelines

### Writing Style
- **Headings:** Sentence case, concise, descriptive
- **Body:** Clear, direct, active voice
- **Links:** Descriptive anchor text
- **Alt Text:** Descriptive, contextual

### Content Hierarchy
1. **H1:** Page title (one per page)
2. **H2:** Major sections
3. **H3:** Subsections
4. **H4-H6:** Nested content

---

## Implementation Notes

### Tailwind CSS Configuration
This design system maps directly to Tailwind CSS utilities:

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#4B9CD3',
          'blue-hover': '#3B8CC3',
          'blue-light': '#E8F4FA',
        },
        accent: {
          green: '#84D1AC',
        }
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      spacing: {
        // 4px base unit scale
      },
    },
  },
};
```

### CSS Custom Properties
Use CSS custom properties for dynamic values (colors, spacing) and Tailwind utilities for static values.

---

## Maintenance

### Version History
- **v1.0** (2025-01-12): Initial design system based on Webflow export

### Update Process
1. Document change with date and reason
2. Update this file
3. Communicate changes to team
4. Update affected components
5. Test for regressions

---

## Resources

- **Original Site:** isiahudofia.com (Webflow export)
- **Fonts:** Inter (Google Fonts), DM Mono (Google Fonts)
- **Icons:** Heroicons (recommended), SVG custom icons
- **Animation:** GSAP 3, @gsap/react
- **Design Inspiration:** Minimal portfolios, Swiss design

---

**Next Steps:**
1. ✅ Review and approve design system
2. ⏳ Update Tailwind config with design tokens
3. ⏳ Create base components (Button, Card, Container)
4. ⏳ Build page-specific components
5. ⏳ Test across all breakpoints
