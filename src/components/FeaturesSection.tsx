
import { Link2, BarChart3, QrCode, Shield, Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    name: 'Custom Short Links',
    description: 'Create memorable branded links that reflect your content or brand identity. Choose custom aliases for easy recognition.',
    icon: Link2,
    color: 'bg-blinkly-purple',
  },
  {
    name: 'Detailed Analytics',
    description: 'Track clicks, analyze geographic data, view device types, and monitor referral sources to understand your audience better.',
    icon: BarChart3,
    color: 'bg-blinkly-teal',
  },
  {
    name: 'QR Code Generation',
    description: 'Automatically generate high-quality QR codes for each link, perfect for print materials and offline sharing.',
    icon: QrCode,
    color: 'bg-blinkly-orange',
  },
  {
    name: 'Security Checks',
    description: 'Our platform automatically scans links for malware and implements rate limiting to prevent abuse.',
    icon: Shield,
    color: 'bg-blinkly-green',
  },
  {
    name: 'Social Media Integration',
    description: 'Optimize how your links appear when shared on social platforms with proper metadata and previews.',
    icon: Share2,
    color: 'bg-blinkly-purple',
  },
  {
    name: 'Premium Features',
    description: 'Unlock advanced analytics, additional customization options, and branded domains with our premium plans.',
    icon: Zap,
    color: 'bg-blinkly-teal',
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful features for powerful links
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Everything you need to create, manage, and analyze your links in one platform.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md text-white mb-5" style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}>
                  <div className={`${feature.color} h-full w-full rounded-md flex items-center justify-center`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-blinkly-purple hover:bg-blinkly-purple-dark text-white" asChild>
            <Link to="/signup">Start using Blinkly for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
