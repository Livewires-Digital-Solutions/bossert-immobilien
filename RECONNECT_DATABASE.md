# RECONNECT DATABASE CHECKLIST

This file tracks the temporary modifications made to disconnect Prisma and use static data so the frontend could be deployed to Vercel without a live database.

Once you have your production MySQL database ready and the `DATABASE_URL` environment variable properly configured in Vercel, follow these steps to revert the site to live data.

## 1. Delete Mock Data
- [ ] Delete `src/lib/mock-data.ts`

## 2. Revert Page Components
Search for the comment `// TEMP: DISABLED FOR STATIC DEPLOY` in the following files, uncomment the Prisma calls, and remove the fallback mock variables and mock imports.

### Homepage
- [ ] `src/app/[locale]/page.tsx`
  - Uncomment `prisma.property.findMany`
  - Uncomment `prisma.reference.findMany`
  - Remove `import { mockProperties, mockReferences, ... }`
  - Remove `const dbProperties = mockProperties...` and `const dbReferences = mockReferences...`

### Properties
- [ ] `src/app/[locale]/properties/page.tsx`
  - Uncomment `prisma.property.findMany`
  - Remove mock imports and variables.
- [ ] `src/app/[locale]/properties/[id]/page.tsx`
  - Uncomment `prisma.property.findUnique`
  - Remove mock imports and variables.

### Blog
- [ ] `src/app/[locale]/blog/page.tsx`
  - Uncomment `prisma.blogPost.findMany`
  - Remove mock imports and variables.
- [ ] `src/app/[locale]/blog/[slug]/page.tsx`
  - Uncomment Prisma calls in `generateStaticParams`, `generateMetadata`, and `BlogArticlePage`
  - Remove mock imports and variables.
- [ ] `src/app/[locale]/blog/category/[slug]/page.tsx`
  - Uncomment `prisma.blogPost.findMany`
  - Remove mock imports and variables.

### Knowledge
- [ ] `src/app/[locale]/knowledge/page.tsx`
  - Uncomment `prisma.knowledgeArticle.findMany`
  - Remove mock imports and variables.
- [ ] `src/app/[locale]/knowledge/[slug]/page.tsx`
  - Uncomment Prisma calls in `generateStaticParams`, `generateMetadata`, and `ArticlePage`
  - Remove mock imports and variables.

### References
- [ ] `src/app/[locale]/references/page.tsx`
  - Uncomment `prisma.reference.findMany`
  - Remove mock imports and variables.
- [ ] `src/app/[locale]/references/[id]/page.tsx`
  - Uncomment Prisma calls in `generateStaticParams`, `generateMetadata`, and `ReferenceDetailPage`
  - Remove mock imports and variables.

### Team
- [ ] `src/app/[locale]/about/team/page.tsx`
  - Uncomment `prisma.teamMember.findMany`
  - Remove mock imports and variables.
- [ ] `src/app/[locale]/about/team/[slug]/page.tsx`
  - Uncomment Prisma calls in `generateStaticParams`, `generateMetadata`, and `TeamMemberPage`
  - Remove mock imports and variables.

## 3. Verify TypeScript Types
When the Prisma schema is successfully generated (`npx prisma generate`), you can replace the explicit mock types (e.g. `: MockProperty`) used in `.map()` iterations back to inference or the Prisma types (e.g. `import { Property } from '@prisma/client'`).

## 4. Run Build
- [ ] Run `npm run build` locally to verify that Prisma generation works and all pages build successfully with live database connections.
