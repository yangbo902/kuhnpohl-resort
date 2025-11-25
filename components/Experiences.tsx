import React from 'react';
import { Music, Ticket, Mic2, Sparkles, Users, Calendar, ArrowUpRight, Drama } from 'lucide-react';

const SHOWS = [
  {
    id: 1,
    title: "NEBULA SYMPHONY",
    subtitle: "星云之夜",
    category: "Orchestral Light Show (管弦乐灯光秀)",
    description: "60-piece orchestra plays amidst a swarm of 500 synchronized drones and lasers, painting constellations in the night sky.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop",
    icon: Music,
    color: "from-fuchsia-600 to-purple-600"
  },
  {
    id: 2,
    title: "CIRQUE DU LUNA",
    subtitle: "月光传奇",
    category: "Avant-Garde Acrobatics (嘉年华)",
    description: "Defy gravity in our forest big top. World champion acrobats perform zero-G simulations and aquatic ballet.",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1974&auto=format&fit=crop",
    icon: Users,
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 3,
    title: "MIDNIGHT CABARET",
    subtitle: "午夜爵士",
    category: "Immersive Theatre (沉浸式演艺)",
    description: "Step into a reimagined roaring 20s. An interactive dinner show featuring jazz legends, burlesque, and mystery.",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000&auto=format&fit=crop",
    icon: Mic2,
    color: "from-rose-500 to-red-600"
  },
  {
    id: 4,
    title: "LEGENDS OF GAIA",
    subtitle: "盖亚传说",
    category: "Holographic Opera (全息秀)",
    description: "A massive scale production projected onto the mountain face, telling the origin story of the earth through light and sound.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    icon: Drama,
    color: "from-emerald-600 to-teal-600"
  }
];

const Experiences: React.FC = () => {
  return (
    <section id="entertainment" className="py-24 relative bg-[#050505] border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <div className="flex items-center gap-2 text-purple-400 mb-2">
               <Ticket className="w-4 h-4 animate-pulse" />
               <span className="text-xs font-bold tracking-[0.3em] uppercase">Global Stage</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">
               Performing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Arts</span>
             </h2>
             <h3 className="text-2xl font-serif text-slate-400 mt-2 mb-4">World-Class Entertainment (世界级演艺)</h3>
             <p className="text-slate-400 max-w-lg leading-relaxed">
               From holographic operas to gravity-defying acrobatics, witness the most spectacular shows on earth, every night.
             </p>
          </div>
          <div className="hidden md:block">
            <button className="px-8 py-3 border border-white/10 rounded-full text-sm font-bold tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Show Schedule (时间表)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOWS.map((item) => (
            <div key={item.id} className="group relative h-[500px] rounded-[2rem] overflow-hidden border border-white/10 bg-[#0B0F19] cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(109,40,217,0.3)]">
              
              {/* Image */}
              <div className="absolute inset-0 h-3/4 group-hover:h-full transition-all duration-700 ease-in-out">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F19]/50 to-[#0B0F19] z-10"></div>
                 <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                {/* Floating Icon */}
                <div className={`absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 bg-gradient-to-r from-purple-900/80 to-blue-900/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-serif leading-none mb-1">{item.title}</h3>
                  <p className="text-sm text-purple-300 font-serif tracking-wide mb-4">{item.subtitle}</p>
                  
                  <p className="text-sm text-slate-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-0 group-hover:h-auto overflow-hidden">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center justify-between">
                     <span className="text-xs font-bold text-white">Daily: 20:00</span>
                     <ArrowUpRight className="w-4 h-4 text-brand-gold" />
                  </div>
                </div>
              </div>
              
              {/* Hover Border Glow */}
              <div className="absolute inset-0 border-2 border-white/0 rounded-[2rem] group-hover:border-purple-500/30 pointer-events-none transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
