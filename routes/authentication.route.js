const express = require('express');
const router = express.Router();
router.use(express.json());

const controller = require('../controller/authentication.controller');


router.post('/login', async (req, res) => {
    try{
        await controller.login(req,res); 
      }catch(err){
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
      }
});

router.post('/logout',async (req,res) => {
    try{
        await controller.logout(req,res);
    }catch(err){
        console.log(err);
        return res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;