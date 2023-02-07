const express = require('express');
const router = express.Router();
const {profile} = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');

router
  .get('/profile', checkToken, profile);

module.exports = router;
