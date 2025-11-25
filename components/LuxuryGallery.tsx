import React, { useState } from 'react';
import { Wifi, Coffee, Wind, Shield, Star, ArrowRight, Droplets, Mountain, Trees, Sun, X, Play, Loader2, Image as ImageIcon, Sparkles, Expand } from 'lucide-react';
import { generateCampVideo, generateImage, checkApiKey, promptApiKeySelect, urlToBase64 } from '../services/geminiService';

interface Amenity {
  name: string;
  description: string;
  prompt: string;
}

interface Suite {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  icon: React.ElementType;
  color: string;
  features: string[];
  videoPrompt: string;
  amenities: Amenity[];
}

const SUITES: Suite[] = [
  {
    id: 1,
    title: "Celestial Villa (天体别墅)",
    subtitle: "Forest Realm (森林秘境)",
    description: "3,000 sq ft modular masterpiece with a 360-degree smart glass ceiling, private heated infinity pool, and dedicated AI butler. (3,000平方英尺的模块化杰作，配备360度智能玻璃天花板。)",
    price: "¥35,000 / Night",
    image: "https://i.ibb.co/93zffBY1/alpha-exterior-view-4-crop.jpg",
    icon: Trees,
    color: "text-emerald-400",
    features: ["Infinity Pool (无边泳池)", "Butler Service (管家服务)", "Helipad (直升机坪)"],
    videoPrompt: "Cinematic interior tour of a luxury forest villa with glass ceiling, infinity pool looking over trees, modern furniture, warm lighting, 4k, photorealistic, slow camera movement.",
    amenities: [
      { name: "Smart Glass Ceiling", description: "Control transparency for stargazing.", prompt: "Luxury bedroom with a high-tech transparent glass ceiling showing a starry night sky, modern interior, 8k." },
      { name: "Private Infinity Pool", description: "Volcanic heated water.", prompt: "A private infinity pool on a forest balcony, steam rising, sunset lighting, luxury resort vibe, 8k." }
    ]
  },
  {
    id: 2,
    title: "Cliffside Manor (悬崖庄园)",
    subtitle: "Mountain Peak (高山之巅)",
    description: "Suspended 500m above the valley. Features transparent flooring, levitating meditation pods, and zero-gravity sleep chambers. (悬浮于谷底500米之上，设有透明地板。)",
    price: "¥22,400 / Night",
    image: "https://i.ibb.co/Lz6PCr6F/f-OG2r4f4-G840-Xq-J6zq-LAHFRg-JS40athm-G8g4-GMNX.jpg",
    icon: Mountain,
    color: "text-indigo-400",
    features: ["Glass Floor (玻璃地板)", "Oxygen Rich (富氧环境)", "Private Chef (私人厨师)"],
    videoPrompt: "Cinematic interior tour of a futuristic cliffside mansion, floor-to-ceiling windows with mountain views, suspended furniture, minimalist luxury, 4k, photorealistic.",
    amenities: [
      { name: "Zero-G Sleep Pod", description: "NASA-grade levitation bed.", prompt: "Futuristic floating bed in a luxury glass bedroom, high-tech, soft blue ambient lighting, sci-fi luxury, 8k." },
      { name: "Glass Floor Lounge", description: "Vertigo-inducing views.", prompt: "Luxury living room with a transparent glass floor looking down a cliff, modern furniture, breathtaking view, 8k." }
    ]
  },
  {
    id: 3,
    title: "Dune Royal Pavilion (沙丘皇家亭阁)",
    subtitle: "Dune Oasis (沙丘绿洲)",
    description: "Mars-inspired architecture. Includes hydrotherapy spa, sand-filtered water systems, and holographic entertainment centers. (灵感源自火星建筑。包含水热疗SPA。)",
    price: "¥31,500 / Night",
    image: "https://i.ibb.co/6R9FRWYp/F4o-DXKe-RIGtlyb-MF0-Gvezo5j-XCny-SFGced8-R2t5w.jpg",
    icon: Sun,
    color: "text-amber-400",
    features: ["Hydro Spa (热疗SPA)", "Holographic TV (全息电视)", "Sand Yacht (沙地游艇)"],
    videoPrompt: "Cinematic interior tour of a luxury desert pavilion, warm sandstone walls, gold accents, holographic displays, oasis view outside, 4k, photorealistic.",
    amenities: [
      { name: "Holographic Theater", description: "Immersive 3D entertainment.", prompt: "Luxury living room with a large 3D holographic projection in the center, dim lighting, futuristic desert home, 8k." },
      { name: "Hydrotherapy Spa", description: "Private indoor oasis.", prompt: "Private luxury spa room with stone walls, desert plants, steaming hot tub, golden lighting, 8k." }
    ]
  },
  {
    id: 4,
    title: "Lagoon Float (泻湖漂浮屋)",
    subtitle: "Lakeside Haven (湖畔浅滩)",
    description: "Semi-submerged underwater unit with aquatic viewing galleries, bioluminescent night lighting, and direct kayak ports. (半潜式水下单元，设有水下观景廊。)",
    price: "¥26,600 / Night",
    image: "https://i.ibb.co/TMMZ3XbQ/image.jpg",
    icon: Droplets,
    color: "text-cyan-400",
    features: ["Underwater Room (水下卧室)", "Private Dock (私人码头)", "Aqua Drone (水下无人机)"],
    videoPrompt: "Cinematic interior tour of an underwater bedroom suite, fish swimming outside windows, blue ambient lighting, luxury bedding, 4k, photorealistic.",
    amenities: [
      { name: "Underwater Gallery", description: "Bedroom with reef views.", prompt: "Luxury underwater bedroom with floor to ceiling windows showing coral reef and fish, deep blue ocean light, 8k." },
      { name: "Bioluminescent Deck", description: "Glowing night patio.", prompt: "Outdoor wooden deck over water at night, glowing bioluminescent water below, luxury lounge chairs, romantic lighting, 8k." }
    ]
  }
];

