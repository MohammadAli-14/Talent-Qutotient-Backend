# Talent Quotient Backend

<div align="center">

**Node.js backend API for collaborative coding interviews with RESTful endpoints and Stream.io integration**

[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Stream.io](https://img.shields.io/badge/Stream.io-Chat_&_Video-7E57C2?style=for-the-badge)](https://getstream.io/)

</div>

## 🎯 Overview

Talent Quotient Backend is a robust Node.js and Express.js API that powers the collaborative coding interview platform. It provides RESTful endpoints for session management, user authentication, and data persistence, while delegating all real-time communication features to the **Stream.io service**.

This backend acts as the central data hub for:
*   **Session Management:** Creating, updating, and tracking interview sessions.
*   **User Authentication:** Handling registration, login, and JWT-based security.
*   **Data Persistence:** Storing session data, user profiles, and chat history in MongoDB.
*   **Stream.io Integration:** Generating tokens and managing Stream.io channels for real-time features.

## 🏗️ Architecture & Technology Stack

The platform uses a clean separation of concerns between the Express backend and the Stream.io service:

| Component | Technology | Primary Responsibility |
| :--- | :--- | :--- |
| **Backend API** | Node.js + Express | RESTful endpoints, business logic, data persistence, authentication |
| **Database** | MongoDB + Mongoose | Data storage for users, sessions, and historical data |
| **Real-time Services** | **Stream.io** | **All real-time features:** chat messaging, video calls, live code collaboration, typing indicators |
| **Frontend** | React + Vite | User interface that connects to both Backend API and Stream.io directly |

**How it works:** Your React frontend communicates with **two separate services**:
1.  **This Express Backend** (`http://localhost:3000/api`): For authenticated REST API calls (create session, get user data).
2.  **Stream.io Service** (via their SDK): For all real-time interactions (chat, video, code sync).

This backend facilitates the Stream.io integration by generating secure access tokens for users.

## ✨ Core Backend Features

### **REST API & Business Logic**
*   **RESTful API:** Comprehensive endpoints for user management and session operations.
*   **JWT Authentication:** Secure stateless authentication for API access.
*   **Session Management:** Full CRUD operations for interview sessions with MongoDB persistence.
*   **Stream.io Token Generation:** Creates secure tokens for frontend to connect to Stream.io services.

### **Data Management & Security**
*   **MongoDB Integration:** Scalable NoSQL database with Mongoose ODM.
*   **Data Models:** Well-structured schemas for users, sessions, and relationships.
*   **Protected Routes:** Middleware for API authorization and role-based access.
*   **CORS Configuration:** Secure cross-origin resource sharing for the frontend.
*   **Environment Configuration:** Centralized management of sensitive keys and settings.

## 📁 Project Structure

```
├── .gitignore
├── package.json
├── package-lock.json
└── src/
    ├── controllers/           # Request handlers for HTTP API
    │   ├── chatController.js  # Manages chat-related API calls
    │   └── sessionController.js # Manages session operations
    ├── lib/                  # Core utilities and configurations
    │   ├── db.js            # MongoDB connection setup
    │   ├── env.js           # Environment configuration
    │   ├── inngest.js       # Background job processing (optional)
    │   └── stream.js        # Stream.io service integration and token generation
    ├── middleware/          # Express middleware
    │   └── protectRoute.js  # JWT authentication middleware
    ├── models/              # MongoDB schema definitions
    │   ├── Session.js       # Session data model
    │   └── User.js          # User data model
    ├── routes/              # API route definitions
    │   ├── chatRoutes.js    # Chat-related routes
    │   └── sessionRoute.js  # Session-related routes
    └── server.js           # Main application entry point
```

## 🚀 Quick Start

### **Prerequisites**
*   Node.js (v18 or higher)
*   MongoDB (v6.0 or higher)
*   Stream.io account (for chat and video features)
*   npm or yarn

### **1. Clone and Install**
```bash
git clone https://github.com/MohammadAli-14/Talent-Qutotient-Backend.git
cd Talent-Qutotient-Backend
npm install
```

### **2. Configure Environment**
```bash
cp .env.example .env
# Edit the .env file with your configuration (see below)
```

### **3. Start Development Server**
```bash
npm run dev
```
The REST API will be available at `http://localhost:3000`

## ⚙️ Environment Configuration (`.env`)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/talent-quotient

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# CORS (for frontend)
CORS_ORIGIN=http://localhost:5173

# Stream.io Configuration (REQUIRED for real-time features)
STREAM_API_KEY=your_stream_io_api_key
STREAM_API_SECRET=your_stream_io_api_secret
STREAM_APP_ID=your_stream_io_app_id

# Optional: Background Job Processing (Inngest)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_BASE_URL=your_inngest_base_url
```

## 🛠️ Available Scripts

```bash
npm run dev        # Start development server with nodemon
npm start          # Start production server
npm test           # Run tests (if configured)
```

## 🔌 REST API Endpoints

### **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/auth/register` | Register a new user | No |
| POST   | `/api/auth/login` | Authenticate user and get JWT token | No |
| GET    | `/api/auth/me` | Get current user profile | Yes |
| POST   | `/api/auth/stream-token` | Generate Stream.io token for current user | Yes |

### **Session Management**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/sessions/create` | Create a new interview session | Yes |
| GET    | `/api/sessions` | List all sessions (with pagination/filters) | Yes |
| GET    | `/api/sessions/:id` | Get session details | Yes |
| PUT    | `/api/sessions/:id` | Update session information | Yes |
| DELETE | `/api/sessions/:id` | Delete a session | Yes |
| GET    | `/api/sessions/user/:userId` | Get all sessions for a specific user | Yes |
| POST   | `/api/sessions/:id/join` | Join an existing session | Yes |
| POST   | `/api/sessions/:id/leave` | Leave a session | Yes |

### **Chat & Data Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/chat/channel` | Create a Stream.io chat channel for a session | Yes |
| GET    | `/api/chat/history/:sessionId` | Get chat history from database | Yes |
| POST   | `/api/chat/save-message` | Save chat message to database (for history) | Yes |

## 🔐 Authentication & Stream.io Integration

### **JWT Authentication Flow**
1. User registers or logs in via `/api/auth/register` or `/api/auth/login`
2. Server validates credentials and returns a JWT token
3. Client includes token in `Authorization` header for all protected API calls

### **Stream.io Token Generation**
The backend generates Stream.io tokens so the frontend can connect directly to Stream.io services:

```javascript
// Example route handler for generating Stream.io tokens
app.post('/api/auth/stream-token', protectRoute, async (req, res) => {
  try {
    const { StreamChat } = require('stream-chat');
    const serverClient = StreamChat.getInstance(
      process.env.STREAM_API_KEY, 
      process.env.STREAM_API_SECRET
    );
    
    const token = serverClient.createToken(req.user.id);
    res.json({ token, api_key: process.env.STREAM_API_KEY });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Stream token' });
  }
});
```

### **Frontend Integration**
Your React frontend will:
1. Get a JWT token from this backend for API authentication
2. Get a Stream.io token from this backend for real-time services
3. Use the Stream.io SDK to connect to chat and video features

## 🗄️ Database Models

### **User Model (`models/User.js`)**
```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['interviewer', 'candidate'], default: 'candidate' },
  streamId: { type: String, unique: true }, // Matches Stream.io user ID
  avatar: { type: String },
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
  problemId: { type: String }, // Reference to coding problem
  language: { type: String, default: 'javascript' },
  status: { 
    type: String, 
    enum: ['scheduled', 'active', 'completed', 'cancelled'], 
    default: 'scheduled' 
  },
  streamChannelId: { type: String }, // Associated Stream.io channel ID
  startTime: { type: Date },
  endTime: { type: Date },
  duration: { type: Number }, // Duration in minutes
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## 🔄 Stream.io Integration Details

### **Backend Responsibilities for Stream.io**
1. **User Synchronization:** Ensure user profiles exist in both MongoDB and Stream.io
2. **Token Generation:** Create secure tokens for frontend Stream.io connections
3. **Channel Management:** Create and manage Stream.io channels for each session
4. **Webhook Handling:** Process Stream.io webhooks for server-side events

### **Example: Creating a Stream.io Channel for a Session**
```javascript
// In your session controller
const createSession = async (req, res) => {
  try {
    // 1. Create session in MongoDB
    const session = new Session({ ...req.body, createdBy: req.user.id });
    
    // 2. Create Stream.io channel for this session
    const { StreamChat } = require('stream-chat');
    const serverClient = StreamChat.getInstance(
      process.env.STREAM_API_KEY, 
      process.env.STREAM_API_SECRET
    );
    
    const channelId = `session-${session._id}`;
    const channel = serverClient.channel('messaging', channelId, {
      name: session.title,
      created_by_id: req.user.id,
      members: [req.user.id], // Initial member
      sessionData: {
        sessionId: session._id.toString(),
        problemId: session.problemId,
        language: session.language
      }
    });
    
    await channel.create();
    
    // 3. Update session with channel ID
    session.streamChannelId = channelId;
    await session.save();
    
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## 🚀 Deployment

### **Deployment Steps**
1. **Set up production MongoDB:** Use MongoDB Atlas or another cloud MongoDB service
2. **Configure environment variables:** Set all production values in your hosting platform
3. **Get Stream.io production credentials:** Use production keys from your Stream.io dashboard
4. **Deploy the application:** Use your preferred hosting (Render, Railway, Heroku, AWS, etc.)

### **Production Environment Variables**
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_connection_string
JWT_SECRET=your_strong_production_jwt_secret
CORS_ORIGIN=https://talent-quotient-frontend.vercel.app
STREAM_API_KEY=your_stream_production_api_key
STREAM_API_SECRET=your_stream_production_api_secret
STREAM_APP_ID=your_stream_app_id
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔗 Integration with Frontend

This backend is designed to work with the **Talent Quotient Frontend**:

- **Frontend Repository**: [Talent-Quotient-Frontend](https://github.com/MohammadAli-14/Talent-Quotient-Frontend)
- **Main Repository**: [Talent-Quotient-V-2](https://github.com/MohammadAli-14/Talent-Quotient-V-2)
- **Live Demo**: [https://talent-quotient-frontend.vercel.app/](https://talent-quotient-frontend.vercel.app/)

### **Frontend Connection Flow**
1. Frontend authenticates with backend to get JWT token
2. Frontend requests Stream.io token from backend
3. Frontend initializes Stream.io client with the token
4. Frontend uses:
   - **Backend API** for session data and business logic
   - **Stream.io SDK** for all real-time features (chat, video, collaboration)

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
- **Stream.io** for the comprehensive chat and video platform
- **All Contributors** who have helped shape this project

---

<div align="center">

**Built with ❤️ by [Mohammad Ali](https://github.com/MohammadAli-14)**

⭐ **Star this repo if you found it useful!** ⭐

</div>

**Note**: This backend API requires MongoDB and Stream.io credentials to be properly configured. Ensure all environment variables are set before starting the server. For production deployment, use strong secrets, enable HTTPS, and implement proper monitoring and logging.
