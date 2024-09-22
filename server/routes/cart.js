const express = require('express')
const UserModel = require("../models/user.model")
const ProductModel = require("../models/product.model")
const { route } = require('./register')

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
                return res.status(422).json({error : "Product Not Found"})
            }
        } catch (error) {
            console.log(error);
            return res,status(500).json({err : "Some Error Occurred"})
        }
    }
})

module.exports = router;