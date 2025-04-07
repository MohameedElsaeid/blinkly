
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface BillingToggleProps {
  billingPeriod: "monthly" | "yearly";
  onChange: (value: "monthly" | "yearly") => void;
}

const BillingToggle = ({ billingPeriod, onChange }: BillingToggleProps) => {
  return (
    <div className="flex justify-center mt-8 mb-16">
      <div className="inline-flex p-1 bg-gray-100 rounded-lg items-center">
        <ToggleGroup 
          type="single" 
          value={billingPeriod} 
          onValueChange={(value) => value && onChange(value as "monthly" | "yearly")} 
          className="flex"
        >
          <ToggleGroupItem 
            value="monthly" 
            className={`px-4 py-2 rounded-md text-sm font-medium ${billingPeriod === "monthly" ? "bg-white shadow-sm" : ""}`}
          >
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="yearly" 
            className={`px-4 py-2 rounded-md text-sm font-medium ${billingPeriod === "yearly" ? "bg-white shadow-sm" : ""}`}
          >
            <span className="mr-1">Yearly</span>
            <Badge className="bg-alchemy-peach ml-1 text-xs">Save 15%</Badge>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default BillingToggle;
