import { Button } from "@/components/ui/button";
import { authClient } from "@shared/auth/react";

export function LoginScreen() {
    return <div>
        <Button onClick={() => authClient.signIn.social({ provider: 'google' })}>Login with Google</Button>
    </div>
}
