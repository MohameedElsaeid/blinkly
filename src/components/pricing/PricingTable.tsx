import React from "react";
import {Check, X} from "lucide-react";
import {cn} from "@/lib/utils";

// Export the PricingTableProps interface so it can be imported by other components
export interface PricingTableProps {
    plans: any[];
    featureCategories: any[];
    billingPeriod: "monthly" | "yearly";
    onPlanSelect?: (planId: string, planName: string, price: number) => void;
}

const PricingTable: React.FC<PricingTableProps> = ({plans, featureCategories, billingPeriod, onPlanSelect}) => {
    const getPrice = (plan: any) => {
        return billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feature
                    </th>
                    {plans.map((plan) => (
                        <th key={plan.id}
                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {plan.name}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {featureCategories.map((category) => (
                    <React.Fragment key={category.name}>
                        <tr>
                            <td colSpan={plans.length + 1}
                                className="px-6 py-4 whitespace-nowrap bg-gray-100 font-semibold">
                                {category.name}
                            </td>
                        </tr>
                        {category.features.map((feature) => (
                            <tr key={feature.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {feature.name}
                                </td>
                                {plans.map((plan) => {
                                    let featureValue = plan.features[feature.id];

                                    if (typeof featureValue === 'boolean') {
                                        featureValue = featureValue ? <Check className="h-5 w-5 text-green-500"/> :
                                            <X className="h-5 w-5 text-red-500"/>;
                                    } else if (typeof featureValue === 'number' || typeof featureValue === 'string') {
                                        // Render number or string values directly
                                    } else {
                                        featureValue = '-'; // Handle unexpected value types
                                    }

                                    return (
                                        <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex justify-center">
                                                {typeof featureValue === 'boolean' ? featureValue : featureValue}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
                <tr>
                    <td></td>
                    {plans.map((plan) => (
                        <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                                className={cn(
                                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-10 py-2 px-4",
                                    plan.popular ? "bg-secondary text-secondary-foreground" : ""
                                )}
                                onClick={() => {
                                    if (onPlanSelect) {
                                        const price = getPrice(plan);
                                        const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
                                        onPlanSelect(plan.id, plan.name, numericPrice);
                                    }
                                }}
                            >
                                {plan.buttonText}
                            </button>
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PricingTable;
