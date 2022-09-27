var mysql = require('mysql');

var con = mysql.createPool({
  host: "localhost",
  user: "loginManger Notes Website",
  password: "KrishanKantMehra",
  database: "loginNotes"
});


module.exports = con

