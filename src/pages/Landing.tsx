
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Blinkly - URL Shortener, Link Management & QR Code Generator</title>
        <meta name="description" content="Transform long URLs into powerful, trackable short links. Create custom links, track analytics, and generate QR codes with Blinkly - the ultimate link management platform." />
        <meta name="keywords" content="url shortener, link shortener, short links, custom links, link management, link tracking, url analytics, qr code generator, blinkly, link optimization" />
        <link rel="canonical" href="https://blinkly.app" />
      </Helmet>
      <Navbar />
      <main className="flex-grow" id="main-content">
        <Hero />
        <section id="features" aria-labelledby="features-heading">
          <FeaturesSection />
        </section>
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
