import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { authClient } from '@/auth/auth-client'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { AuthForm, AuthScreen } from '../components/layout'

export function NewPasswordScreen() {
    const [params] = useSearchParams()

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()

            const formData = new FormData(e.target as HTMLFormElement)

            const newPassword = formData.get('password') as string
            const confirmPassword = formData.get('confirm-password') as string

            if (newPassword !== confirmPassword) {
                toast.error('Passwords do not match', {
                    position: 'top-center',
                })
                return
            }

            toast.loading('Requesting reset password', {
                position: 'top-center',
            })
            authClient
                .resetPassword({
                    token: params.get('token') ?? '',
                    newPassword,
                })
                .then((r) => {
                    toast.dismiss()
                    if (r.error) {
                        toast.error(
                            r.error.message ?? 'Reset password failed',
                            {
                                position: 'top-center',
                                duration: 100_0000,
                            },
                        )
                    } else {
                        toast.success('Reset password successful!', {
                            description:
                                'You can now log in with your new password.',
                            position: 'top-center',
                        })
                    }
                })
                .catch(() => {
                    toast.dismiss()
                    toast.error('Reset password failed', {
                        position: 'top-center',
                        duration: 100_0000,
                    })
                })
        },
        [params],
    )

    const [showPassword, setShowPassword] = useState(false)

    return (
        <AuthScreen>
            <AuthForm
                socialSignIn={false}
                title="New Password"
                description="Please enter your new password."
                onSubmit={handleSubmit}
                actions={[
                    { title: 'Login', pathname: '/login' },
                    { title: 'Sign Up', pathname: '/sign-up' },
                ]}
            >
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

                <div className="space-y-2">
                    <Label
                        htmlFor="confirm-password"
                        className="text-sm font-medium text-card-foreground"
                    >
                        Confirm Password
                    </Label>
                    <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            name="confirm-password"
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
                    Reset Password
                </Button>
            </AuthForm>
        </AuthScreen>
    )
}
