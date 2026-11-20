import { ArrowLeft, Printer, Phone, Calendar, ShieldCheck, Lock, FileText, RefreshCw, Zap, ArrowRight, Layers, Home } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function PolicyPageLayout({
  policyKey,
  title,
  subtitle,
  badgeText,
  icon: Icon = ShieldCheck,
  lastUpdated = 'November 2026',
  children,
  nextPolicy,
}) {
  const { navigateTo, setActiveModal, setViewMode } = useExperienceStore();

  const policyNav = [
    { key: 'privacy', label: 'Privacy Policy', path: '#privacy', icon: Lock },
    { key: 'terms', label: 'Terms & Conditions', path: '#terms', icon: FileText },
    { key: 'refund', label: 'Refund & Cancellation', path: '#refund', icon: RefreshCw },
    { key: 'safety', label: 'Safety & Power Backup', path: '#safety', icon: Zap },
  ];

  const handleNav = (targetKey) => {
    sound.playClick();
    navigateTo(targetKey);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleBookConsultation = () => {
    sound.playClick();
    setActiveModal('booking');
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 bg-luxury-grid selection:bg-amber-400 selection:text-zinc-950 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. Sticky Policy Header */}
      <header className="sticky top-0 z-40 bg-[#07070a]/90 backdrop-blur-xl border-b border-white/10 px-6 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand + Back Home */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill hover:border-amber-400/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer group"
              title="Return to Main Experience"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>

            <div 
              onClick={() => handleNav('home')}
              className="cursor-pointer hidden sm:flex items-baseline gap-2 pl-2 border-l border-white/10"
            >
              <span className="font-display font-black tracking-[0.2em] text-lg text-zinc-100 hover:text-amber-300 transition-colors">
                VIBE
              </span>
              <span className="font-display font-light tracking-[0.3em] text-xs text-zinc-400">
                EVENTS
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full glass-pill text-xs text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-2 cursor-pointer"
              title="Print Policy Document"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('3d');
                navigateTo('home');
              }}
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs text-zinc-300 hover:text-white hover:border-amber-400/50 transition-all cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch 3D Hall</span>
            </button>

            <button
              onClick={handleBookConsultation}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Event</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Sub-Navigation Switcher between the 4 Policy Pages */}
      <nav aria-label="Policy Navigation" className="border-b border-white/10 bg-[#0a0b12]/80 px-6 md:px-12 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mr-2 shrink-0">
            All Policies:
          </span>
          {policyNav.map((item) => {
            const ItemIcon = item.icon;
            const isActive = policyKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/20 scale-[1.02]'
                    : 'glass-pill text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                }`}
              >
                <ItemIcon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-950' : 'text-amber-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. Hero Section for Current Policy */}
      <section className="relative pt-16 pb-12 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Icon className="w-3.5 h-3.5 text-amber-400" />
            <span>{badgeText || 'VIBE Events Pakistan'}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-500">
            <div>
              Effective Date: <strong className="text-zinc-300 font-semibold">{lastUpdated}</strong>
            </div>
            <span>•</span>
            <div>
              Jurisdiction: <strong className="text-zinc-300 font-semibold">Islamic Republic of Pakistan (Lahore, Karachi, Islamabad)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Policy Detailed Article Body */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content (8 cols) */}
          <article className="lg:col-span-8 space-y-8 text-zinc-300 text-sm leading-relaxed font-light">
            {children}
          </article>

          {/* Right Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Quick Summary Card */}
            <div className="glass-panel-gold p-6 rounded-3xl border border-amber-500/30 space-y-4">
              <h3 className="font-display font-bold text-sm text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Our Guarantee</span>
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Every event agreement is governed by written contracts with transparent PKR budgets, zero hidden costs, dual-generator power backup, and total family privacy protection.
              </p>
              <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Advance Deposit:</span>
                  <span className="font-semibold text-zinc-200">25% – 30%</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Power Redundancy:</span>
                  <span className="font-semibold text-emerald-400">Dual Silent ATS</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Coverage:</span>
                  <span className="font-semibold text-zinc-200">Nationwide</span>
                </div>
              </div>
            </div>

            {/* Helpline & WhatsApp Box */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Need Policy Clarification?</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Speak directly with our Client Relations Officer or Senior Event Producer via phone or WhatsApp.
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+923008423836"
                  className="w-full py-2.5 px-4 rounded-xl glass-panel text-xs text-zinc-200 hover:text-white hover:border-amber-400/50 flex items-center justify-between transition-colors"
                >
                  <span>Helpline:</span>
                  <strong className="text-amber-300">+92 (300) 842-3836</strong>
                </a>
                <a
                  href="mailto:legal@vibeevents.pk"
                  className="w-full py-2.5 px-4 rounded-xl glass-panel text-xs text-zinc-200 hover:text-white hover:border-amber-400/50 flex items-center justify-between transition-colors"
                >
                  <span>Email:</span>
                  <strong className="text-amber-300">legal@vibeevents.pk</strong>
                </a>
              </div>
            </div>

            {/* Next Policy Card */}
            {nextPolicy && (
              <div 
                onClick={() => handleNav(nextPolicy.key)}
                className="group glass-panel p-6 rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer space-y-2"
              >
                <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  Read Next Policy
                </div>
                <h4 className="font-display font-bold text-base text-zinc-100 group-hover:text-amber-300 flex items-center justify-between transition-colors">
                  <span>{nextPolicy.label}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-xs text-zinc-400 font-light line-clamp-2">
                  {nextPolicy.desc}
                </p>
              </div>
            )}

          </aside>
        </div>
      </main>

      {/* 5. Policy Footer */}
      <footer className="border-t border-white/10 bg-[#060608] py-12 px-6 md:px-12 text-zinc-400 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-baseline justify-center sm:justify-start gap-2">
              <span className="font-display font-black tracking-[0.2em] text-sm text-zinc-100">VIBE EVENTS PAKISTAN</span>
            </div>
            <div className="text-[11px] text-zinc-500">
              © 2026 VIBE EVENTS INC. Official Operational & Client Governance Policies.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button onClick={() => handleNav('privacy')} className="hover:text-amber-300 cursor-pointer">Privacy</button>
            <button onClick={() => handleNav('terms')} className="hover:text-amber-300 cursor-pointer">Terms</button>
            <button onClick={() => handleNav('refund')} className="hover:text-amber-300 cursor-pointer">Refunds</button>
            <button onClick={() => handleNav('safety')} className="hover:text-amber-300 cursor-pointer">Safety & Power</button>
            <button onClick={() => handleNav('home')} className="hover:text-amber-300 flex items-center gap-1 cursor-pointer ml-2">
              <Home className="w-3 h-3 text-amber-400" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

