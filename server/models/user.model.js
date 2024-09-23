const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    },
    cart : [
        {
            type : String
        }
    ],
    orderID : {
        type : String
    },
    orders : [
        {
            type : String
        }
    ]
})

userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        return token
    }catch(e){
        console.log(e);
    }
}


const userModels = new mongoose.model("CUSTOMERS", userSchema);

module.exports = userModels