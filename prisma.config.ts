// Config for the Prisma CLI (migrate, generate, studio).
// The Next.js app doesn't read this file; it connects through src/lib/db.ts.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // process.env (not env()) so `prisma generate` still works without a
    // database URL, e.g. during `npm install` in CI.
    url: process.env["DATABASE_URL"],
  },
});
