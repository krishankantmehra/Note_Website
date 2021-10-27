var mysql = require('mysql');

var con = mysql.createPool({
  host: "localhost",
  user: "loginManger",
  password: "asdfghjk"
});


module.exports = con

