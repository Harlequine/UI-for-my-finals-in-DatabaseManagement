const express = require('express');
const router = express.Router();
const authController = require('../controllers/register')

router.post('/registerUser', authController.registerUser);

module.exports = router;