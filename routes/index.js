var express = require('express');
var router = express.Router();
var approvedPro_Controller = require("../Controller/ApprovedProduct_Controller");

router.get('/ShowAprrovedProduct', function (req, res, next) {
    approvedPro_Controller.loadSPDuocDuyet(req,res);
});
    router.get('/ShowProductKH', function (req, res, next) {
    approvedPro_Controller.loadSPKH(req,res);
});
router.get('/ShowProductCty', function (req, res, next) {
    approvedPro_Controller.loadSPCty(req,res);
});
module.exports = router;
