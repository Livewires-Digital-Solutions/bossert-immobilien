const fs = require('fs');
const path = require('path');

const files = [
  'src/app/api/articles/route.ts',
  'src/app/api/auth/forgot-password/route.ts',
  'src/app/api/auth/register/route.ts',
  'src/app/api/auth/reset-password/route.ts',
  'src/app/api/contact/route.ts',
  'src/app/api/faqs/route.ts',
  'src/app/api/newsletter/route.ts',
  'src/app/api/properties/route.ts',
  'src/app/api/properties/[id]/route.ts',
  'src/app/api/references/route.ts',
  'src/app/api/references/[id]/route.ts',
  'src/app/api/site-settings/route.ts',
  'src/app/api/team-members/route.ts',
  'src/app/api/test/route.ts',
  'src/app/api/testimonials/route.ts',
];

for (const relPath of files) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Skip if already guarded
  if (content.includes('withBackendGuard')) {
    continue;
  }

  // Add import if not exists
  if (!content.includes("@/lib/backend-config")) {
    const nextResponseMatch = content.match(/import.*NextResponse.*from 'next\/server';?/);
    if (nextResponseMatch) {
      content = content.replace(nextResponseMatch[0], `${nextResponseMatch[0]}\nimport { withBackendGuard } from '@/lib/backend-config';`);
    } else {
      content = `import { withBackendGuard } from '@/lib/backend-config';\n` + content;
    }
  }

  // Wrap export async function GET/POST/PUT/DELETE
  content = content.replace(/export\s+async\s+function\s+(GET|POST|PUT|DELETE)\s*\(([^)]*)\)\s*\{/g, (match, method, args) => {
    return `export const ${method} = withBackendGuard(async function ${method}(${args}) {`;
  });

  // We need to add the closing `);` at the end of the function block.
  // Because regex matching brackets is hard in JS, we can just replace the closing brace of the function if we assume standard formatting, 
  // but it's simpler to just append `);` to the end of the file or use a simple brace counter.
  
  let newContent = "";
  let inFunction = false;
  let braceCount = 0;
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/export const (GET|POST|PUT|DELETE) = withBackendGuard\(/)) {
      inFunction = true;
      braceCount = 0;
    }
    
    if (inFunction) {
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      braceCount += opens;
      braceCount -= closes;
      
      if (braceCount === 0 && closes > 0) {
        // Function ended
        newContent += line.replace('}', '});\n');
        inFunction = false;
        continue;
      }
    }
    newContent += line + (i === lines.length - 1 ? "" : "\n");
  }

  fs.writeFileSync(fullPath, newContent, 'utf8');
  console.log(`Updated ${relPath}`);
}
