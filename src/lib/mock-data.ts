// -----------------------------------------------------------------------------
// TEMP: MOCK DATA FOR STATIC DEPLOYMENT
// -----------------------------------------------------------------------------
// This file provides placeholder data so the frontend can be deployed to Vercel
// without a database connection. Once the database is ready, you can delete this
// file and revert the changes in the page components.
// -----------------------------------------------------------------------------

export interface MockProperty {
  id: number;
  slug: string;
  titleEn: string;
  titleDe: string;
  type: string;
  location: string;
  city: string;
  price: string;
  rooms: number;
  bathrooms: number;
  sqm: number;
  plotSqm: number | null;
  yearBuilt: number;
  energyClass: string;
  status: string;
  descriptionEn: string;
  descriptionDe: string;
  agent: string;
  published: boolean;
  featured: boolean;
  images: { url: string; order: number }[];
  features: { textEn: string; textDe: string; order: number }[];
}

export const mockProperties: MockProperty[] = [
  {
    id: 1,
    slug: 'villa-wiesbaden',
    titleEn: 'Historic Villa in Wiesbaden',
    titleDe: 'Historische Villa in Wiesbaden',
    type: 'Villa',
    location: 'Sonnenberg',
    city: 'Wiesbaden',
    price: '3500000',
    rooms: 8,
    bathrooms: 4,
    sqm: 450,
    plotSqm: 1200,
    yearBuilt: 1912,
    energyClass: 'C',
    status: 'AVAILABLE',
    descriptionEn: 'A stunning historic villa offering modern luxury and timeless elegance.',
    descriptionDe: 'Eine atemberaubende historische Villa, die modernen Luxus und zeitlose Eleganz bietet.',
    agent: 'Klaus Bossert',
    published: true,
    featured: true,
    images: [
      { url: '/test_bg_villa.jpg', order: 1 },
      { url: '/card1.jpg', order: 2 }
    ],
    features: [
      { textEn: 'Swimming Pool', textDe: 'Schwimmbad', order: 1 },
      { textEn: 'Large Garden', textDe: 'Großer Garten', order: 2 }
    ]
  },
  {
    id: 2,
    slug: 'frankfurt-penthouse',
    titleEn: 'Modern Penthouse with Skyline View',
    titleDe: 'Modernes Penthouse mit Skyline-Blick',
    type: 'Penthouse',
    location: 'Westend',
    city: 'Frankfurt',
    price: '2850000',
    rooms: 4,
    bathrooms: 2,
    sqm: 220,
    plotSqm: null,
    yearBuilt: 2018,
    energyClass: 'A',
    status: 'AVAILABLE',
    descriptionEn: 'Exclusive penthouse with panoramic views of the Frankfurt skyline.',
    descriptionDe: 'Exklusives Penthouse mit Panoramablick auf die Frankfurter Skyline.',
    agent: 'Markus Weber',
    published: true,
    featured: true,
    images: [
      { url: '/card3.jpg', order: 1 },
      { url: '/card1.jpg', order: 2 },
      { url: '/card4.jpg', order: 3 }
    ],
    features: [
      { textEn: 'Rooftop Terrace', textDe: 'Dachterrasse', order: 1 },
      { textEn: 'Underground Parking', textDe: 'Tiefgarage', order: 2 }
    ]
  },
  {
    id: 3,
    slug: 'city-apartment-berlin',
    titleEn: 'Modern City Apartment in Berlin',
    titleDe: 'Modernes Stadtapartment in Berlin',
    type: 'Apartment',
    location: 'Mitte',
    city: 'Berlin',
    price: '1200000',
    rooms: 3,
    bathrooms: 2,
    sqm: 120,
    plotSqm: null,
    yearBuilt: 2020,
    energyClass: 'A',
    status: 'AVAILABLE',
    descriptionEn: 'A beautiful and bright apartment in the heart of Berlin.',
    descriptionDe: 'Ein schönes und helles Apartment im Herzen von Berlin.',
    agent: 'Markus Weber',
    published: true,
    featured: true,
    images: [
      { url: '/card2.jpg', order: 1 },
      { url: '/test_bg_villa.jpg', order: 2 },
      { url: '/test_bg_estate.jpg', order: 3 }
    ],
    features: [
      { textEn: 'Balcony', textDe: 'Balkon', order: 1 }
    ]
  },
  {
    id: 4,
    slug: 'country-house-bavaria',
    titleEn: 'Charming Country House in Bavaria',
    titleDe: 'Charmantes Landhaus in Bayern',
    type: 'House',
    location: 'Starnberg',
    city: 'Munich',
    price: '4500000',
    rooms: 6,
    bathrooms: 3,
    sqm: 350,
    plotSqm: 2000,
    yearBuilt: 1995,
    energyClass: 'B',
    status: 'AVAILABLE',
    descriptionEn: 'A classic Bavarian country house with a large garden and lake access.',
    descriptionDe: 'Ein klassisches bayerisches Landhaus mit großem Garten und Seezugang.',
    agent: 'Klaus Bossert',
    published: true,
    featured: true,
    images: [
      { url: '/test_bg_estate.jpg', order: 1 },
      { url: '/card4.jpg', order: 2 },
      { url: '/card3.jpg', order: 3 }
    ],
    features: [
      { textEn: 'Large Garden', textDe: 'Großer Garten', order: 1 },
      { textEn: 'Lake Access', textDe: 'Seezugang', order: 2 }
    ]
  },
  {
    id: 5,
    slug: 'historic-apartment-heidelberg',
    titleEn: 'Historic Apartment in Heidelberg',
    titleDe: 'Historisches Apartment in Heidelberg',
    type: 'Apartment',
    location: 'Altstadt',
    city: 'Heidelberg',
    price: '850000',
    rooms: 4,
    bathrooms: 1,
    sqm: 110,
    plotSqm: null,
    yearBuilt: 1890,
    energyClass: 'D',
    status: 'AVAILABLE',
    descriptionEn: 'A historic apartment overlooking the old town.',
    descriptionDe: 'Ein historisches Apartment mit Blick auf die Altstadt.',
    agent: 'Elena Bossert',
    published: true,
    featured: false,
    images: [
      { url: '/card4.jpg', order: 1 },
      { url: '/test_bg_villa.jpg', order: 2 },
      { url: '/card1.jpg', order: 3 },
      { url: '/card2.jpg', order: 4 }
    ],
    features: [
      { textEn: 'Historic Details', textDe: 'Historische Details', order: 1 }
    ]
  },
  {
    id: 6,
    slug: 'modern-villa-stuttgart',
    titleEn: 'Modern Villa in Stuttgart',
    titleDe: 'Moderne Villa in Stuttgart',
    type: 'Villa',
    location: 'Killesberg',
    city: 'Stuttgart',
    price: '5200000',
    rooms: 7,
    bathrooms: 4,
    sqm: 400,
    plotSqm: 1500,
    yearBuilt: 2022,
    energyClass: 'A+',
    status: 'AVAILABLE',
    descriptionEn: 'A state-of-the-art villa with sustainable technology.',
    descriptionDe: 'Eine hochmoderne Villa mit nachhaltiger Technologie.',
    agent: 'Maximilian Bossert',
    published: true,
    featured: false,
    images: [
      { url: '/test_bg_villa.jpg', order: 1 },
      { url: '/card1.jpg', order: 2 },
      { url: '/card2.jpg', order: 3 }
    ],
    features: [
      { textEn: 'Smart Home', textDe: 'Smart Home', order: 1 }
    ]
  }
];

