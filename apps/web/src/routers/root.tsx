import { createBrowserRouter } from 'react-router'
import { appRoute } from './app'
import { authRoute } from './auth'
import { publicRoute } from './public'

/**
 * Entrypoint for react-router routes.
 */
export const router = createBrowserRouter([
    // Routes related to authentication (login, sign up, etc)
    authRoute,
    // Routes related to the main app (after logging in)
    appRoute,
    // Public routes (landing page, about, etc)
    publicRoute,
])
