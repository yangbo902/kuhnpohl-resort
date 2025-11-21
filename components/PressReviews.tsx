import React from 'react';
import { Quote } from 'lucide-react';

const PressReviews: React.FC = () => {
  const LOGOS = [
    { name: "VOGUE", opacity: "opacity-60" },
    { name: "FORBES", opacity: "opacity-80" },
    { name: "TRAVEL+LEISURE", opacity: "opacity-50" },
    { name: "ARCHDIGEST", opacity: "opacity-70" },
    { name: "WIRED", opacity: "opacity-60" },
  ];

  const REVIEWS = [
    {
      text: "Camping rewritten. KUHNPOHL isn't just a resort; it's a glimpse into the future of human leisure.",
      author: "Sarah Jenkins",
      publication: "Editor in Chief, Luxury Travel"
    },
    {
      text: "We came for the modular architecture but stayed for the holographic opera in the forest. Absolutely breathtaking.",
      author: "David Chen",
      publication: "Senior Architect, FutureDesign"
    },
    {
      text: "The seamless blend of AI butler service with raw nature is uncanny. It feels less like technology and more like magic.",
      author: "Elena Rossi",
      publication: "VOGUE Hospitality"
    }
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-[#020408]">
      <div className="container mx-auto px-6">
        
        {/* Logos */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-20 grayscale opacity-50 hover:opacity-100 transition-opacity duration-500">
          {LOGOS.map((logo, i) => (
            <span key={i} className={`text-2xl md:text-3xl font-serif font-bold text-white tracking-widest ${logo.opacity} hover:text-brand-gold cursor-default transition-colors`}>
              {logo.name}
            </span>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-[#0B0F19] p-8 rounded-2xl border border-white/5 relative group hover:-translate-y-2 transition-transform duration-300">
              <Quote className="absolute top-6 left-6 w-8 h-8 text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors" />
              <p className="text-slate-300 leading-relaxed mb-6 mt-4 italic font-serif text-lg">
                "{review.text}"
              </p>
              <div>
                <p className="text-brand-gold text-xs font-bold uppercase tracking-widest">{review.author}</p>
                <p className="text-slate-500 text-xs mt-1">{review.publication}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressReviews;