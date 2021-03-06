
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const routerGetTestimon = express.Router();

const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'

})

routerGetTestimon.get('/getchange/', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT testimonial_id, user,testimonial_descr,testimonial_date FROM testimonial ', (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                res.send(rows)
            } else 
            {
                console.log(err)
            }

            
            console.log('The data from testimonial table is : \n', rows)
        })
    })
} )


routerGetTestimon.get('/get/testimony/:testimonial_id', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM testimonial where testimonial_id = ?',[req.params.testimonial_id], (err, rows) => 
        {
            connection.release() // return the connection to pool
            if (!err) 
            {
                res.send(rows)
            } else 
            {
                console.log(err)
            }

            
            console.log('The data from testimonial table is : \n', rows)
        })
    })
} )

routerGetTestimon.put('/update/testimony/:testimonial_id', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {

        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        var status = req.body.status;
        var feedback = req.body.feedback;
       
        if (status =="approve") {
            var sql='update testimonial set status =?WHERE testimonial_id=?';
        connection.query(sql,[status,req.params.testimonial_id],(err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                console.log('Feedback Entered:')
                console.log('Status ',status)
                console.log('Feedback ',feedback,'\n')
             //   res.send(rows)
            } else 
            {
                console.log('Feedback did not go through: \n')
               console.log(err)
            }   
         
        })
    }else
    {
        var sql='update testimonial set status =?,feedback=? WHERE testimonial_id=?';
        connection.query(sql,[status,feedback,req.params.testimonial_id],(err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                console.log('Feedback Entered:')
                console.log('Status =',status)
                console.log('Feedback =',feedback,'\n')
                //   res.send(rows)
            } else 
            {
                console.log('Feedback did not go through: \n')
               console.log(err)
            }
        })
    }

    })


    
} )




module.exports = routerGetTestimon;

