
import React from "react";
import {Plan} from "@/types/pricing";
import PlanCard from "./PlanCard";
import {useMetaPixel} from "@/hooks";

interface PricingViewProps {
    plans: Plan[];
    billingPeriod: "monthly" | "yearly";
}

const PricingView: React.FC<PricingViewProps> = ({plans, billingPeriod}: PricingViewProps) => {
    const {trackSubscription, trackEvent} = useMetaPixel();
    
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

    const handlePlanSelect = (plan: Plan) => {
        const planPrice = billingPeriod === "monthly" 
            ? parseFloat(plan.monthlyPrice.replace(/[^0-9.]/g, ''))
            : parseFloat(plan.yearlyPrice.replace(/[^0-9.]/g, ''));
        
        // Track plan selection with Meta Pixel - Subscription event
        trackSubscription(
            plan.name, 
            planPrice || 0,
            'USD'
        );
        
        // Additional detailed tracking - InitiateCheckout event
        trackEvent({
            event: 'InitiateCheckout',
            customData: {
                content_name: `${plan.name} Plan`,
                content_type: 'plan',
                content_category: 'subscription',
                value: planPrice || 0,
                currency: 'USD',
                billing_period: billingPeriod,
                predicted_ltv: billingPeriod === 'yearly' ? planPrice * 1.2 : planPrice * 12,
                num_items: 1
            }
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {orderedPlans.map((plan) => (
                <PlanCard
                    key={plan.id}
                    plan={plan}
                    billingPeriod={billingPeriod}
                    onSelect={() => handlePlanSelect(plan)}
                />
            ))}
        </div>
    );
};

export default PricingView;
