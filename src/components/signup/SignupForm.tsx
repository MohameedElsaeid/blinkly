
import { useState, useEffect } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, ArrowRight, Check, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { getCountriesList, getCountryCodesList } from "@/utils/validators";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

// Create a form schema with Zod
const formSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
  countryCode: z.string()
    .regex(/^\+[1-9]\d{0,2}$/, 'Invalid country code'),
  phoneNumber: z.string()
    .min(4, 'Phone number is too short')
    .max(15, 'Phone number is too long'),
  country: z.string()
    .min(2, 'Please select a country'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
      'Password must include uppercase, lowercase, number, and special character'),
  passwordConfirmation: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  })
}).refine(data => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ["passwordConfirmation"],
});

type FormValues = z.infer<typeof formSchema>;

const SignupForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState(getCountriesList());
  const [countryCodes, setCountryCodes] = useState(getCountryCodesList());
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
  
  const handleSubmit = async (data: FormValues) => {
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John" 
                        {...field} 
                        className="bg-white"
                        autoComplete="given-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Doe" 
                        {...field} 
                        className="bg-white"
                        autoComplete="family-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-indigo-600">Contact Information</h3>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="your@email.com" 
                      {...field} 
                      className="bg-white"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countryCodes.map((code) => (
                          <SelectItem key={code.code} value={code.code}>
                            {code.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Phone number" 
                        {...field} 
                        className="bg-white"
                        autoComplete="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Password Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-indigo-600">Security</h3>
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-white"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <PasswordStrengthMeter password={watchPassword} />
                  <div className="space-y-1 mt-2">
                    <p className="text-xs text-gray-600 font-medium">Password requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center">
                        {watchPassword.length >= 8 ? 
                          <Check className="h-3 w-3 text-green-500 mr-1" /> : 
                          <X className="h-3 w-3 text-red-500 mr-1" />}
                        At least 8 characters
                      </li>
                      <li className="flex items-center">
                        {/[A-Z]/.test(watchPassword) ? 
                          <Check className="h-3 w-3 text-green-500 mr-1" /> : 
                          <X className="h-3 w-3 text-red-500 mr-1" />}
                        At least one uppercase letter
                      </li>
                      <li className="flex items-center">
                        {/[a-z]/.test(watchPassword) ? 
                          <Check className="h-3 w-3 text-green-500 mr-1" /> : 
                          <X className="h-3 w-3 text-red-500 mr-1" />}
                        At least one lowercase letter
                      </li>
                      <li className="flex items-center">
                        {/[0-9]/.test(watchPassword) ? 
                          <Check className="h-3 w-3 text-green-500 mr-1" /> : 
                          <X className="h-3 w-3 text-red-500 mr-1" />}
                        At least one number
                      </li>
                      <li className="flex items-center">
                        {/[@$!%*?&]/.test(watchPassword) ? 
                          <Check className="h-3 w-3 text-green-500 mr-1" /> : 
                          <X className="h-3 w-3 text-red-500 mr-1" />}
                        At least one special character (@$!%*?&)
                      </li>
                    </ul>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-white"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Terms and Conditions */}
          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-50">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    I agree to the <a href="/terms" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
