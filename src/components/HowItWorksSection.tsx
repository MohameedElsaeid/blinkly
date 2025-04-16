import {ArrowRight, BarChart3, ChevronRight, Link2, QrCode} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

const steps = [
    {
        number: "01",
        title: "Create memorable links",
        description: "Enter your long URL and customize your short link with your brand name or keywords that reflect your content.",
        icon: Link2,
        color: "bg-blinkly-purple/10",
        textColor: "text-blinkly-purple"
    },
    {
        number: "02",
        title: "Share across platforms",
        description: "Use your branded links in emails, social media, print materials, or anywhere you need to direct traffic.",
        icon: ArrowRight,
        color: "bg-blinkly-teal/10",
        textColor: "text-blinkly-teal"
    },
    {
        number: "03",
        title: "Track performance",
        description: "Monitor clicks, geographic data, devices, and referral sources to understand your audience better.",
        icon: BarChart3,
        color: "bg-blinkly-orange/10",
        textColor: "text-blinkly-orange"
    },
    {
        number: "04",
        title: "Generate QR codes",
        description: "Create dynamic QR codes that connect your physical marketing to your digital presence.",
        icon: QrCode,
        color: "bg-blinkly-green/10",
        textColor: "text-blinkly-green"
    }
];

const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div
                        className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium mb-6">
                        <span>How Blinkly Works</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-gray-900">
                        Link management made <span className="text-blinkly-purple">simple</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Our intuitive platform streamlines the process from creation to analytics in just a few clicks.
                    </p>
                </div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connecting line */}
                            {index < steps.length - 1 && (
                                <div
                                    className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 z-0 -translate-y-1/2">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                                        <ChevronRight className="h-6 w-6 text-gray-300"/>
                                    </div>
                                </div>
                            )}

                            {/* Step content */}
                            <div className="flex flex-col items-center text-center">
                                <div
                                    className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10`}>
                                    <step.icon className={`h-10 w-10 ${step.textColor}`}/>
                                </div>
                                <div
                                    className={`${step.textColor} font-mono text-lg font-bold mb-2`}>{step.number}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Demo/Screenshot Section */}
                <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg p-8 lg:p-0 mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="p-4 lg:p-12 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">See Blinkly in action</h3>
                            <p className="text-gray-600 mb-8">
                                Our intuitive dashboard gives you complete control over your links and analytics.
                                Create, manage, and track all your links in one place.
                            </p>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-start">
                                    <div
                                        className="h-6 w-6 rounded-full bg-blinkly-purple/10 flex items-center justify-center text-blinkly-purple mr-3 mt-0.5">1
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Intuitive Dashboard</p>
                                        <p className="text-sm text-gray-600">All your links and analytics in one
                                            place</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div
                                        className="h-6 w-6 rounded-full bg-blinkly-purple/10 flex items-center justify-center text-blinkly-purple mr-3 mt-0.5">2
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Real-time Metrics</p>
                                        <p className="text-sm text-gray-600">Watch your performance as it happens</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div
                                        className="h-6 w-6 rounded-full bg-blinkly-purple/10 flex items-center justify-center text-blinkly-purple mr-3 mt-0.5">3
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Custom QR Generation</p>
                                        <p className="text-sm text-gray-600">Create branded QR codes in seconds</p>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full sm:w-auto bg-blinkly-purple hover:bg-blinkly-purple/90 text-white"
                                    asChild>
                                <Link to="/signup">
                                    Try it for free
                                </Link>
                            </Button>
                        </div>

                        <div className="lg:pr-8 flex items-center">
                            <div className="relative rounded-xl overflow-hidden shadow-md w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
                                    alt="Blinkly dashboard"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Card */}
                <div
                    className="text-center bg-gradient-to-r from-blinkly-purple/10 to-blinkly-teal/10 rounded-2xl p-8 lg:p-12">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to get started?</h3>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Join thousands of marketers and businesses who are already transforming their link strategy with
                        Blinkly.
                    </p>
                    <Button size="lg" className="bg-blinkly-purple hover:bg-blinkly-purple/90 text-white px-8" asChild>
                        <Link to="/signup">
                            Create your free account
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
