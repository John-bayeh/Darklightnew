import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Mongoose schema for theme
const themeSchema = new mongoose.Schema({
  theme: { type: String, required: true }
});

const ThemeModel = mongoose.model("Theme", themeSchema);

// Routes

// Get latest theme
app.get("/theme", async (req, res) => {
  try {
    const themeData = await ThemeModel.findOne().sort({ _id: -1 });
    res.json(themeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save new theme
app.post("/theme", async (req, res) => {
  try {
    const { theme } = req.body;
    const newTheme = new ThemeModel({ theme });
    await newTheme.save();
    res.json(newTheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
