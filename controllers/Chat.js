const Model = require("../Models/Chat");

async function addChat(users) {
  try {
    if (!users || !Array.isArray(users)) {
      console.error("[messageCroller] no hat usuario o menssaje");
      return;
    } else {
      const newChat = await new Model({ users });
      newChat.save();

      return newChat;
    }
  } catch (error) {
    console.log(error);
  }
}

async function listChats(user_id) {
  try {
    let filter = {};
    if (user_id != null) {
      filter = { users: user_id };
    }

    const users = await Model.find(filter).populate("users").exec();

    return users;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addChat,
  listChats,
};
