
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
        
        // Track scroll depth
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollPercentage = (scrollPosition / (docHeight - windowHeight)) * 100;
            
            // Track at specific scroll depths (25%, 50%, 75%, 90%)
            const scrollMilestones = [25, 50, 75, 90];
            for (const milestone of scrollMilestones) {
                if (scrollPercentage >= milestone && !window.sessionStorage.getItem(`scrolled_${milestone}`)) {
                    window.sessionStorage.setItem(`scrolled_${milestone}`, 'true');
                    trackEvent({
                        event: 'ViewContent',
                        customData: {
                            content_name: 'homepage_scroll',
                            content_type: 'scroll_depth',
                            content_category: 'user_engagement',
                            scroll_depth: `${milestone}%`
                        }
                    });
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [trackEvent]);
    
    // Track section views
    const trackSectionView = (sectionName: string) => {
        trackEvent({
            event: 'ViewContent',
            customData: {
                content_name: `homepage_section_${sectionName}`,
                content_type: 'section_view',
                content_category: 'marketing',
                section: sectionName
            }
        });
    };
    
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
                <div onMouseEnter={() => trackSectionView('hero')}>
                    <Hero/>
                </div>
                <div onMouseEnter={() => trackSectionView('how_it_works')}>
                    <HowItWorksSection/>
                </div>
                <section id="features" aria-labelledby="features-heading" onMouseEnter={() => trackSectionView('features')}>
                    <FeaturesSection/>
                </section>
                <div onMouseEnter={() => trackSectionView('blog_preview')}>
                    <BlogPreviewSection/>
                </div>
                <section id="pricing" aria-labelledby="pricing-heading" onMouseEnter={() => trackSectionView('pricing')}>
                    <PricingSection/>
                </section>
                <div onMouseEnter={() => trackSectionView('cta')}>
                    <CTASection/>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Landing;
