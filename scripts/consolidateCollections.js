import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

// Old collections to remove (section-level data, not items)
const oldCollectionsToRemove = [
  'projectitems',
  'testimonialitems', 
  'specialofferitems',
  'leadershipitems',
  'whychooseitems',
  'footeritems',
  'newsarticles',
  'serviceitems',
  'csritems',
  'eventitems',
  'careeritems'
];

// Item-based collections that should remain
const itemCollections = [
  'projects',
  'testimonials',
  'specialoffers',
  'leadership',
  'whychoose',
  'footer',
  'news',
  'services',
  'csr',
  'events',
  'careers',
  'locationcards'
];

async function consolidateCollections() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const existingCollections = await db.listCollections().toArray();
    const existingCollectionNames = existingCollections.map(col => col.name);

    console.log('📋 Current collections:', existingCollectionNames.join(', '));
    
    console.log('\n🔄 Consolidating data...\n');

    // For each old collection, move data to new collection if new is empty
    for (const oldName of oldCollectionsToRemove) {
      if (!existingCollectionNames.includes(oldName)) {
        console.log(`ℹ️  ${oldName} does not exist, skipping`);
        continue;
      }

      // Determine the new collection name
      let newName = oldName;
      if (oldName.endsWith('items')) {
        newName = oldName.replace('items', '');
      }
      if (oldName === 'newsarticles') newName = 'news';
      if (oldName === 'csritems') newName = 'csr';
      if (oldName === 'careeritems') newName = 'careers';

      try {
        const oldCount = await db.collection(oldName).countDocuments();
        const newCount = existingCollectionNames.includes(newName) 
          ? await db.collection(newName).countDocuments() 
          : 0;

        console.log(`📦 ${oldName}: ${oldCount} docs → ${newName}: ${newCount} docs`);

        // If new collection has items, keep it and drop old
        if (newCount > 0) {
          await db.collection(oldName).drop();
          console.log(`✅ Dropped ${oldName} (data preserved in ${newName})\n`);
        }
        // If new collection is empty but old has data, rename old to new
        else if (oldCount > 0) {
          await db.collection(oldName).rename(newName);
          console.log(`✅ Renamed ${oldName} → ${newName}\n`);
        }
        // Both empty, just drop old
        else {
          await db.collection(oldName).drop();
          console.log(`✅ Dropped empty collection ${oldName}\n`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${oldName}:`, error.message);
      }
    }

    console.log('\n✅ Collection consolidation completed!');
    
    // Display final state
    const updatedCollections = await db.listCollections().toArray();
    const updatedCollectionNames = updatedCollections.map(col => col.name);
    console.log('\n📋 Final collections:', updatedCollectionNames.join(', '));

    // Count documents in item collections
    console.log('\n📊 Item collection counts:');
    let totalItems = 0;
    for (const collName of itemCollections.sort()) {
      if (updatedCollectionNames.includes(collName)) {
        const count = await db.collection(collName).countDocuments();
        totalItems += count;
        console.log(`   ${collName.padEnd(20)} ${count} items`);
      }
    }
    console.log(`\n   TOTAL: ${totalItems} items across all sections`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

consolidateCollections();
