import { ApiProvider } from '@shared/api/client'
import { RouterProvider } from 'react-router'
import { Toaster } from '@shared/components/ui/sonner'
import { router } from './routers/root'

export function App() {
    return (
        <>
            <Toaster />
            <ApiProvider>
                <RouterProvider router={router} />
            </ApiProvider>
        </>
    )
}
