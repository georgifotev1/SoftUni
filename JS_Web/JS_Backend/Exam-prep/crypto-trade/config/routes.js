const authController = require("../controllers/authController");
const defaultController = require("../controllers/defaultController");
const homeController = require("../controllers/homeContoller");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("*", defaultController);
};
