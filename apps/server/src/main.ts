import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { trpcHandler } from '@shared/api/server'
import { createContext } from '@shared/context'

async function main() {
    const context = await createContext()

    const app = new Hono()

    app.all('/api/trpc/:path*', c => trpcHandler(c.req.raw, context))

    return new Promise((resolve) => serve(app, resolve))
}


main()
    .then(() => {
        console.info('Server started successfully');
    })
    .catch((err) => {
        console.error('Error starting server:', err);
        process.exit(1);
    });