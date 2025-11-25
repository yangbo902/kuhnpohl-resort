import React, { useState, useRef, useEffect } from 'react';
import { ZoneType, ModuleUnit } from '../types';
import { TreeDeciduous, Waves, Sun, Mountain, RotateCw, MousePointer2, Compass, X, Thermometer, Zap, Wifi, Activity, Droplets, Wind, Tent, Castle, Music, FerrisWheel, Ticket, Utensils, HeartPulse, Shirt, Sparkles, Box } from 'lucide-react';

// Helper to generate random coords in a quadrant circle wedge
const getRandomInQuadrant = (quadrantIdx: number, minR: number, maxR: number) => {
  // Quadrants: 0=TL(Forest), 1=TR(Mountain), 2=BL(Lake), 3=BR(Desert)
  const angleBase = quadrantIdx * 90; 
  const angleRand = Math.random() * 90;
  const angleRad = (angleBase + angleRand) * (Math.PI / 180);
  
  const dist = minR + Math.random() * (maxR - minR);
  
  // Convert to Cartesian offset
  let startAngle = 0;
  switch(quadrantIdx) {
    case 0: startAngle = Math.PI; break; // TL
    case 1: startAngle = 1.5 * Math.PI; break; // TR
    case 2: startAngle = 0.5 * Math.PI; break; // BL
    case 3: startAngle = 0; break; // BR
  }
  
  const finalAngle = startAngle + Math.random() * (0.5 * Math.PI);
  
  const x = 50 + dist * Math.cos(finalAngle);
  const y = 50 + dist * Math.sin(finalAngle);
  
  return { x, y };
};

const GENERATE_MODULES = (): ModuleUnit[] => {
  const modules: ModuleUnit[] = [];
  let idCounter = 1;
  
  // Order matches quadrant switch above: Forest, Mountain, Lake, Desert
  const zoneOrder = [ZoneType.FOREST, ZoneType.MOUNTAIN, ZoneType.LAKE, ZoneType.DESERT];
  
  zoneOrder.forEach((zone, idx) => {
    // Increased to 25 per zone for 100 total units
    for (let i = 0; i < 25; i++) {
      const pos = getRandomInQuadrant(idx, 22, 48); // Adjusted radius for better spread around landmarks
      modules.push({
        id: idCounter++,
        zone: zone,
        status: Math.random() > 0.85 ? 'occupied' : Math.random() > 0.95 ? 'maintenance' : 'available',
        x: pos.x, 
        y: pos.y
      });
    }
  });
  return modules;
};

const MODULES = GENERATE_MODULES();

interface Landmark {
  id: string;
  name: string;
  x: number;
  y: number;
  icon: React.ElementType;
  zone: ZoneType;
  description: string;
  subDescription: string;
}

const LANDMARKS: Landmark[] = [
  { 
    id: 'L1', 
    name: "L'Étoile Sauvage (野性之星)", 
    x: 25, 
    y: 25, 
    icon: Utensils, 
    zone: ZoneType.FOREST, 
    description: 'Michelin Dining (米其林餐饮)',
    subDescription: 'Disney-grade service & Global Buffet'
  },
  { 
    id: 'L2', 
    name: 'Lumina Carnival (光影嘉年华)', 
    x: 75, 
    y: 25, 
    icon: Zap, 
    zone: ZoneType.MOUNTAIN, 
    description: 'Laser Shows & Parades',
    subDescription: 'Nightlife District (夜生活区)'
  },
  { 
    id: 'L3', 
    name: 'Guest Haven (宾客避风港)', 
    x: 25, 
    y: 75, 
    icon: HeartPulse, 
    zone: ZoneType.LAKE, 
    description: 'Wellness Center (健康中心)',
    subDescription: 'Free Laundry & 24h Pharmacy'
  },
  { 
    id: 'L4', 
    name: 'Nebula Amphitheater (星云剧场)', 
    x: 75, 
    y: 75, 
    icon: Music, 
    zone: ZoneType.DESERT, 
    description: 'Global Arts Stage (艺术舞台)',
    subDescription: 'World Class Performances'
  },
];

