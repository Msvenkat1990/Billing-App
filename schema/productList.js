const mongoose = require('mongoose');
const hsn_code = new mongoose.Schema({
    particulars:{
        type:String,
        require:true,
    },
    hsnCode:{
        type:String,
        require:true,
    },
    rate:{
        type:String,
        require:true,
    }
})
module.exports = mongoose.model("productList",hsn_code)