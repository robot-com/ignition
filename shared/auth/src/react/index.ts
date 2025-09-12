import { createAuthClient as betterAuthCreateAuthClient } from 'better-auth/react'

export function createAuthClient(url?: string) {
    return betterAuthCreateAuthClient({
        basePath: '/api/auth',
        baseURL: url,
    })
}
