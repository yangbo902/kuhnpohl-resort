import React, { useState, useEffect } from 'react';
import { Rocket, Moon, Orbit, Star, ArrowRight, Crosshair, Play, Loader2, Activity, Radio, Zap } from 'lucide-react';
import { generateCampVideo, checkApiKey, promptApiKeySelect, urlToBase64 } from '../services/geminiService';

const SPACESHIP_INTERIOR = "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1918&auto=format&fit=crop";

const GalacticJourney: React.FC = () => {
  const [missionStatus, setMissionStatus] = useState<'standby' | 'initializing' | 'orbit'>('standby');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  
  // HUD Data Simulation
  const [altitude, setAltitude] = useState(384400);
  const [velocity, setVelocity] = useState(0);
  
  useEffect(() => {
    let interval: number;
    if (missionStatus === 'orbit') {
      interval = window.setInterval(() => {
        setAltitude(prev => Math.max(0, prev - 1250));
        setVelocity(prev => Math.min(28000, prev + 150));
      }, 100);
    } else {
      setAltitude(384400);
      setVelocity(0);
    }
    return () => clearInterval(interval);
  }, [missionStatus]);

  const handleLaunchMission = async () => {
    const hasKey = await checkApiKey();
    if (!hasKey) {
      await promptApiKeySelect();
      return;
    }

    setMissionStatus('initializing');
    setLoadingMessage("System Check: Life Support... (系统检查：生命支持)");

    try {
      // Use a base image for the start of the video to ensure consistency
      const { base64, mimeType } = await urlToBase64(SPACESHIP_INTERIOR);
      
      const prompt = "Cinematic first-person cockpit view from a spacecraft approaching the Moon surface, hyper-realistic, 8k, detailed craters, starfield background, sci-fi atmosphere, slow camera push forward.";
      
      const generatedUrl = await generateCampVideo(prompt, base64, mimeType, setLoadingMessage);
      setVideoUrl(generatedUrl);
      setMissionStatus('orbit');
    } catch (error) {
      console.error("Mission Abort:", error);
      setMissionStatus('standby');
      alert("Mission Aborted: Simulation Failed.");
    }
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden border-t border-white/10">
      {/* Animated Starfield Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020408] to-black"></div>
         <div className="w-full h-full opacity-40" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 mb-6 backdrop-blur-md animate-pulse">
             <Rocket className="w-4 h-4 text-blue-400" />
             <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">World Class Carnival</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-black text-white mb-4 drop-shadow-[0_0_35px_rgba(59,130,246,0.5)]">
            ODYSSEY: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">LUNA</span>
          </h2>
          <h3 className="text-2xl md:text-3xl font-light text-slate-400 tracking-[0.5em] uppercase mb-8">
            Lunar Odyssey (月球奥德赛)
          </h3>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Experience the impossible. KUHNPOHL partners with aerospace pioneers to present a hyper-realistic lunar simulation. 
            A once-in-a-lifetime journey beyond the stratosphere, right here on Earth.
            <br/>
            <span className="text-slate-500 text-sm mt-2 block">联手航空先驱，打造一生一次的超拟真登月体验。</span>
          </p>
        </div>

        {/* Main Feature: The Moonshot Simulator */}
        <div className="relative rounded-[3rem] overflow-hidden border border-blue-500/30 shadow-[0_0_100px_rgba(37,99,235,0.15)] bg-[#050505]">
           
           {/* Grid Background */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>

           <div className="relative p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left: Mission Brief */}
              <div className="lg:col-span-5 space-y-8 relative z-20">
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Orbit className="w-6 h-6 text-blue-400 animate-spin-slow" />
                      <span className="text-blue-400 font-mono text-xs tracking-widest">MISSION: APOLLO TRIBUTE</span>
                    </div>
                    <h3 className="text-4xl font-serif text-white font-bold mb-2">Fly Me to the Moon</h3>
                    <h4 className="text-2xl text-slate-300 font-serif mb-6">Zero Gravity Experience (零重力体验)</h4>
                    <p className="text-slate-400 text-lg leading-relaxed mb-4">
                      Strap into our centrifuge-powered shuttle simulator. Feel the G-force of launch, experience 3 minutes of true weightlessness, and walk on a meticulously recreated lunar surface.
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-500/30 backdrop-blur-md">
                       <div className="text-3xl font-bold text-white mb-1 font-mono">4G</div>
                       <div className="text-xs text-blue-300 uppercase tracking-wider">Launch Gravity</div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-500/30 backdrop-blur-md">
                       <div className="text-3xl font-bold text-white mb-1 font-mono">1/6</div>
                       <div className="text-xs text-blue-300 uppercase tracking-wider">Lunar Pull</div>
                    </div>
                 </div>
                 
                 {/* Status Indicator */}
                 <div className="flex items-center gap-4 p-4 bg-black/40 rounded-lg border border-white/10">
                    <div className={`w-3 h-3 rounded-full ${missionStatus === 'orbit' ? 'bg-green-500 animate-pulse' : missionStatus === 'initializing' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <div className="text-xs font-mono text-blue-400">
                       STATUS: {missionStatus === 'orbit' ? 'ORBITAL INSERTION ACTIVE' : missionStatus === 'initializing' ? 'PRE-FLIGHT SEQUENCE' : 'STANDBY FOR LAUNCH'}
                    </div>
                 </div>
              </div>

              {/* Right: The Interactive Simulator Viewport */}
              <div className="lg:col-span-7 relative">
                 <div className="relative aspect-video bg-black rounded-2xl border-4 border-slate-800 overflow-hidden shadow-2xl group/viewport">
                    
                    {/* Viewport Content */}
                    {videoUrl && missionStatus === 'orbit' ? (
                       <video src={videoUrl} autoPlay loop className="w-full h-full object-cover" />
                    ) : (
                       <div className="absolute inset-0 bg-black">
                          {missionStatus === 'initializing' ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                               <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                               <p className="text-blue-400 font-mono text-sm animate-pulse">{loadingMessage}</p>
                               
                               {/* Mock loading data */}
                               <div className="mt-8 w-64 space-y-2 font-mono text-[10px] text-slate-600">
                                  <div className="flex justify-between"><span>TRAJECTORY</span><span className="text-green-500">CALCULATING...</span></div>
                                  <div className="flex justify-between"><span>FUEL CELLS</span><span className="text-green-500">98% CHARGED</span></div>
                                  <div className="flex justify-between"><span>AI CORE</span><span className="text-green-500">ONLINE</span></div>
                               </div>
                            </div>
                          ) : (
                            <img src={SPACESHIP_INTERIOR} className="w-full h-full object-cover opacity-40 group-hover/viewport:opacity-60 transition-opacity duration-500" alt="Cockpit View" />
                          )}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_120%)]"></div>
                       </div>
                    )}

                    {/* HUD Overlay (Always visible for immersion) */}
                    <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                       {/* HUD Top */}
                       <div className="flex justify-between items-start">
                          <div className="text-blue-500/80 font-mono text-xs border-l-2 border-blue-500/50 pl-2">
                             <div>ALT: {altitude.toLocaleString()} KM</div>
                             <div>VEL: {velocity.toLocaleString()} KM/H</div>
                             <div>O2: 98.4%</div>
                          </div>
                          <div className="flex gap-1">
                             <div className="w-16 h-1 bg-blue-500/50"></div>
                             <div className="w-4 h-1 bg-blue-500/30"></div>
                             <div className="w-2 h-1 bg-blue-500/20"></div>
                          </div>
                          <div className="text-red-500/80 font-mono text-xs text-right border-r-2 border-red-500/50 pr-2">
                             <div>WARN: METEOR SHOWER</div>
                             <div>SHIELDS: ACTIVE</div>
                          </div>
                       </div>

                       {/* Center Reticle */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <Crosshair className="w-12 h-12 text-blue-500/30" />
                       </div>

                       {/* HUD Bottom */}
                       <div className="flex justify-between items-end">
                          <div className="flex gap-4 text-xs font-mono text-blue-400/60">
                             <div className="flex items-center gap-1"><Radio className="w-3 h-3" /> COMM: ON</div>
                             <div className="flex items-center gap-1"><Activity className="w-3 h-3" /> BIO: STABLE</div>
                          </div>
                          {missionStatus === 'standby' && (
                            <div className="animate-bounce text-blue-400 text-xs font-bold tracking-widest uppercase">
                               Press Start to Initiate
                            </div>
                          )}
                       </div>
                    </div>
                    
                    {/* Start Button Overlay */}
                    {missionStatus === 'standby' && (
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 hover:bg-black/20 transition-colors">
                          <button 
                            onClick={handleLaunchMission}
                            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase rounded-none skew-x-[-10deg] transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                          >
                             <div className="skew-x-[10deg] flex items-center gap-3">
                               <Play className="w-5 h-5 fill-current" />
                               <span>Launch Simulator (启动模拟器)</span>
                             </div>
                          </button>
                       </div>
                    )}

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-10 pointer-events-none animate-pulse"></div>
                 </div>

                 {/* Decorative Under-panel */}
                 <div className="mt-4 flex justify-between items-center px-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                       <Zap className="w-3 h-3 text-yellow-500" />
                       <span>POWER DRAW: 1.21 GW</span>
                    </div>
                    <div className="text-[10px] text-slate-600 uppercase tracking-widest">
                       Veo Sim Module v3.1
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </section>
  );
};

export default GalacticJourney;