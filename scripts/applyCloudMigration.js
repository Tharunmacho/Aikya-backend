import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔄 Applying cloud migration changes...\n');

const FRONTEND_ASSETS = path.join(__dirname, '../../frontend/src/assets');
const OLD_FILE = path.join(FRONTEND_ASSETS, 'imageAssets.ts');
const NEW_FILE = path.join(FRONTEND_ASSETS, 'imageAssets-cloud.ts');
const BACKUP_FILE = path.join(FRONTEND_ASSETS, 'imageAssets-local-backup.ts');

try {
  // Check if new cloud file exists
  if (!fs.existsSync(NEW_FILE)) {
    console.error('❌ Cloud image file not found. Run migration first:');
    console.error('   node backend/scripts/migrateImagesToCloud.js\n');
    process.exit(1);
  }

  // Backup original file
  if (fs.existsSync(OLD_FILE)) {
    fs.copyFileSync(OLD_FILE, BACKUP_FILE);
    console.log('✅ Backed up original imageAssets.ts');
  }

  // Replace with cloud version
  fs.copyFileSync(NEW_FILE, OLD_FILE);
  console.log('✅ Updated imageAssets.ts with cloud URLs');

  console.log('\n✨ Migration complete! Your images are now served from the cloud.');
  console.log('\n📋 Next steps:');
  console.log('1. Restart your frontend server');
  console.log('2. Check that images load correctly');
  console.log('3. If everything works, you can delete local images from frontend/src/assets/images/');
  console.log('\n💾 Original file backed up as: imageAssets-local-backup.ts\n');

} catch (error) {
  console.error('❌ Error applying changes:', error.message);
  process.exit(1);
}
