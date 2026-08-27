# Bossert Immobilien

A modern, high-performance web application built for Bossert Immobilien, a premium real estate agency operating in the Rhein-Main region since 1991. The platform features an elegant client-facing interface for property exploration and real estate services, alongside a fully integrated, bespoke administrative CMS.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Modules
- **Database & ORM**: [MySQL](https://www.mysql.com/) + [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) (Auth.js)
- **Internationalization (i18n)**: [next-intl](https://next-intl-docs.vercel.app/)
- **Media Optimization**: [Sharp](https://sharp.pixelplumbing.com/)

## 📁 Project Structure

The project is structured utilizing the Next.js App Router paradigm, organized logically into feature and utility directories.

```text
bossert-immobilien/
├── prisma/                    # Database schema and seed scripts
│   ├── schema.prisma          # Prisma schema definition
│   └── seed.ts                # Database seeding logic
├── public/                    # Static assets (images, fonts, icons)
├── messages/                  # i18n translation files (en.json, de.json)
├── src/
│   ├── app/                   # Next.js App Router routes
│   │   ├── [locale]/          # Client-facing localized pages (en/de)
│   │   ├── admin/             # Administrative CMS routes (protected/unprotected)
│   │   ├── api/               # API route handlers
│   │   ├── globals.css        # Global CSS variables and base styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable React components
│   │   ├── admin/             # CMS-specific components
│   │   ├── home/              # Homepage specific components
│   │   ├── ui/                # Shared UI elements (buttons, inputs, cards)
│   │   └── properties/        # Property listing and detail components
│   ├── lib/                   # Utility functions and shared instances
│   │   ├── prisma.ts          # Prisma client instantiation
│   │   └── auth.ts            # NextAuth configuration
│   ├── hooks/                 # Custom React hooks
│   ├── i18n/                  # Internationalization configuration
│   └── data/                  # Hardcoded data/constants fallback
└── .env                       # Environment variables (do not commit)
```

## 🛠 Getting Started

### Prerequisites

- Node.js (v18.17 or newer recommended)
- MySQL database instance

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory and add the following keys. (Do not commit secrets to version control).
   ```env
   # Database connection
   DATABASE_URL="mysql://user:password@localhost:3306/bossert"

   # Authentication
   AUTH_SECRET="your-generated-secret"
   AUTH_URL="http://localhost:3000/api/auth"
   ```

3. **Database Migration:**
   Apply the Prisma schema to your database.
   ```bash
   npx prisma db push
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch and fix code issues.
- `npx prisma studio`: Opens a local UI to interact with your database.
