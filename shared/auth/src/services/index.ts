import type { DBType } from '@shared/database'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import type { AuthService, Session } from '../models'

function createBetterAuth(db: DBType) {
    return betterAuth({
        database: drizzleAdapter(db, { provider: 'pg' }),
        trustedOrigins: [process.env.CLIENT_URL ?? 'http://localhost:5173'],
        emailAndPassword: {
            enabled: true,
            sendResetPassword: async (data, _request) => {
                console.debug('Reset password requested for', data)
            },
        },
        socialProviders: {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            },
        },
    })
}

export async function createAuthService(db: DBType): Promise<AuthService> {
    const auth = createBetterAuth(db)

    async function getSession(headers: Headers): Promise<Session | null> {
        return auth.api.getSession({ headers })
    }

    return {
        getSession,
        handler: auth.handler,
    }
}

export function createBetterAuthPublic(db: DBType): unknown {
    return createBetterAuth(db)
}
