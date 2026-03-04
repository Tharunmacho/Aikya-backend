import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure S3 client for Garage storage
const s3Client = new S3Client({
  region: 'garage', // From error messages
  endpoint: 'https://request.storage.portal.welocalhost.com',
  credentials: {
    accessKeyId: 'GK067c7c4ab99be317db32f2f9',
    secretAccessKey: '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
  },
  forcePathStyle: true, // Required for S3-compatible storage
});

async function testS3Upload() {
  console.log('🚀 Testing S3 SDK Upload to Garage Storage\n');
  console.log('='.repeat(60));

  // Get test image
  const imagesDir = path.join(__dirname, '../../frontend/src/assets/images');
  const images = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));
  
  if (images.length === 0) {
    console.log('❌ No images found to test');
    return;
  }

  const testImagePath = path.join(imagesDir, images[0]);
  const fileBuffer = fs.readFileSync(testImagePath);
  const fileName = 'test-' + Date.now() + '.jpeg';

  console.log(`📸 Image: ${images[0]}`);
  console.log(`📦 Bucket: aikya`);
  console.log(`🔑 Key: ${fileName}`);
  console.log(`📊 Size: ${(fileBuffer.length / 1024).toFixed(2)} KB`);
  console.log('='.repeat(60) + '\n');

  console.log('⬆️  Uploading...');

  try {
    const command = new PutObjectCommand({
      Bucket: 'aikya',
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'image/jpeg',
    });

    const response = await s3Client.send(command);

    console.log('\n✅ SUCCESS! Image uploaded to Garage storage!');
    console.log('\n📋 Upload Details:');
    console.log('   ETag:', response.ETag);
    console.log('   Status:', response.$metadata.httpStatusCode);
    console.log('\n🌐 Image URL:');
    console.log(`   https://request.storage.portal.welocalhost.com/aikya/${fileName}`);
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 S3 SDK works! This is the correct upload method.');
    console.log('='.repeat(60));
    
    return true;
  } catch (error) {
    console.log('\n❌ FAILED');
    console.log('Error Code:', error.name);
    console.log('Error Message:', error.message);
    
    if (error.$metadata) {
      console.log('HTTP Status:', error.$metadata.httpStatusCode);
    }
    
    console.log('\n💡 Troubleshooting:');
    console.log('   - Verify bucket "aikya" exists');
    console.log('   - Check if credentials have upload permissions');
    console.log('   - Confirm endpoint URL is correct');
    
    return false;
  }
}

testS3Upload();
