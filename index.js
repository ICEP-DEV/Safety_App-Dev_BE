const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

const app = express()
const port = process.env.PORT || 5003

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//mySql connection 
const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'localhost',
    user              : 'root',
    password          : '',
    database          : 'GBV'

})
//http://localhost:5003/r/

app.get('/v/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from testimonial', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

       
            console.log('The data from testimony table is : \n', rows)
        })
    })
})


app.post('/r/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO testimonial SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Successfully Added Testimony` + params.name)
        } else {
            console.log(err)
        }
        

        console.log('Testimony \n', rows)

        })
    })
});
//app.listen(port,()=> console.log('listen on port '+ port))
app.listen(port,() => console.log(`Server running on port: http://localhost:${port}`));