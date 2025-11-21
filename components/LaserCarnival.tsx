import React from 'react';
import { Zap, Music, PartyPopper, Glasses, PlayCircle } from 'lucide-react';

const LaserCarnival: React.FC = () => {
  return (
    <section className="relative py-24 bg-black overflow-hidden border-t border-white/10">
      {/* Laser Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Laser Beam 1 */}
        <div className="absolute top-0 left-1/4 w-1 h-[150%] bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-40 blur-sm origin-top animate-[spin_4s_ease-in-out_infinite]"></div>
        {/* Laser Beam 2 */}
        <div className="absolute top-0 right-1/4 w-1 h-[150%] bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent opacity-40 blur-sm origin-top animate-[spin_5s_ease-in-out_infinite_reverse]"></div>
        {/* Laser Beam 3 */}
        <div className="absolute bottom-0 left-1/2 w-1 h-[150%] bg-gradient-to-t from-transparent via-cyan-500 to-transparent opacity-30 blur-md origin-bottom animate-[pulse_3s_ease-in-out_infinite]"></div>
        
        {/* Fog Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-20">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-900/20 border border-fuchsia-500/30 mb-6 animate-pulse">
              <Zap className="w-4 h-4 text-fuchsia-400" />
              <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest">Nightlife Revolution • 光影狂欢</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-serif font-black text-white mb-6 tracking-tight drop-shadow-[0_0_30px_rgba(217,70,239,0.5)]">
             LUMINA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400">CARNIVAL</span>
           </h2>
           <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
             When the sun sets, the resort becomes a canvas of light. Witness the largest outdoor laser symphony and immersive carnival on the globe.
             <br/>
             <span className="text-sm opacity-70 block mt-2">夜幕降临，度假村化身为光影的画布。见证全球最大的户外激光交响乐与沉浸式狂欢节。</span>
           </p>
        </div>

        {/* Main Event Card */}
        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_0_50px_rgba(0,255,255,0.1)] mb-12 group">
            <div className="absolute inset-0">
               <img 
                 src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
                 className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2s]"
                 alt="Laser Show"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
            
            <div className="relative p-8 md:p-16 flex flex-col md:flex-row items-end justify-between gap-8">
               <div>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">THE SKY PRISM</h3>
                  <h4 className="text-xl text-cyan-400 font-bold uppercase tracking-widest mb-4">天穹棱镜 • 激光大秀</h4>
                  <p className="text-slate-300 max-w-xl text-lg">
                    300 high-power lasers synchronized with a 50-piece live electronic orchestra. The mountain itself becomes part of the show, visible from space.
                  </p>
               </div>
               <button className="flex items-center gap-3 px-8 py-4 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 rounded-full backdrop-blur-md transition-all group/btn">
                  <PlayCircle className="w-6 h-6 text-cyan-400 group-hover/btn:text-white" />
                  <span className="text-cyan-400 font-bold uppercase tracking-widest group-hover/btn:text-white">Watch Preview (观看预览)</span>
               </button>
            </div>
        </div>

        {/* Carnival Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="bg-[#0B0F19] p-8 rounded-3xl border border-white/5 hover:border-fuchsia-500/50 transition-colors group">
               <div className="w-14 h-14 bg-fuchsia-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-fuchsia-500/20">
                  <PartyPopper className="w-7 h-7 text-fuchsia-400" />
               </div>
               <h4 className="text-2xl font-serif font-bold text-white mb-2">Holo-Parade (全息巡游)</h4>
               <p className="text-xs font-bold text-fuchsia-500 uppercase tracking-widest mb-4">Floats of Light</p>
               <p className="text-slate-400 text-sm">
                 Floats made of solid light and holographic dancers move through the resort streets, a nightly celebration of technology and art.
               </p>
            </div>

            {/* Item 2 */}
            <div className="bg-[#0B0F19] p-8 rounded-3xl border border-white/5 hover:border-green-500/50 transition-colors group">
               <div className="w-14 h-14 bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-green-500/20">
                  <Music className="w-7 h-7 text-green-400" />
               </div>
               <h4 className="text-2xl font-serif font-bold text-white mb-2">Silent Rave (静音狂欢)</h4>
               <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-4">Zero Noise Pollution</p>
               <p className="text-slate-400 text-sm">
                 Dance in the forest with high-fidelity headphones. 3 DJ channels, interactive reactive flooring, and zero noise pollution to nature.
               </p>
            </div>

            {/* Item 3 */}
            <div className="bg-[#0B0F19] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/50 transition-colors group">
               <div className="w-14 h-14 bg-yellow-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-yellow-500/20">
                  <Glasses className="w-7 h-7 text-yellow-400" />
               </div>
               <h4 className="text-2xl font-serif font-bold text-white mb-2">AR Masquerade (AR 假面舞会)</h4>
               <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-4">Digital Masks</p>
               <p className="text-slate-400 text-sm">
                 Guests receive AR visors that overlay digital costumes and masks onto other guests, creating a surreal, shifting social environment.
               </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default LaserCarnival;