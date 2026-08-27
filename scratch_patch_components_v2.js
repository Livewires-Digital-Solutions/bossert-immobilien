const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '_design-reference/designer-homepage/src/components');
const destDir = path.join(__dirname, 'src/components');

const filesToCopy = [
  'AccordionCard.tsx',
  'CtaSection.tsx',
  'ExploreSection.tsx', // Actually I manually wrote ExploreSection.tsx so I MUST skip it!
  'Footer.tsx',
  'HeroSection.tsx',
  'NewsletterSection.tsx',
  // 'PropertyCard.tsx', // skip, manually wrote
  'SearchSection.tsx',
  'ServicesSection.tsx',
  'StatsCard.tsx',
  'TestimonialSection.tsx',
  'WhySection.tsx'
];

for (const file of filesToCopy) {
  if (file === 'ExploreSection.tsx' || file === 'PropertyCard.tsx') continue;
  
  let content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  
  // Replace useLanguage with useTranslations
  content = content.replace(/import \{ useLanguage \} from '\.\.\/context\/LanguageContext';/g, "import { useTranslations } from 'next-intl';");
  
  // Fix the hook call
  content = content.replace(/const \{ t \} = useLanguage\(\);/g, "const t = useTranslations('Designer');");
  
  // Fix t.some.path but strictly match ` t.` or `{t.` or `!t.` to avoid matching React.
  content = content.replace(/([\{\s>\[(])t\.([a-zA-Z0-9_.]+)/g, "$1t('$2')");
  
  fs.writeFileSync(path.join(destDir, file), content);
  console.log(`Re-Patched and copied ${file}`);
}