const ZoneTheme = {
  [ZoneType.FOREST]: { color: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]', icon: TreeDeciduous },
  [ZoneType.LAKE]: { color: 'text-cyan-400', bg: 'bg-cyan-500', border: 'border-cyan-500', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.6)]', icon: Waves },
  [ZoneType.DESERT]: { color: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.6)]', icon: Sun },
  [ZoneType.MOUNTAIN]: { color: 'text-indigo-400', bg: 'bg-indigo-500', border: 'border-indigo-500', glow: 'shadow-[0_0_15px_rgba(99,102,241,0.6)]', icon: Mountain },
};

// --- 3D PREVIEW COMPONENT ---
const UnitPreview3D = ({ zone }: { zone: ZoneType }) => {
  const [rotation, setRotation] = useState({ x: -15, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto rotate when not dragging
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (!isDragging) {
        setRotation(prev => ({ ...prev, y: (prev.y + 0.5) % 360 }));
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY)),
      y: prev.y + deltaX
    }));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Face styles based on zone
  const getFaceStyle = (face: string) => {
    let baseStyle = "absolute w-24 h-24 border border-white/20 backface-visible flex items-center justify-center opacity-90 transition-all duration-500";
    let specificStyle = "";

    switch(zone) {
      case ZoneType.FOREST:
        specificStyle = "bg-emerald-900/80 border-emerald-500/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.2)]";
        break;
      case ZoneType.LAKE:
        specificStyle = "bg-cyan-900/60 border-cyan-400/40 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(34,211,238,0.2)]";
        break;
      case ZoneType.DESERT:
        specificStyle = "bg-amber-900/80 border-amber-500/40 shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]";
        break;
      case ZoneType.MOUNTAIN:
        specificStyle = "bg-indigo-950/90 border-indigo-500/40 shadow-[inset_0_0_20px_rgba(99,102,241,0.2)]";
        break;
    }
    
    return `${baseStyle} ${specificStyle}`;
  };

  return (
    <div 
      className="w-full h-48 bg-black/40 rounded-xl mb-4 relative overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center border border-white/5"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={containerRef}
    >
      <div className="absolute top-3 left-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest pointer-events-none">
        3D Model Preview
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] text-slate-500 flex items-center gap-1 pointer-events-none animate-pulse">
        <MousePointer2 className="w-3 h-3" /> Rotate
      </div>

      {/* 3D Scene */}
      <div style={{ perspective: '600px' }}>
        <div 
          className="w-24 h-24 relative preserve-3d transition-transform duration-75 ease-linear"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          {/* Cube Faces */}
          <div className={getFaceStyle('front')} style={{ transform: 'translateZ(48px)' }}>
             <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center">
               <Box className="w-8 h-8 text-white/50" />
             </div>
          </div>
          <div className={getFaceStyle('back')} style={{ transform: 'rotateY(180deg) translateZ(48px)' }}></div>
          <div className={getFaceStyle('left')} style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}></div>
          <div className={getFaceStyle('right')} style={{ transform: 'rotateY(90deg) translateZ(48px)' }}></div>
          <div className={getFaceStyle('top')} style={{ transform: 'rotateX(90deg) translateZ(48px)' }}>
             {/* Roof detail */}
             <div className="w-full h-full bg-white/5"></div>
          </div>
          <div className={getFaceStyle('bottom')} style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}></div>
          
          {/* Internal Glow Core */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 blur-xl rounded-full ${ZoneTheme[zone].bg} opacity-50`}></div>
        </div>
      </div>
    </div>
  );
};


interface CampsiteMapProps {
  onBook: (unitId: string) => void;
}

const CampsiteMap: React.FC<CampsiteMapProps> = ({ onBook }) => {
  const [rotation, setRotation] = useState({ x: 60, z: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [hoveredUnit, setHoveredUnit] = useState<ModuleUnit | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<ModuleUnit | null>(null);
  const [hoveredLandmark, setHoveredLandmark] = useState<Landmark | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Scroll/Zoom (Passive: false required to prevent default scroll)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      setZoom(prevZoom => {
        // Standardize wheel delta
        const delta = e.deltaY;
        const zoomFactor = 0.001;
        const newZoom = prevZoom - (delta * zoomFactor);
        
        // Clamp zoom between 0.5 (50%) and 2.5 (250%)
        return Math.min(Math.max(0.5, newZoom), 2.5);
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    let interval: number;
    if (autoRotate && !isDragging && !hoveredUnit && !selectedUnit && !hoveredLandmark) {
      interval = window.setInterval(() => {
        setRotation(prev => ({ ...prev, z: (prev.z + 0.05) % 360 }));
      }, 16);
    }
    return () => clearInterval(interval);
  }, [autoRotate, isDragging, hoveredUnit, selectedUnit, hoveredLandmark]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setLastMouse({ x: clientX, y: clientY });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const deltaX = clientX - lastMouse.x;
    const deltaY = clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: Math.min(80, Math.max(10, prev.x - deltaY * 0.5)), // Clamp tilt
      z: prev.z + deltaX * 0.5
    }));
    
    setLastMouse({ x: clientX, y: clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleUnitClick = (e: React.MouseEvent, unit: ModuleUnit) => {
    e.stopPropagation();
    setSelectedUnit(unit);
    setAutoRotate(false);
  };

  const closePanel = () => {
    setSelectedUnit(null);
    setAutoRotate(true);
  };

  const handleReset = () => {
    setRotation({ x: 60, z: 0 });
    setZoom(1);
    setAutoRotate(true);
    setSelectedUnit(null);
  };

  return (
    <div className="py-24 container mx-auto px-4 relative z-10 perspective-container" onMouseLeave={handleMouseUp}>
      <div className="text-center mb-8 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/20 border border-brand-purple/50 mb-4 backdrop-blur-sm">
           <Castle className="w-4 h-4 text-brand-purple" />
           <span className="text-xs font-bold text-brand-purple uppercase tracking-widest">Interactive Resort Map (交互式地图)</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-2xl flex items-center justify-center gap-4">
          <span className="text-brand-gold">Resort</span> Masterplan
        </h2>
        <div className="flex items-center justify-center gap-2 text-brand-gold/60 text-xs tracking-[0.3em] uppercase font-mono">
           <MousePointer2 className="w-4 h-4" /> Drag to Rotate (拖动旋转) • Scroll to Zoom (缩放)
        </div>
      </div>

      {/* 3D Viewport Container */}
      <div 
        className="relative w-full h-[600px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl cursor-move touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        ref={containerRef}
        style={{ perspective: '1200px' }}
      >
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/kuhnpohl-background.jpeg')`,
            filter: 'brightness(0.4) contrast(1.2) saturate(0.9)',
          }}
        >
          {/* Overlay gradients for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%)]"></div>
        </div>
        {/* Info Panel Overlay */}
        {selectedUnit && (
          <div className="absolute top-4 right-4 md:top-8 md:right-8 w-80 bg-[#0B0F19]/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-50 animate-in fade-in slide-in-from-right duration-300 cursor-default" onMouseDown={(e) => e.stopPropagation()}>
            {/* Header with Zone Color */}
            <div className={`h-1 w-full ${ZoneTheme[selectedUnit.zone].bg}`}></div>
            
            <div className="p-6 relative">
              {/* Background Tech Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-brand-gold animate-pulse" />
                    <span className="text-[10px] font-mono text-brand-gold">SYSTEM ONLINE</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white">Unit {selectedUnit.id.toString().padStart(3, '0')}</h3>
                  <p className={`text-xs font-bold tracking-widest uppercase ${ZoneTheme[selectedUnit.zone].color}`}>{selectedUnit.zone}</p>
                </div>
                <button onClick={closePanel} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                  <X className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </button>
              </div>

              {/* NEW: 3D Model Preview */}
              <div className="relative z-10">
                 <UnitPreview3D zone={selectedUnit.zone} />
              </div>

              {/* Status & Coords */}
              <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Status (状态)</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${selectedUnit.status === 'available' ? 'bg-emerald-500 animate-pulse' : selectedUnit.status === 'occupied' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                      <span className="text-sm text-white capitalize">
                        {selectedUnit.status}
                      </span>
                    </div>
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Grid (网格)</p>
                    <span className="text-sm text-white font-mono">{Math.round(selectedUnit.x)}:{Math.round(selectedUnit.y)}</span>
                </div>
              </div>

              {/* Telemetry (Fake) */}
              <div className="space-y-3 mb-6 relative z-10">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">Module Telemetry</p>
                
                <div className="flex items-center justify-between text-sm text-slate-300 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2"><Thermometer className="w-3 h-3 text-slate-500"/> Internal Temp</div>
                  <span className="font-mono text-brand-gold">22°C</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2"><Droplets className="w-3 h-3 text-slate-500"/> Humidity</div>
                  <span className="font-mono text-brand-gold">45%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2"><Wind className="w-3 h-3 text-slate-500"/> Air Quality</div>
                  <span className="font-mono text-emerald-400">Good (AQI 15)</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2"><Zap className="w-3 h-3 text-slate-500"/> Power Load</div>
                  <span className="font-mono">0.8 kW</span>
                </div>
                 <div className="flex items-center justify-between text-sm text-slate-300 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2"><Wifi className="w-3 h-3 text-slate-500"/> Network</div>
                  <span className="font-mono text-emerald-400">5G Connected</span>
                </div>
              </div>
              
              <button 
                onClick={() => onBook(`Unit ${selectedUnit.id} - ${selectedUnit.zone}`)}
                disabled={selectedUnit.status !== 'available'}
                className={`w-full py-4 font-bold uppercase tracking-widest text-xs rounded-lg transition-all shadow-lg relative z-10 ${selectedUnit.status === 'available' ? 'bg-brand-gold text-black hover:bg-white hover:shadow-brand-gold/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'}`}
              >
                {selectedUnit.status === 'available' ? 'Book Unit (预订单元)' : 'Unit Unavailable (不可用)'}
              </button>

            </div>
          </div>
        )}

        {/* Grid Background Enhancement (Static) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* The 3D World */}
        <div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] preserve-3d transition-transform duration-75 ease-out"
          style={{
            transform: `translate(-50%, -50%) rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg) scale(${zoom})`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Base Plate */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-gold/20 bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(255,215,0,0.1)]">
            {/* Concentric Rings */}
            <div className="absolute inset-[10%] rounded-full border border-dashed border-white/10"></div>
            <div className="absolute inset-[30%] rounded-full border border-white/5"></div>
            <div className="absolute inset-[60%] rounded-full border border-white/5"></div>
            
            {/* Crosshairs */}
            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-white/5"></div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
            
            {/* Quadrant Labels - Enhanced for readability */}
            <div className="absolute top-[20%] left-[20%] px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-emerald-400 font-bold tracking-widest text-lg font-serif select-none rotate-[-45deg] shadow-lg z-10 hover:bg-black/60 transition-colors">Forest (森林)</div>
            <div className="absolute top-[20%] right-[20%] px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-indigo-400 font-bold tracking-widest text-lg font-serif select-none rotate-[45deg] shadow-lg z-10 hover:bg-black/60 transition-colors">Mountain (高山)</div>
            <div className="absolute bottom-[20%] left-[20%] px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-cyan-400 font-bold tracking-widest text-lg font-serif select-none rotate-[-135deg] shadow-lg z-10 hover:bg-black/60 transition-colors">Lake (湖畔)</div>
            <div className="absolute bottom-[20%] right-[20%] px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-amber-400 font-bold tracking-widest text-lg font-serif select-none rotate-[135deg] shadow-lg z-10 hover:bg-black/60 transition-colors">Desert (沙丘)</div>
          </div>

          {/* Central Hub - Iconic Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 preserve-3d">
             {/* Logo Base Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-gold rounded-full blur-[60px] opacity-30 animate-pulse"></div>
             
             {/* The Physical Logo Object */}
             <div className="w-36 h-36 bg-black/90 rounded-full border-[6px] border-brand-gold shadow-[0_0_80px_rgba(255,215,0,0.5)] flex items-center justify-center relative z-20 group transform hover:scale-110 transition-transform duration-500">
                {/* Animated Rings */}
                <div className="absolute inset-[-20px] border-2 border-dashed border-brand-gold/40 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-[-10px] border border-brand-gold/20 rounded-full animate-reverse-spin"></div>
                
                {/* Center Emblem */}
                <div className="flex flex-col items-center justify-center relative z-30">
                   <Tent className="w-12 h-12 text-brand-gold fill-brand-gold/20" />
                   <span className="text-brand-gold font-serif font-black text-4xl leading-none mt-[-5px]">KP</span>
                   <span className="text-[6px] text-brand-gold uppercase tracking-[0.3em] mt-1">Resort</span>
                </div>
             </div>
             
             {/* Floating Label above logo */}
             <div 
               className="absolute top-[-140px] left-1/2 -translate-x-1/2 text-center w-80 pointer-events-none"
               style={{ transform: `rotateZ(${-rotation.z}deg) rotateX(${-rotation.x}deg)` }}
             >
               <div className="flex justify-center mb-2">
                  <div className="px-4 py-1 bg-brand-gold text-black text-[10px] font-bold uppercase rounded-full tracking-widest shadow-[0_0_20px_#FFD700] border border-white/20">
                    Central Plaza (中央广场)
                  </div>
               </div>
               <h1 className="font-serif font-black text-3xl text-white drop-shadow-lg leading-tight">
                 KUHNPOHL
               </h1>
               <div className="text-[9px] text-brand-gold tracking-[0.5em] uppercase mb-2">The World Center</div>
               <div className="w-[1px] h-[40px] bg-gradient-to-b from-brand-gold to-transparent mx-auto"></div>
             </div>
          </div>

          {/* Render Major Landmarks (Connected to Specific Services) */}
          {LANDMARKS.map((lm) => {
             const isHovered = hoveredLandmark?.id === lm.id;
             const theme = ZoneTheme[lm.zone];
             return (
              <div
                key={lm.id}
                className="absolute preserve-3d group cursor-pointer"
                style={{ top: `${lm.y}%`, left: `${lm.x}%` }}
                onMouseEnter={() => setHoveredLandmark(lm)}
                onMouseLeave={() => setHoveredLandmark(null)}
              >
                {/* Floor Shadow */}
                <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full ${theme.bg} blur-[40px] opacity-20 transition-all duration-500 ${isHovered ? 'opacity-60 scale-150' : ''}`}></div>

                {/* Billboarded Landmark Icon */}
                <div 
                  className="absolute -translate-x-1/2 -translate-y-1/2 origin-bottom transition-transform duration-300 ease-out"
                  style={{ 
                    transform: `rotateZ(${-rotation.z}deg) rotateX(${-rotation.x}deg) scale(${isHovered ? 1.2 : 1}) translateZ(${isHovered ? 30 : 0}px)` 
                  }}
                >
                  <div className="flex flex-col items-center">
                    {/* Tooltip */}
                    <div className={`absolute bottom-full mb-4 whitespace-nowrap transition-all duration-300 z-50 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                      <div className="bg-black/90 border border-white/20 p-4 rounded-xl backdrop-blur-xl shadow-2xl text-center min-w-[180px]">
                        <div className="flex items-center gap-2 justify-center text-brand-gold mb-2">
                           <Sparkles className="w-3 h-3" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Landmark (地标)</span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-white leading-tight">{lm.name}</h4>
                        <p className="text-xs text-brand-gold font-bold uppercase mt-1">{lm.description}</p>
                        <div className="h-[1px] w-full bg-white/10 my-2"></div>
                        <p className="text-[10px] text-slate-400">{lm.subDescription}</p>
                      </div>
                      <div className="w-[1px] h-6 bg-brand-gold/50 mx-auto"></div>
                    </div>

                    {/* Icon Container */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${theme.bg.replace('bg-', 'from-')} to-black border-2 ${theme.border} flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden`}>
                       <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                       <lm.icon className={`w-10 h-10 text-white drop-shadow-lg relative z-10`} />
                    </div>
                    
                    {/* Pedestal */}
                    <div className="w-2 h-10 bg-white/10 mx-auto backdrop-blur-sm border-x border-white/10"></div>
                  </div>
                </div>
              </div>
             );
          })}

          {/* Render 100 Modules */}
          {MODULES.map((mod) => {
            const theme = ZoneTheme[mod.zone];
            const isHovered = hoveredUnit?.id === mod.id;
            const isSelected = selectedUnit?.id === mod.id;
            
            return (
              <div
                key={mod.id}
                className="absolute preserve-3d group cursor-pointer"
                style={{ 
                  top: `${mod.y}%`, 
                  left: `${mod.x}%`,
                  zIndex: isHovered || isSelected ? 1000 : 1 // Ensure hovered elements stay on top
                }}
                onMouseEnter={() => setHoveredUnit(mod)}
                onMouseLeave={() => setHoveredUnit(null)}
                onClick={(e) => handleUnitClick(e, mod)}
              >
                {/* Floor Shadow */}
                <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black blur-sm opacity-50 transition-transform ${isHovered || isSelected ? 'scale-150' : 'scale-100'}`}></div>
                
                {/* Selection Reticle (Ground Level) */}
                {isSelected && (
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-brand-gold rounded-full animate-ping opacity-40 pointer-events-none"></div>
                )}

                {/* The Marker (Billboarded to always face camera) */}
                <div 
                  className="absolute -translate-x-1/2 -translate-y-1/2 origin-bottom transition-transform duration-300 ease-out"
                  style={{ 
                    transform: `rotateZ(${-rotation.z}deg) rotateX(${-rotation.x}deg) scale(${isHovered || isSelected ? 1.5 : 1}) translateZ(${isHovered || isSelected ? 50 : 0}px)` 
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Tooltip Overlay (Only visible on hover AND not selected) */}
                    <div className={`absolute bottom-full mb-3 whitespace-nowrap transition-all duration-200 z-50 ${isHovered && !isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                      <div className="bg-slate-900/60 border border-slate-500/50 p-3 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] text-center min-w-[120px]">
                        <p className={`text-xs font-bold ${theme.color} uppercase tracking-wider mb-1`}>{mod.zone}</p>
                        <p className="text-white font-bold text-sm shadow-black drop-shadow-md">Unit {mod.id}</p>
                        <p className={`text-[10px] uppercase ${mod.status === 'available' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {mod.status}
                        </p>
                      </div>
                      {/* Connector Line */}
                      <div className="w-[1px] h-4 bg-white/40 mx-auto"></div>
                    </div>

                    {/* Marker Body */}
                    <div className={`
                      w-3 h-8 rounded-full bg-gradient-to-t from-white/10 to-${theme.color.split('-')[1]}-500
                      border border-white/20 backdrop-blur-sm relative
                      ${mod.status === 'occupied' ? 'grayscale opacity-50' : 'animate-pulse'}
                      ${isSelected ? 'border-brand-gold shadow-[0_0_15px_rgba(255,215,0,0.6)]' : ''}
                    `}>
                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] ${isSelected ? 'bg-brand-gold' : ''}`}></div>
                    </div>
                    
                    {/* Base Glow */}
                    <div className={`w-6 h-1 ${theme.bg} blur-md mt-[-2px] ${isSelected ? 'bg-brand-gold opacity-100' : ''}`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overlay Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
           <button 
             onClick={handleReset}
             className="w-12 h-12 bg-slate-800/80 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-all shadow-lg"
             title="Reset View"
           >
             <RotateCw className="w-5 h-5" />
           </button>
        </div>

        <div className="absolute bottom-6 left-6 pointer-events-none z-20">
          <div className="flex items-center gap-2 text-white/30 font-mono text-xs">
             <Compass className="w-4 h-4" />
             <span>Pitch: {Math.round(rotation.x)}° / Yaw: {Math.round(rotation.z % 360)}°</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CampsiteMap;
