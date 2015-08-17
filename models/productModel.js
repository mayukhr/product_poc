/**
 * Created by Mayukhr on 13-08-2015.
 */

var utils = require('../utils.js');
var mysql = require('mysql');

var getProducts = function (req, res, callback) {
    var query = "SELECT * FROM products";
    utils.getConnection(function(err, connection){
        if(!err){
            connection.query(query , function(err, rows) {
                if(!err) {
                    callback(null, rows);
                }else{
                    callback(err, null);
                }
                connection.release();

            });
        }else{
            callback(err, null);
        }
    });
}

var getProductsByCategory = function (req, res, callback) {
    var query = "SELECT p.product_name, c.category_name,p.product_price FROM product_categories pc " +
        "INNER JOIN products p ON p.product_id=pc.product_id " +
        "INNER JOIN categories c ON c.category_id=pc.category_id  " +
        "WHERE c.category_id = ?;";

    var table = [req.params.category_id];
    query = mysql.format(query,table);

    utils.getConnection(function(err, connection){
        if(!err){
            connection.query(query , function(err, rows) {
                if(!err) {
                    callback(null, rows);
                }else{
                    callback(err, null);
                }
                connection.release();

            });
        }else{
            callback(err, null);
        }
    });
}
exports.getProductsByCategory = getProductsByCategory;
exports.getProducts = getProducts;
