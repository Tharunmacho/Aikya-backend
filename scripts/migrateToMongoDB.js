import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  ProjectItem,
  TestimonialItem,
  SpecialOfferItem,
  LeadershipItem,
  WhyChooseItem,
  LocationCardItem,
  FooterItem,
} from '../models/CMSItems.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

// Data from memoryStore.js
const memoryStoreData = {
  projects: [
    {
      name: "Aikya Eden Park",
      location: "Tambaram, Chennai",
      description: "A premium residential project offering spacious flats and apartments with modern amenities. Located in the heart of Tambaram, this completed project provides excellent connectivity and lifestyle facilities.",
      category: "residential",
      type: "apartment",
      status: "completed",
      amenities: ["24/7 Security", "Covered Parking", "Children's Play Area", "Landscaped Garden", "Gym", "Community Hall"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
    },
    {
      name: "Aikya Green Meadows",
      location: "Pallavaram, Chennai",
      description: "Luxury villas and independent homes designed for modern living. This ongoing project in Pallavaram offers premium living spaces with world-class amenities and green landscapes.",
      category: "residential",
      type: "villa",
      status: "ongoing",
      amenities: ["Private Gardens", "Home Automation", "Premium Finishes", "Private Parking", "Security Systems", "Modular Kitchen"],
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=300&fit=crop",
    },
    {
      name: "Aikya Business Square",
      location: "T. Nagar, Chennai",
      description: "Prime commercial space in the bustling T. Nagar area. This completed project offers modern office spaces with excellent connectivity and premium amenities for businesses.",
      category: "commercial",
      type: "office",
      status: "completed",
      amenities: ["Conference Rooms", "High-speed Elevators", "24/7 Security", "Power Backup", "Modern Interiors", "Parking Facility"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
    },
    {
      name: "Aikya Horizon Towers",
      location: "Velachery, Chennai",
      description: "Modern high-rise apartment complex in Velachery offering spacious flats with premium amenities. This ongoing project combines contemporary design with sustainable living solutions.",
      category: "residential",
      type: "apartment",
      status: "ongoing",
      amenities: ["Swimming Pool", "Gym", "Club House", "Landscaped Garden", "24/7 Security", "Covered Parking", "Children's Play Area"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
    },
    {
      name: "Aikya Lakewood Villas",
      location: "Sholinganallur, Chennai",
      description: "Elegant villa collection in the serene Sholinganallur area. This completed project features independent villas with modern architecture and premium lifestyle amenities.",
      category: "residential",
      type: "villa",
      status: "completed",
      amenities: ["Private Gardens", "Club House", "Swimming Pool", "Security Systems", "Children's Play Area", "Jogging Track"],
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=300&fit=crop",
    },
    {
      name: "Aikya Grand Avenue",
      location: "Porur, Chennai",
      description: "Premium residential plots in the rapidly developing Porur area. This ongoing project offers well-planned plots with all essential infrastructure and amenities.",
      category: "residential",
      type: "plots",
      status: "ongoing",
      amenities: ["Gated Community", "Underground Drainage", "Street Lights", "Water Supply", "Security", "Park Area"],
      image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500&h=300&fit=crop",
    },
    {
      name: "Aikya Tech Hub",
      location: "OMR, Chennai",
      description: "State-of-the-art commercial complex on OMR, Chennai's IT corridor. This completed project provides modern office spaces with cutting-edge facilities for tech companies.",
      category: "commercial",
      type: "office",
      status: "completed",
      amenities: ["Conference Rooms", "Food Court", "Multi-level Parking", "High-speed Internet", "24/7 Security", "Power Backup", "Cafeteria"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
    },
    {
      name: "Aikya Serenity Heights",
      location: "Medavakkam, Chennai",
      description: "Tranquil apartment complex in Medavakkam offering peaceful living with modern comforts. This completed project features spacious flats with excellent ventilation and amenities.",
      category: "residential",
      type: "apartment",
      status: "completed",
      amenities: ["Swimming Pool", "Gym", "24/7 Security", "Covered Parking", "Power Backup", "Community Hall", "Garden"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
    },
    {
      name: "Aikya Palm Residency",
      location: "Guduvancheri, Chennai",
      description: "Well-planned residential plot development in Guduvancheri. This completed project offers DTCP approved plots with all modern infrastructure facilities.",
      category: "residential",
      type: "plots",
      status: "completed",
      amenities: ["DTCP Approved", "Gated Community", "Avenue Trees", "Underground Drainage", "Street Lights", "Water Supply", "24/7 Security"],
      image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500&h=300&fit=crop",
    }
  ],

  testimonials: [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      company: "Resident - Aikya Business Square",
      content: "Aikya Builders delivered exceptional quality in our office project in T. Nagar. Their attention to detail and professional approach made the entire process seamless. The team was responsive and delivered on time.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Priya Sundaram",
      role: "Home Owner",
      company: "Resident - Aikya Eden Park",
      content: "We are extremely happy with our new apartment in Aikya Eden Park, Tambaram. The build quality is excellent, all amenities work perfectly, and the location is fantastic. Highly recommend Aikya Builders!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Aravind Krishnan",
      role: "IT Professional",
      company: "Resident - Aikya Horizon Towers",
      content: "Aikya Horizon Towers in Velachery exceeded all our expectations. Modern amenities, excellent connectivity, and professional management. The best decision we made for our family!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Meena Venkatesh",
      role: "Entrepreneur",
      company: "Resident - Aikya Lakewood Villas",
      content: "The luxury villa we purchased in Aikya Lakewood Villas, Sholinganallur is a dream come true. Aikya Builders maintained high construction standards and timely delivery. Absolutely delighted!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      rating: 5,
    }
  ],

  specialOffers: [
    {
      title: "Early Bird Discount - Aikya Horizon Towers",
      price: "₹48,00,000",
      discount: "15% Off",
      status: "active",
      location: "Velachery, Chennai",
      features: ["Zero Registration Charges", "Free Covered Parking", "2 Years Club Membership", "2 Years Free Maintenance", "Modular Kitchen"],
      description: "Limited time offer for first 30 bookings at Aikya Horizon Towers",
    },
    {
      title: "Festive Season Special - Grand Avenue Plots",
      price: "₹35,00,000",
      discount: "20% Off",
      status: "active",
      location: "Porur, Chennai",
      features: ["DTCP Approved", "Free Interior Design Consultation", "Legal Documentation Free", "Home Loan Support", "Vastu Consultation"],
      description: "Celebrate festivals in your dream plot at Aikya Grand Avenue, Porur",
    },
    {
      title: "Commercial Space Offer - Tech Hub OMR",
      price: "₹65,00,000",
      discount: "10% Off",
      status: "active",
      location: "OMR, Chennai",
      features: ["Ready to Move In", "Premium IT Corridor Location", "High ROI Potential", "Modern Amenities", "Flexible Payment Plans"],
      description: "Prime commercial spaces at Aikya Tech Hub, OMR for businesses and startups",
    },
    {
      title: "First Time Buyer Scheme - Green Meadows",
      price: "₹42,00,000",
      discount: "18% Off",
      status: "active",
      location: "Pallavaram, Chennai",
      features: ["Subsidized Interest Rate", "Reduced Down Payment", "Free Registration", "Legal Assistance", "Construction Guarantee"],
      description: "Special scheme for first-time home buyers at Aikya Green Meadows",
    }
  ],

  leadership: [
    {
      name: "B. Gopalakrishnan",
      title: "Managing Director",
      initial: "G",
      bio: "With over 30 years of experience in real estate development, B. Gopalakrishnan leads Aikya Builders with a vision of excellence and integrity. His strategic approach has positioned the company as a trusted name in Chennai's real estate market.",
      image: "",
      order: 1,
    },
    {
      name: "M B FURHAN SIDDIQ",
      title: "Director",
      initial: "F",
      bio: "M B Furhan Siddiq brings innovative thinking and operational excellence to Aikya Builders. With expertise in project management and customer relations, he ensures every project meets the highest standards of quality and timely delivery.",
      image: "",
      order: 2,
    }
  ],

  whyChoose: [
    {
      title: "Rapid Delivery",
      desc: "We complete every project on time with meticulous planning and execution.",
      icon: "Clock",
      order: 1,
    },
    {
      title: "Proven Track Record",
      desc: "Over 25 years of excellence in delivering quality projects across Chennai.",
      icon: "Shield",
      order: 2,
    },
    {
      title: "Customer-Centric Approach",
      desc: "Your satisfaction is our priority. We listen, understand, and deliver beyond expectations.",
      icon: "MessageCircle",
      order: 3,
    },
    {
      title: "Quality Assurance",
      desc: "Premium materials and skilled craftsmanship ensure lasting value in every property.",
      icon: "Heart",
      order: 4,
    },
    {
      title: "Innovative Designs",
      desc: "Modern architecture combined with functional living spaces for contemporary lifestyles.",
      icon: "Palette",
      order: 5,
    },
    {
      title: "Premium Locations",
      desc: "Strategic locations with excellent connectivity and growth potential.",
      icon: "Star",
      order: 6,
    }
  ],

  locationCards: [
    {
      name: "CHENNAI",
      description: "Explore our premium residential and commercial projects in the heart of Chennai",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop",
      projectCount: 7,
      order: 1,
    },
    {
      name: "TIRUNELVELI",
      description: "Discover quality living spaces in the historic city of Tirunelveli",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop",
      projectCount: 2,
      order: 2,
    },
    {
      name: "CHENGALPATTU",
      description: "Experience modern living in the emerging hub of Chengalpattu",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop",
      projectCount: 1,
      order: 3,
    }
  ],

  footerItems: [
    {
      type: "phone",
      label: "Call Us",
      value: "+91 44 2345 6789",
      icon: "phone",
      order: 1,
    },
    {
      type: "email",
      label: "Email Us",
      value: "info@aikyabuilders.com",
      icon: "mail",
      order: 2,
    },
    {
      type: "address",
      label: "Visit Us",
      value: "Aikya Builders, 45 Anna Salai, Mount Road, Chennai, Tamil Nadu 600002",
      icon: "map-pin",
      order: 3,
    },
    {
      type: "social",
      label: "Facebook",
      value: "https://facebook.com/aikyabuilders",
      icon: "facebook",
      order: 4,
    },
    {
      type: "social",
      label: "LinkedIn",
      value: "https://linkedin.com/company/aikyabuilders",
      icon: "linkedin",
      order: 5,
    },
    {
      type: "social",
      label: "Instagram",
      value: "https://instagram.com/aikyabuilders",
      icon: "instagram",
      order: 6,
    }
  ],
};

async function migrateToMongoDB() {
  try {
    console.log('🚀 Starting migration from memoryStore to MongoDB...\n');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let totalMigrated = 0;

    // Migrate Projects
    console.log('📦 Migrating Projects...');
    await ProjectItem.deleteMany({});
    const projects = await ProjectItem.insertMany(memoryStoreData.projects);
    console.log(`   ✅ Migrated ${projects.length} projects`);
    totalMigrated += projects.length;

    // Migrate Testimonials
    console.log('💬 Migrating Testimonials...');
    await TestimonialItem.deleteMany({});
    const testimonials = await TestimonialItem.insertMany(memoryStoreData.testimonials);
    console.log(`   ✅ Migrated ${testimonials.length} testimonials`);
    totalMigrated += testimonials.length;

    // Migrate Special Offers
    console.log('🎁 Migrating Special Offers...');
    await SpecialOfferItem.deleteMany({});
    const offers = await SpecialOfferItem.insertMany(memoryStoreData.specialOffers);
    console.log(`   ✅ Migrated ${offers.length} special offers`);
    totalMigrated += offers.length;

    // Migrate Leadership
    console.log('👔 Migrating Leadership Team...');
    await LeadershipItem.deleteMany({});
    const leaders = await LeadershipItem.insertMany(memoryStoreData.leadership);
    console.log(`   ✅ Migrated ${leaders.length} leaders`);
    totalMigrated += leaders.length;

    // Migrate Why Choose Us
    console.log('⭐ Migrating Why Choose Us...');
    await WhyChooseItem.deleteMany({});
    const reasons = await WhyChooseItem.insertMany(memoryStoreData.whyChoose);
    console.log(`   ✅ Migrated ${reasons.length} reasons`);
    totalMigrated += reasons.length;

    // Migrate Location Cards
    console.log('📍 Migrating Location Cards...');
    await LocationCardItem.deleteMany({});
    const locations = await LocationCardItem.insertMany(memoryStoreData.locationCards);
    console.log(`   ✅ Migrated ${locations.length} location cards`);
    totalMigrated += locations.length;

    // Migrate Footer Items
    console.log('🔗 Migrating Footer Items...');
    await FooterItem.deleteMany({});
    const footerItems = await FooterItem.insertMany(memoryStoreData.footerItems);
    console.log(`   ✅ Migrated ${footerItems.length} footer items`);
    totalMigrated += footerItems.length;

    console.log('\n' + '═'.repeat(60));
    console.log(`✅ Migration Complete! Total items migrated: ${totalMigrated}`);
    console.log('═'.repeat(60));

    console.log('\n📊 Final Collections:');
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    collections.forEach((col, index) => {
      console.log(`${index + 1}. ${col.name}`);
    });

    console.log('\n✅ All data successfully migrated to MongoDB!');
    console.log('💡 Now update backend routes to use MongoDB models.');

  } catch (error) {
    console.error('❌ Migration Error:', error.message);
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
  }
}

migrateToMongoDB();
