const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "../public")));

// MongoDB URI
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/abhi";

// Define Course Schema
const courseSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Course Model
const Course = mongoose.model("Course", courseSchema);

let dbConnected = false;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    dbConnected = true;
    console.log("✅ MongoDB Connection Successful");
  })
  .catch((err) => {
    dbConnected = false;
    console.error("❌ MongoDB Connection Failed:", err.message);
  });

// ADD COURSE - POST
app.post("/api/addcourse", async (req, res) => {
  try {
    const { course } = req.body;
    
    if (!course || !course.trim()) {
      return res.status(400).json({ error: "Course name required" });
    }

    const newCourse = new Course({ course: course.trim() });
    const saved = await newCourse.save();
    console.log("✅ Course added");
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Add error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET ALL COURSES
app.get("/api/getcourse", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    console.log("✅ Fetched " + courses.length + " courses");
    res.status(200).json(courses);
  } catch (error) {
    console.error("❌ Get error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE COURSE
app.put("/api/updatecourse/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { course } = req.body;

    if (!course || !course.trim()) {
      return res.status(400).json({ error: "Course name required" });
    }

    const updated = await Course.findByIdAndUpdate(
      id,
      { course: course.trim() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Course not found" });
    }

    console.log("✅ Course updated");
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Update error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/deletecourse/:id", async (req, res) => {
  try {
    if (!dbConnected) {
      return res.status(503).json({ error: "Database not connected" });
    }

    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Course deleted successfully",
      data: deletedCourse 
    });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ error: error.message || "Failed to delete course" });
  }
});

// Serve index.html for root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
} else {
  console.log("✅ Running on Vercel");
}

module.exports = app;
