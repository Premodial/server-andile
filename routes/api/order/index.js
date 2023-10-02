const express = require('express');
const orderController = require('../../../controllers/order.controller');
const router = express.Router();

router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrder);
router.get('/customer/:customerId', orderController.getCustomerOrders);
router.post('/', orderController.createOrder);
router.put('/:orderId', orderController.updateOrder);
router.put('/:orderId', orderController.updateOrder);

module.exports = router;