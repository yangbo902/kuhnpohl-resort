import React, { useEffect, useRef } from 'react';
import { TrendingUp, Globe, Box, PieChart, Zap } from 'lucide-react';

const InvestorPitch: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    const resizeCanvas = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = () => {
      if (!ctx || !canvas) return;
      
      const scrollY = window.scrollY;
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      const gridSize = 40;
      
      // Draw Vertical Lines with Sine Wave Distortion based on Scroll
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        
        // Draw line segments for smooth curves
        for (let y = 0; y <= height; y += 20) {
          const waveFactor = (y + scrollY * 0.8) * 0.01 + (x * 0.005);
          const xOffset = Math.sin(waveFactor) * 15; // Increased amplitude
          const opacity = 0.05 + (Math.sin(waveFactor) + 1) * 0.04;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;

          if (y === 0) {
            ctx.moveTo(x + xOffset, y);
          } else {
            ctx.lineTo(x + xOffset, y);
          }
        }
        ctx.stroke();
      }

      // Draw Horizontal Lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        const waveFactor = (y - scrollY * 0.5) * 0.01;
        const yOffset = Math.cos(waveFactor + y) * 4; // Increased amplitude
        const opacity = 0.03 + (Math.sin(waveFactor * 2) + 1) * 0.03;
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.moveTo(0, y + yOffset);
        ctx.lineTo(width, y + yOffset);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative bg-[#050505] border-t border-white/5 overflow-hidden">
       {/* Dynamic Canvas Background */}
       <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
       
       <div className="container mx-auto px-6 relative z-10">
         
         <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 mb-6">
               <Zap className="w-4 h-4 text-brand-gold animate-pulse" />
               <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">Phase 1 Investment Opportunity (第一阶段投资)</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-gold">Hospitality</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Join the revolution. KUHNPOHL leverages proprietary modular architecture and AI-driven operational efficiency for higher margins and lower carbon footprint.
              <br/>
              <span className="text-sm mt-2 block opacity-80">加入这场革命。利用专有的模块化建筑和 AI 驱动的运营效率，实现更高的利润率。</span>
            </p>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Card 1 */}
            <div className="group p-8 rounded-3xl bg-[#0B0F19] border border-white/10 hover:border-brand-gold/50 transition-all duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="w-24 h-24 text-brand-gold" />
               </div>
               <h3 className="text-5xl font-sans font-black text-white mb-2 flex items-baseline gap-1">
                 22<span className="text-2xl text-brand-gold">%</span>
               </h3>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Projected ROI (Year 1)</p>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Outperforming traditional luxury resorts by minimizing construction time and maximizing occupancy through AI pricing algorithms.
               </p>
               <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-brand-gold w-[85%] shadow-[0_0_10px_#FFD700]"></div>
               </div>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-3xl bg-[#0B0F19] border border-white/10 hover:border-brand-purple/50 transition-all duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Box className="w-24 h-24 text-brand-purple" />
               </div>
               <h3 className="text-5xl font-sans font-black text-white mb-2 flex items-baseline gap-1">
                 60<span className="text-2xl text-brand-purple">Days</span>
               </h3>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Rapid Deployment (部署时间)</p>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Our patented "Snap-Lock" modular units allow for full resort deployment in 2 months, compared to 2+ years for traditional builds.
               </p>
               <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-brand-purple w-[92%] shadow-[0_0_10px_#6D28D9]"></div>
               </div>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-3xl bg-[#0B0F19] border border-white/10 hover:border-emerald-500/50 transition-all duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe className="w-24 h-24 text-emerald-500" />
               </div>
               <h3 className="text-5xl font-sans font-black text-white mb-2 flex items-baseline gap-1">
                 Zero
               </h3>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Net Carbon Impact (碳影响)</p>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Fully off-grid capable. Solar skins, atmospheric water generation, and biodegradable materials attract modern eco-conscious travelers.
               </p>
               <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[100%] shadow-[0_0_10px_#10b981]"></div>
               </div>
            </div>
         </div>

         {/* CTA Strip */}
         <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-black border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.4)] animate-bounce">
                 <PieChart className="w-8 h-8 text-black" />
              </div>
              <div>
                 <h4 className="text-2xl font-serif font-bold text-white">Download Investor Deck</h4>
                 <p className="text-slate-400 text-sm">Full financial breakdown, architectural blueprints, and 5-year roadmap.</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-white text-black font-bold tracking-widest uppercase rounded-lg hover:bg-brand-gold transition-colors shadow-lg">
              Request Access (申请访问)
            </button>
         </div>

       </div>
    </section>
  );
};

export default InvestorPitch;