
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";

interface TermsSectionProps {
  form: any;
}

export const TermsSection = ({ form }: TermsSectionProps) => {
  return (
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
              I agree to the <Link to="/terms" className="text-indigo-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
