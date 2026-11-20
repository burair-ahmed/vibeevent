import { FileText, CheckCircle2, AlertCircle, Clock, ShieldCheck, MapPin, DollarSign, Wallet } from 'lucide-react';
import PolicyPageLayout from '../components/policies/PolicyPageLayout';

export default function TermsConditionsPage() {
  return (
    <PolicyPageLayout
      policyKey="terms"
      title="Terms & Conditions of Service"
      subtitle="The operational agreement governing event bookings, milestone payments in PKR, venue setup protocols, and mutual client obligations."
      badgeText="Operational Agreement"
      icon={FileText}
      lastUpdated="November 2026"
      nextPolicy={{
        key: 'refund',
        label: 'Refund & Cancellation Policy',
        desc: 'Understand cancellation schedules, advance deposit handling, and free rescheduling windows.',
      }}
    >
      <div className="space-y-8">
        
        {/* Intro Highlight Box */}
        <div className="p-6 rounded-2xl glass-panel-gold border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Clear, Honest & Legally Binding Terms</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            By reserving an event date with <strong>VIBE Events Pakistan</strong> (via formal invoice, advance deposit, or signed digital agreement), the client agrees to the following terms and conditions. These policies are designed to protect both parties and ensure flawless event execution across all venues in Pakistan.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <span>Booking Confirmation & Date Reservation</span>
          </h2>
          <p>
            Due to intense demand during peak seasons (especially Pakistani winter wedding season from October through March and corporate conference quarters), dates are reserved strictly on a first-come, first-served basis:
          </p>
          <ul className="space-y-2 text-xs text-zinc-300 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Verbal Holds:</strong> A tentative verbal or WhatsApp hold on a date is valid for a maximum of <strong>72 hours</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Formal Confirmation:</strong> A booking is officially locked in only upon receipt of the initial advance deposit and issuance of our signed booking invoice.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Once confirmed, VIBE Events locks crew, fabrication capacity, and proprietary technical inventory exclusively for your event.</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <span>Payment Milestone Structure (PKR)</span>
          </h2>
          <p>
            All costs are quoted and settled transparently in Pakistani Rupees (PKR) through direct bank transfer, pay order, or crossed cheque under the following standard milestone schedule:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Milestone 01</div>
              <div className="font-display text-xl font-bold text-zinc-100">30% Advance</div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Payable at contract signing to lock the date, begin 3D spatial models, and initiate structural carpentry and raw metal framing.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Milestone 02</div>
              <div className="font-display text-xl font-bold text-zinc-100">40% Fabrication</div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Payable 7 to 10 days before the event upon client approval of floral imports, stage mockups, and AV truss arrangements.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Milestone 03</div>
              <div className="font-display text-xl font-bold text-zinc-100">30% Handover</div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Cleared on the event day prior to guest arrival once complete lighting, audio, stage, and generator tests are formally verified.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <span>Venue Access, Gate Passes & Local NOCs</span>
          </h2>
          <div className="space-y-3">
            <p>
              To ensure uncompromised quality, our production crew requires adequate venue access prior to event start:
            </p>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
              <strong className="text-xs font-bold text-zinc-100 block">Setup Timings Required:</strong>
              <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1 pl-2">
                <li><strong>Weddings & Large Marquees:</strong> 8 to 14 hours prior to event kickoff for truss rigging, flower dressing, and stage fabrication.</li>
                <li><strong>Corporate Conferences & Exhibitions:</strong> Previous evening or minimum 6 hours before registration opens.</li>
                <li><strong>Private Farmhouse & Birthday Events:</strong> 4 to 8 hours prior to guest arrival.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
              <strong className="text-xs font-bold text-zinc-100 block">Security Passes (DHA, Cantt, Askari, Bahria):</strong>
              <p className="text-xs text-zinc-400 leading-relaxed">
                For setups in gated residential or military societies, the client assists in obtaining entrance gate permission. VIBE Events supplies all staff CNIC copies, vehicle numbers, and crew rosters at least 48 hours prior.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <span>Government Regulations, Curfews & Decibel Limits</span>
          </h2>
          <p>
            All productions adhere to local district administration regulations (e.g., Punjab sound ordinances, Sindh EPA regulations, Islamabad Capital Territory event closing curfews). While our sound systems are concert-grade, we tune directional sound arrays to comply with local noise regulations and prevent administrative disruptions.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 border-t border-white/10 pt-6">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">5</span>
            <span>Equipment Safety & Client Liability</span>
          </h2>
          <p>
            VIBE Events assumes complete responsibility for equipment operation and structural safety. Clients are solely responsible for deliberate damage caused by unruly guests or intentional vandalism to technical installations (e.g. LED screen impacts, physical stage tampering).
          </p>
        </section>

      </div>
    </PolicyPageLayout>
  );
}

