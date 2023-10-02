// services/customer.js

const admin = require('../db/firebaseAdmin');
const db = admin.firestore();

/**
 * Creates a new customer in the Firebase Firestore database.
 * @param {Object} customerData - Data for the new customer.
 * @returns {Object} - The newly created customer with its ID.
 */
exports.createCustomer = async (customerData) => {
    const docRef = await db.collection('customers').add(customerData);
    return { id: docRef.id, ...customerData };
};

/**
 * Deletes a customer from the Firebase Firestore database using its ID.
 * @param {string} customerId - The ID of the customer to be deleted.
 */
exports.deleteCustomer = async (customerId) => {
    await db.collection('customers').doc(customerId).delete();
};
