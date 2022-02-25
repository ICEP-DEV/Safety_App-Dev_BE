
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const router = express.Router();


//mySql connection 
const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'localhost',
    user              : 'root',
    password          : '',
    database          : 'GBV'

})

//Call
router.get('/v/', (req, res) => {
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

            // optional
            console.log('The data from reported Testimony table are: \n', rows)
        })
    })
})



router.post('/r/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO testimonial SET ?', params, (err, rows) => {
        connection.release() 
        if (!err) {
            res.send(`Successfully submitted the tesimony` + params.name)
        } else {
            console.log(err)
        }
        
        //optional
        console.log('Testimony \n', rows)

        })
    })
});

module.exports = router;

