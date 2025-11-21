import React from 'react';
import { Shirt, HeartPulse, Sparkles, Plus, Pill, Clock } from 'lucide-react';

const EssentialServices: React.FC = () => {
  return (
    <section className="py-16 bg-[#0B0F19] border-y border-white/5 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-12">
           <div className="h-[1px] w-12 bg-slate-700"></div>
           <span className="text-slate-400 text-xs font-bold tracking-[0.3em] uppercase">Worry-Free Stay (无忧入住)</span>
           <div className="h-[1px] w-12 bg-slate-700"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Laundry Service */}
          <div className="group relative p-8 rounded-3xl bg-[#050505] border border-white/10 overflow-hidden hover:border-brand-gold/30 transition-all duration-500">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12">
                <Shirt className="w-32 h-32 text-brand-gold" />
             </div>
             
             <div className="flex items-start gap-6 relative z-10">
                <div className="p-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 group-hover:bg-brand-gold group-hover:text-black transition-colors duration-500">
                   <Sparkles className="w-8 h-8 text-brand-gold group-hover:text-black" />
                </div>
                <div>
                   <h3 className="text-2xl font-serif font-bold text-white mb-1">Valet Laundry (代客洗衣)</h3>
                   <h4 className="text-brand-gold text-sm tracking-widest uppercase mb-4 font-bold">Complimentary Service</h4>
                   <p className="text-slate-400 text-sm leading-relaxed mb-4">
                     Travel light, stay fresh. We provide unlimited complimentary same-day washing, eco-dry cleaning, and pressing for all guests. Delivered to your suite in sustainable packaging.
                   </p>
                   <div className="flex gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Same Day</span>
                      <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Eco-Clean</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Pharmacy/First Aid */}
          <div className="group relative p-8 rounded-3xl bg-[#050505] border border-white/10 overflow-hidden hover:border-red-500/30 transition-all duration-500">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:-rotate-12">
                <HeartPulse className="w-32 h-32 text-red-500" />
             </div>
             
             <div className="flex items-start gap-6 relative z-10">
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-colors duration-500">
                   <Plus className="w-8 h-8 text-red-500 group-hover:text-white" />
                </div>
                <div>
                   <h3 className="text-2xl font-serif font-bold text-white mb-1">Wellness Hub (健康中心)</h3>
                   <h4 className="text-red-500 text-sm tracking-widest uppercase mb-4 font-bold">First Aid & Mini-Pharmacy</h4>
                   <p className="text-slate-400 text-sm leading-relaxed mb-4">
                     Your health is paramount. Every sector is equipped with automated micro-pharmacies for essentials and direct 24/7 connection to our on-site medical response team.
                   </p>
                   <div className="flex gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <span className="flex items-center gap-1"><Pill className="w-3 h-3" /> 24/7 Access</span>
                      <span className="flex items-center gap-1"><HeartPulse className="w-3 h-3" /> On-Call Medic</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EssentialServices;