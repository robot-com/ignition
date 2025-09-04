import assert from 'node:assert/strict'
import test, { after, before } from 'node:test'
import { startServer } from '../server'

const controller = new AbortController()

const TEST_PORT = 3011
const TEST_HOSTNAME = 'localhost'
const TEST_BASE_URL = `http://${TEST_HOSTNAME}:${TEST_PORT}`

before(async () => {
    await startServer({
        signal: controller.signal,
        port: TEST_PORT,
        hostname: TEST_HOSTNAME,
    })
})

test('Server should start and respond to /health', async () => {
    const r = await fetch(new URL('/health', TEST_BASE_URL))
    assert.equal(r.status, 200)
})

after(() => {
    controller.abort()
})
