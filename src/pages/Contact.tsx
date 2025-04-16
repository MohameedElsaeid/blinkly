import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import {Mail, MapPin, Phone} from "lucide-react";
import {SEO} from "@/utils/seo";

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title="Contact Us"
                description="Contact the Blinkly team. We're here to help with any questions about our URL shortener, link management platform, or QR code generator."
                url="https://blinkly.app/contact"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    description: "Contact the Blinkly team",
                    mainEntity: {
                        "@type": "Organization",
                        name: "Blinkly",
                        email: "hello@blinkly.app",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "123 Blinkly Street",
                            addressLocality: "San Francisco",
                            addressRegion: "CA",
                            postalCode: "94107",
                            addressCountry: "US"
                        }
                    }
                }}
            />

            <Navbar/>

            <main className="flex-grow py-16 bg-gradient-to-b from-white to-alchemy-purple-light/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Have questions about our link management platform? We're here to help!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <div className="bg-alchemy-purple/10 p-3 rounded-full mb-4">
                                <Mail className="h-6 w-6 text-alchemy-purple"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                            <p className="text-gray-600 mb-3">Our friendly team is here to help</p>
                            <a href="mailto:hello@blinkly.app" className="text-alchemy-purple hover:underline">
                                hello@blinkly.app
                            </a>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <div className="bg-alchemy-purple/10 p-3 rounded-full mb-4">
                                <MapPin className="h-6 w-6 text-alchemy-purple"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Office</h3>
                            <p className="text-gray-600 mb-3">Come say hello at our office</p>
                            <p className="text-gray-700">
                                123 Blinkly Street<br/>
                                San Francisco, CA 94107
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <div className="bg-alchemy-purple/10 p-3 rounded-full mb-4">
                                <Phone className="h-6 w-6 text-alchemy-purple"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Phone</h3>
                            <p className="text-gray-600 mb-3">Mon-Fri from 8am to 5pm</p>
                            <a href="tel:+15551234567" className="text-alchemy-purple hover:underline">
                                +1 (555) 123-4567
                            </a>
                        </div>
                    </div>

                    <ContactForm/>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default Contact;
