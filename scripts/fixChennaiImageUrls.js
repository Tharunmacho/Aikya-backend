import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://Aikya:Aikya2026@cluster0.un7nvko.mongodb.net/AikyaBuilders?retryWrites=true&w=majority&appName=Cluster0';

async function fixChennaiImageUrls() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    const Project = mongoose.model('Project', new mongoose.Schema({}, { strict: false }), 'projects');

    // Find all Chennai projects with cloud storage URLs
    const projects = await Project.find({
      area: { $in: ['tambaram', 'perugalathur', 'hastinapuram', 'gudavancherry', 'chithlapakam'] },
      image: { $regex: /^https:\/\/request\.storage\.portal\.welocalhost\.com\/aikya\/chennai-/ }
    });

    console.log(`Found ${projects.length} Chennai projects with cloud URLs\n`);

    let updated = 0;
    for (const project of projects) {
      // Extract filename from cloud URL
      const cloudUrl = project.image;
      const filename = cloudUrl.split('/').pop();
      
      // Convert to proxy URL
      const proxyUrl = `/api/images/${filename}`;
      
      await Project.updateOne(
        { _id: project._id },
        { $set: { image: proxyUrl } }
      );

      console.log(`✓ ${project.name}`);
      console.log(`  Old: ${cloudUrl}`);
      console.log(`  New: ${proxyUrl}\n`);
      updated++;
    }

    console.log(`✅ Successfully updated ${updated} projects to use proxy URLs\n`);
    console.log('Images will now be served through: https://api.aikiyabuilders.welocalhost.com/api/images/[filename]');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
  }
  
  process.exit(0);
}

fixChennaiImageUrls();
