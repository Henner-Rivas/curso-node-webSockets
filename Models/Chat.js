const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }], // String is shorthand for {type: String}
});

const model = mongoose.model("Chat", ChatSchema);
module.exports = model;
