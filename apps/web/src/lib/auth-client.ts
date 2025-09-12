import { createAuthClient } from '@shared/auth/react'

export const authClient = createAuthClient(process.env.VITE_PUBLIC_SERVER_URL)
