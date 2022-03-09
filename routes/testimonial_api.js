

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const routerTestimonialApi = express.Router();

const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'eu-cdbr-west-02.cleardb.net',
    user              : 'b51544d9260432',
    password          : 'dbd5ef6b',
    database          : 'heroku_44548bd383ff010'

})

routerTestimonialApi.get('/get/', (req, res) => 
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


routerTestimonialApi.post('/post/', (req, res) => 
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

module.exports = routerTestimonialApi;

