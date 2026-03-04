import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const mongoURI = process.env.MONGODB_URI;

async function checkAndCleanCollections() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('📊 Current Collections in Database:');
    console.log('═'.repeat(50));
    collections.forEach((col, index) => {
      console.log(`${index + 1}. ${col.name}`);
    });
    console.log('═'.repeat(50));
    console.log(`Total: ${collections.length} collections\n`);

    // Collections that should be kept (auth + used in admin)
    const requiredCollections = [
      'auth',           // Authentication
      'users',          // User accounts
      'hero',           // Hero section (static content)
      'about',          // About section (static content)
    ];

    // Collections that might be unused (old MongoDB models that were replaced by memoryStore)
    const potentiallyUnusedCollections = [
      'whychoose',      // Now using memoryStore for why-choose items
      'contact',        
      'leadership',     // Old leadership collection (now using memoryStore)
      'projects',       // Old projects collection (now using memoryStore)
      'testimonials',   // Old testimonials collection (now using memoryStore)
      'specialoffers',  // Old special offers collection (now using memoryStore)
      'services',       
      'news',           
      'csr',            
      'events',         
      'careers',        
      'groupcompany',   
      'partnership',    
      'footer',         
      'footeritems',    // Old footer items (now using memoryStore)
    ];

    console.log('🔍 Analysis:');
    console.log('═'.repeat(50));
    console.log('\n✅ KEEP (Authentication & Static Content):');
    requiredCollections.forEach(col => {
      const exists = collections.find(c => c.name === col);
      console.log(`  - ${col} ${exists ? '(EXISTS)' : '(NOT FOUND)'}`);
    });

    console.log('\n⚠️  POTENTIALLY UNUSED (Replaced by memoryStore):');
    const existingUnused = [];
    potentiallyUnusedCollections.forEach(col => {
      const exists = collections.find(c => c.name === col);
      if (exists) {
        existingUnused.push(col);
        console.log(`  - ${col} (EXISTS - CAN BE DELETED)`);
      }
    });

    console.log('\n📝 OTHER COLLECTIONS:');
    collections.forEach(col => {
      if (!requiredCollections.includes(col.name) && !potentiallyUnusedCollections.includes(col.name)) {
        console.log(`  - ${col.name}`);
      }
    });

    // Ask for confirmation to delete (in this case, we'll just list them)
    if (existingUnused.length > 0) {
      console.log('\n═'.repeat(50));
      console.log('🗑️  Collections that can be safely deleted:');
      console.log('   (They are no longer used - replaced by memoryStore)');
      console.log('═'.repeat(50));
      existingUnused.forEach((col, index) => {
        console.log(`${index + 1}. ${col}`);
      });
      
      console.log('\n❓ Do you want to delete these collections?');
      console.log('   Uncomment the deletion code below and run again to delete.');
      
      // UNCOMMENT TO ACTUALLY DELETE:
      /*
      console.log('\n🗑️  Deleting unused collections...');
      for (const colName of existingUnused) {
        try {
          await db.dropCollection(colName);
          console.log(`  ✅ Deleted: ${colName}`);
        } catch (err) {
          console.log(`  ❌ Failed to delete ${colName}: ${err.message}`);
        }
      }
      console.log('\n✅ Cleanup complete!');
      */
    } else {
      console.log('\n✅ No unused collections found!');
    }

    console.log('\n═'.repeat(50));
    console.log('📋 Admin CMS Sections (using memoryStore):');
    console.log('═'.repeat(50));
    console.log('  1. Hero Section (static - uses hero collection)');
    console.log('  2. About Section (static - uses about collection)');
    console.log('  3. News Management (items in memoryStore)');
    console.log('  4. Projects Management (items in memoryStore)');
    console.log('  5. Services Management (items in memoryStore)');
    console.log('  6. CSR Management (items in memoryStore)');
    console.log('  7. Events Management (items in memoryStore)');
    console.log('  8. Careers Management (items in memoryStore)');
    console.log('  9. Testimonials (items in memoryStore)');
    console.log(' 10. Special Offers (items in memoryStore)');
    console.log(' 11. Leadership (items in memoryStore)');
    console.log(' 12. Why Choose Us (items in memoryStore)');
    console.log(' 13. Location Cards (items in memoryStore)');
    console.log(' 14. Footer (items in memoryStore)');
    console.log('═'.repeat(50));

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
  }
}

checkAndCleanCollections();
