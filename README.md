# JobPilot

An AI-powered job application tracker. JobPilot finds job listings, scores how well each one matches your resume, helps you prepare applications, and tracks every application through your pipeline.

> **Status:** work in progress. Sections below are marked ✅ built or 🚧 planned.

## Features

- ✅ **Database and data model:** users, resumes, companies, jobs and applications (PostgreSQL on Neon, Prisma)
- ✅ **Authentication backend:** GitHub sign-in with Better Auth
- 🚧 **Sign-in UI and dashboard**
- 🚧 **Application tracker:** Kanban pipeline (Discovered → Applied → Interviewing → Offer / Rejected)
- 🚧 **Job discovery:** scheduled fetching from sources that allow it (Greenhouse and Lever job boards, Adzuna, and others)
- 🚧 **AI match scoring:** a 0–100 score with reasons, comparing a job description to your resume (Claude API)
- 🚧 **Assisted apply:** tailored cover letters and answer drafts. You review and submit every application yourself. JobPilot never auto-submits.

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS · PostgreSQL (Neon) · Prisma 7 · Better Auth · Claude API

## Getting started

Requires Node 22 (see `.nvmrc`).

```bash
git clone https://github.com/we-live-inside-a-dream/jobpilot.git
cd jobpilot
npm install
cp .env.example .env   # then fill in the values
npm run db:migrate
npx prisma db seed
npm run dev
```

Open http://localhost:3000.

### Environment variables

See `.env.example`. You need a Neon database (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`), a `BETTER_AUTH_SECRET`, and a GitHub OAuth app (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`) with the callback URL `http://localhost:3000/api/auth/callback/github`. Never commit `.env`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` / `npm run format:check` | Lint and formatting checks |
| `npm run db:migrate` | Apply migrations and regenerate the Prisma client |
| `npm run db:studio` | Browse the database |

## Data model

`User` has many `Resume`s and many `Application`s. A `Company` has many `Job`s. An `Application` links one user to one job, and optionally to the resume used. A user can have only one application per job.
