import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

// Cloud Storage Configuration
const STORAGE_CONFIG = {
  bucketName: 'aikya',
  region: 'garage',
  endpoint: 'https://request.storage.portal.welocalhost.com',
  credentials: {
    accessKeyId: 'GK067c7c4ab99be317db32f2f9',
    secretAccessKey: '7927bbfca0480d7fc2b51ad47eaf64a812d698a55e1b27e836ad64cf910ce10c',
  },
};

// Initialize S3 client for Garage storage
const s3Client = new S3Client({
  region: STORAGE_CONFIG.region,
  endpoint: STORAGE_CONFIG.endpoint,
  credentials: STORAGE_CONFIG.credentials,
  forcePathStyle: true, // Required for S3-compatible storage like Garage
});

/**
 * Upload file to cloud storage bucket
 * @param {Buffer|Stream} fileBuffer - File buffer or stream
 * @param {string} fileName - Name of the file
 * @param {string} mimeType - MIME type of the file
 * @returns {Promise<string>} - URL of uploaded file
 */
export const uploadToStorage = async (fileBuffer, fileName, mimeType) => {
  try {
    const command = new PutObjectCommand({
      Bucket: STORAGE_CONFIG.bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
      ACL: 'public-read', // Make uploaded files publicly accessible
    });

    const response = await s3Client.send(command);

    if (response.$metadata.httpStatusCode === 200) {
      // Return direct cloud URL for production
      const fileUrl = `${STORAGE_CONFIG.endpoint}/${STORAGE_CONFIG.bucketName}/${fileName}`;
      return fileUrl;
    }

    throw new Error('Upload failed: Bad response from storage');
  } catch (error) {
    console.error('Storage upload error:', error.message);
    throw new Error(`Failed to upload to storage: ${error.message}`);
  }
};

/**
 * Upload file from path to cloud storage
 * @param {string} filePath - Path to the file
 * @param {string} fileName - Name for the uploaded file
 * @returns {Promise<string>} - URL of uploaded file
 */
export const uploadFileFromPath = async (filePath, fileName) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = getMimeType(fileName);
    return await uploadToStorage(fileBuffer, fileName, mimeType);
  } catch (error) {
    console.error('File upload error:', error.message);
    throw error;
  }
};

/**
 * Delete file from cloud storage
 * @param {string} fileUrl - URL of the file to delete (proxied or direct)
 * @returns {Promise<boolean>}
 */
export const deleteFromStorage = async (fileUrl) => {
  try {
    // Extract the key from the URL (handle both proxied and direct URLs)
    const fileName = fileUrl.split('/').pop();
    
    const command = new DeleteObjectCommand({
      Bucket: STORAGE_CONFIG.bucketName,
      Key: fileName,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error('Storage delete error:', error.message);
    return false;
  }
};

/**
 * Get MIME type from file extension
 * @param {string} fileName
 * @returns {string}
 */
const getMimeType = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  const mimeTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

/**
 * Generate unique filename
 * @param {string} originalName
 * @returns {string}
 */
export const generateUniqueFileName = (originalName) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = originalName.split('.').pop();
  const name = originalName.split('.').slice(0, -1).join('.');
  const sanitized = name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  return `${sanitized}-${timestamp}-${random}.${ext}`;
};

export default {
  uploadToStorage,
  uploadFileFromPath,
  deleteFromStorage,
  generateUniqueFileName,
  STORAGE_CONFIG,
};
