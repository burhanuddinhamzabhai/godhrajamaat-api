const express = require("express");
const app = express();
app.use(express.json());


const controller = require("../controller/seed.controller");

app.post("/users", async (req, res) => {
  try{
    await controller.seedUsers();
    return res.status(201).json({ message: "Seeded users" });
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;