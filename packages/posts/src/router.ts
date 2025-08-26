import { protectedProcedure, router } from '@shared/api-helpers'
import { schema } from '@shared/database'
import z from 'zod'

export const posts = router({
    list: protectedProcedure.query(async ({ ctx }) => {
        const posts = await ctx.db
            .select({
                id: schema.posts.id,
                title: schema.posts.title,
                content: schema.posts.content,
            })
            .from(schema.posts)

        return posts
    }),

    create: protectedProcedure
        .input(
            z.object({
                title: z.string().min(1, 'Title is required'),
                content: z.string().min(1, 'Content is required'),
            }),
        )
        .output(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const [post] = await ctx.db
                .insert(schema.posts)
                .values({
                    title: input.title,
                    content: input.content,
                    authorId: ctx.session.user.id,
                })
                .returning({
                    id: schema.posts.id,
                })

            return post!
        }),
})