export interface MockReference {
  id: number;
  slug: string;
  titleEn: string;
  titleDe: string;
  category: string;
  location: string;
  year: string;
  summaryEn: string;
  summaryDe: string;
  descriptionEn: string;
  descriptionDe: string;
  result: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  published: boolean;
  images: { url: string; order: number }[];
}

export const mockReferences: MockReference[] = [
  {
    id: 1,
    slug: 'taunus-estate',
    titleEn: 'Sale of a Country Estate',
    titleDe: 'Verkauf eines Landguts',
    category: 'Villas & Estates',
    location: 'Taunus',
    year: '2025',
    summaryEn: 'Discreet sale of a premium estate to an international buyer.',
    summaryDe: 'Diskreter Verkauf eines Premium-Landguts an einen internationalen Käufer.',
    descriptionEn: 'We handled the off-market sale of one of the most prominent estates in the Taunus region, ensuring absolute discretion and a seamless process.',
    descriptionDe: 'Wir kümmerten uns um den Off-Market-Verkauf eines der prominentesten Anwesen im Taunus und sorgten für absolute Diskretion.',
    result: 'Sold off-market at asking price within 3 weeks.',
    testimonialQuote: 'Bossert Immobilien delivered exactly what they promised: discretion, speed, and professionalism.',
    testimonialAuthor: 'Dr. H. Schmidt',
    published: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80', order: 1 }
    ]
  },
  {
    id: 2,
    slug: 'berlin-penthouse-sale',
    titleEn: 'Record Sale in Berlin Mitte',
    titleDe: 'Rekordverkauf in Berlin Mitte',
    category: 'Penthouses',
    location: 'Berlin',
    year: '2024',
    summaryEn: 'Successfully marketed a luxury penthouse in the heart of Berlin.',
    summaryDe: 'Erfolgreiche Vermarktung eines Luxus-Penthouses im Herzen von Berlin.',
    descriptionEn: 'We handled the sale of this stunning property with a tailored marketing strategy, attracting international buyers.',
    descriptionDe: 'Wir haben den Verkauf dieser atemberaubenden Immobilie mit einer maßgeschneiderten Marketingstrategie abgewickelt.',
    result: 'Sold above asking price within 2 weeks.',
    testimonialQuote: 'Professional, reliable, and exceeded all our expectations. Highly recommended.',
    testimonialAuthor: 'M. Müller',
    published: true,
    images: [
      { url: '/card3.jpg', order: 1 }
    ]
  },
  {
    id: 3,
    slug: 'munich-villa-acquisition',
    titleEn: 'Acquisition of a Historic Villa',
    titleDe: 'Erwerb einer historischen Villa',
    category: 'Villas & Estates',
    location: 'Munich',
    year: '2023',
    summaryEn: 'Assisted an international client in acquiring a prime villa.',
    summaryDe: 'Unterstützung eines internationalen Kunden beim Erwerb einer erstklassigen Villa.',
    descriptionEn: 'Our advisory team facilitated the acquisition, handling all negotiations and due diligence.',
    descriptionDe: 'Unser Beratungsteam erleichterte den Erwerb und übernahm alle Verhandlungen und Due-Diligence-Prüfungen.',
    result: 'Successfully negotiated a 15% reduction from initial asking price.',
    testimonialQuote: 'Their market knowledge and negotiation skills saved us a fortune.',
    testimonialAuthor: 'James W.',
    published: true,
    images: [
      { url: '/test_bg_villa.jpg', order: 1 }
    ]
  },
  {
    id: 4,
    slug: 'frankfurt-commercial-lease',
    titleEn: 'Leasing of Premium Office Space',
    titleDe: 'Vermietung von Premium-Büroflächen',
    category: 'Commercial',
    location: 'Frankfurt',
    year: '2025',
    summaryEn: 'Leased 2,000 sqm of premium office space in the financial district.',
    summaryDe: 'Vermietung von 2.000 qm Premium-Bürofläche im Bankenviertel.',
    descriptionEn: 'We successfully matched a top-tier tech firm with their ideal headquarters.',
    descriptionDe: 'Wir haben erfolgreich ein erstklassiges Technologieunternehmen mit ihrem idealen Hauptsitz zusammengebracht.',
    result: 'Long-term lease secured ahead of schedule.',
    testimonialQuote: 'A seamless process from start to finish. Bossert Immobilien is our go-to partner.',
    testimonialAuthor: 'Sarah K., CEO',
    published: true,
    images: [
      { url: '/card4.jpg', order: 1 }
    ]
  }
];

