const mysql = require('mysql');

function getConnection(){
    return mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    })
}

exports.registerUser = (req, res) => {
    const connection = getConnection();                        
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword){
        connection.query("SELECT * FROM users WHERE username = ? OR email = ? ",[username,email], (err, results,fields) => {
            if(results.length > 0) { //check niya kung may kapareho sa table
                const msg = "User Already Exist";
                return res.render('register', {message: msg})
            }
            
            else{
                connection.query("INSERT INTO users(username,password,firstName,lastName,email) VALUES(?,?,?,?,?)", [username,password,firstName,lastName,email], (err, rows,fields) => {
                    const msg = "Registration Successful";
                    res.render('login',{message: msg});
                })
            }
        })
    }

    else{
        const msg = "Passwords Do Not Match";
        return res.render('register', {message: msg})
    }
}

