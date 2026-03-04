import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Backend API endpoint (proxy)
const BACKEND_API = 'http://localhost:5000/api/images';

// Read migration results to get the cloud URLs
const resultsPath = path.join(__dirname, 'migration-results.json');
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));

console.log('🔄 Converting cloud URLs to proxy URLs...\n');

let content = `// Image Assets - Served via Backend Proxy
// Images are stored in cloud bucket but served through backend for authentication
// Backend proxy: ${BACKEND_API}

`;

// Process each uploaded image
results.images.forEach((img, index) => {
  if (img.success && img.cloudUrl) {
    // Extract the key from cloud URL
    // From: https://request.storage.portal.welocalhost.com/aikya/project-...
    // To: http://localhost:5000/api/images/project-...
    const key = img.cloudUrl.split('/aikya/')[1];
    const proxyUrl = `${BACKEND_API}/${key}`;
    
    const varName = `image${index + 1}`;
    content += `const ${varName} = '${proxyUrl}';\n`;
  }
});

content += `\n// Export organized by category\n`;
content += `export const projectImages = {\n`;
content += `  flatsAndApartments: [image2, image3, image1],\n`;
content += `  villasAndHomes: [image4, image5],\n`;
content += `  commercial: [image7, image6],\n`;
content += `  plots: [image8, image9],\n`;
content += `};\n\n`;

content += `export const locationImages = {\n`;
content += `  chennai: image9,\n`;
content += `  tirunelveli: image10,\n`;
content += `  chengalpattu: image15,\n`;
content += `};\n\n`;

content += `export const leadershipImages = [\n`;
content += `  image12,\n`;
content += `  image13,\n`;
content += `  image14,\n`;
content += `];\n\n`;

content += `export const serviceImages = {\n`;
content += `  highway: [image18, image16, image17, image22],\n`;
content += `  warehouse: [image19, image20, image21, image25],\n`;
content += `  township: [image23, image24, image28, image26],\n`;
content += `};\n\n`;

content += `export const csrImages = [\n`;
content += `  image27,\n`;
content += `  image29,\n`;
content += `  image30,\n`;
content += `];\n\n`;

content += `export const partnerImages = [\n`;
content += `  image31,\n`;
content += `  image32,\n`;
content += `];\n\n`;

content += `export const newsImages = [\n`;
content += `  image33,\n`;
content += `  image34,\n`;
content += `];\n\n`;

content += `export const eventsImages = [\n`;
content += `  image35,\n`;
content += `  image36,\n`;
content += `];\n\n`;

content += `export default {\n`;
content += `  projectImages,\n`;
content += `  locationImages,\n`;
content += `  leadershipImages,\n`;
content += `  serviceImages,\n`;
content += `  csrImages,\n`;
content += `  partnerImages,\n`;
content += `  newsImages,\n`;
content += `  eventsImages,\n`;
content += `};\n`;

// Save to imageAssets-proxy.ts
const outputPath = path.join(__dirname, '../../frontend/src/assets/imageAssets-proxy.ts');
fs.writeFileSync(outputPath, content);

console.log('✅ Generated: frontend/src/assets/imageAssets-proxy.ts');
console.log(`📡 Images will be served via: ${BACKEND_API}`);
console.log('\n📋 Next steps:');
console.log('1. Start backend server: cd backend && node server.js');
console.log('2. Replace imageAssets.ts with imageAssets-proxy.ts');
console.log('3. Restart frontend server');
