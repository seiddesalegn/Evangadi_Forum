const mysql = require("mysql2");

const db = mysql.createPool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: "localhost",
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
  // port: process.env.DB_PORT,
});

module.exports = db.promise();
