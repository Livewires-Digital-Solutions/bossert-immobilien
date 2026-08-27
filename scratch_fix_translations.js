const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/components');

const filesToPatch = [
  'AccordionCard.tsx',
  'CtaSection.tsx',
  'Footer.tsx',
  'HeroSection.tsx',
  'NewsletterSection.tsx',
  'SearchSection.tsx',
  'ServicesSection.tsx',
  'StatsCard.tsx',
  'TestimonialSection.tsx',
  'WhySection.tsx'
];

for (const file of filesToPatch) {
  const filePath = path.join(srcDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace t.some.path with t('some.path')
    content = content.replace(/t\.([a-zA-Z0-9_.]+)/g, "t('$1')");
    
    // Replace <a href="#"> with Next <Link href="#"> where possible, or just ignore for now? 
    // The user wants exactly the same code, so if I don't use Link it's fine, but next-intl might prefer it.
    // Let's just do the `t` function fix first.
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed translation syntax in ${file}`);
  }
}
