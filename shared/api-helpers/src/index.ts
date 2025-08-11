import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import type { TRPCContext } from './context'
export * from './context'

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<TRPCContext>().create({ transformer: superjson })

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure

/**
 * Export reusable procedure that checks if the user is authenticated
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    const session = await ctx.auth.getSession(ctx.req.headers)

    if (!session) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next({
        ctx: {
            session,
            ...ctx,
        },
    })
})
