// controllers/customerController.js

const CustomerService = require('../services/customer');

/**
 * Creates a new customer in the system.
 * @returns {Object} - A JSON response with a 201 status code and the created customer data.
 */
exports.createCustomer = async (req, res, next) => {
    try {
        const customer = await CustomerService.createCustomer(req.body);
        return res.status(201).json(customer);
    } catch (error) {
        // Forward any errors to the error-handling middleware
        return next(error);
    }
};

/**
 * Deletes a customer specified by its ID.
 * @returns {null} - A response with a 204 status code indicating successful deletion.
 */
exports.deleteCustomer = async (req, res, next) => {
    try {
        await CustomerService.deleteCustomer(req.params.id);
        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
};
