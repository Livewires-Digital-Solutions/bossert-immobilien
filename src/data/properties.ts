export interface Property {
  id: string;
  imageSrc: string;
  type: string;
  price: string;
  location: string;
  specs: string; // Keep for legacy
  title?: string;
  summary?: string;
  status?: string; // e.g., "Verfügbar"
  transactionType?: string; // e.g., "Buy"
  detailedSpecs?: {
    livingArea?: number;
    rooms?: number;
    otherRooms?: number;
    bathrooms?: number;
    plotArea?: number;
  };
  featured?: boolean;
  galleryImages?: string[];
  description?: string;
  amenities?: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  floorPlans?: string[];
  documents?: { title: string; url: string }[];
  locationData?: {
    coordinates?: [number, number];
    schools?: { name: string; distance: string }[];
    transport?: { name: string; type: string; distance: string }[];
  };
  financials?: {
    propertyTax?: number;
    hoaFees?: number;
  };
  // Detailed Facts
  livingArea?: string;
  plotArea?: string;
  rooms?: string;
  bedrooms?: string;
  bathrooms?: string;
  buildYear?: string;
  condition?: string;
  // Energy Details
  energy?: {
    heatingType?: string;
    firing?: string;
    energyPassType?: string;
    energyConsumption?: string;
    energyEfficiencyClass?: string;
  };
  // Commission
  commission?: string;
}

const baseProperties: Property[] = [
  {
    id: 'prop-base-1',
    imageSrc: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    type: 'Luxury Villa',
    title: 'More room for life – well-kept bungalow with large garden, sauna & pond near the B455',
    summary: 'A home with charm, generous space and a nature-close setting – ideal for families and those seeking peace.',
    status: 'Available',
    transactionType: 'Buy',
    price: '€649,000',
    location: 'WIESBADEN / NAUROD',
    specs: '5 Beds • 6 Baths • 650 m²',
    detailedSpecs: { livingArea: 125, rooms: 4, otherRooms: 5, bathrooms: 1, plotArea: 727 },
    featured: true,
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      '/test_bg_villa.jpg',
      '/background.jpg',
      '/images/prop_penthouse_1787771396787.jpg'
    ],
    description: 'An architectural masterpiece offering unparalleled luxury and sophistication. This stunning villa features bespoke finishes, soaring ceilings, and panoramic views of the surrounding landscape. The expansive outdoor living spaces, including an infinity pool and lush gardens, create a perfect sanctuary for relaxation and entertainment.',
    amenities: ['Infinity Pool', 'Home Theater', 'Wine Cellar', 'Smart Home System', 'Chef\'s Kitchen', 'Spa & Sauna'],
    videoUrl: 'https://www.youtube.com/embed/S2qYJdK0-hE',
    virtualTourUrl: 'https://my.matterport.com/show/?m=placeholder',
    floorPlans: ['/images/floorplan_placeholder.jpg'],
    documents: [
      { title: 'Property Brochure', url: '/brochure.pdf' },
      { title: 'Energy Performance Certificate', url: '/epc.pdf' }
    ],
    locationData: {
      coordinates: [34.0522, -118.2437],
      schools: [
        { name: 'Beverly Hills High', distance: '1.2 km' },
        { name: 'Westwood Elementary', distance: '0.8 km' }
      ],
      transport: [
        { name: 'Sunset Blvd Station', type: 'Bus', distance: '0.5 km' }
      ]
    },
    financials: {
      propertyTax: 42500,
      hoaFees: 1200
    }
  },
  {
    id: 'prop-base-2',
    imageSrc: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    type: 'Penthouse',
    title: 'Exclusive penthouse with skyline views and a private roof terrace',
    summary: 'A living dream above the rooftops of the city. High-end finishes and a spectacular outlook.',
    status: 'Sold',
    transactionType: 'Buy',
    price: '€1,250,000',
    location: 'FRANKFURT / WESTEND',
    specs: '3 Beds • 2 Baths • 180 m²',
    detailedSpecs: { livingArea: 180, rooms: 3, otherRooms: 1, bathrooms: 2, plotArea: 0 },
    featured: true,
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      '/test_bg_villa.jpg',
      '/background.jpg',
      '/images/prop_historic_1787771415250.jpg'
    ]
  },
  {
    id: 'prop-base-3',
    imageSrc: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    type: 'Historic Estate',
    title: 'Historic town villa with timeless elegance',
    summary: 'A unique atmosphere with original stucco, high ceilings and an idyllic garden.',
    status: 'Available',
    transactionType: 'Buy',
    price: '€2,100,000',
    location: 'BAD HOMBURG',
    specs: '7 Beds • 5 Baths • 850 m²',
    detailedSpecs: { livingArea: 320, rooms: 8, otherRooms: 3, bathrooms: 3, plotArea: 1200 },
    featured: true
  },
  {
    id: 'prop-base-4',
    imageSrc: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    type: 'Modern Apartment',
    title: 'Modern city apartment with smart-home technology',
    summary: 'Perfectly laid out, flooded with light and superbly connected to the city centre.',
    status: 'Reserved',
    transactionType: 'Rent',
    price: '€1,850 / month',
    location: 'MAINZ / ALTSTADT',
    specs: '2 Beds • 2 Baths • 140 m²',
    detailedSpecs: { livingArea: 95, rooms: 3, otherRooms: 1, bathrooms: 1, plotArea: 0 },
    featured: false
  },
  {
    id: 'prop-base-5',
    imageSrc: '/images/owners_editorial.jpg',
    type: 'City Townhouse',
    price: '€ 2,400,000',
    location: 'Berlin, DE',
    specs: '4 Beds • 3 Baths • 320 m²'
  },
  {
    id: 'prop-base-6',
    imageSrc: '/images/owners_cream.jpg',
    type: 'Minimalist Loft',
    price: '€ 1,150,000',
    location: 'Frankfurt, DE',
    specs: '2 Beds • 2 Baths • 145 m²'
  },
  {
    id: 'prop-base-7',
    imageSrc: '/images/owners_bg_wide.jpg',
    type: 'Waterfront Villa',
    price: '€ 6,700,000',
    location: 'Lake Como, IT',
    specs: '6 Beds • 7 Baths • 850 m²'
  },
  {
    id: 'prop-base-8',
    imageSrc: '/images/prop_villa_1787771383699.jpg',
    type: 'Modern Mansion',
    price: '€ 12,500,000',
    location: 'Miami, FL',
    specs: '7 Beds • 9 Baths • 1,400 m²'
  }
];

