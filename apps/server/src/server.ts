import type { AddressInfo } from 'node:net'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { trpcHandler } from '@shared/api/server'
import { type Context, createContext, type HonoEnv } from '@shared/context'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

export type StartServerOptions = {
    signal?: AbortSignal
    port?: number
    hostname?: string
    // The context can be passed as props for testing
    context?: Context
}

export async function startServer(
    options: StartServerOptions,
): Promise<AddressInfo> {
    const context = options.context ?? (await createContext())

    const app = new Hono<HonoEnv>()

    // Useful for allowing auth requests from the client (if hosted on a different origin)
    app.use(
        cors({
            origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
            credentials: true, // allow cookies/authorization headers
            allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowHeaders: ['Content-Type', 'Authorization', 'trpc-accept'],
        }),
    )

    // We make our context available inside Hono. This may be useful in the future
    // if we need to implement more Hono routers or endpoints.
    app.use((c, next) => {
        c.env = context
        // TODO: Other stuff in this middleware
        return next()
    })

    app.get('/health', (c) => c.json({ status: 'ok' }))
    app.all('/api/trpc/*', (c) => trpcHandler(c.req.raw, c.env))
    app.all('/api/auth/*', (c) => c.env.auth.handler(c.req.raw))

    if (context.settings.env === 'production') {
        app.use('*', serveStatic({ root: './public', index: 'index.html' }))
        app.get('*', serveStatic({ path: './public/index.html' }))
    }

    return new Promise<AddressInfo>((resolve) => {
        const server = serve(
            {
                fetch: app.fetch,
                hostname: options.hostname,
                port: options.port,
            },
            resolve,
        )

        options.signal?.addEventListener('abort', async () => {
            server.close()
            // We close the context automatically on server end only if
            // the startServer function created it
            if (!options.context) {
                await context.close()
            }
        })
    })
}
