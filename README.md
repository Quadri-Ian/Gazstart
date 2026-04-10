# GazStart — Marketing Website

Production-ready Next.js (App Router) marketing website scaffold for an oil & gas services company.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — design tokens, responsive utilities
- **next-intl** — i18n with `en` and `ru` locales
- **Framer Motion** — scroll-reveal and UI animations
- **Swiper** — carousels/sliders
- **ESLint + Prettier** — code quality & formatting

## Features

- 🌍 **Internationalization** — `/en/...` and `/ru/...` localized routes with language switcher
- 📱 **Responsive layout** — mobile hamburger menu, desktop dropdowns
- ✨ **Animations** — scroll-reveal (fade/translate), 3D tilt-on-hover, Swiper carousels, count-up stats
- 🔍 **SEO** — per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`
- ⚡ **Vercel-ready** — static generation, ISR-compatible, zero env vars required for base deployment

## Pages

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/en` |
| `/en` / `/ru` | Home page (hero, locations, stats, management slider, press, partners) |
| `/en/company/about` | About the company |
| `/en/company/sustainable-development` | Sustainability |
| `/en/services/drilling` | Drilling services |
| `/en/services/service` | Oilfield services |
| `/en/press-center` | News list |
| `/en/press-center/[slug]` | News detail |
| `/en/careers` | Open positions |
| `/en/procurement` | Supplier information |
| `/en/contacts` | Contact form + details |

## Local Development

**Prerequisites:** Node.js 18+ and [pnpm](https://pnpm.io/installation)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` automatically.

## Lint & Type-check

```bash
pnpm lint        # ESLint via next lint
pnpm format      # Prettier auto-format
```

## Production Build

```bash
pnpm build       # Next.js production build
pnpm start       # Serve production build locally
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Quadri-Ian/Gazstart)

1. Push to GitHub (already done).
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. No environment variables are required for the base scaffold.
5. Click **Deploy**.

### Optional environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://gazstart.vercel.app` | Used in `sitemap.xml` and Open Graph URLs |

## Project Structure

```
├── messages/           # i18n translations (en.json, ru.json)
├── middleware.ts        # next-intl locale routing middleware
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (pass-through)
│   │   ├── robots.ts               # /robots.txt
│   │   ├── sitemap.ts              # /sitemap.xml
│   │   └── [locale]/
│   │       ├── layout.tsx          # Locale layout (html, providers, header, footer)
│   │       ├── page.tsx            # Home
│   │       ├── company/about/
│   │       ├── company/sustainable-development/
│   │       ├── services/drilling/
│   │       ├── services/service/
│   │       ├── press-center/
│   │       │   ├── page.tsx        # News list
│   │       │   └── [slug]/page.tsx # News detail
│   │       ├── careers/
│   │       ├── procurement/
│   │       └── contacts/
│   ├── components/
│   │   ├── layout/     # Header, Footer, DropdownMenu
│   │   ├── ui/         # Hero, ScrollReveal, TiltCard, CountUpStat, Carousel
│   │   └── home/       # Section components for home page
│   └── i18n/           # next-intl routing config and request handler
```

## Adding a New Language

1. Add the locale to `src/i18n/routing.ts` in the `locales` array.
2. Create `messages/<locale>.json` with all translation keys.
3. The middleware and static params generation handle the rest automatically.
