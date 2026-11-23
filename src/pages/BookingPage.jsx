import { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Send, Phone, Mail, MapPin, Calculator, ShieldCheck, Clock, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import SubpageLayout from '../components/layout/SubpageLayout';
import { useExperienceStore } from '../store/useExperienceStore';
import { sound } from '../utils/audioSystem';

export default function BookingPage() {
  const { activeService, bookingPrefill, clearBookingPrefill, navigateTo, setViewMode } = useExperienceStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Corporate Gala / Summit',
    eventDate: '',
    guests: '350',
    location: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  useEffect(() => {
    if (bookingPrefill) {
      setFormData((prev) => ({
        ...prev,
        eventType: bookingPrefill.eventType || prev.eventType,
        guests: String(bookingPrefill.guests || prev.guests),
        notes: bookingPrefill.notes || prev.notes,
      }));
    } else if (activeService) {
      setFormData((prev) => ({
        ...prev,
        eventType: activeService.title || activeService.shortTitle || prev.eventType,
      }));
    }
  }, [bookingPrefill, activeService]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();

    // Trigger golden celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#d4af37', '#ffffff'],
      });
    } catch {}

    const generatedCode = 'VIBE-' + Math.floor(100000 + Math.random() * 900000);
    setRefCode(generatedCode);
    setSubmitted(true);
  };

  const handleResetForm = () => {
    sound.playClick();
    setSubmitted(false);
    clearBookingPrefill();
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: 'Corporate Gala / Summit',
      eventDate: '',
      guests: '350',
      location: '',
      notes: '',
    });
  };

  return (
    <SubpageLayout
      activeKey="booking"
      badgeText="VIP Concierge Booking & Date Reservation"
      badgeIcon={Calendar}
      title="Reserve Your Event Consultation"
      subtitle="Connect directly with our Senior Production Directors. We will prepare your custom spatial floorplan, budget breakdown, and 3D mockups."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ─── LEFT: MAIN FORM OR CONFIRMATION (8 COLS) ──────────────────────── */}
        <div className="lg:col-span-8">
          {submitted ? (
            <div className="glass-panel-gold p-8 sm:p-12 rounded-3xl border border-amber-500/40 text-center space-y-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full glass-panel-gold flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/20">
                <CheckCircle2 className="w-10 h-10 text-amber-400" />
              </div>

              <div className="space-y-2 max-w-lg">
                <div className="text-xs font-bold uppercase tracking-widest text-amber-400">Brief Transmitted Successfully</div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100">
                  We Have Received Your Event Inquiry
                </h2>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  Thank you, <strong className="text-amber-300 font-semibold">{formData.name}</strong>. Our Senior Production Director has received your event brief and will contact you via phone/WhatsApp within 4 business hours.
                </p>
              </div>

              {/* Inquiry Reference Ticket Card */}
              <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 w-full max-w-md space-y-2 text-center">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Official Inquiry Reference</div>
                <div className="font-display text-2xl sm:text-3xl font-black text-gold-gradient tracking-widest">
                  {refCode}
                </div>
                <div className="pt-2 border-t border-white/10 text-xs text-zinc-300 flex items-center justify-between">
                  <span>Category: <strong>{formData.eventType}</strong></span>
                  <span>Scale: <strong>{formData.guests} Guests</strong></span>
                </div>
              </div>

              {/* What Happens Next Timeline */}
              <div className="w-full max-w-md text-left glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                  Next Steps in Your Production
                </h4>
                <div className="space-y-2.5 text-xs text-zinc-400 font-light">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                    <span>Direct phone or WhatsApp briefing call to confirm venue availability and date.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                    <span>Complimentary venue site inspection and acoustic assessment by our technicians.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                    <span>3D CAD mockup & line-item PKR proposal delivery within 48 hours.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-full glass-panel text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setViewMode('3d');
                    navigateTo('home');
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Return to 3D Hall
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6">
              {/* Attached Quote Banner (if user navigated from Cost Calculator) */}
              {bookingPrefill && (
                <div className="p-4 rounded-2xl glass-panel-gold border border-amber-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-amber-400 shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-zinc-100">
                        Attached Estimate: <strong className="text-amber-300">{bookingPrefill.estimatedRange}</strong>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-light">
                        {bookingPrefill.tier} production tier • {bookingPrefill.guests} estimated attendees
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    Pre-Filled Quote
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Full Name / Organization *</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Mr. & Mrs. Malik / Habib Bank Limited"
                      className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yourname@domain.com"
                      className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Event Category</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400 border border-white/10 bg-[#0d0e16] transition-colors"
                    >
                      <option value="Weddings">Wedding / Barat / Walima / Mehndi</option>
                      <option value="Corporate">Corporate Gala / Conference / Summit</option>
                      <option value="Concerts">Concert / Qawwali Night / Sufi Show</option>
                      <option value="Birthday Parties">Birthday Party / Milestone Jubilee</option>
                      <option value="VIP Celebrations">Private Farmhouse / Lawn Soirée</option>
                      <option value="Brand Activations">Brand Activation / Store Launch / Pop-up</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Estimated Guests</label>
                    <input
                      type="text"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder="e.g. 500"
                      className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Target Date / Month / Season</label>
                    <input
                      type="text"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      placeholder="e.g. December 2026 / Winter Wedding Season"
                      className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">City & Preferred Venue</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Karachi / Islamabad (Marquee, Hotel, or Farmhouse)"
                      className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Vision, Staging Requirements & Details</label>
                  <textarea
                    rows="4"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Share specific desires regarding stage aesthetic, fresh flowers vs acrylic, line-array audio, LED wall dimensions, celebrity talent, or generator backup..."
                    className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10 transition-colors"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-widest shadow-xl shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Event Brief & Request Date</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* ─── RIGHT: CONCIERGE INFORMATION & GUARANTEES (4 COLS) ────────────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Direct Concierge Hotlines */}
          <div className="glass-panel-gold p-6 rounded-3xl border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Phone className="w-4 h-4" />
              <span>Direct Concierge Desks</span>
            </div>
            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              Prefer speaking with a human right away? Connect with our Senior Event Producer for immediate date verification.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <a
                href="tel:+923001234567"
                className="w-full p-3 rounded-xl glass-panel text-zinc-200 hover:text-white hover:border-amber-400/50 flex items-center justify-between transition-colors"
              >
                <span>Helpline / WhatsApp:</span>
                <strong className="text-amber-300 font-bold">+92 (300) 123-4567</strong>
              </a>
              <a
                href="mailto:info@vibeeventmanagement.com"
                className="w-full p-3 rounded-xl glass-panel text-zinc-200 hover:text-white hover:border-amber-400/50 flex items-center justify-between transition-colors"
              >
                <span>Email Concierge:</span>
                <strong className="text-amber-300 font-bold">info@vibeeventmanagement.com</strong>
              </a>
            </div>
          </div>

          {/* Operational Guarantees */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Production Guarantees</span>
            </h4>
            <div className="space-y-3 text-xs text-zinc-400 font-light">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Zero Load Shedding: Dual silent diesel generators with automatic transfer switches.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Fixed-Price Guarantee: All taxes, logistics, and crew allowances included in writing.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Confidentiality: Strict NDA & VIP privacy protection for family and high-profile guests.</span>
              </div>
            </div>
          </div>

          {/* Regional Offices */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 text-xs">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Production Hubs</span>
            </h4>
            <div className="space-y-2 text-zinc-400 font-light">
              <div>
                <strong className="text-zinc-200 font-medium">Sindh:</strong> Clifton & DHA Phase 6, Karachi
              </div>
              <div>
                <strong className="text-zinc-200 font-medium">Federal & North:</strong> Blue Area, Sector F-6, Islamabad
              </div>
              <div>
                <strong className="text-zinc-200 font-medium">Punjab & Resort:</strong> Gulberg III, Lahore & Bhurban
              </div>
            </div>
          </div>

        </div>

      </div>
    </SubpageLayout>
  );
}

