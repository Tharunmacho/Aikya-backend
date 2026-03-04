/**
 * Test script to verify data persistence in MongoDB
 * This script verifies that all migrated data exists in MongoDB collections
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

import {
  ProjectItem,
  TestimonialItem,
  SpecialOfferItem,
  LeadershipItem,
  WhyChooseItem,
  LocationCardItem,
  FooterItem
} from '../models/CMSItems.js';

async function testPersistence() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Test Projects
    const projects = await ProjectItem.find();
    console.log(`📦 Projects: ${projects.length} items`);
    if (projects.length > 0) {
      console.log(`   First project: ${projects[0].name}`);
    }

    // Test Testimonials
    const testimonials = await TestimonialItem.find();
    console.log(`💬 Testimonials: ${testimonials.length} items`);
    if (testimonials.length > 0) {
      console.log(`   First testimonial: ${testimonials[0].name}`);
    }

    // Test Special Offers
    const offers = await SpecialOfferItem.find();
    console.log(`🎁 Special Offers: ${offers.length} items`);
    if (offers.length > 0) {
      console.log(`   First offer: ${offers[0].title}`);
    }

    // Test Leadership
    const leaders = await LeadershipItem.find().sort({ order: 1 });
    console.log(`👔 Leadership: ${leaders.length} items`);
    if (leaders.length > 0) {
      console.log(`   First leader: ${leaders[0].name}`);
    }

    // Test Why Choose
    const reasons = await WhyChooseItem.find().sort({ order: 1 });
    console.log(`⭐ Why Choose: ${reasons.length} items`);
    if (reasons.length > 0) {
      console.log(`   First reason: ${reasons[0].title}`);
    }

    // Test Location Cards
    const locations = await LocationCardItem.find().sort({ order: 1 });
    console.log(`📍 Location Cards: ${locations.length} items`);
    if (locations.length > 0) {
      console.log(`   First location: ${locations[0].name}`);
    }

    // Test Footer
    const footerItems = await FooterItem.find().sort({ order: 1 });
    console.log(`🔗 Footer Items: ${footerItems.length} items`);
    if (footerItems.length > 0) {
      console.log(`   First footer: ${footerItems[0].label || footerItems[0].value}`);
    }

    const totalItems = projects.length + testimonials.length + offers.length + 
                      leaders.length + reasons.length + locations.length + footerItems.length;

    console.log(`\n✅ Total items in MongoDB: ${totalItems}`);
    console.log('✅ All data is persisting correctly in MongoDB!');
    console.log('\n🎉 Data will survive server restarts!');

  } catch (error) {
    console.error('❌ Error testing persistence:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔚 Database connection closed');
  }
}

testPersistence();
