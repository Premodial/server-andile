// validators/productValidator.js
const { body } = require('express-validator');

exports.productValidationRules = () => {
  return [
    body('name').isString().withMessage('Name must be a string'),
    body('description').isString().withMessage('Description must be a string'),
    body('price').isNumeric().withMessage('Price must be a number')
  ];
}
