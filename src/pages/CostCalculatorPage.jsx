import { useMemo } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles, Layers, DollarSign, Calendar, HelpCircle } from 'lucide-react';
import SubpageLayout from '../components/layout/SubpageLayout';
import { useExperienceStore } from '../store/useExperienceStore';
import { sound } from '../utils/audioSystem';
import { EVENT_TYPES, PRODUCTION_TIERS, ADDON_OPTIONS, calculateEstimate } from '../utils/estimatorLogic';

export default function CostCalculatorPage() {
  const {
    estimatorState,
    updateEstimatorState,
    setBookingPrefill,
    navigateTo,
  } = useExperienceStore();

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

  const setEventType = (newType) => {
    sound.playClick();
    updateEstimatorState({ eventType: newType });
  };

  const setGuestCount = (newCount) => {
    updateEstimatorState({ guestCount: newCount });
  };

  const setTier = (newTier) => {
    sound.playClick();
    updateEstimatorState({ tier: newTier });
  };

  const toggleAddon = (id) => {
    sound.playClick();
    updateEstimatorState({
      addons: {
        ...addons,
        [id]: !addons[id],
      },
    });
  };

  const handleProceedToBooking = () => {
    sound.playClick();
    const activeAddonsList = ADDON_OPTIONS.filter((a) => addons[a.id]).map((a) => a.label);
    const selectedType = EVENT_TYPES.find((t) => t.id === eventType) || EVENT_TYPES[0];
    const selectedTier = PRODUCTION_TIERS.find((t) => t.id === tier) || PRODUCTION_TIERS[1];

    setBookingPrefill({
      eventType: selectedType.label,
      guests: String(guestCount),
      tier: selectedTier.label,
      addons: activeAddonsList,
      estimatedRange: `PKR ${estimate.low} – PKR ${estimate.high}`,
      notes: `[Online Estimate Quote]\nInvestment: PKR ${estimate.low} – PKR ${estimate.high}\nProduction Level: ${selectedTier.label} (${selectedTier.multiplier}x scale)\nAddons: ${activeAddonsList.join(', ') || 'Standard Scope'}\nAllocation: Staging ~PKR ${estimate.stageCost} | AV/Lighting ~PKR ${estimate.avCost} | Hospitality/Addons ~PKR ${estimate.hospitalityCost}`,
    });

    navigateTo('booking');
  };

  return (
    <SubpageLayout
      activeKey="calculator"
      badgeText="Transparent Budget Modeling"
      badgeIcon={Calculator}
      title="Event Investment Estimator"
      subtitle="Calculate realistic production budgets in PKR for royal stages, concert line-array audio, LED video walls, and generator power across Pakistan."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ─── LEFT: INTERACTIVE ESTIMATOR CONTROLS (8 COLS) ─────────────────── */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Event Category Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Step 1: Select Event Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setEventType(t.id)}
                  className={`p-3.5 rounded-2xl text-xs font-semibold text-center transition-all cursor-pointer ${
                    eventType === t.id
                      ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-400/25 scale-[1.02]'
                      : 'glass-panel text-zinc-300 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="font-bold">{t.label}</div>
                  <div className="text-[10px] opacity-80 mt-1">From PKR {t.base.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Guest Count Slider */}
          <div className="space-y-4 glass-panel p-6 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Step 2: Estimated Guest Attendance
                </label>
                <div className="text-xs text-zinc-500 font-light mt-0.5">Scale dictates stage width, audio dispersion, and venue power load</div>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-black text-amber-400">
                {guestCount.toLocaleString()} <span className="text-xs font-normal text-zinc-400">Guests</span>
              </div>
            </div>

            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              {[100, 250, 500, 1000, 2500, 5000].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setGuestCount(count)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                    guestCount === count
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 bg-white/5'
                  }`}
                >
                  {count.toLocaleString()} Guests
                </button>
              ))}
            </div>
          </div>

          {/* 3. Production Level Tiers */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Step 3: Select Production Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRODUCTION_TIERS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTier(t.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                    tier === t.id
                      ? 'glass-panel-gold border-amber-400/60 shadow-xl shadow-amber-500/10 scale-[1.01]'
                      : 'glass-panel border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-display font-bold text-sm text-zinc-100">{t.label}</div>
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300">
                        {t.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light mt-2">{t.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400">
                    <span>{t.multiplier}x Scale Multiplier</span>
                    {tier === t.id && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. High-Concept Enhancements */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Step 4: Optional High-Impact Addons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADDON_OPTIONS.map((addon) => {
                const isChecked = Boolean(addons?.[addon.id]);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-2xl glass-panel border flex items-center justify-between cursor-pointer transition-all ${
                      isChecked ? 'border-amber-400/50 bg-amber-500/10 shadow-md' : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-xs">
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                          isChecked ? 'bg-amber-400 border-amber-400 text-zinc-950' : 'border-zinc-600 bg-zinc-900/50'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-zinc-200 font-medium">{addon.label}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-400">+PKR {addon.cost.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ─── RIGHT: DYNAMIC ESTIMATE SUMMARY (4 COLS) ──────────────────────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* The Big Quote Card */}
          <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-500/40 text-center space-y-4 shadow-2xl">
            <div className="text-xs text-amber-300 uppercase tracking-widest font-bold">
              Estimated Investment Range
            </div>

            <div className="font-display text-3xl sm:text-4xl font-black text-gold-gradient tracking-tight">
              PKR {estimate.low} – {estimate.high}
            </div>

            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              Complete turnkey production scope: 3D CAD modeling, custom staging, line-array audio, stage lighting, silent generator fuel, and on-site directors.
            </p>

            {/* Itemized Budget Allocation Badges */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-left text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Stage & Backdrop Decor:</span>
                <strong className="text-zinc-200">~PKR {estimate.stageCost}</strong>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>AV, LED Screens & Lighting:</span>
                <strong className="text-zinc-200">~PKR {estimate.avCost}</strong>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Operations, Crew & Generators:</span>
                <strong className="text-zinc-200">~PKR {estimate.hospitalityCost}</strong>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleProceedToBooking}
                className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-widest shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lock Quote & Reserve Date</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pricing Policy Guarantees */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3.5 text-xs text-zinc-400 font-light">
            <h4 className="font-display font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Investment Guarantees</span>
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong className="text-zinc-200 font-medium">30-Day Quote Lock:</strong> The calculated investment range is honoured for 30 calendar days upon consultation.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong className="text-zinc-200 font-medium">Transparent Payment Schedule:</strong> 25% – 30% advance booking deposit, balance upon staging completion.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong className="text-zinc-200 font-medium">Zero Hidden Charges:</strong> All transport, generator fuel, sound permits, and technician allowances are bundled.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </SubpageLayout>
  );
}

