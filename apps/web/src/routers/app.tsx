import type { RouteObject } from 'react-router'
import { AuthBarrier } from '@/auth/components'
import { HomeScreen } from '@/screens/home'

export const appRoute: RouteObject = {
    element: <AuthBarrier />,
    children: [
        {
            path: '/',
            element: <HomeScreen />,
        },
    ],
}
