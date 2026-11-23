import { useState } from 'react';
import { ArrowLeft, Home, Layers, Calendar, Volume2, VolumeX, Menu, X, Sparkles, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function SubpageLayout({
  activeKey,
  title,
  subtitle,
  badgeText,
  badgeIcon: BadgeIcon = Sparkles,
  children,
}) {
  const {
    navigateTo,
    setViewMode,
    isSoundEnabled,
    toggleSound,
    currentRoute,
  } = useExperienceStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { key: 'services', label: 'Services', path: 'services' },
    { key: 'portfolio', label: 'Portfolio', path: 'portfolio' },
    { key: 'calculator', label: 'Cost Estimator', path: 'calculator' },
    { key: 'faq', label: 'FAQs', path: 'faq' },
    { key: 'about', label: 'About Us', path: 'about' },
    { key: 'privacy', label: 'Client Policies', path: 'privacy' },
  ];

  const handleNav = (route) => {
    sound.playClick();
    setMobileMenuOpen(false);
    navigateTo(route);
  };

  const handleSoundToggle = () => {
    sound.playClick();
    const nextSound = !isSoundEnabled;
    toggleSound();
    sound.setMuted(!nextSound);
  };

  const handleLaunch3D = () => {
    sound.playClick();
    setViewMode('3d');
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 bg-luxury-grid selection:bg-amber-400 selection:text-zinc-950 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col">
      {/* ─── 1. GLOBAL STICKY NAVBAR ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#07070a]/90 backdrop-blur-xl border-b border-white/10 px-5 md:px-12 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back Home + Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill hover:border-amber-400/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer group shrink-0"
              title="Return to Main Experience"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>

            <div
              onClick={() => handleNav('home')}
              className="cursor-pointer flex items-baseline gap-2 pl-2 sm:pl-3 border-l border-white/10 group"
            >
              <span className="font-display font-black tracking-[0.2em] text-lg sm:text-xl text-zinc-100 group-hover:text-amber-300 transition-colors">
                VIBE
              </span>
              <span className="font-display font-light tracking-[0.3em] text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-200">
                EVENTS
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-[0.14em] uppercase">
            {navLinks.map((link) => {
              const isActive = activeKey === link.key || currentRoute === link.path;
              return (
                <button
                  key={link.key}
                  onClick={() => handleNav(link.path)}
                  className={`py-1 relative transition-colors cursor-pointer ${
                    isActive ? 'text-amber-300 font-bold' : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Sound, 3D Toggle & Book CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Audio Mute/Unmute */}
            <button
              onClick={handleSoundToggle}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-pill flex items-center justify-center transition-all cursor-pointer ${
                isSoundEnabled ? 'text-amber-400 border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.25)]' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title={isSoundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Launch 3D Walkthrough */}
            <button
              onClick={handleLaunch3D}
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-400/50 transition-all cursor-pointer"
              title="Enter interactive 3D Exhibition Hall"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch 3D Hall</span>
            </button>

            {/* Book Event CTA Button */}
            <button
              onClick={() => handleNav('booking')}
              className={`px-4 sm:px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                activeKey === 'booking'
                  ? 'bg-white/10 text-amber-300 border border-amber-400/50'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 shadow-amber-500/20 hover:scale-105 active:scale-95'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Event</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-pill flex items-center justify-center text-zinc-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-5 rounded-2xl glass-panel-gold border border-amber-500/30 flex flex-col gap-3 animate-fade-up">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-colors rounded-xl ${
                  activeKey === link.key ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-300 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={handleLaunch3D}
                className="w-full py-2.5 rounded-xl glass-panel text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Launch 3D Hall</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ─── 2. OPTIONAL HERO BANNER ────────────────────────────────────────── */}
      {(title || subtitle) && (
        <section className="relative pt-12 pb-8 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="space-y-3.5 max-w-3xl">
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <BadgeIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>{badgeText}</span>
              </div>
            )}

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─── 3. MAIN PAGE CONTENT ───────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20">
        {children}
      </main>

      {/* ─── 4. GLOBAL LUXURY FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#050608] py-14 px-6 md:px-12 text-zinc-400 text-xs mt-auto">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand Info */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black tracking-[0.2em] text-base text-zinc-100">VIBE EVENTS</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Pakistan's bespoke event architecture house. Specializing in royal wedding stages, enterprise galas, line-array concert rigs, and guaranteed generator power.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-amber-400/90 font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Load Shedding & ATS Dual Power Guarantee</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200">
                Event Architecture
              </h4>
              <ul className="space-y-2 text-zinc-400">
                <li><button onClick={() => handleNav('services')} className="hover:text-amber-300 transition-colors cursor-pointer">Signature Services</button></li>
                <li><button onClick={() => handleNav('portfolio')} className="hover:text-amber-300 transition-colors cursor-pointer">Hall of Masterpieces</button></li>
                <li><button onClick={() => handleNav('calculator')} className="hover:text-amber-300 transition-colors cursor-pointer">Investment Estimator</button></li>
                <li><button onClick={() => handleNav('faq')} className="hover:text-amber-300 transition-colors cursor-pointer">FAQs & Guidelines</button></li>
                <li><button onClick={() => handleNav('about')} className="hover:text-amber-300 transition-colors cursor-pointer">About Our Company</button></li>
                <li><button onClick={() => handleNav('booking')} className="hover:text-amber-300 transition-colors cursor-pointer">Book Consultation</button></li>
              </ul>
            </div>

            {/* Col 3: Client Governance */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200">
                Client Policies
              </h4>
              <ul className="space-y-2 text-zinc-400">
                <li><button onClick={() => handleNav('privacy')} className="hover:text-amber-300 transition-colors cursor-pointer">Privacy & Confidentiality</button></li>
                <li><button onClick={() => handleNav('terms')} className="hover:text-amber-300 transition-colors cursor-pointer">Terms & Conditions</button></li>
                <li><button onClick={() => handleNav('refund')} className="hover:text-amber-300 transition-colors cursor-pointer">Refund & Cancellation</button></li>
                <li><button onClick={() => handleNav('safety')} className="hover:text-amber-300 transition-colors cursor-pointer">Safety & Power Redundancy</button></li>
              </ul>
            </div>

            {/* Col 4: Contact & Operations */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200">
                Direct Inquiries
              </h4>
              <div className="space-y-2.5 text-xs text-zinc-400 font-light">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Helpline: +92 (300) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>info@vibeeventmanagement.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Karachi • Islamabad • Nationwide</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
            <div>
              © 2026 VIBE EVENTS INC. All rights reserved. Registered Event Production House in Pakistan.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => handleNav('home')} className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

