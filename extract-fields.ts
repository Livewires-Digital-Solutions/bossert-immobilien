import fs from 'fs';
const json = JSON.parse(fs.readFileSync('onoffice-fields.json', 'utf8'));
const records = json.response.results[0].data.records;
const estate = records.find(r => r.id === 'estate');
if (estate) {
  const fields = Object.keys(estate.elements);
  const energieFields = fields.filter(f => f.toLowerCase().includes('flaeche') || f.toLowerCase().includes('fläche') || f.toLowerCase().includes('zimmer') || f.toLowerCase().includes('objekt') || f.toLowerCase().includes('preis') || f.toLowerCase().includes('courtage') || f.toLowerCase().includes('provision') || f.toLowerCase().includes('baujahr') || f.toLowerCase().includes('zustand'));
  console.log("Found related fields:");
  console.log(energieFields);
} else {
  console.log("No estate module found in fields list");
}
