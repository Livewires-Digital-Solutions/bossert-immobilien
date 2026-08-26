// ─────────────────────────────────────────────────────────────────────────────
// Bossert Immobilien — Central Dummy Data Config
// Replace these with real CMS/API data when ready.
// ─────────────────────────────────────────────────────────────────────────────

export type PropertyStatus = "For Sale" | "Reserved" | "Sold";
export type PropertyType = "Villa" | "Penthouse" | "Apartment" | "House";

export interface Property {
  id: number;
  title: string;
  type: PropertyType;
  location: string;
  city: string;
  sqm: number;
  rooms: number;
  price: string;
  status: PropertyStatus;
  image: string; // Unsplash image URL
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string; // "buy" | "sell" | "evaluate"
}

export interface SellingStep {
  num: string;
  title: string;
  text: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTIES
// ─────────────────────────────────────────────────────────────────────────────

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Villa Marienhöhe",
    type: "Villa",
    location: "Nordost, Wiesbaden",
    city: "Wiesbaden",
    sqm: 480,
    rooms: 9,
    price: "€ 3.450.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: 2,
    title: "Penthouse am Main",
    type: "Penthouse",
    location: "Sachsenhausen, Frankfurt",
    city: "Frankfurt",
    sqm: 310,
    rooms: 6,
    price: "€ 4.200.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    id: 3,
    title: "Stadtvilla Mainz-Gonsenheim",
    type: "House",
    location: "Gonsenheim, Mainz",
    city: "Mainz",
    sqm: 350,
    rooms: 7,
    price: "€ 1.890.000",
    status: "Reserved",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    id: 4,
    title: "Luxus-Apartment Westend",
    type: "Apartment",
    location: "Westend, Frankfurt",
    city: "Frankfurt",
    sqm: 195,
    rooms: 4,
    price: "€ 2.100.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    id: 5,
    title: "Anwesen im Taunus",
    type: "Villa",
    location: "Kronberg, Taunus",
    city: "Kronberg",
    sqm: 620,
    rooms: 12,
    price: "€ 5.750.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  },
  {
    id: 6,
    title: "Designer-Penthouse Wiesbaden",
    type: "Penthouse",
    location: "Stadtmitte, Wiesbaden",
    city: "Wiesbaden",
    sqm: 270,
    rooms: 5,
    price: "€ 2.950.000",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
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
// SELLING PROCESS STEPS
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

// ─────────────────────────────────────────────────────────────────────────────
// TEAM MEMBERS
// ─────────────────────────────────────────────────────────────────────────────

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Maximilian Bossert",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Elena Bossert",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Julian Wagner",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
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
