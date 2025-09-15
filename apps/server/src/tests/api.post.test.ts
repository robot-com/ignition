import test, { after, before } from 'node:test'
import { createApiClient } from '@shared/api/client'
import { createTestContext } from '@shared/context/testing'
import { startServer } from '../server'

const controller = new AbortController()

const TEST_PORT = 3013
const TEST_HOSTNAME = 'localhost'
const TEST_BASE_URL = `http://${TEST_HOSTNAME}:${TEST_PORT}`

const context = await createTestContext()

before(async () => {
    await startServer({
        signal: controller.signal,
        port: TEST_PORT,
        hostname: TEST_HOSTNAME,
        context,
    })
})

test('create new post', async () => {
    const api = createApiClient(TEST_BASE_URL)

    await api.posts.create.mutate({
        title: 'New Post',
        content: 'This is a new post',
    })
})

after(async () => {
    controller.abort()
    await context.close()
})
