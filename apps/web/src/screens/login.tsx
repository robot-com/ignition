import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export function LoginScreen() {
    return (
        <div>
            <Button
                onClick={() => authClient.signIn.social({ provider: 'google' })}
            >
                Login with Google
            </Button>
        </div>
    )
}
