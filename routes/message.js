const express = require("express");
const {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} = require("../controllers/message");
const router = express.Router();
const response = require("../utils/response");
const uploadMiddleware = require("../utils/handleStorage");

router.get("/", async function (req, res) {
  try {
    const filterUser = req.query.user || null;

    const data = await getMessages(filterUser);
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

router.post("/", uploadMiddleware.single("file"), async function (req, res) {
  console.log(req.query);

  const data = await addMessage(
    req.body.user,
    req.body.message,
    req.body.chat,
    req.file
  );
  console.log("🚀 ~ file: message.js ~ line 24 ~ data", data);
  if (data) {
    response.success(req, res, 201, data);
  } else {
    response.error(req, res, 400, "Informacion invalida ");
  }
});

router.patch("/:id", async function (req, res) {
  const id = req.params.id;
  const message = req.body.message;
  const user = req.body.user;

  try {
    const data = await updateMessage(id, user, message);
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
      deleteMessage(req.params.id);
      response.success(req, res, 200, `usuario ${req.params.id} eliminado`);
    } else {
      response.error(req, res, 400, " algo ocurrio");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
