
import { Users, ArrowRight, Globe, MessageSquare, Award, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CommunitySection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blinkly-purple/10 text-blinkly-purple text-sm font-medium mb-6">
            <Users className="h-4 w-4 mr-2" />
            <span>Join Our Global Community</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-gray-900">
            Connect with <span className="text-blinkly-purple">link enthusiasts</span> worldwide
          </h2>
          <p className="text-xl text-gray-600">
            Share insights, learn strategies, and grow your audience with fellow marketers and developers.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "35K+", label: "Active Members", icon: Users, color: "bg-blinkly-purple/10", textColor: "text-blinkly-purple" },
            { number: "120+", label: "Countries", icon: Globe, color: "bg-blinkly-teal/10", textColor: "text-blinkly-teal" },
            { number: "450K", label: "Monthly Discussions", icon: MessageSquare, color: "bg-blinkly-orange/10", textColor: "text-blinkly-orange" },
            { number: "9,800+", label: "Success Stories", icon: Award, color: "bg-blinkly-green/10", textColor: "text-blinkly-green" },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center">
              <div className={`w-14 h-14 mx-auto rounded-full ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className={`h-7 w-7 ${stat.textColor}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Community Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Forum</h3>
              <p className="text-gray-600 mb-6">
                Connect with other Blinkly users to share tips, ask questions, and learn best practices for link optimization.
              </p>
              <div className="space-y-4">
                {[
                  "Get instant answers from our community experts",
                  "Browse topic-specific discussions and resources",
                  "Share your success stories and learn from others"
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blinkly-purple/10 flex items-center justify-center text-blinkly-purple mr-3 mt-0.5">
                      <Activity className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button variant="outline" className="group border-blinkly-purple text-blinkly-purple hover:bg-blinkly-purple/5" asChild>
                  <Link to="/community" className="flex items-center">
                    Join the discussion
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-64 bg-blinkly-purple/5">
              <img 
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1470" 
                alt="Blinkly community meetup" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="text-sm font-medium mb-1">UPCOMING EVENT</div>
                <div className="text-xl font-bold mb-1">Link Optimization Summit</div>
                <div className="text-sm">June 15-17, 2025 • Virtual</div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Events & Workshops</h3>
              <p className="text-gray-600 mb-6">
                Join our regular webinars, workshops, and annual conferences to level up your link management skills.
              </p>
              <Button className="bg-blinkly-teal hover:bg-blinkly-teal/90 text-white w-full" asChild>
                <Link to="/events">
                  View upcoming events
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Community CTA */}
        <div className="bg-gradient-to-r from-blinkly-purple/10 to-blinkly-teal/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to join our community?</h3>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with thousands of marketers and businesses using Blinkly to transform their digital presence.
          </p>
          <Button size="lg" className="bg-blinkly-purple hover:bg-blinkly-purple/90 text-white px-8" asChild>
            <Link to="/signup">
              Get started for free
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
