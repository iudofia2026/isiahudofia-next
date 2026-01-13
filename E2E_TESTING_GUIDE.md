# E2E Testing Quick Start Guide

## Overview

This project includes comprehensive end-to-end tests using Playwright to verify critical user flows work correctly in the migrated portfolio site.

## Prerequisites

Tests are already configured in your project:
- Playwright is installed in `package.json`
- Test scripts are configured in `package.json`
- Playwright browsers should be installed

## First Time Setup

### 1. Install Playwright Browsers (if not already installed)

```bash
npx playwright install
```

### 2. Verify Installation

```bash
npx playwright --version
```

## Running Tests

### Run All E2E Tests

```bash
npm run test:e2e
```

This will:
- Start the development server on port 3000
- Run all E2E tests across configured browsers
- Generate HTML report in `playwright-report/`

### Run Tests in Development

```bash
# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests with UI mode
npx playwright test --ui

# Debug tests
npx playwright test --debug
```

### Run Specific Test Files

```bash
# Homepage tests only
npx playwright test __tests__/e2e/homepage.spec.ts

# Projects tests only
npx playwright test __tests__/e2e/projects.spec.ts

# Resume tests only
npx playwright test __tests__/e2e/resume.spec.ts

# Contact tests only
npx playwright test __tests__/e2e/contact.spec.ts
```

### Run Tests on Specific Browser

```bash
# Chrome/Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# Safari (WebKit)
npx playwright test --project=webkit

# Mobile
npx playwright test --project="Mobile Chrome"
```

## Viewing Test Results

### Open HTML Report

```bash
npx playwright show-report
```

This opens an interactive HTML report showing:
- Test results
- Screenshots of failures
- Videos of test runs
- Timeline of test execution
- Error details

## Test Structure

```
playwright.config.ts          # Playwright configuration
__tests__/e2e/
├── homepage.spec.ts         # Homepage user flow tests (25 tests)
├── projects.spec.ts         # Projects browsing tests (20 tests)
├── resume.spec.ts           # Resume/experience tests (22 tests)
├── contact.spec.ts          # Contact information tests (20 tests)
├── helpers.ts               # Reusable test utilities
├── fixtures.ts              # Test data and fixtures
└── README.md               # Detailed documentation

Total: 87+ tests across 4 test files
```

## What Gets Tested

### Homepage (25 tests)
- Hero section display
- Navigation functionality
- Content rendering
- Link functionality
- Performance
- Accessibility
- Responsive design
- User flows

### Projects (20 tests)
- Project listing
- Project details
- External links
- Images and galleries
- Filtering/sorting
- Responsive layouts
- User flows

### Resume/Experience (22 tests)
- Work experience display
- Education history
- Timeline organization
- Skills section
- Resume download
- Navigation
- Content accuracy

### Contact (20 tests)
- Email display
- Social media links
- Contact forms
- Alternative contact methods
- Responsive design
- Accessibility
- User flows

## Test Data

Tests automatically use data from:
- `/src/data/hero.json` - Hero content
- `/src/data/projects.json` - Projects listing
- `/src/data/experience.json` - Work experience
- `/src/data/education.json` - Education history
- `/src/data/contact.json` - Contact information

## Writing New Tests

### 1. Add Test to Existing File

Edit one of the spec files in `__tests__/e2e/`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/my-page');
    await expect(page.getByText('Hello')).toBeVisible();
  });
});
```

### 2. Create New Test File

```bash
# Create new test file
touch __tests__/e2e/my-feature.spec.ts
```

Add basic structure:

```typescript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/my-page');
  });

  test('should display correctly', async ({ page }) => {
    // Test implementation
  });
});
```

### 3. Use Test Helpers

Import helpers from `helpers.ts`:

```typescript
import { testHelpers } from './helpers';

test('my test', async ({ page }) => {
  const nav = testHelpers.navigation(page);
  const perf = testHelpers.performance(page);

  await nav.goto('/');
  await perf.assertLoadTimeUnder('/', 3000);
});
```

## Using Test IDs

Add `data-testid` attributes to your components for reliable testing:

```tsx
// Component
<div data-testid="project-card">
  <h2 data-testid="project-title">My Project</h2>
</div>
```

```typescript
// Test
const card = page.locator('[data-testid="project-card"]');
const title = page.locator('[data-testid="project-title"]');
await expect(title).toHaveText('My Project');
```

## CI/CD Integration

Tests run in CI with:

```yaml
# .github/workflows/e2e.yml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npm run test:e2e

- name: Upload test report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Troubleshooting

### Tests Fail - Elements Not Found

1. Start dev server: `npm run dev`
2. Open page in browser
3. Use Playwright codegen to find selectors:

```bash
npx playwright codegen http://localhost:3000
```

### Tests Timeout

Increase timeout in `playwright.config.ts` or per test:

```typescript
test.setTimeout(60000); // 60 seconds
```

### Dev Server Issues

Ensure port 3000 is available:
```bash
lsof -i :3000
kill -9 <PID>
```

## Best Practices

1. **Run tests locally before committing**
2. **Use descriptive test names**
3. **Test user flows, not implementation**
4. **Use data-testid for stable selectors**
5. **Keep tests focused and independent**
6. **Use helpers for common operations**
7. **Update tests when UI changes**
8. **Check test reports after each run**

## Performance Expectations

Tests verify these load times:
- Homepage: < 3 seconds
- Projects: < 4 seconds
- Experience: < 3 seconds
- Contact: < 3 seconds

## Additional Resources

- Detailed docs: `__tests__/e2e/README.md`
- Playwright docs: https://playwright.dev/
- Test helpers: `__tests__/e2e/helpers.ts`
- Fixtures: `__tests__/e2e/fixtures.ts`

## Quick Commands Reference

```bash
# Run all tests
npm run test:e2e

# Run specific test file
npx playwright test __tests__/e2e/homepage.spec.ts

# Run with UI
npx playwright test --ui

# Debug mode
npx playwright test --debug

# View report
npx playwright show-report

# Install browsers
npx playwright install

# Run single browser
npx playwright test --project=chromium
```

## Support

For detailed information, see:
- `__tests__/e2e/README.md` - Comprehensive documentation
- Playwright Documentation - https://playwright.dev/
- Test code comments - Inline documentation
