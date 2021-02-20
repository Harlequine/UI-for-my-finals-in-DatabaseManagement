const express = require('express');
const router = express.Router();
const userController = require("../controllers/loginUser")

router.post('/userProfile',userController.login)


router.post("/", (req, res) => {
    res.render('login');
})

module.exports = router;