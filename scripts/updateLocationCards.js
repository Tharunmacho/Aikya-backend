import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://Aikya:Aikya2026@cluster0.un7nvko.mongodb.net/AikyaBuilders?retryWrites=true&w=majority&appName=Cluster0';

async function updateLocationCards() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    const LocationCard = mongoose.model('LocationCard', new mongoose.Schema({}, { strict: false }), 'locationcards');

    // Delete Tirunelveli and Chengalpattu cards
    const deleteResult = await LocationCard.deleteMany({
      name: { $in: ['TIRUNELVELI', 'CHENGALPATTU'] }
    });

    console.log(`✅ Deleted ${deleteResult.deletedCount} location cards (Tirunelveli & Chengalpattu)\n`);

    // Update Chennai card with proper formatting
    const chennaiUpdate = await LocationCard.updateOne(
      { name: 'CHENNAI' },
      {
        $set: {
          order: 1,
          projectCount: 9, // Updated count for Chennai projects
          description: 'Explore our premium residential and commercial projects in the heart of Chennai'
        }
      }
    );

    if (chennaiUpdate.modifiedCount > 0) {
      console.log('✅ Updated Chennai location card\n');
    }

    // Show remaining location cards
    const remainingCards = await LocationCard.find().sort({ order: 1 });
    console.log('📍 Remaining Location Cards:\n');
    remainingCards.forEach((c, index) => {
      console.log(`${index + 1}. ${c.name}`);
      console.log(`   Description: ${c.description}`);
      console.log(`   Projects: ${c.projectCount || 0}`);
      console.log(`   Image: ${c.image}\n`);
    });

    console.log(`\n✅ Total: ${remainingCards.length} location card(s) remaining`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
  }
  
  process.exit(0);
}

updateLocationCards();
