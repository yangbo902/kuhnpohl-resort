import React, { useState, useRef, useEffect } from 'react';
import { generateCampVideo, fileToBase64, urlToBase64, checkApiKey, promptApiKeySelect } from '../services/geminiService';
import { Film, Loader2, Upload, Play, Sparkles, AlertCircle, Wand2, Aperture, CreditCard, ExternalLink } from 'lucide-react';

const PRESETS = [
  { id: 'p1', url: 'https://picsum.photos/seed/camp1/800/450', title: 'Lakeside Dawn (湖畔黎明)' },
  { id: 'p2', url: 'https://picsum.photos/seed/camp9/800/450', title: 'Mystic Forest (神秘森林)' },
  { id: 'p3', url: 'https://picsum.photos/seed/camp5/800/450', title: 'Dune Sunset (沙丘日落)' },
];

const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("Cinematic drone shot, golden hour, magical atmosphere, 4k resolution");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkApiKey().then(setHasKey);
  }, []);

  const handleApiKeySelect = async () => {
    await promptApiKeySelect();
    setTimeout(() => {
      checkApiKey().then(setHasKey);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setVideoUrl(null);
      setError(null);
    }
  };

  const handlePresetSelect = (url: string) => {
    setSelectedImage(url);
    setSelectedFile(null);
    setVideoUrl(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatusMessage("Initiating dream sequence (启动梦境序列)...");

    try {
      let base64 = "";
      let mimeType = "";

      if (selectedFile) {
        base64 = await fileToBase64(selectedFile);
        mimeType = selectedFile.type;
      } else if (selectedImage) {
        const result = await urlToBase64(selectedImage);
        base64 = result.base64;
        mimeType = result.mimeType;
      }

      const resultVideoUrl = await generateCampVideo(prompt, base64, mimeType, setStatusMessage);
      setVideoUrl(resultVideoUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setIsGenerating(false);
      setStatusMessage("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 mb-24 relative">
      {/* Section Header */}
      <div className="text-center mb-12">
         <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 flex items-center justify-center gap-4">
           <Wand2 className="text-brand-purple w-10 h-10 animate-bounce" />
           <span>Fantasy Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-gold">Studio</span></span>
         </h2>
         <p className="text-slate-400 tracking-widest uppercase text-sm mb-2">Powered by Google Veo AI</p>
         
         {/* Billing & Integration Info Link */}
         <a 
           href="https://ai.google.dev/pricing" 
           target="_blank" 
           rel="noreferrer"
           className="inline-flex items-center gap-2 text-[10px] text-brand-gold border border-brand-gold/30 px-3 py-1 rounded-full hover:bg-brand-gold hover:text-black transition-colors"
         >
           <CreditCard className="w-3 h-3" />
           <span>View AI Pricing & Quota (查看 AI 计费标准)</span>
           <ExternalLink className="w-3 h-3" />
         </a>
      </div>

      <div className="glass-panel rounded-[2rem] p-1 shadow-2xl overflow-hidden border border-white/10">
        <div className="bg-[#050505]/80 p-6 md:p-10 rounded-[1.8rem]">
          
          {!hasKey && (
            <div className="mb-8 bg-amber-900/20 border border-amber-600/30 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between backdrop-blur-sm gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/20 rounded-full animate-pulse">
                  <AlertCircle className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-amber-100 font-bold font-serif">Studio Access Required (需要授权)</h4>
                  <p className="text-amber-400/60 text-sm max-w-lg">
                    To generate real videos, you must connect your Google AI Studio account. Usage costs are billed to your Google Cloud project.
                    <br/>
                    (生成真实视频需要连接 Google 账户。费用将计入您的 Google Cloud 项目。)
                  </p>
                </div>
              </div>
              <button 
                onClick={handleApiKeySelect}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-full font-bold transition-all shadow-lg shadow-amber-900/50 whitespace-nowrap"
              >
                Connect Billing Key (连接计费密钥)
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Controls Panel */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* 1. Visual Source */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-purple">
                  <Aperture className="w-5 h-5" />
                  <span className="font-serif font-bold tracking-widest text-sm text-white">Source Material (素材来源)</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {PRESETS.map((preset) => (
                    <button 
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset.url)}
                      className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === preset.url && !selectedFile ? 'border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105 z-10' : 'border-white/5 opacity-60 hover:opacity-100 hover:border-white/20'}`}
                    >
                      <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-white">{preset.title}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border border-dashed rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group ${selectedImage ? 'border-white/20 bg-black/40' : 'border-white/10 hover:border-brand-purple/50 hover:bg-brand-purple/5'}`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  {selectedImage && selectedFile ? (
                     <div className="absolute inset-0 w-full h-full">
                       <img src={selectedImage} className="w-full h-full object-cover opacity-40" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="px-4 py-2 bg-black/60 rounded-full text-xs font-bold border border-white/20 backdrop-blur-md">Upload Active</span>
                       </div>
                     </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-500 mb-2 group-hover:text-brand-purple transition-colors" />
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider group-hover:text-white">Upload Custom Concept (上传概念图)</p>
                    </>
                  )}
                </div>
              </div>

              {/* 2. Prompt Director */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-purple">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-serif font-bold tracking-widest text-sm text-white">Director's Cut (导演剪辑版)</span>
                </div>
                <div className="relative">
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-slate-200 focus:ring-1 focus:ring-brand-purple focus:border-brand-purple/50 focus:outline-none resize-none leading-relaxed"
                    placeholder="Describe your magical scene..."
                  />
                  <div className="absolute bottom-3 right-3 text-[10px] text-slate-600 uppercase font-bold">AI Prompt</div>
                </div>
              </div>

              {/* Generate Button */}
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !selectedImage || !hasKey}
                className={`w-full py-5 rounded-xl font-serif font-bold text-lg tracking-widest flex items-center justify-center gap-3 transition-all duration-300 overflow-hidden relative group
                  ${isGenerating || !selectedImage || !hasKey ? 'bg-slate-800 text-slate-500 cursor-not-allowed grayscale' : 
                    'bg-gradient-to-r from-brand-purple to-indigo-600 text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:scale-[1.02]'
                  }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span className="animate-pulse">{statusMessage}</span>
                  </>
                ) : (
                  <>
                    <Film className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Generate Preview (生成预览)</span>
                  </>
                )}
                {!isGenerating && (selectedImage && hasKey) && <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>}
              </button>

              {error && (
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            {/* Viewport */}
            <div className="lg:col-span-7">
               <div className="h-full min-h-[400px] bg-black rounded-2xl border-2 border-white/10 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center group/viewport">
                 {/* Decorative UI corners */}
                 <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
                 <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
                 <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg"></div>
                 <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg"></div>
                 
                 {videoUrl ? (
                   <video 
                     src={videoUrl} 
                     controls 
                     autoPlay 
                     loop 
                     className="w-full h-full object-contain z-10"
                   />
                 ) : (
                   <>
                     {selectedImage && (
                       <div className="absolute inset-0 opacity-20 blur-sm scale-110 transition-transform duration-[10s] ease-linear group-hover/viewport:scale-100">
                         <img src={selectedImage} alt="Background" className="w-full h-full object-cover" />
                       </div>
                     )}
                     
                     <div className="relative z-10 text-center">
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${isGenerating ? 'border-brand-purple animate-spin-slow' : 'border-white/10 bg-white/5'}`}>
                          {isGenerating ? <Sparkles className="w-8 h-8 text-brand-purple animate-pulse" /> : <Play className="w-8 h-8 text-white/40 ml-1" />}
                        </div>
                        <h3 className="text-2xl font-serif text-white/80 tracking-widest mb-2">
                          {isGenerating ? 'Rendering Reality' : 'Viewport Standby'}
                        </h3>
                        <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.3em]">
                          {isGenerating ? 'Processing Neural Radiance Fields...' : 'Awaiting Input Sequence'}
                        </p>
                     </div>
                   </>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;