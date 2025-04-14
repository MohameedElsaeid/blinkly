
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ApiHeader,
  AuthApiSection,
  ShortLinksApiSection,
  DynamicLinksApiSection,
  AnalyticsApiSection
} from "@/components/api-docs";
import { SEO } from "@/utils/seo";

const ApiDocs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="API Documentation"
        description="Documentation for Blinkly's RESTful APIs for URL shortening and dynamic link management."
      />
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ApiHeader />

          <div className="space-y-12">
            <AuthApiSection />
            <ShortLinksApiSection />
            <DynamicLinksApiSection />
            <AnalyticsApiSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocs;
