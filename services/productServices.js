const productDAO = require('../db/productDAO');

//Search the DB for all the products
const searchService = function(callback) {
    productDAO.findAll(function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) {
            console.log("No products!");
        } else {
            //Call the callback method and pass it the data returned
            callback(null, rows);
        }
    });
};

//Search the DB for a specific product
const searchIDService = function(reference, callback) {
    productDAO.findByID(reference, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) {
            console.log("Unkown product!");
            let product = null;
            callback(null, product);
        } else {
            //Call the callback method and pass it the data returned 
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