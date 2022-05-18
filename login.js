const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();


const connection = mysql.createConnection({
    connectionLimit   :10,
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'

});



connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.post("/userlogin",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from users where email = ? and password = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
           console.log("success");
        } else {
           console.log("failed");
        }
        res.end();
    })
})


// set app port 
app.listen(5001);
