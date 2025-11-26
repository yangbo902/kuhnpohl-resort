import React from 'react';
import { ChefHat, Clock, Wine, Utensils, Star, Coffee, Fish, Flame } from 'lucide-react';

const CulinaryDelights: React.FC = () => {
  return (
    <section id="dining" className="py-24 bg-[#020408] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-400/30 mb-6">
              <Utensils className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Culinary Excellence (极致味蕾)</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
             Culinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-brand-gold">Masterpieces</span>
           </h2>
           <p className="text-slate-400 max-w-2xl mx-auto text-lg">
             From 3-Michelin star artistry to round-the-clock global flavors, every meal is a performance.
             <br/>
             <span className="text-sm opacity-80 block mt-2">从米其林三星的极致艺术到全天候的全球美味，每一餐都是一场演出。</span>
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           
           {/* Michelin Card */}
           <div className="relative group rounded-[2.5rem] overflow-hidden min-h-[600px] border border-white/10">
              {/* Image */}
              <div className="absolute inset-0">
                 <img 
                   src="https://kxzimg.pages.dev/v2/QYL1bjY.png" 
                   alt="Fine Dining" 
                   className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[1,2,3].map(i => <Star key={i} className="w-5 h-5 text-brand-gold fill-brand-gold animate-pulse" />)}
                    </div>
                    <span className="text-brand-gold font-bold text-sm uppercase tracking-widest ml-2">3 Michelin Stars</span>
                 </div>
                 
                 <h3 className="text-4xl font-serif font-bold text-white mb-2">L'ÉTOILE SAUVAGE</h3>
                 <h4 className="text-xl text-slate-300 font-serif mb-6 italic">"The Wild Star" • 荒野之星</h4>
                 
                 <p className="text-slate-300 leading-relaxed mb-8 border-l-2 border-brand-gold pl-4">
                   An intimate 12-seat chef's table blending hyper-local ingredients with molecular artistry. Curated by Chef Julian Vance.
                   <br/>
                   <span className="text-sm text-slate-500 mt-2 block">仅设12席的私密主厨餐桌，融合极致本土食材与分子料理艺术。</span>
                 </p>

                 <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white/10 rounded-full"><Wine className="w-4 h-4 text-brand-gold"/></div>
                       <span className="text-xs font-bold text-white uppercase tracking-wide">Rare Vintages</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white/10 rounded-full"><ChefHat className="w-4 h-4 text-brand-gold"/></div>
                       <span className="text-xs font-bold text-white uppercase tracking-wide">Omakase</span>
                    </div>
                 </div>

                 <button className="w-full py-4 border border-brand-gold text-brand-gold font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all">
                    Reserve Table (预订餐桌)
                 </button>
              </div>
           </div>

           {/* Buffet Card */}
           <div className="relative group rounded-[2.5rem] overflow-hidden min-h-[600px] border border-white/10">
              {/* Image */}
              <div className="absolute inset-0">
                 <img 
                   src="https://kxzimg.pages.dev/v2/XCDj2BV.png" 
                   alt="Luxury Buffet" 
                   className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                 <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">Open 24/7</span>
                 </div>
                 
                 <h3 className="text-4xl font-serif font-bold text-white mb-2">THE GRAND HORIZON</h3>
                 <h4 className="text-xl text-slate-300 font-serif mb-6 italic">Global Buffet • 宏大视野</h4>
                 
                 <p className="text-slate-300 leading-relaxed mb-8 border-l-2 border-emerald-400 pl-4">
                   A borderless gastronomic journey featuring 18 live cooking stations, from Tokyo Sushi to Texas Smoked BBQ.
                   <br/>
                   <span className="text-sm text-slate-500 mt-2 block">拥有18个现场烹饪台的无界美食之旅，从东京寿司到德州烟熏烧烤，全天候无限享用。</span>
                 </p>

                 <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white/10 rounded-full"><Fish className="w-4 h-4 text-emerald-400"/></div>
                       <span className="text-xs font-bold text-white uppercase tracking-wide">Live Seafood</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white/10 rounded-full"><Flame className="w-4 h-4 text-emerald-400"/></div>
                       <span className="text-xs font-bold text-white uppercase tracking-wide">Teppanyaki</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white/10 rounded-full"><Coffee className="w-4 h-4 text-emerald-400"/></div>
                       <span className="text-xs font-bold text-white uppercase tracking-wide">Artisan Coffee</span>
                    </div>
                 </div>

                 <button className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    View Menu (查看菜单)
                 </button>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default CulinaryDelights;
