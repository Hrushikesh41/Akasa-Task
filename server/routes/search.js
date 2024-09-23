const express = require('express')
const ProductModel = require("../models/product.model")

const router = express.Router();

router.post("/search", async (req, res) => {
    const { category } = req.body;

    if (!category) {
        return res.status(404).json({ error: "Category Not Found" })
    } else {
        try {
            const product = await ProductModel.find({ category: category })
            return res.status(200).json({ message: "Products Found", product })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Some Error Occurred" })
        }

    }
})

module.exports = router;