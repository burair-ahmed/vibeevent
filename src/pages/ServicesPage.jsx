import { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Calendar, Layers, ShieldCheck, Zap, Users, Award } from 'lucide-react';
import SubpageLayout from '../components/layout/SubpageLayout';
import { SERVICES_DATA } from '../data/servicesData';
import { useExperienceStore } from '../store/useExperienceStore';
import { sound } from '../utils/audioSystem';

export default function ServicesPage() {
  const { navigateTo, setViewMode, setActiveService, setBookingPrefill } = useExperienceStore();
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_DATA[0].id);

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const handleBookService = (service) => {
    sound.playClick();
    setBookingPrefill({
      eventType: service.title || service.shortTitle,
      tier: 'Signature Scope',
      notes: `Service Inquired: ${service.title}\nCategory: ${service.category}\nSelected starting package: ${service.packages?.[0]?.name || 'Standard Setup'}`,
    });
    navigateTo('booking');
  };

  const handleInspectIn3D = (service) => {
    sound.playClick();
    setActiveService(service);
    setViewMode('3d');
    navigateTo('home');
  };

  return (
    <SubpageLayout
      activeKey="services"
      badgeText="Turnkey Production Capabilities"
      title="Bespoke Event Production Services"
      subtitle="Complete turnkey execution for royal weddings, corporate galas, and live concerts across Pakistan with zero load shedding guaranteed."
    >
      <div className="space-y-12">
        
        {/* Service Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                sound.playClick();
                setSelectedServiceId(service.id);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedServiceId === service.id
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-400/25 scale-[1.02]'
                  : 'glass-pill text-zinc-300 hover:text-white hover:border-white/20'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: service.accentColor }}
              />
              <span>{service.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Selected Service Detailed Feature Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-10">
          
          {/* Top Title & Metadata */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedService.accentColor }} />
                <span>{selectedService.category}</span>
                <span>•</span>
                <span>{selectedService.badge}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-100">
                {selectedService.title}
              </h2>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {selectedService.description}
              </p>
            </div>

            {/* Quick Stats Pill Cards */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="glass-panel-gold p-4 rounded-2xl text-center">
                <div className="font-display text-lg sm:text-xl font-black text-amber-300">
                  {selectedService.stats.completed}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Completed</div>
              </div>
              <div className="glass-panel-gold p-4 rounded-2xl text-center">
                <div className="font-display text-lg sm:text-xl font-black text-emerald-400">
                  {selectedService.stats.satisfaction}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Rating</div>
              </div>
              <div className="glass-panel-gold p-4 rounded-2xl text-center">
                <div className="font-display text-sm sm:text-base font-bold text-zinc-100">
                  {selectedService.stats.avgCapacity}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Capacity</div>
              </div>
            </div>
          </div>

          {/* Deliverables & Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: What We Deliver / Features (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <h3 className="font-display font-bold text-base text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>What We Deliver & Engineer</span>
              </h3>
              <div className="space-y-3">
                {selectedService.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl glass-panel border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-zinc-300 leading-relaxed font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Signature Production Packages (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <h3 className="font-display font-bold text-base text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Signature Turnkey Packages</span>
              </h3>
              <div className="space-y-4">
                {selectedService.packages.map((pkg, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl glass-panel-gold border border-amber-500/30 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-display font-bold text-sm text-zinc-100">{pkg.name}</h4>
                        <span className="font-display font-bold text-xs text-amber-400 whitespace-nowrap">
                          {pkg.price}
                        </span>
                      </div>
                      <div className="text-[11px] text-amber-400/80 font-medium mb-2">
                        Duration: {pkg.duration}
                      </div>
                      <p className="text-xs text-zinc-300 font-light leading-relaxed">
                        {pkg.deliverables}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleBookService(selectedService)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Inquire For This Service</span>
                </button>
                <button
                  onClick={() => handleInspectIn3D(selectedService)}
                  className="px-6 py-3 rounded-full glass-panel text-zinc-200 hover:text-white hover:border-amber-400/50 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Inspect Plinth in 3D</span>
                </button>
              </div>
            </div>

          </div>

          {/* Photo Gallery for Selected Service */}
          {selectedService.galleryImages && selectedService.galleryImages.length > 0 && (
            <div className="pt-8 border-t border-white/10 space-y-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400">
                Production Preview Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedService.galleryImages.map((imgUrl, i) => (
                  <div key={i} className="aspect-[16/10] rounded-2xl overflow-hidden glass-panel border border-white/10">
                    <img
                      src={imgUrl}
                      alt={`${selectedService.title} preview ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Overview Grid of All 6 Services */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">Complete Directory</div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100">
              All 6 Signature Services At A Glance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((srv) => (
              <div
                key={srv.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedServiceId(srv.id);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  selectedServiceId === srv.id
                    ? 'glass-panel-gold border-amber-400/60 shadow-xl shadow-amber-500/10'
                    : 'glass-panel border-white/10 hover:border-amber-500/30'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {srv.category}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: srv.accentColor }}
                    />
                  </div>
                  <h4 className="font-display font-bold text-lg text-zinc-100">{srv.title}</h4>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-amber-300 font-semibold">
                  <span>View Details & Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SubpageLayout>
  );
}

