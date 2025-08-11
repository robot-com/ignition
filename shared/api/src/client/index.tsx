import {
    createTRPCClient,
    httpBatchStreamLink,
    httpSubscriptionLink,
    splitLink,
} from '@trpc/client'
import superjson from 'superjson'
import type { AppRouter } from '../server/root'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const trpc = createTRPCClient<AppRouter>({
    links: [
        splitLink({
            condition: (op) => op.type === 'subscription',
            true: httpSubscriptionLink({
                url: '/api/trpc',
                transformer: superjson,
            }),
            false: httpBatchStreamLink({
                url: '/api/trpc',
                transformer: superjson,
            }),
        }),
    ],
})

export const { TRPCProvider, useTRPC, useTRPCClient } =
    createTRPCContext<AppRouter>()

export function ApiProvider(props: { children: React.ReactNode }) {
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
