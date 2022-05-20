const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var con = require('./Database/conn');
var session = require('express-session');
//const http =require('http')
const cors = require('cors');
var con = require('./Database/conn');
var session = require('express-session')

//chat socket
const routerChatBox = require('./routes/chatbox')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.json())

const routerReportApi = require('./routes/reportapi');
const routerTestimonialApi = require('./routes/testimonial_api');
//const routerChatBoxApi = require('./routes/chatbox');
const RouterHostpotAPI = require('./routes/hostpotIncidentAPI');
//const routerFind =require('./routes/user_registration');
const routerInfoCentreAPI = require('./routes/infocentre');
const routerGetTestimon = require('./routes/get_testimony');
const routerVEC = require('./routes/vec');
const routerRegistration = require('./routes/user_registration');
const routerUsers = require('./routes/users');




const port = process.env.PORT || 5001

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret : 'mikeySession',
    resave : false,
    saveUninitialized : true
  }));
  
  app.use(logger('dev'));
  app.use(cookieParser());
  
  

//calling path
app.use('/',routerReportApi);
app.use('/',routerTestimonialApi);
//app.use('/',routerChatBoxApi);
app.use('/',RouterHostpotAPI);
//app.use('/',routerFind);
app.use('/',routerInfoCentreAPI);
app.use('/',routerGetTestimon);
//app.use('/',routerUserReg);
app.use('/',routerVEC);
app.use('/',routerChatBox)
app.use('/',routerRegistration);
app.use('/',routerUsers);

//Display on console log
//app.listen(port,()=> console.log('listen on port '+ port))
app.listen(port,() => console.log(`Server running on port: http://localhost:${port}`));





