
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, BadgeDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Basic link shortening for personal use",
    features: [
      "Create up to 25 short links",
      "Basic click analytics",
      "Standard QR code generation",
      "24-hour support response time"
    ],
    buttonText: "Get Started",
    buttonLink: "/signup"
  },
  {
    name: "Pro",
    price: "$12",
    description: "Advanced features for creators and small businesses",
    features: [
      "Create up to 500 short links",
      "Detailed analytics with geographic data",
      "Custom QR code designs",
      "Social media preview customization",
      "4-hour support response time",
      "No ads"
    ],
    buttonText: "Start 7-Day Free Trial",
    buttonLink: "/signup",
    isPopular: true
  },
  {
    name: "Business",
    price: "$49",
    description: "Powerful tools for teams and companies",
    features: [
      "Unlimited short links",
      "Advanced analytics with API access",
      "Branded domain names",
      "Team collaboration features",
      "Priority 1-hour support",
      "Custom integrations",
      "No ads"
    ],
    buttonText: "Start 7-Day Free Trial",
    buttonLink: "/signup"
  }
];

const PricingSection = () => {
  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-alchemy-purple font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose the Perfect Plan for Your Needs
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            All plans include a 7-day free trial. No credit card required to start.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative flex flex-col rounded-lg border ${
                tier.isPopular ? 'border-alchemy-purple shadow-lg' : 'border-gray-200'
              } bg-white p-6 text-center`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 -mt-3 mr-3">
                  <Badge className="bg-alchemy-peach text-white">Most Popular</Badge>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <div className="mt-4 flex items-center justify-center">
                  <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-alchemy-green" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700 text-left">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Button className={`w-full ${
                  tier.isPopular 
                    ? 'bg-alchemy-purple hover:bg-alchemy-purple-dark' 
                    : tier.name === 'Free' 
                      ? 'bg-white text-alchemy-purple border-2 border-alchemy-purple hover:bg-alchemy-purple hover:text-white' 
                      : 'bg-alchemy-purple hover:bg-alchemy-purple-dark'
                }`} asChild>
                  <Link to={tier.buttonLink}>
                    {tier.buttonText}
                  </Link>
                </Button>
                {tier.name !== "Free" && (
                  <p className="mt-2 text-xs text-gray-500">7-day free trial, cancel anytime</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center p-4 bg-alchemy-purple-light/20 rounded-lg">
            <BadgeDollarSign className="h-6 w-6 text-alchemy-purple mr-2" />
            <span className="text-sm text-gray-700">All plans include a <span className="font-semibold">7-day free trial</span> with no credit card required to start</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
