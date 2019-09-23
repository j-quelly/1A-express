import { check } from 'express-validator';

// TODO: custom validator for username
// TODO: custom validator for email
export const validateCreateCompany = () => {
  return [
    check('username')
      .not()
      .isEmpty(),
    check('password')
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
    check('email', 'Must be a valid email address').isEmail(),
    check('name')
      .not()
      .isEmpty(),
    check('phone')
      .not()
      .isEmpty(),
    check('company_category_id')
      .not()
      .isEmpty()
      .isInt()
  ];
};

export const validateUpdateCompany = () => {
  return [
    check('name')
      .not()
      .isEmpty(),
    check('phone')
      .not()
      .isEmpty(),
    check('email', 'Must be a valid email address').isEmail(),
    check('company_category_id')
      .not()
      .isEmpty()
      .isInt()
  ];
};
