const admin = require('../db/firebaseAdmin');
const db = admin.firestore();
const orderCollection = db.collection('order');

/**
 * Creates a new order in the Firestore database.
 * @param {Object} orderData - Data of the order to be created.
 * @returns {Object} - The created order along with its Firestore generated ID.
 */
exports.createOrder = async (orderData) => {
    const orderRef = await orderCollection.add(orderData);
    const order = await orderRef.get();
    return { id: order.id, ...order.data() };
};

/**
 * Fetches an order from the Firestore database using its ID.
 * @param {string} orderId - ID of the order to be fetched.
 * @returns {Object|null} - The fetched order or null if not found.
 */
exports.getOrder = async (orderId) => {
    console.log('getOrder', orderId);
    const order = await orderCollection.doc(orderId).get();
    if (!order.exists) return null;
    return { id: order.id, ...order.data() };
};

/**
 * Updates an order in the Firestore database using its ID.
 * @param {string} orderId - ID of the order to be updated.
 * @param {Object} updateData - Data to be updated.
 * @returns {Object} - The updated order.
 */
exports.updateOrder = async (orderId, updateData) => {
    await orderCollection.doc(orderId).update(updateData);
    const updatedOrder = await orderCollection.doc(orderId).get();
    return { id: updatedOrder.id, ...updatedOrder.data() };
};

/**
 * Fetches all orders from the Firestore database.
 * @returns {Array} - An array of all orders.
 */
exports.getAllOrders = async () => {
    const orders = [];
    const snapshot = await orderCollection.get();
    snapshot.forEach(doc => {
        orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
};


/**
 * Fetches all orders for a specific customer from the Firestore database.
 * @param {string} customerId - The ID of the customer whose orders you want to fetch.
 * @returns {Array} - An array of all orders for the given customer.
 */
exports.getAllCustomerOrders = async (customerId) => {
    // Initialize an empty array to hold the orders related to the provided customer ID.
    const customerOrders = [];
    
    // Query the Firestore database for orders that match the provided customer ID.
    const snapshot = await orderCollection.where('customerId', '==', customerId).get();
    
    // Iterate over the results and populate the customerOrders array.
    snapshot.forEach(doc => {
        customerOrders.push({ id: doc.id, ...doc.data() });
    });

    // Return the array of orders.
    return customerOrders;
};
