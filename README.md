# GazStart — Marketing Website

Production-ready Next.js (App Router) marketing website scaffold for an oil & gas services company.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** — design tokens, responsive utilities
- **next-intl** — i18n with `en` and `ru` locales
- **Framer Motion** — scroll-reveal and UI animations
- **Swiper** — carousels/sliders
- **ESLint + Prettier** — code quality & formatting

## Brand / Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` / `brand.dark` | `#394854` | Background, dark text |
| `--color-red` / `brand.red` | `#ab052d` | Accent red, CTAs |
| `--color-white` / `brand.white` | `#ffffff` | White backgrounds |
| `--color-card` / `brand.card` | `#f8f8f9` | Press-center calendar cards |
| `--color-nav` / `brand.nav` | `#2b3944` | Sticky header, nav backgrounds |
| `--font-sans` | `"Suisse Intl", Helvetica, Arial, sans-serif` | Typography |

### Adding the Suisse Intl Font

The design uses **Suisse Intl** by Swiss Typefaces. It is a commercial/licensed font.
If you have a valid licence:

1. Obtain the WOFF2 font files (e.g. `SuisseIntl-Regular.woff2`, `SuisseIntl-Medium.woff2`, `SuisseIntl-Bold.woff2`).
2. Place them in `public/fonts/`.
3. Add the `@font-face` declarations in `src/app/globals.css`:

```css
@font-face {
  font-family: "Suisse Intl";
  src: url("/fonts/SuisseIntl-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Suisse Intl";
  src: url("/fonts/SuisseIntl-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Suisse Intl";
  src: url("/fonts/SuisseIntl-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

Without the font files, the site falls back to **Helvetica → Arial → sans-serif** which looks similar.

## Features

- 🌍 **Internationalization** — `/en/...` and `/ru/...` localized routes with language switcher
- 📱 **Responsive layout** — mobile hamburger menu, desktop dropdowns
- ✨ **Animations** — scroll-reveal (fade/translate), 3D tilt-on-hover, Swiper carousels, count-up stats
- 🔍 **SEO** — per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`
- ⚡ **Vercel-ready** — static generation, ISR-compatible, zero env vars required for base deployment
- 🎨 **Transparent → sticky header** — transparent over hero, becomes `#2b3944` on scroll

## Homepage Sections

1. **Hero** — Full-screen hero with rig silhouette, typographic title, two bottom-left cards (Drilling 01 / Services 02), down-arrow scroll button
2. **Our Locations** — Masonry-style 4-column location tiles with tilt hover
3. **Map & Stats** — 2-column layout with stylised map/pins + red circle and big count-up number
4. **Large Stats** — White-background stats panel with count-up numbers and technical rig illustration
5. **Social Responsibility** — Full-bleed dark section with big heading, red-accent caption and CTA
6. **Management Slider** — Leadership quotes with Swiper carousel
7. **Press-center** — Pill filter tabs + 3-column calendar cards (hover reveals image)
8. **Partners** — Partner logo strip

## Pages

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/en` |
| `/en` / `/ru` | Home page |
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
│   │   ├── globals.css             # CSS variables + Tailwind base
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # Locale layout (html, providers, header, footer)
│   │   │   ├── page.tsx            # Home
│   │   │   ├── company/about/
│   │   │   ├── company/sustainable-development/
│   │   │   ├── services/drilling/
│   │   │   ├── services/service/
│   │   │   ├── press-center/
│   │   │   │   ├── page.tsx        # News list
│   │   │   │   └── [slug]/page.tsx # News detail
│   │   │   ├── careers/
│   │   │   ├── procurement/
│   │   │   └── contacts/
│   ├── components/
│   │   ├── layout/     # Header (transparent→sticky), Footer
│   │   ├── ui/         # ScrollReveal, TiltCard, CountUpStat, Carousel
│   │   └── home/       # Section components for home page
│   └── i18n/           # next-intl routing config and request handler
├── tailwind.config.ts  # Brand color tokens + Suisse Intl font stack
```

## Adding a New Language

1. Add the locale to `src/i18n/routing.ts` in the `locales` array.
2. Create `messages/<locale>.json` with all translation keys.
3. The middleware and static params generation handle the rest automatically.
