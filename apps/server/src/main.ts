import { serve } from '@hono/node-server'
import { trpcHandler } from '@shared/api/server'
import { createContext } from '@shared/context'
import { Hono } from 'hono'

async function main() {
    const context = await createContext()

    const app = new Hono()

    app.all('/api/trpc/*', (c) => trpcHandler(c.req.raw, context))
    app.all('/api/auth/*', (c) => context.auth.handler(c.req.raw))

    return new Promise((resolve) => serve(app, resolve))
}

main()
    .then(() => {
        console.info('Server started successfully')
    })
    .catch((err) => {
        console.error('Error starting server:', err)
        process.exit(1)
    })
