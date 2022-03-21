const express = require("express");
const fs = require("fs");
const app = express();
var cors = require("cors");
app.use(cors());
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "rpi",
  port: 3306,
});

conn.connect(console.log("connect success!"));
const test = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
let i=-1
app.get("/", function (req, res) {
  const sql = "SELECT * From rpi_data order by id desc limit 10";
  const data = conn.query(sql, function (error, results, fields) {
    if (error) throw error(console.log("Error"));
    console.log(test[i==19?i=0:++i]);
    res.json(results);
  });
});

const server = app.listen(8082, function () {
  const host = server.address().address;
  const port = server.address().port;
});

