import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

// Mapping of any possible old name to the correct new name
const collectionMappings = {
  // Projects
  'projectitems': 'projects',
  'project': 'projects',
  
  // Testimonials
  'testimonialitems': 'testimonials',
  'testimonial': 'testimonials',
  
  // Special Offers
  'specialofferitems': 'specialoffers',
  'specialoffer': 'specialoffers',
  
  // Leadership
  'leadershipitems': 'leadership',
  
  // Why Choose
  'whychooseitems': 'whychoose',
  
  // Location Cards
  'locationcarditems': 'locationcards',
  
  // Footer
  'footeritems': 'footer',
  
  // News
  'newsarticles': 'news',
  
  // Services
  'serviceitems': 'services',
  'service': 'services',
  
  // CSR
  'csritems': 'csr',
  
  // Events
  'eventitems': 'events',
  'event': 'events',
  
  // Careers
  'careeritems': 'careers'
};

async function fixCollectionNames() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    let existingCollections = await db.listCollections().toArray();
    let existingCollectionNames = existingCollections.map(col => col.name);

    console.log('📋 Current collections:', existingCollectionNames.join(', '));
    console.log('\n🔄 Fixing collection names...\n');

    // Process each mapping
    for (const [oldName, correctName] of Object.entries(collectionMappings)) {
      try {
        // If old collection exists
        if (existingCollectionNames.includes(oldName)) {
          const oldCount = await db.collection(oldName).countDocuments();
          
          // If correct collection also exists
          if (existingCollectionNames.includes(correctName)) {
            const correctCount = await db.collection(correctName).countDocuments();
            console.log(`📦 Found both ${oldName} (${oldCount}) and ${correctName} (${correctCount})`);
            
            // If correct has more items, drop old
            if (correctCount >= oldCount) {
              await db.collection(oldName).drop();
              console.log(`   ✅ Dropped ${oldName}, keeping ${correctName}\n`);
            }
            // If old has more items, copy to correct and drop old
            else if (oldCount > correctCount) {
              const docs = await db.collection(oldName).find({}).toArray();
              if (docs.length > 0) {
                await db.collection(correctName).drop();
                await db.collection(oldName).rename(correctName);
                console.log(`   ✅ Renamed ${oldName} → ${correctName} (had more data)\n`);
              }
            }
          } 
          // If correct doesn't exist, just rename
          else {
            if (oldName !== correctName) {
              await db.collection(oldName).rename(correctName);
              console.log(`✅ Renamed ${oldName} → ${correctName}\n`);
            }
          }
          
          // Refresh collection list
          existingCollections = await db.listCollections().toArray();
          existingCollectionNames = existingCollections.map(col => col.name);
        }
      } catch (error) {
        console.error(`❌ Error processing ${oldName}:`, error.message);
      }
    }

    console.log('✅ Collection name fixing completed!\n');
    
    // Display final state
    const finalCollections = await db.listCollections().toArray();
    const finalCollectionNames = finalCollections.map(col => col.name);
    console.log('📋 Final collections:', finalCollectionNames.join(', '));

    // Count documents in final item collections
    const itemCollections = [
      'projects', 'testimonials', 'specialoffers', 'leadership', 'whychoose',
      'locationcards', 'footer', 'news', 'services', 'csr', 'events', 'careers'
    ];
    
    console.log('\n📊 Item collection document counts:');
    let totalItems = 0;
    for (const collName of itemCollections.sort()) {
      if (finalCollectionNames.includes(collName)) {
        const count = await db.collection(collName).countDocuments();
        totalItems += count;
        const icon = count > 0 ? '✅' : '⚠️';
        console.log(`   ${icon} ${collName.padEnd(20)} ${count} items`);
      } else {
        console.log(`   ❌ ${collName.padEnd(20)} MISSING`);
      }
    }
    console.log(`\n   📈 TOTAL: ${totalItems} items across all sections`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

fixCollectionNames();
