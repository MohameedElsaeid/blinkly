import React from "react";
import {Plan} from "@/types/pricing";
import PlanCard from "./PlanCard";

interface PricingViewProps {
    plans: Plan[];
    billingPeriod: "monthly" | "yearly";
}

const PricingView = ({plans, billingPeriod}: PricingViewProps) => {
    // Find the professional plan and make sure it's in the middle
    const professionalPlanIndex = plans.findIndex(plan => plan.id === "professional");
    let orderedPlans = [...plans];

    if (professionalPlanIndex !== -1) {
        // Remove professional plan
        const professionalPlan = orderedPlans.splice(professionalPlanIndex, 1)[0];

        // Calculate the middle index
        const middleIndex = Math.floor(orderedPlans.length / 2);

        // Insert professional plan in the middle
        orderedPlans.splice(middleIndex, 0, professionalPlan);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {orderedPlans.map((plan) => (
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
