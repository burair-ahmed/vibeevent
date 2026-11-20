import { useMemo } from 'react';
import { X, Calculator, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';
import { EVENT_TYPES, PRODUCTION_TIERS, ADDON_OPTIONS, calculateEstimate } from '../../utils/estimatorLogic';

export default function CostCalculatorModal() {
  const {
    activeModal,
    closeModal,
    setActiveModal,
    estimatorState,
    updateEstimatorState,
    setBookingPrefill,
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

  if (activeModal !== 'calculator') return null;

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

    closeModal();
    setActiveModal('booking');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Event Cost Estimator Modal"
      className="fixed inset-0 z-50 bg-[#07070a]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl max-h-[92vh] bg-[#0c0d15]/98 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Calculator className="w-3.5 h-3.5" />
              <span>Transparent Budget Modeling</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-zinc-100">
              Interactive Event Cost Estimator
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

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* 1. Event Type Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Select Event Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setEventType(t.id)}
                  className={`p-3 rounded-2xl text-xs font-semibold text-center transition-all cursor-pointer ${
                    eventType === t.id
                      ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/20 scale-[1.02]'
                      : 'glass-panel text-zinc-300 hover:text-white'
                  }`}
                >
                  <div className="font-bold">{t.label}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">From PKR {t.base.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Guest Count Slider */}
          <div className="space-y-3 glass-panel p-5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Estimated Guest Attendance
              </label>
              <div className="font-display text-2xl font-bold text-amber-400">
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
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                    guestCount === count
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-300 bg-white/5'
                  }`}
                >
                  {count.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Production Tiers */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Select Production Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRODUCTION_TIERS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTier(t.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    tier === t.id
                      ? 'glass-panel-gold border-amber-400/60 shadow-lg shadow-amber-500/10'
                      : 'glass-panel border-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-sm text-zinc-100">{t.label}</div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-amber-300">
                        {t.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1.5">{t.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-amber-400">
                    <span>{t.multiplier}x Scale Multiplier</span>
                    {tier === t.id && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Optional High-Impact Addons */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              High-Concept Enhancements
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDON_OPTIONS.map((addon) => {
                const isChecked = Boolean(addons?.[addon.id]);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-2xl glass-panel border flex items-center justify-between cursor-pointer transition-all ${
                      isChecked ? 'border-amber-400/50 bg-amber-500/5' : 'border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                          isChecked ? 'bg-amber-400 border-amber-400 text-zinc-950' : 'border-zinc-600'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-zinc-200 font-medium">{addon.label}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-400">+PKR {addon.cost.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estimate Result Display */}
          <div className="p-6 rounded-3xl glass-panel-gold border border-amber-500/40 text-center flex flex-col items-center">
            <div className="text-xs text-amber-300 uppercase tracking-widest font-semibold mb-1">
              Estimated Investment Range
            </div>
            <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-gold-gradient tracking-tight my-2">
              PKR {estimate.low} – PKR {estimate.high}
            </div>
            <p className="text-xs text-zinc-400 max-w-md font-light">
              Includes full spatial pre-vis, turnkey staging, certified audio-visual technicians, lead show producer, and breakdown.
            </p>

            {/* Quick Breakdown Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-300">
              <span className="px-3 py-1 rounded-full glass-pill">Stage & Decor: ~PKR {estimate.stageCost}</span>
              <span className="px-3 py-1 rounded-full glass-pill">AV & Lighting: ~PKR {estimate.avCost}</span>
              <span className="px-3 py-1 rounded-full glass-pill">Operations & Addons: ~PKR {estimate.hospitalityCost}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 glass-panel flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Guaranteed fixed-quote lock for 30 calendar days upon consultation.</span>
          </div>
          <button
            onClick={handleProceedToBooking}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Lock in Quote & Reserve Date</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
