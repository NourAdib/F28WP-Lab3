const express = require('express');
const productController = require('../controllers/productController');
const catalogServices = require('../services/productServices');

//define a router and create routes
const router = express.Router();

//routes for dynamic processing of products
//-----------------------------------------------
//route for listing all products
router.get('/api/catalog', productController.getCatalogue);
//router.get('/api/article/:id', productController.getProductByID);
router.get('/api/article/:id', (req, res) => {
    console.log(req.params.id)
    catalogServices.searchIDService(req.params.id, function(err, rows) {
        res.render('article', { product: rows });

    });
});

//export router
module.exports = router;