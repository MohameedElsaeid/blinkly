
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-alchemy-purple-light/10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to transform your links?</span>
          <span className="block text-alchemy-purple">Start your 7-day free trial today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button className="bg-alchemy-purple hover:bg-alchemy-purple-dark text-white px-5 py-3 text-base font-medium" asChild>
              <Link to="/signup">
                Start free trial
              </Link>
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Button variant="outline" className="text-alchemy-purple bg-white hover:bg-gray-50 px-5 py-3 text-base font-medium" asChild>
              <a href="#features">
                Learn more
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
