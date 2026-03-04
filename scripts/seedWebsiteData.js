import mongoose from 'mongoose';

// Import Content models
import { 
  Projects, 
  Testimonials, 
  SpecialOffers,
  FooterItems,
  News,
  Services,
  CSR,
  Events,
  Careers,
  Leadership
} from '../models/Content.js';

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/future-builders-studio');

async function seedAllWebsiteData() {
  try {
    console.log('🚀 Seeding all website data for CMS...');

    // 1. PROJECTS DATA
    console.log('\n📋 Adding Projects...');
    await Projects.deleteMany({});
    
    const projectsData = {
      items: [
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Luxury Residential Complex",
          location: "Bandra West, Mumbai",
          description: "Premium residential project with world-class amenities and modern architecture",
          category: "residential",
          type: "apartment",
          status: "ongoing",
          amenities: ["Swimming Pool", "Gym", "Club House", "Garden", "24/7 Security", "Parking"],
          image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Commercial Business Park",
          location: "BKC, Mumbai", 
          description: "Modern office spaces with state-of-the-art facilities",
          category: "commercial",
          type: "office",
          status: "completed",
          amenities: ["Conference Rooms", "Cafeteria", "Parking", "Security", "High-speed Internet"],
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Smart City Township",
          location: "Pune",
          description: "Integrated smart city project with sustainable living solutions",
          category: "township", 
          type: "mixed-use",
          status: "upcoming",
          amenities: ["Smart Infrastructure", "Solar Power", "Waste Management", "Public Transport", "Green Spaces"],
          image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500",
          createdAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await Projects.create(projectsData);
    console.log('✅ Projects seeded successfully');

    // 2. TESTIMONIALS DATA
    console.log('\n💬 Adding Testimonials...');
    await Testimonials.deleteMany({});
    
    const testimonialsData = {
      items: [
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Rajesh Sharma",
          role: "CEO",
          company: "Tech Solutions Ltd",
          content: "Future Builders Studio delivered exceptional quality in our office project. Their attention to detail and professional approach made the entire process seamless.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
          rating: 5,
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Priya Patel",
          role: "Home Owner",
          company: "Resident",
          content: "We are extremely happy with our new apartment. The build quality is excellent and all amenities work perfectly. Highly recommend Future Builders Studio!",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
          rating: 5,
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Amit Kumar",
          role: "Business Owner",
          company: "Kumar Enterprises",
          content: "The commercial space they developed for us has significantly improved our business operations. Great team to work with!",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
          rating: 4,
          createdAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await Testimonials.create(testimonialsData);
    console.log('✅ Testimonials seeded successfully');

    // 3. SPECIAL OFFERS DATA  
    console.log('\n🎯 Adding Special Offers...');
    await SpecialOffers.deleteMany({});
    
    const offersData = {
      items: [
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Early Bird Discount",
          price: "₹45,00,000",
          discount: "15% Off",
          status: "active",
          location: "Mumbai Projects",
          features: ["Zero Registration", "Free Parking", "Club Membership", "2 Years Maintenance"],
          description: "Limited time offer for first 50 bookings",
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Festive Season Special",
          price: "₹38,50,000",
          discount: "20% Off",
          status: "active",
          location: "Pune Township",
          features: ["Gold Loan Assistance", "Interior Design Consultation", "Legal Documentation Free"],
          description: "Celebrate festivals in your new home",
          validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Commercial Space Offer",
          price: "₹75,00,000", 
          discount: "10% Off",
          status: "active",
          location: "BKC, Mumbai",
          features: ["Ready to Move", "Premium Location", "High ROI", "Modern Amenities"],
          description: "Prime commercial spaces at discounted rates",
          validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
          createdAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await SpecialOffers.create(offersData);
    console.log('✅ Special Offers seeded successfully');

    // 4. FOOTER DATA
    console.log('\n📞 Adding Footer Items...');
    await FooterItems.deleteMany({});
    
    const footerData = {
      items: [
        {
          _id: new mongoose.Types.ObjectId(),
          type: "phone",
          label: "Call Us",
          value: "+91 98765 43210",
          icon: "phone",
          order: 1,
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          type: "email",
          label: "Email Us",
          value: "info@futurebuilderstudio.com",
          icon: "mail",
          order: 2,
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          type: "address",
          label: "Visit Us",
          value: "123 Business District, Mumbai, Maharashtra 400001",
          icon: "map-pin",
          order: 3,
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          type: "social",
          label: "Facebook",
          value: "https://facebook.com/futurebuilderstudio",
          icon: "facebook",
          order: 4,
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          type: "social",
          label: "LinkedIn",
          value: "https://linkedin.com/company/futurebuilderstudio",
          icon: "linkedin",
          order: 5,
          createdAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await FooterItems.create(footerData);
    console.log('✅ Footer Items seeded successfully');

    // 5. NEWS DATA
    console.log('\n📰 Adding News Items...');
    await News.deleteMany({});
    
    const newsData = {
      items: [
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Future Builders Studio Launches New Residential Project in Mumbai",
          content: "We are excited to announce the launch of our latest residential complex featuring modern amenities and sustainable design.",
          category: "launch",
          author: "Marketing Team",
          publishedAt: new Date(),
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
          createdAt: new Date()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Award for Best Real Estate Developer 2024",
          content: "Future Builders Studio has been recognized as the Best Real Estate Developer for innovative and sustainable construction practices.",
          category: "award",
          author: "PR Team",
          publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500",
          createdAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await News.create(newsData);
    console.log('✅ News seeded successfully');

    console.log('\n🎉 All website data seeded successfully!');
    console.log('📊 Summary:');
    console.log('   - Projects: 3 items');
    console.log('   - Testimonials: 3 items');
    console.log('   - Special Offers: 3 items');
    console.log('   - Footer Items: 5 items');
    console.log('   - News: 2 items');
    console.log('\n✅ CMS is now ready with real website data!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding website data:', error);
    process.exit(1);
  }
}

// Run the seeding
seedAllWebsiteData();