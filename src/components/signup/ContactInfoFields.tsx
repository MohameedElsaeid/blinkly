
import { Mail, Phone, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "./SearchableSelect";
import { getCountriesList, getCountryCodesList } from "@/utils/validators";
import { useEffect, useState } from "react";

interface ContactInfoFieldsProps {
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  countryCode: string;
  setCountryCode: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
}

export const ContactInfoFields = ({
  email,
  setEmail,
  phone,
  setPhone,
  countryCode,
  setCountryCode,
  country,
  setCountry
}: ContactInfoFieldsProps) => {
  const [countries, setCountries] = useState<Array<{value: string, label: string}>>([]);
  const [countryCodes, setCountryCodes] = useState<Array<{value: string, label: string}>>([]);
  
  useEffect(() => {
    // Convert country list to the format expected by SearchableSelect
    const countryList = getCountriesList().map(country => ({
      value: country.code,
      label: country.name
    }));
    setCountries(countryList);
    
    // Convert country codes list to the format expected by SearchableSelect
    const codesList = getCountryCodesList().map(code => ({
      value: code.code,
      label: code.name
    }));
    setCountryCodes(codesList);
  }, []);

  return (
    <>
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
            <SearchableSelect
              items={countryCodes}
              value={countryCode}
              onChange={setCountryCode}
              placeholder="Code"
              emptyMessage="No country code found"
              triggerClassName="h-10"
            />
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
          <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none z-10" />
          <SearchableSelect
            items={countries}
            value={country}
            onChange={setCountry}
            placeholder="Select your country"
            emptyMessage="No country found"
            prefix={<div className="w-4" />} // Space for the Globe icon
            triggerClassName="pl-10 h-10"
          />
        </div>
      </div>
    </>
  );
};
