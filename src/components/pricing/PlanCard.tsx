
import React from "react";
import {Check} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Plan} from "@/types/pricing";

interface PlanCardProps {
    plan: Plan;
    billingPeriod: "monthly" | "yearly";
    onSelect?: () => void;
}

const PlanCard = ({ plan, billingPeriod, onSelect }: PlanCardProps) => {
    const {id, name, monthlyPrice, yearlyPrice, description, popular, buttonText, features} = plan;
    const currentPrice = billingPeriod === "monthly" ? monthlyPrice : yearlyPrice;

    const handleClick = () => {
        if (onSelect) {
            onSelect();
        }
    };

    return (
        <div
            className={`relative flex flex-col h-full rounded-lg transition duration-200 border-2 p-6 shadow-sm hover:shadow-md hover:scale-105 transform ${
                popular
                    ? "border-indigo-500 bg-indigo-50/50"
                    : "border-gray-200 bg-white"
            }`}
        >
            {popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 inline-block px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold">
                    Most Popular
                </div>
            )}

            <div className="mb-5">
                <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
            </div>

            <div className="mt-2 mb-5">
                <p className="text-3xl font-bold text-gray-900">{currentPrice}</p>
                <p className="text-sm text-gray-500">
                    {billingPeriod === "monthly" ? "per month" : "per year"}
                </p>
            </div>

            <ul className="mt-4 space-y-3 flex-grow">
                {Object.entries(features).map(([key, value]) => {
                    // Convert the key to a more readable format
                    const featureName = key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                        .replace(/Num/g, "")
                        .replace(/Enabled/g, "");

                    // Format different types of values
                    let displayValue: React.ReactNode = value;
                    if (typeof value === "boolean") {
                        displayValue = value ? (
                            <Check className="h-5 w-5 text-green-500"/>
                        ) : null;
                    } else if (typeof value === "number" && value === 0) {
                        displayValue = "Unlimited";
                    } else if (typeof value === "string" && value.toLowerCase() === "unlimited") {
                        displayValue = "Unlimited";
                    }

                    return (
                        <li
                            key={key}
                            className="flex items-start gap-3 text-gray-700 text-sm"
                        >
                            {typeof displayValue === "object" ? (
                                displayValue
                            ) : (
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0"/>
                            )}
                            <span>
                {featureName}
                                {typeof value !== "boolean" && displayValue !== null && (
                                    <>
                                        {" "}
                                        <span className="font-semibold">
                      {displayValue}
                    </span>
                                    </>
                                )}
              </span>
                        </li>
                    );
                })}
            </ul>

            <div className="mt-8">
                <Button
                    onClick={handleClick}
                    className={`w-full ${
                        popular
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                    }`}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export default PlanCard;
