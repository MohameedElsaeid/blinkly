
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Blinkly transformed our marketing campaigns. We've seen a 43% increase in click-through rates and can now track exactly where our traffic is coming from.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250",
    stars: 5
  },
  {
    content: "The QR code feature alone has revolutionized how we connect our print materials to digital experiences. Our event registrations increased by 28%.",
    author: "Michael Chen",
    role: "Events Manager",
    company: "GlobalEvents Inc.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250",
    stars: 5
  },
  {
    content: "As a small business, the analytics provided by Blinkly help us make data-driven decisions without needing an entire marketing team. It's been invaluable.",
    author: "Emma Rodriguez",
    role: "Founder & CEO",
    company: "Artisan Collective",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250", 
    stars: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4">
            Loved by businesses worldwide
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers have to say about their experience with Blinkly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg p-8 relative hover:shadow-xl transition-all duration-300"
            >
              {/* Quote symbol */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-blinkly-purple flex items-center justify-center text-white text-2xl font-serif">
                "
              </div>
              
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional social proof */}
        <div className="mt-16 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <p className="text-2xl font-medium text-gray-700 mb-8">
              Join over <span className="text-blinkly-purple font-bold">15,000+</span> businesses already using Blinkly
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <img 
                    src={`https://placehold.co/180x60/f8f8f8/a3a3a3?text=BRAND ${num}`} 
                    alt={`Brand ${num}`} 
                    className="h-10 max-w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
