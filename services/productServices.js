const productDAO = require('../db/productDAO');
const searchService = function(callback) {
    productDAO.findAll(function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) {
            console.log("No products!");
        } else {
            callback(null, rows);
        }
    });
};
const searchIDService = function(reference, callback) {
    productDAO.findByID(reference, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) {
            console.log("Unkown product!");
            let product = null;
            calback(null, product);
        } else {
            //rreturn the retrieved product 
            callback(null, rows[0]);
        }
    });
};
const searchCategoryService = function(category, callback) {
    productDAO.findByCategory(category, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) { //no products
            console.log(`No product in category ${category}!`);
            calback(null, rows);
        } else {
            //return the rows
            callback(null, rows);
        }
    });
};
module.exports = {
    searchIDService,
    searchService,
    searchCategoryService
};