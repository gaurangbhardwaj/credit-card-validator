const express = require("express");
const Utils = require("./app/utils");
const { httpConstants, stringConstants } = require("./app/common/constants");
const Controller = require("./app/modules/credit-card/controller");

const app = express();
require("./config/express")(app);
require("dotenv").config();

app.get("/", (_, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

app.post("/validate-cc", new Controller().validateCreditCard);

class Server {
  static listen() {
    app.listen(process.env.PORT);
    Utils.logger(
      "listen",
      `Server Started on port ${process.env.PORT}`,
      {},
      "Gaurang",
      httpConstants.LOG_LEVEL_TYPE.INFO
    );
  }
}

Server.listen();

module.exports = app;
