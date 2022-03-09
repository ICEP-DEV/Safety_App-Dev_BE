

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const router = express.Router();

const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'localhost',
    user              : 'root',
    password          : '',
    database          : 'GBV'

})

router.get('/get/', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM testimonial', (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                res.send(rows)
            } else 
            {
                console.log(err)
            }

            
            console.log('The data from Testimony table is : \n', rows)
        })
    })
} )


router.post('/post/', (req, res) => 
{

    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO testimonial SET ?', params, (err, rows) => 
        {
        connection.release() 
        if (!err) 
        {
            res.send(`Successfully Added Testimony`)
        } else 
        {
            console.log(err)
        }
        
        //optional
        console.log('Testimony \n', rows)

        })
    })
});

module.exports = router;

