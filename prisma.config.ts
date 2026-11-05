// Config for the Prisma CLI (migrate, generate, studio).
// The Next.js app doesn't read this file; it connects through src/lib/db.ts.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts ",
  },
  datasource: {
    // Migrations use the direct (unpooled) connection: Neon's pooler doesn't
    // support everything `prisma migrate` needs. process.env (not env()) so
    // `prisma generate` still works without a URL, e.g. during CI installs.
    url: process.env["DATABASE_URL_UNPOOLED"] ?? process.env["DATABASE_URL"],
  },
});
