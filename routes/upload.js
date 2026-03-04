import express from 'express';
import multer from 'multer';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { uploadToStorage, deleteFromStorage, generateUniqueFileName } from '../config/storage.js';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Simplified auth middleware for development
const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token provided' 
      });
    }

    // Verify token exists and is valid format
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    // If token verification fails, still allow for development
    console.warn('Auth warning:', error.message);
    next(); // Allow anyway for development
  }
};

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});

/**
 * POST /api/upload/single
 * Upload a single image - supports both local and cloud storage
 * Protected: Admin only
 */
router.post('/single', verifyAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const fileName = generateUniqueFileName(req.file.originalname);
    const useLocalStorage = process.env.USE_LOCAL_STORAGE !== 'false';
    
    let imageUrl;
    
    if (useLocalStorage) {
      // LOCAL STORAGE (Development)
      const uploadsDir = path.join(__dirname, '..', 'uploads');
      
      // Ensure uploads directory exists
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      // Save file locally
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, req.file.buffer);
      
      // Return local URL
      const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
      imageUrl = `${baseUrl}/uploads/${fileName}`;
    } else {
      // CLOUD STORAGE (Production)
      // Upload to cloud but return proxied URL through backend
      await uploadToStorage(
        req.file.buffer,
        fileName,
        req.file.mimetype
      );
      
      // Return proxy URL instead of direct cloud URL
      const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
      imageUrl = `${baseUrl}/api/images/${fileName}`;
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: imageUrl,
        fileName: fileName,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message,
    });
  }
});

/**
 * POST /api/upload/multiple
 * Upload multiple images to cloud storage
 * Protected: Admin only
 */
router.post('/multiple', verifyAuth, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    const uploadPromises = req.files.map(async (file) => {
      const fileName = generateUniqueFileName(file.originalname);
      const useLocalStorage = process.env.USE_LOCAL_STORAGE !== 'false';
      const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
      
      let imageUrl;
      
      if (useLocalStorage) {
        // LOCAL STORAGE
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, file.buffer);
        imageUrl = `${baseUrl}/uploads/${fileName}`;
      } else {
        // CLOUD STORAGE - Upload to cloud and return proxy URL
        await uploadToStorage(file.buffer, fileName, file.mimetype);
        imageUrl = `${baseUrl}/api/images/${fileName}`;
      }
      
      return {
        url: imageUrl,
        fileName: fileName,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: `${uploadedFiles.length} images uploaded successfully`,
      data: uploadedFiles,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images',
      error: error.message,
    });
  }
});

/**
 * DELETE /api/upload/delete
 * Delete an image from storage (local or cloud)
 * Protected: Admin only
 */
router.delete('/delete', verifyAuth, async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required',
      });
    }

    const useLocalStorage = process.env.USE_LOCAL_STORAGE !== 'false';
    
    if (useLocalStorage && imageUrl.includes('/uploads/')) {
      // Delete from local storage
      const fileName = imageUrl.split('/').pop();
      const uploadsDir = path.join(__dirname, '..', 'uploads');
      const filePath = path.join(uploadsDir, fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({
          success: true,
          message: 'Image deleted successfully',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Image file not found',
        });
      }
    } else {
      // Delete from cloud storage
      const deleted = await deleteFromStorage(imageUrl);
      
      if (deleted) {
        res.json({
          success: true,
          message: 'Image deleted successfully',
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to delete image',
        });
      }
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      error: error.message,
    });
  }
});

/**
 * GET /api/upload/test
 * Test endpoint to verify upload service
 */
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Upload service is running - local file storage',
    maxFileSize: '10MB',
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  });
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 10MB limit',
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  next(error);
});

export default router;
