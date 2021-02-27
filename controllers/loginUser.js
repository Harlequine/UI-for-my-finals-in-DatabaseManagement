const mysql = require('mysql');

function getConnection(){
    return mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    })
}

exports.login = (req, res) => { 
    const connection = getConnection();
    const username = req.body.username;
    const password = req.body.password;

    connection.query("SELECT * FROM users WHERE username = ? AND password = ?", [username,password],(err, results,fields) => {
        if(results.length > 0) {
            connection.query("SELECT `id` FROM `users` WHERE `username` = ?", [username],(err, results,fields) => {
                const idd = Number(JSON.parse(JSON.stringify(results[0].id)));
                connection.query("INSERT INTO log (`id`,`username`) VALUES(?,?)",[idd,username], (err, results,fields) => {
                    connection.query("SELECT `firstName`,`lastName`,`email` FROM `users` WHERE `username` = ?", [username], (err, rows,fields) => {
                        if(!!err){
                            console.log("login fail");
                        }
                        else{
                            rows = Object.values(JSON.parse(JSON.stringify(rows)));
                            res.render('landingpage',{username, result : rows[0].firstName, result2 : rows[0].lastName, result3 : rows[0].email})
                            console.log(`${username} has logged in.`)
                        }
                    })
            })
        })

        }
        else{
            const msg = "Incorrect Username or Password";
            return res.render('login', {message: msg})
        }

    })
}
