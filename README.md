# My Prayer Site

A modern, searchable catalog of Christian prayers with semantic search, tags, and mobile-first UI.

**Live demo:** https://<seu-projeto>.vercel.app  
**Tech:** Next.js • TypeScript • Tailwind CSS • MongoDB • Vercel

## Why it matters
- Fast lookup of prayers, offline-friendly lists, and clean reading mode.
- Built to scale on Vercel’s edge network. [Vercel] provides global CDN and automatic deploys.  

## Features
- Filter by category, tags, and language.
- Full-text search with highlights.
- Reading mode with large typography.
- Admin import from JSON/CSV (script).
- Basic analytics and SEO tags.

## Architecture
- **Frontend**: Next.js App Router, RSC + client components.
- **Styling**: Tailwind + CSS variables.
- **Data**: MongoDB (Atlas). Models: `Prayer { _id, title, body, tags[], lang, createdAt }`.
- **API**: Route handlers under `/api/prayers`.
- **Build/Deploy**: Vercel.

