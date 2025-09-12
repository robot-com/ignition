import { type FormEvent, type ReactNode, useCallback } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import background from '@/assets/background.jpg'
import google from '@/assets/google.svg'
import logo from '@/assets/icon.png'
import { authClient } from '@/auth/auth-client'
import { loginWithGoogle } from '@/auth/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCallbackURL } from '../hooks'

export function AuthScreen(props: { children: ReactNode }) {
    return (
        <div className="size-full overflow-auto flex items-center justify-center p-4 relative">
            <img
                className="absolute inset-0 w-full h-full object-cover"
                src={background}
                alt="Background"
            />
            <div className="relative z-10 w-full max-w-md overflow-auto max-h-full">
                {props.children}
            </div>
        </div>
    )
}

export type AuthFormProps = {
    title: string
    description: string
    onSubmit: (e: FormEvent) => void
    children: ReactNode
    action: {
        title: string
        pathname: string
    }
}

export function AuthForm(props: AuthFormProps) {
    const callbackURL = useCallbackURL()

    const handleLoginGoogle = useCallback(
        () => loginWithGoogle(callbackURL.href),
        [callbackURL],
    )

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()

            const formData = new FormData(e.target as HTMLFormElement)

            const email = formData.get('email') as string
            const password = formData.get('password') as string

            toast.loading('Signing in', { position: 'top-center' })
            authClient.signIn
                .email({
                    email,
                    password,
                    callbackURL: callbackURL.href,
                })
                .then((r) => {
                    toast.dismiss()
                    if (r.error) {
                        toast.error(r.error.message ?? 'Login failed', {
                            position: 'top-center',
                            duration: 100_0000,
                        })
                    } else {
                        toast.success('Login successful!', {
                            position: 'top-center',
                        })
                    }
                })
                .catch(() => {
                    toast.dismiss()
                    toast.error('Login failed', {
                        position: 'top-center',
                        duration: 100_0000,
                    })
                })
        },
        [callbackURL],
    )

    return (
        <Card className="w-full bg-card border-border/50 shadow-2xl min-w-64">
            <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                    <img src={logo} alt="Google Logo" className="size-16" />
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold text-balance">
                        Ignition
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-balance">
                        Full stack platform template. Sign in to your account to
                        continue or create a new one.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <Button
                    variant="outline"
                    className="h-12 w-full"
                    onClick={handleLoginGoogle}
                >
                    <img src={google} className="size-6" alt="Google" />
                    Continue with google
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {props.children}
                    <div className="flex justify-around text-sm">
                        <Button asChild variant="link">
                            <Link
                                to={{
                                    pathname: props.action.pathname,
                                    search: `?redirect=${encodeURIComponent(`${callbackURL.pathname}${callbackURL.search}`)}`,
                                }}
                            >
                                {props.action.title}
                            </Link>
                        </Button>
                        <Button asChild variant="link">
                            <Link to="/reset-password">Reset password</Link>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
