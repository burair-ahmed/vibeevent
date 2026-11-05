import { useState } from 'react';
import { Sparkles, ArrowRight, Layers, CheckCircle2, Award, Users, ShieldCheck, MapPin, Calendar } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { PORTFOLIO_PROJECTS, COMPANY_STATS, TEAM_MEMBERS, TESTIMONIALS } from '../../data/portfolioData';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function Classic2DView() {
  const { setViewMode, setActiveService, setActiveModal } = useExperienceStore();
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0]);

  const handleSwitchTo3D = () => {
    sound.playClick();
    setViewMode('3d');
  };

  const handleBook = () => {
    sound.playClick();
    setActiveModal('booking');
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Switch back to 3D Banner */}
        <div className="p-4 rounded-2xl glass-panel-gold border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs sm:text-sm text-zinc-200">
              You are currently viewing in <span className="text-amber-400 font-bold">Classic 2D Editorial Mode</span>.
            </span>
          </div>
          <button
            onClick={handleSwitchTo3D}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Launch 3D Spatial Walkthrough</span>
          </button>
        </div>

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Global Luxury Event Management</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black text-zinc-100 tracking-tight leading-tight">
            WHERE ARCHITECTURAL SCALE MEETS UNRIVALED CELEBRATION
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
            We engineer high-concept experiential events for Fortune 500 summits, royalty, arena tours, and ultra-high-net-worth private milestones across the globe.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleBook}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Inquire & Book Event</span>
            </button>
            <button
              onClick={() => setActiveModal('calculator')}
              className="px-8 py-3.5 rounded-full glass-pill text-zinc-200 font-semibold text-xs uppercase tracking-wider hover:text-white transition-all cursor-pointer"
            >
              Cost Estimator
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMPANY_STATS.map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl text-center border border-white/5">
              <div className="font-cinzel text-3xl md:text-4xl font-black text-gold-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Services Exhibition Grid */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                World-Class Offerings
              </div>
              <h2 className="font-cinzel text-3xl font-extrabold text-zinc-100">
                Signature Event Architecture
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">
              Each service is backed by proprietary 3D spatial pre-visualization, master technicians, and dedicated show producers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((srv) => (
              <div
                key={srv.id}
                onClick={() => {
                  sound.playClick();
                  setActiveService(srv);
                }}
                className="group glass-panel rounded-2xl p-6 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-zinc-950"
                      style={{ backgroundColor: srv.accentColor }}
                    >
                      {srv.badge}
                    </span>
                    <span className="text-xs font-semibold text-amber-400">{srv.packages[0].price}</span>
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                    {srv.description}
                  </p>
                  <div className="space-y-1.5">
                    {srv.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400">
                  <span>Explore Experience</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Highlights */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                Past Productions
              </div>
              <h2 className="font-cinzel text-3xl font-extrabold text-zinc-100">
                Featured Masterpieces
              </h2>
            </div>
            <button
              onClick={() => setActiveModal('portfolio')}
              className="text-xs text-amber-400 hover:underline uppercase font-bold tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_PROJECTS.slice(0, 3).map((proj) => (
              <div key={proj.id} className="glass-panel rounded-2xl overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    {proj.category}
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-zinc-100">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">
                    {proj.location} • {proj.guests}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div>
            © 2026 VIBE EVENTS INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveModal('about')} className="hover:text-zinc-300">About Us</button>
            <button onClick={() => setActiveModal('portfolio')} className="hover:text-zinc-300">Portfolio</button>
            <button onClick={() => setActiveModal('calculator')} className="hover:text-zinc-300">Cost Calculator</button>
            <button onClick={handleBook} className="text-amber-400 font-bold hover:underline">Book Event</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

