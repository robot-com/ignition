import { publicProcedure, router } from "@shared/api-helpers";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const appRouter = router({
    hello: publicProcedure.query(() => {
        return "Hello world!";
    }),
})

export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>