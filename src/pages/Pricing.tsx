import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, X, BadgeDollarSign, Star, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Plan {
  id: string;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  popular?: boolean;
  buttonText: string;
  features: Record<string, boolean | string | number>;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "Basic link shortening for personal use",
    buttonText: "Get Started",
    features: {
      "shortened_links": 50,
      "qr_codes": 5,
      "basic_analytics": true,
      "link_customization": "Standard",
      "security_features": "Basic",
      "support": "Community",
      "password_protected": false,
      "custom_qr_codes": false,
      "branded_links": false,
      "bulk_operations": false,
      "team_collaboration": 0,
      "api_access": false,
      "deep_linking": false,
      "dedicated_manager": false,
      "sla": false
    }
  },
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: "$9",
    yearlyPrice: "$90",
    description: "For creators and small businesses",
    buttonText: "Start 14-Day Free Trial",
    features: {
      "shortened_links": 500,
      "qr_codes": 50,
      "basic_analytics": true,
      "link_customization": "Advanced",
      "security_features": "Enhanced",
      "support": "Email",
      "password_protected": true,
      "custom_qr_codes": true,
      "branded_links": false,
      "bulk_operations": false,
      "team_collaboration": 0,
      "api_access": false,
      "deep_linking": false,
      "dedicated_manager": false,
      "sla": false
    }
  },
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: "$29",
    yearlyPrice: "$290",
    description: "Advanced features for teams",
    popular: true,
    buttonText: "Start 14-Day Free Trial",
    features: {
      "shortened_links": 5000,
      "qr_codes": 500,
      "basic_analytics": true,
      "link_customization": "Advanced",
      "security_features": "Enhanced",
      "support": "Priority Email",
      "password_protected": true,
      "custom_qr_codes": true,
      "branded_links": true,
      "bulk_operations": true,
      "team_collaboration": 5,
      "api_access": true,
      "deep_linking": false,
      "dedicated_manager": false,
      "sla": false
    }
  },
  {
    id: "business",
    name: "Business",
    monthlyPrice: "$79",
    yearlyPrice: "$790",
    description: "Complete solution for organizations",
    buttonText: "Start 14-Day Free Trial",
    features: {
      "shortened_links": 20000,
      "qr_codes": 2000,
      "basic_analytics": true,
      "link_customization": "Advanced",
      "security_features": "Enterprise",
      "support": "Priority + Live Chat",
      "password_protected": true,
      "custom_qr_codes": true,
      "branded_links": true,
      "bulk_operations": true,
      "team_collaboration": 20,
      "api_access": true,
      "deep_linking": true,
      "dedicated_manager": true,
      "sla": false
    }
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    description: "Tailored solutions for large enterprises",
    buttonText: "Contact Sales",
    features: {
      "shortened_links": "Unlimited",
      "qr_codes": "Unlimited",
      "basic_analytics": true,
      "link_customization": "Advanced",
      "security_features": "Enterprise+",
      "support": "24/7 Dedicated",
      "password_protected": true,
      "custom_qr_codes": true,
      "branded_links": true,
      "bulk_operations": true,
      "team_collaboration": "Unlimited",
      "api_access": true,
      "deep_linking": true,
      "dedicated_manager": true,
      "sla": true
    }
  }
];

