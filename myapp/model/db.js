const mysql = require('mysql');

const mysql_setting = {
    host     : 'db_mysql',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'mysql-db',
};
var connection;
const getConnection = () => {
    connection = mysql.createConnection(mysql_setting);
    module.exports = connection;
}
getConnection();