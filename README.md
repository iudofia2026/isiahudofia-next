# Isiah Udofia Portfolio - Next.js

Modern, clean rebuild of the portfolio site using Next.js, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
isiahudofia-next/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   ├── lib/              # Utilities and helpers
│   ├── hooks/            # Custom React hooks
│   ├── data/             # Extracted content (JSON)
│   └── styles/           # Global styles
├── public/               # Static assets
├── scripts/              # Migration automation
└── __tests__/            # Test suites
```

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Migration
- `npm run migrate` - Run full automated migration
- `npm run extract:content` - Extract content from old site
- `npm run migrate:images` - Migrate image assets
- `npm run migrate:videos` - Migrate video assets
- `npm run dev:compare` - Run both old and new sites side-by-side

### Testing
- `npm run test` - Run all tests with Vitest
- `npm run test:unit` - Run unit tests
- `npm run test:integration` - Run integration tests
- `npm run test:e2e` - Run end-to-end tests (Playwright)
- `npm run test:generate` - Generate tests with AI agents
- `npm run test:validate` - Validate migration accuracy
- `npm run test:coverage` - Generate coverage report

## 🎯 Migration Strategy

This project follows the **Parallel Development Strategy** documented in the original repository:

See: `../isiahudofia.com/PARALLEL_DEVELOPMENT_STRATEGY.md`

### Migration Phases

1. **Foundation Setup** ✅ - Next.js app initialized
2. **Content Extraction** 🔄 - Automated parsing of old HTML
3. **Migration Testing** ⏳ - 37 parallel AI-generated tests
4. **Asset Migration** ⏳ - Images, videos, files
5. **Core Components** ⏳ - React components with animations
6. **Animation System** ⏳ - GSAP integration
7. **Polish & Deploy** ⏳ - Production ready

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + @gsap/react
- **Testing**: Vitest, Testing Library, Playwright
- **Migration**: Cheerio, fs-extra, sharp

## 📊 Benefits Over Old Site

| Old Site | New Site |
|----------|----------|
| 200KB+ HTML files | 50-100 line components |
| 33KB bundled JS (7 libraries) | Modular npm packages |
| 21K lines scattered CSS | Tailwind utility classes |
| Hard to debug | React DevTools + TypeScript |
| No component reuse | Reusable component library |
| Manual content updates | JSON-based content |

## 🔗 Related Repositories

- **Original Site**: [../isiahudofia.com](../isiahudofia.com)
- **Strategy Doc**: [PARALLEL_DEVELOPMENT_STRATEGY.md](../isiahudofia.com/PARALLEL_DEVELOPMENT_STRATEGY.md)

## 📝 License

All rights reserved - Isiah Udofia

---

**Status**: 🚧 Migration in Progress
**Current Phase**: Foundation Setup Complete
