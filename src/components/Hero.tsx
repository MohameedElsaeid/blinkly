
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Link2, BarChart3, QrCode } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-gradient pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6 text-center lg:text-left lg:flex lg:flex-col lg:justify-center py-12 sm:py-16 lg:py-20">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Transform, Track,</span>
                <span className="block text-alchemy-green-light">and Optimize Your Links</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto lg:mx-0 text-lg text-white sm:text-xl md:mt-5">
                Shorten URLs, create custom branded links, generate QR codes, and get powerful analytics - all in one place.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10 bg-white text-alchemy-purple-dark hover:bg-gray-50" asChild>
                    <Link to="/signup">
                      Get Started Free
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button variant="outline" className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10 border-2 border-white text-white hover:bg-white hover:text-alchemy-purple-dark transition-colors" asChild>
                    <Link to="/features">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-alchemy-purple-light rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-alchemy-purple-dark rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-alchemy-peach rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '4s' }}></div>
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 animate-fade-in">
                    <div className="flex items-center mb-4">
                      <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mb-4">
                      <div className="mb-3 bg-gray-100 rounded-md p-3">
                        <p className="text-gray-600 text-sm font-mono">https://example.com/very/long/url/that/nobody/remembers</p>
                      </div>
                      <ArrowRight className="w-6 h-6 mx-auto text-alchemy-purple my-2" />
                      <div className="bg-alchemy-purple-light/10 rounded-md p-3">
                        <p className="text-alchemy-purple font-medium font-mono">linkalchemy.co/brand</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="px-2 w-1/3">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <Link2 className="h-6 w-6 mx-auto text-alchemy-purple mb-1" />
                          <p className="text-xs font-medium">Custom Links</p>
                        </div>
                      </div>
                      <div className="px-2 w-1/3">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <BarChart3 className="h-6 w-6 mx-auto text-alchemy-purple mb-1" />
                          <p className="text-xs font-medium">Analytics</p>
                        </div>
                      </div>
                      <div className="px-2 w-1/3">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <QrCode className="h-6 w-6 mx-auto text-alchemy-purple mb-1" />
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
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">
            Trusted by innovative companies worldwide
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-1">
              <div className="h-12 text-gray-400">Company A</div>
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <div className="h-12 text-gray-400">Company B</div>
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <div className="h-12 text-gray-400">Company C</div>
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <div className="h-12 text-gray-400">Company D</div>
            </div>
            <div className="col-span-1 flex justify-center md:col-span-1">
              <div className="h-12 text-gray-400">Company E</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
