import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined in the environment variables')
}

console.info('Using database URL:', databaseUrl)

export default defineConfig({
    out: './drizzle',
    schema: './src/schema/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: databaseUrl,
    },
})
