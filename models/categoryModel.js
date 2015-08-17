/**
 * Created by Mayukhr on 13-08-2015.
 */
var connectionString = require('../utils.js').connectionString;
var pg = require('../utils.js').pg;

var getCategories = function (req, res, callback) {
    var query = "SELECT * FROM categories";

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
exports.getCategories = getCategories;
