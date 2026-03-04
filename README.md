# Aikya Builds Future - Backend API

Backend server for Aikya Builds Future website with MongoDB integration.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Edit the `.env` file and replace `<db_password>` with your actual MongoDB password:

```
MONGODB_URI=mongodb+srv://Aikya:YOUR_ACTUAL_PASSWORD@cluster0.un7nvko.mongodb.net/aikya-builds-future?retryWrites=true&w=majority&appName=Cluster0
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### 1. Sign Up (Register User)
- **URL:** `POST /api/auth/signup`
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "token": "jwt_token"
    }
  }
  ```

#### 2. Login
- **URL:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "token": "jwt_token"
    }
  }
  ```

#### 3. Get All Users
- **URL:** `GET /api/auth/users`
- **Response:**
  ```json
  {
    "success": true,
    "count": 5,
    "data": [/* array of users */]
  }
  ```

#### 4. Health Check
- **URL:** `GET /api/health`
- **Response:**
  ```json
  {
    "status": "OK",
    "message": "Server is running"
  }
  ```

## Project Structure

```
backend/
├── config/
│   └── db.js           # MongoDB connection
├── models/
│   └── User.js         # User schema and model
├── routes/
│   └── auth.js         # Authentication routes
├── .env                # Environment variables (don't commit)
├── .env.example        # Example environment file
├── .gitignore          # Git ignore file
├── package.json        # Dependencies
├── README.md           # This file
└── server.js           # Express server entry point
```

## Features

- ✅ User registration with email and password
- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ MongoDB data persistence
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled for frontend integration

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
