import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {BarChart3, Chrome, Clock, Globe, Layers, Link2, QrCode, Settings, Share2, Shield, Zap} from "lucide-react";

const FeaturesSection = () => {
    const primaryFeatures = [
        {
            icon: Link2,
            color: "bg-gradient-to-br from-blinkly-purple to-blinkly-purple-dark",
            title: "Intelligent Link Management",
            description: "Create memorable, branded short links that reflect your content or brand identity with custom domains and UTM tracking.",
        },
        {
            icon: BarChart3,
            color: "bg-gradient-to-br from-blinkly-teal to-blinkly-teal-dark",
            title: "Advanced Analytics",
            description: "Gain deep insights into your audience with real-time tracking of clicks, geographic data, devices, and referral sources.",
        },
        {
            icon: QrCode,
            color: "bg-gradient-to-br from-blinkly-orange to-blinkly-orange-dark",
            title: "Dynamic QR Codes",
            description: "Generate customizable QR codes that can be updated anytime without changing the physical code itself.",
        }
    ];

    const secondaryFeatures = [
        {
            icon: Shield,
            title: "Enterprise Security",
            description: "Bank-level encryption and protection with automatic malware scanning and phishing detection."
        },
        {
            icon: Zap,
            title: "Instant Redirects",
            description: "Lightning-fast global CDN ensures your links resolve quickly no matter where your users are located."
        },
        {
            icon: Globe,
            title: "Global Integration",
            description: "Seamlessly works with 50+ platforms including all major social media networks and marketing tools."
        },
        {
            icon: Clock,
            title: "Scheduled Links",
            description: "Set links to activate or expire at specific dates and times for time-sensitive campaigns."
        },
        {
            icon: Share2,
            title: "Social Media Optimization",
            description: "Custom previews and metadata for each platform to maximize engagement when links are shared."
        },
        {
            icon: Chrome,
            title: "Browser Extensions",
            description: "Shorten links directly from your browser with our Chrome, Firefox, and Edge extensions."
        },
    ];

    return (
        <div id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-gray-900">
                        All the tools you need in one platform
                    </h2>
                    <p className="text-xl text-gray-600">
                        Blinkly combines powerful link management with insightful analytics and seamless integration.
                    </p>
                </div>

                {/* Primary Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {primaryFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="p-8">
                                <div
                                    className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="h-8 w-8 text-white"/>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature Showcase */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-xl mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="p-10 lg:p-12 flex flex-col justify-center">
                            <div
                                className="inline-flex items-center px-3 py-1.5 rounded-full bg-blinkly-purple/10 text-blinkly-purple text-sm font-medium mb-6">
                                <Layers className="h-4 w-4 mr-2"/>
                                Complete Solution
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Everything you need for
                                link optimization</h3>

                            <p className="text-gray-600 mb-8">
                                Blinkly brings together all the essential tools for effective link management, tracking,
                                and optimization in one powerful platform. From custom branding to detailed performance
                                analysis, we've got you covered.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {secondaryFeatures.slice(0, 3).map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="flex-shrink-0 mr-3 mt-1">
                                            <div
                                                className="w-6 h-6 rounded-full bg-blinkly-green/10 flex items-center justify-center">
                                                <feature.icon className="h-3 w-3 text-blinkly-green"/>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{feature.title}</h4>
                                            <p className="text-sm text-gray-600">{feature.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <Button className="w-full sm:w-auto bg-blinkly-purple hover:bg-blinkly-purple/90 text-white"
                                    asChild>
                                <Link to="/signup">
                                    Get started for free
                                </Link>
                            </Button>
                        </div>

                        <div className="lg:p-6 flex items-center">
                            <div className="relative rounded-xl overflow-hidden shadow-lg w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"
                                    alt="Blinkly dashboard features"
                                    className="w-full h-auto object-cover lg:max-h-[450px]"
                                />

                                <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
                                    <div className="flex items-center">
                                        <Settings
                                            className="h-6 w-6 text-blinkly-teal p-1 bg-blinkly-teal/10 rounded-full mr-2"/>
                                        <p className="text-sm font-medium text-gray-900">Fully customizable</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {secondaryFeatures.slice(3).map((feature, index) => (
                        <div key={index}
                             className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-gray-100 rounded-lg mr-4">
                                    <feature.icon className="h-5 w-5 text-blinkly-purple"/>
                                </div>
                                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Button size="lg"
                            className="bg-blinkly-purple hover:bg-blinkly-purple/90 text-white px-8 py-6 h-auto text-base shadow-md"
                            asChild>
                        <Link to="/signup">
                            Start using Blinkly today
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
