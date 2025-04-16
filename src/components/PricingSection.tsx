import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {BadgeDollarSign, Check, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

interface PlanFeature {
    text: string;
    included: boolean;
}

interface PricingTier {
    name: string;
    monthlyPrice: string;
    yearlyPrice: string;
    description: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
    isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
    {
        name: "Free",
        monthlyPrice: "$0",
        yearlyPrice: "$0",
        description: "Basic link shortening for personal use",
        features: [
            "Up to 10 shortened links per month",
            "Up to 2 QR Codes per month",
            "Basic link analytics",
            "Standard link customization",
            "Community support"
        ],
        buttonText: "Get Started",
        buttonLink: "/signup"
    },
    {
        name: "Basic",
        monthlyPrice: "$9",
        yearlyPrice: "$90",
        description: "For creators and small businesses",
        features: [
            "All features in the Free Plan",
            "Up to 500 shortened links per month",
            "Up to 50 QR Codes per month",
            "Advanced link analytics",
            "Customizable QR Codes",
            "Email support"
        ],
        buttonText: "Start 14-Day Free Trial",
        buttonLink: "/signup"
    },
    {
        name: "Professional",
        monthlyPrice: "$29",
        yearlyPrice: "$290",
        description: "Advanced features for teams",
        features: [
            "All features in the Basic Plan",
            "Up to 5,000 shortened links per month",
            "Up to 500 QR Codes per month",
            "Branded links with custom domains",
            "Bulk link creation and editing",
            "Team collaboration (up to 5 users)",
            "API access for integrations",
            "Priority email support"
        ],
        buttonText: "Start 14-Day Free Trial",
        buttonLink: "/signup",
        isPopular: true
    }
];

const PricingSection = () => {
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

    return (
        <div className="bg-gradient-to-b from-white to-alchemy-purple-light/5 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-alchemy-purple font-semibold tracking-wide uppercase">Pricing</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Choose the Perfect Plan for Your Needs
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Scale your link management as your business grows.
                    </p>

                    <div className="flex justify-center mt-8 mb-8">
                        <div className="inline-flex p-1 bg-gray-100 rounded-lg items-center">
                            <ToggleGroup type="single" value={billingPeriod}
                                         onValueChange={(value) => value && setBillingPeriod(value as "monthly" | "yearly")}
                                         className="flex">
                                <ToggleGroupItem value="monthly"
                                                 className={`px-4 py-2 rounded-md text-sm font-medium ${billingPeriod === "monthly" ? "bg-white shadow-sm" : ""}`}>
                                    Monthly
                                </ToggleGroupItem>
                                <ToggleGroupItem value="yearly"
                                                 className={`px-4 py-2 rounded-md text-sm font-medium ${billingPeriod === "yearly" ? "bg-white shadow-sm" : ""}`}>
                                    <span className="mr-1">Yearly</span>
                                    <Badge className="bg-alchemy-peach ml-1 text-xs">Save 15%</Badge>
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col rounded-2xl ${
                                tier.isPopular
                                    ? 'border-2 border-alchemy-purple shadow-xl scale-105 z-10 bg-white'
                                    : 'border border-gray-200 bg-white shadow'
                            } overflow-hidden transition-all duration-200 hover:shadow-lg`}
                        >
                            {tier.isPopular && (
                                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                                    <Badge
                                        className="bg-alchemy-peach text-white px-3 py-1 rounded-full flex items-center">
                                        <Star className="h-3 w-3 mr-1"/>
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <div className={`p-8 ${tier.isPopular ? 'bg-alchemy-purple/5' : 'bg-gray-50'}`}>
                                <h3 className={`text-2xl font-bold text-center ${tier.isPopular ? 'text-alchemy-purple' : 'text-gray-900'}`}>
                                    {tier.name}
                                </h3>
                                <div className="mt-4 flex items-center justify-center">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                    {billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice}
                  </span>
                                    <span className="ml-1 text-xl font-medium text-gray-500">
                    /{billingPeriod === "monthly" ? "month" : "year"}
                  </span>
                                </div>
                                <p className="mt-4 text-sm text-gray-500 text-center">{tier.description}</p>
                            </div>

                            <div className="flex-1 p-8 space-y-6">
                                <ul className="space-y-4">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <Check
                                                    className={`h-5 w-5 ${tier.isPopular ? 'text-alchemy-purple' : 'text-alchemy-green'}`}/>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-8 bg-gray-50">
                                <Button
                                    className={`w-full py-3 text-base ${
                                        tier.isPopular
                                            ? 'bg-alchemy-purple hover:bg-alchemy-purple-dark'
                                            : tier.name === 'Free'
                                                ? 'bg-white border-2 border-alchemy-purple text-alchemy-purple hover:bg-alchemy-purple hover:text-white'
                                                : 'bg-alchemy-purple/90 hover:bg-alchemy-purple'
                                    }`}
                                    asChild
                                >
                                    <Link to={tier.buttonLink}>
                                        {tier.buttonText}
                                    </Link>
                                </Button>
                                {tier.name !== "Free" && (
                                    <p className="mt-2 text-xs text-center text-gray-500">14-day free trial, cancel
                                        anytime</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button
                        variant="outline"
                        size="lg"
                        className="font-medium"
                        asChild
                    >
                        <Link to="/pricing">
                            See all plans and comparison
                        </Link>
                    </Button>
                    <div className="flex justify-center mt-6">
                        <Button
                            className="bg-blinkly-purple text-white hover:bg-blinkly-purple-dark flex items-center"
                            size="lg"
                            asChild
                        >
                            <Link to="/contact" className="flex items-center">
                                <BadgeDollarSign className="h-5 w-5 mr-2"/>
                                Contact Sales
                            </Link>
                        </Button>
                    </div>
                    <div className="inline-flex items-center p-4 mt-6 bg-alchemy-purple-light/20 rounded-lg">
                        <BadgeDollarSign className="h-6 w-6 text-alchemy-purple mr-2"/>
                        <span className="text-sm text-gray-700">All paid plans include a <span
                            className="font-semibold">14-day free trial</span> with no credit card required to start</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingSection;
