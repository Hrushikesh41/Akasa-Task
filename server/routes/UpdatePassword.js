const express = require("express");
require("../db/conn");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv')

const router = express.Router();
dotenv.config({ path: "config.env" })
sgMail.setApiKey(process.env.APIkey);

const emailDetails = {
    to: ""
}

var pin = 0;

router.post("/update", async(req, res) => {
    const email = req.body.email;
    
    if (!email) {
        return res.status(404).json({ error: "Please Enter Email" })
    } else {
        const otp = Math.floor(1000 + Math.random() * 9000);
        pin = otp;
        
        emailDetails.to = email;

        console.log(emailDetails.to);
        try {
            const user = await userModel.findOne({ email: email })

            if (!user) {
                return res.status(500).json({ error: "User Not Found" })
            } else {

                const msg = {
                    to: email,
                    from: 'hrushikesh.kok@gmail.com', // Replace with your SendGrid verified sender email
                    subject: "Verify Your Account",
                    html: `<h1> OTP to verify your email is ${otp}</h1>`,
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

router.post("/verifycode", async (req, res) => {
    const otp = req.body.otp;
    console.log(otp);

    if (!otp) {
        return res.status(404).json({ error: "Please Enter all Fields" })
    } else {
        try {
            if (pin != otp) {
                return res.status(520).json({ error: "Invalid OTP" })
            } else {
                return res.status(200).json({ message: "OTP Verified" })
            }
        } catch (error) {
            console.log(error);
        }
    }

});

router.post("/newpassword", async(req, res)=>{
    const password = req.body.password;

    if(!password){
        return res.status(404).json({error : "Enter New Password"})
    }else{
        try {
            const email = emailDetails.to;
            const fetchEmail = await userModel.findOne({ email: email });
            console.log(fetchEmail)

            if (fetchEmail) {
                const hashPass = await bcrypt.hash(password, 12);
                const update = await userModel.findOneAndUpdate({ email: email }, { password:hashPass }, { new: true });
                const result = await update.save();

                if (result) {
                    return res.status(200).json({ message: "Password Changed Successfully" });
                } else {
                    return res.status(500).json({ error: "Some Error Occurred" })
                }
            } else {
                return res.status(404).json({ error: "Email not Found" })
            }
        } catch (error) {
            console.log(error);
        }
    }
})

module.exports = router