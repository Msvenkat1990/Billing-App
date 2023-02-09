const express = require('express');
const { logData, login, productList, productListView, getProductHSNCode, creatBill, viewBillingData } = require('../controller/loginControl');
const router = express.Router();

router.post('/create',logData);
router.post('/login',login);
router.post('/create/product',productList);
router.get('/view/product',productListView);
router.get('/product/:type/:value', getProductHSNCode)
router.get('/product/:type/:value', getProductHSNCode);
router.put('/view/billno',viewBillingData);
router.post('/bill/create',creatBill);
module.exports = router;