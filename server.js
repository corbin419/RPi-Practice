const express = require("express");
const app = express();
const fs = require("fs");

const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "rpi",
  port: 3306,
});

conn.connect(console.log("connect success!"));

app.get("/", function (req, res) {
  const sql = "SELECT * From rpi_data order by idrpi_data desc limit 5";
  const data = conn.query(sql, function (error, results, fields) {
    if (error) throw error(console.log("Error"));
    console.log(results);
    res.json(results);
  });
});

const server = app.listen(8081, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
