const OrderService = require('../services/order');

/**
 * Creates a new order by invoking the respective service.
 * On successful order creation, sends a 201 status code with the order details.
 * If an error occurs, forwards the error to the next middleware.
 */
exports.createOrder = async (req, res, next) => {
    try {
        const order = await OrderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a specific order by its ID by invoking the respective service.
 * On successful retrieval, sends a 200 status code with the order details.
 * If the order isn't found, it will send a null or custom error response.
 * For other errors, it forwards the error to the next middleware.
 */
exports.getOrder = async (req, res, next) => {
    try {
        const order = await OrderService.getOrder(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

/**
 * Updates a specific order using its ID and provided update data.
 * On successful update, sends a 200 status code with the updated order details.
 * If an error occurs, forwards the error to the next middleware.
 */
exports.updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await OrderService.updateOrder(req.params.orderId, req.body);
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves all orders by invoking the respective service.
 * Sends a 200 status code with the list of all orders.
 * If an error occurs, forwards the error to the next middleware.
 */
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves all orders by invoking the respective service.
 * Sends a 200 status code with the list of all orders.
 * If an error occurs, forwards the error to the next middleware.
 */
exports.getCustomerOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getAllCustomerOrders(req.params.customerId);
        return res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};



