/**
 * Seed script to add dummy property listings
 * Run with: $env:DATABASE_URL="mysql://root:@localhost:3306/bossert_sysops"; npx tsx src/lib/seed-properties.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dummyProperties = [
  {
    type: 'Contemporary Villa — Taunus Foothills',
    status: 'PUBLISHED' as const,
    featured: true,
    priceDisplay: '€ 5,750,000',
    priceValue: 5750000,
    location: 'Kronberg im Taunus, DE',
    specs: '6 Beds • 5 Baths • 720 m²',
    beds: 6,
    baths: 5,
    areaSqm: 720,
    heroImage: '/images/prop_villa_1787771383699.jpg',
    descriptionEn:
      'A breathtaking contemporary villa set against the rolling hills of the Taunus. Floor-to-ceiling glazing floods every room with natural light while framing expansive views across the Rhine-Main plain. The property features a heated infinity pool, a private cinema room, and a professional chef\'s kitchen finished with Bulthaup cabinetry and Gaggenau appliances. The master suite occupies the entire upper floor, offering a private terrace, a dressing room of exceptional scale, and a marble bathroom with both indoor and outdoor shower.',
    descriptionDe:
      'Eine atemberaubende zeitgenössische Villa vor den sanften Hügeln des Taunus. Raumhohe Verglasung lässt natürliches Licht in jeden Raum ein und rahmt weite Ausblicke über die Rhein-Main-Ebene. Das Anwesen verfügt über einen beheizten Infinity-Pool, einen privaten Kinoraum und eine professionelle Küche mit Bulthaup-Einbauküche und Gaggenau-Geräten.',
    amenities: ['Infinity Pool', 'Private Cinema', "Chef's Kitchen", 'Smart Home System', 'Wine Cellar', 'Spa & Sauna', 'Triple Garage', 'Landscaped Gardens'],
    schools: [
      { name: 'Schule am Tannenwald', distance: '0.4 km' },
      { name: 'Gymnasium Kronberg', distance: '1.2 km' },
    ],
    transport: [
      { name: 'Kronberg Bahnhof', type: 'S-Bahn', distance: '1.8 km' },
      { name: 'A661 Motorway', type: 'Highway', distance: '3.5 km' },
    ],
  },
  {
    type: 'Sky Penthouse — Frankfurt Westend',
    status: 'PUBLISHED' as const,
    featured: true,
    priceDisplay: '€ 4,100,000',
    priceValue: 4100000,
    location: 'Frankfurt am Main, DE',
    specs: '4 Beds • 3 Baths • 320 m²',
    beds: 4,
    baths: 3,
    areaSqm: 320,
    heroImage: '/images/prop_penthouse_1787771396787.jpg',
    descriptionEn:
      'An exclusive full-floor penthouse crowning one of Frankfurt\'s most prestigious residential towers. The 320 m² residence offers panoramic views of the city skyline and the Taunus mountains from a 180 m² wraparound rooftop terrace. Interiors were curated by a Berlin-based design studio and feature bespoke marble surfaces, heated stone floors, and a signature double-height living hall. A private lift provides direct access from the underground garage.',
    descriptionDe:
      'Ein exklusives Volletagen-Penthouse krönt einen der renommiertesten Wohnhochhäuser Frankfurts. Die 320 m² große Residenz bietet Panoramablicke auf die Skyline und die Taunusberge von einer 180 m² großen umlaufenden Dachterrasse.',
    amenities: ['Private Rooftop Terrace 180m²', 'Concierge 24/7', 'Private Lift', 'Smart Home', 'Heated Stone Floors', 'Double Underground Parking', 'Wine Storage'],
    schools: [
      { name: 'International School Frankfurt', distance: '1.5 km' },
      { name: 'Musterschule', distance: '0.8 km' },
    ],
    transport: [
      { name: 'Westend U-Bahn', type: 'U-Bahn', distance: '0.3 km' },
      { name: 'Frankfurt Hauptbahnhof', type: 'Train', distance: '2.1 km' },
    ],
  },
  {
    type: 'Wilhelminian Manor — Wiesbaden',
    status: 'PUBLISHED' as const,
    featured: true,
    priceDisplay: '€ 11,500,000',
    priceValue: 11500000,
    location: 'Wiesbaden, DE',
    specs: '9 Beds • 8 Baths • 1,450 m²',
    beds: 9,
    baths: 8,
    areaSqm: 1450,
    heroImage: '/images/prop_estate_1787771411381.jpg',
    descriptionEn:
      'A singular Wilhelminian-era manor commanding a prime elevated position above Wiesbaden\'s historic spa quarter. Originally constructed in 1898, the estate has been meticulously restored over five years, preserving its stucco ceilings, original parquet floors, and monumental marble fireplaces while introducing discreet modern infrastructure. The 3,200 m² landscaped park includes a restored orangery, a heated pool house, and a secondary guest pavilion.',
    descriptionDe:
      'Ein singuläres Gründerzeitanwesen in dominanter Hanglage über Wiesbadens historischem Kurquartier. Das 1898 erbaute Gut wurde über fünf Jahre meisterhaft restauriert – unter Bewahrung der Stuckdecken, originalen Parkettböden und monumentalen Marmorkamine.',
    amenities: ['Heated Pool House', 'Restored Orangery', 'Guest Pavilion', 'Wine Cellar', 'Staff Quarters', 'Heritage Listed', '3200m² Park', 'Carriage House'],
    schools: [
      { name: 'Europäische Schule Wiesbaden', distance: '2.3 km' },
      { name: 'Kaiser-Friedrich-Gymnasium', distance: '1.9 km' },
    ],
    transport: [
      { name: 'Wiesbaden Hauptbahnhof', type: 'Train', distance: '3.2 km' },
      { name: 'Nerotal Tram Stop', type: 'Tram', distance: '0.6 km' },
    ],
  },
  {
    type: 'Garden Apartment — Sachsenhausen',
    status: 'PUBLISHED' as const,
    featured: false,
    priceDisplay: '€ 1,650,000',
    priceValue: 1650000,
    location: 'Frankfurt-Sachsenhausen, DE',
    specs: '3 Beds • 2 Baths • 185 m²',
    beds: 3,
    baths: 2,
    areaSqm: 185,
    heroImage: '/images/prop_apartment_new.jpg',
    descriptionEn:
      'A refined ground-floor apartment in a boutique residential building steps from the Museumsufer promenade. The 185 m² residence opens to a generous 80 m² private garden — an exceptional rarity in the city. High-grade Poggenpohl kitchen, underfloor heating throughout, and bespoke built-in storage characterise the interior. Two covered underground parking spaces included.',
    descriptionDe:
      'Eine gepflegte Erdgeschosswohnung in einem Boutique-Wohngebäude, nur wenige Schritte vom Museumsufer entfernt. Die 185 m² große Residenz öffnet sich zu einem großzügigen 80 m² privaten Garten.',
    amenities: ['Private Garden 80m²', 'Underground Parking x2', 'Poggenpohl Kitchen', 'Underfloor Heating', 'Bike Storage', 'Concierge'],
    schools: [
      { name: 'Liebigschule', distance: '1.1 km' },
      { name: 'Schillerschule', distance: '0.9 km' },
    ],
    transport: [
      { name: 'Schweizer Platz U-Bahn', type: 'U-Bahn', distance: '0.4 km' },
      { name: 'Lokalbahnhof S-Bahn', type: 'S-Bahn', distance: '0.7 km' },
    ],
  },
  {
    type: 'Lakefront Estate — Starnberger See',
    status: 'PUBLISHED' as const,
    featured: false,
    priceDisplay: '€ 7,900,000',
    priceValue: 7900000,
    location: 'Tutzing, Starnberger See',
    specs: '7 Beds • 6 Baths • 890 m²',
    beds: 7,
    baths: 6,
    areaSqm: 890,
    heroImage: '/images/prop_villa_1787771383699.jpg',
    descriptionEn:
      'An exceptional lakefront property on the shores of Starnberger See with 45 metres of direct waterfront. The 890 m² residence is arranged across three levels and designed to maximise lake views from every principal room. The property includes a private boathouse, a lake-heated swimming pool, a sauna pavilion, and a landscaped terrace with a retractable roof structure. Alpine mountain views complete the setting.',
    descriptionDe:
      'Eine außergewöhnliche Seeuferimmobilie am Starnberger See mit 45 Metern direktem Seezugang. Das Anwesen umfasst 890 m² auf drei Etagen und bietet von jedem Hauptraum Seeblicke.',
    amenities: ['Private Boathouse', 'Lake-Heated Pool', 'Sauna Pavilion', '45m Direct Waterfront', 'Retractable Terrace Roof', 'Triple Garage', 'Alpine Views'],
    schools: [
      { name: 'Gymnasium Starnberg', distance: '8 km' },
    ],
    transport: [
      { name: 'Tutzing S-Bahn', type: 'S-Bahn', distance: '1.4 km' },
      { name: 'A952 Motorway', type: 'Highway', distance: '4 km' },
    ],
  },
];

async function main() {
  console.log('🏠 Seeding dummy properties...\n');
  let added = 0;

  for (const prop of dummyProperties) {
    const { amenities, schools, transport, ...propData } = prop;

    // Skip if same type+location already exists
    const existing = await prisma.property.findFirst({
      where: { type: propData.type, location: propData.location },
    });

    if (existing) {
      console.log(`⏭️  Skipping (already exists): ${propData.type}`);
      continue;
    }

    const created = await prisma.property.create({ data: propData });

    if (amenities?.length) {
      await prisma.propertyAmenity.createMany({
        data: amenities.map((name) => ({ propertyId: created.id, name })),
      });
    }

    if (schools?.length) {
      await prisma.nearbySchool.createMany({
        data: schools.map((s) => ({ propertyId: created.id, ...s })),
      });
    }

    if (transport?.length) {
      await prisma.nearbyTransport.createMany({
        data: transport.map((t) => ({ propertyId: created.id, ...t })),
      });
    }

    console.log(`✅ Created: ${propData.type} — ${propData.location}`);
    added++;
  }

  const total = await prisma.property.count();
  console.log(`\n🎉 Done! Added ${added} new properties. Total in DB: ${total}`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
