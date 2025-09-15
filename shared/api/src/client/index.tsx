import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
    createTRPCClient,
    httpBatchStreamLink,
    httpSubscriptionLink,
    splitLink,
} from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import { useState } from 'react'
import superjson from 'superjson'
import type { AppRouter } from '../server/root'

export function createApiClient(url: string) {
    return createTRPCClient<AppRouter>({
        links: [
            splitLink({
                condition: (op) => op.type === 'subscription',
                true: httpSubscriptionLink({
                    url: new URL('/api/trpc', url).href,
                    transformer: superjson,
                }),
                false: httpBatchStreamLink({
                    url: new URL('/api/trpc', url).href,
                    transformer: superjson,
                }),
            }),
        ],
    })
}

export const { TRPCProvider, useTRPC, useTRPCClient } =
    createTRPCContext<AppRouter>()

export function ApiProvider(props: {
    children: React.ReactNode
    url?: string
}) {
    const url = props.url ?? window.location.href
    const [trpc] = useState(() => createApiClient(url))
    const [queryClient] = useState(() => new QueryClient())

    // TODO: Recreate client if auth state changes

    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider trpcClient={trpc} queryClient={queryClient}>
                {props.children}
            </TRPCProvider>
        </QueryClientProvider>
    )
}
