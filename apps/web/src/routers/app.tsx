import { Outlet, type RouteObject } from 'react-router'
import { AuthBarrier } from '@/auth/components/barriers'
import { SidebarLayout } from '@/layouts/sidebar-layout'
import { HomeScreen } from '@/screens/home'

export const appRoute: RouteObject = {
    element: (
        <AuthBarrier>
            <SidebarLayout>
                <Outlet />
            </SidebarLayout>
        </AuthBarrier>
    ),
    children: [
        {
            path: '/',
            element: <HomeScreen />,
        },
        {
            path: '/zzz',
            element: <HomeScreen />,
        },
    ],
}
