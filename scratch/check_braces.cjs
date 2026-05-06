const fs = require('fs');
const content = fs.readFileSync('c:/Users/Faizan Khan/Desktop/Hackathon/Scam-Shield/src/i18n/translations/kn.ts', 'utf8');
let open = 0;
let close = 0;
for (const char of content) {
  if (char === '{') open++;
  if (char === '}') close++;
}
console.log(`Open: ${open}, Close: ${close}`);
