/**
 * Script to populate Footer model with website data
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

// Import Footer model
import { Footer } from '../models/Content.js';

async function populateFooter() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get or create footer
    let footer = await Footer.findOne();
    if (!footer) {
      footer = new Footer();
    }

    // Update footer with proper data
    footer.companyName = 'Aikya Builders and Promoters';
    footer.tagline = 'Building Future';
    footer.address = 'No.247/B, Velachery Main Road,\nSelaiyur, Chennai, Tamil Nadu 600073, India';
    footer.phone = ['+91 44 2345 6789', '+91 98765 43210'];
    footer.email = 'enquiry@aikyabuilders.com';
    
    // Quick Links
    footer.links = {
      company: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '#contact' }
      ],
      resources: [
        { label: 'Latest News', href: '/news' },
        { label: 'Events', href: '/events' },
        { label: 'CSR Initiatives', href: '/csr' },
        { label: 'Careers', href: '/careers' }
      ]
    };
    
    // Social Media
    footer.socialMedia = [
      { platform: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/aikyabuilders' },
      { platform: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/aikyabuilders' },
      { platform: 'Linkedin', icon: 'Linkedin', url: 'https://linkedin.com/company/aikyabuilders' },
      { platform: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/aikyabuilders' },
      { platform: 'Youtube', icon: 'Youtube', url: 'https://youtube.com/@aikyabuilders' }
    ];

    footer.copyright = '© 2026 Aikya Builders and Promoters - Designed and Developed by Knowbin Technologies';
    footer.updatedAt = Date.now();

    await footer.save();

    console.log('✅ Footer data populated successfully!');
    console.log('\nFooter Details:');
    console.log(`- Company: ${footer.companyName}`);
    console.log(`- Quick Links: ${footer.links.company.length} companylinks, ${footer.links.resources.length} resource links`);
    console.log(`- Phone Numbers: ${footer.phone.length}`);
    console.log(`- Social Media: ${footer.socialMedia.length} platforms`);
    console.log('\n🎉 Footer is now ready for the website!');

  } catch (error) {
    console.error('❌ Error populating footer:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔚 Database connection closed');
  }
}

populateFooter();
