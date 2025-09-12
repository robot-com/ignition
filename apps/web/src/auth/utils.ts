import { toast } from 'sonner'
import { authClient } from './auth-client'

export function loginWithGoogle(callbackURL: string) {
    toast.loading('Redirecting to Google', { position: 'top-center' })
    // Handle Google login logic here
    authClient.signIn
        .social({
            provider: 'google',
            callbackURL,
        })
        .then((r) => {
            toast.dismiss()
            if (r.error) {
                toast.error(r.error.message ?? 'Failed login in with Google', {
                    position: 'top-center',
                })
            }
        })
        .catch(() => {
            toast.dismiss()
            toast.error('Failed login in with Google', {
                position: 'top-center',
            })
        })
}
