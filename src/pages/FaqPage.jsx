import { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, Search, Phone, Mail, MessageCircle, Calendar, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import SubpageLayout from '../components/layout/SubpageLayout';
import { useExperienceStore } from '../store/useExperienceStore';
import { sound } from '../utils/audioSystem';

export const FAQ_DATABASE = [
  {
    category: 'Booking & Timelines',
    question: "How far in advance should we book for a wedding or corporate event?",
    answer: "For winter wedding season (October to March) and large corporate annual dinners, we recommend booking 2 to 4 months in advance to secure prime dates and custom fabrication slots. However, our rapid response team can also execute urgent corporate summits, private dholkis, and milestone birthday parties within 1 to 2 weeks."
  },
  {
    category: 'Power & Load-Shedding',
    question: "Do you provide full backup generators to protect against load-shedding?",
    answer: "Yes, 100%. Every single event contract includes dual-redundant, soundproof diesel generators (ranging from 100 kVA to 250 kVA) paired with automatic changeover switches (ATS). Your stage lights, sound systems, LED video walls, and air conditioning will continue running seamlessly without even a split-second flicker."
  },
  {
    category: 'Staging & 3D Design',
    question: "Can we inspect a 3D digital model of our stage before physical fabrication begins?",
    answer: "Absolutely! We engineer a photorealistic 3D computerized mockup of your exact venue (whether Royal Palm, PC Marquee, Serena, Marriott, or your private farmhouse lawn). You inspect the stage elevation, floral color palettes, sofa arrangements, and lighting rig in 3D before a single piece of wood is cut."
  },
  {
    category: 'Logistics & Venues',
    question: "Do you arrange events outside Karachi and Islamabad?",
    answer: "Yes. We execute destination weddings, farmhouse celebrations, and corporate conventions across Pakistan, including Karachi, Islamabad, Rawalpindi, Lahore, Faisalabad, Multan, Sialkot, Peshawar, and resort locations like Bhurban with our own heavy mobile transport fleet."
  },
  {
    category: 'Pricing & Payments',
    question: "What are your package budgets and payment milestones?",
    answer: "Our event packages start from PKR 150,000 for boutique birthdays and private dholkis, PKR 450,000 for standard corporate functions, and PKR 850,000 to PKR 5,000,000+ for grand royal weddings and arena concerts. Payments follow transparent milestones: 30% advance on booking, 40% upon fabrication load-in, and 30% prior to event commencement."
  },
  {
    category: 'Staging & 3D Design',
    question: "Do you use fresh imported flowers or artificial floral arches?",
    answer: "We offer both based on your aesthetic preference and budget. Our signature royal wedding packages feature fresh imported Kenyan roses, Dutch hydrangeas, peonies, and locally sourced night-blooming jasmine (Motia) and marigolds (Genda). We also craft high-density silk floral installations for outdoor summer marquees."
  },
  {
    category: 'AV, Special Effects & Permits',
    question: "Are your cold spark pyrotechnics and smoke effects safe for indoor marquees?",
    answer: "Yes. We use certified indoor non-pyrotechnic cold spark fountain machines that produce zero smoke, no burning odor, and emit cold sparks safe to the touch. Our low-fog dry ice machines keep smoke hugging the dancefloor below knee level without triggering overhead hall smoke detectors."
  },
  {
    category: 'Logistics & Venues',
    question: "What happens if it rains or there is unexpected bad weather at an outdoor venue?",
    answer: "For all open lawn and farmhouse gatherings, we prepare comprehensive weather contingencies including transparent German waterproof marquee canopies, elevated waterproof wooden subflooring, industrial outdoor patio gas heaters for winter, and misting fans for summer."
  },
  {
    category: 'Booking & Timelines',
    question: "Do you sign formal contracts and Non-Disclosure Agreements (NDAs)?",
    answer: "Yes. Every client agreement is formalized with an itemized written contract in PKR with zero hidden costs. For high-profile business families, dignitaries, and celebrities, we execute strict NDAs ensuring absolute privacy with restricted backstage and green room access."
  },
  {
    category: 'AV, Special Effects & Permits',
    question: "Do you handle local administration sound permissions and NOCs?",
    answer: "Yes. For public brand activations, concert shows, and outdoor musical events, our legal logistics team coordinates with the relevant district administration (DC office, Cantonment boards, and mall management) to secure the required NOCs and volume permissions."
  }
];

export default function FaqPage() {
  const { navigateTo } = useExperienceStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndexes, setOpenIndexes] = useState([0]); // first open by default

  const categories = ['All', 'Booking & Timelines', 'Power & Load-Shedding', 'Staging & 3D Design', 'Pricing & Payments', 'Logistics & Venues', 'AV, Special Effects & Permits'];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATABASE.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (index) => {
    sound.playClick();
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleExpandAll = () => {
    sound.playClick();
    if (openIndexes.length === filteredFaqs.length) {
      setOpenIndexes([]);
    } else {
      setOpenIndexes(filteredFaqs.map((_, i) => i));
    }
  };

  return (
    <SubpageLayout
      activeKey="faq"
      badgeText="Client Knowledgebase & Guidelines"
      badgeIcon={HelpCircle}
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about planning your wedding, corporate summit, or concert production with VIBE EVENTS across Pakistan."
    >
      <div className="space-y-10">
        
        {/* ─── 1. SEARCH & CATEGORY FILTERING ─────────────────────────────────── */}
        <div className="space-y-5">
          {/* Live Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. generator, 3D preview, payment, rain, wedding season)..."
              className="w-full glass-panel pl-11 pr-4 py-3.5 rounded-2xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 border border-white/10 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/25 scale-[1.02]'
                      : 'glass-pill text-zinc-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={handleExpandAll}
              className="hidden sm:inline-flex text-xs font-semibold text-amber-400 hover:text-amber-300 whitespace-nowrap cursor-pointer shrink-0"
            >
              {openIndexes.length === filteredFaqs.length ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
        </div>

        {/* ─── 2. MAIN ACCORDION GRID + SIDEBAR ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FAQ Accordion List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="p-10 rounded-3xl glass-panel text-center space-y-3">
                <HelpCircle className="w-8 h-8 text-amber-400 mx-auto opacity-70" />
                <h4 className="font-display font-bold text-base text-zinc-200">No matching questions found</h4>
                <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto">
                  Try adjusting your search terms or select "All" categories. You can also chat directly with our production desk.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 rounded-full glass-panel text-xs text-amber-300 hover:text-white mt-2"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndexes.includes(index);
                return (
                  <div
                    key={index}
                    className={`rounded-2xl transition-all border ${
                      isOpen
                        ? 'glass-panel-gold border-amber-400/40 shadow-lg shadow-amber-500/5'
                        : 'glass-panel border-white/5 hover:border-white/20'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90">
                          {faq.category}
                        </span>
                        <h3 className="font-display font-bold text-sm sm:text-base text-zinc-100 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full glass-panel flex items-center justify-center shrink-0 transition-transform duration-200 mt-1 ${
                          isOpen ? 'rotate-180 text-amber-400' : 'text-zinc-400'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed border-t border-white/5 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Consultation CTA */}
            <div className="glass-panel-gold p-6 rounded-3xl border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <MessageCircle className="w-4 h-4" />
                <span>Have a Specific Question?</span>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Every event in Pakistan is unique. Speak directly with our Lead Event Producer to discuss your venue, date availability, and technical setup.
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
                  <span>Email Production:</span>
                  <strong className="text-amber-300 font-bold">info@vibeeventmanagement.com</strong>
                </a>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  navigateTo('booking');
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Consultation</span>
              </button>
            </div>

            {/* Quick Estimator Callout */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Need Budget Transparency?</span>
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Use our interactive cost calculator to model staging, AV, lighting, and generator budgets for your guest count.
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  navigateTo('calculator');
                }}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer pt-1"
              >
                <span>Launch Investment Estimator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Power Guarantee Box */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2.5 text-xs text-zinc-400 font-light">
              <h4 className="font-display font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Zero Load Shedding Promise</span>
              </h4>
              <p>
                Every venue booking is protected by synchronized silent diesel generators with automatic transfer switches. Zero voltage drops, zero interruptions.
              </p>
            </div>

          </div>

        </div>

      </div>
    </SubpageLayout>
  );
}
