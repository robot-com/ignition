/**
 * User shape the frontend expects.
 *
 * Please, add here any additional fields you want to use in the frontend.
 */
export type User = {
    id: string
    email: string
    name: string
    image: string | null
}

/**
 * Session shape the frontend expects.
 *
 * Please, add here any additional fields you want to use in the frontend.
 */
export type Session = {
    id: string
    createdAt: Date
    expiresAt: Date
    user: User
}
