import React from 'react';
import { Crown, Plane, Wine, Languages, CheckCircle2 } from 'lucide-react';

const VIPConcierge: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Image Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] group">
              <img 
                src="https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?q=80&w=1974&auto=format&fit=crop" 
                alt="VIP Butler Service" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-8 left-8">
                 <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                    <Crown className="w-8 h-8 text-black" />
                 </div>
                 <p className="text-white font-serif font-bold text-2xl">Royal Class</p>
                 <p className="text-brand-gold text-sm tracking-widest uppercase">皇家礼遇</p>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-[1px] border-brand-gold/30 rounded-full animate-spin-slow hidden md:block"></div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
               <Languages className="w-6 h-6 text-brand-gold" />
               <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Elite Standard</span>
            </div>
            
            <h2 className="text-5xl font-serif font-black text-white mb-2">
              The Royal <span className="text-brand-gold">Butler</span>
            </h2>
            <h3 className="text-2xl font-serif text-slate-300 mb-8 tracking-wide">
              Bilingual Personal Concierge (双语私人管家)
            </h3>
            
            <p className="text-slate-400 text-lg leading-relaxed mb-12 border-l-2 border-brand-gold pl-6">
              Every guest in our Signature Suites is assigned a dedicated bilingual butler (English/Chinese), trained at the world's top hospitality academies. From pre-arrival customization to private jet transfers, your wish is our command.
              <br/><br/>
              入住标志性套房的每位贵宾均配备一名经过世界顶级酒店学院培训的专属双语管家（中/英）。从抵达前的行程定制到私人飞机接送，我们随时听候您的差遣。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl h-fit group-hover:bg-brand-gold group-hover:text-black transition-colors border border-white/10">
                  <Crown className="w-6 h-6 text-brand-gold group-hover:text-black" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-serif mb-1 group-hover:text-brand-gold transition-colors">Personal Butler (私人管家)</h4>
                  <p className="text-xs text-slate-500 mb-1">24/7 Dedicated Service</p>
                  <p className="text-slate-400 text-sm">Full-time dedicated butler to handle all life trivialities and itinerary arrangements.</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl h-fit group-hover:bg-brand-gold group-hover:text-black transition-colors border border-white/10">
                  <Plane className="w-6 h-6 text-brand-gold group-hover:text-black" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-serif mb-1 group-hover:text-brand-gold transition-colors">Private Jet & Helipad (私人飞机)</h4>
                  <p className="text-xs text-slate-500 mb-1">Direct to Resort</p>
                  <p className="text-slate-400 text-sm">Private jet and helicopter landing services ensuring your privacy and convenience.</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl h-fit group-hover:bg-brand-gold group-hover:text-black transition-colors border border-white/10">
                  <Wine className="w-6 h-6 text-brand-gold group-hover:text-black" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-serif mb-1 group-hover:text-brand-gold transition-colors">Bespoke Dining (定制餐饮)</h4>
                  <p className="text-xs text-slate-500 mb-1">In-Suite Chef Experience</p>
                  <p className="text-slate-400 text-sm">Michelin-starred chefs provide door-to-door service, cooking custom private banquets in your suite.</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                 <div className="p-3 bg-white/5 rounded-xl h-fit group-hover:bg-brand-gold group-hover:text-black transition-colors border border-white/10">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold group-hover:text-black" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-serif mb-1 group-hover:text-brand-gold transition-colors">VIP Access (VIP 通道)</h4>
                  <p className="text-xs text-slate-500 mb-1">Skip the Line</p>
                  <p className="text-slate-400 text-sm">Priority access to all carnival events and facilities, enjoying skip-the-line privileges.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VIPConcierge;