import { createBetterAuthPublic } from './src/services'
import { createDatabaseClient, createDrizzle } from '@shared/database'

export const auth = createBetterAuthPublic(
    createDrizzle(await createDatabaseClient())
)
