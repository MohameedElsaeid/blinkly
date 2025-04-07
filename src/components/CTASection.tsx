
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeDollarSign, ArrowRight, CheckCircle, ExternalLink } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blinkly-purple/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blinkly-teal/5 to-transparent"></div>
          </div>
          
          <div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-16 items-center">
            <div className="lg:pr-8">
              <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-6">
                  Ready to transform your <span className="text-blinkly-purple">link strategy?</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of businesses that use Blinkly to create powerful short links, 
                  track performance, and connect with their audience.
                </p>
                
                <div className="space-y-4 mb-10">
                  {[
                    "Free plan with up to 1,000 links monthly",
                    "No credit card required to start",
                    "Premium features for growing businesses",
                    "Enterprise solutions for larger organizations"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blinkly-green mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button size="lg" className="bg-blinkly-purple hover:bg-blinkly-purple-dark text-white shadow-md px-8 py-6 h-auto text-base" asChild>
                    <Link to="/signup" className="text-white">
                      Get started for free
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-blinkly-teal text-blinkly-teal hover:bg-blinkly-teal/10 px-8 py-6 h-auto text-base" asChild>
                    <Link to="/contact" className="flex items-center">
                      <BadgeDollarSign className="h-5 w-5 mr-2" />
                      Talk to sales
                    </Link>
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start">
                  <a href="/pricing" className="flex items-center text-blinkly-purple hover:text-blinkly-purple-dark transition-colors">
                    View pricing details
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </a>
                </p>
              </div>
            </div>
            
            <div className="mt-12 sm:mt-16 lg:mt-0 flex items-center justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md lg:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-blinkly-purple/10 to-blinkly-teal/10 z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070" 
                  alt="Blinkly Dashboard Preview" 
                  className="w-full h-auto object-cover relative z-10"
                />
                
                {/* Floating elements */}
                <div className="absolute -bottom-4 -right-4 z-20">
                  <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blinkly-purple/10 flex items-center justify-center mr-3">
                      <ArrowRight className="h-5 w-5 text-blinkly-purple" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Super quick setup</p>
                      <p className="text-xs text-gray-500">Ready in 60 seconds</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm font-medium">
                  Enterprise-ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
