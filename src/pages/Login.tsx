
import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Link} from "react-router-dom";
import {AlertCircle, ArrowRight, Loader2, Lock, Mail} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useAuth, useMetaPixel} from "@/hooks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const {login} = useAuth();
    const {trackEvent} = useMetaPixel();

    // Track page view and form load
    useEffect(() => {
        trackEvent({
            event: 'ViewContent',
            customData: {
                content_name: 'login_form',
                content_category: 'authentication',
                status: 'viewed'
            }
        });
    }, [trackEvent]);

    const validateForm = () => {
        if (!email) {
            setFormError("Email is required");
            trackEvent({
                event: 'CustomizeProduct',
                customData: {
                    content_name: 'login_validation_error',
                    content_category: 'authentication',
                    error_field: 'email',
                    error_message: 'Email is required'
                }
            });
            return false;
        }

        if (!password) {
            setFormError("Password is required");
            trackEvent({
                event: 'CustomizeProduct',
                customData: {
                    content_name: 'login_validation_error',
                    content_category: 'authentication',
                    error_field: 'password',
                    error_message: 'Password is required'
                }
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setFormError("Please enter a valid email address");
            trackEvent({
                event: 'CustomizeProduct',
                customData: {
                    content_name: 'login_validation_error',
                    content_category: 'authentication',
                    error_field: 'email',
                    error_message: 'Invalid email format'
                }
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        console.log('Login form submission with:', {email});

        // Track login attempt
        trackEvent({
            event: 'InitiateCheckout',
            userData: {
                email: email
            },
            customData: {
                content_name: 'login_form',
                content_category: 'authentication',
                status: 'submitted'
            }
        });

        try {
            await login({email, password});
            // Success tracking is handled in useAuthLogin
        } catch (error: any) {
            console.error("Login error details:", error);
            if (error.response) {
                console.error("Server response:", error.response.data);
            }
            
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            setFormError(errorMessage);
            
            // Track login failure
            trackEvent({
                event: 'Lead',
                userData: {
                    email: email
                },
                customData: {
                    content_name: 'login_failure',
                    content_category: 'authentication',
                    status: 'failed',
                    error_message: errorMessage
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Track form field changes
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (e.target.value && e.target.value.length > 3) {
            trackEvent({
                event: 'CustomizeProduct',
                customData: {
                    content_name: 'login_field_interaction',
                    field_name: 'email',
                    has_value: Boolean(e.target.value),
                    status: 'in_progress'
                }
            });
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value) {
            trackEvent({
                event: 'CustomizeProduct',
                customData: {
                    content_name: 'login_field_interaction',
                    field_name: 'password',
                    has_value: Boolean(e.target.value),
                    status: 'in_progress'
                }
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to your Blinkly Lab account
                        </p>
                    </div>

                    <Card className="shadow-lg border-gray-200">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
                            <CardDescription className="text-center">
                                Enter your email and password to access your account
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {formError && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4"/>
                                    <AlertDescription>{formError}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="pl-10"
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link 
                                            to="/forgot-password"
                                            className="text-xs text-alchemy-purple hover:underline"
                                            onClick={() => {
                                                trackEvent({
                                                    event: 'Lead',
                                                    customData: {
                                                        content_name: 'forgot_password_click',
                                                        content_category: 'authentication'
                                                    }
                                                });
                                            }}
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className="pl-10"
                                            autoComplete="current-password"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-alchemy-purple hover:bg-alchemy-purple-dark"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        if (!isSubmitting) {
                                            trackEvent({
                                                event: 'InitiateCheckout',
                                                customData: {
                                                    content_name: 'login_button_click',
                                                    content_category: 'authentication',
                                                    status: 'clicked'
                                                }
                                            });
                                        }
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign in
                                            <ArrowRight className="ml-2 h-4 w-4"/>
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex justify-center border-t p-6">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link 
                                    to="/signup" 
                                    className="text-alchemy-purple hover:underline font-medium"
                                    onClick={() => {
                                        trackEvent({
                                            event: 'Lead',
                                            customData: {
                                                content_name: 'signup_referral',
                                                content_category: 'authentication',
                                                referral_source: 'login_page'
                                            }
                                        });
                                    }}
                                >
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;
