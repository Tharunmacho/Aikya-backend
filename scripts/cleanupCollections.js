import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const mongoURI = process.env.MONGODB_URI;

async function cleanupDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('📊 Current Collections:');
    console.log('═'.repeat(60));
    collections.forEach((col, index) => {
      console.log(`${index + 1}. ${col.name}`);
    });
    console.log('═'.repeat(60));

    // Collections to DELETE (old MongoDB models replaced by memoryStore)
    const collectionsToDelete = [
      'whychoose',
      'contact',
      'leadership',
      'projects',
      'testimonials',
      'specialoffers',
      'services',
      'news',
      'csr',
      'events',
      'careers',
      'groupcompany',
      'partnership',
      'footer',
      'footeritems',
    ];

    // Collections to KEEP (only auth and static sections)
    const collectionsToKeep = [
      'auth',
      'users',
      'hero',
      'about',
    ];

    console.log('\n✅ KEEPING (Authentication & Static Sections):');
    console.log('═'.repeat(60));
    collectionsToKeep.forEach(col => {
      const exists = collections.find(c => c.name === col);
      console.log(`  ${exists ? '✓' : '✗'} ${col}`);
    });

    console.log('\n🗑️  DELETING (Replaced by memoryStore in admin CMS):');
    console.log('═'.repeat(60));
    
    let deletedCount = 0;
    for (const colName of collectionsToDelete) {
      const exists = collections.find(c => c.name === colName);
      if (exists) {
        try {
          await db.dropCollection(colName);
          console.log(`  ✅ Deleted: ${colName}`);
          deletedCount++;
        } catch (err) {
          console.log(`  ❌ Failed: ${colName} - ${err.message}`);
        }
      } else {
        console.log(`  ⊘  Skipped: ${colName} (doesn't exist)`);
      }
    }

    console.log('\n═'.repeat(60));
    console.log(`✅ Cleanup Complete! Deleted ${deletedCount} collections.`);
    console.log('═'.repeat(60));
    
    console.log('\n📋 Final Database Structure:');
    console.log('  ✓ auth - User authentication');
    console.log('  ✓ users - User accounts');
    console.log('  ✓ hero - Hero section content');
    console.log('  ✓ about - About section content');
    console.log('\n  ℹ  All other CMS content managed via memoryStore (in-memory)');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('ENOTFOUND') || error.message.includes('querySrv')) {
      console.log('\n💡 Network issue detected. Please check:');
      console.log('   1. Internet connection');
      console.log('   2. MongoDB Atlas firewall rules');
      console.log('   3. MongoDB URI in .env file');
    }
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
  }
}

cleanupDatabase();
