import React, { useState } from 'react';
import { Play, Award, Globe, UserCheck, Star, Loader2, Wand2, RefreshCw } from 'lucide-react';
import { generateCampVideo, generateImage, checkApiKey, promptApiKeySelect, urlToBase64 } from '../services/geminiService';

const INITIAL_STAFF_PROFILES = [
  {
    id: 1,
    role: "Chief Sommelier (首席侍酒师)",
    name: "Alessandro Moretti",
    origin: "Tuscany, Italy",
    image: "https://kxzimg.pages.dev/v2/OayZHON.jpeg",
    description: "Master of vintage pairings with 15 years experience in Michelin-starred establishments. (年份酒搭配大师)",
    prompt: "Portrait of a distinguished Italian sommelier in a luxury wine cellar, holding a glass of red wine, wearing a tailored suit, warm professional smile, photorealistic, 8k, soft cinematic lighting."
  },
  {
    id: 2,
    role: "Executive Butler (行政管家)",
    name: "Isabelle Dubois",
    origin: "Lausanne, Switzerland",
    image: "https://kxzimg.pages.dev/v2/m39cUoN.jpeg",
    description: "Graduate of EHL. Specializing in hyper-personalized care and anticipation of needs. (EHL 酒店管理学院毕业生)",
    prompt: "Portrait of a prestigious Swiss executive butler, female, standing in an ultra-luxury hotel lobby in Lausanne, wearing a high-end tailored navy suit, impeccable grooming, warm and attentive smile, soft golden hour lighting, depth of field, photorealistic, 8k."
  },
  {
    id: 3,
    role: "Director of Banquets (宴会总监)",
    name: "Hans Weber",
    origin: "Vienna, Austria",
    image: "https://kxzimg.pages.dev/v2/WtFcomA.jpeg",
    description: "Curating royal-standard events and grand celebrations with precision. (策划皇家标准的活动)",
    prompt: "Portrait of a dignified Austrian banquet director, male, silver hair, wearing a formal tuxedo with a bowtie, standing in a grand Viennese ballroom with crystal chandeliers, professional and commanding presence, elegant atmosphere, sharp focus, photorealistic, 8k."
  }
];

const VIDEO_COVER_IMAGE = "https://images.unsplash.com/photo-1551632436-cbf8dd354ca8?q=80&w=2069&auto=format&fit=crop";

