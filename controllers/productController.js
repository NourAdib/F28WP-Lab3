//Get all the products in the catalog
const getCatalogue = (request, response) => {
    const catalogServices = require('../services/productServices');
    catalogServices.searchService(function(err, rows) {
        //Send the returned data to the ejs file
        response.render('catalogue', { products: rows });
    });
};

//Get the product by it's ID
const getProductByID = (request, response) => {
    const catalogServices = require('../services/productServices');
    let reference = request.params.id;
    catalogServices.searchIDService(reference, function(err, rows) {
        //Send the returned data to the ejs file
        response.render('article', { product: rows });

    });
};

const getProductsByCategory = (request, response) => {
    const catalogServices = require('../services/productServices');
    let reference = request.params.category;
    catalogServices.searchCategoryService(category, function(err, rows) {
        response.json(rows);
        response.end();
    });
};

module.exports = {
    getCatalogue,
    getProductByID,
    getProductsByCategory
};