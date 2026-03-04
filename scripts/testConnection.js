import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

console.log('🔍 Testing MongoDB Connection...\n');
console.log('Connection String:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

const testConnection = async () => {
  try {
    console.log('\n⏳ Attempting to connect...\n');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ SUCCESS! MongoDB Connected!');
    console.log(`📍 Host: ${mongoose.connection.host}`);
    console.log(`📦 Database: ${mongoose.connection.name}`);
    
    await mongoose.connection.close();
    console.log('\n✅ Connection test passed!\n');
    process.exit(0);
  } catch (error) {
    console.log('❌ CONNECTION FAILED!\n');
    console.error('Error:', error.message);
    console.log('\n🔧 Possible fixes:');
    console.log('1. Check your MongoDB username and password');
    console.log('2. Verify IP is whitelisted (you already did this ✓)');
    console.log('3. Check if database user exists in MongoDB Atlas');
    console.log('4. Verify the cluster URL is correct');
    process.exit(1);
  }
};

testConnection();
