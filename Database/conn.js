var mysql = require('mysql');

var con = mysql.createConnection({

    host              : 'us-cdbr-east-05.cleardb.net',
    user              : 'b87509edf31e02',
    password          : '6bcccaf8',
    database          : 'heroku_51fff333e21b873'
});

module.exports = con;
