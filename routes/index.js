const message = require("./message");
const user = require("./user");
const chat = require("./chat");

const routes = function (server) {
  server.use("/mensaje", message);
  server.use("/user", user);
  server.use("/chat", chat);
};

module.exports = routes;
