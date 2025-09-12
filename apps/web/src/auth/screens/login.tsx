import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { authClient } from '@/auth/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthForm, AuthScreen } from '../components/layout'
import { useCallbackURL } from '../hooks'

export function LoginScreen() {
    const callbackURL = useCallbackURL()

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

    const [showPassword, setShowPassword] = useState(false)

    return (
        <AuthScreen>
            <AuthForm
                title="Ignition"
                description="Full stack platform template. Sign in to your account to
                        continue or create a new one."
                onSubmit={handleSubmit}
                action={{ title: 'Create new account', pathname: '/sign-up' }}
            >
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
                    Login
                </Button>
            </AuthForm>
        </AuthScreen>
    )
}
