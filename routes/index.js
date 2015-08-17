var express = require('express');
var router = express.Router();
var categoryController = require('../controllers').categoryController;
var productController = require('../controllers').productController;

//TODO: Change error response code

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render('home', { });
});

router.get("/allCategories", function(req,res){
    categoryController.getAllCategories(req, res);
});

router.get("/allProducts", function(req,res){
    productController.getAllProducts(req, res);
});

router.get("/getProducts/category/:category_id", function(req,res){
    productController.getAllProductsByCategory(req, res);
});

router.put("/products/add", function(req,res){
    productController.addProduct(req, res);
});

module.exports = router;
