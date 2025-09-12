import { Navigate, useLocation, useSearchParams } from 'react-router'
import { useSession } from '@/auth/hooks'
import { Center } from '@/components/center'
import { Spinner } from '@/components/spinner'

export function AuthLoading() {
    return (
        <Center>
            <Spinner />
        </Center>
    )
}

export function AuthBarrier(props: { children?: React.ReactNode }) {
    const auth = useSession()

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

    return <>{props.children}</>
}

export function NoAuthBarrier(props: { children?: React.ReactNode }) {
    const auth = useSession()

    const [params] = useSearchParams()

    const redirect = params.get('redirect') || '/'

    if (auth === undefined) {
        return <AuthLoading />
    }

    if (auth) {
        return <Navigate to={redirect} />
    }

    return <>{props.children}</>
}
