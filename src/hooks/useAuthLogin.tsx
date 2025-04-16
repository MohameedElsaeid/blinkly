
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';
import {authService} from '../services';
import {useAuthState} from './useAuthState';
import {User, UserRole} from '../types';
import {LoginDto, SignUpDto} from '../types/auth';
import {useMetaPixel} from './useMetaPixel';

// Define the auth response user type to match what the backend returns
interface AuthResponseUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    country?: string;
    countryCode?: string;
    phoneNumber?: string;
    role?: string;
}

export function useAuthLogin() {
    const {setUser, setIsAuthenticated, setIsLoading} = useAuthState();
    const {trackLogin, trackRegistration, trackEvent} = useMetaPixel();
    const navigate = useNavigate();

    const login = useCallback(async (params: LoginDto) => {
        setIsLoading(true);
        console.log('useAuth login called with params:', params);
        try {
            // First track login attempt
            trackEvent({
                event: 'InitiateCheckout',
                userData: { email: params.email },
                customData: {
                    content_name: 'login_attempt',
                    content_category: 'authentication',
                    status: 'initiated'
                }
            });
            
            const response = await authService.login(params);
            console.log('useAuth login response:', response);
            if (response.success && response.user) {
                // Safely cast or extract data from response.user
                const responseUser = response.user as AuthResponseUser;
                // Convert response.user to User type with default values for missing properties
                const userRole = responseUser.role as UserRole | undefined;

                const userData: User = {
                    id: responseUser.id,
                    email: responseUser.email,
                    firstName: responseUser.firstName,
                    lastName: responseUser.lastName,
                    token: responseUser.token,
                    country: responseUser.country || '',
                    countryCode: responseUser.countryCode || '',
                    phone: responseUser.phoneNumber || '',
                    phoneNumber: responseUser.phoneNumber || '',
                    role: userRole
                };
                setUser(userData);
                setIsAuthenticated(true);
                
                // Track login success with Meta Pixel
                trackLogin({
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    country: userData.country
                });
                
                toast.success(response.message || 'Successfully logged in!');
                navigate('/dashboard');
            } else {
                toast.error(response.message || 'Login failed. Please check your credentials.');
                
                // Track login failure
                trackEvent({
                    event: 'Lead',
                    userData: { email: params.email },
                    customData: {
                        content_name: 'login_failure',
                        content_category: 'authentication',
                        status: 'failed',
                        error_message: response.message || 'Login failed'
                    }
                });
            }
            return response;
        } catch (error: any) {
            console.error("Login error in useAuth:", error);
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(message);
            
            // Track login error
            trackEvent({
                event: 'Lead',
                userData: { email: params.email },
                customData: {
                    content_name: 'login_error',
                    content_category: 'authentication',
                    status: 'error',
                    error_message: message
                }
            });
            
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [navigate, setUser, setIsAuthenticated, setIsLoading, trackLogin, trackEvent]);

    const register = useCallback(async (params: SignUpDto) => {
        setIsLoading(true);
        try {
            // Track registration attempt
            trackEvent({
                event: 'InitiateCheckout',
                userData: {
                    email: params.email,
                    firstName: params.firstName,
                    lastName: params.lastName,
                    country: params.country
                },
                customData: {
                    content_name: 'registration_attempt',
                    content_category: 'authentication',
                    status: 'initiated'
                }
            });
            
            const response = await authService.register(params);
            if (response.success && response.user) {
                // Safely cast or extract data from response.user
                const responseUser = response.user as AuthResponseUser;
                // Convert response.user to User type with values from params
                const userRole = responseUser.role as UserRole | undefined;

                const userData: User = {
                    id: responseUser.id,
                    email: responseUser.email,
                    firstName: responseUser.firstName,
                    lastName: responseUser.lastName,
                    token: responseUser.token,
                    country: params.country || '',
                    countryCode: params.countryCode || '',
                    phone: params.phoneNumber || '',
                    phoneNumber: params.phoneNumber || '',
                    role: userRole
                };
                setUser(userData);
                setIsAuthenticated(true);
                
                // Track registration success with Meta Pixel
                trackRegistration({
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    country: userData.country
                }, {
                    content_category: 'authentication',
                    user_type: userRole || 'standard'
                });
                
                toast.success(response.message || 'Registration successful!');
                navigate('/dashboard');
            } else {
                toast.error(response.message || 'Registration failed. Please try again.');
                
                // Track registration failure
                trackEvent({
                    event: 'Lead',
                    userData: {
                        email: params.email,
                        firstName: params.firstName,
                        lastName: params.lastName
                    },
                    customData: {
                        content_name: 'registration_failure',
                        content_category: 'authentication',
                        status: 'failed',
                        error_message: response.message || 'Registration failed'
                    }
                });
            }
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(message);
            
            // Track registration error
            trackEvent({
                event: 'Lead',
                userData: {
                    email: params.email,
                    firstName: params.firstName,
                    lastName: params.lastName
                },
                customData: {
                    content_name: 'registration_error',
                    content_category: 'authentication',
                    status: 'error',
                    error_message: message
                }
            });
            
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [navigate, setUser, setIsAuthenticated, setIsLoading, trackRegistration, trackEvent]);

    const logout = useCallback(() => {
        const user = authService.getCurrentUser();
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        
        // Track logout event
        if (user) {
            trackEvent({
                event: 'CustomizeProduct',
                userData: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                customData: {
                    content_name: 'logout',
                    content_category: 'authentication',
                    status: 'success'
                }
            });
        }
        
        toast.success('Successfully logged out!');
        navigate('/');
    }, [navigate, setUser, setIsAuthenticated, trackEvent]);

    return {
        login,
        register,
        logout
    };
}
