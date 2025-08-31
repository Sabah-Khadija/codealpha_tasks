import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/products.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configuration CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Connexion MongoDB
const MONGO_URI = process.env.MONGO;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

// Routes
app.use("/api/products", productRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 MongoDB: ${MONGO_URI}`);
});