const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  nombre: String, // String is shorthand for {type: String}
  apellido: String,
});

const model = mongoose.model("User", UserSchema);
module.exports = model;
