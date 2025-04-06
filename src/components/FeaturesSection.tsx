
import { Link2, BarChart3, QrCode, Shield, Share2, Zap } from "lucide-react";

const features = [
  {
    name: 'Custom Short Links',
    description: 'Create memorable branded links that reflect your content or brand identity. Choose custom aliases for easy recognition.',
    icon: Link2,
  },
  {
    name: 'Detailed Analytics',
    description: 'Track clicks, analyze geographic data, view device types, and monitor referral sources to understand your audience better.',
    icon: BarChart3,
  },
  {
    name: 'QR Code Generation',
    description: 'Automatically generate high-quality QR codes for each link, perfect for print materials and offline sharing.',
    icon: QrCode,
  },
  {
    name: 'Security Checks',
    description: 'Our platform automatically scans links for malware and implements rate limiting to prevent abuse.',
    icon: Shield,
  },
  {
    name: 'Social Media Integration',
    description: 'Optimize how your links appear when shared on social platforms with proper metadata and previews.',
    icon: Share2,
  },
  {
    name: 'Premium Features',
    description: 'Unlock advanced analytics, additional customization options, and branded domains with our premium plans.',
    icon: Zap,
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-alchemy-purple font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage your links
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            LinkAlchemy Lab provides powerful tools to create, manage, and analyze your links with precision and ease.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="card-hover relative bg-white p-6 rounded-lg border border-gray-200">
                <div>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-alchemy-purple text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </div>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
