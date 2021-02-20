//load our app server using express
const express = require('express');
const app = express();//main 
const path = require('path');//directory.
const morgan = require('morgan');
const bodyParser = require('body-parser');//for pages
const dotenv = require('dotenv');//hides database info to the public eye

app.use(bodyParser.urlencoded({extended: false}));//format page names to url

dotenv.config({path: './dbconnect.env'})// hide database credentials

const publicDirectory = path.join(__dirname, './public')// easily access files inside the public folder
app.use(express.static(publicDirectory));// shortens the directory. dont have to indicate the file path, only the file itself
app.use(morgan('short'));// codes in console
app.set('view engine','hbs')// allows us to view hbs files


app.use('/', require('./routes/pages'));//
app.use('/auth', require('./routes/auth'));//
app.use('/loginUser',require('./routes/loginUser'));//
app.use('/loginAdmin', require('./routes/loginAdmin'));//

//localhost:3000
app.listen(3000,() => {
    console.log("Connected to port 3000!")
});

