import { startServer } from './server'

const controller = new AbortController()

startServer({
    signal: controller.signal,
    hostname: process.env.HOSTNAME,
    port: process.env.PORT ? Number.parseInt(process.env.PORT) : 3000,
})
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
