
import {useEffect} from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";
import BlogPreviewSection from "@/components/blog/BlogPreviewSection";
import {generateStructuredData, SEO} from "@/utils/seo";
import {useMetaPixel} from "@/hooks";

const Landing = () => {
    const {trackEvent} = useMetaPixel();
    
    useEffect(() => {
        // Track landing page view with detailed info
        trackEvent({
            event: 'ViewContent',
            customData: {
                content_name: 'homepage',
                content_type: 'landing_page',
                content_category: 'marketing'
            }
        });
    }, [trackEvent]);
    
    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title="Link Management Platform | Short URLs, QR Codes & Analytics"
                description="Transform long URLs into powerful, trackable short links. Create custom branded links, monitor analytics, and generate QR codes with Blinkly - the ultimate link management platform."
                url="https://blinkly.app"
                structuredData={generateStructuredData.website()}
            />

            {/* Add custom styles for the grid pattern */}
            <style>
                {`
          .bg-grid-pattern {
            background-size: 40px 40px;
            background-image: 
              linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
          }
        `}
            </style>

            <Navbar/>
            <main className="flex-grow" id="main-content">
                <Hero/>
                <HowItWorksSection/>
                <section id="features" aria-labelledby="features-heading">
                    <FeaturesSection/>
                </section>
                <BlogPreviewSection/>
                <section id="pricing" aria-labelledby="pricing-heading">
                    <PricingSection/>
                </section>
                <CTASection/>
            </main>
            <Footer/>
        </div>
    );
};

export default Landing;
