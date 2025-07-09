import * as schema from './schema'
import postgres, { type Sql } from 'postgres'
import { PostgresJsDatabase, drizzle, type PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import type { PgTransaction } from 'drizzle-orm/pg-core'
import type { ExtractTablesWithRelations } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'

export { schema }

export async function createDatabaseClient(): Promise<Sql> {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set.')
    }

    return postgres(process.env.DATABASE_URL)
}

export function createDrizzle(client: Sql): DBType {
    return drizzle(client, { schema })
}

export type DBType = PostgresJsDatabase<typeof schema> & { $client: Sql }
export type TXType = PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>
export type DBTX = DBType | TXType

export const createId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 10)