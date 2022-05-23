const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const routerLoginAPI = express.Router();
var bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'
});


routerLoginAPI.post('/auth', function(request, response) {

	const user_id = request.body.user_id;
	const password = request.body.password;

	if (user_id && password) {

		
	
		connection.query('SELECT * FROM app_user WHERE user_id = ?', [user_id], function(error, results, fields) {
			
			if (error) throw error;
			if (results.length > 0) {

				var hashedPassword = (results[0].password);
				
				const validPassword = bcrypt.compareSync(password,hashedPassword);
				if(validPassword){
					response.send('successful logged in')
			      
				}else{
					response.send("enter valid password")
				}
			} else {
				response.send('user not found');
			}			
			response.end();
		});
		
	} else {
		response.send('Please enter user_id and Password!');
		response.end();
	}
});

routerLoginAPI.put('/update/password/:user_id',function(request,response){
	
  const user_id = request.body.user_id;
  const password =request.body.password;
  

  connection.query('SELECT * FROM app_user WHERE user_id = ?', [user_id], function(error, results, fields) {
	//checking the if user exist
	if (error) throw error;
	if (results.length > 0){

		var tableId = results[0].id;
		var hasNewPassword =  bcrypt.hashSync(password, 10);
     
		connection.query('UPDATE app_user SET password=?  WHERE  id= ?',[hasNewPassword,tableId],function(error, results, fields){
            if (error) throw error;
			response.send("password successfully update");
		})

	}else{
		response.send("the user don't exists!");
	}

  });


});


module.exports = routerLoginAPI;