import { createAuthClient } from '@shared/auth/react'

export const authClient = createAuthClient(
    import.meta.env.VITE_PUBLIC_SERVER_URL,
)
