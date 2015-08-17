/**
 * Created by Mayukhr on 13-08-2015.
 */

var connectionString = require('../utils.js').connectionString;
var pg = require('../utils.js').pg;

var getProducts = function (req, res, callback) {
    var query = "SELECT * FROM products";

    pg.connect(connectionString, function (err, client, done) {
        if(!err){
            client.query(query, function (err, result) {
                if(!err) {
                    callback(null, result.rows);
                }else{
                    callback(err, null);
                }
                done();
            });
        }else{
            callback(err, null);
        }
    });
};

var getProductsByCategory = function (req, res, callback) {
    var query = "SELECT p.product_id, p.product_name, c.category_name,p.product_price FROM product_categories pc " +
        "INNER JOIN products p ON p.product_id=pc.product_id " +
        "INNER JOIN categories c ON c.category_id=pc.category_id  " +
        "WHERE c.category_id = $1;";

    var table = [req.params.category_id];

    pg.connect(connectionString, function (err, client, done) {
        if(!err){
            client.query(query, table, function(err, result) {
                if(!err) {
                    callback(null, result.rows);
                }else{
                    callback(err, null);
                }
                done();
            });
        }else{
            callback(err, null);
        }
    });
};

var addProduct = function (req, res, callback) {
    pg.connect(connectionString, function (err, client, done) {
        if(!err) {
            client.query('INSERT INTO products(product_name, product_price) VALUES ($1, $2) RETURNING product_id',
                        [req.body.product_name, req.body.product_price], function (err, result) {
                if (err) {
                    res.json({"Error": true, "Message": err});
                } else {//res.json({"Error": false, "Message": result});
                    //create product_categories entry
                    client.query('INSERT INTO product_categories(category_id, product_id) VALUES ($1, $2)', [req.body.category_id, result.rows[0].product_id], function (err, result) {
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

exports.getProductsByCategory = getProductsByCategory;
exports.getProducts = getProducts;
exports.addProduct = addProduct;
