/**
 * Seeds the Article table with the articles that were previously hard-coded in
 * src/locales/{en,de}.ts. Idempotent (upsert by slug).
 *
 *   npm run db:seed:articles
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** Convert the old "\n\n / ### / >" plain text into the HTML TipTap stores. */
function toHtml(raw: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return raw
    .split(/\n\n+/)
    .map((block) => {
      const b = block.trim();
      if (!b) return '';
      if (b.startsWith('### ')) {
        const [first, ...rest] = b.split('\n');
        const h = `<h3>${esc(first.slice(4).trim())}</h3>`;
        const body = rest.join('\n').trim();
        return body ? `${h}\n<p>${esc(body).replace(/\n/g, '<br>')}</p>` : h;
      }
      if (b.startsWith('> ')) {
        return `<blockquote><p>${esc(b.slice(2).trim())}</p></blockquote>`;
      }
      return `<p>${esc(b).replace(/\n/g, '<br>')}</p>`;
    })
    .filter(Boolean)
    .join('\n');
}

interface Src {
  slug: string;
  category: string;
  featured?: boolean;
  publishedAt: string;
  en: { title: string; desc: string; content: string };
  de: { title: string; desc: string; content: string };
  image: string;
}

const articles: Src[] = [
  {
    slug: 'q3-frankfurt-luxury-market-report',
    category: 'Market Reports',
    featured: true,
    publishedAt: '2023-10-01',
    image: '/images/owners_bg_wide.jpg',
    en: {
      title: 'The Q3 Frankfurt Luxury Market Report',
      desc: "An in-depth analysis of high-end residential real estate trends, off-market shifts, and capital appreciation in Frankfurt's most exclusive districts.",
      content:
        'The Frankfurt luxury real estate market has seen unprecedented shifts in the third quarter of 2023. While the broader market experiences cooling due to interest rate adjustments, the ultra-prime segment remains fiercely competitive.\n\n### The Shift to Off-Market\nOne of the most notable trends is the increasing volume of transactions occurring entirely off-market. High-net-worth individuals are prioritizing discretion more than ever, relying on private broker networks to secure generational assets.\n\n### Capital Appreciation in Westend and Holzhausenviertel\nDespite macroeconomic headwinds, core premium districts have maintained their value, with select renovated historic estates seeing a 4% appreciation quarter-over-quarter. Buyers are seeking turnkey properties, willing to pay a premium for move-in ready luxury.\n\n> "The definition of prime real estate is evolving. It is no longer just about location, but about the seamless integration of modern technology within historic walls." — Klaus Bossert',
    },
    de: {
      title: 'Der Q3 Frankfurter Luxusmarkt-Bericht',
      desc: 'Eine detaillierte Analyse der Trends bei hochwertigen Wohnimmobilien, Off-Market-Verschiebungen und Wertsteigerungen in den exklusivsten Vierteln Frankfurts.',
      content:
        'Der Frankfurter Luxusimmobilienmarkt hat im dritten Quartal 2023 beispiellose Verschiebungen erlebt. Während der breitere Markt aufgrund von Zinsanpassungen eine Abkühlung erfährt, bleibt das Ultra-Prime-Segment stark umkämpft.\n\n### Die Verlagerung zum Off-Market\nEiner der bemerkenswertesten Trends ist das zunehmende Volumen von Transaktionen, die vollständig off-market stattfinden. Vermögende Privatpersonen legen mehr denn je Wert auf Diskretion und verlassen sich auf private Maklernetzwerke, um Generationenwerte zu sichern.\n\n### Wertsteigerung im Westend und Holzhausenviertel\nTrotz makroökonomischem Gegenwind haben die Premium-Kernviertel ihren Wert gehalten, wobei ausgewählte renovierte historische Anwesen eine Wertsteigerung von 4% im Quartalsvergleich verzeichneten. Käufer suchen nach schlüsselfertigen Immobilien und sind bereit, einen Aufpreis für sofort beziehbaren Luxus zu zahlen.\n\n> "Die Definition von erstklassigen Immobilien entwickelt sich weiter. Es geht nicht mehr nur um die Lage, sondern um die nahtlose Integration moderner Technologie in historische Mauern." — Klaus Bossert',
    },
  },
  {
    slug: 'preserving-heritage',
    category: 'Architecture',
    publishedAt: '2023-09-01',
    image: '/images/owners_editorial.jpg',
    en: {
      title: 'Preserving Heritage: The Revival of Altbau Estates',
      desc: 'How historical properties are being modernized without sacrificing their original architectural integrity.',
      content:
        'Germany’s historic "Altbau" properties hold a unique place in the luxury market. Characterized by high ceilings, ornate stucco work, and original parquet flooring, these estates are highly sought after.\n\n### The Modernization Challenge\nUpdating these 19th and early 20th-century buildings to meet 21st-century standards without destroying their soul requires profound architectural sensitivity. The integration of smart home technology, underfloor heating, and energy-efficient insulation must be practically invisible.\n\n### Value Retention\nA meticulously restored Altbau often commands a higher price per square meter than a new build in the same location. Buyers are not just purchasing a home; they are acquiring a piece of architectural history.',
    },
    de: {
      title: 'Erbe bewahren: Die Wiederbelebung von Altbau-Anwesen',
      desc: 'Wie historische Immobilien modernisiert werden, ohne ihre ursprüngliche architektonische Integrität zu opfern.',
      content:
        'Deutschlands historische "Altbau"-Immobilien nehmen auf dem Luxusmarkt einen einzigartigen Platz ein. Geprägt durch hohe Decken, kunstvolle Stuckarbeiten und originales Parkett, sind diese Anwesen heiß begehrt.\n\n### Die Modernisierungs-Herausforderung\nDie Aktualisierung dieser Gebäude aus dem 19. und frühen 20. Jahrhundert auf den Standard des 21. Jahrhunderts, ohne ihre Seele zu zerstören, erfordert tiefes architektonisches Feingefühl. Die Integration von Smart-Home-Technologie, Fußbodenheizung und energieeffizienter Dämmung muss praktisch unsichtbar sein.\n\n### Werterhalt\nEin akribisch restaurierter Altbau erzielt oft einen höheren Quadratmeterpreis als ein Neubau in derselben Lage. Käufer erwerben nicht nur ein Zuhause; sie erwerben ein Stück Architekturgeschichte.',
    },
  },
  {
    slug: 'navigating-off-market',
    category: 'Investment',
    publishedAt: '2023-08-01',
    image: '/test_bg_penthouse.jpg',
    en: {
      title: 'Navigating the Off-Market Landscape',
      desc: 'Why the most significant transactions in prime locations happen behind closed doors, and how to access them.',
      content:
        'In the upper echelons of the real estate market, visibility is often viewed as a disadvantage. The finest properties are rarely listed on public portals.\n\n### The Value of Discretion\nFor both sellers and buyers, off-market transactions offer unparalleled privacy. Sellers avoid the stigma of a property "sitting" on the market, while buyers avoid bidding wars and public scrutiny.\n\n### Accessing the Hidden Market\nNavigating this hidden market requires access to established, trusted networks. Family offices, private wealth managers, and specialized boutique brokers are the gatekeepers to these exclusive opportunities.',
    },
    de: {
      title: 'Navigation durch die Off-Market-Landschaft',
      desc: 'Warum die wichtigsten Transaktionen in Bestlagen hinter verschlossenen Türen stattfinden und wie man Zugang erhält.',
      content:
        'In den oberen Etagen des Immobilienmarktes wird Sichtbarkeit oft als Nachteil angesehen. Die besten Immobilien werden selten auf öffentlichen Portalen gelistet.\n\n### Der Wert der Diskretion\nSowohl für Verkäufer als auch für Käufer bieten Off-Market-Transaktionen eine beispiellose Privatsphäre. Verkäufer vermeiden das Stigma einer Immobilie, die lange auf dem Markt "sitzt", während Käufer Bieterkriege und öffentliche Aufmerksamkeit vermeiden.\n\n### Zugang zum verborgenen Markt\nDie Navigation durch diesen verborgenen Markt erfordert Zugang zu etablierten, vertrauenswürdigen Netzwerken. Family Offices, private Vermögensverwalter und spezialisierte Boutique-Makler sind die Wächter dieser exklusiven Möglichkeiten.',
    },
  },
  {
    slug: 'legal-regulations',
    category: 'Legal',
    publishedAt: '2023-07-01',
    image: '/test_bg_villa.jpg',
    en: {
      title: 'New Regulations for Heritage Properties',
      desc: 'A comprehensive guide to navigating the latest zoning and renovation laws for listed buildings.',
      content:
        'Owning a listed building (Denkmalschutz) is a privilege that comes with strict responsibilities. Recent updates to heritage conservation laws have introduced new complexities for property owners.\n\n### Energy Efficiency vs. Conservation\nThe push for greener buildings often clashes with heritage preservation rules. Installing modern double-glazing or solar panels requires special permits and creative architectural solutions.\n\n### Tax Incentives\nWhile the regulations are stringent, the financial benefits can be substantial. Understanding the "Denkmal-AfA" (depreciation of heritage buildings) is crucial for maximizing the investment potential of historic real estate.',
    },
    de: {
      title: 'Neue Vorschriften für denkmalgeschützte Immobilien',
      desc: 'Ein umfassender Leitfaden zur Navigation durch die neuesten Bebauungs- und Renovierungsgesetze für denkmalgeschützte Gebäude.',
      content:
        'Der Besitz eines denkmalgeschützten Gebäudes ist ein Privileg, das mit strengen Pflichten einhergeht. Jüngste Aktualisierungen der Denkmalschutzgesetze haben für Immobilieneigentümer neue Komplexitäten eingeführt.\n\n### Energieeffizienz vs. Denkmalschutz\nDas Bestreben nach umweltfreundlicheren Gebäuden kollidiert oft mit Denkmalschutzregeln. Die Installation von moderner Doppelverglasung oder Sonnenkollektoren erfordert Sondergenehmigungen und kreative architektonische Lösungen.\n\n### Steuerliche Anreize\nWährend die Vorschriften streng sind, können die finanziellen Vorteile erheblich sein. Das Verständnis der "Denkmal-AfA" (Abschreibung für denkmalgeschützte Gebäude) ist entscheidend, um das Investitionspotenzial historischer Immobilien zu maximieren.',
    },
  },
  {
    slug: 'turnkey-luxury',
    category: 'Investment',
    publishedAt: '2023-06-01',
    image: '/test_bg_estate.jpg',
    en: {
      title: 'The Rise of Turnkey Luxury',
      desc: 'Why international buyers are increasingly demanding fully furnished, design-ready homes.',
      content:
        'Time is the ultimate luxury. For international executives and investors, the traditional process of buying, renovating, and furnishing a property is no longer appealing.\n\n### The "Move-In Ready" Premium\nTurnkey properties—where everything from the bespoke Italian furniture to the silverware is included—are commanding significant premiums. Buyers are willing to pay up to 20% more for the convenience of walking in with just a suitcase.\n\n### Design as a Differentiator\nIn this segment, the interior design must meet world-class standards. Collaborations with renowned design houses and the inclusion of curated art collections are becoming standard in turnkey luxury offerings.',
    },
    de: {
      title: 'Der Aufstieg des schlüsselfertigen Luxus',
      desc: 'Warum internationale Käufer zunehmend komplett eingerichtete, designfertige Wohnungen nachfragen.',
      content:
        'Zeit ist der ultimative Luxus. Für internationale Führungskräfte und Investoren ist der traditionelle Prozess des Kaufs, der Renovierung und der Einrichtung einer Immobilie nicht mehr attraktiv.\n\n### Die "Bezugsfertig"-Prämie\nSchlüsselfertige Immobilien – bei denen von den maßgefertigten italienischen Möbeln bis zum Besteck alles inbegriffen ist – erzielen erhebliche Aufschläge. Käufer sind bereit, bis zu 20% mehr für den Komfort zu zahlen, nur mit einem Koffer einziehen zu können.\n\n### Design als Unterscheidungsmerkmal\nIn diesem Segment muss die Inneneinrichtung Weltklasse-Standards entsprechen. Kooperationen mit renommierten Designhäusern und die Einbeziehung kuratierter Kunstsammlungen werden im schlüsselfertigen Luxusangebot zum Standard.',
    },
  },
];

async function main() {
  for (const a of articles) {
    const data = {
      category: a.category,
      coverImage: a.image,
      status: 'PUBLISHED' as const,
      featured: Boolean(a.featured),
      publishedAt: new Date(a.publishedAt),
      titleEn: a.en.title,
      titleDe: a.de.title,
      excerptEn: a.en.desc,
      excerptDe: a.de.desc,
      bodyEn: toHtml(a.en.content),
      bodyDe: toHtml(a.de.content),
    };
    await prisma.article.upsert({
      where: { slug: a.slug },
      create: { slug: a.slug, ...data },
      update: data,
    });
    console.log(`  ✓ ${a.slug}`);
  }
  console.log(`Seeded ${articles.length} articles.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
