const loginData = require("../schema/loginSchema");
const dropDown = require("../schema/productList");
const billData = require("../schema/billSchema");
const logData = async (req, res) => {
  const data = new loginData({
    ...req.body,
  });
  const saveData = await data.save();
  res.json(saveData);
};

const login = async (req, res) => {
  const loginName = await loginData.findOne({ username: req.body.username });
  if (!loginName) return res.status(404).json({ message: "Email not valid" });

  const loginPassword = await loginData.findOne({
    password: req.body.password,
  });
  if (!loginPassword)
    return res.status(404).json({ message: "Password not valid" });
  res.json({ message: "Login Successfully" });
};

const productList = async (req, res) => {
  const data = new dropDown({
    ...req.body,
  });
  
  const saveData = await data.save();

  res.json({message:"Item add successfully"});
};

const productListView = async (req, res) => {
  const productList = await dropDown.find();

  res.json(productList);
};
const getProductHSNCode = async (req, res) => {
  const { type, value } = req.params;

  if (type && value) {
    let data;
    if (type === "particulars") {
      data = await dropDown.findOne({ particulars: value });
    } else if (type === "hsnCode") {
      data = await dropDown.findOne({ hsnCode: value });
    }

    if (data) {
      return res.json(data);
    } else {
      return res.sendStatus(404);
    }
  } else {
    return res.sendStatus(400);
  }
};
const viewBillingData = async (req, res) => {
  const billingData = await billData.findOne({billNo:req.body.billNo});
  if(!billingData) return res.json({message:"Invalid billno"})
  res.json(billingData);
};
const creatBill = async (req, res) => {
  const billingdata = new billData({
    ...req.body,
  });
  const existingBillNo = await billData.findOne({billNo:req.body.billNo});
  if(existingBillNo) {
    res.json({message:"Bill number already exists"})
  } 
  else if(!existingBillNo) {
  const savedata = await billingdata.save();
  res.json(savedata);
  }
};
module.exports = {
  logData,
  login,
  productList,
  productListView,
  getProductHSNCode,
  viewBillingData,
  creatBill,
};
