import { useState } from 'react';
import { X, Calendar, Sparkles, CheckCircle2, Send, Clock, Phone, Mail, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function BookingModal() {
  const { activeModal, closeModal, activeService } = useExperienceStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: activeService?.shortTitle || 'Corporate',
    eventDate: '',
    guests: '250',
    location: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  if (activeModal !== 'booking') return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();

    // Trigger golden celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#d4af37', '#ffffff'],
      });
    } catch {}

    const generatedCode = 'VIBE-' + Math.floor(100000 + Math.random() * 900000);
    setRefCode(generatedCode);
    setSubmitted(true);
  };

  const handleClose = () => {
    sound.playClick();
    setSubmitted(false);
    closeModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="VIP Booking Consultation Modal"
      className="fixed inset-0 z-50 bg-[#07070a]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl max-h-[92vh] bg-[#0d0e16]/95 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Direct Concierge Booking</span>
            </div>
            <h2 className="font-cinzel text-2xl md:text-3xl font-extrabold text-zinc-100">
              {submitted ? 'Inquiry Confirmed' : 'Reserve Consultation'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full glass-panel-gold flex items-center justify-center text-amber-400">
                <CheckCircle2 className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-zinc-100 mb-2">
                  We Have Received Your Event Brief
                </h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <span className="font-bold text-amber-300">{formData.name}</span>. Our Senior Production Director will review your specifications and contact you within 4 business hours.
                </p>
              </div>

              {/* Reference Ticket Box */}
              <div className="glass-panel-gold p-4 rounded-2xl border border-amber-500/30 w-full max-w-sm">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Inquiry Reference Code</div>
                <div className="font-cinzel text-xl font-black text-gold-gradient tracking-widest my-1">
                  {refCode}
                </div>
                <div className="text-xs text-zinc-400">
                  Target Event: {formData.eventType} • {formData.guests} Guests
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Return to 3D Experience
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Full Name / Title *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Lord Julian Vance"
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="julian@vancegroup.com"
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Event Category</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400 border border-white/10 bg-[#0d0e16]"
                  >
                    <option value="Corporate">Corporate Gala / Summit</option>
                    <option value="Weddings">Couture Wedding</option>
                    <option value="Concerts">Concert / Arena Show</option>
                    <option value="VIP Celebrations">Private VIP Celebration</option>
                    <option value="Brand Activations">Brand Activation</option>
                    <option value="AV & Lighting">AV & Stage Production</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Estimated Guests</label>
                  <input
                    type="text"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    placeholder="e.g. 350"
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Target Date / Season</label>
                  <input
                    type="text"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    placeholder="e.g. October 2025 / Summer"
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Destination City / Venue</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. New York, Lake Como, Dubai"
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Vision, Staging Requirements & Details</label>
                <textarea
                  rows="3"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Share details regarding thematic direction, celebrity entertainment, technical rigging, or catering needs..."
                  className="w-full glass-panel px-4 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Event Brief & Request Date</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

