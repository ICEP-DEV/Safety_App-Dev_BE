
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const routerReportApi = express.Router();


//mySql connection 
const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'

})


//get all reported incident

routerReportApi.get('/viewreport/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT * from incident', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // optional
            console.log('The data from reported incident table are: \n', rows)
        })
    })
})

//report an incident

routerReportApi.post('/reportincident/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO incident SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Successfully reported incident type` + params.name)
        } else {
            console.log(err)
        }
        
        //optional
        console.log('Rported Incident:11 \n', rows)

        })
    })
});

module.exports = routerReportApi;
