import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Star, ChevronDown, Sparkles, Tent } from 'lucide-react';

interface HeroProps {
  onBook: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBook }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        requestRef.current = undefined;
      });
    };

    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cinematic Background with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Darker gradients for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050505] z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] z-10 pointer-events-none"></div>
        
        {/* Parallax Wrapper - Reduced movement speed */}
        <div 
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `translate3d(0, ${scrollY * 0.3}px, 0)`
          }}
        >
          {/* Image with Subtle Hover Zoom Effect */}
          <img 
            src="https://s21.ax1x.com/2025/11/26/pZAD6qP.jpg" 
            alt="Magical Campsite Background" 
            className={`w-full h-full object-cover opacity-50 transition-transform duration-[8000ms] ease-out ${isHovered ? 'scale-110' : 'scale-105'}`}
            loading="eager"
          />
        </div>
      </div>

      {/* Content */}
      <div 
        className="relative z-20 text-center px-4 max-w-5xl mx-auto w-full"
        style={{
          transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
          opacity: Math.max(0, 1 - scrollY / 500)
        }}
      >
        <div className={`transition-all duration-1500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Custom Logo Element */}
          <div className="mb-6 md:mb-10 animate-float inline-flex items-center justify-center relative group cursor-default select-none">
            <div className="absolute inset-0 bg-brand-gold/10 blur-3xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-[#050505]/60 backdrop-blur-xl border border-brand-gold/20 rounded-full flex items-center justify-center group-hover:border-brand-gold/40 transition-colors duration-500 shadow-2xl group-hover:scale-105 transform transition-transform ease-out">
               <div className="absolute inset-1 rounded-full border border-white/5"></div>
               <div className="absolute inset-[-2px] border border-dashed border-brand-gold/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
               
               <div className="flex flex-col items-center justify-center transform translate-y-0.5">
                  <Tent className="w-6 h-6 md:w-8 md:h-8 text-brand-gold fill-brand-gold/5 mb-1" />
                  <span className="font-serif font-bold text-brand-gold text-xl md:text-2xl leading-none tracking-tighter">KP</span>
                  <span className="text-[6px] text-brand-gold/60 uppercase tracking-[0.3em] mt-1">EST.2024</span>
               </div>
            </div>
          </div>
          
          {/* Title - Adjusted responsive sizes */}
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-500 mb-4 tracking-wider drop-shadow-2xl select-none">
            KUHN<span className="text-brand-gold inline-block transform hover:scale-105 transition-transform duration-500 cursor-default text-glow">POHL</span>
          </h1>
          
          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-slate-200 mb-3 tracking-[0.2em] font-bold drop-shadow-lg">
            Bazhong Kongshan Luxury Resort
          </h2>
          <h3 className="text-sm md:text-lg font-serif text-brand-gold mb-8 tracking-[0.3em] uppercase opacity-90">
            巴中空山露营地豪华度假酒店
          </h3>
          
          <div className="flex items-center justify-center gap-4 mb-10 opacity-80 hidden md:flex">
            <div className="h-[1px] w-12 bg-brand-gold/30"></div>
            <p className="text-sm md:text-base text-slate-300 font-serif tracking-[0.2em] uppercase text-center">
              100 Modular Sanctuaries
            </p>
            <div className="h-[1px] w-12 bg-brand-gold/30"></div>
          </div>

          {/* Description with better readability */}
          <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed mb-10 mix-blend-plus-lighter px-4">
             Blending modular luxury living with Michelin dining and world-class performing arts in the heart of nature.
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full px-6">
            <button 
              onClick={onBook}
              className="w-full md:w-auto group relative px-8 py-4 bg-brand-gold text-black font-serif font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-300 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
              <span className="relative flex items-center justify-center gap-2 tracking-widest uppercase text-xs">
                Book Experience <Sparkles className="w-3 h-3" />
              </span>
            </button>
            
            <a href="#campsite-map" className="w-full md:w-auto px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-white font-serif font-bold rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3 tracking-widest uppercase text-xs active:scale-95">
              <MapPin className="w-3 h-3 text-brand-gold" />
              Explore Map
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - More subtle */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-1000 ${isVisible ? 'opacity-70 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        style={{ opacity: isVisible ? Math.max(0, 0.7 - scrollY / 200) : 0 }}
      >
        <span className="text-[9px] text-slate-400 uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-5 h-5 text-brand-gold/70 animate-bounce" />
      </div>
    </div>
  );
};

export default Hero;
