
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeDollarSign } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-soft-blue-gradient py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Ready to supercharge your links?
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Start shortening links for free or contact us to learn more about our enterprise solutions.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-blinkly-purple text-white hover:bg-blinkly-purple-dark shadow-md" asChild>
              <Link to="/signup" className="text-white">Get started for free</Link>
            </Button>
            <Button size="lg" className="bg-blinkly-purple text-white hover:bg-blinkly-purple-dark shadow-md" asChild>
              <Link to="/contact" className="text-white flex items-center">
                <BadgeDollarSign className="h-5 w-5 mr-2" />
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
