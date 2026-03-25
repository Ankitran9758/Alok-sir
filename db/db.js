const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root@1",
  database: "nodep1"
});

db.connect((err) => {
  if (err) throw err;
  console.log("DB Connected");
});

module.exports = db;