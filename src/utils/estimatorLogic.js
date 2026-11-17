export const EVENT_TYPES = [
  { id: 'corporate', label: 'Corporate Gala / Summit', base: 25000, icon: 'Building2', subtitle: 'Global Summits & Awards' },
  { id: 'wedding', label: 'Couture Wedding', base: 30000, icon: 'Heart', subtitle: 'Royal & Destination Nuptials' },
  { id: 'concert', label: 'Concert / Festival', base: 50000, icon: 'Music', subtitle: 'Arena Staging & EDM Shows' },
  { id: 'brand', label: 'Brand Activation', base: 22000, icon: 'Sparkles', subtitle: 'Product Launches & Pop-Ups' },
  { id: 'vip', label: 'Private VIP Celebration', base: 18000, icon: 'Crown', subtitle: 'Soirées & Milestone Galas' },
];

export const PRODUCTION_TIERS = [
  { 
    id: 'signature', 
    label: 'Signature Tier', 
    multiplier: 1.0, 
    badge: 'Essential Grandeur',
    desc: 'High-fidelity audio arrays, programmed moving intelligent lighting, luxury styling, and lead show director.' 
  },
  { 
    id: 'luxury', 
    label: 'Grand Luxury', 
    multiplier: 1.5, 
    badge: 'Most Popular',
    desc: 'Bespoke kinetic stagecraft, curved 4K LED backdrops, immersive spatial sound design, and full media coverage.' 
  },
  { 
    id: 'sovereign', 
    label: 'Sovereign Masterpiece', 
    multiplier: 2.2, 
    badge: 'Turnkey Royalty',
    desc: 'Full architectural venue overhaul, bespoke celebrity concierge, synchronized SFX, and global live broadcast.' 
  },
];

export const ADDON_OPTIONS = [
  { 
    id: 'projectionMapping', 
    label: '3D Architectural Projection Mapping', 
    cost: 12000,
    desc: 'Transforms facades, ceilings, or stages into living optical illusions.'
  },
  { 
    id: 'droneShow', 
    label: 'Synchronized 300-Drone Light Show', 
    cost: 24000,
    desc: 'Custom choreography lighting up the night sky with your crest or motifs.'
  },
  { 
    id: 'michelinCatering', 
    label: 'Michelin-Starred Culinary Partnership', 
    cost: 15000,
    desc: 'Multi-course bespoke gastronomy and master sommelier wine pairing.'
  },
  { 
    id: 'liveBroadcast', 
    label: 'Zero-Latency Global 4K Hybrid Stream', 
    cost: 8500,
    desc: 'Broadcast-grade multi-cam coverage streamed securely to 100+ countries.'
  },
];

export function calculateEstimate(eventType, guestCount, tier, addons) {
  const selectedType = EVENT_TYPES.find((t) => t.id === eventType) || EVENT_TYPES[0];
  const selectedTier = PRODUCTION_TIERS.find((t) => t.id === tier) || PRODUCTION_TIERS[1];

  const validGuestCount = Math.max(20, Math.min(10000, Number(guestCount) || 350));
  const baseTotal = (selectedType.base + validGuestCount * 45) * selectedTier.multiplier;

  let addonTotal = 0;
  if (addons && typeof addons === 'object') {
    Object.entries(addons).forEach(([key, isChecked]) => {
      if (isChecked) {
        const found = ADDON_OPTIONS.find((a) => a.id === key);
        if (found) addonTotal += found.cost;
      }
    });
  }

  const lowEstimate = Math.round((baseTotal + addonTotal) * 0.9);
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

