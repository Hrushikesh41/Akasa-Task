const express = require('express')
const UserModel = require("../models/user.model")
const bcrypt = require('bcryptjs')


const router = express.Router();

router.post("/login", async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(500).json({error : "Please Enter All Required Feilds"})
    }else{
        try {
            const customer = await UserModel.findOne({email:email});

            if(customer){
                const fetchpass = await bcrypt.compare(password, customer.password)
                const id = customer._id
                if(fetchpass){
                    const token = await customer.generateAuthToken();
                    return res.status(200).json({message : "Login Successful", token, id})
                }else{
                    return res.status(404).json({error : "invalid Password"})
                }
            }else{
                return res.status(404).json({error : "No User Found !!! Please Create an Account"})
            }
        } catch (error) {
            console.log(error);
        }
    }
})

module.exports = router