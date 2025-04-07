
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Mail, Lock, User, Loader2, ArrowRight, Globe, Phone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COUNTRY_OPTIONS = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
];

const COUNTRY_CODES = [
  { value: "+1", label: "+1 (US/CA)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+61", label: "+61 (AU)" },
  { value: "+33", label: "+33 (FR)" },
  { value: "+49", label: "+49 (DE)" },
  { value: "+81", label: "+81 (JP)" },
  { value: "+86", label: "+86 (CN)" },
  { value: "+91", label: "+91 (IN)" },
  { value: "+55", label: "+55 (BR)" },
];

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreeTerms, setIsAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!firstName) {
      setFormError("First name is required");
      return false;
    }

    if (!lastName) {
      setFormError("Last name is required");
      return false;
    }
    
    if (!email) {
      setFormError("Email is required");
      return false;
    }
    
    if (!phone) {
      setFormError("Phone number is required");
      return false;
    }

    if (!country) {
      setFormError("Country is required");
      return false;
    }
    
    if (!password) {
      setFormError("Password is required");
      return false;
    }
    
    if (!confirmPassword) {
      setFormError("Please confirm your password");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address");
      return false;
    }

    // Basic phone validation
    const phoneRegex = /^\d{6,14}$/;
    if (!phoneRegex.test(phone)) {
      setFormError("Please enter a valid phone number (numbers only)");
      return false;
    }

    if (password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    }

    if (!isAgreeTerms) {
      setFormError("Please agree to our terms and conditions");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Mock signup - in a real app, this would create an account with a backend
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join LinkAlchemy Lab and start transforming your links
          </p>
        </div>
        
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign up</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10"
                      autoComplete="given-name"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pl-10"
                      autoComplete="family-name"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex space-x-2">
                  <div className="w-1/3">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((code) => (
                          <SelectItem key={code.value} value={code.value}>
                            {code.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative w-2/3">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="pl-10"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRY_OPTIONS.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    autoComplete="new-password"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={isAgreeTerms}
                  onCheckedChange={(checked) => {
                    setIsAgreeTerms(checked as boolean);
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-alchemy-purple hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-alchemy-purple hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-alchemy-purple hover:bg-alchemy-purple-dark"
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
          </CardContent>
          
          <CardFooter className="flex justify-center border-t p-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-alchemy-purple hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
