import { useState } from 'react';
import { X, Sparkles, MapPin, Users, Award, ExternalLink, ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../../data/portfolioData';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function PortfolioModal() {
  const { activeModal, closeModal, setActiveModal } = useExperienceStore();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (activeModal !== 'portfolio') return null;

  const categories = ['All', 'Corporate', 'Weddings', 'Concerts', 'Brand Activations', 'VIP Celebrations', 'AV & Production'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleInquire = () => {
    sound.playClick();
    closeModal();
    setActiveModal('booking');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Masterpiece Portfolio Modal"
      className="fixed inset-0 z-50 bg-[#07070a]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-6xl max-h-[90vh] bg-[#0d0e16]/95 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hall of Masterpieces</span>
            </div>
            <h2 className="font-cinzel text-2xl md:text-3xl font-extrabold text-zinc-100">
              Signature Event Portfolio
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              closeModal();
            }}
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 md:px-8 py-3.5 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20'
                  : 'glass-pill text-zinc-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-panel text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {project.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-3">
                    {project.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{project.guests}</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics / Badges */}
                <div className="pt-3 border-t border-white/5 space-y-1.5">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-[11px] text-zinc-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-white/10 glass-panel flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 text-center sm:text-left">
            Have a landmark event in mind? Let us engineer your bespoke floorplan and production concept.
          </p>
          <button
            onClick={handleInquire}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Inquire About Our Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

