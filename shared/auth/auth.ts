import { createDatabaseClient, createDrizzle } from '@shared/database'
import { createBetterAuthPublic } from './src/services'

export const auth = createBetterAuthPublic(
    createDrizzle(await createDatabaseClient()),
)
