
import { Plan, FeatureCategory } from "@/types/pricing";

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "Basic link shortening for personal use",
    buttonText: "Get Started",
    features: {
      "shortened_links": 10,
      "qr_codes": 2,
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
      "sla": false,
      "enhanced_analytics": false
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
      "sla": false,
      "enhanced_analytics": true
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
      "sla": false,
      "enhanced_analytics": true
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
      "sla": false,
      "enhanced_analytics": true
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
      "sla": true,
      "enhanced_analytics": true
    }
  }
];

export const featureCategories: FeatureCategory[] = [
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
      { id: "basic_analytics", name: "Basic Analytics" },
      { id: "enhanced_analytics", name: "Advanced Analytics" },
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
