const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

app.use(bodyParser.urlencoded({extended: false}));

dotenv.config({path: './dbconnect.env'})

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));
app.set('view engine','hbs')


app.use('/', require('./routes/pages'));
app.use('/register', require('./routes/register'));
app.use('/loginUser',require('./routes/loginUser'));
app.use('/loginAdmin', require('./routes/loginAdmin'));


app.listen(3000,() => {
    console.log("Connected to port 3000!")
});

