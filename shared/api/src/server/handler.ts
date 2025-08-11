import type { Context } from '@shared/context'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from './root'

export function trpcHandler(req: Request, context: Context) {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => ({ ...context, req }),
    })
}
