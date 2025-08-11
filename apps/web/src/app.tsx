import { ApiProvider } from '@shared/api/client'
import { RouterProvider } from 'react-router'
import { router } from './routers/root'

export function App() {
    return (
        <ApiProvider>
            <RouterProvider router={router} />
        </ApiProvider>
    )
}
