const authController = require("../controllers/authController");
const cryptoController = require("../controllers/cryptoController");
const defaultController = require("../controllers/defaultController");
const homeController = require("../controllers/homeContoller");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/crypto", cryptoController);
  app.use("/auth", authController);
  app.use("*", defaultController);
};
