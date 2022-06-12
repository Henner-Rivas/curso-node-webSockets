const express = require("express");
const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const router = express.Router();
const response = require("../utils/response");

router.get("/", async function (req, res) {
  try {
    const filterUser = req.query.nombre || null;

    const data = await getUsers(filterUser);
    res.header({
      Lunes: "false",
    });

    if (req.query.error == "ok") {
      response.error(req, res, 500, "error inesperado ");
    } else {
      response.success(req, res, 201, data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async function (req, res) {
  console.log(req.query);

  const data = await addUser(req.body.nombre, req.body.apellido);
  console.log("🚀 ~ file: message.js ~ line 24 ~ data", data);
  if (data) {
    response.success(req, res, 201, data);
  } else {
    response.error(req, res, 400, "Informacion invalida ");
  }
});

router.patch("/:id", async function (req, res) {
  const id = req.params.id;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;

  try {
    const data = await updateUser(id, nombre, apellido);
    if (data) {
      response.success(req, res, 200, data);
    } else {
      response.error(req, res, 400, "Informacion invalida ");
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    if (req.params.id) {
      deleteUser(req.params.id);
      response.success(req, res, 200, `usuario ${req.params.id} eliminado`);
    } else {
      response.error(req, res, 400, " algo ocurrio");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
