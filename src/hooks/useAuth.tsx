import {useAuthState} from './useAuthState';
import {useAuthLogin} from './useAuthLogin';
import {useAuthPassword} from './useAuthPassword';
import {useAuthVerification} from './useAuthVerification';

export function useAuth() {
    // Get state from the auth state hook
    const {user, isAuthenticated, isLoading} = useAuthState();

    // Get login, register, and logout functions
    const {login, register, logout} = useAuthLogin();

    // Get password management functions
    const {forgotPassword, resetPassword} = useAuthPassword();

    // Get verification functions
    const {verifyPhone, verifyEmail} = useAuthVerification();

    // Return everything from a single hook
    return {
        // State
        user,
        isAuthenticated,
        isLoading,

        // Auth operations
        login,
        register,
        logout,

        // Password operations
        forgotPassword,
        resetPassword,

        // Verification operations
        verifyPhone,
        verifyEmail
    };
}
