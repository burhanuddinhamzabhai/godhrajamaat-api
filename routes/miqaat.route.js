const express = require("express");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const controller = require("../controller/miqaat.controller");
const verifyToken = require("../middleware/authMiddleware");
app.use(verifyToken);

app.post("/create", async (req, res) => {
  try {
    await controller.createMiqaat(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/last", async (req, res) => {
  try {
    await controller.getLastMiqaat(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/activeMiqaatUsers", async (req, res) => {
  try {
    await controller.getFewActiveMiqaatUsers(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/delete", async (req, res) => {
  try {
    await controller.deleteMiqaats(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/deleteSession",async (req,res)=>{
  try{
    await controller.deleteSession(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/findActiveUser",async (req,res)=>{
  try{
    await controller.findActiveUser(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/close", async (req, res) => {
  try {
    await controller.closeMiqaat(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}
);

app.get("/export", async (req, res) => {
  try {
   await controller.getActiveMiqaatUsers(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}
);

app.get("/exportMiqaat", async (req, res) => {
  try {
   await controller.getThisMiqaatUsers(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}
);

app.get("/all",async (req,res)=>{
  try{
    await controller.getAllMiqaats(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.get('/findMiqaat', async (req,res)=>{
  try{
    await controller.findMiqaat(req,res);
  }catch(err){
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});


module.exports = app;
