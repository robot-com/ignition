import type { AddressInfo } from 'node:net'
import { serve } from '@hono/node-server'
import { trpcHandler } from '@shared/api/server'
import { createContext, type HonoEnv } from '@shared/context'
import { Hono } from 'hono'

async function main(signal?: AbortSignal): Promise<AddressInfo> {
    const context = await createContext()

    const app = new Hono<HonoEnv>()

    app.use((c, next) => {
        c.env = context

        // TODO: Logger and other stuff in this middleware

        return next()
    })

    app.all('/api/trpc/*', (c) => trpcHandler(c.req.raw, c.env))
    app.all('/api/auth/*', (c) => c.env.auth.handler(c.req.raw))

    return new Promise<AddressInfo>((resolve) => {
        const server = serve(app, resolve)

        signal?.addEventListener('abort', () => {
            server.close()
            context.db.$client.end()
        })
    })
}

const controller = new AbortController()

main(controller.signal)
    .then((addr) => {
        console.info('Server started successfully', addr)
    })
    .catch((err) => {
        console.error('Error starting server:', err)
        process.exit(1)
    })

process.on('SIGINT', () => {
    console.info('Received SIGINT. Shutting down gracefully...')
    controller.abort()
})

process.on('SIGTERM', () => {
    console.info('Received SIGTERM. Shutting down gracefully...')
    controller.abort()
})
