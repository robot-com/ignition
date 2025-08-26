import { useTRPC } from '@shared/api/client'
import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function HomeScreen() {
    const queryClient = useQueryClient()
    const trpc = useTRPC()
    const createPost = useMutation(
        trpc.posts.create.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.posts.list.queryFilter())
            },
            onError: (error) => {
                console.error('Error creating post:', error)
            },
        }),
    )

    return (
        <main className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <form
                className="space-y-2"
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    createPost.mutate({
                        title: formData.get('title') as string,
                        content: formData.get('content') as string,
                    })
                }}
            >
                <div className="space-y-1">
                    <Label>Post title</Label>
                    <Input name="title" placeholder="Top 10 ..." />
                </div>
                <div className="space-y-1">
                    <Label>Content</Label>
                    <Textarea name="content" />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={createPost.isPending}
                >
                    Create
                </Button>
            </form>
            <Suspense fallback={<div>Loading...</div>}>
                <PostList />
            </Suspense>
        </main>
    )
}

function PostList() {
    const trpc = useTRPC()
    const { data: posts } = useSuspenseQuery(trpc.posts.list.queryOptions())

    if (posts.length === 0) {
        return <div>No posts found</div>
    }

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id} className="pb-2">
                    <h3 className="text-md">{post.title}</h3>
                    <p className="text-xs">{post.content}</p>
                </li>
            ))}
        </ul>
    )
}
