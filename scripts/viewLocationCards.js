import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://Aikya:Aikya2026@cluster0.un7nvko.mongodb.net/AikyaBuilders?retryWrites=true&w=majority&appName=Cluster0';

async function viewLocationCards() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    const LocationCard = mongoose.model('LocationCard', new mongoose.Schema({}, { strict: false }), 'locationcards');

    const cards = await LocationCard.find().sort({ order: 1 });

    console.log('📍 Location Cards in Database:\n');
    cards.forEach((c, index) => {
      console.log(`${index + 1}. ${c.name}`);
      console.log(`   Description: ${c.description}`);
      console.log(`   Projects: ${c.projectCount || 0}`);
      console.log(`   Order: ${c.order || 0}`);
      console.log(`   Image: ${c.image}`);
      console.log(`   ID: ${c._id}\n`);
    });

    console.log(`Total: ${cards.length} location cards`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
  }
  
  process.exit(0);
}

viewLocationCards();
