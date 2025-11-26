import React from 'react';
import { Castle, MapPin, Home } from 'lucide-react';

const MasterplanShowcase: React.FC = () => {
  return (
    <div className="py-24 container mx-auto px-4 relative z-10">
      {/* 标题部分 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/50 mb-4 backdrop-blur-sm">
          <Castle className="w-4 h-4 text-brand-gold" />
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            Resort Masterplan (度假村总体规划)
          </span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
          <span className="text-brand-gold">Kuhnpohl</span> Resort Layout
        </h2>
        
        <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Experience our meticulously designed resort featuring 100 luxury modules 
          surrounding iconic central pavilions.
          <br/>
          体验我们精心设计的度假村，100个豪华模块环绕标志性中央建筑群。
        </p>
      </div>

      {/* 图片展示区域 */}
      <div className="relative group">
        {/* 主图片容器 */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <img 
            src="https://kxzimg.pages.dev/v2/lSCNdEV.jpeg"
            alt="Kuhnpohl Resort Masterplan - Aerial View"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* 渐变遮罩（底部） */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
          
          {/* 信息标签 */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 z-10">
            <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-2">
              <Home className="w-4 h-4 text-brand-gold" />
              <span className="text-white text-sm font-semibold">100 Luxury Modules</span>
            </div>
            
            <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-2">
              <Castle className="w-4 h-4 text-brand-gold" />
              <span className="text-white text-sm font-semibold">Central Pavilions</span>
            </div>
            
            <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span className="text-white text-sm font-semibold">Bazhong, Sichuan</span>
            </div>
          </div>
        </div>

        {/* 特色说明 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4">
              <Castle className="w-6 h-6 text-brand-gold" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Central Hub</h3>
            <p className="text-slate-400 text-sm">
              Iconic tower and pavilions featuring restaurants, spa, and entertainment venues.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-brand-gold" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Private Modules</h3>
            <p className="text-slate-400 text-sm">
              100 individual luxury accommodations distributed across four themed zones.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-brand-gold" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Natural Setting</h3>
            <p className="text-slate-400 text-sm">
              Harmoniously integrated with mountains, forests, and pristine landscapes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterplanShowcase;
