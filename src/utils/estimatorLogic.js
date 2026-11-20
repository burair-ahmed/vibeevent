export const EVENT_TYPES = [
  { id: 'wedding', label: 'Wedding / Barat / Walima', base: 250000, icon: 'Heart', subtitle: 'Royal Stage, Fresh Flowers & Entry' },
  { id: 'corporate', label: 'Corporate Gala / Conference', base: 180000, icon: 'Building2', subtitle: 'LED Screens, Stage & Audio' },
  { id: 'concert', label: 'Concert / Qawwali Night', base: 300000, icon: 'Music', subtitle: 'Line Array Audio, Lights & Truss' },
  { id: 'birthday', label: 'Theme Birthday Party', base: 80000, icon: 'Sparkles', subtitle: 'Backdrop, Balloons & Neon Lights' },
  { id: 'vip', label: 'Private Farmhouse / Family Party', base: 120000, icon: 'Crown', subtitle: 'Lawn Fairy Lights & Cozy Lounge' },
  { id: 'brand', label: 'Brand Activation / Mall Stall', base: 150000, icon: 'Sparkles', subtitle: 'Interactive Kiosk & Selfie Zone' },
];

export const PRODUCTION_TIERS = [
  { 
    id: 'signature', 
    label: 'Standard Elegance', 
    multiplier: 1.0, 
    badge: 'Essential Setup',
    desc: 'Clean, elegant stage setup, high-quality audio system, warm mood lighting, and on-site supervisor.' 
  },
  { 
    id: 'luxury', 
    label: 'Grand Luxury', 
    multiplier: 1.5, 
    badge: 'Most Popular',
    desc: 'Wider custom stage, imported fresh floral accents, moving intelligent lights, LED screens, and full team.' 
  },
  { 
    id: 'sovereign', 
    label: 'Royal Shahi Production', 
    multiplier: 2.2, 
    badge: 'Turnkey Grandeur',
    desc: 'Majestic palace-style floral stage, overhead fairy-light canopy, cold firework fountains, and VIP concierge.' 
  },
];

export const ADDON_OPTIONS = [
  { 
    id: 'soundproofGenerator', 
    label: 'Heavy Sound-Proof Power Generator Backup', 
    cost: 45000,
    desc: 'Guaranteed uninterrupted power supply with automatic phase switcher (zero load shedding).'
  },
  { 
    id: 'ledVideoWall', 
    label: 'Curved HD P2.5 LED Video Screen Wall', 
    cost: 85000,
    desc: 'High-brightness video backdrop for couple photo montage, keynote slides, and live camera feed.'
  },
  { 
    id: 'freshFloralPathway', 
    label: 'Fresh Imported Roses & Peony Walkway', 
    cost: 95000,
    desc: 'Fragrant natural flower arches, petals walkway, and floral stage borders.'
  },
  { 
    id: 'coldSparkPyros', 
    label: 'Cold Sparkler Firework Fountains & Dry Ice Cloud', 
    cost: 35000,
    desc: 'Smokeless, non-burning cold fireworks for bride/groom entry and cake cutting celebration.'
  },
  { 
    id: 'multiCam4K', 
    label: 'Cinematic 4K Multi-Camera & Drone Video', 
    cost: 65000,
    desc: 'Full cinematic video coverage, drone aerial shots, and live video mixing on screens.'
  },
];

export function calculateEstimate(eventType, guestCount, tier, addons) {
  const selectedType = EVENT_TYPES.find((t) => t.id === eventType) || EVENT_TYPES[0];
  const selectedTier = PRODUCTION_TIERS.find((t) => t.id === tier) || PRODUCTION_TIERS[1];

  const validGuestCount = Math.max(20, Math.min(10000, Number(guestCount) || 350));
  // Scaled per-guest logistics cost in PKR
  const guestFactor = validGuestCount * 180;
  const baseTotal = (selectedType.base + guestFactor) * selectedTier.multiplier;

  let addonTotal = 0;
  if (addons && typeof addons === 'object') {
    Object.entries(addons).forEach(([key, isChecked]) => {
      if (isChecked) {
        const found = ADDON_OPTIONS.find((a) => a.id === key);
        if (found) addonTotal += found.cost;
      }
    });
  }

  const lowEstimate = Math.round((baseTotal + addonTotal) * 0.92);
  const highEstimate = Math.round((baseTotal + addonTotal) * 1.15);
  const rawMid = Math.round(baseTotal + addonTotal);

  return {
    rawLow: lowEstimate,
    rawHigh: highEstimate,
    rawMid: rawMid,
    low: lowEstimate.toLocaleString(),
    high: highEstimate.toLocaleString(),
    mid: rawMid.toLocaleString(),
    stageCost: Math.round(baseTotal * 0.45).toLocaleString(),
    avCost: Math.round(baseTotal * 0.35).toLocaleString(),
    hospitalityCost: Math.round(baseTotal * 0.2 + addonTotal).toLocaleString(),
    selectedType,
    selectedTier,
  };
}
