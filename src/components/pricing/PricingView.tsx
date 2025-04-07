
import React from "react";
import { Plan } from "@/types/pricing";
import PlanCard from "./PlanCard";

interface PricingViewProps {
  plans: Plan[];
  billingPeriod: "monthly" | "yearly";
}

const PricingView = ({ plans, billingPeriod }: PricingViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {plans.map((plan) => (
        <PlanCard 
          key={plan.id} 
          plan={plan} 
          billingPeriod={billingPeriod} 
        />
      ))}
    </div>
  );
};

export default PricingView;
