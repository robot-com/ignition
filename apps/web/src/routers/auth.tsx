import { Outlet, type RouteObject } from 'react-router'
import { NoAuthBarrier } from '@/auth/components/barriers'
import { LoginScreen } from '@/auth/screens/login'
import { NewPasswordScreen } from '@/auth/screens/new-password'
import { ResetPasswordScreen } from '@/auth/screens/reset-password'
import { SignUpScreen } from '@/auth/screens/sign-up'

export const authRoute: RouteObject = {
    element: (
        <NoAuthBarrier>
            <Outlet />
        </NoAuthBarrier>
    ),
    children: [
        {
            path: '/login',
            element: <LoginScreen />,
        },
        {
            path: '/sign-up',
            element: <SignUpScreen />,
        },
        {
            path: '/reset-password',
            element: <ResetPasswordScreen />,
        },
        {
            path: '/new-password',
            element: <NewPasswordScreen />,
        },
    ],
}
