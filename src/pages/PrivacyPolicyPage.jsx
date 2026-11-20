import { Lock, ShieldCheck, CheckCircle2, EyeOff, UserCheck, Database, Bell } from 'lucide-react';
import PolicyPageLayout from '../components/policies/PolicyPageLayout';

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageLayout
      policyKey="privacy"
      title="Privacy & Family Data Protection Policy"
      subtitle="Complete transparency on how we handle personal details, guest lists, and confidential private family celebrations across Pakistan."
      badgeText="Client Confidentiality Guarantee"
      icon={Lock}
      lastUpdated="November 2026"
      nextPolicy={{
        key: 'terms',
        label: 'Terms & Conditions',
        desc: 'Understand booking confirmation, milestone payments, venue access, and event delivery.',
      }}
    >
      <div className="space-y-8">
        
        {/* Intro Highlight Box */}
        <div className="p-6 rounded-2xl glass-panel-gold border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Our Privacy Commitment to Pakistani Families & Enterprises</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            At <strong>VIBE Events Pakistan</strong>, we hold our clients’ privacy and cultural family traditions in the highest regard. Whether organizing a high-profile corporate summit in Karachi, an intimate farmhouse Qawwali in Islamabad, or a grand royal Mehndi and Barat in Karachi, your private moments and personal information remain strictly confidential.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <span>Information We Collect & Why</span>
          </h2>
          <p>
            When you use our cost estimator, request a consultation, or communicate with our event producers, we collect minimal and necessary information to design and execute your event:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-1.5">
              <strong className="text-xs font-bold text-zinc-100 block">Personal Identification</strong>
              <p className="text-xs text-zinc-400">Full name, mobile phone number, WhatsApp contact, and email address for project coordination.</p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-1.5">
              <strong className="text-xs font-bold text-zinc-100 block">Event Specifications</strong>
              <p className="text-xs text-zinc-400">Event date, guest count, venue preferences (marquee, banquet hall, farmhouse, or private residence), and budget range.</p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-1.5">
              <strong className="text-xs font-bold text-zinc-100 block">Design & Technical Details</strong>
              <p className="text-xs text-zinc-400">Stage dimensions, floral selections, LED screen specifications, and power generator load requirements.</p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-1.5">
              <strong className="text-xs font-bold text-zinc-100 block">Security & Gate Approvals</strong>
              <p className="text-xs text-zinc-400">Crew CNICs and vehicle registration numbers provided to clients for society gate passes (e.g., DHA, Cantt, Bahria Town).</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <span>Family Pardah & Private Event Media Protocol</span>
          </h2>
          <p>
            We deeply respect the cultural, religious, and personal privacy requirements of Pakistani families:
          </p>
          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex gap-3.5">
              <EyeOff className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-zinc-100 block mb-1">Strict No-Social-Media Guarantee Without Permission</strong>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We will never photograph, film, or post pictures of your private family members, bride, groom, or guests on Instagram, Facebook, TikTok, or our website portfolio without explicit written consent. If you request a zero-media event, our production team will strictly document only empty stages and decor before guests arrive.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/5 flex gap-3.5">
              <UserCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-zinc-100 block mb-1">Female Photography & Management Staffing</strong>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  For Pardah-observing Mehndi, Mayun, and ladies-only functions, we provide vetted all-female photography, videography, and floor coordination teams to ensure total comfort for your family and guests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <span>Zero Third-Party Data Selling or Spam</span>
          </h2>
          <p>
            Your phone number, WhatsApp, and email will never be sold, leased, or transferred to third-party telemarketers, bulk SMS providers, or advertising networks. We hate unsolicited spam calls as much as you do. All communications from VIBE Events are strictly direct messages regarding your active inquiry or upcoming event.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <span>Data Security & Access Controls</span>
          </h2>
          <p>
            All event files, 3D architectural floorplans, technical rigging diagrams, and financial statements are stored on encrypted cloud systems. Access is restricted exclusively to the designated Lead Producer, Technical Director, and Financial Controller managing your project.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 border-t border-white/10 pt-6">
          <h2 className="font-display text-xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">5</span>
            <span>Your Rights as a Client</span>
          </h2>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>You have the right to request the immediate deletion of your contact records once your event is completed and settled.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>You have the right to request a formal Non-Disclosure Agreement (NDA) for high-profile political, corporate, or celebrity gatherings.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>You can update or modify your contact preferences at any time by messaging your assigned Event Director.</span>
            </li>
          </ul>
        </section>

      </div>
    </PolicyPageLayout>
  );
}

