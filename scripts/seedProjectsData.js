import mongoose from 'mongoose';

// Import Content models
import { Projects } from '../models/Content.js';

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/future-builders-studio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seedProjectsData() {
  try {
    console.log('Seeding projects data...');

    // Clear existing projects
    await Projects.deleteMany({});
    
    // Create sample projects with comprehensive data
    const sampleProjects = [
      {
        name: "Luxury Residential Complex",
        location: "Bandra West, Mumbai",
        description: "Premium residential project with world-class amenities",
        category: "residential",
        type: "apartment",
        status: "ongoing",
        amenities: ["Swimming Pool", "Gym", "Club House", "Garden", "Security"],
        image: "https://example.com/project1.jpg",
        createdAt: new Date()
      },
      {
        name: "Commercial Business Park",
        location: "BKC, Mumbai",
        description: "Modern office spaces with state-of-the-art facilities",
        category: "commercial",
        type: "office",
        status: "completed",
        amenities: ["Conference Rooms", "Cafeteria", "Parking", "Security", "High-speed Internet"],
        image: "https://example.com/project2.jpg",
        createdAt: new Date()
      },
      {
        name: "Smart City Township",
        location: "Pune",
        description: "Integrated smart city project with sustainable living solutions",
        category: "township",
        type: "mixed-use",
        status: "upcoming",
        amenities: ["Smart Infrastructure", "Solar Power", "Waste Management", "Public Transport", "Green Spaces"],
        image: "https://example.com/project3.jpg",
        createdAt: new Date()
      },
      {
        name: "Heritage Villa Project",
        location: "Juhu, Mumbai",
        description: "Exclusive villa development with contemporary architecture",
        category: "residential",
        type: "villa",
        status: "ongoing",
        amenities: ["Private Garden", "Premium Finishes", "Home Automation", "Security", "Club House"],
        image: "https://example.com/project4.jpg",
        createdAt: new Date()
      }
    ];

    // Create projects document with items array
    const projectsDoc = new Projects({
      items: sampleProjects.map(project => ({
        ...project,
        _id: new mongoose.Types.ObjectId()
      })),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await projectsDoc.save();

    console.log('✅ Projects data seeded successfully!');
    console.log(`📊 Added ${sampleProjects.length} projects:`);
    sampleProjects.forEach(project => {
      console.log(`   - ${project.name} (${project.status})`);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding projects data:', error);
    mongoose.connection.close();
  }
}

// Run the seeding
seedProjectsData();