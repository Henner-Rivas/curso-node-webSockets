const express = require("express");
const { listChats, addChat } = require("../controllers/Chat");
const router = express.Router();
const response = require("../utils/response");

router.get("/:idUser", async function (req, res) {
  try {
    const filterUser = req.params.idUser || null;

    const data = await listChats(filterUser);
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

  const data = await addChat(req.body.users);
  console.log("🚀 ~ file: Chat.js ~ line 29 ~ data", data);
  if (data) {
    response.success(req, res, 201, data);
  } else {
    response.error(req, res, 400, "Informacion invalida ");
  }
});

module.exports = router;
