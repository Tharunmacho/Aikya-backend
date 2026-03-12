import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://Aikya:Aikya2026@cluster0.un7nvko.mongodb.net/AikyaBuilders?retryWrites=true&w=majority&appName=Cluster0';
const CLOUD_STORAGE_BASE = 'https://request.storage.portal.welocalhost.com/aikya';

async function updateChennaiProjectImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    const Project = mongoose.model('Project', new mongoose.Schema({}, { strict: false }), 'projects');

    // Find all Chennai area projects
    const projects = await Project.find({
      area: { $in: ['tambaram', 'perugalathur', 'hastinapuram', 'gudavancherry', 'chithlapakam'] }
    });

    console.log(`\nFound ${projects.length} Chennai projects`);

    let updated = 0;
    for (const project of projects) {
      // Extract filename from current path
      const currentImage = project.image || '';
      
      if (currentImage.startsWith('/api/images/')) {
        const filename = currentImage.replace('/api/images/', '');
        // Update to cloud storage URL
        const newImageUrl = `${CLOUD_STORAGE_BASE}/${filename}`;
        
        // Use updateOne to directly update the document
        await Project.updateOne(
          { _id: project._id },
          { $set: { image: newImageUrl } }
        );
        
        console.log(`✓ Updated: ${project.name}`);
        console.log(`  Old: ${currentImage}`);
        console.log(`  New: ${newImageUrl}\n`);
        updated++;
      }
    }

    console.log(`\n✅ Successfully updated ${updated} projects`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateChennaiProjectImages();
