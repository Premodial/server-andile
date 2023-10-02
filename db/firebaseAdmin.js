// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://soco-app-e27a0.appspot.com' // replace <project-id> with your Firebase project ID
});

module.exports = admin;
