const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {//all href goes here
    res.render('login');
    
})

router.get('/loginAdmin', (req, res) => {
    res.render('admin');
    
})

router.get('/register', (req, res) => {
    res.render('register');
    
})




module.exports = router;