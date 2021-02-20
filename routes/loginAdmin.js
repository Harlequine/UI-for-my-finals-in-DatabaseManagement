const express = require('express');
const router = express.Router();
const adminController = require('../controllers/loginAdmin')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({path: './dbconnect.env'})
router.use(bodyParser.urlencoded({extended: false}));

function getConnection(){
    return mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    })
}

router.post('/admin',adminController.admin) 


router.post("/", (req, res) => {
    res.render('login');
})




module.exports = router;