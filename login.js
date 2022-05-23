const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app =express();
const port = 5001;

const connection = mysql.createConnection({
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/auth', function(request, response) {

	let user_id = request.body.user_id;
	let password = request.body.password;
	
	if (user_id && password) {
	
		connection.query('SELECT * FROM app_user WHERE user_id = ? AND password = ?', [user_id, password], function(error, results, fields) {
			
			if (error) throw error;
			if (results.length > 0) {
				
			  
				response.send('successful logged in')
		
			} else {
				response.send('Incorrect user_id and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter user_id and Password!');
		response.end();
	}
});


app.listen(port,()=>{
    console.log("running on port 5001")
})
