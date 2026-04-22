// Main entry point - for local development
// All API logic is in api/index.js which is used by Vercel

const app = require("./api/index.js");

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

app.delete("/deletecourse/:id", async(req,res)=>{

    let id = req.params.id
    let deletecourse = await Course.findByIdAndDelete(id)

    res.send({message:"delete ho gaya"})
})

app.listen(5000, () => {

  console.log("server chal raha hai 🚀");

});