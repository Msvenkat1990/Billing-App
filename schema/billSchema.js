const { timeStamp } = require('console');
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema( {
    particulars:{
        type:String,
        require:true,
    },
    hsnCode:{
        type:String,
        require:true,
    },
    quantity:{
        type:String,
        require:true,
    },
    rate:{
        type:String,
        require:true,
    },
    per:{
        type:String,
        require:true,
    },
    amount:{
        type:String,
        require:true,
    }
});
const billSchema = new mongoose.Schema({

address:{
    type:String,
    require:true,
},
gstNo:{
    type:String,
    require:true,
},
billNo:{
    type:String,
    require:true,
},
billDate:{
    type:String,
    require:true,
},
products:{
type:[productSchema],
require:true,
},

salesAmount:{
    type:String,
    require:true,
},
discount:{
    type:String,
    require:true,
},
discountAmount:{
    type:String,
    require:true,
},
cgst:{
    type:String,
    require:true,
},
sgst:{
    type:String,
    require:true,
},
totalGST:{
    type:String,
    require:true,
},
wordOfAmount:{
    type:String,
    require:true,
},
totalBillAmount:{
    type:String,
    require:true,
},
},{ timestamps: true })
module.exports = mongoose.model("billing", billSchema);