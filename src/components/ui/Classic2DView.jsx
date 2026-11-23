import { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  MapPin, 
  Calendar,
  Calculator,
  Check,
  ChevronDown,
  Star,
  Clock,
  Send,
  Phone,
  Mail,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES_DATA } from '../../data/servicesData';
import { PORTFOLIO_PROJECTS, COMPANY_STATS, TESTIMONIALS } from '../../data/portfolioData';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';
import { EVENT_TYPES, PRODUCTION_TIERS, ADDON_OPTIONS, calculateEstimate } from '../../utils/estimatorLogic';

const FAQ_ITEMS = [
  {
    question: "How far in advance should we book for a wedding or corporate event?",
    answer: "For winter wedding season (October to March) and large corporate galas, we recommend booking 2 to 4 months in advance to secure prime dates and custom fabrication. However, our rapid response team can also execute urgent corporate setups and private birthday or dholki events within 1 to 2 weeks."
  },
  {
    question: "Do you provide full backup generators to protect against load-shedding?",
    answer: "Yes, 100%. Every single event includes dual-redundant soundproof diesel generators (typically 100 kVA to 250 kVA) with automatic changeover switches (ATS). Your stage lights, sound, LED screens, and ACs will continue running without even a split-second flicker."
  },
  {
    question: "Can we see a 3D preview of our wedding stage or corporate setup before booking?",
    answer: "Absolutely! We create a photorealistic 3D digital model of your exact venue (whether Royal Palm, PC Marquee, Serena, or your private farmhouse). You can see the stage layout, flower arrangements, sofa placements, and lighting before a single nail is hammered."
  },
  {
    question: "Do you arrange events outside Karachi and Islamabad?",
    answer: "Yes. We execute destination events, farmhouse celebrations, and industrial launches across Pakistan, including Faisalabad, Multan, Sialkot, Peshawar, Rawalpindi, and Gwadar with our mobile logistics fleet."
  },
  {
    question: "What are your package budgets and payment milestones?",
    answer: "Our event packages start from PKR 150,000 for boutique birthdays and private dholkis, PKR 450,000 for standard corporate functions, and PKR 850,000 to PKR 5,000,000+ for grand royal weddings and arena concerts. Payments are divided into simple milestones: 30% advance on booking, 40% on production setup, and 30% before the event begins."
  }
];

