
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeDollarSign, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-blinkly-purple/10 to-blinkly-teal/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blinkly-purple/20 to-blinkly-teal/20"></div>
          </div>
          <div className="relative py-16 px-4 sm:py-20 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
            <div className="lg:pr-8">
              <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">
                  Ready to transform your links?
                </h2>
                <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                  Join thousands of businesses that use Blinkly to create powerful short links, 
                  track performance, and connect with their audience.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blinkly-purple hover:bg-blinkly-purple-dark text-white" asChild>
                    <Link to="/signup" className="text-white">Get started for free</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-blinkly-teal text-blinkly-teal hover:bg-blinkly-teal/10" asChild>
                    <Link to="/contact" className="flex items-center">
                      <BadgeDollarSign className="h-5 w-5 mr-2" />
                      Contact Sales
                    </Link>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  No credit card required. Free plan includes up to 1,000 shortened links per month.
                </p>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0 flex items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="/dashboard-preview.jpg" 
                    alt="Blinkly Dashboard Preview" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blinkly-purple/20 flex items-center justify-center">
                        <ArrowRight className="h-6 w-6 text-blinkly-purple" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">Start now</h4>
                      <p className="text-xs text-gray-500">Setup in minutes</p>
                    </div>
                  </div>
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
