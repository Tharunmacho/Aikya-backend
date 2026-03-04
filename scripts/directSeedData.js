import mongoose from 'mongoose';

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/future-builders-studio');

// Define schemas directly to avoid import issues
const projectItemSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  category: String,
  type: String,
  status: { type: String, enum: ['ongoing', 'completed', 'upcoming'] },
  amenities: [String],
  image: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const testimonialsItemSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  content: String,
  image: String,
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const specialOfferItemSchema = new mongoose.Schema({
  title: String,
  price: String,
  discount: String,
  status: { type: String, enum: ['active', 'inactive', 'expired'] },
  location: String,
  features: [String],
  description: String,
  validUntil: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const footerItemSchema = new mongoose.Schema({
  type: { type: String, enum: ['phone', 'email', 'address', 'social', 'link'] },
  label: String,
  value: String,
  icon: String,
  order: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const projectsSchema = new mongoose.Schema({
  items: [projectItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const testimonialsSchema = new mongoose.Schema({
  items: [testimonialsItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const specialOffersSchema = new mongoose.Schema({
  items: [specialOfferItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }  
});

const footerItemsSchema = new mongoose.Schema({
  items: [footerItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create models
const Projects = mongoose.model('Projects', projectsSchema);
const Testimonials = mongoose.model('Testimonials', testimonialsSchema);
const SpecialOffers = mongoose.model('SpecialOffers', specialOffersSchema);
const FooterItems = mongoose.model('FooterItems', footerItemsSchema);

async function addWebsiteData() {
  try {
    console.log('🚀 Adding website data for CMS...');

    // 1. PROJECTS
    console.log('📋 Adding Projects...');
    await Projects.findOneAndUpdate(
      {},
      {
        items: [
          {
            _id: new mongoose.Types.ObjectId(),
            name: "Luxury Residential Complex",
            location: "Bandra West, Mumbai", 
            description: "Premium residential project with world-class amenities",
            category: "residential",
            type: "apartment",
            status: "ongoing",
            amenities: ["Swimming Pool", "Gym", "Club House", "Garden", "24/7 Security"],
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
            amenities: ["Conference Rooms", "Cafeteria", "Parking", "Security"],
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
            createdAt: new Date()
          },
          {
            _id: new mongoose.Types.ObjectId(),
            name: "Smart City Township",
            location: "Pune",
            description: "Integrated smart city project with sustainable living",
            category: "township",
            type: "mixed-use",
            status: "upcoming", 
            amenities: ["Smart Infrastructure", "Solar Power", "Green Spaces"],
            image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500",
            createdAt: new Date()
          }
        ],
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );
    console.log('✅ Projects added!');

    // 2. TESTIMONIALS
    console.log('💬 Adding Testimonials...');
    await Testimonials.findOneAndUpdate(
      {},
      {
        items: [
          {
            _id: new mongoose.Types.ObjectId(),
            name: "Rajesh Sharma",
            role: "CEO",
            company: "Tech Solutions Ltd",
            content: "Future Builders Studio delivered exceptional quality in our office project. Professional approach made the process seamless.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
            rating: 5,
            createdAt: new Date()
          },
          {
            _id: new mongoose.Types.ObjectId(),
            name: "Priya Patel", 
            role: "Home Owner",
            company: "Resident",
            content: "Extremely happy with our new apartment. Excellent build quality and amenities. Highly recommend Future Builders!",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
            rating: 5,
            createdAt: new Date()
          },
          {
            _id: new mongoose.Types.ObjectId(),
            name: "Amit Kumar",
            role: "Business Owner", 
            company: "Kumar Enterprises",
            content: "The commercial space significantly improved our operations. Great team to work with!",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
            rating: 4,
            createdAt: new Date()
          }
        ],
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );
    console.log('✅ Testimonials added!');

    // 3. SPECIAL OFFERS
    console.log('🎯 Adding Special Offers...');
    await SpecialOffers.findOneAndUpdate(
      {},
      {
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
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
            validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
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
            validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            createdAt: new Date()
          }
        ],
        updatedAt: new Date()
      },
      { upsert: true, new: true } 
    );
    console.log('✅ Special Offers added!');

    // 4. FOOTER ITEMS
    console.log('📞 Adding Footer Items...');
    await FooterItems.findOneAndUpdate(
      {},
      {
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
          }
        ],
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );
    console.log('✅ Footer Items added!');

    console.log('\n🎉 All website data added successfully!');
    console.log('📊 CMS now has data for:');
    console.log('   ✓ Projects (3 items)');
    console.log('   ✓ Testimonials (3 items)'); 
    console.log('   ✓ Special Offers (3 items)');
    console.log('   ✓ Footer Items (4 items)');
    console.log('\n🚀 Go to CMS to see the data!');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding data:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

addWebsiteData();