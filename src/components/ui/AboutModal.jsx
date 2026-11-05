import { X, Sparkles, Award, Globe2, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY_STATS, TEAM_MEMBERS, TESTIMONIALS } from '../../data/portfolioData';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function AboutModal() {
  const { activeModal, closeModal, setActiveModal } = useExperienceStore();

  if (activeModal !== 'about') return null;

  const handleBookNow = () => {
    sound.playClick();
    closeModal();
    setActiveModal('booking');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="About Vibe Events Modal"
      className="fixed inset-0 z-50 bg-[#07070a]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-5xl max-h-[90vh] bg-[#0d0e16]/95 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architects of the Unforgettable</span>
            </div>
            <h2 className="font-cinzel text-2xl md:text-3xl font-extrabold text-zinc-100">
              About VIBE EVENTS
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Manifesto */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-xl font-bold text-zinc-100">
              We Don't Just Produce Events. We Construct Memories That Defy Gravity.
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              Founded at the intersection of haute couture spatial design, stadium audio-visual engineering, and white-glove hospitality, VIBE EVENTS has transformed how luxury celebrations, tech summits, and arena spectacles are experienced worldwide.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COMPANY_STATS.map((stat, i) => (
              <div key={i} className="glass-panel-gold p-4 rounded-2xl text-center">
                <div className="font-cinzel text-2xl sm:text-3xl font-black text-gold-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Executive Leadership Team */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Creative Directors & Engineering Leadership
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TEAM_MEMBERS.map((member, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl space-y-2 border border-white/5 hover:border-amber-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-full glass-panel-gold flex items-center justify-center text-amber-400 font-cinzel font-black">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-100">{member.name}</h4>
                    <div className="text-[11px] text-amber-400 font-medium">{member.role}</div>
                  </div>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonials */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Words From Our Distinguished Patrons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TESTIMONIALS.map((test, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3">
                  <p className="text-xs text-zinc-300 font-light italic leading-relaxed">
                    "{test.quote}"
                  </p>
                  <div>
                    <div className="font-bold text-xs text-amber-300">{test.author}</div>
                    <div className="text-[10px] text-zinc-400">{test.role} • {test.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 glass-panel flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 text-center sm:text-left">
            Let's discuss dates, spatial requirements, and guest experiences.
          </p>
          <button
            onClick={handleBookNow}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

