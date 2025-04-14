
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import CommunitySection from "@/components/CommunitySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Blinkly - Link Management Platform | Short URLs, QR Codes & Analytics</title>
        <meta name="description" content="Transform long URLs into powerful, trackable short links. Create custom branded links, monitor analytics, and generate QR codes with Blinkly - the ultimate link management platform." />
        <meta name="keywords" content="url shortener, link management, short links, custom links, branded links, link analytics, qr code generator, link tracking, click tracking" />
        <link rel="canonical" href="https://blinkly.app" />
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
      </Helmet>
      <Navbar />
      <main className="flex-grow" id="main-content">
        <Hero />
        <HowItWorksSection />
        <section id="features" aria-labelledby="features-heading">
          <FeaturesSection />
        </section>
        <CommunitySection />
        <section id="pricing" aria-labelledby="pricing-heading">
          <PricingSection />
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
