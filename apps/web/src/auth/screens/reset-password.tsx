import { MailIcon } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { authClient } from '@/auth/auth-client'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { AuthForm, AuthScreen } from '../components/layout'
import { useCallbackURL } from '../hooks'

export function ResetPasswordScreen() {
    const callbackURL = useCallbackURL()

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()

            const formData = new FormData(e.target as HTMLFormElement)

            const email = formData.get('email') as string

            toast.loading('Requesting reset password', {
                position: 'top-center',
            })
            authClient
                .forgetPassword({
                    email,
                    redirectTo: `/new-password?redirect=${encodeURIComponent(callbackURL.href)}`,
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
                        toast.success('Reset password email sent!', {
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
        [callbackURL],
    )

    return (
        <AuthScreen>
            <AuthForm
                socialSignIn={false}
                title="Reset Password"
                description="A email will be sent to you if you provide a valid email address."
                onSubmit={handleSubmit}
                actions={[
                    { title: 'Login', pathname: '/login' },
                    { title: 'Sign Up', pathname: '/sign-up' },
                ]}
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
