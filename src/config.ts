// ─────────────────────────────────────────────────────────────────────────────
// Bossert Immobilien — Central Dummy Data Config
// Replace these with real CMS/API data when ready.
// ─────────────────────────────────────────────────────────────────────────────

export type PropertyStatus = "For Sale" | "Reserved" | "Sold";
export type PropertyType = "Villa" | "Penthouse" | "Apartment" | "House";

export interface Property {
  id: number;
  slug: string;
  title: string;
  type: PropertyType;
  location: string;
  city: string;
  sqm: number;
  plotSqm?: number;
  rooms: number;
  bathrooms: number;
  yearBuilt: number;
  energyClass: string;
  price: string;
  status: PropertyStatus;
  image: string;
  images: string[];
  description: string;
  features: string[];
  agent: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
  languages: string[];
  specialties: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: string; // "buy" | "sell" | "evaluate"
}

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  image: string;
  features: { title: string; text: string }[];
}

export interface SellingStep {
  num: string;
  title: string;
  text: string;
}

export type KnowledgeCategory =
  | "Buying"
  | "Selling"
  | "Valuation"
  | "Renting"
  | "Market"
  | "Locations"
  | "Guides";

export interface Article {
  slug: string;
  category: KnowledgeCategory;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  author: string;
}

export interface Reference {
  id: number;
  slug: string;
  title: string;
  category: PropertyType | "Commercial";
  location: string;
  image: string;
  images: string[];
  year: string;
  summary: string;
  description: string;
  result: string;
  testimonial: { quote: string; author: string };
}

export interface Location {
  slug: string;
  name: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
}

export interface BlogCategory {
  slug: string;
  label: string;
  description: string;
}

export interface BlogArticle {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  author: string;
  featured: boolean;
}


// ─────────────────────────────────────────────────────────────────────────────
// PROPERTIES
// ─────────────────────────────────────────────────────────────────────────────

