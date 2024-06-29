const express = require("express");
const app = express();
app.use(express.json());


const controller = require("../controller/seed.controller");

app.post("/init", async (req, res) => {
  try{
    await controller.seedInit();
    return res.status(201).json({ message: "Seeded initial data" });
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;