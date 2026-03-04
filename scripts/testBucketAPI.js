import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test different bucket configurations
const CONFIGS = [
  {
    name: 'Config 1: Original',
    endpoint: 'https://request.storage.portal.welocalhost.com/upload',
    headers: {
      'X-API-Key': 'GK067c7c4ab99be317db32f2f9',
      'X-Secret-Key': '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
    }
  },
  {
    name: 'Config 2: Without request.storage.portal',
    endpoint: 'https://welocalhost.com/upload',
    headers: {
      'X-API-Key': 'GK067c7c4ab99be317db32f2f9',
      'X-Secret-Key': '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
    }
  },
  {
    name: 'Config 3: storage.welocalhost.com',
    endpoint: 'https://storage.welocalhost.com/upload',
    headers: {
      'X-API-Key': 'GK067c7c4ab99be317db32f2f9',
      'X-Secret-Key': '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
    }
  },
  {
    name: 'Config 4: With Authorization Bearer',
    endpoint: 'https://request.storage.portal.welocalhost.com/upload',
    headers: {
      'Authorization': `Bearer GK067c7c4ab99be317db32f2f9:7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c`,
    }
  },
  {
    name: 'Config 5: With api/upload path',
    endpoint: 'https://request.storage.portal.welocalhost.com/api/upload',
    headers: {
      'X-API-Key': 'GK067c7c4ab99be317db32f2f9',
      'X-Secret-Key': '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
    }
  }
];

async function testUpload(config, testImagePath) {
  console.log(`\n🧪 Testing: ${config.name}`);
  console.log(`📍 Endpoint: ${config.endpoint}`);
  
  try {
    const fileBuffer = fs.readFileSync(testImagePath);
    const formData = new FormData();
    
    formData.append('file', fileBuffer, {
      filename: 'test-image.jpeg',
      contentType: 'image/jpeg',
    });
    formData.append('bucket', 'aikya');

    const response = await axios.post(
      config.endpoint,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          ...config.headers,
        },
        timeout: 10000,
      }
    );

    console.log(`✅ SUCCESS!`);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log(`❌ FAILED`);
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Response:`, JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('No response received');
      console.log('Error:', error.message);
    } else {
      console.log('Error:', error.message);
    }
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Bucket API Tests\n');
  console.log('Testing different endpoint configurations...\n');
  console.log('='.repeat(60));

  // Get first image to test
  const imagesDir = path.join(__dirname, '../../frontend/src/assets/images');
  const images = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));
  
  if (images.length === 0) {
    console.log('❌ No images found to test');
    return;
  }

  const testImagePath = path.join(imagesDir, images[0]);
  console.log(`📸 Using test image: ${images[0]}\n`);

  let successCount = 0;
  for (const config of CONFIGS) {
    const success = await testUpload(config, testImagePath);
    if (success) {
      successCount++;
      console.log('\n' + '='.repeat(60));
      console.log('🎉 FOUND WORKING CONFIGURATION!');
      console.log('='.repeat(60));
      console.log(`Use this configuration in storage.js:`);
      console.log(JSON.stringify(config, null, 2));
      break; // Stop after first success
    }
    
    // Wait a bit between attempts
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Tested: ${CONFIGS.length} configurations`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${CONFIGS.length - successCount}`);
  
  if (successCount === 0) {
    console.log('\n⚠️  All configurations failed.');
    console.log('📝 Please verify:');
    console.log('   1. Bucket credentials are correct');
    console.log('   2. Bucket name "aikya" exists');
    console.log('   3. Network connectivity to welocalhost.com');
    console.log('   4. Bucket allows file uploads');
    console.log('   5. Check bucket documentation for correct API format');
  }
}

main();
