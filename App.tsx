import React, { useState } from 'react';
import Hero from './components/Hero';
import CampsiteMap from './components/CampsiteMap';
import VideoGenerator from './components/VideoGenerator';
import LuxuryGallery from './components/LuxuryGallery';
import InvestorPitch from './components/InvestorPitch';
import Experiences from './components/Experiences';
import BookingModal from './components/BookingModal';
import PressReviews from './components/PressReviews';
import GalacticJourney from './components/GalacticJourney';
import VIPConcierge from './components/VIPConcierge';
import CulinaryDelights from './components/CulinaryDelights';
import EssentialServices from './components/EssentialServices';
import LaserCarnival from './components/LaserCarnival';
import EuropeanService from './components/EuropeanService';
import { Compass, Globe, CreditCard, Smartphone, Bitcoin } from 'lucide-react';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [lang, setLang] = useState<'EN' | 'CN'>('EN'); // Default back to English as primary

  const openBooking = (unitId?: string) => {
    if (unitId) setSelectedUnit(unitId);
    else setSelectedUnit(null);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-gold selection:text-black font-sans">
      {/* Global Modals */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preSelectedUnit={selectedUnit}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="p-2 bg-brand-gold rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,215,0,0.8)] transition-shadow">
               <Compass className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-serif font-bold text-xl tracking-[0.15em] leading-none group-hover:text-brand-gold transition-colors">KUHN<span className="font-light text-slate-400 group-hover:text-white">POHL</span></span>
              <span className="text-[8px] text-slate-500 uppercase tracking-widest">Resort & Carnival (度假村)</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-[0.2em] text-slate-400">
            <a href="#resort" className="hover:text-brand-gold transition-colors py-2">SUITES (套房)</a>
            <a href="#carnival" className="hover:text-brand-gold transition-colors py-2">CARNIVAL (嘉年华)</a>
            <a href="#entertainment" className="hover:text-brand-gold transition-colors py-2">SHOWS (演出)</a>
            <a href="#dining" className="hover:text-brand-gold transition-colors py-2">DINING (餐饮)</a>
            <a href="#vip" className="hover:text-brand-gold transition-colors py-2">VIP</a>
            
            <button 
              onClick={() => openBooking()}
              className="px-6 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-all rounded-full shadow-[0_0_10px_rgba(255,215,0,0.1)] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            >
              BOOK NOW (预订)
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero onBook={() => openBooking()} />
        
        <div className="relative w-full">
           {/* Gradient Transition */}
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none"></div>
           
           <div id="resort">
              <LuxuryGallery />
           </div>

           <div id="vip">
              <VIPConcierge />
           </div>
           
           <EuropeanService />

           <EssentialServices />
           
           <CulinaryDelights />

           <PressReviews />
           
           <div id="carnival">
              <GalacticJourney />
              <LaserCarnival />
              <Experiences />
           </div>

           <section id="campsite-map" className="relative pt-10 pb-20 overflow-hidden">
             {/* Background Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>
             
             <CampsiteMap onBook={(unitId) => openBooking(unitId)} />
           </section>

           <div id="investors">
              <InvestorPitch />
           </div>

           <section className="relative pb-32 px-4 border-t border-white/5 pt-24">
              <div className="container mx-auto">
                 <VideoGenerator />
              </div>
           </section>
        </div>
      </main>

      <footer className="bg-[#020203] py-16 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-purple/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/5 pb-12">
              <div className="col-span-1 md:col-span-2 text-left">
                 <div className="flex items-center gap-2 mb-6 text-brand-gold">
                    <Compass className="w-8 h-8" />
                    <span className="font-serif font-bold text-2xl">KUHNPOHL</span>
                 </div>
                 <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                    The world's first AI-native luxury resort network. Redefining the boundaries between nature, technology, and human experience.
                    <br/>
                    全球首个 AI 原生豪华度假网络。
                 </p>
              </div>
              <div>
                 <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Contact</h4>
                 <ul className="space-y-4 text-slate-500 text-sm">
                    <li className="hover:text-brand-gold cursor-pointer transition-colors">Global: +1 (888) 555-0123</li>
                    <li className="hover:text-brand-gold cursor-pointer transition-colors">China: +86 21 5555 0199</li>
                    <li className="hover:text-brand-gold cursor-pointer transition-colors">concierge@kuhnpohl.com</li>
                 </ul>
              </div>
              <div>
                 <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Accepted Payments</h4>
                 <div className="flex flex-wrap gap-4 text-slate-500">
                    <div className="flex items-center gap-2 hover:text-white transition-colors" title="Credit Card">
                       <CreditCard className="w-5 h-5" /> <span className="text-xs">Card</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-[#07C160] transition-colors" title="WeChat Pay">
                       <Smartphone className="w-5 h-5" /> <span className="text-xs">WeChat</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-[#1677FF] transition-colors" title="Alipay">
                       <Smartphone className="w-5 h-5" /> <span className="text-xs">Alipay</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-orange-500 transition-colors" title="Crypto">
                       <Bitcoin className="w-5 h-5" /> <span className="text-xs">Crypto</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="text-center">
             <p className="text-slate-600 text-xs font-serif tracking-wider">
               © 2024 KUHNPOHL RESORTS INTERNATIONAL.
               <span className="mx-2">•</span>
               Where nature meets imagination. 自然与想象的边界在此消融。
             </p>
             <div className="flex justify-center gap-6 text-slate-700 text-[10px] tracking-widest uppercase mt-4">
               <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
               <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors flex items-center gap-1">
                 Billing Info <span className="text-[10px]">↗</span>
               </a>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;