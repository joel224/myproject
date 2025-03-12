const mongoose = require("mongoose");

const CreatorSchema=mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,

        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
  
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    country:{
        type:String,
        required:true
    },
    image: {
        type: Object,
       
    }
})
module.exports=mongoose.model('creators',CreatorSchema)