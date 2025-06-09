const mysql = require("mysql2");

const db = mysql.createPool({
  user: "evangdi_forum",
  database: "evangdi_forum",
  host: "localhost",
  password: "123456",
  connectionLimit: 10,
});

module.exports = db.promise();
