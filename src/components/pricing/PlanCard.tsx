import React from "react";
import {Link} from "react-router-dom";
import {Check, Star} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Plan} from "@/types/pricing";

interface PlanCardProps {
    plan: Plan;
    billingPeriod: "monthly" | "yearly";
}

const PlanCard = ({plan, billingPeriod}: PlanCardProps) => {
    return (
        <div
            className={`relative flex flex-col rounded-2xl ${
                plan.popular
                    ? 'border-2 border-alchemy-purple shadow-xl md:scale-105 z-10 bg-white'
                    : 'border border-gray-200 bg-white shadow'
            } overflow-hidden transition-all duration-200 hover:shadow-lg`}
        >
            {plan.popular && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                    <Badge className="bg-alchemy-peach text-white px-3 py-1 rounded-full flex items-center">
                        <Star className="h-3 w-3 mr-1"/>
                        Most Popular
                    </Badge>
                </div>
            )}

            <div className={`p-6 ${plan.popular ? 'bg-alchemy-purple/5' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold text-center ${plan.popular ? 'text-alchemy-purple' : 'text-gray-900'}`}>
                    {plan.name}
                </h3>
                <div className="mt-4 flex items-center justify-center">
          <span className="text-4xl font-extrabold tracking-tight text-gray-900">
            {billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
          </span>
                    {plan.monthlyPrice !== "Custom" && (
                        <span className="ml-1.5 text-lg font-medium text-gray-500">
              /{billingPeriod === "monthly" ? "mo" : "yr"}
            </span>
                    )}
                </div>
                <p className="mt-2 text-sm text-gray-500 text-center">{plan.description}</p>
            </div>

            <div className="flex-1 p-6 space-y-4">
                <p className="text-sm font-medium text-gray-900">Includes:</p>
                <ul className="space-y-3">
                    <li className="flex">
                        <Check className="h-5 w-5 text-alchemy-green flex-shrink-0"/>
                        <span className="ml-3 text-sm text-gray-700">
              {plan.features.shortened_links} shortened links/month
            </span>
                    </li>
                    <li className="flex">
                        <Check className="h-5 w-5 text-alchemy-green flex-shrink-0"/>
                        <span className="ml-3 text-sm text-gray-700">
              {plan.features.qr_codes} QR codes/month
            </span>
                    </li>
                    {plan.features.enhanced_analytics && (
                        <li className="flex">
                            <Check className="h-5 w-5 text-alchemy-green flex-shrink-0"/>
                            <span className="ml-3 text-sm text-gray-700">Advanced analytics</span>
                        </li>
                    )}
                    {plan.features.password_protected && (
                        <li className="flex">
                            <Check className="h-5 w-5 text-alchemy-green flex-shrink-0"/>
                            <span className="ml-3 text-sm text-gray-700">Password-protected links</span>
                        </li>
                    )}
                    {plan.features.branded_links && (
                        <li className="flex">
                            <Check className="h-5 w-5 text-alchemy-green flex-shrink-0"/>
                            <span className="ml-3 text-sm text-gray-700">Custom domains</span>
                        </li>
                    )}
                    {plan.features.team_collaboration !== 0 && (
                        <li className="flex">
                            <Check className="h-5 w-5 text-alchemy-green flex-shrink-0"/>
                            <span className="ml-3 text-sm text-gray-700">
                Team access ({plan.features.team_collaboration === "Unlimited" ? "Unlimited" : `Up to ${plan.features.team_collaboration}`})
              </span>
                        </li>
                    )}
                    <li className="flex">
                        <Check className="h-5 w-5 text-alchemy-green flex-shrink-0"/>
                        <span className="ml-3 text-sm text-gray-700">
              {plan.features.support} support
            </span>
                    </li>
                </ul>
            </div>

            <div className="p-6 bg-gray-50">
                <Button
                    className={`w-full py-3 text-base ${
                        plan.popular
                            ? 'bg-alchemy-purple hover:bg-alchemy-purple-dark'
                            : plan.id === 'free'
                                ? 'bg-white border-2 border-alchemy-purple text-alchemy-purple hover:bg-alchemy-purple hover:text-white'
                                : plan.id === 'enterprise'
                                    ? 'bg-blinkly-purple hover:bg-blinkly-purple-dark'
                                    : 'bg-alchemy-purple/90 hover:bg-alchemy-purple'
                    }`}
                    asChild
                >
                    <Link to={plan.id === 'enterprise' ? "/contact" : "/signup"}>
                        {plan.buttonText}
                    </Link>
                </Button>
                {plan.id !== "free" && plan.id !== "enterprise" && (
                    <p className="mt-2 text-xs text-center text-gray-500">14-day free trial, cancel anytime</p>
                )}
            </div>
        </div>
    );
};

export default PlanCard;
