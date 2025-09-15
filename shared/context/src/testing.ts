import { createTestingAuthService } from '@shared/auth/services/testing'
import { createDatabaseClient, createDrizzle } from '@shared/database'
import type { Context, Settings } from '.'

export async function createTestContext(): Promise<Context> {
    const settings: Settings = {
        env: 'testing',
    }

    const db = createDrizzle(await createDatabaseClient())
    const auth = await createTestingAuthService(db)

    return {
        auth,
        db,
        settings,
        close: async () => {
            await db.$client.end()
        },
    }
}
