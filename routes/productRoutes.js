const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add-product', productController.addProduct);
router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getSingleProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

router.post('/cart', productController.addToCart);
router.post('/cart-delete', productController.deleteCartItem);

module.exports = router;