const commonDummyData = {
  description: 'An architectural masterpiece offering unparalleled luxury and sophistication. This stunning property features bespoke finishes, soaring ceilings, and panoramic views of the surrounding landscape. The expansive outdoor living spaces create a perfect sanctuary for relaxation and entertainment.',
  amenities: ['Hardwood Floors', 'High Ceilings', 'Smart Home System', 'Chef\'s Kitchen', 'Spa & Sauna', 'Private Garden'],
  videoUrl: 'https://www.youtube.com/embed/S2qYJdK0-hE',
  virtualTourUrl: 'https://my.matterport.com/show/?m=placeholder',
  floorPlans: ['/images/floorplan_placeholder.jpg'],
  documents: [
    { title: 'Property Brochure', url: '/brochure.pdf' },
    { title: 'Energy Performance Certificate', url: '/epc.pdf' }
  ],
  locationData: {
    coordinates: [34.0522, -118.2437] as [number, number],
    schools: [
      { name: 'Beverly Hills High', distance: '1.2 km' },
      { name: 'Westwood Elementary', distance: '0.8 km' }
    ],
    transport: [
      { name: 'Sunset Blvd Station', type: 'Bus', distance: '0.5 km' }
    ]
  },
  financials: {
    propertyTax: 25000,
    hoaFees: 800
  }
};

export const mockProperties: Property[] = Array.from({ length: 50 }, (_, i) => {
  const baseProp = baseProperties[i % baseProperties.length];
  return {
    ...commonDummyData,
    ...baseProp,
    id: `prop-${i + 1}`
  };
});
