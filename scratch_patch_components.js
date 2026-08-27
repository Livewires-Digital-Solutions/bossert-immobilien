const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '_design-reference/designer-homepage/src/components');
const destDir = path.join(__dirname, 'src/components');

const filesToCopy = [
  'AccordionCard.tsx',
  'CtaSection.tsx',
  'ExploreSection.tsx',
  'Footer.tsx',
  'HeroSection.tsx',
  'NewsletterSection.tsx',
  'PropertyCard.tsx',
  'SearchSection.tsx',
  'ServicesSection.tsx',
  'StatsCard.tsx',
  'TestimonialSection.tsx',
  'WhySection.tsx'
];

for (const file of filesToCopy) {
  let content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  
  // Replace useLanguage with useTranslations
  content = content.replace(/import \{ useLanguage \} from '\.\.\/context\/LanguageContext';/g, "import { useTranslations } from 'next-intl';");
  content = content.replace(/const \{ t \} = useLanguage\(\);/g, "const t = useTranslations('Designer');");
  
  // Also remove specific useLanguage calls like `const { lang, setLang, t } = useLanguage();` in Navbar
  // Oh wait, Navbar has a lot of logic. I will patch Navbar separately.
  
  // Fix Image import in PropertyCard if needed (already uses next/image)
  
  // CtaSection has `const { t } = useLanguage();`
  // etc.
  
  // For ExploreSection, we need to wire Prisma? The task says wire Prisma for ExploreSection and WhySection (stats).
  // I will write ExploreSection manually later. Let's copy it first.

  fs.writeFileSync(path.join(destDir, file), content);
  console.log(`Patched and copied ${file}`);
}
