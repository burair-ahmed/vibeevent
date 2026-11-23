import { Sparkles, CheckCircle2, ShieldCheck, Zap, Layers, Users, Award, ArrowRight, Calendar, HeartHandshake } from 'lucide-react';
import SubpageLayout from '../components/layout/SubpageLayout';
import { COMPANY_STATS, TEAM_MEMBERS, TESTIMONIALS } from '../data/portfolioData';
import { useExperienceStore } from '../store/useExperienceStore';
import { sound } from '../utils/audioSystem';

export default function AboutPage() {
  const { navigateTo, setViewMode } = useExperienceStore();

  const handleBookNow = () => {
    sound.playClick();
    navigateTo('booking');
  };

  const handleLaunch3D = () => {
    sound.playClick();
    setViewMode('3d');
    navigateTo('home');
  };

  return (
    <SubpageLayout
      activeKey="about"
      badgeText="Pakistan's Premier Event & Wedding Management House"
      title="About VIBE EVENTS"
      subtitle="Turning your family celebrations, weddings, and corporate summits into unforgettable, cinematic experiences across Pakistan."
    >
      <div className="space-y-16">
        {/* ─── 1. MISSION & STORY SECTION ───────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Our Legacy & Philosophy</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100 leading-tight">
              Bespoke Event Architecture with Zero Compromise on Quality and Reliability.
            </h2>
            <div className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed">
              <p>
                Founded in Karachi and serving all major metropolitan regions across Pakistan including Islamabad, Rawalpindi, Lahore, and Bhurban, <strong className="text-zinc-100 font-semibold">VIBE EVENTS</strong> was built to elevate live event production to international standards.
              </p>
              <p>
                We believe that every milestone deserves cinematic brilliance. From royal Barat & Walima stages adorned with imported blooms, to high-stakes enterprise summits with curved P2.5 LED video walls, our team blends technical precision with artistic flair.
              </p>
              <p>
                Crucially, we understand local event challenges in Pakistan. That is why every single VIBE production is fortified with silent backup generators, automated changeover switches (ATS), pre-approved 3D architectural mockups, and a dedicated show producer on site from load-in to breakdown.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleBookNow}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation</span>
              </button>
              <button
                onClick={handleLaunch3D}
                className="px-6 py-3 rounded-full glass-panel text-zinc-200 hover:text-white hover:border-amber-400/50 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Explore 3D Virtual Hall</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl p-2">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                alt="VIBE Royal Wedding Production"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel-gold border border-amber-500/30">
                <div className="text-[10px] uppercase font-bold tracking-widest text-amber-300">Signature Standard</div>
                <div className="font-display font-bold text-sm text-zinc-100 mt-0.5">Custom Physical Fabrication & Floral Sculpting</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. COMPANY STATS BAR ─────────────────────────────────────────── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPANY_STATS.map((stat, i) => (
            <div key={i} className="glass-panel-gold p-6 rounded-3xl text-center border border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <div className="font-display text-3xl sm:text-4xl font-black text-gold-gradient mb-1.5">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-300 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* ─── 3. OUR OPERATIONAL ADVANTAGES ────────────────────────────────── */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">Why Families & Brands Choose Us</div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100">
              The VIBE Operational Shield
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              We eliminate typical Pakistani wedding and event stress with built-in guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-amber-500/30 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl glass-panel-gold flex items-center justify-center text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-base text-zinc-100">Zero Load Shedding</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Dedicated soundproof generators with automatic changeover switches (ATS) ensure zero flickering or outages during key moments, bride/groom entries, and speeches.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-amber-500/30 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl glass-panel-gold flex items-center justify-center text-emerald-400">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-base text-zinc-100">3D Pre-Visualization</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Before physical construction begins, you inspect and approve a 3D architectural computerized render of your stage, table layouts, and lighting palettes.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-amber-500/30 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl glass-panel-gold flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-base text-zinc-100">Nationwide Mobile Rigging</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Our own fleet of heavy logistics carriers and experienced sound engineers deploys across Karachi, Islamabad, Lahore, Multan, and mountain resort venues.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 4. THE 4-STEP PRODUCTION WORKFLOW ────────────────────────────── */}
        <section className="space-y-6 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">Precision Execution</div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100">
              Our 4-Step Production Process
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              From the initial concept meeting to the final teardown, your event is managed with clockwork precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="space-y-3 border-l-2 border-amber-400/40 pl-4">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Step 01</div>
              <h4 className="font-display font-bold text-sm text-zinc-100">Spatial Audit & Vision</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Physical venue site inspection, guest flow mapping, acoustic measurement, and power load assessment.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-amber-400/40 pl-4">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Step 02</div>
              <h4 className="font-display font-bold text-sm text-zinc-100">3D Design & CAD Drafting</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Computerized 3D walkthrough, stage elevations, floral palettes, and fixed PKR transparent line-item budget approval.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-amber-400/40 pl-4">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Step 03</div>
              <h4 className="font-display font-bold text-sm text-zinc-100">Fabrication & Pre-Rigging</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Custom carpentry, truss rigging, lighting programming, and generator load testing 24 hours prior to guests' arrival.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-amber-400/40 pl-4">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Step 04</div>
              <h4 className="font-display font-bold text-sm text-zinc-100">Live Show Direction</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Dedicated on-site floor manager, sound engineer, and stage cues ensuring a seamless, memorable event.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. LEADERSHIP TEAM ───────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">The Architects Behind The Magic</div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100">
              Executive Leadership & Directors
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Over two decades of collective event architecture, stagecraft, and client hospitality experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all space-y-4">
                <div className="w-14 h-14 rounded-2xl glass-panel-gold flex items-center justify-center text-amber-400 font-display text-xl font-black">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-zinc-100">{member.name}</h4>
                  <div className="text-xs text-amber-400 font-medium mt-0.5">{member.role}</div>
                </div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 6. CLIENT TESTIMONIALS ───────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">Client Endorsements</div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100">
              Trusted by Families & Leading Enterprises
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-zinc-300 font-light italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-white/5 space-y-0.5">
                  <div className="font-display font-bold text-xs text-zinc-100">{t.author}</div>
                  <div className="text-[11px] text-amber-400 font-medium">{t.role}</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{t.event}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 7. BOTTOM CALL TO ACTION ─────────────────────────────────────── */}
        <section className="glass-panel-gold p-8 sm:p-12 rounded-3xl border border-amber-500/40 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-100">
              Let's Engineer Your Landmark Celebration
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Contact our Senior Production Director today for an initial consultation, preliminary budget estimate, and date availability check.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleBookNow}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Free Consultation</span>
            </button>
            <button
              onClick={handleLaunch3D}
              className="px-8 py-3.5 rounded-full glass-panel text-zinc-200 hover:text-white hover:border-amber-400/50 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Launch 3D Hall</span>
            </button>
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}

