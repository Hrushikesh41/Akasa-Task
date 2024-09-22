const express = require('express');
const userModels = require('../models/user.model');
require("../db/conn")
const userModel = require("../models/user.model")
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv')

const router = express.Router();
dotenv.config({ path: "config.env" })
sgMail.setApiKey(process.env.APIkey);
var pin = 0;

const userDetails = {
    name: "",
    email: "",
    password: ""
}

router.post("/customer", async (req, res) => {
    const { name, email, password } = req.body;
    userDetails.name = name;
    userDetails.email = email;
    userDetails.password = password;
    const otp = Math.floor(1000 + Math.random() * 9000);
    pin = otp

    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please Enter All Fields" })
    } else {
        try {
            const user = await userModel.findOne({ email: email })

            if (user) {
                return res.status(500).json({ error: "User Already Registered" })
            } else {

                const msg = {
                    to: email,
                    from: 'hrushikesh.kok@gmail.com', // Replace with your SendGrid verified sender email
                    subject: "Verify Your Account",
                    html: `<h3> OTP to verify your email is ${otp}</h3>`,
                };

                sgMail
                    .send(msg)
                    .then(() => {
                        console.log('Email sent');
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                
                    return res.status(200).json({ message: "OTP Sent" });
            }
        } catch (error) {
            console.log(error);
        }
    }
})

router.post("/verifyotp", (req, res) => {
    const verifyPin = req.body;

    if (pin != verifyPin.otp) {
        return res.status(500).json({ error: "Invalid OTP" })
    } else {
        const name = userDetails.name;
        const email = userDetails.email;
        const password = userDetails.password;

        var blogger = new userModels({ name, email, password });
        var result = blogger.save();

        if (result) {
            const msg = {
                to: email,
                from: 'hrushikesh.kok@gmail.com', // Replace with your SendGrid verified sender email
                subject: "Verify Your Account",
                html: `<h3> Your Email Has been Verified`,
            };

            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent');
                })
                .catch((error) => {
                    console.error(error);
                });
            return res.status(200).json({ message: "Registration Complete" });
        } else {
            return res.status(422).json({ error: "Some Error Occurred" })
        }
    }
})

module.exports = router;