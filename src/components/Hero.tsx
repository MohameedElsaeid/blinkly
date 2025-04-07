
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Link2, BarChart3, QrCode } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="text-center mx-auto max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-blinkly-purple">Transform Your Links,</span>
              <span className="block">Elevate Your Brand</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
              Create powerful short links, track performance analytics, and generate custom QR codes - all in one platform.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-blinkly-purple hover:bg-blinkly-purple/90 text-white px-8 py-3" asChild>
                <Link to="/signup">
                  Start for Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-blinkly-purple text-blinkly-purple hover:bg-blinkly-purple/10" asChild>
                <a href="#features" className="flex items-center">
                  See Features <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="mt-20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-base text-gray-500">Trusted by brands worldwide</span>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-1 flex justify-center items-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img className="h-12" src="https://placeholder.pics/svg/150x50/DEDEDE/555555/LOGO%201" alt="Company 1" />
              </div>
              <div className="col-span-1 flex justify-center items-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img className="h-12" src="https://placeholder.pics/svg/150x50/DEDEDE/555555/LOGO%202" alt="Company 2" />
              </div>
              <div className="col-span-1 flex justify-center items-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img className="h-12" src="https://placeholder.pics/svg/150x50/DEDEDE/555555/LOGO%203" alt="Company 3" />
              </div>
              <div className="col-span-1 flex justify-center items-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img className="h-12" src="https://placeholder.pics/svg/150x50/DEDEDE/555555/LOGO%204" alt="Company 4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative pb-16">
          <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-white p-6 sm:p-10">
              <div className="aspect-video w-full overflow-hidden rounded-lg shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070" 
                  alt="Blinkly Platform Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-blinkly-purple mb-4">
                <Link2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Short Links</h3>
              <p className="text-gray-600">Create branded links that reflect your identity and improve recognition.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-blinkly-teal mb-4">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Powerful Analytics</h3>
              <p className="text-gray-600">Track clicks, analyze user data, and optimize your link performance.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-blinkly-orange mb-4">
                <QrCode className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dynamic QR Codes</h3>
              <p className="text-gray-600">Generate and customize QR codes that can be updated at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
