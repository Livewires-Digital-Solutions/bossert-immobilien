const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/components');

const patches = [
  {
    file: 'ServicesSection.tsx',
    search: /t\('services\.items'\)/g,
    replace: "(t.raw('services.items') as any[])"
  },
  {
    file: 'TestimonialSection.tsx',
    search: /t\('testimonials\.items'\)/g,
    replace: "(t.raw('testimonials.items') as any[])"
  },
  {
    file: 'Footer.tsx',
    search: /t\('footer\.links\.column1'\)/g,
    replace: "(t.raw('footer.links.column1') as any[])"
  },
  {
    file: 'Footer.tsx',
    search: /t\('footer\.links\.column2'\)/g,
    replace: "(t.raw('footer.links.column2') as any[])"
  },
  {
    file: 'Footer.tsx',
    search: /t\('footer\.links\.column3'\)/g,
    replace: "(t.raw('footer.links.column3') as any[])"
  },
  {
    file: 'Footer.tsx',
    search: /t\('footer\.bottomLinks'\)/g,
    replace: "(t.raw('footer.bottomLinks') as any[])"
  },
  {
    file: 'Footer.tsx',
    search: /t\('footer\.social'\)/g,
    replace: "(t.raw('footer.social') as any[])"
  }
];

for (const patch of patches) {
  const filePath = path.join(srcDir, patch.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(patch.search, patch.replace);
    fs.writeFileSync(filePath, content);
    console.log(`Patched array access in ${patch.file}`);
  }
}
