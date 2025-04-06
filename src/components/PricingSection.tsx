
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, BadgeDollarSign, Star } from "lucide-react";
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
    <div className="bg-gradient-to-b from-white to-alchemy-purple-light/5 py-20">
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

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
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
                  <Badge className="bg-alchemy-peach text-white px-3 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className={`p-8 ${tier.isPopular ? 'bg-alchemy-purple/5' : 'bg-gray-50'}`}>
                <h3 className={`text-2xl font-bold text-center ${tier.isPopular ? 'text-alchemy-purple' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-center justify-center">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">{tier.price}</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center">{tier.description}</p>
              </div>
              
              <div className="flex-1 p-8 space-y-6">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className={`h-5 w-5 ${tier.isPopular ? 'text-alchemy-purple' : 'text-alchemy-green'}`} />
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
                  <p className="mt-2 text-xs text-center text-gray-500">7-day free trial, cancel anytime</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
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
