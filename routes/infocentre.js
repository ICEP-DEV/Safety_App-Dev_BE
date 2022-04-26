
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const routerInfoCentreAPI = express.Router();


//mySql connection 
const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'

})


//view safety event
routerInfoCentreAPI.get('/viewevent', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
     connection.query( "SELECT title,description, date FROM information_centre WHERE type ='event'", (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        
        })
    })
})

//create event
routerInfoCentreAPI.post('/createevent/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO information_centre  SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(` Safety event added`)
        } else {
            console.log(err)
        }

        })
    })
});

//view safety information
routerInfoCentreAPI.get('/viewsafetyinfo/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query("SELECT title,description FROM information_centre WHERE type ='safety'", (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        
        })
    })
})

//create safty information
routerInfoCentreAPI.post('/createsafetyinfo/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO safety_information SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Safety info added`)
        } else {
            console.log(err)
        }

        })
    })
});
module.exports = routerInfoCentreAPI;
