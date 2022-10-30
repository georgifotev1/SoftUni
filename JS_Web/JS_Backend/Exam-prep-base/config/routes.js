const authController = require("../controllers/authController");
const homeController = require("../controllers/homeContoller");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
};
