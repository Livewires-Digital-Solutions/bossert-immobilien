import fs from 'fs';
import crypto from 'crypto';

function loadEnv() {
  const parse = (filePath) => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || '';
          if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
          process.env[key] = value;
        }
      });
    }
  };
  parse('.env');
  parse('.env.local');
}

loadEnv();

const TOKEN   = process.env.ONOFFICE_TOKEN      ?? '';
const SECRET  = process.env.ONOFFICE_SECRET     ?? '';
const API_URL = process.env.ONOFFICE_API_URL    ?? 'https://api.onoffice.de/api/latest/api.php';
const TS_OFFSET = parseInt(process.env.ONOFFICE_TS_OFFSET_S ?? '270', 10);

const ACTION_GET  = 'urn:onoffice-de-ns:smart:2.5:smartml:action:get';

function generateHmac(secret, timestamp, token, resourcetype, actionid) {
  const message = timestamp + token + resourcetype + actionid;
  return crypto.createHmac('sha256', secret).update(message).digest('base64');
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000) - TS_OFFSET;
}

async function fetchEstatePhotos(estateId) {
  const ts = getTimestamp();
  const timestamp = ts.toString();
  const resourcetype = 'estatepictures';
  const actionid = ACTION_GET;
  const hmac = generateHmac(SECRET, timestamp, TOKEN, resourcetype, actionid);

  const body = {
    token: TOKEN,
    request: {
      actions: [
        {
          actionid,
          resourceid: 0,
          identifier: `pics-${estateId}`,
          timestamp: ts,
          hmac,
          hmac_version: '2',
          resourcetype,
          cacheable: 0,
          parameters: {
            estateids: [estateId],
            categories: ['Foto'],
            language: 'DEU',
          },
        },
      ],
    },
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await response.json();
  console.log(JSON.stringify(json.response.results[0].data, null, 2));
}

fetchEstatePhotos(1309).catch(console.error);
