const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  chat: {
    type: Schema.ObjectId,
    ref: "Chat",
  },
  file: String,
  date: Date,
  message: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Message", MessageSchema);
module.exports = model;
