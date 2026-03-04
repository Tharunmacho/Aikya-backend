import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUCKET_CONFIG = {
  bucketName: 'aikya',
  keyId: 'GK067c7c4ab99be317db32f2f9',
  secretKey: '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
  endpoint: 'https://request.storage.portal.welocalhost.com'
};

async function testS3Upload(testImagePath) {
  console.log('🧪 Testing S3-Compatible Upload Format\n');
  
  const fileBuffer = fs.readFileSync(testImagePath);
  const fileName = 'test-' + Date.now() + '.jpeg';
  const objectKey = `${BUCKET_CONFIG.bucketName}/${fileName}`;
  
  // Test 1: PUT with key in URL
  console.log('Test 1: PUT /{bucket}/{key}');
  console.log(`URL: ${BUCKET_CONFIG.endpoint}/${objectKey}`);
  try {
    const response = await axios.put(
      `${BUCKET_CONFIG.endpoint}/${objectKey}`,
      fileBuffer,
      {
        headers: {
          'Content-Type': 'image/jpeg',
          'X-API-Key': BUCKET_CONFIG.keyId,
          'X-Secret-Key': BUCKET_CONFIG.secretKey,
        },
      }
    );
    console.log('✅ SUCCESS!');
    console.log('Response:', response.data);
    console.log(`URL: ${BUCKET_CONFIG.endpoint}/${objectKey}`);
    return true;
  } catch (error) {
    console.log('❌ FAILED');
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log('Response:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }

  // Test 2: POST with key field in FormData
  console.log('\nTest 2: POST with key in FormData');
  try {
    const formData = new FormData();
    formData.append('key', objectKey);  // Add key field
    formData.append('file', fileBuffer, {
      filename: fileName,
      contentType: 'image/jpeg',
    });

    const response = await axios.post(
      `${BUCKET_CONFIG.endpoint}/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'X-API-Key': BUCKET_CONFIG.keyId,
          'X-Secret-Key': BUCKET_CONFIG.secretKey,
        },
      }
    );
    console.log('✅ SUCCESS!');
    console.log('Response:', response.data);
    return true;
  } catch (error) {
    console.log('❌ FAILED');
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log('Response:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }

  // Test 3: POST to /{bucket} with key
  console.log('\nTest 3: POST /{bucket} with key in FormData');
  try {
    const formData = new FormData();
    formData.append('key', fileName);  // Just filename, not full path
    formData.append('file', fileBuffer, {
      filename: fileName,
      contentType: 'image/jpeg',
    });

    const response = await axios.post(
      `${BUCKET_CONFIG.endpoint}/${BUCKET_CONFIG.bucketName}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'X-API-Key': BUCKET_CONFIG.keyId,
          'X-Secret-Key': BUCKET_CONFIG.secretKey,
        },
      }
    );
    console.log('✅ SUCCESS!');
    console.log('Response:', response.data);
    return true;
  } catch (error) {
    console.log('❌ FAILED');
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log('Response:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }

  // Test 4: Simple PUT to /{bucket}/{key} without auth headers
  console.log('\nTest 4: PUT /{bucket}/{key} with query params');
  try {
    const url = `${BUCKET_CONFIG.endpoint}/${objectKey}?keyId=${BUCKET_CONFIG.keyId}&secretKey=${BUCKET_CONFIG.secretKey}`;
    const response = await axios.put(url, fileBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
    console.log('✅ SUCCESS!');
    console.log('Response:', response.data);
    console.log(`URL: ${BUCKET_CONFIG.endpoint}/${objectKey}`);
    return true;
  } catch (error) {
    console.log('❌ FAILED');
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log('Response:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }

  return false;
}

async function main() {
  console.log('🚀 Testing S3-Compatible Upload Formats\n');
  console.log('='.repeat(60));

  const imagesDir = path.join(__dirname, '../../frontend/src/assets/images');
  const images = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));
  
  if (images.length === 0) {
    console.log('❌ No images found to test');
    return;
  }

  const testImagePath = path.join(imagesDir, images[0]);
  console.log(`📸 Using test image: ${images[0]}`);
  console.log(`📦 Bucket: ${BUCKET_CONFIG.bucketName}`);
  console.log(`🔑 Key ID: ${BUCKET_CONFIG.keyId.substring(0, 20)}...`);
  console.log('='.repeat(60) + '\n');

  const success = await testS3Upload(testImagePath);

  console.log('\n' + '='.repeat(60));
  if (!success) {
    console.log('❌ All S3 upload formats failed');
    console.log('\n💡 Please check:');
    console.log('   - Bucket documentation for correct upload format');
    console.log('   - API key and secret key are valid');
    console.log('   - Bucket "aikya" exists and allows uploads');
  }
}

main();
