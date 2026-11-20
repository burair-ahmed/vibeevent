import { Zap, ShieldCheck, AlertTriangle, Flame, PhoneCall, CheckCircle2, Award, Power } from 'lucide-react';
import PolicyPageLayout from '../components/policies/PolicyPageLayout';

export default function SafetyPolicyPage() {
  return (
    <PolicyPageLayout
      policyKey="safety"
      title="Event Safety, Power Backup & Generator Policy"
      subtitle="Guaranteed zero load shedding interruption, industrial fire standards, indoor cold pyrotechnics, and guest physical safety protocols."
      badgeText="Zero Blackout Guarantee"
      icon={Zap}
      lastUpdated="November 2026"
      nextPolicy={{
        key: 'privacy',
        label: 'Privacy & Family Data Protection',
        desc: 'Review our Pardah protection guarantees, female photography staffing, and non-disclosure standards.',
      }}
    >
      <div className="space-y-8">
        
        {/* Intro Highlight Box */}
        <div className="p-6 rounded-2xl glass-panel-gold border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm uppercase tracking-wider">
            <Power className="w-4 h-4" />
            <span>Uninterrupted Power for Every Celebration</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            In Pakistan, municipal power disruptions (WAPDA / LESCO / K-Electric load shedding) are a reality. At <strong>VIBE Events</strong>, our core engineering standard ensures your wedding stage, LED screens, sound systems, and air conditioning operate seamlessly without even a split-second flicker.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <span>Soundproof Diesel Generator Redundancy</span>
          </h2>
          <p>
            Every large wedding, gala, and concert setup includes our dedicated mobile power infrastructure:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
              <strong className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Dual-Redundant Capacity (100kVA – 250kVA)</strong>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We deploy primary and standby generators calibrated to handle 140% of the total event electrical load (lighting truss, moving heads, audio subwoofers, HD LED walls, and food warmers).
              </p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
              <strong className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Automatic Transfer Switch (ATS)</strong>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our power distribution panels utilize industrial microsecond ATS units. If city electricity cuts out, our generator system maintains voltage stability with zero shutdown.
              </p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
              <strong className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Acoustic Soundproofing</strong>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All generators are enclosed in high-grade acoustic dampening canopies and positioned at least 30 meters away from guest seating to ensure zero engine noise during speeches and vows.
              </p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
              <strong className="text-xs font-bold text-zinc-200 uppercase tracking-wider block">Full On-Site Fuel Reserves</strong>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Generators arrive with 100% full diesel tanks plus secondary on-site fuel reserve cans, sufficient for up to 16 continuous hours of high-load operation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <span>Electrical Wiring & Cable Safety Protocols</span>
          </h2>
          <p>
            With hundreds of family members, elders, and children walking across the venue, physical safety is paramount:
          </p>
          <ul className="space-y-2 text-xs text-zinc-300 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Heavy-Duty Cable Ramps:</strong> All high-voltage electrical lines crossing walkways and carpets are secured beneath yellow high-visibility rubber cable bridges to prevent tripping.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Grounding & Surge Protection:</strong> Every distribution box is grounded with certified earth-leakage circuit breakers (ELCB) that instantly trip within 30 milliseconds if moisture or faults occur.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Waterproof Junctions:</strong> For outdoor lawn, poolside, and farmhouse events, all outdoor junction boxes are rated IP65 weatherproof.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <span>Cold Pyrotechnics (Sparklers) & Fire Safety</span>
          </h2>
          <div className="space-y-3">
            <p>
              Entrance sparkle fountains and grand reveal effects are iconic at Pakistani weddings:
            </p>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>100% Smokeless Indoor Cold Sparklers</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                We do NOT use traditional dangerous gunpowder fireworks indoors. We use certified titanium-composite cold spark machines (producing granules that burn below 62°F). The sparks are completely touchable, emit no smoke, and will not burn wedding dresses, fresh floral arches, or marquee fabrics.
              </p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
              <strong className="text-xs font-bold text-zinc-100 block">Fire Safety Readiness:</strong>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Functional dry chemical powder (ABC) fire extinguishers are stationed at the generator enclosure, backstage technical bay, and main marquee catering entrance.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <span>Structural Rigging & Stage Load Limits</span>
          </h2>
          <p>
            All custom wedding stages, elevated groom sofa platforms, and overhead lighting trusses are engineered with structural steel and certified aviation-grade aluminum trusses. We enforce strict load limits, ensuring stages withstand dance performances, large bridal entourages, and high guest foot traffic without shaking or sagging.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 border-t border-white/10 pt-6">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">5</span>
            <span>Dedicated On-Site Safety Lead</span>
          </h2>
          <p>
            From the minute the first truck arrives until the final piece of truss is packed up, an accredited <strong>Safety & Electrical Engineer</strong> remains permanently stationed on-site with full authority to monitor equipment temperatures, electrical loads, and crowd passageways.
          </p>
        </section>

      </div>
    </PolicyPageLayout>
  );
}

