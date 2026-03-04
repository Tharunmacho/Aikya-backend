import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

// Collection mappings (old name -> new name)
const collectionMappings = {
  'projectitems': 'projects',
  'testimonialitems': 'testimonials',
  'specialofferitems': 'specialoffers',
  'leadershipitems': 'leadership',
  'whychooseitems': 'whychoose',
  'locationcarditems': 'locationcards',
  'footeritems': 'footer',
  'newsarticles': 'news',
  'serviceitems': 'services',
  'csritems': 'csr',
  'eventitems': 'events',
  'careeritems': 'careers'
};

async function renameCollections() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const existingCollections = await db.listCollections().toArray();
    const existingCollectionNames = existingCollections.map(col => col.name);

    console.log('📋 Existing collections:', existingCollectionNames.join(', '));
    console.log('\n🔄 Starting collection renaming...\n');

    for (const [oldName, newName] of Object.entries(collectionMappings)) {
      try {
        // Check if old collection exists
        if (existingCollectionNames.includes(oldName)) {
          // Check if new collection already exists
          if (existingCollectionNames.includes(newName)) {
            console.log(`⚠️  ${newName} already exists, skipping ${oldName}`);
            continue;
          }

          // Rename the collection
          await db.collection(oldName).rename(newName);
          console.log(`✅ Renamed: ${oldName} → ${newName}`);
        } else {
          console.log(`ℹ️  ${oldName} does not exist, skipping`);
        }
      } catch (error) {
        console.error(`❌ Error renaming ${oldName}:`, error.message);
      }
    }

    console.log('\n✅ Collection renaming completed!');
    
    // Display final collection list
    const updatedCollections = await db.listCollections().toArray();
    const updatedCollectionNames = updatedCollections.map(col => col.name);
    console.log('\n📋 Updated collections:', updatedCollectionNames.join(', '));

    // Count documents in each renamed collection
    console.log('\n📊 Document counts:');
    for (const newName of Object.values(collectionMappings)) {
      if (updatedCollectionNames.includes(newName)) {
        const count = await db.collection(newName).countDocuments();
        console.log(`   ${newName}: ${count} documents`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

renameCollections();
