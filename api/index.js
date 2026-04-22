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

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/abhi";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connection successfully");
  })
  .catch((err) => {
    console.log("connection invalid", err);
  });

// Course Schema
const courseSchema = new mongoose.Schema({
  course: String,
});

const Course = mongoose.model("Course", courseSchema);

// Routes
app.post("/api/addcourse", async (req, res) => {
  try {
    const newcour = new Course({
      course: req.body.course,
    });
    await newcour.save();
    res.send(newcour);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/api/getcourse", async (req, res) => {
  try {
    let allcourse = await Course.find();
    res.send(allcourse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.put("/api/updatecourse/:id", async (req, res) => {
  try {
    let newcourse = req.body.course;
    let id = req.params.id;
    let updatecourse = await Course.findByIdAndUpdate(id, { course: newcourse });
    res.send({ message: "database updated" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete("/api/deletecourse/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deletecourse = await Course.findByIdAndDelete(id);
    res.send({ message: "delete ho gaya" });
  } catch (error) {
    res.status(500).send({ error: error.message });
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
