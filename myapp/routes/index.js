var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mysql_setting = {
  host     : 'db_mysql',
  user     : 'root',
  password : 'root',
  database : 'mysql-db',
};
router.get('/', function(req, res, next) {
　var connection = mysql.createConnection(mysql_setting);
  connection.connect((error) => {
    if (error) {
      console.log(error);
    } 
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
