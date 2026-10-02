// ─── falconvision.fpv — central data ───────────────────────────────────────
// All business content lives here so components stay presentational.

export const WHATSAPP_NUMBER = "916369090002";

export const services = [
  {
    number: "01",
    title: "FPV Drone Shooting",
    description:
      "High-speed dynamic flight, immersive indoor fly-throughs, and close-quarters acrobatic tracking.",
    image:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    tag: "IMMERSIVE FPV",
  },
  {
    number: "02",
    title: "Cinematic Aerial Shooting",
    description:
      "Ultra-smooth sweeping camera moves, golden-hour landscapes, and cinematic film productions.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    tag: "4K CINEMATIC",
  },
  {
    number: "03",
    title: "Professional Drone Videography",
    description:
      "Broadcast-grade 4K/60fps video capture with calibrated color science for high-end productions.",
    image:
      "https://images.unsplash.com/photo-1507582020432-2a3bc418b23d?auto=format&fit=crop&w=800&q=80",
    tag: "PRO GEAR",
  },
  {
    number: "04",
    title: "Real Estate & Property Shoots",
    description:
      "Showcase luxury villas, resorts, layouts, and architectural developments with premium aerial angles.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    tag: "REAL ESTATE",
  },
  {
    number: "05",
    title: "Wedding & Event Drone Coverage",
    description:
      "Capture grand entrances, magnificent venues, festivals, sports, and crowd energy from above.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tag: "EVENTS & CELEBRATIONS",
  },
  {
    number: "06",
    title: "Commercial & Promotional Shoots",
    description:
      "Dynamic visual storytelling for brand commercials, social advertising, and promotional films.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    tag: "COMMERCIAL",
  },
  {
    number: "07",
    title: "Reels & Social Media Content",
    description:
      "Fast-paced, attention-grabbing vertical (9:16) and cinematic horizontal clips optimized for viral reach.",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
    tag: "SOCIAL REELS",
  },
  {
    number: "08",
    title: "Custom Aerial Videography",
    description:
      "Bespoke flight planning for unique creative visions, agriculture, large estates, or industrial sites.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    tag: "CUSTOM FLIGHTS",
  },
];

export const pricingPackages = [
  {
    id: "half-day",
    name: "Half Day Package",
    duration: "Up to 4 Hours",
    price: "₹6,000",
    formValue: "Half Day – Up to 4 Hours (₹6,000)",
    featured: false,
    badge: "FLEXIBLE",
    features: [
      "DJI Avata 360 Drone + Pilot",
      "Up to 4 Hours on-site flight",
      "4K Ultra HD Stabilized Footage",
      "Real estate, reels & short events",
      "Same-day / raw file transfer",
    ],
  },
  {
    id: "full-day",
    name: "Full Day Package",
    duration: "Up to 8 Hours",
    price: "₹12,000",
    formValue: "Full Day – Up to 8 Hours (₹12,000)",
    featured: true,
    badge: "MOST POPULAR",
    features: [
      "DJI Avata 360 Drone + Pilot",
      "Up to 8 Hours comprehensive shoot",
      "Unlimited flight sessions & batteries",
      "Multi-location shoot coordination",
      "Full weddings, films & commercial campaigns",
      "Priority footage delivery & color profiles",
    ],
  },
  {
    id: "custom",
    name: "Custom Project",
    duration: "Project Based",
    price: "Custom",
    formValue: "Custom Project Package",
    featured: false,
    badge: "BESPOKE",
    features: [
      "Multi-day production expeditions",
      "Specialized indoor/outdoor FPV routes",
      "Post-production editing & color grading",
      "Commercial licensing support",
      "Dedicated creative consultation",
    ],
  },
];

export const whyChooseUs = [
  {
    icon: "shield",
    title: "Professional Equipment",
    description:
      "Equipped with the high-performance DJI Avata 360 drone, gyro stabilization, and high-bitrate 4K sensors.",
  },
  {
    icon: "award",
    title: "Skilled Pilot",
    description:
      "Certified precision FPV pilot capable of seamless high-speed lines and intricate indoor navigation.",
  },
  {
    icon: "film",
    title: "Cinematic Shots",
    description:
      "Artful camera trajectories, buttery color grading, and dynamic speeds designed for impactful visual storytelling.",
  },
  {
    icon: "clock",
    title: "Flexible Packages",
    description:
      "Transparent pricing from Half Day (₹6,000) to Full Day (₹12,000) packages with no hidden fees.",
  },
  {
    icon: "compass",
    title: "Location Coverage",
    description:
      "Extensive coverage across Tamil Nadu and regional filming locations with rapid deployment ready.",
  },
];

export const portfolio = [
  {
    id: "fpv-reel",
    category: "FPV DRONE REEL",
    title: "High-Speed Dynamic FPV Flight",
    subtitle: "Acros, dive-ins and fast proximity tracking",
    youtubeId: "bNpx7gpSqeI",
    wide: true,
  },
  {
    id: "luxury-villa",
    category: "LUXURY REAL ESTATE",
    title: "Property, Redefined",
    subtitle: "Architectural Villa & Resort Showcase",
    youtubeId: "_tV5LEBDs7w",
    wide: false,
  },
  {
    id: "cinematic-nature",
    category: "CINEMATIC LANDSCAPE",
    title: "Land from Above",
    subtitle: "Scenic Mountain & Coastline Expedition",
    youtubeId: "Scxs7L0vhZ4",
    wide: false,
  },
  {
    id: "wedding-moment",
    category: "WEDDING & CELEBRATION",
    title: "Moments in Motion",
    subtitle: "Cinematic Wedding & Couple Sequence",
    youtubeId: "4vL_2NER5nY",
    wide: true,
  },
];
