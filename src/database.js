const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: 'freedb.tech',
  user: 'freedbtech_covidDB',
  password: 'password',
  database: "freedbtech_covidDB",
  multipleStatements: true,
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("db is connected");
  }
});

module.exports = mysqlConnection;
