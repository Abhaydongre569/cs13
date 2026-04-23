const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/courseDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// ✅ Schema
const courseSchema = new mongoose.Schema({
    course: String
});

const Course = mongoose.model("Course", courseSchema);

// ================= ROUTES =================

// ✅ GET all courses
app.get("/api/getcourse", async (req, res) => {
    const data = await Course.find();
    res.json(data);
});

// ✅ ADD course
app.post("/api/addcourse", async (req, res) => {
    const { course } = req.body;

    await Course.create({ course });

    res.json({ message: "course add ho gaya" });
});

// ✅ DELETE course
app.delete("/api/deletecourse/:id", async (req, res) => {
    const id = req.params.id;

    await Course.findByIdAndDelete(id);

    res.json({ message: "delete ho gaya" });
});

// ✅ UPDATE course
app.put("/api/updatecourse/:id", async (req, res) => {
    const id = req.params.id;
    const { course } = req.body;

    await Course.findByIdAndUpdate(id, { course });

    res.json({ message: "update ho gaya" });
});

// ✅ START SERVER (ONLY ONCE)
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;