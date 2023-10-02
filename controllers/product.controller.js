const productService = require('../services/product');

/**
 * Creates a new product in the system.
 * @returns {Object} - A JSON response with a 201 status code and the created product data.
 */
exports.createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).json(product);
    } catch (error) {
        // Forward any errors to the error-handling middleware
        return next(error);
    }
};

/**
 * Retrieves all products from the system.
 * @returns {Array} - A JSON array response containing all products.
 */
exports.getProducts = async (req, res, next) => {
    try {
        const products = await productService.getProducts();
        return res.status(200).json(products);
    } catch (error) {
        return next(error);
    }
};

/**
 * Retrieves a specific product by its ID.
 * @returns {Object} - A JSON response containing the product data.
 */
exports.getProduct = async (req, res, next) => {
    try {
        const product = await productService.getProduct(req.params.productId);
        if (!product) {
            // If the product is not found, raise an error
            throw new Error('Product not found.');
        }
        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
};

/**
 * Updates a specific product using its ID and provided update data.
 * @returns {Object} - A JSON response with the updated product data.
 */
exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.productId, req.body);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return next(error);
    }
};

/**
 * Deletes a product specified by its ID.
 * @returns {null} - A response with a 204 status code indicating successful deletion.
 */
exports.deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.productId);
        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
};

/**
 * Deletes multiple products specified by their IDs.
 * @returns {Object} - A JSON response indicating success and a corresponding message.
 */
exports.deleteProducts = async (req, res, next) => {
    try {
        await productService.deleteProducts(req.body.productIds);
        
        // Return a 200 status code with a success message.
        return res.status(200).json({
            success: true,
            message: 'Products successfully deleted'
        });
    } catch (error) {
        return next(error);
    }
};
