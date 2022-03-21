const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "rpi",
  port: 3306,
});

conn.connect(console.log("connect success!"));

const mqtt = require("mqtt");

const host = "192.168.168.109";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const io = require("socket.io");
const express = require("express");
const app = express();
app.use(express.static("www"));
const server = app.listen(5438);

const sio = io.listen(server);

const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "pi",
  password: "00000000",
  reconnectPeriod: 1000,
});

const topic = "Try/MQTT";
client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
});

client.on("message", function (topic, msg) {
  msg = msg.toString();
  msg = JSON.parse(msg);
  console.log(msg);
  sio.emit("mqtt", { msg: msg.toString() });
  const sql =
    "INSERT INTO rpi_data(Time,Temperature,humidity) VALUE ('" +
    msg.Time +
    "'," +
    msg.Temperature +
    "," +
    msg.Humidity +
    ")";
  conn.query(sql, function (error, results, fields) {
    if (error) throw error(console.log("Error"));
  });
});

sio.on("connection", function (socket) {
  socket.emit("sio", { msg: "data" });
});
