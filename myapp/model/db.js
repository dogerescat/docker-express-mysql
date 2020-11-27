const mysql = require('mysql');
require('dotenv').config()
const env = process.env
const mysql_setting = {
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
};
const getConnection = () => {
    const connection = mysql.createConnection(mysql_setting);
    module.exports = connection;
}
getConnection();