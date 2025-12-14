# Talent Quotient Backend

<div align="center">

**Node.js backend API for collaborative coding interviews with real-time communication**

[![Backend API](https://img.shields.io/badge/🚀_Backend_API-Running-blue?style=for-the-badge)](https://your-backend-url.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)

</div>

## 🎯 Overview

Talent Quotient Backend is a robust Node.js and Express.js API that powers the Talent Quotient coding interview platform. It provides RESTful endpoints for session management, user authentication, real-time communication via WebSockets, and seamless integration with MongoDB for data persistence.

This backend is designed to handle real-time collaborative coding sessions, video call signaling, and live code execution coordination between interviewers and candidates.

## ✨ Features

### **Core API Features**
- **RESTful API**: Comprehensive endpoints for session management and user operations
- **Real-time WebSocket Support**: Socket.io integration for live code collaboration and chat
- **JWT Authentication**: Secure user authentication with JSON Web Tokens
- **MongoDB Integration**: Scalable NoSQL database with Mongoose ODM
- **Session Management**: Full CRUD operations for interview sessions
- **File Streaming**: Efficient handling of large responses and file operations

### **Real-time Capabilities**
- **Live Code Synchronization**: Real-time code updates across multiple users
- **WebSocket Communication**: Bi-directional communication for chat and notifications
- **Session State Management**: Track active sessions and participant states
- **Event Broadcasting**: Real-time event propagation to connected clients

### **Security & Performance**
- **Protected Routes**: Middleware for authentication and authorization
- **CORS Configuration**: Secure cross-origin resource sharing
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Comprehensive error responses and logging
- **Environment Configuration**: Secure management of sensitive data

## 🏗️ Project Structure

```
├── .gitignore                    # Git ignore configuration
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Lock file for dependencies
└── src/
    ├── controllers/              # Request handlers
    │   ├── chatController.js     # Chat-related operations
    │   └── sessionController.js  # Session management operations
    ├── lib/                      # Core utilities and configurations
    │   ├── db.js                 # MongoDB connection setup
    │   ├── env.js                # Environment configuration loader
    │   ├── inngest.js            # Background job processing (Inngest)
    │   └── stream.js             # Stream processing utilities
    ├── middleware/               # Express middleware
    │   └── protectRoute.js       # Route protection and authentication
    ├── models/                   # MongoDB schema definitions
    │   ├── Session.js            # Session model and schema
    │   └── User.js               # User model and schema
    ├── routes/                   # API route definitions
    │   ├── chatRoutes.js         # Chat-related API routes
    │   └── sessionRoute.js       # Session-related API routes
    └── server.js                 # Application entry point
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### **1. Clone the Repository**
```bash
git clone https://github.com/MohammadAli-14/Talent-Qutotient-Backend.git
cd Talent-Qutotient-Backend
```

### **2. Install Dependencies**
```bash
npm install
# or
yarn install
```

### **3. Configure Environment Variables**
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
```

### **4. Start the Development Server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## ⚙️ Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/talent-quotient
MONGODB_DB_NAME=talent-quotient

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration (for frontend integration)
CORS_ORIGIN=http://localhost:5173

# WebSocket Configuration
WS_PATH=/socket.io

# Optional: Background Job Processing (Inngest)
# INNGEST_EVENT_KEY=your_inngest_event_key
# INNGEST_SIGNING_KEY=your_inngest_signing_key
# INNGEST_BASE_URL=your_inngest_base_url
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev        # Start development server with nodemon
npm start          # Start production server
npm run lint       # Lint code with ESLint (if configured)

# Database
npm run db:seed    # Seed database with sample data (if configured)
npm run db:reset   # Reset database (if configured)

# Testing
npm test           # Run test suite
npm run test:watch # Run tests in watch mode
npm run test:cov   # Generate test coverage report
```

## 📦 Dependencies

### **Core Dependencies**
- **express**: Fast, unopinionated web framework for Node.js
- **mongoose**: MongoDB object modeling for Node.js
- **jsonwebtoken**: JSON Web Token implementation
- **socket.io**: Real-time bidirectional event-based communication
- **cors**: Express middleware for CORS configuration
- **dotenv**: Loads environment variables from .env file
- **bcryptjs**: Optimized bcrypt for hashing passwords
- **helmet**: Security middleware for Express

### **Development Dependencies**
- **nodemon**: Automatically restart server during development
- **eslint**: Code linting utility
- **mocha/chai**: Testing framework and assertion library
- **supertest**: HTTP assertion testing

## 🔌 API Endpoints

### **Base URL**
```
http://localhost:3000/api
```

### **Authentication Endpoints**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and return JWT
- `GET /api/auth/me` - Get current user profile (protected)
- `POST /api/auth/logout` - Logout user (invalidate token)

### **Session Management**
- `POST /api/sessions/create` - Create a new interview session
- `GET /api/sessions` - List all sessions (with filters)
- `GET /api/sessions/:id` - Get specific session details
- `PUT /api/sessions/:id` - Update session information
- `DELETE /api/sessions/:id` - Delete a session
- `GET /api/sessions/user/:userId` - Get sessions for a specific user
- `POST /api/sessions/:id/join` - Join an existing session
- `POST /api/sessions/:id/leave` - Leave a session

### **Real-time Chat**
- `POST /api/chat/new` - Create a new chat session
- `GET /api/chat/:sessionId` - Get chat history for a session
- `POST /api/chat/message` - Send a chat message
- WebSocket events for real-time messaging

### **WebSocket Events**
- **Connection**: `connection` - Client connects to WebSocket
- **Session Events**:
  - `join-session` - Join a coding session
  - `leave-session` - Leave a session
  - `session-update` - Session state changes
- **Code Collaboration**:
  - `code-update` - Real-time code changes
  - `cursor-position` - Live cursor positions
  - `code-execution` - Code execution requests
- **Chat Events**:
  - `chat-message` - Send/receive chat messages
  - `typing-indicator` - Show typing status

## 🔐 Authentication System

### **JWT Authentication Flow**
1. User registers or logs in via `/api/auth/register` or `/api/auth/login`
2. Server validates credentials and returns a JWT token
3. Client includes token in `Authorization` header for protected routes
4. `protectRoute` middleware validates token on each request

### **Protected Route Example**
```javascript
// Middleware usage in routes
router.get('/profile', protectRoute, (req, res) => {
  // req.user contains authenticated user data
  res.json({ user: req.user });
});
```

### **Client-Side Token Usage**
```javascript
// Include token in requests
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};
axios.get('/api/profile', config);
```

## 🗄️ Database Models

### **User Model (`models/User.js`)**
```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['interviewer', 'candidate'], default: 'candidate' },
  avatar: { type: String }, // URL to avatar image
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### **Session Model (`models/Session.js`)**
```javascript
{
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  problemId: { type: String }, // Reference to problem in frontend
  language: { type: String, default: 'javascript' },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'cancelled'], 
    default: 'active' 
  },
  chatHistory: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
  startTime: { type: Date },
  endTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## 🔄 Real-time Communication

### **WebSocket Server Setup**
```javascript
// server.js - WebSocket configuration
const socketIO = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  },
  path: process.env.WS_PATH || '/socket.io'
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Handle session joining
  socket.on('join-session', (sessionId) => {
    socket.join(sessionId);
    socket.to(sessionId).emit('user-joined', { userId: socket.id });
  });
  
  // Handle code updates
  socket.on('code-update', ({ sessionId, code }) => {
    socket.to(sessionId).emit('code-updated', { code, userId: socket.id });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
```

## 🚀 Deployment

### **Option 1: Deploy to Render/Heroku**
1. **Prepare for deployment**:
   ```bash
   npm install --production
   ```

2. **Set environment variables** in your hosting platform:
   - `MONGODB_URI` (production MongoDB connection string)
   - `JWT_SECRET` (strong secret for production)
   - `NODE_ENV=production`
   - `CORS_ORIGIN` (your frontend URL)

3. **Deploy to Render**:
   - Create new Web Service
   - Connect GitHub repository
   - Set start command: `npm start`
   - Configure environment variables

### **Option 2: Docker Deployment**
```dockerfile
# Dockerfile for Talent Quotient Backend
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### **Option 3: PM2 Process Manager**
```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start server.js --name "talent-quotient-backend"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

## 🔒 Security Best Practices

### **Implemented Security Measures**
- **JWT Token Expiry**: Tokens expire after 7 days (configurable)
- **Password Hashing**: bcryptjs for secure password storage
- **Helmet.js**: Sets security-related HTTP headers
- **CORS Configuration**: Restricts cross-origin requests
- **Input Validation**: Validates and sanitizes all user inputs
- **Environment Variables**: Sensitive data stored in .env files

### **Production Security Checklist**
- [ ] Use HTTPS in production
- [ ] Set strong JWT secret (minimum 32 characters)
- [ ] Enable MongoDB authentication
- [ ] Configure firewall rules
- [ ] Regular dependency updates
- [ ] Implement rate limiting
- [ ] Set up monitoring and logging

## 🧪 Testing

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

### **Test Structure**
```
tests/
├── unit/              # Unit tests
│   ├── controllers/   # Controller tests
│   └── models/       # Model tests
├── integration/       # Integration tests
│   └── api/          # API endpoint tests
└── fixtures/         # Test data fixtures
```

## 🔗 Integration with Frontend

This backend is designed to work with the **Talent Quotient Frontend**:

- **Frontend Repository**: [Talent-Quotient-Frontend](https://github.com/MohammadAli-14/Talent-Quotient-Frontend)
- **Main Repository**: [Talent-Quotient-V-2](https://github.com/MohammadAli-14/Talent-Quotient-V-2)
- **Default Frontend URL**: `http://localhost:5173`

### **Required Frontend Configuration**
```env
# Frontend .env file
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
```

## 🤝 Contributing

We welcome contributions to improve the Talent Quotient Backend! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- Follow existing code style and ESLint rules
- Write tests for new features
- Update documentation for API changes
- Ensure backward compatibility
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mohammad Ali** - *Full Stack Developer* - [MohammadAli-14](https://github.com/MohammadAli-14)

## 🙏 Acknowledgments

- **Express.js Team** for the minimalist web framework
- **MongoDB** for the flexible NoSQL database
- **Socket.io** for real-time communication capabilities
- **All Contributors** who have helped shape this project

## 🔗 Important Links

- **Backend Repository**: [Talent-Qutotient-Backend](https://github.com/MohammadAli-14/Talent-Qutotient-Backend)
- **Frontend Repository**: [Talent-Quotient-Frontend](https://github.com/MohammadAli-14/Talent-Quotient-Frontend)
- **Main Full-Stack Repo**: [Talent-Quotient-V-2](https://github.com/MohammadAli-14/Talent-Quotient-V-2)
- **Live Demo Frontend**: [https://talent-quotient-frontend.vercel.app/](https://talent-quotient-frontend.vercel.app/)

---
<div align="center">

**Built with ❤️ by [Mohammad Ali](https://github.com/MohammadAli-14)**

⭐ **Star this repo if you found it useful!** ⭐

</div>

**Note**: This backend API requires MongoDB to be running and properly configured. Ensure all environment variables are set before starting the server. For production deployment, use strong secrets, enable HTTPS, and implement proper monitoring and logging.
