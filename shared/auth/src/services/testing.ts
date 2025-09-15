import { type DBType, schema } from '@shared/database'
import type { AuthService, Session } from '../models'

export async function createTestingAuthService(
    db: DBType,
): Promise<AuthService> {
    await db
        .insert(schema.user)
        .values({
            email: 'johndoe@example.com',
            id: 'U0001',
            name: 'John Doe',
        })
        .onConflictDoNothing()

    const session: Session = {
        session: {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: 'S0001',
            userId: 'U0001',
        },
        user: {
            email: 'johndoe@example.com',
            id: 'U0001',
            name: 'John Doe',
        },
    }

    return {
        handler: () => {
            throw new Error('No implement')
        },
        getSession: async () => session,
    }
}
