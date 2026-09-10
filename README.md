# Bossert Immobilien — Premium Real Estate Web Application

A sophisticated, full-stack real estate web application built for **Bossert Immobilien**, a premium German luxury property brokerage. The application delivers a cinematic, immersive digital experience aligned with the brand's ethos of discretion, exclusivity, and elegance.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3.3 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Vanilla CSS (custom design system in `globals.css`) |
| Animation | GSAP 3.15, Framer Motion 13, CSS scroll animations |
| Carousel | Swiper 14 (with EffectCoverflow, Pagination, Navigation) |
| Smooth Scroll | Lenis 1.3 |
| Fonts | "The Seasons" (custom OTF/WOFF2), system serif fallback |
| i18n | Custom locale system (`src/locales/en.ts`, `de.ts`) |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint check
```

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout (fonts, providers)
│   ├── globals.css             # Full design system (6500+ lines)
│   ├── about/                  # About page
│   ├── services/               # Services page
│   ├── references/             # References / portfolio page
│   ├── properties/             # Property listings
│   ├── contact/                # Contact page
│   ├── knowledge/              # Knowledge / blog
│   ├── owners/                 # For property owners
│   ├── search-profile/         # Search profile creation
│   ├── login/                  # Auth — Login
│   ├── signup/                 # Auth — Signup
│   ├── forgot-password/        # Auth — Password reset
│   ├── list-property/          # Property submission
│   ├── @modal/                 # Parallel route modals
│   └── api/                    # API routes
│
├── components/                 # Shared UI components
│   ├── Navbar.tsx              # Sticky navbar with language toggle, hover dropdowns
│   ├── Footer.tsx              # Full footer with links
│   ├── HeroSection.tsx         # Home hero carousel
│   ├── HeroCarousel.tsx        # Image carousel for hero
│   ├── HeroServicesCarousel.tsx# Services-specific carousel
│   ├── CtaSection.tsx          # CTA / contact call-to-action block
│   ├── ApproachHeadline.tsx    # Scroll-pinned letter-by-letter text reveal
│   ├── HorizontalScrollPhilosophy.tsx # Sticky horizontal-scroll pillar cards
│   ├── AboutStats.tsx          # Animated number counters stats grid
│   ├── ReferencesSwiperGallery.tsx # 3D Coverflow swiper with dynamic opacity
│   ├── PropertiesGrid.tsx      # Property listing grid with filters
│   ├── PropertyCard.tsx        # Individual property card
│   ├── SearchSection.tsx       # Advanced property search UI
│   ├── ServicesBenefitsGrid.tsx# Services benefits card grid (6 cards)
│   ├── ServicesOverviewCards.tsx # Services overview blocks
│   ├── ServicesSection.tsx     # Services section
│   ├── StatsSection.tsx        # Animated stats counters
│   ├── StatsCard.tsx           # Individual stat card
│   ├── TestimonialSection.tsx  # Client testimonials carousel
│   ├── ProcessList.tsx         # Step-by-step process list
│   ├── WhySection.tsx          # Why choose us section
│   ├── ExpertiseSection.tsx    # Expertise / feature section
│   ├── ExploreSection.tsx      # Explore properties CTA
│   ├── IntroPromo.tsx          # Homepage intro promo block
│   ├── IntroSequence.tsx       # Page intro animation sequence
│   ├── GlassSurface.tsx        # Glassmorphism card component
│   ├── Marquee.tsx             # Scrolling text marquee
│   ├── NewsletterSection.tsx   # Newsletter signup
│   ├── NewsletterParallax.tsx  # Parallax newsletter block
│   ├── KnowledgeFeed.tsx       # Knowledge / articles feed
│   ├── FeaturedReferenceCurtain.tsx # Curtain-reveal reference feature
│   ├── ReferencesInteractiveGallery.tsx # Interactive gallery
│   ├── ReferencesMasonryGallery.tsx    # Masonry layout gallery
│   ├── AccordionCard.tsx       # Expandable accordion card
│   ├── ValuationGrid.tsx       # Property valuation grid
│   ├── PropertiesHero.tsx      # Properties page hero
│   ├── SmoothScroll.tsx        # Lenis smooth scroll wrapper
│   └── (subdirectories)
│       ├── about/              # About-specific components
│       ├── auth/               # Authentication form components
│       ├── forms/              # Shared form components
│       ├── modals/             # Modal dialogs
│       ├── owners/             # For-owners page components
│       ├── property/           # Property detail components
│       └── ui/                 # Generic UI primitives
│
├── context/
│   └── LanguageContext.tsx     # EN/DE language context provider
│
├── hooks/
│   └── useScrollReveal.ts      # IntersectionObserver scroll reveal hook
│
└── locales/
    ├── en.ts                   # English translations + content data
    └── de.ts                   # German translations + content data
```

