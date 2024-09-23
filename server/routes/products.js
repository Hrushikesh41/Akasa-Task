const express = require('express');
const ProductModel = require('../models/product.model')

const router = express.Router();

router.post('/product', async(req, res)=>{
    const {productID, name, category, manufacturer, price, stock, description, reviews} = req.body;

    if(!productID || !name || !category || !manufacturer || !price || !stock || !description || !reviews){
        return res.status(404).json({error : "Please Enter Required Details"})
    }else{
        try {
            const product = await ProductModel.findOne({productID:productID})

            if(product){
                return res.status(500).json({error : "Product Already Registered"})
            }else{
                const newproduct = new ProductModel({productID, name, category,manufacturer, price, stock, description, reviews});
                const addproduct = newproduct.save();

                if(addproduct){
                    return res.status(200).json({message : "Product Registered"})
                }else{
                    return res.status(502).json({error : "Some Error Occurred"})
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
});

router.get("/product", async(req, res)=>{
    try {
        const products = await ProductModel.find();
        return res.status(200).json({products : products})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "Cannot Find Products"})
    }
});

router.post("/product_id", async(req, res)=>{
    const {productID} = req.body;
    console.log(productID)
    try {
        const product = await ProductModel.findOne({_id:productID});
        return res.status(200).json({product : product})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "Cannot Find Product"})
    }
});

module.exports = router;