export default function Classic2DView() {
  const { 
    setViewMode, 
    setActiveService, 
    navigateTo,
    estimatorState, 
    updateEstimatorState,
    setBookingPrefill,
    bookingPrefill
  } = useExperienceStore();

  // Category filters
  const [serviceCategory, setServiceCategory] = useState('All');
  const [portfolioCategory, setPortfolioCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // On-page booking form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Corporate Gala / Summit',
    eventDate: '',
    guests: '350',
    location: '',
    notes: '',
  });
  const [submittedBooking, setSubmittedBooking] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Estimator parameters
  const { eventType, guestCount, tier, addons } = estimatorState || {
    eventType: 'corporate',
    guestCount: 350,
    tier: 'luxury',
    addons: {
      projectionMapping: true,
      droneShow: false,
      michelinCatering: true,
      liveBroadcast: false,
    },
  };

  const estimate = useMemo(() => {
    return calculateEstimate(eventType, guestCount, tier, addons);
  }, [eventType, guestCount, tier, addons]);

  const serviceCategories = ['All', 'Weddings', 'Corporate', 'Concerts', 'Activations', 'VIP', 'Birthdays'];
  const filteredServices = serviceCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category.toLowerCase().includes(serviceCategory.toLowerCase()) || s.shortTitle.toLowerCase().includes(serviceCategory.toLowerCase()));

  const portfolioCategories = ['All', 'Corporate', 'Weddings', 'Concerts', 'Brand Activations', 'VIP Celebrations'];
  const filteredPortfolio = portfolioCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category.toLowerCase().includes(portfolioCategory.toLowerCase()));

  const handleSwitchTo3D = () => {
    sound.playClick();
    setViewMode('3d');
  };

  const scrollToAnchor = (id) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Estimator actions
  const handleSelectEventType = (typeId) => {
    sound.playClick();
    updateEstimatorState({ eventType: typeId });
  };

  const handleGuestCountChange = (count) => {
    updateEstimatorState({ guestCount: count });
  };

  const handleSelectTier = (tierId) => {
    sound.playClick();
    updateEstimatorState({ tier: tierId });
  };

  const handleToggleAddon = (addonId) => {
    sound.playClick();
    updateEstimatorState({
      addons: {
        ...addons,
        [addonId]: !addons[addonId],
      },
    });
  };

  const handleLockInQuoteAndScroll = () => {
    sound.playClick();
    const activeAddonsList = ADDON_OPTIONS.filter((a) => addons[a.id]).map((a) => a.label);
    const selectedType = EVENT_TYPES.find((t) => t.id === eventType) || EVENT_TYPES[0];
    const selectedTier = PRODUCTION_TIERS.find((t) => t.id === tier) || PRODUCTION_TIERS[1];

    const quoteSnapshot = {
      eventType: selectedType.label,
      guests: String(guestCount),
      tier: selectedTier.label,
      addons: activeAddonsList,
      estimatedRange: `PKR ${estimate.low} – PKR ${estimate.high}`,
      notes: `[Online Estimate Quote]\nInvestment Range: PKR ${estimate.low} – PKR ${estimate.high}\nProduction Tier: ${selectedTier.label} (${selectedTier.multiplier}x scale)\nSelected Addons: ${activeAddonsList.join(', ') || 'Standard Core Scope'}\nAllocation Breakdown: Stage & Decor (~PKR ${estimate.stageCost}) | AV & Lighting (~PKR ${estimate.avCost}) | Operations (~PKR ${estimate.hospitalityCost})`,
    };

    setBookingPrefill(quoteSnapshot);

    setFormState((prev) => ({
      ...prev,
      eventType: selectedType.label,
      guests: String(guestCount),
      notes: quoteSnapshot.notes,
    }));

    // Smooth scroll directly to contact inquiry section
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sound.playClick();

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#d4af37', '#ffffff'],
      });
    } catch {}

    const code = 'VIBE-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(code);
    setSubmittedBooking(true);
  };

  return (
    <div className="relative min-h-screen bg-[#07070a] text-zinc-100 bg-luxury-grid selection:bg-amber-400 selection:text-zinc-950">
      
      {/* 1. Sleek Floating 3D/2D Mode Indicator */}
      <aside aria-label="3D Experience Banner" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleSwitchTo3D}
          className="group px-4 py-3 rounded-full glass-panel-gold border border-amber-400/50 shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <div className="text-left">
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Interactive 3D Hall</div>
            <div className="text-xs font-bold text-amber-300 group-hover:text-amber-200 flex items-center gap-1">
              <span>Launch Spatial Walkthrough</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>
      </aside>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Premier Event & Wedding Management in Pakistan</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-[1.08]">
            Royal Weddings, Corporate Galas &{' '}
            <span className="font-serif-accent italic font-normal text-gold-gradient block sm:inline">
              Memorable Celebrations.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            From grand Mehndi, Barat & Walima setups to high-impact corporate summits in Karachi and serene Sufi nights in Islamabad — planned with custom 3D previews and guaranteed zero load-shedding.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => scrollToAnchor('estimator')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Interactive Cost Estimator</span>
            </button>
            <button
              onClick={() => scrollToAnchor('services')}
              className="px-6 py-3 rounded-full glass-pill text-zinc-200 font-semibold text-[11px] uppercase tracking-wider hover:text-white hover:border-white/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore Signature Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Hub Ticker */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-zinc-500 uppercase tracking-widest border-t border-white/5">
            <span>New York</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>London</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Dubai</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Zurich</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Lake Como</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Tokyo</span>
          </div>
        </div>
      </section>

      {/* 3. Company Stats Grid */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMPANY_STATS.map((stat, i) => (
            <div 
              key={i} 
              className="glass-panel p-6 sm:p-8 rounded-3xl text-center border border-white/5 hover:border-amber-400/20 transition-all group"
            >
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-gold-gradient mb-2 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 font-medium tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Signature Services Exhibition Section */}
      <section id="services" className="scroll-mt-24 px-6 md:px-12 max-w-7xl mx-auto py-16 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>World-Class Offerings</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Signature Event Architecture
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md font-light leading-relaxed">
            Every production is engineered with bespoke 3D CAD pre-visualization, master technicians, and dedicated Emmy-caliber show directors.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-white/10 pb-4">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setServiceCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                serviceCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/20'
                  : 'glass-pill text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => {
            const heroImg = srv.galleryImages?.[0] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';
            return (
              <div
                key={srv.id}
                onClick={() => {
                  sound.playClick();
                  setActiveService(srv);
                }}
                className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl hover:-translate-y-1"
              >
                {/* Visual Image Preview */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={heroImg}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d15] via-transparent to-black/20" />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-zinc-950 shadow-md"
                      style={{ backgroundColor: srv.accentColor }}
                    >
                      {srv.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-4">
                    <span className="text-xs font-bold text-amber-300 glass-pill px-3 py-1 rounded-full">
                      {srv.packages[0].price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3 mb-4">
                      {srv.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {srv.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400">
                    <span className="tracking-wider uppercase">View Full Specifications</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Centerpiece: Interactive Live Cost Estimator Section */}
      <section id="estimator" className="scroll-mt-24 px-6 md:px-12 max-w-7xl mx-auto py-20">
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 md:p-12 border border-amber-500/40 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
                  <Calculator className="w-4 h-4" />
                  <span>Interactive Budget Modeling Engine</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-zinc-100">
                  Plan Your Event Investment
                </h2>
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm max-w-md font-light leading-relaxed">
                Configure your event parameters in real time. We calculate architectural staging, intelligent lighting, audio arrays, and premium hospitality with full transparency.
              </p>
            </div>

            {/* Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Controls (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Event Category */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center justify-between">
                    <span>1. Select Event Category</span>
                    <span className="text-amber-400 font-semibold">{estimate.selectedType.label}</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {EVENT_TYPES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleSelectEventType(t.id)}
                        className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                          eventType === t.id
                            ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold shadow-lg shadow-amber-400/20 scale-[1.02]'
                            : 'glass-panel border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <div className="text-xs font-bold truncate">{t.label}</div>
                        <div className={`text-[10px] mt-0.5 ${eventType === t.id ? 'text-zinc-900 font-medium' : 'text-zinc-400'}`}>
                          Base: PKR {t.base.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Guest Count Slider */}
                <div className="space-y-3 glass-panel p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                      2. Guest Attendance
                    </label>
                    <div className="font-display text-xl font-extrabold text-amber-400">
                      {guestCount.toLocaleString()} <span className="text-xs font-normal text-zinc-400">Guests</span>
                    </div>
                  </div>
                  
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={guestCount}
                    onChange={(e) => handleGuestCountChange(Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
                  />

                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 pt-2">
                    {[100, 250, 500, 1000, 2500, 5000].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleGuestCountChange(num)}
                        className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                          guestCount === num
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/60 font-semibold'
                            : 'text-zinc-400 hover:text-zinc-200 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        {num.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Production Tiers */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                    3. Production Rig & Staging Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PRODUCTION_TIERS.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleSelectTier(t.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          tier === t.id
                            ? 'glass-panel-gold border-amber-400/80 shadow-md shadow-amber-400/20'
                            : 'glass-panel border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-xs text-zinc-100">{t.label}</span>
                            <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/10 text-amber-300">
                              {t.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{t.desc}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-amber-400">
                          <span>{t.multiplier}x Multiplier</span>
                          {tier === t.id && <Check className="w-4 h-4 text-amber-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. High-Impact Enhancements */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                    4. Optional Turnkey Add-ons
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ADDON_OPTIONS.map((addon) => {
                      const isChecked = Boolean(addons?.[addon.id]);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => handleToggleAddon(addon.id)}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'border-amber-400/60 bg-amber-500/10'
                              : 'glass-panel border-white/5 hover:border-white/15'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                                isChecked
                                  ? 'bg-amber-400 border-amber-400 text-zinc-950'
                                  : 'border-zinc-600'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-zinc-200">{addon.label}</div>
                              <div className="text-[10px] text-zinc-400 font-light">{addon.desc}</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-amber-400 shrink-0 ml-2">
                            +PKR {addon.cost.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Live Investment Output & Handoff Card (5 Cols) */}
              <div className="lg:col-span-5 sticky top-28 space-y-6">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-widest mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>Live Calibrated Estimate</span>
                  </div>

                  <div className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                    Estimated Total Investment
                  </div>

                  <div className="font-display text-2xl sm:text-3xl font-black text-gold-gradient tracking-tight my-3">
                    PKR {estimate.low} – PKR {estimate.high}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                    Based on {guestCount.toLocaleString()} attendees for a {estimate.selectedType.label} with {estimate.selectedTier.label} specifications.
                  </p>

                  {/* Itemized Cost Breakdown Pills */}
                  <div className="w-full space-y-2.5 text-left border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Kinetic Stagecraft & Rigging:</span>
                      <span className="font-semibold text-zinc-200">~PKR {estimate.stageCost}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Audio Arrays & Intelligent Lighting:</span>
                      <span className="font-semibold text-zinc-200">~PKR {estimate.avCost}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Operations, Hospitality & Addons:</span>
                      <span className="font-semibold text-zinc-200">~PKR {estimate.hospitalityCost}</span>
                    </div>
                  </div>

                  {/* Guaranteed 30-Day Lock Note */}
                  <div className="w-full mt-6 pt-5 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Includes 30-day quote lock upon discovery session</span>
                  </div>

                  {/* Big Action Button */}
                  <button
                    onClick={handleLockInQuoteAndScroll}
                    className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Lock in Quote & Reserve Date</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[10px] text-zinc-500 mt-2">
                    Transfers your configured parameters directly to our concierge team.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. Curated Masterpiece Portfolio Section */}
      <section id="portfolio" className="scroll-mt-24 px-6 md:px-12 max-w-7xl mx-auto py-16 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>Hall of Masterpieces</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Curated Event Productions
            </h2>
          </div>
          <button
            onClick={() => navigateTo('portfolio')}
            className="text-xs text-amber-400 hover:text-amber-300 uppercase font-bold tracking-wider flex items-center gap-1 cursor-pointer"
          >
            <span>Launch Full Portfolio Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Portfolio Category Filter */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setPortfolioCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                portfolioCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/20'
                  : 'glass-pill text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((proj) => (
            <div 
              key={proj.id} 
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d15] via-transparent to-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full glass-panel-gold text-amber-300 border border-amber-400/40">
                    {proj.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-zinc-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate">{proj.location}</span>
                  </span>
                  <span className="font-semibold text-amber-300">{proj.guests}</span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1.5">
                  {proj.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-amber-400/90 font-medium">
                      <Star className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. The 4-Step Production Methodology Section */}
      <section id="process" className="scroll-mt-24 px-6 md:px-12 max-w-7xl mx-auto py-20 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Our 4-Step Process</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-100">
            Stress-Free Event Planning From Start to Finish
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            How we bring your dream wedding, corporate gala, or family celebration to life with complete transparency, punctuality, and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Consultation & 3D Stage Preview',
              desc: 'We sit down over chai to understand your requirements, then show you a photorealistic 3D visual of your stage, lighting, and guest seating before anything is built.',
            },
            {
              step: '02',
              title: 'Custom Fabrication & Decor',
              desc: 'Our master craftsmen create custom stage backdrops, fresh imported flower arches, carpeted walkways, and comfortable family lounge seating.',
            },
            {
              step: '03',
              title: 'AV, Lighting & Silent Power Backup',
              desc: 'We install concert-grade audio, HD LED video walls, mood lighting, and connect dual silent diesel generators to guarantee zero blackouts.',
            },
            {
              step: '04',
              title: 'Live Coordination & Hospitality',
              desc: 'Our dedicated on-ground event managers handle guest welcoming, bride & groom entry cues, catering coordination, and smooth cleanup.',
            },
          ].map((item, i) => (
            <div 
              key={i} 
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative group hover:border-amber-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="font-display text-3xl font-black text-amber-400/30 group-hover:text-amber-400 transition-colors mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-bold text-zinc-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Milestones</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Client Testimonials & Press Endorsements */}
      <section id="testimonials" className="scroll-mt-24 px-6 md:px-12 max-w-7xl mx-auto py-16">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Star className="w-3.5 h-3.5" />
              <span>Client Reviews & Testimonials</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-100">
              Trusted by Families & Industry Leaders Across Pakistan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="font-display text-xs font-bold text-zinc-100">{t.author}</div>
                  <div className="text-[10px] text-zinc-400">{t.role}</div>
                  <div className="text-[10px] text-amber-400 font-medium mt-0.5">{t.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Interactive FAQ Accordion Section */}
      <section id="faq" className="scroll-mt-24 px-6 md:px-12 max-w-4xl mx-auto py-16 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Curated Inquiries</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setOpenFaqIndex(isOpen ? -1 : index);
                  }}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5"
                >
                  <span className="font-display text-sm font-bold text-zinc-100">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. Direct Concierge Booking & Inquiries Section */}
      <section id="contact" className="scroll-mt-24 px-6 md:px-12 max-w-5xl mx-auto py-20">
        <div className="glass-panel-gold p-8 sm:p-12 md:p-16 rounded-3xl border border-amber-500/40 shadow-2xl relative">
          
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
              <Calendar className="w-4 h-4" />
              <span>Event Consultation & Booking</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-zinc-100">
              Plan Your Next Grand Event
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm font-light">
              Our Senior Event Directors will review your date, discuss your theme and budget, and prepare a custom 3D stage preview with an itemized proposal.
            </p>
          </div>

          {/* If an estimate was locked in from above, display a notification badge */}
          {bookingPrefill && !submittedBooking && (
            <div className="max-w-xl mx-auto mb-8 p-4 rounded-2xl glass-panel-gold border border-amber-400/50 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-zinc-200">
                  Locked Estimate: <strong className="text-amber-300">{bookingPrefill.estimatedRange}</strong> ({bookingPrefill.tier})
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Synced to Form</span>
            </div>
          )}

          {submittedBooking ? (
            <div className="max-w-md mx-auto py-8 text-center space-y-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full glass-panel-gold flex items-center justify-center text-amber-400">
                <CheckCircle2 className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  Event Inquiry Received
                </h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  Thank you, <span className="font-bold text-amber-300">{formState.name}</span>. Your details have been shared with our Senior Event Producer. We will call you or message on WhatsApp within a few hours.
                </p>
              </div>

              <div className="glass-panel-gold p-4 rounded-2xl border border-amber-500/30 w-full">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Inquiry Confirmation Code</div>
                <div className="font-display text-xl font-black text-gold-gradient tracking-widest my-1">
                  {referenceCode}
                </div>
                <div className="text-xs text-zinc-400">
                  Target: {formState.eventType} • {formState.guests} Guests
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSubmittedBooking(false)}
                className="text-xs text-amber-400 hover:underline uppercase font-bold tracking-wider cursor-pointer"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Tariq Malik / Fatima Khan"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleFormChange}
                    placeholder="e.g. tariq@orient-textiles.com.pk"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleFormChange}
                    placeholder="+92 300 1234567"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Event Category *</label>
                  <select
                    name="eventType"
                    value={formState.eventType}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    <option value="Royal Wedding (Mehndi / Barat / Walima)">Royal Wedding (Mehndi / Barat / Walima)</option>
                    <option value="Corporate Gala & Annual Summit">Corporate Gala & Annual Summit</option>
                    <option value="Live Concert & Sufi / Qawwali Night">Live Concert & Sufi / Qawwali Night</option>
                    <option value="Brand Activation & Mall Launch">Brand Activation & Mall Launch</option>
                    <option value="Farmhouse Celebration & Private Dholki">Farmhouse Celebration & Private Dholki</option>
                    <option value="Birthday Party & Family Celebration">Birthday Party & Family Celebration</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Expected Guests *</label>
                  <input
                    type="text"
                    name="guests"
                    required
                    value={formState.guests}
                    onChange={handleFormChange}
                    placeholder="e.g. 450"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Target Date / Month</label>
                  <input
                    type="text"
                    name="eventDate"
                    value={formState.eventDate}
                    onChange={handleFormChange}
                    placeholder="e.g. December 2026 or Exact Date"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">City & Venue</label>
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={handleFormChange}
                    placeholder="e.g. PC Marquee Karachi, Serena, or Farmhouse"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Event Vision & Requirements</label>
                <textarea
                  name="notes"
                  rows={4}
                  value={formState.notes}
                  onChange={handleFormChange}
                  placeholder="Tell us about your event theme, stage requirements, flower preferences, seating style, generator backup needs..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Event Director</span>
              </button>
            </form>
          )}

        </div>
      </section>

      {/* 11. Modern Luxury Footer */}
      <footer className="border-t border-white/10 bg-[#060608] pt-16 pb-12 px-6 md:px-12 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black tracking-[0.2em] text-lg text-zinc-100">VIBE</span>
                <span className="font-display font-light tracking-[0.3em] text-xs text-zinc-400">EVENTS</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-light max-w-sm">
                Pakistan's leading event architecture and production company. Creating unforgettable royal weddings, grand corporate conferences, live concerts, and private celebrations across Karachi and Islamabad.
              </p>
              <div className="text-[11px] text-amber-400 font-semibold">
                Operating Nationwide Across Pakistan • 24/7 Production Unit
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-3">
              <div className="text-zinc-200 font-bold uppercase tracking-wider text-[11px]">Explore</div>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToAnchor('services')} className="hover:text-amber-300 cursor-pointer">Our Services</button></li>
                <li><button onClick={() => scrollToAnchor('portfolio')} className="hover:text-amber-300 cursor-pointer">Recent Events</button></li>
                <li><button onClick={() => scrollToAnchor('estimator')} className="hover:text-amber-300 cursor-pointer">PKR Cost Calculator</button></li>
                <li><button onClick={() => scrollToAnchor('process')} className="hover:text-amber-300 cursor-pointer">How We Work</button></li>
                <li><button onClick={handleSwitchTo3D} className="text-amber-400 hover:underline cursor-pointer">3D Grand Hall</button></li>
              </ul>
            </div>

            {/* Client Policy Pages */}
            <div className="space-y-3">
              <div className="text-zinc-200 font-bold uppercase tracking-wider text-[11px]">Policies & Legal</div>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigateToPolicy('privacy')} 
                    className="hover:text-amber-300 cursor-pointer text-left transition-colors"
                  >
                    Privacy & Family Pardah
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToPolicy('terms')} 
                    className="hover:text-amber-300 cursor-pointer text-left transition-colors"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToPolicy('refund')} 
                    className="hover:text-amber-300 cursor-pointer text-left transition-colors"
                  >
                    Refund & Cancellation
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToPolicy('safety')} 
                    className="hover:text-amber-300 cursor-pointer text-left transition-colors flex items-center gap-1.5"
                  >
                    <span>Power & Event Safety</span>
                    <span className="px-1.5 py-0.5 text-[9px] bg-amber-400/20 text-amber-300 rounded font-semibold">Generator</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct Contacts & Offices */}
            <div className="space-y-3">
              <div className="text-zinc-200 font-bold uppercase tracking-wider text-[11px]">Offices & Contact</div>
              <div className="space-y-2 text-zinc-400 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>+92 (XXX) XXX-XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>info@vibeeventmanagement.com</span>
                </div>
                <div className="pt-1 text-[11px] text-zinc-500 space-y-1">
                  <div><strong>Karachi HQ:</strong> Office #XXX, Business Avenue, Shahrah-e-Faisal</div>
                  <div><strong>Islamabad:</strong> Office #XXX, Blue Area, Jinnah Avenue</div>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={() => scrollToAnchor('contact')}
                    className="px-4 py-2 rounded-full glass-panel-gold border border-amber-400/40 text-amber-300 font-bold text-[11px] uppercase tracking-wider hover:scale-105 transition-all cursor-pointer"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
            <div>© 2026 VIBE EVENTS PAKISTAN. ALL RIGHTS RESERVED.</div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button onClick={() => navigateTo('about')} className="hover:text-zinc-300 cursor-pointer">About VIBE</button>
              <button onClick={() => navigateTo('faq')} className="hover:text-zinc-300 cursor-pointer">FAQs</button>
              <button onClick={() => navigateTo('privacy')} className="hover:text-zinc-300 cursor-pointer">Privacy</button>
              <button onClick={() => navigateTo('terms')} className="hover:text-zinc-300 cursor-pointer">Terms</button>
              <button onClick={() => navigateTo('refund')} className="hover:text-zinc-300 cursor-pointer">Refunds</button>
              <button onClick={() => navigateTo('safety')} className="hover:text-zinc-300 cursor-pointer">Safety</button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-amber-300 flex items-center gap-1 cursor-pointer ml-auto sm:ml-0">
                <span>Back to Top</span>
                <ArrowRight className="w-3 h-3 -rotate-90" />
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
