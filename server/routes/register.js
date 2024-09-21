const express = require('express');
const userModels = require('../models/user.model');
require("../db/conn")
const userModel = require("../models/user.model")

const router = express.Router();

router.post("/customer", async(req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(422).json({error : "Please Enter All Fields"})
    }else{
        try {
            const user = await userModel.findOne({email:email})
            
            if(user){
                return res.status(500).json({error : "User Already Registered"})
            }else{
                var newUser = new userModels({name, email, password})
                var register = newUser.save()

                if(register){
                    return res.status(200).json({message : "Registration Complete"});
                }else{
                    return res.status(422).json({error : "Some Error Occurred"})
                }
            }
        } catch (error) {
            console.log(err);
        }
    }
})

module.exports = router;