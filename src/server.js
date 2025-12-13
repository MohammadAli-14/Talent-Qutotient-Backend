import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoute from "./routes/sessionRoute.js";

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// middleware
app.use(express.json());
app.use(cors({
  origin: ENV.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(clerkMiddleware());

// API Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoute);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: ENV.NODE_ENV,
    routes: ["/api/chat", "/api/sessions", "/api/inngest"]
  });
});

// Test route without authentication
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "API is working without auth" });
});

// Protected test route
app.get("/api/test-protected", (req, res) => {
  console.log("Auth header:", req.headers.authorization);
  res.status(200).json({ message: "Protected route is working" });
});

// Root route - optional, shows API is running
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Talent Quotient Backend API",
    version: "1.0.0",
    status: "running",
    environment: ENV.NODE_ENV,
    documentation: "Use /api endpoints for API access"
  });
});

// 404 Handler - Express 5 compatible
app.use((req, res) => {
  res.status(404).json({ 
    error: "Not Found",
    message: `Route ${req.method} ${req.url} not found`,
    availableRoutes: [
      "/",
      "/api/health",
      "/api/chat",
      "/api/sessions",
      "/api/test",
      "/api/test-protected",
      "/api/inngest"
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: ENV.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();