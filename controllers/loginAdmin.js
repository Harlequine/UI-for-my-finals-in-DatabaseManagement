const mysql = require('mysql');

function getConnection(){
    return mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    })
}


exports.admin = (req, res) => {
    const connection = getConnection();
    const username = req.body.username;
    const password = req.body.password;

    connection.query("SELECT * FROM admin WHERE username = ? AND password = ?",[username,password], (err, results,fields) => {
        if(results.length > 0) {
            console.log("welcome admin");
            connection.query("SELECT * FROM log", (err, results,fields) => {
                res.render('landingpageAdmin',{results});
            })
            
        }
        else{
            const msg = "Incorrect Username or Password";
            return res.render('admin', {message: msg})
        }
    })
}