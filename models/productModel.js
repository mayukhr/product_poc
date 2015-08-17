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
}

var getProductsByCategory = function (req, res, callback) {
    var query = "SELECT p.product_name, c.category_name,p.product_price FROM product_categories pc " +
        "INNER JOIN products p ON p.product_id=pc.product_id " +
        "INNER JOIN categories c ON c.category_id=pc.category_id  " +
        "WHERE c.category_id = ?;";

    var table = [req.params.category_id];
    query = mysql.format(query,table);

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
}
exports.getProductsByCategory = getProductsByCategory;
exports.getProducts = getProducts;
