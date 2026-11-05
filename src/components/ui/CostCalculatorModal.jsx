import { useState, useMemo } from 'react';
import { X, Calculator, Sparkles, Check, ArrowRight, DollarSign } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function CostCalculatorModal() {
  const { activeModal, closeModal, setActiveModal } = useExperienceStore();

  const [eventType, setEventType] = useState('corporate');
  const [guestCount, setGuestCount] = useState(350);
  const [tier, setTier] = useState('luxury');
  const [addons, setAddons] = useState({
    projectionMapping: true,
    droneShow: false,
    michelinCatering: true,
    liveBroadcast: false,
  });

  if (activeModal !== 'calculator') return null;

  const eventTypes = [
    { id: 'corporate', label: 'Corporate Gala / Summit', base: 25000 },
    { id: 'wedding', label: 'Couture Wedding', base: 30000 },
    { id: 'concert', label: 'Concert / Festival', base: 50000 },
    { id: 'brand', label: 'Brand Activation / Pop-Up', base: 22000 },
    { id: 'vip', label: 'Private VIP Celebration', base: 18000 },
  ];

  const tiers = [
    { id: 'signature', label: 'Signature Tier', multiplier: 1.0, desc: 'Essential premium production & lighting' },
    { id: 'luxury', label: 'Grand Luxury', multiplier: 1.5, desc: 'Custom kinetic stage, 4K LED walls & spatial styling' },
    { id: 'sovereign', label: 'Sovereign Masterpiece', multiplier: 2.2, desc: 'Turnkey architectural overhaul, celebrity concierge' },
  ];

  const addonOptions = [
    { id: 'projectionMapping', label: '3D Architectural Projection Mapping', cost: 12000 },
    { id: 'droneShow', label: 'Synchronized 300-Drone Light Show', cost: 24000 },
    { id: 'michelinCatering', label: 'Michelin-Starred Culinary Partnership', cost: 15000 },
    { id: 'liveBroadcast', label: 'Zero-Latency Global 4K Hybrid Stream', cost: 8500 },
  ];

  const estimate = useMemo(() => {
    const selectedType = eventTypes.find((t) => t.id === eventType) || eventTypes[0];
    const selectedTier = tiers.find((t) => t.id === tier) || tiers[1];

    // Base cost scaled by guests
    const guestMultiplier = Math.max(1, guestCount / 100) * 0.45;
    const baseTotal = (selectedType.base + guestCount * 45) * selectedTier.multiplier;

    // Addons cost
    let addonTotal = 0;
    Object.entries(addons).forEach(([key, isChecked]) => {
      if (isChecked) {
        const found = addonOptions.find((a) => a.id === key);
        if (found) addonTotal += found.cost;
      }
    });

    const lowEstimate = Math.round((baseTotal + addonTotal) * 0.9);
    const highEstimate = Math.round((baseTotal + addonTotal) * 1.15);

    return {
      low: lowEstimate.toLocaleString(),
      high: highEstimate.toLocaleString(),
      stageCost: Math.round(baseTotal * 0.45).toLocaleString(),
      avCost: Math.round(baseTotal * 0.35).toLocaleString(),
      hospitalityCost: Math.round(baseTotal * 0.2 + addonTotal).toLocaleString(),
    };
  }, [eventType, guestCount, tier, addons]);

  const toggleAddon = (id) => {
    sound.playClick();
    setAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleProceedToBooking = () => {
    sound.playClick();
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
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#0d0e16]/95 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Calculator className="w-3.5 h-3.5" />
              <span>Transparent Budget Modeling</span>
            </div>
            <h2 className="font-cinzel text-2xl md:text-3xl font-extrabold text-zinc-100">
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
              {eventTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playClick();
                    setEventType(t.id);
                  }}
                  className={`p-3 rounded-2xl text-xs font-semibold text-center transition-all cursor-pointer ${
                    eventType === t.id
                      ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/20 scale-102'
                      : 'glass-panel text-zinc-300 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Guest Count Slider */}
          <div className="space-y-3 glass-panel p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Estimated Guest Attendance
              </label>
              <div className="font-cinzel text-xl font-black text-amber-400">
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
            <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
              <span>50 Intimate VIP</span>
              <span>1,000 Summit</span>
              <span>2,500 Gala</span>
              <span>5,000+ Arena</span>
            </div>
          </div>

          {/* 3. Production Tiers */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Select Production Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tiers.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    sound.playClick();
                    setTier(t.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    tier === t.id
                      ? 'glass-panel-gold border-amber-400/60 shadow-lg shadow-amber-500/10'
                      : 'glass-panel border-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-zinc-100 mb-1">{t.label}</div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">{t.desc}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-amber-400">
                    <span>{t.multiplier}x Scale</span>
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
              {addonOptions.map((addon) => {
                const isChecked = addons[addon.id];
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
                    <span className="text-xs font-bold text-amber-400">+${addon.cost.toLocaleString()}</span>
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
            <div className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-gold-gradient tracking-tight my-2">
              ${estimate.low} – ${estimate.high}
            </div>
            <p className="text-xs text-zinc-400 max-w-md font-light">
              Includes full spatial design, engineering, certified technicians, setup, lead show director, and breakdown.
            </p>

            {/* Quick Breakdown Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-300">
              <span className="px-3 py-1 rounded-full glass-pill">Stage & Decor: ~${estimate.stageCost}</span>
              <span className="px-3 py-1 rounded-full glass-pill">AV & Lighting: ~${estimate.avCost}</span>
              <span className="px-3 py-1 rounded-full glass-pill">Operations & Addons: ~${estimate.hospitalityCost}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 glass-panel flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-zinc-400 text-center sm:text-left">
            Ready to lock in this estimate and consult with our production team?
          </span>
          <button
            onClick={handleProceedToBooking}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Lock in Quote & Reserve Date</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

