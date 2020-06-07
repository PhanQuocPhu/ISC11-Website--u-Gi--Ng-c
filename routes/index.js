var express = require('express');
var router = express.Router();
var controller = require("../Controller/HomeController");
var controllerDetail = require("../Controller/DetailController");
var controllerLogin = require("../Controller/LoginController");
var Cart = require("../Controller/MyCartController");
var myPost_Controller = require("../Controller/MyPost_Controller");
var censorship_Controller = require("../Controller/Censorship_Controller");
var browsePost_Controller = require("../Controller/BrowsePost_Controller");
var approvedPro_Controller = require("../Controller/ApprovedProduct_Controller");
var controllerDangKy = require("../Controller/DangKyController");
var sendMail = require("../Controller/SendEmail");
/* GET home page. */
router.get('/', function (req, res) {
    res.render("Home");
});
router.get('/Detail', function (req, res) {
    res.render("Detail");
});
router.get('/Search', function (req, res) {
    
});
router.get('/MyCart', function (req, res) {
    res.redirect("/MyCart2");
});
router.get('/MyCart2', function (req, res) {
    res.render("MyCart");

});
router.get('/deleteItem', function (req, res) {

});
router.get('/DangNhap', function (req, res) {
    res.redirect("/");
});
router.get('/DangKy', function (req, res, next) {
    res.redirect("/");
});
router.get('/Post', function (req, res) {
    res.render('MyPost');
});
router.get('/Posts', function (req, res) {
    res.render('Notification');
});
router.get('/Censorship', function (req, res, next) {
     res.render('Censorship');
});
router.get('/Accept', function (req, res) {
    res.redirect("/Censorship");
});

router.get('/Cancel', function (req, res) {
    res.redirect("/Censorship");
});
router.get('/Checkout', function (req, res, next) {
    res.render('CheckOut');
});

router.get('/Order', function (req, res, next) {
    res.render('Order');
});
router.get('/MyAution', function (req, res, next) {
    res.render('MyAution');
});
router.get('/AboutUs', function (req, res, next) {
    res.render('AboutUs');
});
router.get('/Delivery', function (req, res, next) {
    res.render('DeliveryInfo');
});
router.get('/Returnpolicy', function (req, res, next) {
    res.render('PolicyReturn');
});
router.get('/Privicypolicy', function (req, res, next) {
    res.render('PrivicyPolicy');
});
router.get('/Computer_Product', function (req, res, next) {
    res.render('Computer_Product');
});
router.get('/ShowAprrovedProduct', function (req, res, next) {
    res.render('ApprovedProduct');
});
router.get('/ShowProductKH', function (req, res, next) {
    res.render('ApprovedProduct');
});
router.get('/ShowProductCty', function (req, res, next) {
    res.render('ApprovedProduct');
});
module.exports = router;
