const express = require('express');
const router = express.Router();
const userController = require("../controllers/loginUser")

router.post('/userProfile',userController.login)


router.post("/", (req, res) => {
    res.redirect('/');
})

module.exports = router;