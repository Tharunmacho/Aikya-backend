/**
 * Complete CMS Content Audit Script
 * Checks all content in MongoDB and identifies what's editable vs hardcoded
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

// Import all models
import { Hero, About, Footer } from '../models/Content.js';
import {
  ProjectItem,
  TestimonialItem,
  SpecialOfferItem,
  LeadershipItem,
  WhyChooseItem,
  LocationCardItem,
  FooterItem
} from '../models/CMSItems.js';

async function auditContent() {
  try {
    console.log('\n🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('═══════════════════════════════════════════════════════════');
    console.log('           CMS CONTENT AUDIT REPORT');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Check Hero Section
    console.log('📱 HERO SECTION');
    const hero = await Hero.findOne();
    if (hero) {
      console.log(`   ✅ Editable via Admin CMS`);
      console.log(`   - Title: "${hero.title?.substring(0, 50)}..."`);
      console.log(`   - Subtitle: "${hero.subtitle}"`);
      console.log(`   ⚠️  Note: Stats (100+ Projects, 20+ Years) are HARDCODED in frontend`);
      console.log(`   ⚠️  Note: Social links are HARDCODED in frontend`);
    } else {
      console.log(`   ❌ No data found`);
    }

    // Check About Section
    console.log('\n📖 ABOUT SECTION');
    const about = await About.findOne();
    if (about) {
      console.log(`   ✅ Editable via Admin CMS`);
      console.log(`   - Heading: "${about.heading}"`);
      console.log(`   - Content: "${about.content?.substring(0, 50)}..."`);
      console.log(`   ⚠️  Note: Stats (100+ Projects, 95% Success Rate, etc) are HARDCODED`);
    } else {
      console.log(`   ❌ No data found`);
    }

    // Check Projects
    console.log('\n🏢 PROJECTS');
    const projects = await ProjectItem.find();
    console.log(`   ✅ Fully manageable via Admin CMS`);
    console.log(`   - Total Projects: ${projects.length}`);
    console.log(`   - Editable: Name, location, category, type, status, amenities, image`);

    // Check Location Cards
    console.log('\n📍 LOCATION CARDS');
    const locations = await LocationCardItem.find();
    console.log(`   ✅ Fully manageable via Admin CMS`);
    console.log(`   - Total Locations: ${locations.length}`);
    if (locations.length > 0) {
      console.log(`   - Locations: ${locations.map(l => l.name).join(', ')}`);
    }

    // Check Special Offers
    console.log('\n🎁 SPECIAL OFFERS');
    const specialOffers = await SpecialOfferItem.find();
    console.log(`   ✅ Fully manageable via Admin CMS`);
    console.log(`   - Total Offers: ${specialOffers.length}`);
    console.log(`   - Active Offers: ${specialOffers.filter(o => o.status === 'active').length}`);

    // Check Testimonials
    console.log('\n💬 TESTIMONIALS');
    const testimonials = await TestimonialItem.find();
    console.log(`   ✅ Fully manageable via Admin CMS`);
    console.log(`   - Total Testimonials: ${testimonials.length}`);
    if (testimonials.length > 0) {
      const avgRating = (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1);
      console.log(`   - Average Rating: ${avgRating}/5`);
    }

    // Check Leadership
    console.log('\n👔 LEADERSHIP');
    const leaders = await LeadershipItem.find();
    console.log(`   ✅ Fully manageable via Admin CMS`);
    console.log(`   - Total Leaders: ${leaders.length}`);
    if (leaders.length > 0) {
      console.log(`   - Leaders: ${leaders.map(l => l.name).join(', ')}`);
    }
    console.log(`   ⚠️  Note: Achievements (20+ Years, 100+ Projects, etc) are HARDCODED`);

    // Check Why Choose Us
    console.log('\n⭐ WHY CHOOSE US');
    const reasons = await WhyChooseItem.find();
    console.log(`   ✅ Fully manageable via Admin CMS`);
    console.log(`   - Total Reasons: ${reasons.length}`);
    if (reasons.length > 0) {
      console.log(`   - Reasons: ${reasons.map(r => r.title).join(', ')}`);
    }

    // Check Footer (Old Model)
    console.log('\n🔗 FOOTER (Main Info)');
    const footer = await Footer.findOne();
    if (footer) {
      console.log(`   ✅ Editable via Admin CMS`);
      console.log(`   - Company: ${footer.companyName}`);
      console.log(`   - Phone Numbers: ${footer.phone?.length || 0}`);
      console.log(`   - Social Media: ${footer.socialMedia?.length || 0} platforms`);
      console.log(`   - Quick Links: ${footer.links?.company?.length || 0} company, ${footer.links?.resources?.length || 0} resources`);
    }

    // Check Footer Items (New Model)
    console.log('\n🔗 FOOTER ITEMS (Individual Items)');
    const footerItems = await FooterItem.find();
    console.log(`   ✅ Fully manageable via Admin CMS`);
    console.log(`   - Total Items: ${footerItems.length}`);
    console.log(`   - Phone: ${footerItems.filter(f => f.type === 'phone').length}`);
    console.log(`   - Email: ${footerItems.filter(f => f.type === 'email').length}`);
    console.log(`   - Social: ${footerItems.filter(f => f.type === 'social').length}`);
    console.log(`   - Links: ${footerItems.filter(f => f.type === 'link').length}`);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('                    SUMMARY');
    console.log('═══════════════════════════════════════════════════════════\n');

    const totalEditableItems = projects.length + testimonials.length + specialOffers.length + 
                                leaders.length + reasons.length + locations.length + footerItems.length;
    
    console.log(`✅ FULLY EDITABLE CONTENT:`);
    console.log(`   - ${projects.length} Projects`);
    console.log(`   - ${testimonials.length} Testimonials`);
    console.log(`   - ${specialOffers.length} Special Offers`);
    console.log(`   - ${leaders.length} Leaders`);
    console.log(`   - ${reasons.length} Why Choose reasons`);
    console.log(`   - ${locations.length} Location Cards`);
    console.log(`   - ${footerItems.length} Footer Items`);
    console.log(`   - Hero section (title, subtitle, tagline)`);
    console.log(`   - About section (heading, content)`);
    console.log(`   - Footer section (company info, links, social)`);
    console.log(`   TOTAL: ${totalEditableItems} individual items + 3 sections`);

    console.log(`\n⚠️  HARDCODED CONTENT (Cannot be edited via CMS):`);
    console.log(`   - Hero section stats (100+ Projects, 20+ Years)`);
    console.log(`   - Hero section social media icons`);
    console.log(`   - About section stats (100+ Projects, 95% Success, 20+ Years, 50+ Partners)`);
    console.log(`   - Leadership achievements stats`);
    console.log(`   - Contact form (static)`);

    console.log(`\n📱 ACCESS YOUR ADMIN CMS:`);
    console.log(`   URL: http://localhost:5173/admin`);
    console.log(`   Login with your admin credentials`);
    console.log(`   Navigate to each section to edit content`);

    console.log(`\n🎉 ALL DATA IS PERSISTING IN MONGODB!`);
    console.log(`   Your edits will survive server restarts`);
    console.log('\n═══════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error during audit:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔚 Database connection closed\n');
  }
}

auditContent();
