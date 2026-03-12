import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// S3 Client configuration
const s3Client = new S3Client({
  endpoint: 'https://request.storage.portal.welocalhost.com',
  region: 'garage',
  credentials: {
    accessKeyId: 'GK067c7c4ab99be317db32f2f9',
    secretAccessKey: '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
  },
  forcePathStyle: true,
});

const BUCKET_NAME = 'aikya';
const MONGODB_URI = 'mongodb+srv://Aikya:Aikya2026@cluster0.un7nvko.mongodb.net/AikyaBuilders?retryWrites=true&w=majority&appName=Cluster0';

async function uploadChennaiThemeImage() {
  console.log('🏛️  Uploading Chennai Theme Temple Image to Cloud Storage\n');
  
  try {
    // Path to the Chennai theme image
    const imagePath = path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'images', 'chennai theme.jpeg');
    
    if (!fs.existsSync(imagePath)) {
      console.error('❌ Chennai theme image not found at:', imagePath);
      process.exit(1);
    }

    console.log('✓ Found image file\n');

    // Generate cloud storage key
    const timestamp = Date.now();
    const key = `location-chennai-temple-${timestamp}.jpeg`;
    
    // Upload to S3
    const fileContent = fs.readFileSync(imagePath);
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    });

    await s3Client.send(command);
    console.log('✅ Uploaded to cloud storage');
    console.log(`   Key: ${key}\n`);

    // Update Chennai location card in database
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    const LocationCard = mongoose.model('LocationCard', new mongoose.Schema({}, { strict: false }), 'locationcards');

    // Update with proxy URL format
    const imageUrl = `/api/images/${key}`;
    
    const updateResult = await LocationCard.updateOne(
      { name: 'CHENNAI' },
      {
        $set: {
          image: imageUrl
        }
      }
    );

    if (updateResult.modifiedCount > 0) {
      console.log('✅ Updated Chennai location card with new temple image');
      console.log(`   Image URL: ${imageUrl}\n`);
    } else {
      console.log('⚠️  Chennai location card not found or already up to date\n');
    }

    // Verify the update
    const chennaiCard = await LocationCard.findOne({ name: 'CHENNAI' });
    if (chennaiCard) {
      console.log('📍 Chennai Location Card:');
      console.log(`   Name: ${chennaiCard.name}`);
      console.log(`   Description: ${chennaiCard.description}`);
      console.log(`   Projects: ${chennaiCard.projectCount}`);
      console.log(`   Image: ${chennaiCard.image}`);
    }

    await mongoose.connection.close();
    
    console.log('\n✅ Chennai temple image successfully uploaded and updated!');
    console.log('🌐 The image will be served through the backend proxy');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

uploadChennaiThemeImage();
