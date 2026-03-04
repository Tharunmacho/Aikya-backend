import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Hero, About, WhyChoose, Contact, Leadership, Projects } from '../models/Content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

console.log('🌱 Seeding database with frontend content...\n');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    await Hero.deleteMany({});
    await About.deleteMany({});
    await WhyChoose.deleteMany({});
    await Contact.deleteMany({});
    await Leadership.deleteMany({});
    await Projects.deleteMany({});
    console.log('🗑️  Cleared existing content\n');

    // Seed Hero Section
    const heroData = {
      title: "Building India's Future",
      subtitle: "India's premier AI-powered venture studio — turning bold ideas into scalable tech ventures. 100+ projects delivered, shaping tomorrow's innovation landscape.",
      tagline: "AI Venture Studio · India",
      buttonText: "Start a Partnership",
      buttonLink: "#contact",
    };
    await Hero.create(heroData);
    console.log('✅ Hero section seeded');

    // Seed About Section
    const aboutData = {
      heading: "About Aikya Builds Future",
      content: "Aikya Builders Pvt. Ltd. is a trusted real estate and construction company based in Chennai — delivering quality residential and commercial developments with unwavering commitment, precision, and customer focus. For over 20 years, we have been transforming dreams into landmark addresses across the city.",
    };
    await About.create(aboutData);
    console.log('✅ About section seeded');

    // Seed Why Choose Section
    const whyChooseData = {
      heading: "Why Choose Aikya",
      reasons: [
        {
          icon: "Clock",
          title: "Rapid Delivery",
          description: "We honor timelines — MVPs in weeks, full products in months."
        },
        {
          icon: "Shield",
          title: "Proven Track Record",
          description: "100+ successful projects with a 95% client success rate."
        },
        {
          icon: "MessageCircle",
          title: "Transparent Process",
          description: "Open communication at every milestone of your venture."
        },
        {
          icon: "Heart",
          title: "Partner-First Mindset",
          description: "Your success is our success. We co-invest, co-build, co-grow."
        },
        {
          icon: "Palette",
          title: "Innovation-Led Design",
          description: "AI-driven product design for delightful user experiences."
        },
        {
          icon: "Star",
          title: "Trusted by Founders",
          description: "50+ strategic partnerships with visionary entrepreneurs."
        }
      ],
    };
    await WhyChoose.create(whyChooseData);
    console.log('✅ Why Choose section seeded');

    // Seed Contact Section
    const contactData = {
      heading: "Let's Build Together",
      description: "Ready to transform your idea into a scalable tech venture? Partner with India's leading AI venture studio.",
      email: "contact@aikyabuilders.com",
      phone: "+91 1234567890",
      address: "Chennai, Tamil Nadu, India",
    };
    await Contact.create(contactData);
    console.log('✅ Contact section seeded');

    // Seed Leadership Section
    const leadershipData = {
      heading: "Meet Our Leadership Team",
      leaders: [
        {
          name: "B. Gopalakrishnan",
          title: "Managing Director",
          bio: "With over 20 plus years of experience in the construction industry, Mr. Gopalakrishnan has been the driving force behind Aikya Builders' commitment to quality and innovation.",
          image: "",
        },
        {
          name: "M B FURHAN SIDDIQ",
          title: "Director",
          bio: "A visionary leader with deep expertise in project management and client relations, ensuring every Aikya project is delivered with precision and excellence.",
          image: "",
        }
      ],
    };
    await Leadership.create(leadershipData);
    console.log('✅ Leadership section seeded');

    // Seed Projects Section
    const projectsData = {
      heading: "Our Projects",
      description: "Explore our portfolio of successful developments across Chennai.",
      projects: [
        {
          name: "Aikya Luxury Apartments",
          description: "Premium 3 & 4 BHK apartments in the heart of Chennai with world-class amenities.",
          image: "",
          location: "Chennai",
          status: "Completed",
        },
        {
          name: "Aikya Business Park",
          description: "State-of-the-art commercial spaces designed for modern businesses.",
          image: "",
          location: "Chennai",
          status: "Ongoing",
        },
        {
          name: "Aikya Green Villas",
          description: "Eco-friendly independent villas with sustainable living features.",
          image: "",
          location: "Chennai",
          status: "Upcoming",
        }
      ],
    };
    await Projects.create(projectsData);
    console.log('✅ Projects section seeded');

    console.log('\n🎉 All content seeded successfully!\n');
    
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
