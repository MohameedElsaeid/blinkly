
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BillingToggle from "@/components/pricing/BillingToggle";
import PricingView from "@/components/pricing/PricingView";
import PricingTable from "@/components/pricing/PricingTable";
import FAQ from "@/components/pricing/FAQ";
import { plans, featureCategories } from "@/data/pricingData";

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
              
              <BillingToggle 
                billingPeriod={billingPeriod} 
                onChange={setBillingPeriod} 
              />
            </div>
            
            <Tabs defaultValue="cards" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="cards">Plan Cards</TabsTrigger>
                  <TabsTrigger value="table">Comparison Table</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="cards" className="mt-0">
                <PricingView plans={plans} billingPeriod={billingPeriod} />
              </TabsContent>
              
              <TabsContent value="table" className="mt-0">
                <PricingTable 
                  plans={plans} 
                  featureCategories={featureCategories}
                  billingPeriod={billingPeriod}
                />
              </TabsContent>
            </Tabs>
            
            <div className="mt-16 text-center">
              <FAQ />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
