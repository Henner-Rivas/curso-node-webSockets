const express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
const router = require("./routes/index");

const path = require("path");
const dbConnect = require("./config/conexion");

const port = 3000;

app.listen(port, function (req, res) {
  console.log("estoy corriendo en el puerto " + port);
});

dbConnect();
app.use(express.static(path.join(__dirname, "public")));
router(app);
