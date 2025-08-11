export type Session = {
    session: {
        id: string
        userId: string
        createdAt: Date
        updatedAt: Date
    }
    user: {
        id: string
        email: string
        name: string
    }
}

export type AuthService = {
    handler: (req: Request) => Promise<Response>
    getSession: (headers: Headers) => Promise<Session | null>
}
