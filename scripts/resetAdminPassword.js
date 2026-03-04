import mongoose from 'mongoose';
import User from '../models/User.js';
import Auth from '../models/Auth.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: join(__dirname, '..', '.env') });

const resetAdminPassword = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB successfully!\n');
    
    // Admin email and new password
    const adminEmail = "admin@aikyabuilders.com"; // Change this to your admin email
    const newPassword = "Admin@123";               // Change this to your desired password
    
    console.log(`🔐 Resetting password for: ${adminEmail}`);
    console.log(`🔑 New password will be: ${newPassword}\n`);
    
    // Check if user exists
    const existingUser = await User.findOne({ email: adminEmail });
    const existingAuth = await Auth.findOne({ email: adminEmail });
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    if (existingUser || existingAuth) {
      // User exists, update password
      console.log('👤 User found! Updating password...\n');
      
      // Update in users collection
      const userResult = await User.updateOne(
        { email: adminEmail },
        { $set: { password: hashedPassword, isAdmin: true } }
      );
      
      // Update in auth collection
      const authResult = await Auth.updateOne(
        { email: adminEmail },
        { $set: { password: hashedPassword, isAdmin: true } }
      );
      
      console.log('=== Update Results ===');
      console.log(`Users collection: ${userResult.matchedCount} matched, ${userResult.modifiedCount} modified`);
      console.log(`Auth collection: ${authResult.matchedCount} matched, ${authResult.modifiedCount} modified`);
      
      console.log('\n✅ SUCCESS! Admin password has been reset!');
    } else {
      // User doesn't exist, create new admin
      console.log('👤 User not found! Creating new admin user...\n');
      
      // Create in users collection
      await User.create({
        fullName: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true
      });
      
      // Create in auth collection
      await Auth.create({
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true
      });
      
      console.log('✅ SUCCESS! New admin user created!');
    }
    
    console.log(`\n📋 Login Credentials:`);
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${newPassword}`);
    console.log('\n⚠️  IMPORTANT: Change this password after logging in!\n');
    
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

resetAdminPassword();
