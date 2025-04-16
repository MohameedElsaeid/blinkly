
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { Check, X } from "lucide-react";

interface PasswordSectionProps {
  form: any;
  watchPassword: string;
}

export const PasswordSection = ({ form, watchPassword }: PasswordSectionProps) => {
  return (
    <>
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
    </>
  );
};
