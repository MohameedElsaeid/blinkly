
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Link2, BarChart3, QrCode, Shield, Zap, Globe, Clock, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient Background with Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-blinkly-purple/5 to-blinkly-teal/5 pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)`, 
          backgroundSize: '50px 50px' 
        }}></div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-24 lg:pt-32 lg:pb-36">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blinkly-purple/10 text-blinkly-purple mb-6 text-sm font-medium">
              <span className="animate-pulse mr-2">•</span> Link management just got smarter
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl max-w-5xl mx-auto leading-tight">
              <span className="block mb-2">Turn long links into</span>
              <span className="bg-gradient-to-r from-blinkly-purple to-blinkly-teal bg-clip-text text-transparent">powerful connections</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
              Create memorable short links, gain valuable insights with detailed analytics, and connect with your audience through custom QR codes.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-blinkly-purple hover:bg-blinkly-purple/90 text-white px-8 py-6 h-auto text-base" asChild>
                <Link to="/signup">
                  Get started for free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-blinkly-purple text-blinkly-purple hover:bg-blinkly-purple/10 px-8 py-6 h-auto text-base" asChild>
                <a href="#features" className="flex items-center">
                  See how it works <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-blinkly-purple mb-2">10M+</span>
              <span className="text-gray-500">Links shortened monthly</span>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-blinkly-teal mb-2">15K+</span>
              <span className="text-gray-500">Business customers</span>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-blinkly-orange mb-2">99.9%</span>
              <span className="text-gray-500">Uptime guarantee</span>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-center mb-12">Everything you need in one platform</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blinkly-purple/10 flex items-center justify-center mb-5">
                  <Globe className="h-7 w-7 text-blinkly-purple" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Link Management</h3>
                <p className="text-gray-500 text-sm">Create, manage, and track your links from anywhere in the world.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blinkly-teal/10 flex items-center justify-center mb-5">
                  <BarChart3 className="h-7 w-7 text-blinkly-teal" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-gray-500 text-sm">Get detailed insights about your audience and link performance.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blinkly-orange/10 flex items-center justify-center mb-5">
                  <QrCode className="h-7 w-7 text-blinkly-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Dynamic QR Codes</h3>
                <p className="text-gray-500 text-sm">Generate custom QR codes that can be updated anytime.</p>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mt-24 max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-full flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250" 
                    alt="Customer testimonial" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <path 
                        key={i}
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                        fill="#FBB477" 
                        transform={`translate(${i * 24}, 0)`}
                      />
                    ))}
                  </svg>
                  <p className="text-lg italic text-gray-700 mb-6">
                    "Blinkly has transformed how we manage our marketing campaigns. The detailed analytics and custom QR codes have increased our conversion rates by 43%."
                  </p>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-gray-500 text-sm">Marketing Director, TechCorp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Brands Section */}
        <div className="border-t border-gray-100 py-12">
          <div className="text-center mb-8">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Trusted by innovative brands</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img 
                  src={`https://placehold.co/150x50/e0e0e0/666666?text=LOGO ${num}`} 
                  alt={`Company ${num}`} 
                  className="h-8 md:h-10"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Why Choose Us Section */}
        <div className="py-16">
          <div className="bg-gradient-to-r from-blinkly-purple/10 to-blinkly-teal/10 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Why businesses choose Blinkly</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blinkly-purple/10 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-blinkly-purple" />
                  </div>
                  <h3 className="font-semibold">Enterprise Security</h3>
                </div>
                <p className="text-gray-600 text-sm">Bank-level encryption and protection for all your links and data.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blinkly-teal/10 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blinkly-teal" />
                  </div>
                  <h3 className="font-semibold">Time-saving Tools</h3>
                </div>
                <p className="text-gray-600 text-sm">Automate link creation and management with our intuitive dashboard.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blinkly-orange/10 rounded-full mr-4">
                    <CheckCircle2 className="h-6 w-6 text-blinkly-orange" />
                  </div>
                  <h3 className="font-semibold">Reliability</h3>
                </div>
                <p className="text-gray-600 text-sm">Industry-leading uptime with global CDN for fast link resolution.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
