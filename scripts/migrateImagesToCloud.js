import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { uploadFileFromPath } from '../config/storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Image Migration to Cloud Bucket...\n');

const IMAGES_DIR = path.join(__dirname, '../../frontend/src/assets/images');
const OUTPUT_FILE = path.join(__dirname, 'migration-results.json');

const migrationResults = {
  timestamp: new Date().toISOString(),
  totalImages: 0,
  uploaded: 0,
  failed: 0,
  images: []
};

async function migrateImages() {
  try {
    // Check if images directory exists
    if (!fs.existsSync(IMAGES_DIR)) {
      console.error('❌ Images directory not found:', IMAGES_DIR);
      process.exit(1);
    }

    // Get all image files
    const files = fs.readdirSync(IMAGES_DIR).filter(file => 
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );

    migrationResults.totalImages = files.length;
    console.log(`📦 Found ${files.length} images to migrate\n`);

    // Upload each image
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i];
      const filePath = path.join(IMAGES_DIR, fileName);
      
      console.log(`[${i + 1}/${files.length}] Uploading: ${fileName}`);
      
      try {
        // Generate a clean filename
        const cleanFileName = `project-${Date.now()}-${i}-${fileName.replace(/\s+/g, '-')}`;
        const cloudUrl = await uploadFileFromPath(filePath, cleanFileName);
        
        migrationResults.uploaded++;
        migrationResults.images.push({
          originalName: fileName,
          cloudUrl: cloudUrl,
          uploadedAt: new Date().toISOString(),
          success: true
        });
        
        console.log(`   ✅ Uploaded: ${cloudUrl}\n`);
      } catch (error) {
        migrationResults.failed++;
        migrationResults.images.push({
          originalName: fileName,
          error: error.message,
          uploadedAt: new Date().toISOString(),
          success: false
        });
        
        console.log(`   ❌ Failed: ${error.message}\n`);
      }
    }

    // Save migration results
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(migrationResults, null, 2));
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Images: ${migrationResults.totalImages}`);
    console.log(`✅ Uploaded: ${migrationResults.uploaded}`);
    console.log(`❌ Failed: ${migrationResults.failed}`);
    console.log(`\n📄 Results saved to: ${OUTPUT_FILE}`);
    console.log('='.repeat(60) + '\n');

    // Generate imageAssets.ts content
    generateImageAssetsFile(migrationResults.images);

    if (migrationResults.uploaded === migrationResults.totalImages) {
      console.log('🎉 All images successfully migrated to cloud bucket!\n');
      console.log('Next steps:');
      console.log('1. Check frontend/src/assets/imageAssets-cloud.ts');
      console.log('2. Replace imageAssets.ts with imageAssets-cloud.ts');
      console.log('3. Restart frontend server');
      console.log('4. Verify images load from cloud\n');
    } else {
      console.log('⚠️  Some images failed to upload. Check migration-results.json for details.\n');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

function generateImageAssetsFile(images) {
  const successfulImages = images.filter(img => img.success);
  
  // Map original names to their categories based on the original imageAssets.ts structure
  const imageMap = {};
  successfulImages.forEach((img, index) => {
    imageMap[img.originalName] = img.cloudUrl;
  });

  // Generate the new file content
  const content = `// Cloud Storage Image URLs - Migrated from local images
// All images are now served from the cloud bucket

// Project Images - Flats & Apartments
const project1 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.12 PM.jpeg'] || ''}';
const project2 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.12 PM (1).jpeg'] || ''}';
const project3 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.13 PM.jpeg'] || ''}';

// Projects - Villas & Homes
const project4 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.13 PM (1).jpeg'] || ''}';
const project5 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.13 PM (2).jpeg'] || ''}';

// Projects - Commercial
const project6 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.14 PM.jpeg'] || ''}';
const project7 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.14 PM (1).jpeg'] || ''}';

// Projects - Plots
const project8 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.14 PM (2).jpeg'] || ''}';
const project9 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.15 PM.jpeg'] || ''}';

// Location images
const chennaiLocation = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.15 PM (1).jpeg'] || ''}';
const tirunelveliLocation = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.15 PM (2).jpeg'] || ''}';
const chengalpattuLocation = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.16 PM.jpeg'] || ''}';

// Leadership team images
const leader1 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.16 PM (1).jpeg'] || ''}';
const leader2 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.16 PM (2).jpeg'] || ''}';
const leader3 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.16 PM (3).jpeg'] || ''}';

// Services - Highway Construction
const highway1 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.17 PM.jpeg'] || ''}';
const highway2 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.17 PM (1).jpeg'] || ''}';
const highway3 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.17 PM (2).jpeg'] || ''}';
const highway4 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.18 PM.jpeg'] || ''}';

// Services - Warehouse Development
const warehouse1 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.18 PM (1).jpeg'] || ''}';
const warehouse2 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.18 PM (2).jpeg'] || ''}';
const warehouse3 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.18 PM (3).jpeg'] || ''}';
const warehouse4 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.19 PM.jpeg'] || ''}';

// Services - Township Development
const township1 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.19 PM (1).jpeg'] || ''}';
const township2 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.19 PM (2).jpeg'] || ''}';
const township3 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.20 PM.jpeg'] || ''}';
const township4 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.20 PM (1).jpeg'] || ''}';

// CSR & Community images
const csr1 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.20 PM (2).jpeg'] || ''}';
const csr2 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.21 PM.jpeg'] || ''}';
const csr3 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.21 PM (1).jpeg'] || ''}';
const csr4 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.21 PM (2).jpeg'] || ''}';

// Partner & Events images
const partner1 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.21 PM (3).jpeg'] || ''}';
const partner2 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.22 PM.jpeg'] || ''}';
const partner3 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.22 PM (1).jpeg'] || ''}';
const partner4 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.22 PM (2).jpeg'] || ''}';
const event1 = '${imageMap['WhatsApp Image 2026-02-26 at 7.15.23 PM.jpeg'] || ''}';

// Export organized image assets
export const projectImages = {
  flatsAndApartments: [project1, project2, project3],
  villasAndHomes: [project4, project5],
  commercial: [project6, project7],
  plots: [project8, project9],
};

export const locationImages = {
  chennai: chennaiLocation,
  tirunelveli: tirunelveliLocation,
  chengalpattu: chengalpattuLocation,
};

export const leadershipImages = [leader1, leader2, leader3];

export const serviceImages = {
  highway: [highway1, highway2, highway3, highway4],
  warehouse: [warehouse1, warehouse2, warehouse3, warehouse4],
  township: [township1, township2, township3, township4],
};

export const csrImages = [csr1, csr2, csr3, csr4];

export const partnerImages = [partner1, partner2, partner3, partner4];

export const eventImages = [event1];

// Single export for easy access
export default {
  projects: projectImages,
  locations: locationImages,
  leadership: leadershipImages,
  services: serviceImages,
  csr: csrImages,
  partners: partnerImages,
  events: eventImages,
};
`;

  const outputPath = path.join(__dirname, '../../frontend/src/assets/imageAssets-cloud.ts');
  fs.writeFileSync(outputPath, content);
  console.log(`\n✅ Generated: frontend/src/assets/imageAssets-cloud.ts`);
}

// Run migration
migrateImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
