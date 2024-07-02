const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());


const controller = require("../controller/user.controller");

app.post("/create", async (req, res) => {
  try{
    await controller.createUser(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try{
    await controller.deleteUser(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/deleteAll", async (req, res) => {
  try{
    await controller.deleteUsers(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/createBulk",async (req,res) =>{
  try{
    await controller.createBulkUsers(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = app;