const LuxuryGallery: React.FC = () => {
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState("");
  
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const openModal = (suite: Suite) => {
    setSelectedSuite(suite);
    setVideoUrl(null);
    setVideoStatus("");
    // Don't clear generated images so they persist if re-opened (optional)
  };

  const closeModal = () => {
    setSelectedSuite(null);
    setVideoUrl(null);
  };

  const handleGenerateTour = async () => {
    if (!selectedSuite) return;
    
    const hasKey = await checkApiKey();
    if (!hasKey) {
      await promptApiKeySelect();
      return;
    }

    setIsGeneratingVideo(true);
    setVideoStatus("Initializing Veo Dream Engine...");

    try {
      // Use suite image as start frame
      const { base64, mimeType } = await urlToBase64(selectedSuite.image);
      const url = await generateCampVideo(selectedSuite.videoPrompt, base64, mimeType, setVideoStatus);
      setVideoUrl(url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate tour.");
    } finally {
      setIsGeneratingVideo(false);
      setVideoStatus("");
    }
  };

  const handleGenerateAmenity = async (amenityName: string, prompt: string) => {
    const hasKey = await checkApiKey();
    if (!hasKey) {
      await promptApiKeySelect();
      return;
    }

    setLoadingImages(prev => ({ ...prev, [amenityName]: true }));
    try {
      const url = await generateImage(prompt);
      setGeneratedImages(prev => ({ ...prev, [amenityName]: url }));
    } catch (err) {
      console.error(err);
      alert("Failed to visualize amenity.");
    } finally {
      setLoadingImages(prev => ({ ...prev, [amenityName]: false }));
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#080c14]">
      {/* Modal */}
      {selectedSuite && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={closeModal}></div>
          <div className="relative w-full max-w-5xl h-[90vh] bg-[#0B0F19] rounded-3xl border border-white/10 overflow-y-auto custom-scrollbar shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            
            {/* Close Btn */}
            <button onClick={closeModal} className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md">
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Hero Header */}
            <div className="relative h-[40vh]">
              <img src={selectedSuite.image} className="w-full h-full object-cover" alt={selectedSuite.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-2">
                   <selectedSuite.icon className={`w-6 h-6 ${selectedSuite.color}`} />
                   <span className="text-white font-bold uppercase tracking-widest text-sm">{selectedSuite.subtitle}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2">{selectedSuite.title}</h2>
                <p className="text-xl text-brand-gold font-serif">{selectedSuite.price}</p>
              </div>
            </div>

            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Left Column: Description & Video */}
               <div className="lg:col-span-7 space-y-12">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-brand-gold" /> Sanctuary Experience (庇护所体验)
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {selectedSuite.description} Experience the pinnacle of 7-star living where AI anticipates your needs before you do.
                    </p>
                  </div>

                  {/* Video Generator Section */}
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 relative group">
                    <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <Play className="w-4 h-4 text-brand-gold" />
                          <span className="text-xs font-bold uppercase tracking-widest text-white">Immersive Tour (沉浸式游览)</span>
                       </div>
                       {isGeneratingVideo && <span className="text-xs text-brand-gold animate-pulse">{videoStatus}</span>}
                    </div>
                    
                    <div className="aspect-video relative flex items-center justify-center bg-black">
                       {videoUrl ? (
                         <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
                       ) : (
                         <div className="absolute inset-0">
                            <img src={selectedSuite.image} className="w-full h-full object-cover opacity-40 blur-sm" />
                            <div className="absolute inset-0 flex items-center justify-center">
                               {isGeneratingVideo ? (
                                 <Loader2 className="w-12 h-12 text-brand-gold animate-spin" />
                               ) : (
                                 <button 
                                   onClick={handleGenerateTour}
                                   className="px-8 py-4 bg-white/10 hover:bg-brand-gold hover:text-black border border-white/20 backdrop-blur-md rounded-full font-bold uppercase tracking-widest transition-all flex items-center gap-3"
                                 >
                                   <Play className="w-5 h-5 fill-current" /> Generate Tour (AI 生成)
                                 </button>
                               )}
                            </div>
                         </div>
                       )}
                    </div>
                    <div className="p-4 text-xs text-slate-500 font-mono border-t border-white/5">
                       POWERED BY GOOGLE VEO • REAL-TIME RENDERING
                    </div>
                  </div>
               </div>

               {/* Right Column: 7-Star Amenities */}
               <div className="lg:col-span-5 space-y-8">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-6">7-Star Amenities (七星级设施)</h3>
                    <div className="space-y-6">
                      {selectedSuite.amenities.map((amenity, idx) => (
                        <div key={idx} className="bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-colors">
                           <div className="aspect-video relative bg-black">
                              {generatedImages[amenity.name] ? (
                                <img src={generatedImages[amenity.name]} className="w-full h-full object-cover" />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                   {loadingImages[amenity.name] ? (
                                     <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
                                   ) : (
                                     <button 
                                       onClick={() => handleGenerateAmenity(amenity.name, amenity.prompt)}
                                       className="flex flex-col items-center gap-2 text-slate-500 hover:text-brand-gold transition-colors"
                                     >
                                        <ImageIcon className="w-8 h-8" />
                                        <span className="text-[10px] font-bold uppercase">Visualize (可视化)</span>
                                     </button>
                                   )}
                                </div>
                              )}
                           </div>
                           <div className="p-4">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="text-white font-bold">{amenity.name}</h4>
                                <Expand className="w-4 h-4 text-slate-500" />
                              </div>
                              <p className="text-sm text-slate-400">{amenity.description}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/20">
                     <h4 className="text-brand-gold font-bold uppercase tracking-widest mb-2 text-sm">Priority Access</h4>
                     <p className="text-slate-300 text-sm mb-4">High demand for this suite. Secure your allocation now.</p>
                     <button className="w-full py-3 bg-brand-gold text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors shadow-lg">
                        Request Booking
                     </button>
                  </div>
               </div>
            </div>

          </div>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-purple/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-gold/5 blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
              <span className="text-brand-gold block text-lg font-sans tracking-[0.3em] mb-2">Exclusive Collection</span>
              The Sanctuary Series
            </h2>
            <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
              Designed for the global elite. Our modular units redefine luxury, offering sustainable super-structures and AI-integrated living across 4 distinct biomes.
            </p>
          </div>
          <button className="group flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            <span className="font-bold tracking-widest text-sm">View All Suites</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {SUITES.map((suite, index) => (
            <div 
              key={suite.id} 
              onClick={() => openModal(suite)}
              className={`
                group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 transition-all duration-700 
                hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-white/20
                ${index === 0 || index === 3 ? 'md:h-[600px]' : 'md:h-[500px]'}
              `}
            >
              {/* Image Layer */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src={suite.image} 
                alt={suite.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90 z-10"></div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                
                {/* Floating Top Tag */}
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <suite.icon className={`w-4 h-4 ${suite.color}`} />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">{suite.subtitle}</span>
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase">Signature Collection</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 drop-shadow-lg">{suite.title}</h3>
                  
                  <p className="text-slate-300 text-sm md:text-base mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500 max-w-md">
                    {suite.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {suite.features.map((f, i) => (
                      <span key={i} className="px-3 py-1 border border-white/20 bg-black/30 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-wider text-white/80">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-white/10 pt-6 opacity-80 group-hover:opacity-100 transition-opacity">
                     <span className="font-serif text-2xl text-white">{suite.price}</span>
                     <button className="flex items-center gap-2 text-brand-gold text-xs uppercase font-bold tracking-widest group-hover:text-white transition-colors">
                        View 7-Star Details <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
        
        {/* Amenities Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { text: '24/7 AI Butler', icon: Shield },
             { text: 'Michelin Dining', icon: Coffee },
             { text: 'Private Helipad', icon: Wind },
             { text: 'Bio-Hack Spa', icon: Wifi }
           ].map((item, idx) => (
             <div key={idx} className="flex items-center justify-center gap-3 p-4 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-default">
                <item.icon className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
                <span className="text-xs md:text-sm font-bold tracking-widest text-slate-300 uppercase">{item.text}</span>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default LuxuryGallery;
