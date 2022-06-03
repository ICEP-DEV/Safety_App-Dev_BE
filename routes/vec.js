const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const { request } = require('express');

const pool = mysql.createPool({
    connectionLimit   :  10,
    host              : 'localhost',
    user              : 'root',
    password          : '',
    database          : 'gbv'

})

router.get('/api/view/', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        //console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM vec ORDER BY vec_id DESC', (err, rows) => 
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

router.get('/api/search/:vec_id', (req, res) => 
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

router.post('/api/post/', (req, res) => 
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

router.put('/api/update', (req, res) => 
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

router.delete('/api/delete/:vec_id', (req, res) => 
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

module.exports = router;