---

## Design System

The entire design system lives in `src/app/globals.css` (~6,600 lines).

### Color Tokens
```css
--navy:  #042433    /* Primary dark — backgrounds, headings */
--cream: #F5F0E8    /* Primary light — page backgrounds */
--bronze:#B08D57    /* Accent — CTAs, highlights, italic text */
--white: #FFFFFF
--black: #000000
```

### Typography
- **Sans-serif**: System UI / Geist (body, UI elements)
- **Serif**: "The Seasons" (loaded via `@font-face` from `/public/fonts/`) — used for italic accent text via `.italic-serif`

### Key CSS Classes
| Class | Purpose |
|---|---|
| `.reveal-base.reveal-up` | Scroll-reveal: fade + translate-up |
| `.reveal-base.reveal-scale` | Scroll-reveal: fade + scale-in |
| `.is-revealed` | Activated state for scroll reveals |
| `.delay-100` / `.delay-200` / `.delay-300` | Stagger delays |
| `.editorial-headline` | Large display headline style |
| `.italic-serif` | Bronze italic serif accent text |
| `.explore-btn` | Primary CTA button |
| `.explore-btn-dark` | Dark variant CTA button |
| `.why-headline` | Section sub-headline |
| `.why-subhead` | Body paragraph for section descriptions |
| `.inner-page-container` | Max-width content container |
| `.global-padding` | Consistent horizontal page padding |
| `.dot` | Bronze bullet dot accent |

---

## Pages & Features

### 🏠 Home (`/`)
- Full-screen hero carousel with cinematic image transitions
- Animated marquee text strip
- `IntroPromo` section with staggered reveals
- Services overview teaser
- Stats section with animated counters
- Featured reference properties
- Newsletter / parallax CTA
- Footer

### 📖 About (`/about`)
- Editorial split-layout hero (headline + description)
- Cinematic establishing shot (70vh image panel)
- `ApproachHeadline` — sticky scroll-pinned section where text reveals letter-by-letter as the user scrolls
- `HorizontalScrollPhilosophy` — sticky horizontal scroll experience with three pillars (Discretion, Exclusivity, Local Expertise), each with a full-panel image and Roman numeral decorative type, with scroll progress indicators
- `AboutStats` — animated counting stats grid on dark navy background (`30+`, `€500M+`, `100%`, `50+`)
- Leadership team section with portrait images, names, titles, and quotes
- CTA section
- Footer

### 🛎️ Services (`/services`)
- **100vh full-screen cinematic hero** with AI-generated luxury background image, slow Ken-Burns zoom animation, gradient overlay, centered white/bronze typography, and CTA button
- `ApproachHeadline` with "COMPLEX PROPERTY MATTERS?" tag animating letter-by-letter before the headline
- `ServicesBenefitsGrid` — 6-card benefits grid
- `ServicesOverviewCards` — 3 service overview blocks with images
- Testimonials carousel
- CTA section
- Footer

### 🏆 References (`/references`)
- **100vh full-screen cinematic hero** with AI-generated twilight estate background, slow Ken-Burns zoom animation, dark gradient overlay, and centered text
- `ReferencesSwiperGallery` — 3D Coverflow swiper with exactly 3 visible cards:
  - Dynamic opacity via `onProgress` + `watchSlidesProgress` — 4th/5th cards fade out smoothly as they leave the viewport
  - Smooth drag physics with `speed: 800ms`
  - Custom prev/next navigation buttons
  - Grayscale + brightness filter on non-active slides
  - `rotate: 15`, `depth: 300` coverflow effect with slide shadows
- CTA section
- Footer

### 🏘️ Properties (`/properties`)
- Advanced search and filter UI
- Property grid with cards
- Property detail pages

### 📞 Contact (`/contact`)
- Contact form
- Office location, phone, email info
- FAQ accordion

### 📚 Knowledge (`/knowledge`)
- Article feed / blog

### 🔑 For Owners (`/owners`)
- Valuation grid
- Owner-specific services

### 🔐 Auth Pages
- Login (`/login`)
- Signup (`/signup`)
- Forgot Password (`/forgot-password`)

---

## Internationalisation (i18n)

The application supports **English** and **German** via a custom `LanguageContext`.

- Toggle is in the `Navbar` (EN | DE)
- All page content is driven from locale files — no hardcoded strings in page components
- Locale files: `src/locales/en.ts` and `src/locales/de.ts`

---

## Animation Architecture

### 1. Scroll Reveal — `useScrollReveal` hook
`IntersectionObserver`-based hook. Apply `.reveal-base.reveal-up` + `.delay-*` classes and toggle `.is-revealed` when the element enters the viewport.

