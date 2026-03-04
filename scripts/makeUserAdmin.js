import mongoose from 'mongoose';
import User from '../models/User.js';
import Auth from '../models/Auth.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: join(__dirname, '..', '.env') });

const makeUserAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');
    
    // Email to make admin
    const adminEmail = "admin@gmail.com";
    
    console.log(`\nUpdating user: ${adminEmail}`);
    
    // Update in users collection
    const userResult = await User.updateOne(
      { email: adminEmail },
      { $set: { isAdmin: true } }
    );
    
    // Update in auth collection
    const authResult = await Auth.updateOne(
      { email: adminEmail },
      { $set: { isAdmin: true } }
    );
    
    console.log('\n=== Update Results ===');
    console.log(`Users collection: ${userResult.matchedCount} matched, ${userResult.modifiedCount} modified`);
    console.log(`Auth collection: ${authResult.matchedCount} matched, ${authResult.modifiedCount} modified`);
    
    if (userResult.matchedCount > 0 && authResult.matchedCount > 0) {
      console.log('\n✅ SUCCESS! User is now an admin!');
      console.log(`\nYou can now login with: ${adminEmail}`);
      console.log('After login, you will see "Manage Content" option in the profile dropdown.');
    } else {
      console.log('\n❌ ERROR! User not found with this email.');
      console.log('Make sure the user has signed up first.');
    }
    
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

makeUserAdmin();
