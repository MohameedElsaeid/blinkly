
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-blinkly-gradient py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to supercharge your links?
          </h2>
          <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
            Start shortening links for free or contact us to learn more about our enterprise solutions.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-blinkly-orange text-white hover:bg-blinkly-orange-dark" asChild>
              <Link to="/signup" className="text-white">Get started for free</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white hover:bg-white/10" asChild>
              <Link to="/contact" className="text-white">Contact sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
