import { useState } from 'react';
import { Sparkles, MapPin, Users, ArrowRight, Calendar, Layers, ShieldCheck } from 'lucide-react';
import SubpageLayout from '../components/layout/SubpageLayout';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { useExperienceStore } from '../store/useExperienceStore';
import { sound } from '../utils/audioSystem';

export default function PortfolioPage() {
  const { navigateTo, setViewMode } = useExperienceStore();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Corporate', 'Weddings', 'Concerts', 'Brand Activations', 'VIP Celebrations', 'AV & Production'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleInquire = () => {
    sound.playClick();
    navigateTo('booking');
  };

  return (
    <SubpageLayout
      activeKey="portfolio"
      badgeText="Hall of Masterpieces"
      title="Signature Event Portfolio"
      subtitle="A curated showcase of royal weddings, enterprise conferences, live concerts, and private farmhouse galas engineered across Pakistan."
    >
      <div className="space-y-10">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-400/25 scale-[1.02]'
                  : 'glass-pill text-zinc-300 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Preview */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full glass-panel text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30">
                    {project.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{project.guests}</span>
                    </div>
                  </div>

                  {/* Execution Metrics */}
                  <div className="pt-3 border-t border-white/5 space-y-1.5">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="text-[11px] text-zinc-400 flex items-center gap-2 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={handleInquire}
                  className="w-full py-2.5 rounded-xl glass-panel text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-400/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Inquire for Similar Event</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="glass-panel-gold p-8 sm:p-12 rounded-3xl border border-amber-500/40 text-center space-y-5">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100">
              Have a Landmark Vision for Your Special Day?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Let us draft your custom 3D floorplan, acoustic sound array, and stage design. Our team is ready nationwide.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleInquire}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Request Event Date & Quote</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('3d');
                navigateTo('home');
              }}
              className="px-8 py-3.5 rounded-full glass-panel text-zinc-200 hover:text-white hover:border-amber-400/50 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Launch 3D Hall</span>
            </button>
          </div>
        </div>

      </div>
    </SubpageLayout>
  );
}

