import { X, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { COMPANY_STATS, TEAM_MEMBERS, TESTIMONIALS } from '../../data/portfolioData';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function AboutModal() {
  const { activeModal, closeModal, setActiveModal, openPolicyModal, navigateToPolicy } = useExperienceStore();

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
              <span>Pakistan's Premier Event & Wedding Management House</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-zinc-100">
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
          {/* Main Intro */}
          <div className="space-y-3">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-100">
              Turning Your Family Celebrations & Corporate Milestones Into Pure Magic.
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              Founded in Karachi and operating nationwide across Islamabad and all major cities, <strong className="text-zinc-100">VIBE EVENTS</strong> brings together royal stage decoration, fresh floral arrangements, concert sound systems, and dedicated generator power backup. Whether you are hosting a grand wedding, a private family Mehndi, a company gala, or a musical Qawwali evening, we handle every single detail so you can enjoy your special day completely stress-free.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COMPANY_STATS.map((stat, i) => (
              <div key={i} className="glass-panel-gold p-4 rounded-2xl text-center">
                <div className="font-display text-2xl sm:text-3xl font-black text-gold-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key Advantages for Pakistani Clients */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Zero Load Shedding</span>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Soundproof generators with automatic changeovers ensure seamless power for lighting, sound, and ACs.
              </p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Custom Stage Designs</span>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                3D computerized preview mockups approved by you before physical fabrication and flower arrangement.
              </p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Nationwide Team</span>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Fully equipped trucks and experienced crew ready for Karachi, Islamabad, Multan, and Bhurban.
              </p>
            </div>
          </div>

          {/* Executive Leadership Team */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Leadership & Production Directors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TEAM_MEMBERS.map((member, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl space-y-2 border border-white/5 hover:border-amber-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-full glass-panel-gold flex items-center justify-center text-amber-400 font-display font-black">
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
              Trusted by Families & Corporations Across Pakistan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TESTIMONIALS.map((testimonial, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-white/5">
                  <p className="text-xs text-zinc-300 font-light italic leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-white/5 pt-3">
                    <div className="font-bold text-xs text-zinc-100">{testimonial.author}</div>
                    <div className="text-[10px] text-amber-400 font-medium">{testimonial.role}</div>
                    <div className="text-[9px] text-zinc-500 uppercase tracking-wider mt-0.5">{testimonial.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-white/10 glass-panel flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Serving Karachi, Islamabad, and all cities across Pakistan.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                closeModal();
                navigateToPolicy('privacy');
              }}
              className="text-xs text-zinc-400 hover:text-amber-300 underline cursor-pointer"
            >
              View Client Policies
            </button>
            <button
              onClick={handleBookNow}
              className="px-6 py-2.5 rounded-full bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300 transition-colors cursor-pointer text-xs uppercase tracking-wider"
            >
              Request Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
