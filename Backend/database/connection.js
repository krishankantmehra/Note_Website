var mysql = require('mysql');

var con = mysql.createPool({
  host: "localhost",
  user: "loginManger",
  password: "asdfghjk",
  database: "login"
});


module.exports = con

