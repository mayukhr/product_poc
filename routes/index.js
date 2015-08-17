var express = require('express');
var router = express.Router();
var categoryController = require('../controllers').categoryController;
var productController = require('../controllers').productController;

//TODO: Change error response code

/* GET home page. */
router.get("/home", function(req, res, next) {
    res.render('home', { });
});



router.get("/allProducts", function(req,res){
    productController.getAllProducts(req, res);
});

router.get("/allCategories", function(req,res){
    categoryController.getAllCategories(req, res);
});

router.get("/getProducts/category/:category_id", function(req,res){
    productController.getAllProductsByCategory(req, res);
});

router.put("/products/add", function(req,res){
    productController.addProduct(req, res);
});

//curl -X PUT -d product_name='cosco ball' -d product_price=25 -d category_id=1 localhost:3000/products/add
/*router.put("/products/add",function(req,res){
    var query = "INSERT INTO products (product_name, product_price) VALUES (?, ?);" +
                "INSERT INTO product_categories (category_id, product_id) VALUES (?,?); ";

    connection.query('INSERT INTO products SET ?', {product_name:req.body.product_name, product_price:req.body.product_price}, function(err, result) {
        if (err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            //create product_categories entry
            connection.query('INSERT INTO product_categories SET ?', {category_id:req.body.category_id, product_id:result.insertId}, function (err, result){
                if(err) {
                    res.json({"Error" : true, "Message" : err});
                } else {
                    res.json({"Error" : false, "Message" : "Successfully created new row!"});
                }
            });
        }
        console.log(result.insertId);
    });
});

*/
module.exports = router;
