
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/vecapi');
const app = express();
const port = process.env.PORT || 5001

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//calling path
app.use('/',router);


//listing port.
app.listen(port,()=> console.log('listen on port '+ port))
