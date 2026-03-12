import app from '../server.js';
import connectDB from '../config/db.js';

// Ensure MongoDB connection before handling requests
export default async function handler(req, res) {
  try {
    // Connect to MongoDB (uses cached connection if available)
    await connectDB();
    
    // Pass request to Express app
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
