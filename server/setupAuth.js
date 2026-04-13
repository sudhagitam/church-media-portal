const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDS_PATH = path.join(__dirname, 'oauth_credentials.json');

async function main() {
  const creds = JSON.parse(fs.readFileSync(CREDS_PATH));
  const { client_id, client_secret } = creds.installed || creds.web;

  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, 'http://localhost:8080'
  );

  // If token already exists, skip
  if (fs.existsSync(TOKEN_PATH)) {
    console.log('token.json already exists — auth already done!');
    return;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  console.log('\n=== Open this URL in your browser ===\n');
  console.log(authUrl);
  console.log('\n=====================================');
  console.log('\nAfter login, paste the CODE from the redirect URL:');
  console.log('Example: http://localhost:8080/?code=THIS_PART&scope=...\n');

  // Read code from terminal input
  process.stdout.write('Paste the code here: ');
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', async (code) => {
    code = code.trim();
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      console.log('\ntoken.json saved successfully!');
      console.log('Auth complete — you can now run: node index.js');
    } catch (err) {
      console.error('Error getting token:', err.message);
    }
    process.exit(0);
  });
}

main();
