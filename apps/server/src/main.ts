import { Hono } from 'hono'
import { serve } from '@hono/node-server'

async function main() {
    const app = new Hono()

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