const express = require('express')
const UserModel = require("../models/user.model")
const ProductModel = require("../models/product.model")
const { route } = require('./register')
const userModels = require('../models/user.model')

const router = express.Router()

router.post("/cart", async(req, res)=>{
    const {id, userID} = req.body;
    if(!id || !userID){
        return res.status(404).json({error : "Please Provide Product ID"})
    }else{
        try {
            const product = await ProductModel.findById({_id:id})
            if(product){
                const cart = await UserModel.findByIdAndUpdate({_id : userID}, {$push : {"cart" : [id]}})
                if(cart){
                    return res.status(200).json({message : "Item Added to Cart"})
                }else{
                    return res.status(501).json({error : "Error Occurred In adding to Cart"})
                }
            }else{
                return res.status(422).jso({error : "Product Not Found"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({err : "Some Error Occurred"})
        }
    }
})

router.post("/cartProducts", async(req, res)=>{
    const {token} = req.body;
    if(!token){
        return res.status(404).json({error : "ID Not Found"})
    }else{
        try {
            const user = await userModels.findById({_id : token})

            if(user){
                const cart = user.cart;
                const name = user.name;

                return res.status(200).json({message : "Cart Found", cart, name})
            }else{
                return res.status(422).json({error : "User Not Found"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : "Some Error Occurred"})
        }
    }
})

module.exports = router;