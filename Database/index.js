const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

const config = {
    connectionLimit   : '10',
    host              : 'localhost',
    user              : 'root',
    password          : '',
    database          : 'GBV'
};

//mySql connection 
const pool = mysql.createPool(config);

module.exports = pool;