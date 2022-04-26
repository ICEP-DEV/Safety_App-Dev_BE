const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const routerVECApi = express.Router();


//mySql connection 
const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'

})



//get all CHAT_BOX chats
routerVECApi.get('/api/viewchat/', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM chat_box', (err, rows) => 
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
            console.log('The data from CHAT_BOX table is : \n', rows)
        })
    })
} )


//add CHAT_BOX chat 
routerVECApi.post('/api/postchat/', (req, res) => 
{

    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO chat_box SET ?', params, (err, rows) => 
        {
        connection.release() // return the connection to pool
        if (!err) 
        {
            res.send(`Successfully Added CHAT_BOX` + params.name)
        } else 
        {
            console.log(err)
        }
        
        //optional
        console.log('CHAT_BOX \n', rows)

        })
    })
});


module.exports = routerVECApi;
