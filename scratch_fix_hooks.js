const fs = require('fs');
const path = require('path');

// 1. Create useSectionReveal.ts
const originalHookPath = path.join(__dirname, '_design-reference/designer-homepage/src/hooks/useScrollReveal.ts');
let hookContent = fs.readFileSync(originalHookPath, 'utf8');
hookContent = hookContent.replace(/useScrollReveal/g, 'useSectionReveal');
fs.writeFileSync(path.join(__dirname, 'src/hooks/useSectionReveal.ts'), hookContent);

// 2. Patch components to use useSectionReveal
const srcDir = path.join(__dirname, 'src/components');
const filesToPatch = [
  'CtaSection.tsx',
  'ExploreSection.tsx',
  'Footer.tsx',
  'HeroSection.tsx',
  'SearchSection.tsx',
  'ServicesSection.tsx',
  'TestimonialSection.tsx',
  'WhySection.tsx'
];

for (const file of filesToPatch) {
  const filePath = path.join(srcDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Change import
    content = content.replace(/import\s+\{\s*useScrollReveal\s*\}\s+from\s+['"]\.\.\/hooks\/useScrollReveal['"];/g, 
      "import { useSectionReveal } from '../hooks/useSectionReveal';");
      
    // Change call
    content = content.replace(/useScrollReveal\(/g, "useSectionReveal(");
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated hook in ${file}`);
  }
}
