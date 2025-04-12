import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  stars: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "AltChain helped us quickly pivot our manufacturing sourcing when tariffs made our existing suppliers too expensive. We found three alternatives in just one week.",
      author: "Sarah Johnson",
      position: "Supply Chain Director",
      company: "GlobalTech Industries",
      stars: 5
    },
    {
      quote: "The compliance automation feature saved us countless hours of research. Now we can focus on building relationships with suppliers instead of paperwork.",
      author: "Michael Chen",
      position: "Procurement Manager",
      company: "Nexus Manufacturing",
      stars: 5
    },
    {
      quote: "We identified a potential supply chain disruption months before it happened and had alternate suppliers ready. This level of foresight is invaluable.",
      author: "David Rodriguez",
      position: "COO",
      company: "InnovateTech Solutions",
      stars: 5
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">What Our Early Users Say</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear from companies that have already transformed their sourcing strategy with AltChain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <blockquote className="flex-1">
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              </blockquote>
              
              <div className="mt-auto">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-primary font-medium">Join these companies and transform your global sourcing strategy</p>
        </div>
      </div>
    </section>
  );
}