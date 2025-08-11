import { authClient } from '@shared/auth/react'
import { useEffect } from 'react'
import { useLocalStorageState } from './use-local-storage-state'

export type AuthData = {
    userId: string
    email: string
    name: string
    image: string | null
}

/**
 * If null, the user is not logged in.
 * If undefined, the session is still loading.
 * If an object, the user is logged in.
 */
export function useAuth(): AuthData | null | undefined {
    const [savedSession, setSavedSession] =
        useLocalStorageState<AuthData | null>('session', () => null)

    const session = authClient.useSession()

    useEffect(() => {
        if (session.data) {
            setSavedSession({
                email: session.data.user.email,
                userId: session.data.user.id,
                name: session.data.user.name,
                image: session.data.user.image || null,
            })
        }

        if (!session.isPending && !session.data) {
            // If the session is not pending and there's no data, clear the saved session
            if (window.navigator.onLine) {
                setSavedSession(null)
            }
        }
    }, [session.data, session.isPending, setSavedSession])

    if (session.isPending) {
        return savedSession || undefined
    }

    if (session.data) {
        return {
            userId: session.data.user.id,
            email: session.data.user.email,
            name: session.data.user.name,
            image: session.data.user.image || null,
        }
    }

    return savedSession
}
