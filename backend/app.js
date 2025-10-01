import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from "path";

// Import Routes
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

app.use("/templates", express.static(path.join(process.cwd(), "templates"))); 

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.get("/api/templates", (req, res) => {
  // ✅ You can replace this static array with DB query later
  const templates = [
    {
      id: 1,
      name: "Modern Blue",
      preview: "/templates/modern-blue.png",
      data: { color: "blue", sections: ["Header", "Experience", "Education"] }
    },
    {
      id: 2,
      name: "Minimal Gray",
      preview: "/templates/minimal-gray.png",
      data: { color: "gray", sections: ["Header", "Skills", "Projects"] }
    },
  ];
  res.json(templates);
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ 404 Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// ✅ Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};



// ✅ Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
