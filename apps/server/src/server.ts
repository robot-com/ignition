import type { AddressInfo } from 'node:net'
import { serve } from '@hono/node-server'
import { trpcHandler } from '@shared/api/server'
import { createContext, type HonoEnv } from '@shared/context'
import { Hono } from 'hono'

export type StartServerOptions = {
    signal?: AbortSignal
    port?: number
    hostname?: string
}

export async function startServer({
    signal,
    port,
    hostname,
}: StartServerOptions): Promise<AddressInfo> {
    const context = await createContext()

    const app = new Hono<HonoEnv>()

    app.use((c, next) => {
        c.env = context

        // TODO: Logger and other stuff in this middleware

        return next()
    })

    app.get('/health', (c) => c.json({ status: 'ok' }))
    app.all('/api/trpc/*', (c) => trpcHandler(c.req.raw, c.env))
    app.all('/api/auth/*', (c) => c.env.auth.handler(c.req.raw))

    return new Promise<AddressInfo>((resolve) => {
        const server = serve({ fetch: app.fetch, hostname, port }, resolve)

        signal?.addEventListener('abort', () => {
            server.close()
            context.db.$client.end()
        })
    })
}
