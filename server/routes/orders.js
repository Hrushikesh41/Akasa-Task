const express = require('express')
const userModels = require('../models/user.model')
const UserModel = require('../models/user.model')
const ProductModel = require("../models/user.model")
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv')

const router = express.Router()
dotenv.config({ path: "config.env" })
sgMail.setApiKey(process.env.APIkey);

router.post("/order", async(req, res)=>{

    if(!req.body.id){
        return res.status(404).json({error : "Provide Required Details"})
    }else{
        try {
            const id = Math.floor(100000 + Math.random() * 900000);
            const userEmail = await userModels.findOne({_id:req.body.id})
            const user = await UserModel.findByIdAndUpdate({_id : req.body.id}, {orderID : id},{$push : {"orders" : [req.body.product]}});
            const email = userEmail.email

            const msg = {
                to: email,
                from: 'hrushikesh.kok@gmail.com', // Replace with your SendGrid verified sender email
                subject: "Order Placed",
                html: `<h3> Thank You for Shopping with us. Your OderID is ${id}.</h3>`,
            };

            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent');
                })
                .catch((error) => {
                    console.error(error);
                });

            
                return res.status(200).json({ message: "Order Placed" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({error : "Some Error Occurred"})
        }
    }
})

module.exports = router;