const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const app =express();
const port = 5001;

const connection = mysql.createConnection({
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'
});


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/auth', function(request, response) {

	let user_id = request.body.user_id;
	let password = request.body.password;
	
	if (user_id && password) {
	
		connection.query('SELECT * FROM app_user WHERE user_id = ? AND password = ?', [user_id, password], function(error, results, fields) {
			
			if (error) throw error;
			if (results.length > 0) {
				
				request.session.loggedin = true;
				request.session.user_id = user_id;
				response.send('successful loggrd in')
		
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


app.get('/session', function(request, response) {
	
	if (request.session.loggedin) {
		
		response.send('Welcome back, ' + request.session.user_id + '!');
	} else {
		
		response.send('Please login to view this page!');
	}
	response.end();
});


app.listen(port,()=>{
    console.log("running on port 5001")
})
