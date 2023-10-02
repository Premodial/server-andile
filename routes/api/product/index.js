const express = require('express');
const productController = require('../../../controllers/product.controller');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);
router.post('/deleteMany', productController.deleteProducts);  // new route for bulk delete


module.exports = router;
