const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const RouterHostpotAPI = express.Router();

const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'

})


//top 10 hostpot
RouterHostpotAPI.get('/hospot/top10', (req, res) => 
{
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT location, COUNT(*) AS incident_total FROM incident GROUP BY location ORDER BY incident_total DESC LIMIT 10', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // optional
            console.log('Top 10 location with reported Incident (hostpot) ', rows)
        })
    }) 
});


// from top to low
RouterHostpotAPI.get('/hospot/top2low', (req, res) => 
{
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT location, COUNT(*) AS incident_total FROM incident GROUP BY location ORDER BY incident_total DESC ', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // optional
            console.log('Top to low location with reported Incident (hostpot) ', rows)
        })
    })
});

//from low to high
RouterHostpotAPI.get('/hospot/low2top', (req, res) => 
{
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT location, COUNT(*) AS incident_total FROM incident GROUP BY location ORDER BY incident_total ', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // optional
            console.log('low to top location with reported Incident (hostpot) ', rows)
        })
    })
    
});

//lowest 10 hostpot
RouterHostpotAPI.get('/hospot/lowest10', (req, res) => 
{
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT location, COUNT(*) AS incident_total FROM incident GROUP BY location ORDER BY incident_total LIMIT 10', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // optional
            console.log('Lowest 10 location with reported Incident (hostpot) ', rows)
        })
    }) 
    
});

/*area reported most incident each day/ week/
RouterHostpotAPI.get('/hospot/area_with_mostIncident', (req, res) => 
{
    
} )*/


//most reported incident type top 10
RouterHostpotAPI.get('/hospot/top10TypeReportedIncident', (req, res) => 
{
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT incidentType, COUNT(*) AS incidentType_total FROM incident GROUP BY incidentType ORDER BY incidentType_total DESC LIMIT 5', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // optional
            console.log('Lowest 5 incident type with reported Incident (hostpot) ', rows)
        })
    }) 
    
});

//most reported incident type lowest 10
RouterHostpotAPI.get('/hospot/lowest10TypeReportedIncident', (req, res) => 
{
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT incidentType, COUNT(*) AS incidentType_total FROM incident GROUP BY incidentType ORDER BY incidentType_total  LIMIT 5', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // optional
            console.log('Lowest 5 incident type with reported Incident (hostpot) ', rows)
        })
    }) 
    
});

module.exports = RouterHostpotAPI;

