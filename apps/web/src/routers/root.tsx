import { RequireAuthLayout } from '@/layouts/auth'
import { HomeScreen } from '@/screens/home'
import { createBrowserRouter } from 'react-router'
import { authRoute } from './auth'

export const router = createBrowserRouter([
    authRoute,
    {
        element: <RequireAuthLayout />,
        children: [
            {
                path: '/',
                element: <HomeScreen />
            },
        ],
    },
])
