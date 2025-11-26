import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { authClient } from '@/auth/auth-client'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { AuthForm, AuthScreen } from '../components/layout'
import { useCallbackURL } from '../hooks'

export function SignUpScreen() {
    const callbackURL = useCallbackURL()

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
                    callbackURL: callbackURL.href,
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
        <AuthScreen>
            <AuthForm
                onSubmit={handleSubmit}
                title="Ignition"
                description="Full stack platform template. Create new account to get
                        started. Or login if you already have one."
                actions={[
                    { title: 'Login', pathname: '/login' },
                    { title: 'Reset password', pathname: '/reset-password' },
                ]}
            >
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
                    className="w-full h-12 cursor-pointer"
                    variant="secondary"
                >
                    Sign Up
                </Button>
            </AuthForm>
        </AuthScreen>
    )
}
