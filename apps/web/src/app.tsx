import { ApiProvider, useTRPC } from '@shared/api/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

export function App() {
    return <ApiProvider>
        <Example />
    </ApiProvider>
}

export function Example() {
    const trpc = useTRPC()

    const posts = useQuery(trpc.posts.list.queryOptions())

    const createPost = useMutation(trpc.posts.create.mutationOptions({
        onSuccess: () => {
            posts.refetch()
        },
        onError: (error) => {
            console.error('Error creating post:', error)
        }
    }))

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const title = formData.get('title') as string
        const content = formData.get('content') as string

        createPost.mutate({ title, content })
    }, [trpc.posts.create, createPost])

    return <main>
        <section>
            <h2>Posts</h2>
            <ul className='flex gap-2 flex-col max-w-2xl py-4'>
                {posts.data?.map((post) => (
                    <li key={post.id} className='bg-amber-200 rounded-md px-2 py-1'>
                        {post.title}

                    </li>
                )) || 'Loading...'}
            </ul>
        </section>
        <section>
            <h2>Create new</h2>
            <form onSubmit={handleSubmit} className='flex gap-2 flex-col max-w-2xl'>
                <input type="text" name="title" placeholder="Title" className='border-b' />
                <textarea name="content" placeholder="Content" className='border-b'></textarea>
                <button type="submit" className='bg-blue-500 text-white'>Create Post</button>
            </form>
        </section>
    </main>
}