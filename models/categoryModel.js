/**
 * Created by Mayukhr on 13-08-2015.
 */
var utils = require('../utils.js');

var getCategories = function (req, res, callback) {
    var query = "SELECT * FROM categories";
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

exports.getCategories = getCategories;
