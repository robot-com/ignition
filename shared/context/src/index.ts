import type { AuthService } from '@shared/auth/models'
import { createAuthService } from '@shared/auth/services'
import type { DBType } from '@shared/database'
import { createDatabaseClient, createDrizzle } from '@shared/database'

export type Settings = {
    env: string
} // Replace with actual Settings type

export type Context = {
    auth: AuthService
    db: DBType
    settings: Settings

    close: () => Promise<void>
}

export type HonoEnv = {
    Bindings: Context
}

// This function is async because it may potentially involve asynchronous operations such as
// initializing a database connection or fetching configuration settings.
export async function createContext(): Promise<Context> {
    // Initialize auth, db, and settings here
    const settings: Settings = {
        env: process.env.NODE_ENV || 'development',
    }
    const db = createDrizzle(await createDatabaseClient())
    const auth: AuthService = await createAuthService(db)

    return {
        auth,
        db,
        settings,
        close: async () => {
            await db.$client.end()
        },
    }
}
