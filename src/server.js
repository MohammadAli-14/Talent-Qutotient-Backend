import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoute from "./routes/sessionRoute.js";

const app = express();

// 1. Logging Middleware (Helps debug on Render logs)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 2. CORS Configuration
// This explicitly handles the frontend URL with or without trailing slashes
const allowedOrigins = [
  ENV.CLIENT_URL,                    // The URL from your .env file
  "https://talent-quotient-frontend.vercel.app", // Hardcoded fallback
  "http://localhost:5173"            // Local development
];

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    // We maintain a list of valid origins to prevent CORS errors
    const isAllowed = allowedOrigins.some(allowedOrigin => 
      origin === allowedOrigin || origin === allowedOrigin + "/"
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Auth Middleware
app.use(clerkMiddleware());

// 4. Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoute);

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    dbState: "Connected", 
    environment: ENV.NODE_ENV 
  });
});

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Talent Quotient API is Running" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ 
    error: "Internal Server Error", 
    message: err.message 
  });
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");
    const PORT = ENV.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
  } catch (error) {
    console.error("💥 Failed to start server:", error);
    process.exit(1);
  }
};

startServer();