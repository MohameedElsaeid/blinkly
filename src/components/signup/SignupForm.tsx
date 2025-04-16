import {useState} from "react";
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {ArrowRight, Loader2} from "lucide-react";
import {useAuth} from "@/hooks";
import {Form} from "@/components/ui/form";
import {getCountriesList, getCountryCodesList} from "@/utils/validators";
import {PersonalInfoSection} from "./PersonalInfoSection";
import {ContactInfoSection} from "./ContactInfoSection";
import {PasswordSection} from "./PasswordSection";
import {TermsSection} from "./TermsSection";
import {SignupSchema} from "./SignupSchema";

const SignupForm = () => {
    const navigate = useNavigate();
    const {register} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countries] = useState(getCountriesList());
    const [countryCodes] = useState(getCountryCodesList());

    // Initialize the form with schema from SignupSchema.ts
    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            countryCode: '+1',
            phoneNumber: '',
            country: '',
            password: '',
            passwordConfirmation: '',
            agreeTerms: false
        },
    });

    const watchPassword = form.watch('password');

    const handleSubmit = async (data: z.infer<typeof SignupSchema>) => {
        setIsSubmitting(true);

        try {
            // Format the phone number with country code
            const formattedPhone = data.countryCode + data.phoneNumber.replace(/\D/g, '');

            const response = await register({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                passwordConfirmation: data.passwordConfirmation,
                country: data.country,
                countryCode: data.countryCode,
                phoneNumber: formattedPhone
            });

            console.log("Registration response:", response);
            // Redirect is handled in the useAuth hook

        } catch (error: any) {
            console.error("Registration error:", error);

            const errorMessage = error.response?.data?.message ||
                "Registration failed. Please try again.";

            toast.error(errorMessage);

            // Reset the form submission state
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-sm text-indigo-600">Personal Information</h3>
                        <PersonalInfoSection form={form}/>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-sm text-indigo-600">Contact Information</h3>
                        <ContactInfoSection form={form} countries={countries} countryCodes={countryCodes}/>
                    </div>

                    {/* Password Section */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-sm text-indigo-600">Security</h3>
                        <PasswordSection form={form} watchPassword={watchPassword}/>
                    </div>

                    {/* Terms and Conditions */}
                    <TermsSection form={form}/>

                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create account
                                <ArrowRight className="ml-2 h-4 w-4"/>
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignupForm;
