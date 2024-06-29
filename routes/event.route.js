const express = require("express");
const app = express();
app.use(express.json());


const controller = require("../controller/event.controller");

app.post("/create", async (req, res) => {
  try{
    await controller.createEvent(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/delete", async (req, res) => {
  try{
    await controller.deleteEvents(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = app;