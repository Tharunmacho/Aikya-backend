import express from 'express';
import User from '../models/User.js';
import Auth from '../models/Auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const resolveAdminAccess = async (user) => {
  if (!user?.email) {
    return false;
  }

  const authRecord = await Auth.findOne({ email: user.email }).select('isAdmin');
  return Boolean(authRecord?.isAdmin || user.isAdmin);
};

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log('📝 Signup request received:', { fullName, email });

    // Validation
    if (!fullName || !email || !password) {
      console.log('❌ Validation failed: Missing fields');
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields' 
      });
    }

    // Check if user already exists in auth collection
    const authExists = await Auth.findOne({ email });
    console.log('🔍 Checking if user exists:', authExists ? 'Yes' : 'No');

    if (authExists) {
      console.log('❌ User already exists');
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create user in users collection (all data)
    console.log('➕ Creating user in users collection...');
    const user = await User.create({
      fullName,
      email,
      password,
    });
    console.log('✅ User created:', user._id);

    // Create auth record in auth collection (only email and password)
    console.log('➕ Creating auth record...');
    await Auth.create({
      email,
      password,
      isAdmin: false,
    });
    console.log('✅ Auth record created');

    if (user) {
      const isAdmin = await resolveAdminAccess(user);
      console.log('✅ Signup successful, sending response');
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      console.log('❌ User creation failed');
      res.status(400).json({ 
        success: false,
        message: 'Invalid user data' 
      });
    }
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration',
      error: error.message 
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and password' 
      });
    }

    // Check for user in auth collection (include password for comparison)
    const auth = await Auth.findOne({ email }).select('+password');

    if (!auth) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check if password matches
    const isPasswordMatch = await auth.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Get full user data from users collection
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    const isAdmin = await resolveAdminAccess(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: error.message 
    });
  }
});

// @route   GET /api/auth/users
// @desc    Get all users (for admin/testing)
// @access  Public (should be protected in production)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching users',
      error: error.message 
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user with admin access resolved from auth collection
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isAdmin = await resolveAdminAccess(user);

    res.json({
      success: true,
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
});

export default router;
