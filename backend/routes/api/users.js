const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Sign up

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name.'),
    check('firstName')
        .isLength({ min: 1, max: 50 })
        .withMessage('First Name must be less than 50 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name.'),
    check('lastName')
        .isLength({ min: 1, max: 50 })
        .withMessage('Last Name must be less than 50 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post('/', validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;
  const initialUser = await User.findOne({
    where: { email: email }
  })
  if (initialUser) {
    const err = new Error('User already exists')
    err.status = 403
    err.errors = { email: "User with that email already exists" }
    return next(err)
  }
  const user = await User.signup({ firstName, lastName, email, username, password });
  user.dataValues.token = await setTokenCookie(res, user);
  res.json(user);
}
);


module.exports = router;
