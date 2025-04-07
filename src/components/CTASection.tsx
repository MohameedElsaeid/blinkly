import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-alchemy-purple py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to supercharge your links?
          </h2>
          <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
            Start shortening links for free or contact us to learn more about our enterprise solutions.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-white text-alchemy-purple hover:bg-gray-100" asChild>
              <Link to="/signup">Get started for free</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
