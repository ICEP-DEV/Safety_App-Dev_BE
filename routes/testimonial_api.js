
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const routerTestimonialAPI= express.Router();


//mySql connection 
const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'eu-cdbr-west-02.cleardb.net',
    user              : 'b51544d9260432',
    password          : 'dbd5ef6b',
    database          : 'heroku_44548bd383ff010'

})

//Call
routerTestimonialAPI.get('/v/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT user,testimonial_descr,testimonial_date from testimonial', (err, rows) => {
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



routerTestimonialAPI.post('/r/', (req, res) => {

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

module.exports = routerTestimonialAPI;

