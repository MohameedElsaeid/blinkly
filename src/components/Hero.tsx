
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Play, Check, Globe, Shield, Zap, BarChart3, Users } from "lucide-react";
import { motion } from "framer-motion";
import { OptimizedImage } from "./OptimizedImage";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blinkly-purple/5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-blinkly-teal/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-blinkly-orange/5 blur-3xl"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 pt-20 lg:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Hero Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blinkly-purple/10 text-blinkly-purple text-sm font-medium mb-6">
              <span className="animate-pulse mr-2">•</span> 
              Introducing Blinkly 2.0
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              <span className="block">Transform your links,</span>
              <span className="bg-gradient-to-r from-blinkly-purple to-blinkly-teal bg-clip-text text-transparent">
                elevate your brand
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8">
              Create memorable short links, gain powerful insights with real-time analytics, and connect with your audience through custom QR codes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button size="lg" className="w-full sm:w-auto bg-blinkly-purple hover:bg-blinkly-purple/90 text-white px-8 py-6 h-auto text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link to="/signup">
                  Start for free
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 h-auto text-base" asChild>
                <a href="#features" className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-blinkly-purple" />
                  See how it works
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blinkly-green mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blinkly-green mr-2" />
                Free plan available
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blinkly-green mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blinkly-purple/20 to-blinkly-teal/20 rounded-xl"></div>
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                alt="Analytics dashboard with interactive charts and statistics" 
                className="w-full h-auto rounded-xl relative z-10"
                priority={true}
                width={600}
                height={400}
              />
              
              {/* Stats Overlay */}
              <div className="absolute -bottom-3 -right-3 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-blinkly-purple p-1.5 bg-blinkly-purple/10 rounded-full mr-3" />
                  <div>
                    <p className="text-blinkly-purple font-semibold">+43% Growth</p>
                    <p className="text-xs text-gray-600">in click-through rates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blinkly-purple/10 flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-blinkly-purple" />
            </div>
            <span className="text-4xl font-bold text-gray-900 mb-2">10M+</span>
            <span className="text-gray-600">Links shortened monthly</span>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blinkly-teal/10 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-blinkly-teal" />
            </div>
            <span className="text-4xl font-bold text-gray-900 mb-2">15K+</span>
            <span className="text-gray-600">Business customers</span>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blinkly-orange/10 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-blinkly-orange" />
            </div>
            <span className="text-4xl font-bold text-gray-900 mb-2">99.9%</span>
            <span className="text-gray-600">Uptime guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
