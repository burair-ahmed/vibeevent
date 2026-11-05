import { useEffect } from 'react';
import { X, Calendar, ArrowRight } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function ServiceDrawer() {
  const { activeService, closeServiceDrawer, setActiveModal } = useExperienceStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeService) {
        closeServiceDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeService, closeServiceDrawer]);

  if (!activeService) return null;

  const handleBookNow = () => {
    sound.playClick();
    closeServiceDrawer();
    setActiveModal('booking');
  };

  const heroImage = activeService.galleryImages?.[0] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';

  return (
    <aside
      aria-label="Service Details Drawer"
      className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-xl md:max-w-2xl bg-[#08090f]/98 border-l border-white/10 backdrop-blur-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
    >
      {/* 1. Full-Bleed Cinematic Hero Banner (Top) */}
      <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0 border-b border-white/10">
        <img
          src={heroImage}
          alt={activeService.title}
          className="w-full h-full object-cover scale-105"
        />
        {/* Deep dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/60 to-black/30" />

        {/* Top colored accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: activeService.accentColor }}
        />

        {/* Top Bar with Category Badge and Close Button */}
        <div className="absolute top-5 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/20">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeService.accentColor }}
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
              {activeService.category}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              closeServiceDrawer();
            }}
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Tagline floating on the hero banner */}
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-wide text-hero-shadow mb-1.5 leading-tight">
            {activeService.title}
          </h2>
          <p className="text-xs sm:text-sm text-amber-300/90 font-medium tracking-wide">
            {activeService.tagline}
          </p>
        </div>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7">
        {/* Key Metrics Strip (Large numbers) */}
        <div className="grid grid-cols-3 gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="font-cinzel text-2xl sm:text-3xl font-black text-zinc-100">
              {activeService.stats.completed}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
              Events Produced
            </div>
          </div>
          <div>
            <div className="font-cinzel text-2xl sm:text-3xl font-black text-emerald-400">
              {activeService.stats.satisfaction}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
              Satisfaction
            </div>
          </div>
          <div>
            <div className="font-cinzel text-base sm:text-lg font-black text-amber-400 truncate">
              {activeService.stats.avgCapacity}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
              Scale Capacity
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Overview & Vision
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
            {activeService.description}
          </p>
        </div>

        {/* Turnkey Inclusions with Color Left-Borders */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Turnkey Deliverables & Inclusions
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeService.features.map((feature, i) => (
              <div
                key={i}
                className="pl-3 py-2.5 rounded-r-xl glass-panel text-xs text-zinc-200 border-l-2 flex items-center"
                style={{ borderLeftColor: activeService.accentColor }}
              >
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Packages */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Curated Investment Tiers
          </div>
          <div className="space-y-3">
            {activeService.packages.map((pkg, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl glass-panel-gold border border-amber-500/20"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-zinc-100">{pkg.name}</span>
                  <span className="font-cinzel font-bold text-amber-400 text-sm">{pkg.price}</span>
                </div>
                <div className="text-[10px] text-zinc-400 mb-2 font-medium tracking-wide uppercase">{pkg.duration}</div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {pkg.deliverables}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Horizontal Filmstrip */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Experience Filmstrip
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {activeService.galleryImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="w-36 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10 group"
              >
                <img
                  src={imgUrl}
                  alt={`${activeService.title} shot ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Sticky Action Button (Full-width spanning) */}
      <div className="p-6 border-t border-white/10 glass-panel">
        <button
          onClick={handleBookNow}
          className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs tracking-[0.2em] uppercase shadow-2xl btn-glow-pulse hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Consult With Executive Producer</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </aside>
  );
}
