const mongoose = require('mongoose');
const loginData = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
})
module.exports = mongoose.model("loginData",loginData);