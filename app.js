

const express = require('express');
const bodyParser = require('body-parser');

// routes
const router = require('./routes/testimonial_api');
const router = require('./routes/reportapi');
const router = require('./routes/vecapi');
//if complain about this routes duplicate use this
//const router = require('./routes');


const app = express();
const port = process.env.PORT || 5001

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//calling path
app.use('/',router);


//Display on console log
//app.listen(port,()=> console.log('listen on port '+ port))
app.listen(port,() => console.log(`Server running on port: http://localhost:${port}`));





