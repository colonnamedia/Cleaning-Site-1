import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const pages=['index.html','services.html','home-cleaning.html','commercial-cleaning.html','plans.html','service-areas.html','quote.html','preview.html'];
const required=['<title>','meta name="description"','rel="canonical"','/assets/styles.css'];
const errors=[];
for(const page of pages){const file=path.join(root,page);if(!fs.existsSync(file)){errors.push(`missing ${page}`);continue}const html=fs.readFileSync(file,'utf8');for(const token of required)if(!html.includes(token))errors.push(`${page}: missing ${token}`);if(!/demo|sample/i.test(html))errors.push(`${page}: missing demo disclosure`);for(const match of html.matchAll(/href="\/(?!\/|#)([^"?]*)/g)){const route=match[1];if(!route)continue;const target=path.join(root,route.includes('.')?route:`${route}.html`);if(!fs.existsSync(target))errors.push(`${page}: broken /${route}`)}}
const quote=fs.readFileSync(path.join(root,'quote.html'),'utf8');for(const field of ['property_size','bedrooms','bathrooms','commercial_area','cleaning_type','frequency','preferred_date','notes','name','phone','email'])if(!quote.includes(`name="${field}"`))errors.push(`quote: missing ${field}`);
for(const phrase of ['does not send or store','booked','uploaded','payment'])if(!quote.toLowerCase().includes(phrase))errors.push(`quote: missing safety phrase ${phrase}`);
const provider=fs.readFileSync(path.join(root,'provider-config.js'),'utf8');for(const gate of ['demoMode: true','enabled: false','CLIENT_SELECTION_REQUIRED','end-to-end testing'])if(!provider.includes(gate))errors.push(`provider gate: missing ${gate}`);
const hero=path.join(root,'assets','tidyline-cleaning-hero.webp');if(!fs.existsSync(hero)||fs.statSync(hero).size>250000)errors.push('hero missing or not optimized under 250 KB');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`Verified ${pages.length} pages, internal routes, intake fields, demo safety, provider gates, and optimized hero.`);
