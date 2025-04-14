
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { ContactInfoFields } from "./ContactInfoFields";
import { PasswordFields } from "./PasswordFields";
import { TermsCheckbox } from "./TermsCheckbox";
import { useAuth } from "@/hooks";

const SignupForm = () => {
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
  const { register } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation: confirmPassword,
        country,
        countryCode,
        phoneNumber: phone // The API expects just the number, it will prepend the country code
      });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      setFormError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      
      <PersonalInfoFields 
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
      
      <ContactInfoFields
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        country={country}
        setCountry={setCountry}
      />
      
      <PasswordFields
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
      
      <TermsCheckbox isAgreeTerms={isAgreeTerms} setIsAgreeTerms={setIsAgreeTerms} />
      
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
  );
};

export default SignupForm;