const featureCategories = [
  {
    name: "Usage Limits",
    features: [
      { id: "shortened_links", name: "Shortened Links / month" },
      { id: "qr_codes", name: "QR Codes / month" }
    ]
  },
  {
    name: "Core Features",
    features: [
      { id: "basic_analytics", name: "Analytics" },
      { id: "link_customization", name: "Link Customization" },
      { id: "security_features", name: "Security Features" },
      { id: "support", name: "Support" }
    ]
  },
  {
    name: "Advanced Features",
    features: [
      { id: "password_protected", name: "Password Protected Links" },
      { id: "custom_qr_codes", name: "Customizable QR Codes" },
      { id: "branded_links", name: "Branded Links & Custom Domains" },
      { id: "bulk_operations", name: "Bulk Link Creation & Editing" },
      { id: "team_collaboration", name: "Team Collaboration" },
      { id: "api_access", name: "API Access" },
      { id: "deep_linking", name: "Mobile Deep Linking" },
      { id: "dedicated_manager", name: "Dedicated Account Manager" },
      { id: "sla", name: "SLA with 99.9% Uptime Guarantee" }
    ]
  }
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pricing - Blinkly | Link Management Platform</title>
        <meta name="description" content="Explore Blinkly's flexible pricing plans - from free personal use to enterprise solutions. Find the perfect plan for your link management needs." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-white to-alchemy-purple-light/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Pricing Plans
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Simple, transparent pricing for everyone. Scale as you grow.
              </p>
              
              <div className="flex justify-center mt-8 mb-16">
                <div className="inline-flex p-1 bg-gray-100 rounded-lg items-center">
                  <ToggleGroup type="single" value={billingPeriod} onValueChange={(value) => value && setBillingPeriod(value as "monthly" | "yearly")} className="flex">
                    <ToggleGroupItem value="monthly" className={`px-4 py-2 rounded-md text-sm font-medium ${billingPeriod === "monthly" ? "bg-white shadow-sm" : ""}`}>
                      Monthly
                    </ToggleGroupItem>
                    <ToggleGroupItem value="yearly" className={`px-4 py-2 rounded-md text-sm font-medium ${billingPeriod === "yearly" ? "bg-white shadow-sm" : ""}`}>
                      <span className="mr-1">Yearly</span>
                      <Badge className="bg-alchemy-peach ml-1 text-xs">Save 15%</Badge>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="cards" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="cards">Plan Cards</TabsTrigger>
                  <TabsTrigger value="table">Comparison Table</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="cards" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {plans.slice(0, 5).map((plan) => (
                    <div 
                      key={plan.id}
                      className={`relative flex flex-col rounded-2xl ${
                        plan.popular 
                          ? 'border-2 border-alchemy-purple shadow-xl md:scale-105 z-10 bg-white' 
                          : 'border border-gray-200 bg-white shadow'
                      } overflow-hidden transition-all duration-200 hover:shadow-lg`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 -mt-2 -mr-2">
                          <Badge className="bg-alchemy-peach text-white px-3 py-1 rounded-full flex items-center">
                            <Star className="h-3 w-3 mr-1" />
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
                            <Check className="h-5 w-5 text-alchemy-green flex-shrink-0" />
                            <span className="ml-3 text-sm text-gray-700">
                              {plan.features.shortened_links} shortened links/month
                            </span>
                          </li>
                          <li className="flex">
                            <Check className="h-5 w-5 text-alchemy-green flex-shrink-0" />
                            <span className="ml-3 text-sm text-gray-700">
                              {plan.features.qr_codes} QR codes/month
                            </span>
                          </li>
                          {plan.features.password_protected && (
                            <li className="flex">
                              <Check className="h-5 w-5 text-alchemy-green flex-shrink-0" />
                              <span className="ml-3 text-sm text-gray-700">Password-protected links</span>
                            </li>
                          )}
                          {plan.features.branded_links && (
                            <li className="flex">
                              <Check className="h-5 w-5 text-alchemy-green flex-shrink-0" />
                              <span className="ml-3 text-sm text-gray-700">Custom domains</span>
                            </li>
                          )}
                          {plan.features.team_collaboration !== 0 && (
                            <li className="flex">
                              <Check className="h-5 w-5 text-alchemy-green flex-shrink-0" />
                              <span className="ml-3 text-sm text-gray-700">
                                Team access ({plan.features.team_collaboration === "Unlimited" ? "Unlimited" : `Up to ${plan.features.team_collaboration}`})
                              </span>
                            </li>
                          )}
                          <li className="flex">
                            <Check className="h-5 w-5 text-alchemy-green flex-shrink-0" />
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
                                  ? 'bg-gray-800 hover:bg-gray-900'
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
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="table" className="mt-0">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="w-1/4 py-4 pl-6 font-medium">Features</TableHead>
                        {plans.map((plan) => (
                          <TableHead key={plan.id} className="text-center py-4 font-medium">
                            <div className="flex flex-col items-center">
                              <span className={plan.popular ? "text-alchemy-purple" : ""}>{plan.name}</span>
                              <span className="text-xl font-bold mt-1">
                                {billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                                {plan.monthlyPrice !== "Custom" && (
                                  <span className="text-sm font-normal">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
                                )}
                              </span>
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {featureCategories.map((category) => (
                        <React.Fragment key={category.name}>
                          <TableRow className="bg-gray-100/50">
                            <TableCell colSpan={6} className="py-3 pl-6 font-medium">{category.name}</TableCell>
                          </TableRow>
                          {category.features.map((feature) => (
                            <TableRow key={feature.id}>
                              <TableCell className="py-4 pl-6">{feature.name}</TableCell>
                              {plans.map((plan) => (
                                <TableCell key={`${plan.id}-${feature.id}`} className="text-center py-4">
                                  {typeof plan.features[feature.id] === 'boolean' ? (
                                    plan.features[feature.id] ? (
                                      <Check className="h-5 w-5 text-alchemy-green mx-auto" />
                                    ) : (
                                      <X className="h-5 w-5 text-gray-300 mx-auto" />
                                    )
                                  ) : (
                                    <span>{plan.features[feature.id]}</span>
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </React.Fragment>
                      ))}
                      <TableRow>
                        <TableCell className="py-6 pl-6"></TableCell>
                        {plans.map((plan) => (
                          <TableCell key={`${plan.id}-action`} className="text-center py-6">
                            <Button 
                              className={`px-4 py-2 ${
                                plan.popular
                                  ? 'bg-alchemy-purple hover:bg-alchemy-purple-dark'
                                  : plan.id === 'free'
                                    ? 'bg-white border-2 border-alchemy-purple text-alchemy-purple hover:bg-alchemy-purple hover:text-white'
                                    : plan.id === 'enterprise'
                                      ? 'bg-gray-800 hover:bg-gray-900'
                                      : 'bg-alchemy-purple/90 hover:bg-alchemy-purple'
                              }`} 
                              asChild
                            >
                              <Link to={plan.id === 'enterprise' ? "/contact" : "/signup"}>
                                {plan.buttonText}
                              </Link>
                            </Button>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-16 text-center">
              <div className="max-w-3xl mx-auto px-8 py-8 bg-alchemy-purple-light/20 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Can I change plans later?</h4>
                    <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Is there a free trial?</h4>
                    <p className="text-gray-600">All paid plans come with a 14-day free trial. No credit card required to start.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Do you offer discounts?</h4>
                    <p className="text-gray-600">We offer special pricing for non-profits, educational institutions, and open source projects. Contact us for details.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">What happens if I exceed my limits?</h4>
                    <p className="text-gray-600">We'll notify you when you're approaching your limits. You can upgrade your plan or wait until the next month's reset.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
