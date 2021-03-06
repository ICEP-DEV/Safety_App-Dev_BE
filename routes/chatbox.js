const express = require('express');
const bodyParser = require('body-parser');
const routerChatBox = express.Router();

const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'

})

routerChatBox.get('/api/contacts/', (req, res) => 
{
  pool.getConnection((err, connection) => 
       {
          if(err) throw err
          console.log('connected as id ' + connection.threadId)
          connection.query('SELECT  name, surname, description FROM app_user, chat_box WHERE app_user.id = chat_box.user_id ', (err, rows) => 
          {
              connection.release() // return the connection to pool
  
              if (!err) 
              {
                  res.send(rows)
              } 
              else 
              {
                  console.log(err)
              }  
              console.log('The data from App user table is : \n', rows)
          })
      })
})

routerChatBox.get('/api/view/', (req, res) => 
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
            } 
            else 
            {
                console.log(err)
            }
        })
    })
})

routerChatBox.get('/api/search/:chat_id', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM chat_box WHERE chat_id = ?', [req.params.chat_id], (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                res.send(rows)
            } 
            else 
            {
                console.log(err)
            }
        })
    })
})

//add CHAT_BOX chat 
routerChatBox.post('/api/post/', (req, res) => 
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
            } 
            else 
            {
                console.log(err)
            }
        })
    })
})

routerChatBox.delete('/api/delete/:chat_id', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('DELETE FROM chat_box WHERE chat_id = ?', [req.params.chat_id], (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                res.send(rows)
            } 
            else 
            {
                console.log(err)
            }
        })
    })
})

module.exports = routerChatBox;
