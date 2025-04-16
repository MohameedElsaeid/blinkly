import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">About
                            Blinkly</h1>
                        <p className="mt-6 text-xl text-gray-500">
                            Our mission is to make the web more accessible, efficient, and insightful through modern
                            link management.
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
                                <p className="mt-4 text-lg text-gray-500">
                                    Blinkly was founded in 2023 with a simple yet powerful vision: to transform how
                                    people share and track links online. What started as a small project to improve link
                                    sharing has evolved into a comprehensive platform used by individuals and businesses
                                    worldwide.
                                </p>
                                <p className="mt-4 text-lg text-gray-500">
                                    Our team of dedicated professionals brings together expertise in web technologies,
                                    data analytics, and user experience to create a platform that makes link management
                                    both powerful and intuitive.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
                                <ul className="mt-4 space-y-4">
                                    <li className="flex">
                                        <ArrowRight className="h-6 w-6 text-alchemy-purple flex-shrink-0"/>
                                        <p className="ml-3 text-lg text-gray-500"><span
                                            className="font-medium text-gray-900">Innovation:</span> We're constantly
                                            exploring new ways to improve link management and analytics.</p>
                                    </li>
                                    <li className="flex">
                                        <ArrowRight className="h-6 w-6 text-alchemy-purple flex-shrink-0"/>
                                        <p className="ml-3 text-lg text-gray-500"><span
                                            className="font-medium text-gray-900">Simplicity:</span> We believe powerful
                                            tools don't have to be complicated.</p>
                                    </li>
                                    <li className="flex">
                                        <ArrowRight className="h-6 w-6 text-alchemy-purple flex-shrink-0"/>
                                        <p className="ml-3 text-lg text-gray-500"><span
                                            className="font-medium text-gray-900">Data Privacy:</span> We respect user
                                            data and maintain high standards of privacy and security.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900">How Blinkly Works</h2>
                        <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
                            <div
                                className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                                <div className="p-6">
                                    <div className="text-lg font-medium text-alchemy-purple">1. Create</div>
                                    <p className="mt-2 text-gray-500">Transform long URLs into short, branded links that
                                        are easy to share and remember.</p>
                                </div>
                                <div className="p-6">
                                    <div className="text-lg font-medium text-alchemy-purple">2. Share</div>
                                    <p className="mt-2 text-gray-500">Distribute your links across social media, email,
                                        SMS, or print materials with confidence.</p>
                                </div>
                                <div className="p-6">
                                    <div className="text-lg font-medium text-alchemy-purple">3. Analyze</div>
                                    <p className="mt-2 text-gray-500">Gain valuable insights into how, when, and where
                                        your links are being clicked.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 bg-alchemy-purple-light/10 rounded-lg p-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Ready to get started?</h2>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                            Join thousands of users who are already transforming their link management with Blinkly.
                        </p>
                        <div className="mt-8">
                            <Button className="bg-alchemy-purple hover:bg-alchemy-purple-dark px-6 py-3" asChild>
                                <Link to="/signup">
                                    Start Your Free Trial
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default About;
