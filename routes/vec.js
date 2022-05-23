const express = require('express');
const bodyParser = require('body-parser');
const routerVEC = express.Router();

const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const { request } = require('express');

//mySql connection 
const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'

})

routerVEC.get('/api/view/', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        //console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM vec', (err, rows) => 
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

routerVEC.get('/api/search/:vec_id', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
       //console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM vec WHERE vec_id = ?', [req.params.vec_id], (err, rows) => 
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

routerVEC.post('/api/post/', (req, res) => 
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
            res.send(`VEC with Name : ${params.employee_name} has been added.`)
            } 
            else 
            {
            console.log(err)
            }
        })
    })
})

routerVEC.put('/api/update', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        const {vec_id, employee_name, contact_num, office_num, chat_id, email, surname, DOB} = req.body

        connection.query('UPDATE vec SET employee_name = ?, contact_num = ?, office_num = ?, chat_id = ?, email = ?, surname = ?, DOB = ? WHERE vec_id = ?', [employee_name, contact_num, office_num, chat_id, email, surname, DOB, vec_id], (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                res.send(`VEC with the name : ${employee_name} has been updated.`)
            }
            else 
            {
                console.log(err)
            }
        })
    })
})

routerVEC.delete('/api/delete/:vec_id', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('DELETE FROM vec WHERE vec_id = ?', [req.params.vec_id], (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                res.send(`VEC with Record ID : ${[req.params.vec_id]} has been deleted.`)
            }
            else 
            {
                console.log(err)
            }
        })
    })
})

module.exports = routerVEC;