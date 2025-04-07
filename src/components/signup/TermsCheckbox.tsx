
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsCheckboxProps {
  isAgreeTerms: boolean;
  setIsAgreeTerms: (value: boolean) => void;
}

export const TermsCheckbox = ({ isAgreeTerms, setIsAgreeTerms }: TermsCheckboxProps) => {
  return (
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
  );
};
