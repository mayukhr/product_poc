/**
 * Created by Mayukhr on 13-08-2015.
 */
var utils = require('../utils.js');
var mysql = require('mysql');
var productModel = require('../models').productModel;

var getAllProducts = function (req, res) {
    productModel.getProducts(req, res, function(err, result){
        if(!err) {
            res.json({"Error": false, "Message": "Success", "Products": result});
        }else{
            res.json({"Error": true, "Message": err});
        }
    });
}

var getAllProductsByCategory = function (req, res) {
    productModel.getProductsByCategory(req, res, function(err, result){
        if(!err) {
            res.json({"Error": false, "Message": "Success", "Products": result});
        }else{
            res.json({"Error": true, "Message": err});
        }
    });
}

var addProduct = function (req, res) {
    utils.getConnection(function(err, connection) {
        if(!err) {
            connection.query('INSERT INTO products SET ?', {product_name: req.body.product_name, product_price: req.body.product_price}, function (err, result) {
                if (err) {
                    res.json({"Error": true, "Message": "Error executing MySQL query"});
                } else {
                    //create product_categories entry
                    connection.query('INSERT INTO product_categories SET ?', {category_id: req.body.category_id, product_id: result.insertId}, function (err, result) {
                        if (err) {
                            res.json({"Error": true, "Message": err});
                        } else {
                            res.json({"Error": false, "Message": "Successfully created new row!"});
                        }
                    });
                }
            });
        } else {
            res.json({"Error": true, "Message": err});
        }
    });
}

exports.getAllProducts = getAllProducts;
exports.getAllProductsByCategory = getAllProductsByCategory;
exports.addProduct = addProduct;