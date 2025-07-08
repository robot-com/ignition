import { ApiProvider, useTRPC } from '@shared/api/client'
import { useQuery } from '@tanstack/react-query'

export function App() {
    return <ApiProvider>
        <Example />
    </ApiProvider>
}

export function Example() {
    const trpc = useTRPC()

    const hello = useQuery(trpc.hello.queryOptions())

    return <h1>{hello.data}</h1>
}