import { publicProcedure, router } from "@shared/api-helpers";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { posts } from "@packages/posts";

export const appRouter = router({
    posts
})

export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>