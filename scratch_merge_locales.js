const fs = require('fs');
const path = require('path');

// Extract JS objects from strings
function extractObject(fileStr) {
  const match = fileStr.match(/export const [a-z]+ = (\{[\s\S]+\});/);
  if (match) {
    // using Function to evaluate the object string securely enough for our own code
    return new Function('return ' + match[1] + ';')();
  }
  return {};
}

const enTsStr = fs.readFileSync(path.join(__dirname, '_design-reference/designer-homepage/src/locales/en.ts'), 'utf8');
const deTsStr = fs.readFileSync(path.join(__dirname, '_design-reference/designer-homepage/src/locales/de.ts'), 'utf8');

const designerEn = extractObject(enTsStr);
const designerDe = extractObject(deTsStr);

const enJsonPath = path.join(__dirname, 'messages/en.json');
const deJsonPath = path.join(__dirname, 'messages/de.json');

const currentEn = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const currentDe = JSON.parse(fs.readFileSync(deJsonPath, 'utf8'));

// Add under 'Designer' namespace
currentEn.Designer = designerEn;
currentDe.Designer = designerDe;

fs.writeFileSync(enJsonPath, JSON.stringify(currentEn, null, 2));
fs.writeFileSync(deJsonPath, JSON.stringify(currentDe, null, 2));

console.log("Successfully merged designer strings into messages/en.json and messages/de.json");
