const { findOne } = require("../Models/Message");
const Model = require("../Models/Message");
const { socket } = require("../socket");
const host = process.env.HOST;
async function addMessage(user, message, chat, file) {
  try {
    if (!user || !message || !chat) {
      console.error("[messageCroller] no hat usuario o menssaje");
      return;
    } else {
      let fileUrl = `${host}/files/${file.filename}`;

      const fullMessage = {
        chat: chat,
        user: user,
        message: message,
        file: fileUrl,
        date: new Date(),
      };

      const myMessage = new Model(fullMessage);
      myMessage.save();

      socket.io.emit("message", fullMessage);
      return fullMessage;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getMessages(filterUser) {
  try {
    let filter = {};
    if (filterUser != null) {
      filter = { user: filterUser };
    }

    const messages = await Model.find(filter)
      .populate("user")
      .populate("chat")
      .exec();

    return messages;
  } catch (error) {
    console.log(error);
  }
}

async function updateMessage(id, user, message) {
  try {
    if (!user || !message) {
      console.error("[messageControllerUpdate] no hat usuario o menssaje");
      return false;
    }
    const findMessage = await Model.findOne({ _id: id });

    findMessage.message = message;
    const newMessage = await findMessage.save();
    return newMessage;
  } catch (error) {}
}

async function deleteMessage(id) {
  try {
    const deletMessage = await Model.deleteOne({ _id: id });
    return deletMessage;
  } catch (error) {}
}
module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
