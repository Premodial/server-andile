const admin = require('../db/firebaseAdmin');
const db = admin.firestore();

/**
 * Creates a new product in the Firestore database.
 * 
 * @param {Object} productData - The data for the new product.
 * @returns {Object} - The created product along with its Firestore generated ID.
 */
exports.createProduct = async (productData) => {
    const docRef = await db.collection('products').add(productData);
    return { id: docRef.id, ...productData };
};

/**
 * Retrieves all products from the Firestore database.
 * 
 * @returns {Array} - An array of all products.
 */
exports.getProducts = async () => {
    const snapshot = await db.collection('products').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Retrieves a specific product using its ID.
 * 
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {Object|null} - The retrieved product or null if not found.
 */
exports.getProduct = async (productId) => {
    const productDoc = await db.collection('products').doc(productId).get();
    if (!productDoc.exists) {
        return null;
    }
    return { id: productDoc.id, ...productDoc.data() };
};

/**
 * Updates a product's data using its ID.
 * 
 * @param {string} productId - The ID of the product to update.
 * @param {Object} updatedData - The new data for the product.
 * @returns {Object} - The updated product data.
 */
exports.updateProduct = async (productId, updatedData) => {
    await db.collection('products').doc(productId).update(updatedData);
    return { id: productId, ...updatedData };
};

/**
 * Deletes a product using its ID.
 * 
 * @param {string} productId - The ID of the product to delete.
 */
exports.deleteProduct = async (productId) => {
    await db.collection('products').doc(productId).delete();
};

/**
 * Deletes multiple products using their IDs.
 * Utilizes Firestore's batched writes to group multiple delete operations together.
 * 
 * @param {Array} productIds - An array of product IDs to delete.
 */
exports.deleteProducts = async (productIds) => {
    try {
        const batch = db.batch();

        productIds.forEach(pid => {
            const productRef = db.collection('products').doc(pid);
            batch.delete(productRef);
        });

        await batch.commit();
        return { success: true, message: 'Products successfully deleted' };
    } catch (error) {
        throw new Error('Failed to delete products: ' + error.message);
    }
};
