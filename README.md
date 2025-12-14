# Talent Quotient Backend

A modern Node.js backend application for talent assessment and interview management with real-time chat capabilities.

## 📋 Overview

Talent Quotient Backend is an Express.js application that provides a RESTful API for managing interview sessions, user authentication, and real-time chat functionality. It uses MongoDB for data storage and integrates with Inngest for background job processing.

## ✨ Features

- **User Authentication**: JWT-based authentication with protected routes
- **Session Management**: Create, update, and manage interview sessions
- **Real-time Chat**: WebSocket-based chat functionality for interview sessions
- **Background Jobs**: Asynchronous task processing with Inngest
- **Database Models**: MongoDB models for users and sessions
- **Environment Configuration**: Centralized environment variable management
- **Stream Processing**: Utility for handling streaming responses

## 🏗️ Project Structure

```
├── .gitignore
├── package.json
└── src
    ├── controllers          # Request handlers
    │   ├── chatController.js
    │   └── sessionController.js
    ├── lib                 # Core utilities
    │   ├── db.js           # Database connection
    │   ├── env.js          # Environment configuration
    │   ├── inngest.js      # Background job client
    │   └── stream.js       # Stream processing utilities
    ├── middleware          # Express middleware
    │   └── protectRoute.js # Route protection
    ├── models              # MongoDB models
    │   ├── Session.js
    │   └── User.js
    ├── routes              # API route definitions
    │   ├── chatRoutes.js
    │   └── sessionRoute.js
    └── server.js          # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MohammadAli-14/Talent-Qutotient-Backend.git
cd Talent-Qutotient-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory based on the example below.

4. Start the development server:
```bash
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/talent-quotient

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_BASE_URL=your_inngest_base_url
```

## 📦 Dependencies

### Core Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variable management
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **socket.io**: Real-time communication
- **inngest**: Background job processing

### Development Dependencies
- **nodemon**: Development server with hot reload
- **dotenv**: Environment variable loading

## 🛠️ Available Scripts

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm test`: Run tests (configure as needed)

## 📡 API Endpoints

### Session Routes
- `POST /api/sessions/create` - Create a new session
- `GET /api/sessions/:id` - Get session by ID
- `PUT /api/sessions/:id` - Update session
- `GET /api/sessions/user/:userId` - Get user sessions

### Chat Routes
- `POST /api/chat/new` - Start new chat
- `GET /api/chat/:sessionId` - Get chat history
- `POST /api/chat/message` - Send message
- WebSocket events for real-time chat

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Models

### User Model
- `email`: String (unique, required)
- `password`: String (required)
- `name`: String
- `createdAt`: Date

### Session Model
- `userId`: ObjectId (reference to User)
- `title`: String
- `description`: String
- `status`: String (enum: ['active', 'completed', 'cancelled'])
- `createdAt`: Date
- `updatedAt`: Date

## 🔄 Background Jobs

The application uses Inngest for processing background jobs such as:
- Session cleanup
- Notification sending
- Data synchronization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mohammad Ali** - *Initial work* - [MohammadAli-14](https://github.com/MohammadAli-14)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by modern talent assessment platforms

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

**Note**: This is a backend service. For a complete application, you'll need to integrate it with a frontend client that can consume the API endpoints and handle WebSocket connections for real-time features.
