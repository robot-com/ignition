import type { RouteObject } from 'react-router'
import { NoAuthLayout } from '@/layouts/auth'
import { LoginScreen } from '@/screens/login'

export const authRoute: RouteObject = {
    element: <NoAuthLayout />,
    children: [
        {
            path: '/login',
            element: <LoginScreen />,
        },
        // TODO: Login & more
    ],
}
