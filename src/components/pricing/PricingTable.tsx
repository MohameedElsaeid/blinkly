
import React from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plan, FeatureCategory } from "@/types/pricing";

interface PricingTableProps {
  plans: Plan[];
  featureCategories: FeatureCategory[];
  billingPeriod: "monthly" | "yearly";
}

const PricingTable = ({ plans, featureCategories, billingPeriod }: PricingTableProps) => {
  return (
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
                          ? 'bg-blinkly-purple hover:bg-blinkly-purple-dark'
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
  );
};

export default PricingTable;
