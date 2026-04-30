<div align="center">

```
██╗ ██████╗ ██████╗  █████╗ ██╗   ██╗██╗████████╗██╗   ██╗
██║██╔════╝ ██╔══██╗██╔══██╗██║   ██║██║╚══██╔══╝╚██╗ ██╔╝
██║██║  ███╗██████╔╝███████║██║   ██║██║   ██║    ╚████╔╝ 
██║██║   ██║██╔══██╗██╔══██║╚██╗ ██╔╝██║   ██║     ╚██╔╝  
██║╚██████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║   ██║      ██║   
╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝   ╚═╝      ╚═╝   
```

**A space-themed social platform where ideas orbit freely.**  
Post. Connect. Explore the cosmos of conversation.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)
![Neon](https://img.shields.io/badge/DB-Neon-00E5BF?style=flat-square&logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-F5A96B?style=flat-square)

</div>

---

## ✦ What is iGravity?

iGravity is a Twitter/X-style social platform wrapped in a space aesthetic. Create posts, drop comments, follow interesting people, and explore a feed that pulls you in — like gravity.

Clean UI. Smooth animations. Six themes. No fluff.

---

## ✦ Features

| | |
|---|---|
| 🚀 **Post & comment** | Share thoughts with text, links, and images |
| 🪐 **Threaded comments** | Nested replies with full comment sections per post |
| 👤 **User profiles** | Clerk-backed auth with synced profile pages |
| 🌌 **Six themes** | Bubblegum, Claymorphism, Dark Matter, Default, Vercel, Vintage |
| 🌗 **Dark / light mode** | Seamless toggle via `next-themes` |
| 🖼️ **Image uploads** | Server-side Vercel Blob uploads (JPEG/PNG/GIF/WebP, ≤5 MB) |
| ⚡ **Fast data layer** | TanStack React Query with server actions — no separate API |
| 📱 **Responsive layout** | Bottom nav on mobile, sidebars on desktop |

---

## ✦ Tech Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Auth:** Clerk (`@clerk/nextjs`)
- **Database:** Neon PostgreSQL (serverless) + Drizzle ORM
- **Storage:** Vercel Blob
- **State/Data:** TanStack React Query
- **UI:** Tailwind CSS 4, Radix UI, Lucide icons, Motion, Sonner

---

## ✦ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/nagraj05/igravity.git
cd igravity

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in the values (see Environment Variables below)

# 4. Push the schema to your database
npx drizzle-kit migrate

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're in orbit.

---

## ✦ Environment Variables

Create a `.env.local` file with:

```env
# Neon PostgreSQL
DATABASE_URL=           # Pooled connection string (pgbouncer)
DATABASE_URL_UNPOOLED=  # Direct connection (used for migrations)

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup

# Vercel Blob
BLOB_READ_WRITE_TOKEN=  # Store must be set to public access in Vercel dashboard
```

---

## ✦ Database

Migrations are handled via Drizzle Kit:

```bash
npx drizzle-kit generate   # Generate migration from schema changes
npx drizzle-kit migrate    # Apply migrations to the database
npx drizzle-kit studio     # Open Drizzle Studio (DB GUI)
```

---

## ✦ Project Structure

```
igravity/
├── app/
│   ├── (auth)/          ← Login & signup pages (Clerk catch-all)
│   ├── (main)/          ← Protected app routes (home, profile, messages…)
│   ├── api/upload/      ← Server-side Vercel Blob upload route
│   ├── styles/themes/   ← Six CSS theme files
│   └── page.tsx         ← Public landing page
├── components/
│   ├── gravity-components/  ← All app-specific components
│   │   ├── landing-page/    ← Animated landing page sections
│   │   ├── cards/           ← User suggestion cards
│   │   └── …               ← Feed, PostCard, CommentSection, etc.
│   └── ui/              ← shadcn/ui primitives (do not edit)
├── lib/
│   ├── actions.ts       ← All server actions (data layer)
│   └── db/              ← Drizzle schema + DB connection
└── middleware.ts         ← Clerk route protection
```

---

## ✦ Theming

Six theme flavors live in `app/styles/themes/`. The active theme is persisted in `localStorage` and toggled from the settings page. Dark/light mode is handled separately via `next-themes`.

| Theme | Vibe |
|---|---|
| Default | Clean and minimal |
| Dark Matter | Deep space dark |
| Bubblegum | Soft pinks and purples |
| Claymorphism | Chunky and playful |
| Vercel | Sharp and professional |
| Vintage | Warm and retro |

---

## ✦ Troubleshooting

**Image uploads hang silently**  
→ Make sure your Vercel Blob store is set to **public access** in the Vercel dashboard. Private stores reject uploads without throwing.

**Auth redirects loop**  
→ Confirm `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` are set in `.env.local`.

**Migrations fail**  
→ Use `DATABASE_URL_UNPOOLED` (direct connection) for `drizzle-kit migrate`. The pooled URL doesn't support DDL statements.

---

## ✦ Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

---

## ✦ Credits

Built with [Next.js](https://nextjs.org/), [Clerk](https://clerk.com/), [Neon](https://neon.tech/), [Drizzle ORM](https://orm.drizzle.team/), and [Vercel Blob](https://vercel.com/docs/storage/vercel-blob).  
UI primitives from [shadcn/ui](https://ui.shadcn.com/). Animations via [Motion](https://motion.dev/).

---

<div align="center">

Made with ♥ for people who want their social feed to feel a little more cosmic.

</div>
