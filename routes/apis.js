const express = require('express');
const productController = require('../controllers/productController');

//define a router and create routes
const router = express.Router();

//routes for dynamic processing of products
//-----------------------------------------------
//route for listing all products
router.get('/api/catalog', productController.getCatalogue);
router.get('/api/article/:id', productController.getProductByID);

//export router
module.exports = router;