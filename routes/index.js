var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var con = require('../conn/conn');



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const pool = mysql.createPool({
  connectionLimit   :10,
  host              : 'localhost',
  user              : 'root',
  password          : '',
  database          : 'gbv'

})

router.get('/get/', (req, res) => 
{
  var fullname = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  var stNum = req.body.user_id;
  var surname = req.body.surname;
  var contact = req.body.trusted_contact;
  var oContact = req.body.other_contact;
  var address = req.body.address;
  var gender = req.body.gender;
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM app_user', (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                res.send(rows)
            } else 
            {
                console.log(err)
            }  
            console.log('The data from App user table is : \n', rows)
        })
    })
} )

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Handle POST request for User Registration
router.post('/auth_reg', function(req, res, next){

  var fullname = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  var stNum = req.body.user_id;
  var surname = req.body.surname;
  var contact = req.body.trusted_contact;
  var oContact = req.body.other_contact;
  var address = req.body.address;
  var gender = req.body.gender;



    var sql = 'select * from app_user where user_id = ?;';

    con.query(sql,[stNum], function(err, result, fields){
      if(err) throw err;

      if(result.length > 0){
      
        console.log('User already registered : \n')
      //  res.redirect('/');
      }else{

        var hashpassword = bcrypt.hashSync(password, 10);
  
     var sql = 'insert into app_user(user_id,surname,name,other_contact,gender,address,trusted_contact,email,password) values(?,?,?,?,?,?,?,?,?);'
        con.query(sql,[stNum,surname,fullname,oContact,gender,address,contact,email,hashpassword], function(err, result, fields){
          
          if(err) throw err;
          console.log('Account registered : \n')
       //   res.redirect('/');
        });
      }
    });
});
module.exports = router;
