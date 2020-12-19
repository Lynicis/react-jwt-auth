const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.MYSQL_HNAME,
    user: process.env.MYSQL_UNAME,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DBNAME
});

connection.connect();

module.exports={
    db: connection
}