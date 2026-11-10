export const SERVICES_DATA = [
  {
    id: 'weddings',
    title: 'Couture Weddings & Receptions',
    shortTitle: 'Weddings',
    category: 'Private Luxury',
    tagline: 'Timeless Romance Engineered with Royal Grandeur',
    description: 'We orchestrate fairytale nuptials and multi-day destination wedding celebrations. From bespoke floral ceilings and crystal chandeliers to custom dance floors, drone light shows, and Michelin-starred culinary partnerships.',
    accentColor: '#f59e0b', // Champagne Gold
    glowColor: '#fbbf24',
    position: [-5.5, 0, -3.5],
    badge: 'Signature Luxury',
    stats: {
      completed: '280+',
      satisfaction: '100%',
      avgCapacity: '150 - 1,500 Guests'
    },
    features: [
      'Architectural Floral & Crystal Canopy Design',
      'Custom 3D Spatial Floorplans & Photorealistic Renders',
      'International Celebrity Entertainment & Orchestras',
      'Artisanal Mixology & Bespoke Culinary Curation',
      'Full Concierge & VIP Guest Travel Coordination',
      'Cinematic Drone & Multicam 4K Film Production'
    ],
    packages: [
      {
        name: 'The Royal Sovereign',
        price: 'From $45,000',
        duration: 'Multi-day Celebration',
        deliverables: 'Complete end-to-end design, custom floral staging, 12-piece band, luxury lighting rig, dedicated bridal concierge.'
      },
      {
        name: 'Grand Imperial',
        price: 'From $25,000',
        duration: 'Full Day & Night',
        deliverables: 'Custom ceiling rigging, bespoke LED stage, luxury tablescapes, sound engineering, day-of lead producers.'
      }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'corporate',
    title: 'Corporate Galas & Global Summits',
    shortTitle: 'Corporate',
    category: 'Enterprise & Tech',
    tagline: 'High-Impact Keynotes, Annual Galas, & Shareholder Summits',
    description: 'Designed for Fortune 500 enterprises, venture funds, and industry titans. We elevate corporate events into theatrical experiences with seamless multi-stream broadcasts, seamless stagecraft, and prestigious gala hospitality.',
    accentColor: '#3b82f6', // Sapphire Electric Blue
    glowColor: '#60a5fa',
    position: [-5.5, 0, -9.5],
    badge: 'Enterprise Grade',
    stats: {
      completed: '420+',
      satisfaction: '99.8%',
      avgCapacity: '300 - 8,000 Delegates'
    },
    features: [
      'Zero-Latency Global Live Streaming & Hybrid Hubs',
      'Custom Curved LED Video Walls & Spatial Sound Rigs',
      'Interactive Keynote Staging & Holographic Projections',
      'VIP Executive Hospitality & Security Logistics',
      'Sponsor Pavilion Fabrication & Brand Kiosks',
      'Automated Badge Registration & Smart NFC Badges'
    ],
    packages: [
      {
        name: 'Global Tech Keynote & Summit',
        price: 'From $60,000',
        duration: '2 to 3 Days',
        deliverables: 'Dual keynote stages, 50ft LED wall, broadcast control truck, 10 breakout rooms, executive Green Rooms.'
      },
      {
        name: 'Black-Tie Corporate Gala',
        price: 'From $35,000',
        duration: 'Single Evening Event',
        deliverables: 'Architectural mood lighting, awards presentation production, 5-course banquet coordination, live headliner band.'
      }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'concerts',
    title: 'Arena Concerts & Music Festivals',
    shortTitle: 'Concerts',
    category: 'Entertainment',
    tagline: 'Electrifying Sound, Stadium Trussing, & Kinetic Spectacles',
    description: 'From boutique electronic festivals to stadium arena tours, we deliver stadium-level line arrays, programmable moving-head beams, cryo/pyro effects, and artist hospitality management.',
    accentColor: '#ec4899', // Electric Magenta
    glowColor: '#f472b6',
    position: [5.5, 0, -3.5],
    badge: 'High Energy',
    stats: {
      completed: '190+',
      satisfaction: '100%',
      avgCapacity: '1,000 - 35,000 Fans'
    },
    features: [
      'D&B Audiotechnik / L-Acoustics K1 Line Array Systems',
      'Automated Kinetic Lighting & 360-degree Laser Matrix',
      'Cold Spark, Cryo Jet & Certified Pyrotechnic SFX',
      'Backstage Artist Compound & Green Room Luxury Styling',
      'Crowd Safety Engineering & Emergency Medical Corridors',
      'Festival F&B Villages & VIP Skybox Fabrication'
    ],
    packages: [
      {
        name: 'Festival Mainstage Production',
        price: 'From $85,000',
        duration: 'Multi-Day Festival',
        deliverables: 'Modular covered arena stage, full moving light package, CO2 cannons, lasers, FOH sound console, 40-person crew.'
      },
      {
        name: 'Club & Arena Tour Setup',
        price: 'From $40,000',
        duration: 'Per Arena Stop',
        deliverables: 'Custom DJ booth fabrication, synchronized visuals, line array, VIP backstage hospitality, rapid strike crew.'
      }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'vip-parties',
    title: 'VIP Private Soirées & Celebrations',
    shortTitle: 'VIP Celebrations',
    category: 'Exclusive Private',
    tagline: 'Discreet, Ultra-Luxurious, Tailored to Perfection',
    description: 'Milestone birthdays, secret mansion gatherings, and superyacht celebrations designed with supreme discretion. We transform residential estates, private islands, and luxury venues into bespoke wonderland environments.',
    accentColor: '#8b5cf6', // Electric Violet
    glowColor: '#a78bfa',
    position: [5.5, 0, -9.5],
    badge: 'Discreet & Bespoke',
    stats: {
      completed: '310+',
      satisfaction: '100%',
      avgCapacity: '30 - 300 VIPs'
    },
    features: [
      'Strict NDA & Non-Disclosure VIP Security Protocols',
      'Custom Velvet & Mirrored Lounge Furniture Fabrication',
      'World-Class Flair Mixology & Caviar / Oyster Bars',
      'Intimate Acoustic Sets & Top 40 Celebrity DJs',
      'Immersive Scent & Atmospheric Environmental Design',
      'Private Chauffeur & Exotic Fleet Logistics'
    ],
    packages: [
      {
        name: 'Mansion After-Hours Wonderland',
        price: 'From $30,000',
        duration: 'Night Experience',
        deliverables: 'Full venue transformation, custom illuminated bar, signature cocktail menu, high-tier audio, discreet security.'
      },
      {
        name: 'Intimate Milestone Birthday',
        price: 'From $18,000',
        duration: 'Evening Soirée',
        deliverables: 'Atmospheric uplighting, customized monogram decor, live acoustic performers, personalized keepsake station.'
      }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'brand-activations',
    title: 'Experiential Brand Activations',
    shortTitle: 'Brand Activations',
    category: 'Marketing & PR',
    tagline: 'Viral Immersion That Turns Attendees into Brand Evangelists',
    description: 'We conceive and execute bold pop-ups, influencer launches, and product reveal stages that dominate social feeds. Built with interactive touchpoints, AR installations, and photogenic architecture.',
    accentColor: '#06b6d4', // Cyber Cyan
    glowColor: '#22d3ee',
    position: [-5.5, 0, -15.5],
    badge: 'Viral & Pop-up',
    stats: {
      completed: '240+',
      satisfaction: '99.5%',
      avgCapacity: '500 - 10,000 Foot Traffic'
    },
    features: [
      'Instagrammable Kinetic & Mirror Tunnel Photo-Ops',
      'Custom Product Reveal Staging & Hydraulic Lifts',
      'Augmented Reality & Interactive Projection Mapping',
      'Exclusive VIP & Influencer Preview Lounge Styling',
      'Live Press Broadcast Staging & Media Walls',
      'Real-Time Social Metrics & Engagement Tracking'
    ],
    packages: [
      {
        name: 'Flagship Product Launch',
        price: 'From $50,000',
        duration: '3-Day Activation',
        deliverables: 'Interactive futuristic booth, dynamic LED tunnel, robotic product plinth, media wall, brand ambassadors.'
      },
      {
        name: 'Pop-Up Experiential Store',
        price: 'From $28,000',
        duration: 'Weekend Pop-Up',
        deliverables: 'Custom modular buildout, ambient neon branding, DJ booth, photo moment fabrication, foot-traffic analytics.'
      }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'production',
    title: 'Turnkey AV & Architectural Lighting',
    shortTitle: 'AV & Lighting',
    category: 'Technical Engineering',
    tagline: 'Cinematic Acoustics, Architectural Beams, & 3D Visuals',
    description: 'The technical heartbeat of extraordinary events. We supply proprietary rigging, beam spotlights, curved LED matrices, 3D projection mapping, and master sound technicians.',
    accentColor: '#10b981', // Emerald Laser
    glowColor: '#34d399',
    position: [5.5, 0, -15.5],
    badge: 'Pure Technology',
    stats: {
      completed: '650+',
      satisfaction: '100%',
      avgCapacity: 'Any Scale Venue'
    },
    features: [
      '3D Architectural Building Projection Mapping',
      'Fine-Pitch 1.9mm Curved Indoor & Outdoor LED Panels',
      'Intelligent Beam, Spot, & Wash Stage Lights',
      'Wireless DMX & Redundant Fiber Optic Control Network',
      'Professional FOH Audio Engineers & Lighting Designers',
      'Structural Trussing & Rigging Safety Certification'
    ],
    packages: [
      {
        name: 'Full Arena Production Rig',
        price: 'From $45,000',
        duration: 'Per Production',
        deliverables: '100+ moving heads, 400sqm LED wall, digital audio mixing console, line array, licensed rigging team.'
      },
      {
        name: 'Architectural Building Mapping',
        price: 'From $22,000',
        duration: 'Single Night Feature',
        deliverables: 'Dual 30k lumen laser projectors, custom 3D motion graphics animation, audio sync, on-site engineer.'
      }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

