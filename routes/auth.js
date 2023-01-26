const express = require('express');
const router = express.Router();
const {register, login, checked, sendToken, verifyToken, changePass} = require('../controllers/authController')

router
  .post('/register', register)
  .post('/login', login)
  .get('/checked', checked)
  .post('/sendToken', sendToken)
  .route('/reset-Pass')
    .get(verifyToken)
    .post( changePass)

module.exports = router;
