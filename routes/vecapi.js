
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

//get all VEC chats
router.get('/api/v/', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM vec', (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                res.send(rows)
            } else 
            {
                console.log(err)
            }

            // optional
            console.log('The data from VEC table is : \n', rows)
        })
    })
})

//get specific VEC chats
router.get('/api/v/:vec_id', (req, res) => 
{

    const vec_id = request.params.vec_id;

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM vec WHERE vec_id = ?', vec_id, (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // optional
            console.log('The data from VEC table is : \n', rows)
        })
    })
})

//add VEC chat 
router.post('/api/r/', (req, res) => 
{

    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO vec SET ?', params, (err, rows) => 
        {
        connection.release() // return the connection to pool
        if (!err) 
        {
            res.send(`Successfully Added VEC` + params.name)
        } else 
        {
            console.log(err)
        }
        
        //optional
        console.log('VEC \n', rows)

        })
    })
});

module.exports = router;

