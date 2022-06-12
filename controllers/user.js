const UserModel = require("../Models/User");

async function addUser(nombre, apellido) {
  try {
    if (!nombre || !apellido) {
      console.error("[userController] nombre vacio");
      return;
    } else {
      const fullNombre = {
        nombre,
        apellido,
        date: new Date(),
      };
      const myDatos = new UserModel(fullNombre);
      myDatos.save();

      return fullNombre;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUsers(filterUser) {
  try {
    let filter = {};
    if (filterUser != null) {
      filter = { user: filterUser };
    }

    const messages = await UserModel.find(filter);

    return messages;
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(id, nombre, apellido) {
  try {
    if (!nombre || !apellido) {
      console.error("[userControllerUpdate] no hat usuario o menssaje");
      return false;
    }
    const findMessage = await UserModel.findOne({ _id: id });

    findMessage.nombre = nombre;
    const newMessage = await findMessage.save();
    return newMessage;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    const deleteUser = await UserModel.deleteOne({ _id: id });
    return deleteUser;
  } catch (error) {}
}
module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
};
