import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_DATABASE_URL || 'fallback_url_here',
  },
  verbose: true,
  strict: true,
})