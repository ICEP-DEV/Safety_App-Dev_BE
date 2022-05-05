const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

const router = require('./routes/vec')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/',router)

app.use(express.json())



const port = process.env.PORT || 5001

app.listen(port, '0.0.0.0', () =>
{
    console.log(`Server running on port: http://localhost:${port}`);
})
 