### 2. `ApproachHeadline` — Scroll-driven text reveal
A sticky-pinned section (height: `400vh`) where each character in the headline reveals from `opacity: 0.05` → `1` as the user scrolls. The tag ("COMPLEX PROPERTY MATTERS?") is included in the character animation sequence.

### 3. `HorizontalScrollPhilosophy` — Sticky horizontal scroll
Uses a tall container (`height: N * 100vh`) with a sticky inner viewport. Scroll progress drives a `translateX` on the card track, converting vertical scroll into horizontal motion. No JS animation libraries — pure `requestAnimationFrame`-free, scroll-event driven.

### 4. `ReferencesSwiperGallery` — 3D Coverflow
Uses Swiper's `EffectCoverflow` module. The `onProgress` callback fires per-frame during drag to set `slide.style.opacity` based on `slide.progress`, creating a physics-linked fade for out-of-view cards.

### 5. Hero Zoom — CSS `@keyframes subtleZoom`
Applied to the hero background `div` on References and Services pages. Scales from `1.0` → `1.15` over 30 seconds with `ease-in-out infinite alternate` (Ken Burns effect).

### 6. Animated Counters — `AboutStats` + `StatsSection`
`IntersectionObserver` triggers a `requestAnimationFrame` count-up animation with an `easeOut` curve when the section enters the viewport.

---

## Public Assets

```
public/
├── fonts/               # "The Seasons" font family (OTF + WOFF2)
├── images/
│   ├── luxury_estate_hero.jpg      # References page hero (AI-generated twilight estate)
│   ├── services_hero_new.jpg       # Services page hero (AI-generated luxury consulting room)
│   ├── owners_bg_wide.jpg          # About page establishing shot
│   └── ...                         # Other property images
├── card1.jpg / card2.jpg / card3.jpg   # Philosophy section images
├── maximilian bossert.webp         # Founder portrait
├── elena bossert.webp              # Director portrait
└── aboutbg.png                     # About approach section background texture
```

---

## Agent & Engineering Guidelines

This project ships with two engineering guideline documents:

- **`AGENTS.md`** — Next.js version-specific rules (read `node_modules/next/dist/docs/` before writing any Next.js code)
- **`CLAUDE.md`** — Comprehensive UI/UX, animation, and frontend engineering standards covering: design system consistency, motion design rules, scroll animation patterns, performance, accessibility, component quality, and the final quality bar for all UI work

---

## Development Notes

- **Next.js version**: 16.3.3 with Turbopack enabled by default
- **React version**: 19.2.8
- Before modifying any component, inspect existing pages to understand patterns — do not introduce inconsistent visual styles
- All new animations should use `transform` + `opacity` for GPU compositing
- Respect `prefers-reduced-motion` in CSS animations
- The `globals.css` file is the single source of truth for all design tokens, utility classes, and component styles

---

## Changelog

### September 2026 — Major UI Overhaul

#### References Page (`/references`)
- Replaced flat hero layout with a **100vh full-screen cinematic hero** featuring AI-generated luxury estate background
- Added **Ken Burns slow-zoom animation** (`subtleZoom` keyframes, 30s ease-in-out alternate)
- Added dark gradient overlay for text readability
- Navbar repositioned absolutely over the hero image
- Implemented **3D Coverflow swiper** with `EffectCoverflow` — replaces flat card grid
- Configured Swiper for exactly **3 visible cards**: active center + 2 rotated neighbours
- Implemented `onProgress` + `watchSlidesProgress` dynamic opacity — 4th/5th cards fade out smoothly without CSS masks causing clipping artefacts
- Custom prev/next circular navigation buttons
- Added `CtaSection` between gallery and footer

#### Services Page (`/services`)
- Replaced editorial split hero with **100vh full-screen cinematic hero**
- AI-generated luxury consulting room background (dark wood table provides clean text canvas)
- Hero includes title, serif accent, description, and a white CTA button
- "COMPLEX PROPERTY MATTERS?" tag moved into `ApproachHeadline` animation sequence — now reveals letter-by-letter before the main headline
- Removed bronze dot from tag

#### About Page (`/about`)
- Created **`HorizontalScrollPhilosophy`** component — sticky horizontal scroll experience converting vertical scroll into horizontal card pan across 3 philosophy pillars with Roman numerals, images, scroll progress indicators, and a fading section header
- Created **`AboutStats`** component — animated counting stats grid (`30+`, `€500M+`, `100%`, `50+`) on navy background with bronze serif numbers

#### `ApproachHeadline` component
- Extended to accept an optional `tag` prop
- Tag is now part of the per-character scroll animation sequence — reveals before the main headline
