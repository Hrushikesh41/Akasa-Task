const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productID :{
        type : String, 
        required : true
    },
    name : {
        type : String, 
        required : true
    },
    category : {
        type : String, 
        required : true
    },
    manufacturer : {
        type : String, 
        required : true
    },
    price : {
        type : Number, 
        required : true
    },
    stock : {
        type : Number, 
        required : true
    },
    description : {
        type : String, 
        required : true
    },
    reviews : {
        type : Number, 
        required : true
    }
})

const ProductModel = new mongoose.model("PRODUCTS", productSchema)
module.exports = ProductModel