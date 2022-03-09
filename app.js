
const express = require('express');
const bodyParser = require('body-parser');
const routerReportApi = require('./routes/reportapi');
const routerTestimonialApi = require('./routes/testimonial_api');
const routerVECApi = require('./routes/vecapi');





const app = express();
const port = process.env.PORT || 5001

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//calling path
app.use('/',routerReportApi);
app.use('/',routerTestimonialApi);
app.use('/',routerVECApi);


//Display on console log
//app.listen(port,()=> console.log('listen on port '+ port))
app.listen(port,() => console.log(`Server running on port: http://localhost:${port}`));





