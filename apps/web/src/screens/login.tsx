import { authClient } from '@shared/auth/react'
import { Button } from '@/components/ui/button'

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
