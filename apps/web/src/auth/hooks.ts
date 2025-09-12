import { useEffect } from 'react'
import { authClient } from '@/auth/auth-client'
import { useLocalStorageState } from '../hooks/use-local-storage-state'
import type { Session, User } from './types'

/**
 * If null, the user is not logged in.
 * If undefined, the session is still loading.
 * If an object, the user is logged in.
 */
export function useSession(): Session | null | undefined {
    const [savedSession, setSavedSession] =
        useLocalStorageState<Session | null>('session-v001', () => null)

    const session = authClient.useSession()

    useEffect(() => {
        if (session.data) {
            setSavedSession({
                id: session.data.session.id,
                createdAt: session.data.session.createdAt,
                expiresAt: session.data.session.expiresAt,
                user: {
                    email: session.data.user.email,
                    id: session.data.user.id,
                    name: session.data.user.name,
                    image: session.data.user.image || null,
                },
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
            id: session.data.session.id,
            createdAt: session.data.session.createdAt,
            expiresAt: session.data.session.expiresAt,
            user: {
                email: session.data.user.email,
                id: session.data.user.id,
                name: session.data.user.name,
                image: session.data.user.image || null,
            },
        }
    }

    return savedSession
}

/**
 * Returns user info. It is requered to be logged in.
 * If the user is not logged in, it will throw an error.
 * If the session is still loading, it will throw an error.
 */
export function useUser(): User {
    const session = useSession()

    if (!session) {
        throw new Error(
            'User is not logged in. Please use useSession() instead or use it inside a AuthBarrier.',
        )
    }

    return session.user
}
