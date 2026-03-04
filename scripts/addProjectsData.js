import mongoose from 'mongoose';

// Import Content models
import { Projects } from '../models/Content.js';

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/future-builders-studio');

async function seedProjectsData() {
  try {
    console.log('Adding projects data...');
    
    // Check if projects collection exists
    let projectsDoc = await Projects.findOne();
    
    if (!projectsDoc) {
      console.log('Creating new projects document...');
      projectsDoc = new Projects({ items: [] });
    }

    // Sample projects with comprehensive data
    const sampleProjects = [
      {
        _id: new mongoose.Types.ObjectId(),
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
        _id: new mongoose.Types.ObjectId(),
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
        _id: new mongoose.Types.ObjectId(),
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
        _id: new mongoose.Types.ObjectId(),
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

    // Clear existing items and add new ones
    projectsDoc.items = sampleProjects;
    projectsDoc.updatedAt = new Date();

    await projectsDoc.save();

    console.log('✅ Projects data added successfully!');
    console.log(`📊 Added ${sampleProjects.length} projects:`);
    sampleProjects.forEach(project => {
      console.log(`   - ${project.name} (${project.status})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding projects data:', error);
    process.exit(1);
  }
}

// Run the seeding
seedProjectsData();