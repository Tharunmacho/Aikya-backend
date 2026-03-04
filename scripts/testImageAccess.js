import { S3Client, GetObjectCommand, PutObjectAclCommand } from '@aws-sdk/client-s3';
import axios from 'axios';

const STORAGE_CONFIG = {
  bucketName: 'aikya',
  region: 'garage',
  endpoint: 'https://request.storage.portal.welocalhost.com',
  credentials: {
    accessKeyId: 'GK067c7c4ab99be317db32f2f9',
    secretAccessKey: '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
  },
};

const s3Client = new S3Client({
  region: STORAGE_CONFIG.region,
  endpoint: STORAGE_CONFIG.endpoint,
  credentials: STORAGE_CONFIG.credentials,
  forcePathStyle: true,
});

async function testImageAccess() {
  console.log('🧪 Testing Image Access\n');
  console.log('='.repeat(60));

  const testImageKey = 'project-1772260771872-1-WhatsApp-Image-2026-02-26-at-7.15.12-PM.jpeg';
  const publicUrl = `${STORAGE_CONFIG.endpoint}/${STORAGE_CONFIG.bucketName}/${testImageKey}`;

  // Test 1: Public access (no auth)
  console.log('\n📋 Test 1: Public Access (without authentication)');
  console.log(`URL: ${publicUrl}`);
  try {
    const response = await axios.head(publicUrl, { timeout: 5000 });
    console.log('✅ SUCCESS - Image is publicly accessible');
    console.log(`Status: ${response.status}`);
    console.log(`Content-Type: ${response.headers['content-type']}`);
  } catch (error) {
    if (error.response) {
      console.log(`❌ FAILED - Status: ${error.response.status}`);
      console.log(`Response: ${error.response.statusText}`);
      if (error.response.status === 403) {
        console.log('⚠️  Images are NOT public - authentication required');
      }
    } else {
      console.log(`❌ FAILED - ${error.message}`);
    }
  }

  // Test 2: Check if object exists (with auth)
  console.log('\n📋 Test 2: Check Object via S3 SDK (with authentication)');
  try {
    const command = new GetObjectCommand({
      Bucket: STORAGE_CONFIG.bucketName,
      Key: testImageKey,
    });
    const response = await s3Client.send(command);
    console.log('✅ SUCCESS - Image exists in bucket');
    console.log(`Content-Type: ${response.ContentType}`);
    console.log(`Content-Length: ${response.ContentLength} bytes`);
  } catch (error) {
    console.log(`❌ FAILED - ${error.name}: ${error.message}`);
  }

  // Test 3: Try to make image public
  console.log('\n📋 Test 3: Attempting to set public-read ACL');
  try {
    const command = new PutObjectAclCommand({
      Bucket: STORAGE_CONFIG.bucketName,
      Key: testImageKey,
      ACL: 'public-read',
    });
    await s3Client.send(command);
    console.log('✅ SUCCESS - Set ACL to public-read');
    console.log('Retesting public access...');
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await axios.head(publicUrl, { timeout: 5000 });
    console.log('✅ Image is now publicly accessible!');
    console.log(`Status: ${response.status}`);
  } catch (error) {
    console.log(`❌ FAILED - ${error.name}: ${error.message}`);
    if (error.name === 'NotImplemented') {
      console.log('⚠️  Garage storage may not support ACLs');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n💡 PROBLEM IDENTIFIED:');
  console.log('   Images uploaded successfully BUT not publicly accessible.');
  console.log('\n🔧 SOLUTION OPTIONS:');
  console.log('   1. Enable public bucket access in Garage config');
  console.log('   2. Use signed URLs (temporary authenticated URLs)');
  console.log('   3. Set up a reverse proxy to serve images');
  console.log('   4. Use local images (rollback migration)');
}

testImageAccess();
