import { Navigate, Outlet, useLocation } from 'react-router'
import { Center } from '@/components/center'
import { Spinner } from '@/components/spinner'
import { useAuth } from '@/hooks/use-auth'

export function AuthLoading() {
    return (
        <Center>
            <Spinner />
        </Center>
    )
}

export function RequireAuthLayout() {
    const auth = useAuth()

    const location = useLocation()

    if (auth === undefined) {
        return <AuthLoading />
    }

    if (auth === null) {
        return (
            <Navigate
                to={{
                    pathname: '/login',
                    search: `?redirect=${encodeURIComponent(location.pathname)}`,
                }}
            />
        )
    }

    return <Outlet />
}

export function NoAuthLayout() {
    const auth = useAuth()

    if (auth === undefined) {
        return <AuthLoading />
    }

    if (auth) {
        return <Navigate to="" />
    }

    return <Outlet />
}
