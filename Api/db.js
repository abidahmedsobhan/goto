const mysql = require("mysql");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "goto",
});

module.exports = db;
