
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Link2, BarChart3, QrCode } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-blinkly-gradient pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6 text-center lg:text-left lg:flex lg:flex-col lg:justify-center py-12 sm:py-16 lg:py-20">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Transform, Track,</span>
                <span className="block text-blinkly-teal-light">and Optimize Your Links</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto lg:mx-0 text-lg text-white sm:text-xl md:mt-5">
                Blink and you'll miss it – share your link in a flash.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10 bg-blinkly-teal text-white hover:bg-blinkly-teal-dark" asChild>
                    <Link to="/signup">
                      Get Started Free
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button variant="outline" className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10 border-2 border-white text-white bg-transparent hover:bg-white hover:text-blinkly-purple-dark transition-colors" asChild>
                    <a href="#features">
                      Learn More
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blinkly-purple-light rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blinkly-purple-dark rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blinkly-orange rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '4s' }}></div>
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 animate-fade-in">
                    <div className="flex items-center mb-4">
                      <div className="h-3 w-3 rounded-full bg-blinkly-orange mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-blinkly-teal mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-blinkly-green"></div>
                    </div>
                    <div className="mb-4">
                      <div className="mb-3 bg-gray-100 rounded-md p-3">
                        <p className="text-gray-600 text-sm font-mono">https://example.com/very/long/url/that/nobody/remembers</p>
                      </div>
                      <ArrowRight className="w-6 h-6 mx-auto text-blinkly-purple my-2" />
                      <div className="bg-blinkly-purple-light/20 rounded-md p-3">
                        <p className="text-blinkly-purple font-medium font-mono">blinkly.app/brand</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="px-2 w-1/3">
                        <div className="bg-blinkly-purple-light/10 rounded-lg p-3 text-center">
                          <Link2 className="h-6 w-6 mx-auto text-blinkly-purple mb-1" />
                          <p className="text-xs font-medium">Custom Links</p>
                        </div>
                      </div>
                      <div className="px-2 w-1/3">
                        <div className="bg-blinkly-teal-light/10 rounded-lg p-3 text-center">
                          <BarChart3 className="h-6 w-6 mx-auto text-blinkly-teal mb-1" />
                          <p className="text-xs font-medium">Analytics</p>
                        </div>
                      </div>
                      <div className="px-2 w-1/3">
                        <div className="bg-blinkly-orange-light/10 rounded-lg p-3 text-center">
                          <QrCode className="h-6 w-6 mx-auto text-blinkly-orange mb-1" />
                          <p className="text-xs font-medium">QR Codes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
