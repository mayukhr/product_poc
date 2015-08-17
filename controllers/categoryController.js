/**
 * Created by Mayukhr on 13-08-2015.
 */
var categoryModel = require('../models').categoryModel;

var getAllCategories = function (req, res) {
    categoryModel.getCategories(req, res, function(err, result){
        if(!err) {
            //enable this for pure json response
            res.json({"Error": false, "Message": "Success", "Categories": result});
            //res.render('categoryList', { title: 'Category List Page', category_list:result });
        }else{
            res.json({"Error": true, "Message": err});
        }
    });
}

exports.getAllCategories = getAllCategories;
