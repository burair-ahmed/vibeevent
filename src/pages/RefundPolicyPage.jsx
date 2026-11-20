import { RefreshCw, Calendar, AlertTriangle, ShieldCheck, CheckCircle2, Clock, Check } from 'lucide-react';
import PolicyPageLayout from '../components/policies/PolicyPageLayout';

export default function RefundPolicyPage() {
  return (
    <PolicyPageLayout
      policyKey="refund"
      title="Refund & Cancellation Policy"
      subtitle="Clear and accommodating guidelines for event rescheduling, date changes, and cancellation terms across Pakistan."
      badgeText="Fair & Flexible Terms"
      icon={RefreshCw}
      lastUpdated="November 2026"
      nextPolicy={{
        key: 'safety',
        label: 'Safety & Power Backup Policy',
        desc: 'Discover our zero load shedding guarantee, silent backup generators, and fire safety protocols.',
      }}
    >
      <div className="space-y-8">
        
        {/* Intro Highlight Box */}
        <div className="p-6 rounded-2xl glass-panel-gold border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Accommodating Life's Unpredictable Changes</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            We understand that wedding dates, corporate approvals, and family plans can shift unexpectedly. Our refund and rescheduling policy is built to be fair, practical, and transparent, balancing our commitments to vendors and craftsmen with maximum flexibility for your family or company.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <span>Free Date Rescheduling Window</span>
          </h2>
          <p>
            If your venue date changes or family schedules require moving your event:
          </p>
          <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Check className="w-4 h-4" />
              <span>100% Deposit Transfer with 14+ Days Notice</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              If you notify us at least <strong>14 calendar days prior</strong> to your original event date, 100% of your paid advance deposit will be credited toward your new date within a 12-month window, subject to team and inventory availability on that date. There are zero cancellation penalties or transfer fees.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <span>Cancellation Notice Tiers & Refund Percentages</span>
          </h2>
          <p>
            When an event is permanently cancelled without a new date, refunds are processed according to the following schedule:
          </p>
          
          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-start justify-between gap-4">
              <div>
                <strong className="text-xs font-bold text-zinc-100 block mb-1">Notice 30+ Days Before Event</strong>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong>70% Refund</strong> of advance deposit, or 100% converted into a transferable credit voucher valid for any future wedding, birthday, or corporate booking within 12 months.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 shrink-0">70% Refund</span>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-start justify-between gap-4">
              <div>
                <strong className="text-xs font-bold text-zinc-100 block mb-1">Notice 15 to 29 Days Before Event</strong>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong>40% Refund</strong> of advance deposit. (60% covers locked subcontractor bookings, custom welding/carpentry already initiated, and equipment hold loss).
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 shrink-0">40% Refund</span>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-start justify-between gap-4">
              <div>
                <strong className="text-xs font-bold text-zinc-100 block mb-1">Notice Under 14 Days Before Event</strong>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong>Non-refundable deposit</strong>. Fresh imported cut flowers (roses, baby’s breath, hydrangeas), printed backdrops, and technical crew allocations have already been fully disbursed and purchased.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 shrink-0">Non-Refundable</span>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <span>Force Majeure, Weather & State Curfews</span>
          </h2>
          <p>
            In the event of circumstances completely beyond human control:
          </p>
          <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Severe Weather, Monsoon Rains & Official Road Closures</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              If an event cannot take place due to severe weather flooding, natural disasters, sudden governmental security curfews, or road blockages, VIBE Events will reschedule your production to the earliest safe date with <strong>zero forfeiture of funds</strong>.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4 border-t border-white/10 pt-6">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <span>Refund Processing Timelines</span>
          </h2>
          <p>
            Approved refunds are disbursed via direct Pakistani bank wire transfer (IBFT) or company cross cheque within <strong>7 business days</strong> of written cancellation confirmation.
          </p>
        </section>

      </div>
    </PolicyPageLayout>
  );
}

