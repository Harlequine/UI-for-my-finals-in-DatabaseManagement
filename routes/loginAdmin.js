const express = require('express');
const router = express.Router();
const adminController = require('../controllers/loginAdmin')

router.post('/admin',adminController.admin) 

router.post("/", (req, res) => {
    res.redirect('/');
})

module.exports = router;