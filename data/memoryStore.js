// In-memory data store for CMS (temporary until MongoDB is fixed)
// This allows full CRUD operations without database connection

import mongoose from 'mongoose';

// Initialize in-memory data store
let dataStore = {
  projects: {
    items: [
      {
        _id: "507f1f77bcf86cd799439011",
        name: "Aikya Eden Park",
        location: "Tambaram, Chennai",
        description: "A premium residential project offering spacious flats and apartments with modern amenities. Located in the heart of Tambaram, this completed project provides excellent connectivity and lifestyle facilities.",
        category: "residential",
        type: "apartment",
        status: "completed",
        amenities: ["24/7 Security", "Covered Parking", "Children's Play Area", "Landscaped Garden", "Gym", "Community Hall"],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439012",
        name: "Aikya Green Meadows",
        location: "Pallavaram, Chennai",
        description: "Luxury villas and independent homes designed for modern living. This ongoing project in Pallavaram offers premium living spaces with world-class amenities and green landscapes.",
        category: "residential",
        type: "villa",
        status: "ongoing",
        amenities: ["Private Gardens", "Home Automation", "Premium Finishes", "Private Parking", "Security Systems", "Modular Kitchen"],
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=300&fit=crop",
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439013",
        name: "Aikya Business Square",
        location: "T. Nagar, Chennai",
        description: "Prime commercial space in the bustling T. Nagar area. This completed project offers modern office spaces with excellent connectivity and premium amenities for businesses.",
        category: "commercial",
        type: "office",
        status: "completed",
        amenities: ["Conference Rooms", "High-speed Elevators", "24/7 Security", "Power Backup", "Modern Interiors", "Parking Facility"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
        createdAt: new Date('2023-06-10'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439014",
        name: "Aikya Horizon Towers",
        location: "Velachery, Chennai",
        description: "Modern high-rise apartment complex in Velachery offering spacious flats with premium amenities. This ongoing project combines contemporary design with sustainable living solutions.",
        category: "residential",
        type: "apartment",
        status: "ongoing",
        amenities: ["Swimming Pool", "Gym", "Club House", "Landscaped Garden", "24/7 Security", "Covered Parking", "Children's Play Area"],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439015",
        name: "Aikya Lakewood Villas",
        location: "Sholinganallur, Chennai",
        description: "Elegant villa collection in the serene Sholinganallur area. This completed project features independent villas with modern architecture and premium lifestyle amenities.",
        category: "residential",
        type: "villa",
        status: "completed",
        amenities: ["Private Gardens", "Club House", "Swimming Pool", "Security Systems", "Children's Play Area", "Jogging Track"],
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=300&fit=crop",
        createdAt: new Date('2023-08-15'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439016",
        name: "Aikya Grand Avenue",
        location: "Porur, Chennai",
        description: "Premium residential plots in the rapidly developing Porur area. This ongoing project offers well-planned plots with all essential infrastructure and amenities.",
        category: "residential",
        type: "plots",
        status: "ongoing",
        amenities: ["Gated Community", "Underground Drainage", "Street Lights", "Water Supply", "Security", "Park Area"],
        image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500&h=300&fit=crop",
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439017",
        name: "Aikya Tech Hub",
        location: "OMR, Chennai",
        description: "State-of-the-art commercial complex on OMR, Chennai's IT corridor. This completed project provides modern office spaces with cutting-edge facilities for tech companies.",
        category: "commercial",
        type: "office",
        status: "completed",
        amenities: ["Conference Rooms", "Food Court", "Multi-level Parking", "High-speed Internet", "24/7 Security", "Power Backup", "Cafeteria"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
        createdAt: new Date('2023-05-10'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439018",
        name: "Aikya Serenity Heights",
        location: "Medavakkam, Chennai",
        description: "Tranquil apartment complex in Medavakkam offering peaceful living with modern comforts. This completed project features spacious flats with excellent ventilation and amenities.",
        category: "residential",
        type: "apartment",
        status: "completed",
        amenities: ["Swimming Pool", "Gym", "24/7 Security", "Covered Parking", "Power Backup", "Community Hall", "Garden"],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
        createdAt: new Date('2023-04-15'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439019",
        name: "Aikya Palm Residency",
        location: "Guduvancheri, Chennai",
        description: "Well-planned residential plot development in Guduvancheri. This completed project offers DTCP approved plots with all modern infrastructure facilities.",
        category: "residential",
        type: "plots",
        status: "completed",
        amenities: ["DTCP Approved", "Gated Community", "Avenue Trees", "Underground Drainage", "Street Lights", "Water Supply", "24/7 Security"],
        image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500&h=300&fit=crop",
        createdAt: new Date('2023-03-10'),
        updatedAt: new Date('2024-03-02')
      }
    ]
  },
  
  testimonials: {
    items: [
      {
        _id: "507f1f77bcf86cd799439021",
        name: "Rajesh Kumar",
        role: "Business Owner",
        company: "Resident - Aikya Business Square",
        content: "Aikya Builders delivered exceptional quality in our office project in T. Nagar. Their attention to detail and professional approach made the entire process seamless. The team was responsive and delivered on time.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        rating: 5,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        _id: "507f1f77bcf86cd799439022",
        name: "Priya Sundaram",
        role: "Home Owner",
        company: "Resident - Aikya Eden Park",
        content: "We are extremely happy with our new apartment in Aikya Eden Park, Tambaram. The build quality is excellent, all amenities work perfectly, and the location is fantastic. Highly recommend Aikya Builders!",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
        rating: 5,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10')
      },
      {
        _id: "507f1f77bcf86cd799439023",
        name: "Aravind Krishnan",
        role: "IT Professional",
        company: "Resident - Aikya Horizon Towers",
        content: "Aikya Horizon Towers in Velachery exceeded all our expectations. Modern amenities, excellent connectivity, and professional management. The best decision we made for our family!",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        rating: 5,
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date('2024-01-30')
      },
      {
        _id: "507f1f77bcf86cd799439024",
        name: "Meena Venkatesh",
        role: "Entrepreneur",
        company: "Resident - Aikya Lakewood Villas",
        content: "The luxury villa we purchased in Aikya Lakewood Villas, Sholinganallur is a dream come true. Aikya Builders maintained high construction standards and timely delivery. Absolutely delighted!",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        rating: 5,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15')
      }
    ]
  },
  
  specialOffers: {
    items: [
      {
        _id: "507f1f77bcf86cd799439031",
        title: "Early Bird Discount - Aikya Horizon Towers",
        price: "₹48,00,000",
        discount: "15% Off",
        status: "active",
        location: "Velachery, Chennai",
        features: ["Zero Registration Charges", "Free Covered Parking", "2 Years Club Membership", "2 Years Free Maintenance", "Modular Kitchen"],
        description: "Limited time offer for first 30 bookings at Aikya Horizon Towers",
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439032",
        title: "Festive Season Special - Grand Avenue Plots",
        price: "₹35,00,000",
        discount: "20% Off",
        status: "active",
        location: "Porur, Chennai",
        features: ["DTCP Approved", "Free Interior Design Consultation", "Legal Documentation Free", "Home Loan Support", "Vastu Consultation"],
        description: "Celebrate festivals in your dream plot at Aikya Grand Avenue, Porur",
        validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439033",
        title: "Commercial Space Offer - Tech Hub OMR",
        price: "₹65,00,000",
        discount: "10% Off",
        status: "active",
        location: "OMR, Chennai",
        features: ["Ready to Move In", "Premium IT Corridor Location", "High ROI Potential", "Modern Amenities", "Flexible Payment Plans"],
        description: "Prime commercial spaces at Aikya Tech Hub, OMR for businesses and startups",
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439034",
        title: "First Time Buyer Scheme - Green Meadows",
        price: "₹42,00,000",
        discount: "18% Off",
        status: "active",
        location: "Pallavaram, Chennai",
        features: ["Subsidized Interest Rate", "Reduced Down Payment", "Free Registration", "Legal Assistance", "Construction Guarantee"],
        description: "Special scheme for first-time home buyers at Aikya Green Meadows",
        validUntil: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-03-02')
      }
    ]
  },
  
  footerItems: {
    items: [
      {
        _id: "507f1f77bcf86cd799439041",
        type: "phone",
        label: "Call Us",
        value: "+91 44 2345 6789",
        icon: "phone",
        order: 1,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439042",
        type: "email",
        label: "Email Us",
        value: "info@aikyabuilders.com",
        icon: "mail",
        order: 2,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439043",
        type: "address",
        label: "Visit Us",
        value: "Aikya Builders, 45 Anna Salai, Mount Road, Chennai, Tamil Nadu 600002",
        icon: "map-pin",
        order: 3,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439044",
        type: "social",
        label: "Facebook",
        value: "https://facebook.com/aikyabuilders",
        icon: "facebook",
        order: 4,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439045",
        type: "social",
        label: "LinkedIn",
        value: "https://linkedin.com/company/aikyabuilders",
        icon: "linkedin",
        order: 5,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439046",
        type: "social",
        label: "Instagram",
        value: "https://instagram.com/aikyabuilders",
        icon: "instagram",
        order: 6,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      }
    ]
  },

  leadership: {
    items: [
      {
        _id: "507f1f77bcf86cd799439051",
        name: "B. Gopalakrishnan",
        title: "Managing Director",
        initial: "G",
        bio: "With over 30 years of experience in real estate development, B. Gopalakrishnan leads Aikya Builders with a vision of excellence and integrity. His strategic approach has positioned the company as a trusted name in Chennai's real estate market.",
        image: "",
        order: 1,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439052",
        name: "M B FURHAN SIDDIQ",
        title: "Director",
        initial: "F",
        bio: "M B Furhan Siddiq brings innovative thinking and operational excellence to Aikya Builders. With expertise in project management and customer relations, he ensures every project meets the highest standards of quality and timely delivery.",
        image: "",
        order: 2,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      }
    ]
  },

  whyChoose: {
    items: [
      {
        _id: "507f1f77bcf86cd799439061",
        title: "Rapid Delivery",
        desc: "We complete every project on time with meticulous planning and execution.",
        icon: "Clock",
        order: 1,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439062",
        title: "Proven Track Record",
        desc: "Over 25 years of excellence in delivering quality projects across Chennai.",
        icon: "Shield",
        order: 2,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439063",
        title: "Customer-Centric Approach",
        desc: "Your satisfaction is our priority. We listen, understand, and deliver beyond expectations.",
        icon: "MessageCircle",
        order: 3,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439064",
        title: "Quality Assurance",
        desc: "Premium materials and skilled craftsmanship ensure lasting value in every property.",
        icon: "Heart",
        order: 4,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439065",
        title: "Innovative Designs",
        desc: "Modern architecture combined with functional living spaces for contemporary lifestyles.",
        icon: "Palette",
        order: 5,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439066",
        title: "Premium Locations",
        desc: "Strategic locations with excellent connectivity and growth potential.",
        icon: "Star",
        order: 6,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      }
    ]
  },

  locationCards: {
    items: [
      {
        _id: "507f1f77bcf86cd799439071",
        name: "CHENNAI",
        description: "Explore our premium residential and commercial projects in the heart of Chennai",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop",
        projectCount: 7,
        order: 1,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439072",
        name: "TIRUNELVELI",
        description: "Discover quality living spaces in the historic city of Tirunelveli",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop",
        projectCount: 2,
        order: 2,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      },
      {
        _id: "507f1f77bcf86cd799439073",
        name: "CHENGALPATTU",
        description: "Experience modern living in the emerging hub of Chengalpattu",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop",
        projectCount: 1,
        order: 3,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-02')
      }
    ]
  }
};

// Helper functions for CRUD operations
export const memoryStore = {
  // Projects
  getProjects: () => dataStore.projects.items,
  getProjectById: (id) => dataStore.projects.items.find(item => item._id === id),
  createProject: (data) => {
    const newItem = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dataStore.projects.items.push(newItem);
    return newItem;
  },
  updateProject: (id, data) => {
    const index = dataStore.projects.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.projects.items[index] = {
        ...dataStore.projects.items[index],
        ...data,
        _id: id,
        updatedAt: new Date()
      };
      return dataStore.projects.items[index];
    }
    return null;
  },
  deleteProject: (id) => {
    const index = dataStore.projects.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.projects.items.splice(index, 1);
      return true;
    }
    return false;
  },

  // Testimonials
  getTestimonials: () => dataStore.testimonials.items,
  getTestimonialById: (id) => dataStore.testimonials.items.find(item => item._id === id),
  createTestimonial: (data) => {
    const newItem = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dataStore.testimonials.items.push(newItem);
    return newItem;
  },
  updateTestimonial: (id, data) => {
    const index = dataStore.testimonials.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.testimonials.items[index] = {
        ...dataStore.testimonials.items[index],
        ...data,
        _id: id,
        updatedAt: new Date()
      };
      return dataStore.testimonials.items[index];
    }
    return null;
  },
  deleteTestimonial: (id) => {
    const index = dataStore.testimonials.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.testimonials.items.splice(index, 1);
      return true;
    }
    return false;
  },

  // Special Offers
  getSpecialOffers: () => dataStore.specialOffers.items,
  getSpecialOfferById: (id) => dataStore.specialOffers.items.find(item => item._id === id),
  createSpecialOffer: (data) => {
    const newItem = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dataStore.specialOffers.items.push(newItem);
    return newItem;
  },
  updateSpecialOffer: (id, data) => {
    const index = dataStore.specialOffers.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.specialOffers.items[index] = {
        ...dataStore.specialOffers.items[index],
        ...data,
        _id: id,
        updatedAt: new Date()
      };
      return dataStore.specialOffers.items[index];
    }
    return null;
  },
  deleteSpecialOffer: (id) => {
    const index = dataStore.specialOffers.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.specialOffers.items.splice(index, 1);
      return true;
    }
    return false;
  },

  // Footer Items
  getFooterItems: () => dataStore.footerItems.items,
  getFooterItemById: (id) => dataStore.footerItems.items.find(item => item._id === id),
  createFooterItem: (data) => {
    const newItem = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dataStore.footerItems.items.push(newItem);
    return newItem;
  },
  updateFooterItem: (id, data) => {
    const index = dataStore.footerItems.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.footerItems.items[index] = {
        ...dataStore.footerItems.items[index],
        ...data,
        _id: id,
        updatedAt: new Date()
      };
      return dataStore.footerItems.items[index];
    }
    return null;
  },
  deleteFooterItem: (id) => {
    const index = dataStore.footerItems.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.footerItems.items.splice(index, 1);
      return true;
    }
    return false;
  },

  // Leadership
  getLeaders: () => dataStore.leadership.items,
  getLeaderById: (id) => dataStore.leadership.items.find(item => item._id === id),
  createLeader: (data) => {
    const newItem = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dataStore.leadership.items.push(newItem);
    return newItem;
  },
  updateLeader: (id, data) => {
    const index = dataStore.leadership.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.leadership.items[index] = {
        ...dataStore.leadership.items[index],
        ...data,
        _id: id,
        updatedAt: new Date()
      };
      return dataStore.leadership.items[index];
    }
    return null;
  },
  deleteLeader: (id) => {
    const index = dataStore.leadership.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.leadership.items.splice(index, 1);
      return true;
    }
    return false;
  },

  // Why Choose Us
  getWhyChooseReasons: () => dataStore.whyChoose.items,
  getWhyChooseReasonById: (id) => dataStore.whyChoose.items.find(item => item._id === id),
  createWhyChooseReason: (data) => {
    const newItem = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dataStore.whyChoose.items.push(newItem);
    return newItem;
  },
  updateWhyChooseReason: (id, data) => {
    const index = dataStore.whyChoose.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.whyChoose.items[index] = {
        ...dataStore.whyChoose.items[index],
        ...data,
        _id: id,
        updatedAt: new Date()
      };
      return dataStore.whyChoose.items[index];
    }
    return null;
  },
  deleteWhyChooseReason: (id) => {
    const index = dataStore.whyChoose.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.whyChoose.items.splice(index, 1);
      return true;
    }
    return false;
  },

  // Location Cards
  getLocationCards: () => dataStore.locationCards.items,
  getLocationCardById: (id) => dataStore.locationCards.items.find(item => item._id === id),
  createLocationCard: (data) => {
    const newItem = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dataStore.locationCards.items.push(newItem);
    return newItem;
  },
  updateLocationCard: (id, data) => {
    const index = dataStore.locationCards.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.locationCards.items[index] = {
        ...dataStore.locationCards.items[index],
        ...data,
        _id: id,
        updatedAt: new Date()
      };
      return dataStore.locationCards.items[index];
    }
    return null;
  },
  deleteLocationCard: (id) => {
    const index = dataStore.locationCards.items.findIndex(item => item._id === id);
    if (index !== -1) {
      dataStore.locationCards.items.splice(index, 1);
      return true;
    }
    return false;
  }
};

export default memoryStore;