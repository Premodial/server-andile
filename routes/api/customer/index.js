const express = require('express');
const customerController = require('../../../controllers/customer.controller'); // Adjust the path as necessary

const router = express.Router();

router.post('/', customerController.createCustomer);
router.delete('/:customerId', customerController.deleteCustomer);

module.exports = router;
