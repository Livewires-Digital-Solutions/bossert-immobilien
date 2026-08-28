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
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80', order: 1 },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80', order: 2 }
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
      { url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1600&q=80', order: 1 }
    ],
    features: [
      { textEn: 'Rooftop Terrace', textDe: 'Dachterrasse', order: 1 },
      { textEn: 'Underground Parking', textDe: 'Tiefgarage', order: 2 }
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