const EuropeanService: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoStatus, setVideoStatus] = useState("");
  const [staffProfiles, setStaffProfiles] = useState(INITIAL_STAFF_PROFILES);
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});

  const handleGenerateVideo = async () => {
    const hasKey = await checkApiKey();
    if (!hasKey) {
      await promptApiKeySelect();
      return;
    }

    setIsGeneratingVideo(true);
    setVideoStatus("Initializing AI Director (正在初始化 AI 导演)...");

    try {
      // Convert cover image to base64 for the start frame
      const { base64, mimeType } = await urlToBase64(VIDEO_COVER_IMAGE);
      
      const prompt = "Cinematic video of european luxury hotel staff serving guests in a nature resort, butler pouring champagne, elegant movement, high end hospitality, 4k, photorealistic, slow motion.";
      
      const url = await generateCampVideo(prompt, base64, mimeType, setVideoStatus);
      setVideoUrl(url);
    } catch (error) {
      console.error("Video generation failed", error);
      alert("Failed to generate video. Please check API quota.");
    } finally {
      setIsGeneratingVideo(false);
      setVideoStatus("");
    }
  };

  const handleGenerateImage = async (id: number, prompt: string) => {
    const hasKey = await checkApiKey();
    if (!hasKey) {
      await promptApiKeySelect();
      return;
    }

    setLoadingImages(prev => ({ ...prev, [id]: true }));

    try {
      const base64Image = await generateImage(prompt);
      setStaffProfiles(prev => prev.map(staff => 
        staff.id === id ? { ...staff, image: base64Image } : staff
      ));
    } catch (error) {
      console.error("Image generation failed", error);
      alert("Failed to generate image.");
    } finally {
      setLoadingImages(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-t from-brand-purple/10 to-transparent blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
             <div className="flex items-center gap-2 text-brand-gold mb-2">
               <Star className="w-4 h-4 fill-brand-gold animate-pulse" />
               <span className="text-xs font-bold tracking-[0.3em] uppercase">Gold Standard</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">
               The Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">Service</span>
             </h2>
             <h3 className="text-2xl font-serif text-slate-400 mt-2">European Royal Butler Team (欧式皇家管家)</h3>
          </div>
          <p className="text-slate-400 max-w-md text-sm md:text-base leading-relaxed border-l border-white/10 pl-6">
            Authentic European hospitality delivered by our hand-selected team of international experts. Experience Old World elegance, redefined for the New World.
          </p>
        </div>

        {/* Main Feature: Interactive AI Video Presentation */}
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl mb-20 group">
          <div className="aspect-video md:aspect-[21/9] relative flex items-center justify-center">
             
             {videoUrl ? (
               <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
             ) : (
               <>
                 <img 
                   src={VIDEO_COVER_IMAGE} 
                   alt="Service Team Video Cover" 
                   className="w-full h-full object-cover opacity-60"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80"></div>
                 
                 {/* Interactive Button Overlay */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    {isGeneratingVideo ? (
                      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-black/80 backdrop-blur-xl border border-brand-gold/30">
                         <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
                         <p className="text-brand-gold font-bold text-sm tracking-widest uppercase animate-pulse">{videoStatus}</p>
                         <p className="text-slate-500 text-xs">Creating new visual asset...</p>
                      </div>
                    ) : (
                      <button 
                        onClick={handleGenerateVideo}
                        className="group/btn flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-105"
                      >
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center group-hover/btn:bg-brand-gold group-hover/btn:border-brand-gold transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                           <Wand2 className="w-8 h-8 text-white group-hover/btn:text-black ml-1 fill-current" />
                        </div>
                        <div className="text-center">
                          <span className="px-3 py-1 bg-brand-purple text-white text-[10px] font-bold uppercase tracking-widest rounded-full animate-pulse mb-2 inline-block">AI Generated Content</span>
                          <h3 className="text-2xl font-serif text-white font-bold group-hover/btn:text-brand-gold transition-colors">Generate Service Preview (生成预览)</h3>
                        </div>
                      </button>
                    )}
                 </div>

                 <div className="absolute bottom-8 left-8 md:left-12 max-w-lg pointer-events-none">
                    <h3 className="text-3xl font-serif text-white font-bold mb-2 opacity-50">Meet the Team</h3>
                    <p className="text-slate-500 text-sm">Click to generate a unique video introduction.</p>
                 </div>
               </>
             )}
          </div>
        </div>

        {/* Staff Gallery with AI Image Generation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {staffProfiles.map((staff) => (
             <div key={staff.id} className="group bg-[#0B0F19] rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-300 hover:-translate-y-2 relative">
                <div className="h-80 relative overflow-hidden bg-black">
                   {loadingImages[staff.id] ? (
                     <div className="absolute inset-0 flex items-center justify-center bg-[#0B0F19] z-20">
                        <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
                     </div>
                   ) : (
                     <img src={staff.image} alt={staff.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none"></div>
                   
                   {/* Generate Persona Button */}
                   <button 
                     onClick={() => handleGenerateImage(staff.id, staff.prompt)}
                     className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-brand-gold hover:text-black transition-all duration-300 z-30"
                     title="Generate new persona with AI"
                     disabled={loadingImages[staff.id]}
                   >
                     <RefreshCw className={`w-4 h-4 ${loadingImages[staff.id] ? 'animate-spin' : ''}`} />
                   </button>

                   <div className="absolute bottom-4 left-4 pointer-events-none">
                      <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-1">{staff.role}</p>
                      <h4 className="text-xl text-white font-serif">{staff.name}</h4>
                   </div>
                </div>
                <div className="p-6 pt-2">
                   <div className="flex items-center gap-2 mb-4 text-slate-500 text-xs uppercase tracking-wide">
                      <Globe className="w-3 h-3" /> {staff.origin}
                   </div>
                   <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {staff.description}
                   </p>
                </div>
             </div>
           ))}
        </div>

        {/* Credentials Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-4 border border-white/5 rounded-xl bg-white/[0.02] flex flex-col items-center text-center hover:bg-white/[0.05] transition-colors">
              <Award className="w-8 h-8 text-brand-gold mb-3" />
              <h5 className="text-white font-bold text-sm uppercase">Swiss Trained</h5>
              <p className="text-slate-500 text-xs mt-1">EHL Certified</p>
           </div>
           <div className="p-4 border border-white/5 rounded-xl bg-white/[0.02] flex flex-col items-center text-center hover:bg-white/[0.05] transition-colors">
              <Globe className="w-8 h-8 text-brand-gold mb-3" />
              <h5 className="text-white font-bold text-sm uppercase">Polyglot</h5>
              <p className="text-slate-500 text-xs mt-1">EN / FR / DE / CN</p>
           </div>
           <div className="p-4 border border-white/5 rounded-xl bg-white/[0.02] flex flex-col items-center text-center hover:bg-white/[0.05] transition-colors">
              <UserCheck className="w-8 h-8 text-brand-gold mb-3" />
              <h5 className="text-white font-bold text-sm uppercase">1:3 Ratio</h5>
              <p className="text-slate-500 text-xs mt-1">Staff to Guest</p>
           </div>
           <div className="p-4 border border-white/5 rounded-xl bg-white/[0.02] flex flex-col items-center text-center hover:bg-white/[0.05] transition-colors">
              <Star className="w-8 h-8 text-brand-gold mb-3" />
              <h5 className="text-white font-bold text-sm uppercase">White Glove</h5>
              <p className="text-slate-500 text-xs mt-1">Royal Standard</p>
           </div>
        </div>

      </div>
    </section>
  );
};

export default EuropeanService;
