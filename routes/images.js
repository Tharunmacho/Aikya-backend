import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const router = express.Router();

// Initialize S3 client for Garage storage
const s3Client = new S3Client({
  region: process.env.STORAGE_REGION || 'garage',
  endpoint: process.env.STORAGE_ENDPOINT || 'https://request.storage.portal.welocalhost.com',
  credentials: {
    accessKeyId: process.env.STORAGE_KEY_ID || 'GK067c7c4ab99be317db32f2f9',
    secretAccessKey: process.env.STORAGE_SECRET_KEY || '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
  },
  forcePathStyle: true,
});

const BUCKET_NAME = process.env.STORAGE_BUCKET_NAME || 'aikya';

/**
 * GET /api/images/:key
 * Proxy endpoint to serve images from private Garage storage bucket
 * Authenticates with S3, streams image to client
 */
router.get('/:key(*)', async (req, res) => {
  try {
    const imageKey = req.params.key;

    // Get object from S3 bucket
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: imageKey,
    });

    const response = await s3Client.send(command);

    // Set appropriate headers
    res.set({
      'Content-Type': response.ContentType || 'image/jpeg',
      'Content-Length': response.ContentLength,
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      'ETag': response.ETag,
    });

    // Stream the image data to client
    response.Body.pipe(res);
  } catch (error) {
    console.error('Image proxy error:', error.message);
    
    if (error.name === 'NoSuchKey') {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    res.status(500).json({ error: 'Failed to load image' });
  }
});

export default router;
