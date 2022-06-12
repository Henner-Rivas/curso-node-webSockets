const express = require("express");
var app = express();
const cors = require("cors");
const server = require("http").Server(app);
const socket = require("./socket");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
socket.connect(server);
const router = require("./routes/index");
app.use(cors());
const path = require("path");
const dbConnect = require("./config/conexion");

const port = 3000;

server.listen(port, function (req, res) {
  console.log("estoy corriendo en el puerto " + port);
});

dbConnect();
app.use(express.static(path.join(__dirname, "public")));
router(app);
/* 
io.on("connection", function (socket) {
  console.log("nuevo Cliente conectado");
  socket.emit("mensaje", "Bienvendo");
}); */
