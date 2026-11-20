import { useState } from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Zap, Lock, CheckCircle2, AlertTriangle, PhoneCall } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function PolicyModal() {
  const { activeModal, closeModal, activePolicyTab, setActivePolicyTab, setActiveModal } = useExperienceStore();
  const [currentTab, setCurrentTab] = useState(activePolicyTab || 'privacy');

  // Sync state if activePolicyTab changes from outside
  const tab = activePolicyTab || currentTab;

  if (activeModal !== 'policy') return null;

  const handleTabChange = (newTab) => {
    sound.playClick();
    setCurrentTab(newTab);
    if (setActivePolicyTab) {
      setActivePolicyTab(newTab);
    }
  };

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'refund', label: 'Refund & Cancellation', icon: RefreshCw },
    { id: 'safety', label: 'Safety & Power Backup', icon: Zap },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="VIBE Events Official Policies"
      className="fixed inset-0 z-50 bg-[#07070a]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl max-h-[92vh] bg-[#0c0d15]/98 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100">
        
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-zinc-900/50 to-transparent">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Official Client Agreements & Transparency</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-zinc-100">
              VIBE Events Operational Policies
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-light">
              Clear, honest, and straightforward terms tailored for events across Pakistan.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              closeModal();
            }}
            aria-label="Close Policies Modal"
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex border-b border-white/10 overflow-x-auto bg-[#0a0b12] px-6 pt-3 gap-2 scrollbar-none">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-amber-400 text-amber-300 bg-white/5 font-bold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Policy Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-sm text-zinc-300 leading-relaxed font-light">
          
          {/* TAB 1: PRIVACY POLICY */}
          {tab === 'privacy' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-l-2 border-amber-400 pl-4 py-1">
                <h3 className="font-display text-xl font-bold text-zinc-100">Privacy & Data Protection Policy</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Last updated: November 2026 • Applicable across all Pakistani operations</p>
              </div>

              <p>
                At <strong className="text-zinc-100 font-semibold">VIBE Events Pakistan</strong>, we understand that weddings, private family celebrations, and corporate functions require absolute trust and discretion. We treat your personal details, event dates, guest lists, and contact numbers with strict confidentiality.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    1. Information We Collect
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    When you request an estimate, submit a booking form, or speak with our event coordinators on WhatsApp or phone, we collect:
                  </p>
                  <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1 mt-2 pl-2">
                    <li>Your full name and contact information (mobile number, WhatsApp, email address).</li>
                    <li>Event specifications (event type, guest count, preferred city, marquee/hall/farmhouse venue, and event dates).</li>
                    <li>Budget expectations and specific design/staging preferences.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    2. Strict Non-Disclosure & Private Family Events (Pardah / Discretion)
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    For private family weddings, Barat, Mehndi, and VIP gatherings, we strictly respect your privacy preferences. We will never publish photos or videos of your private family functions on our social media or portfolio without explicit prior written or WhatsApp consent from the host.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    3. No Third-Party Spam or Data Sharing
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    We never sell, rent, or trade your phone number or email to external marketing agencies or SMS spam vendors. Your details are used solely by our internal event directors to coordinate and execute your event.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS & CONDITIONS */}
          {tab === 'terms' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-l-2 border-amber-400 pl-4 py-1">
                <h3 className="font-display text-xl font-bold text-zinc-100">Booking Terms & Conditions</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Clear booking rules, payment milestones, and event responsibilities</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    1. Booking Confirmation & Advance Deposit
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Event dates in Pakistan (especially peak wedding dates from October to March) fill up quickly. A booking is formally confirmed once an initial <strong className="text-zinc-200">reservation advance (typically 25% to 30%)</strong> is received and an event agreement is issued. Tentative verbal holds are valid for 72 hours only.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    2. Payment Schedule Milestones
                  </h4>
                  <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1.5 pl-2">
                    <li><strong className="text-zinc-200">Advance Deposit (25-30%):</strong> Paid at the time of contract signing to block dates, order custom structures, and reserve equipment.</li>
                    <li><strong className="text-zinc-200">Mid-Payment (50%):</strong> Paid 7 days prior to the event upon final design, stage mockup, and floral approval.</li>
                    <li><strong className="text-zinc-200">Final Balance (20-25%):</strong> Cleared on the day of setup handover before the event starts.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    3. Venue Access & Local Permissions (NOCs)
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    The client is responsible for booking the venue (e.g. Marquee, Hotel Hall, Farmhouse, or Private Lawn). For setups in gated societies such as DHA, Bahria Town, or Cantonment areas, the client coordinates entry gate passes. VIBE Events provides all necessary vehicle numbers and crew CNIC copies in advance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    4. Setup Timelines & Handover
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Our production team requires access to the venue between 6 to 18 hours prior to guest arrival (depending on the scale of the stage and floral installation). We guarantee complete setup testing (lighting, sound, and generators) at least 1 hour before event kickoff.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REFUND & CANCELLATION */}
          {tab === 'refund' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-l-2 border-amber-400 pl-4 py-1">
                <h3 className="font-display text-xl font-bold text-zinc-100">Refund & Cancellation Policy</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Fair and flexible policies for date changes, delays, and cancellations</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    1. Date Rescheduling (Free Subject to Availability)
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    We understand that weddings and family plans can shift. If you notify us at least <strong className="text-zinc-200">14 days in advance</strong>, we will transfer 100% of your paid deposit to your new proposed date, subject to our team and equipment availability on that date.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-cyan-400 shrink-0" />
                    2. Cancellation Notice Tiers
                  </h4>
                  <ul className="list-disc list-inside text-xs text-zinc-400 space-y-2 pl-2">
                    <li><strong className="text-zinc-200">Cancellations 30+ days prior:</strong> 70% of advance deposit is refunded (or 100% converted into future credit valid for 12 months).</li>
                    <li><strong className="text-zinc-200">Cancellations 15 to 29 days prior:</strong> 40% of advance deposit is refunded, accounting for equipment reservation locks and vendor pre-bookings.</li>
                    <li><strong className="text-zinc-200">Cancellations within 14 days of event:</strong> Non-refundable, as fresh imported flowers, custom stage carpentry, and crew schedules have already been paid for and initiated.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5">
                  <h4 className="font-semibold text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    3. Unforeseen Emergency & Weather (Force Majeure)
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    In the case of unexpected heavy rain, extreme weather, official state curfews, or road closures, we prioritize safety and immediate date accommodation without forfeiture of fees.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAFETY & POWER BACKUP */}
          {tab === 'safety' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-l-2 border-amber-400 pl-4 py-1">
                <h3 className="font-display text-xl font-bold text-zinc-100">Safety, Power & Electricity Guarantee</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Zero load shedding disruption and strict on-site physical safety standards</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Guaranteed Soundproof Generators</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Power outages (WAPDA / K-Electric load shedding) are never an issue. We deploy dedicated sound-proof diesel generators with automatic phase changers, keeping stages, LED screens, and ACs running with zero drop.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Certified Electrical Rigging</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    All wiring is industrial-grade, fully insulated, taped securely under ramps, and routed through surge-protected distribution panels to protect guests and children.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Cold Spark & Fire Safety</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Our entrance sparklers are certified 100% smokeless cold pyrotechnics that do not burn clothes or flowers. We keep functional fire extinguishers on site during all live shows.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <PhoneCall className="w-4 h-4" />
                    <span>24/7 Dedicated Event Lead</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    You receive the direct mobile number of your dedicated on-site Event Producer who stays at the venue from initial setup until the last guest departs.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Support CTA */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#090a10] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-zinc-400 flex items-center gap-2">
            <span>Have questions about our agreements? Call or WhatsApp our helpline:</span>
            <span className="text-amber-400 font-bold">+92 (XXX) XXX-XXXX</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                closeModal();
                setActiveModal('booking');
              }}
              className="px-5 py-2.5 rounded-full bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Book Your Event
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

