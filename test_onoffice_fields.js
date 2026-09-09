const crypto = require('crypto');

const TOKEN   = process.env.ONOFFICE_TOKEN;
const SECRET  = process.env.ONOFFICE_SECRET;
const API_URL = 'https://api.onoffice.de/api/latest/api.php';
const TS_OFFSET = parseInt(process.env.ONOFFICE_TS_OFFSET_S ?? '270', 10);

function generateHmac(secret, timestamp, token, resourcetype, actionid) {
  const message = timestamp + token + resourcetype + actionid;
  return crypto.createHmac('sha256', secret).update(message).digest('base64');
}

async function fetchIds() {
  const ts = Math.floor(Date.now() / 1000) - TS_OFFSET;
  const timestamp = ts.toString();
  const actionid = 'urn:onoffice-de-ns:smart:2.5:smartml:action:read';
  const resourcetype = 'estate';
  const hmac = generateHmac(SECRET, timestamp, TOKEN, resourcetype, actionid);

  const body = {
    token: TOKEN,
    request: {
      actions: [1309, 1327, 1287].map(id => ({
        actionid: actionid,
        resourceid: id,
        identifier: `req-${id}`,
        timestamp: ts,
        hmac,
        hmac_version: '2',
        resourcetype: resourcetype,
        parameters: {
          data: ['Id', 'objektnr_extern', 'benutzer', 'status', 'vermarktungsart', 'freitext_1', 'freitext_2', 'freitext_3', 'freitext_4']
        },
      }))
    },
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const json = await response.json();
  console.log(JSON.stringify(json, null, 2));
}

fetchIds();