export const PROPERTIES: Property[] = [
  {
    id: 1,
    slug: "villa-marienhoehe",
    title: "Villa Marienhöhe",
    type: "Villa",
    location: "Nordost, Wiesbaden",
    city: "Wiesbaden",
    sqm: 480,
    plotSqm: 1200,
    rooms: 9,
    bathrooms: 5,
    yearBuilt: 2018,
    energyClass: "A+",
    price: "€ 3.450.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
    ],
    description:
      "Set on an elevated plot in Wiesbaden's most sought-after residential district, Villa Marienhöhe combines contemporary architecture with generous outdoor living. Floor-to-ceiling glazing frames views over the surrounding parkland, while the interior unfolds across three levels of light-filled, flexible living space.",
    features: [
      "Private garden with heated pool",
      "Triple garage with EV charging",
      "Home cinema & wine cellar",
      "Smart home automation",
      "Underfloor heating throughout",
      "South-facing terrace, 85 sqm",
    ],
    agent: "Maximilian Bossert",
  },
  {
    id: 2,
    slug: "penthouse-am-main",
    title: "Penthouse am Main",
    type: "Penthouse",
    location: "Sachsenhausen, Frankfurt",
    city: "Frankfurt",
    sqm: 310,
    rooms: 6,
    bathrooms: 3,
    yearBuilt: 2021,
    energyClass: "A",
    price: "€ 4.200.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=80",
    ],
    description:
      "Perched atop a prestigious riverside development, this penthouse offers uninterrupted skyline views of Frankfurt's financial district. A wraparound terrace, designer fittings, and a private elevator lobby make this one of the most exclusive residences on the market.",
    features: [
      "360° wraparound terrace",
      "Private elevator access",
      "Floor-to-ceiling skyline views",
      "Designer kitchen by Bulthaup",
      "Concierge service",
      "Two underground parking spaces",
    ],
    agent: "Julian Wagner",
  },
  {
    id: 3,
    slug: "stadtvilla-mainz-gonsenheim",
    title: "Stadtvilla Mainz-Gonsenheim",
    type: "House",
    location: "Gonsenheim, Mainz",
    city: "Mainz",
    sqm: 350,
    plotSqm: 650,
    rooms: 7,
    bathrooms: 4,
    yearBuilt: 2005,
    energyClass: "B",
    price: "€ 1.890.000",
    status: "Reserved",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1400&q=80",
    ],
    description:
      "A classic townhouse villa in the leafy, family-friendly district of Gonsenheim. Generous room proportions, a mature private garden, and proximity to international schools make this a rare find for families seeking space without leaving the city.",
    features: [
      "Mature private garden",
      "Double garage",
      "Separate guest apartment",
      "Close to international schools",
      "Renovated 2020",
    ],
    agent: "Elena Bossert",
  },
  {
    id: 4,
    slug: "luxus-apartment-westend",
    title: "Luxus-Apartment Westend",
    type: "Apartment",
    location: "Westend, Frankfurt",
    city: "Frankfurt",
    sqm: 195,
    rooms: 4,
    bathrooms: 2,
    yearBuilt: 2016,
    energyClass: "A",
    price: "€ 2.100.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=80",
    ],
    description:
      "Located in a landmarked Gründerzeit building in Frankfurt's diplomatic quarter, this apartment blends period detail — high ceilings, stucco, herringbone parquet — with a fully modernised interior and private roof terrace.",
    features: [
      "Private roof terrace",
      "Herringbone parquet flooring",
      "Period stucco ceilings",
      "Underground parking space",
      "Walking distance to Palmengarten",
    ],
    agent: "Julian Wagner",
  },
  {
    id: 5,
    slug: "anwesen-im-taunus",
    title: "Anwesen im Taunus",
    type: "Villa",
    location: "Kronberg, Taunus",
    city: "Kronberg",
    sqm: 620,
    plotSqm: 3400,
    rooms: 12,
    bathrooms: 7,
    yearBuilt: 2012,
    energyClass: "A+",
    price: "€ 5.750.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1400&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1400&q=80",
    ],
    description:
      "An extraordinary country estate on a 3,400 sqm plot in the exclusive Taunus foothills. Manicured grounds, a separate staff wing, and equestrian facilities make this one of the region's most significant private properties.",
    features: [
      "3,400 sqm landscaped grounds",
      "Separate staff/guest wing",
      "Equestrian facilities",
      "Indoor pool & spa",
      "Gated, private access road",
      "Helicopter landing pad",
    ],
    agent: "Maximilian Bossert",
  },
  {
    id: 6,
    slug: "designer-penthouse-wiesbaden",
    title: "Designer-Penthouse Wiesbaden",
    type: "Penthouse",
    location: "Stadtmitte, Wiesbaden",
    city: "Wiesbaden",
    sqm: 270,
    rooms: 5,
    bathrooms: 3,
    yearBuilt: 2020,
    energyClass: "A",
    price: "€ 2.950.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1400&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1400&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1400&q=80",
    ],
    description:
      "A striking architect-designed penthouse in the heart of Wiesbaden, moments from the Kurhaus. Interior design by a renowned local studio, with bespoke joinery and an expansive private terrace overlooking the city.",
    features: [
      "Architect-designed interior",
      "Private rooftop terrace",
      "Bespoke joinery throughout",
      "Two designated parking spaces",
      "Moments from the Kurhaus",
    ],
    agent: "Elena Bossert",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES (Homepage excerpt)
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    title: "Buy a Property",
    description:
      "Discover exclusive villas, penthouses, and premium apartments carefully curated to meet your lifestyle and investment goals.",
    icon: "buy",
  },
  {
    title: "Sell with Us",
    description:
      "Benefit from our extensive network and discreet, professional marketing to find the right buyer at the right price.",
    icon: "sell",
  },
  {
    title: "Property Valuation",
    description:
      "Get an accurate, market-driven evaluation of your property from our experienced local experts with 30+ years of knowledge.",
    icon: "evaluate",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES — detail pages (/services/*)
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICES_DETAIL: ServiceDetail[] = [
  {
    slug: "brokerage",
    title: "Brokerage",
    tagline: "Full-Service Representation",
    intro:
      "From first viewing to notarisation, our brokerage team manages every stage of the transaction — representing your interests with discretion, precision, and an unmatched local network.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    features: [
      { title: "Buyer & Seller Representation", text: "Dedicated advisors for both sides of the transaction, ensuring fair and efficient outcomes." },
      { title: "Curated Buyer Network", text: "Direct access to a vetted database of pre-qualified, high-net-worth buyers." },
      { title: "Negotiation & Contracts", text: "Expert negotiation and full coordination with notaries and legal counsel." },
      { title: "Discreet Off-Market Deals", text: "Confidential placements for clients who value privacy above all." },
    ],
  },
  {
    slug: "valuation-appraisal",
    title: "Valuation & Appraisal",
    tagline: "Precise, Market-Driven Insight",
    intro:
      "Our certified appraisers combine three decades of regional market data with on-site expertise to deliver valuations you can rely on — for sale, inheritance, or financing purposes.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    features: [
      { title: "Market Value Appraisal", text: "Comprehensive, comparable-based assessment of current market value." },
      { title: "Certified Reports", text: "Documentation suitable for banks, courts, and tax authorities." },
      { title: "Inheritance & Divorce Valuation", text: "Sensitive, impartial valuations for legal and family matters." },
      { title: "Portfolio Appraisal", text: "Valuation services for multi-property and investment portfolios." },
    ],
  },
  {
    slug: "marketing",
    title: "Marketing",
    tagline: "Premium Presentation, Maximum Reach",
    intro:
      "We treat every listing as a flagship product — professional photography, cinematic video, and placement across our premium partner network ensure your property reaches the right audience.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    features: [
      { title: "Professional Photography & Video", text: "High-end visual content produced by our trusted creative partners." },
      { title: "Bespoke Exposés", text: "Elegant, print-ready property brochures tailored to each listing." },
      { title: "Digital & Print Placement", text: "Distribution across leading property portals, print media, and our own network." },
      { title: "Social & Targeted Campaigns", text: "Digital campaigns targeted at qualified, high-intent buyer segments." },
    ],
  },
  {
    slug: "advisory",
    title: "Advisory",
    tagline: "Strategic Real Estate Counsel",
    intro:
      "Beyond brokerage, we advise private clients, family offices, and investors on acquisition strategy, portfolio structuring, and long-term market positioning across the Rhine-Main region.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    features: [
      { title: "Investment Strategy", text: "Guidance on acquisition timing, location selection, and portfolio balance." },
      { title: "Market Research", text: "In-depth regional reports on pricing trends, supply, and demand." },
      { title: "Relocation Advisory", text: "End-to-end support for clients relocating to the Rhine-Main region." },
      { title: "Family Office Services", text: "Discreet, long-term advisory relationships for multi-generational holdings." },
    ],
  },
  {
    slug: "additional",
    title: "Additional Services",
    tagline: "Everything Around the Transaction",
    intro:
      "Our network of trusted partners covers everything from interior design to financing, so your property journey is seamless from the first conversation to move-in day.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
    features: [
      { title: "Financing Partners", text: "Introductions to trusted mortgage and financing specialists." },
      { title: "Interior Design & Staging", text: "Partner studios for staging, renovation, and interior design." },
      { title: "Relocation & Concierge", text: "Support with schooling, visas, and settling-in services." },
      { title: "Legal & Notary Coordination", text: "Coordination with independent legal and notary partners." },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SELLING / RENTING PROCESS STEPS
// ─────────────────────────────────────────────────────────────────────────────

export const SELLING_PROCESS: SellingStep[] = [
  {
    num: "01",
    title: "Valuation & Strategy",
    text: "We conduct a thorough, market-driven valuation of your property and develop a tailor-made marketing strategy to target the right buyers.",
  },
  {
    num: "02",
    title: "Premium Presentation",
    text: "From professional photography to high-end exposés, we present your property in the best possible light, ensuring maximum appeal.",
  },
  {
    num: "03",
    title: "Discreet Placement",
    text: "Before public listing, we discreetly offer your property to our curated database of pre-qualified, premium buyers.",
  },
];

export const RENTING_PROCESS: SellingStep[] = [
  {
    num: "01",
    title: "Property Assessment",
    text: "We assess your property's rental potential and advise on the optimal rent, presentation, and tenant profile.",
  },
  {
    num: "02",
    title: "Tenant Screening",
    text: "Every applicant is carefully vetted — credit checks, references, and income verification — before being presented to you.",
  },
  {
    num: "03",
    title: "Contract & Handover",
    text: "We prepare the lease agreement, coordinate the handover, and remain your point of contact throughout the tenancy.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TEAM MEMBERS
// ─────────────────────────────────────────────────────────────────────────────

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "maximilian-bossert",
    name: "Maximilian Bossert",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio:
      "Maximilian founded Bossert Immobilien in 1991 with a vision of bringing discretion and genuine expertise to the region's luxury property market. Over three decades, he has personally overseen the sale of some of the Rhine-Main region's most significant estates.",
    email: "m.bossert@bossert-immobilien.de",
    phone: "+49 6196 560 97 1",
    languages: ["German", "English", "French"],
    specialties: ["Luxury Villas", "Off-Market Sales", "Investment Advisory"],
  },
  {
    slug: "elena-bossert",
    name: "Elena Bossert",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio:
      "Elena leads the day-to-day operations of the agency, overseeing marketing, client relations, and the firm's growing portfolio of exclusive listings. She holds a degree in Real Estate Economics from EBS Universität.",
    email: "e.bossert@bossert-immobilien.de",
    phone: "+49 6196 560 97 2",
    languages: ["German", "English"],
    specialties: ["Marketing Strategy", "Penthouses", "Client Relations"],
  },
  {
    slug: "julian-wagner",
    name: "Julian Wagner",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio:
      "Julian brings over 15 years of brokerage experience across the Frankfurt and Wiesbaden markets. Known for his meticulous negotiation style, he has closed transactions totalling over €400 million.",
    email: "j.wagner@bossert-immobilien.de",
    phone: "+49 6196 560 97 3",
    languages: ["German", "English", "Spanish"],
    specialties: ["Frankfurt Apartments", "Negotiation", "Investment Properties"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE — articles & guides (/knowledge/*)
// ─────────────────────────────────────────────────────────────────────────────

export const KNOWLEDGE_CATEGORIES: { slug: string; label: KnowledgeCategory; description: string }[] = [
  { slug: "buying", label: "Buying", description: "Guidance for finding and purchasing your next property." },
  { slug: "selling", label: "Selling", description: "Everything you need to know to sell with confidence." },
  { slug: "valuation", label: "Valuation", description: "How property values are assessed in the current market." },
  { slug: "renting", label: "Renting", description: "Insight for landlords and tenants alike." },
  { slug: "market", label: "Market", description: "Trends and data from across the Rhine-Main region." },
  { slug: "locations", label: "Locations", description: "In-depth profiles of the neighbourhoods we know best." },
  { slug: "guides", label: "Guides", description: "Practical, step-by-step guides for every stage of your journey." },
];

export const ARTICLES: Article[] = [
  {
    slug: "how-much-deposit-do-you-need",
    category: "Buying",
    title: "How Much Deposit Do You Need to Buy in Germany?",
    excerpt: "A practical breakdown of deposit expectations, financing ratios, and additional purchase costs.",
    content: [
      "In Germany, most lenders expect buyers to finance at least 20–30% of the purchase price through equity, with the remainder covered by a mortgage. For premium properties above €1.5 million, this ratio is often higher.",
      "Beyond the deposit itself, buyers should budget for notary fees (around 1.5%), property transfer tax (3.5–6.5% depending on the federal state), and land registry fees (roughly 0.5%).",
      "Our advisory team can help you model financing scenarios early in your search, so you know exactly what budget to work with before you start viewing properties.",
    ],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    date: "2026-06-12",
    readTime: "4 min read",
    author: "Julian Wagner",
  },
  {
    slug: "preparing-your-home-for-sale",
    category: "Selling",
    title: "Preparing Your Home for a Premium Sale",
    excerpt: "Simple, high-impact steps that make a measurable difference to buyer perception and final price.",
    content: [
      "First impressions are formed within seconds of a buyer entering a property. Decluttering, neutral staging, and attention to natural light consistently outperform elaborate renovations in terms of return on investment.",
      "We recommend a pre-sale walkthrough with our team six to eight weeks before listing, giving enough time to address minor repairs, refresh landscaping, and commission professional photography at the optimal time of day.",
      "Discreet, well-prepared listings tend to sell faster and closer to asking price than properties rushed to market.",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    date: "2026-05-28",
    readTime: "5 min read",
    author: "Elena Bossert",
  },
  {
    slug: "understanding-market-value",
    category: "Valuation",
    title: "Understanding Market Value vs. Asking Price",
    excerpt: "Why the two figures rarely match — and what that means for buyers and sellers.",
    content: [
      "Market value reflects what a willing, informed buyer would pay under normal conditions. Asking price is a strategic decision that factors in negotiation room, market momentum, and seller timeline.",
      "Our certified appraisals combine comparable sales, replacement cost, and location-specific demand indicators to arrive at a defensible, evidence-based figure.",
      "Sellers who price close to genuine market value — rather than testing the market with inflated figures — consistently achieve faster, more successful sales.",
    ],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    date: "2026-05-10",
    readTime: "3 min read",
    author: "Maximilian Bossert",
  },
  {
    slug: "tenant-screening-essentials",
    category: "Renting",
    title: "Tenant Screening Essentials for Landlords",
    excerpt: "The checks every landlord should run before signing a lease — and why they matter.",
    content: [
      "A thorough tenant screening process protects both the property and the ongoing rental relationship. At minimum, this should include income verification, a Schufa credit check, and references from previous landlords.",
      "For premium properties, we also recommend a short introductory meeting — often the clearest indicator of how a tenancy will unfold.",
      "Our lettings team manages the entire screening and referencing process on your behalf, presenting only fully vetted candidates.",
    ],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    date: "2026-04-22",
    readTime: "4 min read",
    author: "Elena Bossert",
  },
  {
    slug: "rhine-main-market-outlook",
    category: "Market",
    title: "Rhine-Main Market Outlook",
    excerpt: "Our quarterly read on pricing trends, inventory levels, and buyer demand across the region.",
    content: [
      "Demand for premium properties in the Rhine-Main region has remained resilient, driven by continued relocation into Frankfurt's financial sector and limited new-build supply in established districts.",
      "Wiesbaden and Kronberg continue to see the strongest price appreciation for detached villas, while Frankfurt's Westend and Sachsenhausen districts lead the apartment and penthouse segment.",
      "We expect moderate, sustained growth through the remainder of the year, with well-presented properties in prime locations continuing to sell within weeks of listing.",
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    date: "2026-07-01",
    readTime: "6 min read",
    author: "Maximilian Bossert",
  },
  {
    slug: "wiesbaden-neighbourhood-guide",
    category: "Locations",
    title: "A Buyer's Guide to Wiesbaden's Best Neighbourhoods",
    excerpt: "From the leafy Nordost to the historic Stadtmitte, where to look depending on your lifestyle.",
    content: [
      "Wiesbaden's Nordost district remains the address of choice for buyers seeking established villas with mature gardens, within easy reach of the city centre.",
      "For those who prefer walkable, urban living, Stadtmitte offers period apartments and new-build penthouses close to the Kurhaus and the city's cultural quarter.",
      "Families frequently gravitate toward the western districts, where international schools and larger plot sizes are more readily available.",
    ],
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=80",
    date: "2026-03-15",
    readTime: "5 min read",
    author: "Julian Wagner",
  },
  {
    slug: "step-by-step-buying-guide",
    category: "Guides",
    title: "The Complete Step-by-Step Buying Guide",
    excerpt: "From first search to handing over the keys — everything that happens along the way.",
    content: [
      "1. Define your search profile and financing capacity. 2. View shortlisted properties, including off-market opportunities. 3. Submit a formal offer once you've found the right property.",
      "4. Agree terms and instruct a notary to prepare the purchase contract. 5. Sign the notarised contract — a legal requirement for all German property transactions. 6. Complete payment and register the transfer of ownership.",
      "Throughout the process, our team coordinates with your lender, the notary, and the seller's representative, so you always know exactly where things stand.",
    ],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    date: "2026-02-20",
    readTime: "7 min read",
    author: "Julian Wagner",
  },
  {
    slug: "energy-certificates-explained",
    category: "Guides",
    title: "Energy Certificates Explained",
    excerpt: "What an Energieausweis is, why it matters, and how it affects value.",
    content: [
      "Every property marketed for sale or rent in Germany must have a valid energy certificate (Energieausweis), disclosing expected energy consumption and efficiency rating.",
      "Properties with stronger ratings (A or A+) are increasingly commanding a premium, as buyers factor ongoing energy costs into their purchase decision.",
      "We include energy certificate details in every listing and can advise on cost-effective efficiency improvements ahead of a sale.",
    ],
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
    date: "2026-01-18",
    readTime: "3 min read",
    author: "Elena Bossert",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LOCATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const LOCATIONS: Location[] = [
  {
    slug: "wiesbaden",
    name: "Wiesbaden",
    description:
      "Hessen's elegant state capital, known for its Belle Époque architecture, thermal springs, and leafy residential districts.",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=80",
    stats: [
      { label: "Avg. Villa Price", value: "€ 2.8M" },
      { label: "Population", value: "280,000" },
      { label: "Listings", value: "24" },
    ],
  },
  {
    slug: "frankfurt",
    name: "Frankfurt am Main",
    description:
      "Germany's financial capital, offering a dynamic mix of historic quarters and striking modern skyline apartments.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    stats: [
      { label: "Avg. Apartment Price", value: "€ 1.9M" },
      { label: "Population", value: "760,000" },
      { label: "Listings", value: "38" },
    ],
  },
  {
    slug: "mainz",
    name: "Mainz",
    description:
      "A historic university city on the Rhine, prized for its family-friendly districts and strong rental demand.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    stats: [
      { label: "Avg. House Price", value: "€ 1.4M" },
      { label: "Population", value: "220,000" },
      { label: "Listings", value: "16" },
    ],
  },
  {
    slug: "kronberg",
    name: "Kronberg im Taunus",
    description:
      "An exclusive enclave in the Taunus foothills, home to some of the region's largest private estates.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
    stats: [
      { label: "Avg. Estate Price", value: "€ 5.2M" },
      { label: "Population", value: "18,000" },
      { label: "Listings", value: "9" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCES — case studies / track record (/references/*)
// ─────────────────────────────────────────────────────────────────────────────

export const REFERENCES: Reference[] = [
  {
    id: 1,
    slug: "villa-eppstein-off-market-sale",
    title: "Off-Market Sale of a Private Estate in Eppstein",
    category: "Villa",
    location: "Eppstein, Taunus",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1400&q=80",
    ],
    year: "2025",
    summary: "A discreet, fully off-market transaction completed within six weeks for a multi-generational family estate.",
    description:
      "The family sought a confidential process with no public listing. Drawing on our curated buyer database, we identified three qualified parties within ten days and managed the entire negotiation and closing process privately.",
    result: "Sold at 98% of asking price, six weeks from first contact to notarisation.",
    testimonial: {
      quote: "Bossert Immobilien handled a very sensitive sale with total discretion and professionalism. We could not have asked for a better outcome.",
      author: "Private Client, Eppstein",
    },
  },
  {
    id: 2,
    slug: "westend-penthouse-portfolio-sale",
    title: "Portfolio Sale of Three Westend Penthouses",
    category: "Penthouse",
    location: "Westend, Frankfurt",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80",
    ],
    year: "2024",
    summary: "Coordinated sale of a family office's three-property portfolio to international buyers.",
    description:
      "Acting as sole advisor, we developed a unified marketing strategy across all three properties, coordinated international buyer viewings, and structured the transaction to close simultaneously.",
    result: "All three units sold within four months, exceeding the family office's target valuation by 6%.",
    testimonial: {
      quote: "Their market knowledge and international network made a complex, multi-property sale feel seamless.",
      author: "Family Office Representative",
    },
  },
  {
    id: 3,
    slug: "gonsenheim-family-relocation",
    title: "Full-Service Relocation Support for a Returning Family",
    category: "House",
    location: "Gonsenheim, Mainz",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1400&q=80",
    ],
    year: "2025",
    summary: "Supported a family relocating from abroad with search, school liaison, and full purchase management.",
    description:
      "We built a tailored search profile ahead of the family's arrival, arranged remote viewings, and coordinated financing, notary, and school enrolment — allowing the family to move in within eight weeks of landing.",
    result: "Purchase completed eight weeks after the family's arrival in Germany, fully furnished on move-in day.",
    testimonial: {
      quote: "From the first phone call, everything was handled for us. It made an overwhelming move genuinely easy.",
      author: "Relocating Family, Mainz",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY INFO
// ─────────────────────────────────────────────────────────────────────────────

export const COMPANY = {
  name: "Bossert Immobilien",
  tagline: "Real Estate",
  since: 1991,
  phone: "+49 6196 560 97 0",
  email: "info@bossert-immobilien.de",
  address: {
    street: "Musterstraße 1",
    zip: "65183",
    city: "Wiesbaden",
    country: "Germany",
  },
  hours: {
    weekdays: "Monday – Friday: 9:00 AM – 6:00 PM",
    saturday: "Saturday: By Appointment",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// BLOG
// ─────────────────────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES: BlogCategory[] = [
  { label: "Market Trends", slug: "market-trends", description: "In-depth analysis of price movements, supply and demand, and regional market conditions." },
  { label: "Buying Tips", slug: "buying-tips", description: "Practical advice to guide you through every stage of purchasing a property in Germany." },
  { label: "Selling Strategies", slug: "selling-strategies", description: "Expert perspectives on how to position and present your property for maximum value." },
  { label: "Lifestyle & Region", slug: "lifestyle-region", description: "Discover what makes Wiesbaden, Frankfurt, Mainz, and the Taunus such desirable places to live." },
  { label: "Legal & Finance", slug: "legal-finance", description: "Clear explanations of German property law, taxes, financing, and notary processes." },
  { label: "Interior & Design", slug: "interior-design", description: "Inspiration and guidance on staging, renovation, and making the most of your space." },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "rhine-main-market-outlook-2025",
    category: "Market Trends",
    title: "Rhine-Main Property Market: What to Expect in 2025",
    excerpt: "After a period of repricing and recalibration, the Rhine-Main residential market is showing clear signs of stabilisation. We break down what buyers and sellers should prepare for.",
    content: [
      "The past 24 months have seen significant shifts in the German property market, driven largely by the European Central Bank's interest rate policies and evolving buyer preferences. However, as we look towards 2025, the Rhine-Main region — encompassing Frankfurt, Wiesbaden, Mainz, and the Taunus — is exhibiting a robust stabilization.",
      "For buyers, the current market presents a rare window of opportunity. While peak prices from the low-interest era have recalibrated, the underlying fundamentals of the region remain exceptionally strong. Frankfurt's position as a financial hub continues to draw international talent, while the surrounding areas offer the high quality of life that affluent families seek.",
      "Sellers must adapt to a more discerning buyer pool. Properties that are well-maintained, energy-efficient, and realistically priced are still moving quickly. However, those requiring significant renovation or carrying poor energy ratings (Energieausweis) are facing longer marketing periods and tougher negotiations.",
      "Looking ahead, we anticipate a modest but steady appreciation in premium properties, particularly in prime locations like Wiesbaden's Nordost and the Taunus hills, where supply remains structurally constrained. Engaging an experienced local advisor is more critical than ever to navigate these nuanced conditions successfully."
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    date: "July 2025", readTime: "6 min read", author: "Thomas Bossert", featured: true,
  },
  {
    slug: "wiesbaden-top-neighbourhoods-2025",
    category: "Lifestyle & Region",
    title: "Wiesbaden's Most Sought-After Neighbourhoods in 2025",
    excerpt: "From the elegant Nordstadt to the leafy villas of Biebrich, we explore which districts are commanding premium prices and why buyers keep returning.",
    content: [
      "Wiesbaden has long been the crown jewel of the Rhine-Main region, renowned for its Belle Époque architecture, thermal springs, and unparalleled quality of life. For buyers looking to settle in the Hessian capital, choosing the right neighbourhood is paramount.",
      "The **Nordost (North East)** remains the undisputed premier address. Known as the 'Villenviertel' (Villa Quarter), it boasts magnificent historic mansions, mature tree-lined avenues, and immediate proximity to the Kurpark. Properties here are generational assets and rarely change hands publicly, making off-market access essential.",
      "**Sonnenberg** offers a slightly different appeal. Nestled against the Taunus hills, it provides a more suburban, tranquil atmosphere while still being minutes from the city centre. It is particularly popular with families seeking larger plots, modern amenities, and excellent local schools.",
      "Finally, **Biebrich**, situated along the Rhine river, is experiencing a renaissance. The area around the Biebrich Palace offers a unique maritime flair, with beautifully restored historic apartments that appeal to young professionals and downsizers alike. As the city evolves, these three districts continue to offer the best blend of heritage, convenience, and long-term value retention."
    ],
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    date: "June 2025", readTime: "5 min read", author: "Julia Meier", featured: true,
  },
  {
    slug: "selling-your-property-in-germany",
    category: "Selling Strategies",
    title: "5 Steps to Selling Your Property for the Right Price in Germany",
    excerpt: "The German property market rewards well-prepared sellers. Here is the step-by-step approach our advisors use to achieve above-asking results consistently.",
    content: [
      "Selling a premium property in Germany requires more than just listing it on a public portal. In today's market, maximizing value demands a strategic, highly professional approach from day one.",
      "**1. Accurate Market Valuation:** The most common mistake sellers make is overpricing. An inflated initial price leads to extended time on the market, which ultimately devalues the property. A precise, data-driven valuation by a local expert sets the foundation for a successful sale.",
      "**2. Flawless Presentation:** High-net-worth buyers expect perfection. This means investing in professional styling, high-end photography, and potentially minor cosmetic updates before the first viewing. An immaculate presentation can increase the final sale price by up to 10%.",
      "**3. Document Preparation:** German real estate transactions are legally meticulous. Having all documents ready — including the Grundbuchauszug (land register excerpt), floor plans, building permits, and a valid Energieausweis (energy certificate) — prevents delays and builds buyer confidence.",
      "**4. Targeted Marketing:** Premium properties often benefit from discreet, off-market placement. By leveraging a curated network of pre-qualified buyers, you can achieve excellent results without the privacy compromises of a public listing.",
      "**5. Professional Negotiation:** The final stage requires tact, market knowledge, and experience. An expert broker will not only negotiate the price but also manage the notary process, ensuring a smooth, secure, and legally sound transaction."
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    date: "May 2025", readTime: "7 min read", author: "Thomas Bossert", featured: true,
  },
  {
    slug: "buying-first-property-frankfurt",
    category: "Buying Tips",
    title: "A First-Time Buyer's Guide to Frankfurt's Property Market",
    excerpt: "Navigating a new property market can be daunting. Our Frankfurt specialists walk you through financing, notary procedures, and neighbourhood selection.",
    content: [
      "Purchasing your first property in Frankfurt is an exciting milestone, but the German real estate process has unique nuances that can catch international buyers off guard. Preparation is the key to a smooth transaction.",
      "Firstly, understand your financing options before you start viewing. In Germany, it is highly recommended to obtain a financing certificate (Finanzierungsbestätigung) from your bank in advance. This demonstrates to sellers that you are a serious, qualified buyer, giving you a crucial edge in a competitive market.",
      "Next, familiarize yourself with the additional purchase costs (Kaufnebenkosten). In Hessen, these include the property transfer tax (Grunderwerbsteuer) at 6%, notary fees (approx. 1.5%), and land registry fees (approx. 0.5%). These must be factored into your total budget from the outset.",
      "Location strategy is also vital. While the Westend and Nordend are perennial favorites, emerging districts like the Ostend (near the ECB) offer excellent long-term potential. Working with a local advisor who understands the micro-markets can help you identify areas poised for growth that align with your lifestyle needs."
    ],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    date: "April 2025", readTime: "8 min read", author: "Sarah Hoffmann", featured: false,
  },
  {
    slug: "grunderwerbsteuer-explained",
    category: "Legal & Finance",
    title: "Grunderwerbsteuer Explained: What Every Buyer Needs to Know",
    excerpt: "Germany's property transfer tax can add 3-6% to your purchase cost. We explain how it works, when it applies, and how to budget for it correctly.",
    content: [
      "The Grunderwerbsteuer (Property Transfer Tax) is one of the most significant ancillary costs when buying real estate in Germany. Unlike the purchase price, this tax is non-negotiable and must be paid promptly after the purchase contract is notarized.",
      "The tax rate varies by federal state. In Hessen (covering Frankfurt and Wiesbaden) and Rhineland-Palatinate (covering Mainz), the rate is currently set at 6.0% and 5.0% respectively. This means on a €2 million property in Frankfurt, you must budget an additional €120,000 just for this tax.",
      "It is crucial to note that the tax is calculated on the total purchase price of the property, including the land and the building. However, certain movable assets included in the sale, such as a fitted kitchen (Einbauküche) or freestanding furniture, can sometimes be deducted from the taxable amount if explicitly stated and reasonably valued in the purchase contract.",
      "The local tax authority (Finanzamt) will issue a tax assessment notice shortly after notarization. Only once this tax is paid will the tax office issue a clearance certificate (Unbedenklichkeitsbescheinigung), which is required for the final transfer of ownership in the land register (Grundbuch)."
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    date: "March 2025", readTime: "5 min read", author: "Marcus Braun", featured: false,
  },
  {
    slug: "staging-your-home-for-sale",
    category: "Interior & Design",
    title: "How to Stage Your Home for a Faster, Higher Sale",
    excerpt: "First impressions sell properties. Our interior specialists share the proven staging techniques that help Bossert listings achieve premium results.",
    content: [
      "In the luxury real estate market, buyers are not just purchasing a structure; they are purchasing a lifestyle. Home staging is the art of presenting that lifestyle in its most appealing form, allowing potential buyers to instantly envision themselves living there.",
      "The core principle of staging is depersonalization. Removing personal photographs, unique collections, and bold personal color choices creates a neutral canvas. This doesn't mean the space should feel sterile—rather, it should feel like a high-end boutique hotel: inviting, elegant, and universally appealing.",
      "Lighting plays a disproportionate role in buyer psychology. Ensure every room is maximally lit during viewings. Clean all windows, open all blinds, and strategically place lamps in darker corners to create a warm, expansive atmosphere.",
      "Finally, define the purpose of every room. A spare room filled with boxes and a treadmill confuses buyers. By staging it clearly as a stylish home office or a welcoming guest bedroom, you add tangible value to the property's narrative. At Bossert Immobilien, our interior partners frequently utilize these techniques to reduce time-on-market and increase final sale values."
    ],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    date: "February 2025", readTime: "4 min read", author: "Julia Meier", featured: false,
  },
  {
    slug: "taunus-luxury-real-estate",
    category: "Lifestyle & Region",
    title: "Life in the Taunus: Why High-Net-Worth Buyers Are Moving Out of the City",
    excerpt: "Sweeping views, fresh air, and a 20-minute commute to Frankfurt — the Taunus Hills are attracting a new generation of discerning buyers seeking space without sacrifice.",
    content: [
      "The pandemic fundamentally altered how we view our living spaces, but even as urban life has fully resumed, the appeal of the Taunus region continues to grow among affluent buyers. Towns like Kronberg, Königstein, and Bad Homburg offer a compelling alternative to Frankfurt's dense city center.",
      "The primary draw is space. Buyers are prioritizing extensive private gardens, multiple home offices, and proximity to nature. The Taunus delivers this in abundance, with sweeping views over the Rhine-Main plain and immediate access to forested hiking trails.",
      "Crucially, moving to the Taunus does not mean sacrificing convenience. The region boasts excellent international schools, prestigious golf and country clubs, and Michelin-starred dining. Furthermore, the commute to Frankfurt's financial district or the international airport rarely exceeds 25 minutes.",
      "We are seeing a notable demographic shift, with younger, internationally mobile families driving demand for modernised heritage villas and contemporary architectural builds in the Taunus. This sustained demand makes the region not just a lifestyle upgrade, but a remarkably resilient investment."
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    date: "January 2025", readTime: "6 min read", author: "Thomas Bossert", featured: false,
  },
  {
    slug: "interest-rates-property-values",
    category: "Market Trends",
    title: "How Interest Rate Changes Are Reshaping German Property Values",
    excerpt: "The ECB rate cycle has had a profound effect on affordability and buyer behaviour. We analyse the data and explain what it means for your portfolio.",
    content: [
      "The European Central Bank's monetary policy is the single largest macroeconomic driver of real estate values. After the rapid rate hikes that characterized recent years, the current stabilization is bringing renewed predictability to the German property market.",
      "Higher borrowing costs have naturally compressed affordability for some segments of the market. However, in the luxury sector where Bossert Immobilien operates, the impact has been more nuanced. High-net-worth buyers often utilize higher equity ratios, insulating them somewhat from mortgage rate volatility.",
      "What has changed is the negotiation dynamic. Buyers are more discerning and less willing to engage in aggressive bidding wars for properties that require significant capital expenditure, particularly regarding energy efficiency upgrades.",
      "Conversely, 'turn-key' properties in prime locations (such as Frankfurt's Westend or Wiesbaden's Nordost) continue to command premium prices, as they offer immediate utility and act as a safe haven against inflation. Understanding this divergence is crucial for investors looking to optimize their portfolios in the current cycle."
    ],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    date: "December 2024", readTime: "7 min read", author: "Marcus Braun", featured: false,
  },
  {
    slug: "off-market-properties-explained",
    category: "Buying Tips",
    title: "Off-Market Properties: How to Access Deals That Never Go Public",
    excerpt: "The most desirable properties in the Rhine-Main region rarely reach a portal. We reveal how experienced buyers gain access to the discreet side of the market.",
    content: [
      "In the premium real estate sector, a significant portion of transactions occur entirely out of the public eye. These 'off-market' sales are preferred by high-profile sellers who value discretion, security, and a highly controlled sales process over mass exposure.",
      "For buyers, off-market properties represent exclusive opportunities to acquire exceptional assets without the pressure of public bidding wars. However, accessing this hidden inventory requires strategy and the right connections.",
      "The key to unlocking off-market deals is establishing a relationship with a well-connected, specialized broker. At Bossert Immobilien, we maintain a highly curated, confidential database of pre-qualified buyers. When a discreet listing becomes available, we match it directly with buyers whose profiles align with the property.",
      "To position yourself effectively, ensure your financing is pre-approved and clearly communicate your specific requirements to your broker. By acting decisively and maintaining confidentiality, you become a preferred candidate for these exclusive, non-public opportunities."
    ],
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    date: "November 2024", readTime: "5 min read", author: "Sarah Hoffmann", featured: false,
  },
];
