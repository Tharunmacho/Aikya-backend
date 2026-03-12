import { S3Client, PutObjectAclCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  endpoint: 'https://request.storage.portal.welocalhost.com',
  region: 'garage',
  credentials: {
    accessKeyId: 'GK067c7c4ab99be317db32f2f9',
    secretAccessKey: '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
  },
  forcePathStyle: true,
});

async function makeImagesPublic() {
  try {
    console.log('🔓 Making all Chennai images publicly accessible...\n');
    
    // List all objects in bucket
    const listCommand = new ListObjectsV2Command({
      Bucket: 'aikya',
      Prefix: 'chennai-',
    });

    const response = await s3Client.send(listCommand);
    
    if (!response.Contents || response.Contents.length === 0) {
      console.log('❌ No Chennai images found in bucket!');
      return;
    }

    console.log(`Found ${response.Contents.length} Chennai images\n`);

    let successCount = 0;
    for (const object of response.Contents) {
      try {
        const aclCommand = new PutObjectAclCommand({
          Bucket: 'aikya',
          Key: object.Key,
          ACL: 'public-read',
        });

        await s3Client.send(aclCommand);
        console.log(`✓ ${object.Key}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Failed to update ${object.Key}: ${error.message}`);
      }
    }

    console.log(`\n✅ Successfully made ${successCount} images publicly accessible!`);
    console.log('\nImages are now accessible at:');
    console.log('https://request.storage.portal.welocalhost.com/aikya/[filename]');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

makeImagesPublic();
