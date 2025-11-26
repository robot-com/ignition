import { type FormEvent, type ReactNode, useCallback } from 'react'
import { Link } from 'react-router'
import background from '@/assets/background.jpg'
import google from '@/assets/google.svg'
import logo from '@/assets/icon.png'
import { loginWithGoogle } from '@/auth/utils'
import { Button } from '@shared/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/card'
import { Separator } from '@shared/components/ui/separator'
import { useCallbackURL } from '../hooks'

export function AuthScreen(props: { children: ReactNode }) {
    return (
        <div className="size-full overflow-auto flex items-center justify-center sm:p-4 relative">
            <img
                className="absolute inset-0 w-full h-full object-cover"
                src={background}
                alt="Background"
            />
            <div className="relative z-10 w-full sm:max-w-md overflow-auto max-h-full">
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
    socialSignIn?: boolean
    actions: {
        title: string
        pathname: string
    }[]
}

export function AuthForm(props: AuthFormProps) {
    const callbackURL = useCallbackURL()

    const handleLoginGoogle = useCallback(
        () => loginWithGoogle(callbackURL.href),
        [callbackURL],
    )

    return (
        <Card className="w-full bg-card border-border/50 shadow-2xl min-w-64 rounded-none sm:rounded-xl">
            <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                    <img src={logo} alt="Google Logo" className="size-16" />
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold text-balance">
                        {props.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-balance">
                        {props.description}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {props.socialSignIn !== false && (
                    <>
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
                    </>
                )}

                <form onSubmit={props.onSubmit} className="space-y-4">
                    {props.children}
                    <div className="flex justify-around text-sm">
                        {props.actions.map((action, i) => (
                            <Button asChild variant="link" key={i}>
                                <Link
                                    to={{
                                        pathname: action.pathname,
                                        search: `?redirect=${encodeURIComponent(`${callbackURL.pathname}${callbackURL.search}`)}`,
                                    }}
                                >
                                    {action.title}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
