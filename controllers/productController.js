const getCatalogue = (request, response) => {
    const catalogServices = require('../services/productServices');
    catalogServices.searchService(function(err, rows) {
        response.render('catalogue', { products: rows });
    });
};

const getProductByID = (request, response) => {
    const catalogServices = require('../services/productServices');
    let reference = request.params.id;
    catalogServices.searchIDService(reference, function(err, rows) {
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