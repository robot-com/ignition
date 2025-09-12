import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export function SignUpScreen() {
    return (
        <div className="size-full overflow-auto flex items-center justify-center p-4 relative">
            <img
                className="absolute inset-0 w-full h-full object-cover"
                src={background}
                alt="Background"
            />
            <div className="relative z-10 w-full max-w-md">
                <SignUpForm />
            </div>
        </div>
    )
}

function SignUpForm() {
    const [params] = useSearchParams()

    const redirect = params.get('redirect') || undefined
    const callbackURL = new URL(redirect || '/', window.location.href).href

    const handleLoginGoogle = useCallback(
        () => loginWithGoogle(callbackURL),
        [callbackURL],
    )

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()

            const formData = new FormData(e.target as HTMLFormElement)

            const name = formData.get('name') as string
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            toast.loading('Signing in', { position: 'top-center' })
            authClient.signUp
                .email({
                    email,
                    password,
                    name,
                    callbackURL,
                })
                .then((r) => {
                    toast.dismiss()
                    if (r.error) {
                        toast.error(r.error.message ?? 'Sign up failed', {
                            position: 'top-center',
                            duration: 100_0000,
                        })
                    } else {
                        toast.success('Sign up successful!', {
                            position: 'top-center',
                        })
                    }
                })
                .catch(() => {
                    toast.dismiss()
                    toast.error('Sign up failed', {
                        position: 'top-center',
                        duration: 100_0000,
                    })
                })
        },
        [callbackURL],
    )

    const [showPassword, setShowPassword] = useState(false)

    return (
        <Card className="w-full bg-card border-border/50 shadow-2xl">
            <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                    <img src={logo} alt="Google Logo" className="size-16" />
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold text-balance">
                        Ignition
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-balance">
                        Full stack platform template. Create new account to get
                        started. Or login if you already have one.
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
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="name"
                            className="text-sm font-medium text-card-foreground"
                        >
                            Full Name
                        </Label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="John Doe"
                                className="pl-10 h-12 bg-input border-border focus:ring-ring"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="text-sm font-medium text-card-foreground"
                        >
                            Email
                        </Label>
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="tcichero@robot.com"
                                className="pl-10 h-12 bg-input border-border focus:ring-ring"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="password"
                            className="text-sm font-medium text-card-foreground"
                        >
                            Password
                        </Label>
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="pl-10 pr-10 h-12 bg-input border-border focus:ring-ring"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="size-4" />
                                ) : (
                                    <EyeIcon className="size-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                        Sign Up
                    </Button>

                    <div className="flex justify-around text-sm">
                        <Button asChild variant="link">
                            <Link
                                to={{
                                    pathname: '/login',
                                    search: redirect
                                        ? `?redirect=${encodeURIComponent(redirect)}`
                                        : undefined,
                                }}
                            >
                                login
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
