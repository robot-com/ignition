import type { RouteObject } from 'react-router'
import { NoAuthBarrier } from '@/auth/components'
import { LoginScreen } from '@/screens/login'
import { SignUpScreen } from '@/screens/sign-up'

export const authRoute: RouteObject = {
    element: <NoAuthBarrier />,
    children: [
        {
            path: '/login',
            element: <LoginScreen />,
        },
        {
            path: '/sign-up',
            element: <SignUpScreen />,
        },
    ],
}
