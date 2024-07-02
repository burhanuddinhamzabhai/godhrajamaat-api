const express = require("express");
const app = express();
app.use(express.json());

const controller = require("../controller/miqaat.controller");

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
    await controller.getActiveMiqaatUsers(req, res);
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

app.put("/close", async (req, res) => {
  try {
    await controller.closeMiqaat(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}
);

module.exports = app;
