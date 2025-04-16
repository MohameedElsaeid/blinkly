import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Check, CheckCircle, XCircle} from "lucide-react";

// Export the PricingViewProps interface so it can be imported by other components
export interface PricingViewProps {
    plans: any[];
    billingPeriod: "monthly" | "yearly";
    onPlanSelect?: (planId: string, planName: string, price: number) => void;
}

const PricingView: React.FC<PricingViewProps> = ({ plans, billingPeriod, onPlanSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
                <Card key={plan.id} className={plan.popular ? "border-2 border-primary" : ""}>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
                        <CardDescription className="text-center">
                            {plan.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="text-5xl font-bold">
                            {billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                        </div>
                        <p className="text-sm text-gray-500">
                            per month
                        </p>
                        <ul className="mt-4 space-y-2">
                            {Object.entries(plan.features).map(([feature, value]) => (
                                <li key={feature} className="flex items-center justify-between">
                                    <span>{formatFeatureName(feature)}</span>
                                    {typeof value === "boolean" ? (
                                        value ? <CheckCircle className="text-green-500"/> :
                                            <XCircle className="text-red-500"/>
                                    ) : (
                                        <span className="font-semibold">{value}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button onClick={() => {
                            if (onPlanSelect && plan.id !== 'free') {
                                const price = billingPeriod === "monthly" ? parseFloat(plan.monthlyPrice.replace('$', '')) : parseFloat(plan.yearlyPrice.replace('$', ''));
                                onPlanSelect(plan.id, plan.name, price);
                            }
                        }}>
                            {plan.buttonText}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

// Helper function to format feature names
const formatFeatureName = (feature: string): string => {
    return feature
        .replace(/_/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^./, str => str.toUpperCase());
};

export default PricingView;