export interface MockBlogPost {
  slug: string;
  titleEn: string;
  titleDe: string;
  category: string;
  excerptEn: string;
  excerptDe: string;
  contentEn: string[];
  contentDe: string[];
  image: string;
  date: string;
  readTime: string;
  author: string;
  featured: boolean;
  published: boolean;
}

export const mockBlogPosts: MockBlogPost[] = [
  {
    slug: 'market-outlook-2026',
    titleEn: 'Rhine-Main Property Market Outlook 2026',
    titleDe: 'Rhein-Main Immobilienmarkt Ausblick 2026',
    category: 'Market Updates',
    excerptEn: 'An analysis of pricing trends and buyer demand across Wiesbaden and Frankfurt.',
    excerptDe: 'Eine Analyse der Preistrends und der Käufernachfrage in Wiesbaden und Frankfurt.',
    contentEn: ['The real estate market in the Rhine-Main region continues to show resilience...', 'Buyers are increasingly looking for energy-efficient homes...'],
    contentDe: ['Der Immobilienmarkt in der Rhein-Main-Region zeigt weiterhin Widerstandsfähigkeit...', 'Käufer suchen zunehmend nach energieeffizienten Häusern...'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
    date: 'August 15, 2026',
    readTime: '5 min read',
    author: 'Klaus Bossert',
    featured: true,
    published: true
  },
  {
    slug: 'preparing-home-for-sale',
    titleEn: 'Preparing Your Home for a Premium Sale',
    titleDe: 'Bereiten Sie Ihr Zuhause für einen Premium-Verkauf vor',
    category: 'Selling Advice',
    excerptEn: 'Five essential steps to maximize your property value before listing.',
    excerptDe: 'Fünf wesentliche Schritte, um den Wert Ihrer Immobilie vor dem Verkauf zu maximieren.',
    contentEn: ['First impressions matter. Start by decluttering and depersonalizing the space...', 'Invest in minor repairs and touch-ups...'],
    contentDe: ['Der erste Eindruck zählt. Beginnen Sie mit dem Entrümpeln und Entpersonalisieren des Raumes...', 'Investieren Sie in kleinere Reparaturen und Ausbesserungen...'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80',
    date: 'July 22, 2026',
    readTime: '4 min read',
    author: 'Markus Weber',
    featured: false,
    published: true
  }
];

export interface MockKnowledgeArticle {
  slug: string;
  titleEn: string;
  titleDe: string;
  category: string;
  excerptEn: string;
  excerptDe: string;
  contentEn: string[];
  contentDe: string[];
  image: string;
  date: string;
  readTime: string;
  author: string;
  published: boolean;
}

export const mockKnowledgeArticles: MockKnowledgeArticle[] = [
  {
    slug: 'guide-to-property-valuation',
    titleEn: 'The Ultimate Guide to Property Valuation',
    titleDe: 'Der ultimative Leitfaden zur Immobilienbewertung',
    category: 'Valuation',
    excerptEn: 'Understand the metrics and methods used to accurately price premium real estate.',
    excerptDe: 'Verstehen Sie die Kennzahlen und Methoden zur genauen Preisgestaltung von Premium-Immobilien.',
    contentEn: ['Valuation is both an art and a science...', 'Market comparables provide a baseline, but unique features dictate the final premium...'],
    contentDe: ['Die Bewertung ist sowohl eine Kunst als auch eine Wissenschaft...', 'Marktvergleiche bieten eine Basis, aber einzigartige Merkmale bestimmen den endgültigen Aufschlag...'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
    date: 'June 10, 2026',
    readTime: '8 min read',
    author: 'Klaus Bossert',
    published: true
  }
];

export interface MockTeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  bioEn: string;
  bioDe: string;
  email: string;
  phone: string;
  languages: string[];
  specialties: string[];
  order: number;
  published: boolean;
}

export const mockTeamMembers: MockTeamMember[] = [
  {
    slug: 'klaus-bossert',
    name: 'Klaus Bossert',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    bioEn: 'With over 25 years of experience in the luxury real estate market, Klaus has built a reputation for absolute discretion and unparalleled results.',
    bioDe: 'Mit über 25 Jahren Erfahrung im Markt für Luxusimmobilien hat sich Klaus einen Ruf für absolute Diskretion und beispiellose Ergebnisse erarbeitet.',
    email: 'k.bossert@bossert-immobilien.de',
    phone: '+49 611 123456',
    languages: ['German', 'English'],
    specialties: ['Villas', 'Estates', 'Off-Market Sales'],
    order: 1,
    published: true
  },
  {
    slug: 'markus-weber',
    name: 'Markus Weber',
    role: 'Senior Partner',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    bioEn: 'Markus specializes in modern penthouses and high-yield investment properties across Frankfurt and the Taunus region.',
    bioDe: 'Markus ist spezialisiert auf moderne Penthouses und renditestarke Anlageimmobilien in Frankfurt und im Taunus.',
    email: 'm.weber@bossert-immobilien.de',
    phone: '+49 611 123457',
    languages: ['German', 'English', 'French'],
    specialties: ['Penthouses', 'Investment Properties'],
    order: 2,
    published: true
  }
];
