const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const cors = require("cors")
app.use(cors())

mongoose
  .connect("mongodb://localhost:27017/abhi")
  .then(() => {
    console.log("connection successfully");
  })
  .catch((err) => {
    console.log("connection invalid", err);
  });


const courseSchema = new mongoose.Schema({
  course: String,
});

const Course = mongoose.model("Course", courseSchema);


app.post("/addcourse", async (req, res) => {
  const newcour = new Course({
    course: req.body.course,
  });


  await newcour.save();
  res.send(newcour);
});

app.get("/getcourse", async(req,res)=>{
let allcourse = await(Course.find())
res.send(allcourse)
})

app.put("/updatecourse/:id", async(req,res)=>{

    let newcourse = req.body.course
    let id = req.params.id
    let updatecourse = await Course.findByIdAndUpdate(id,{course:newcourse})

 res.send({message :"database updated"})

})

app.delete("/deletecourse/:id", async(req,res)=>{

    let id = req.params.id
    let deletecourse = await Course.findByIdAndDelete(id)

    res.send({message:"delete ho gaya"})
})

app.listen(5000, () => {

  console.log("server chal raha hai 🚀");

});