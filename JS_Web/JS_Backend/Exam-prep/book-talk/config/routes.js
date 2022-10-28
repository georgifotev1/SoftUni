const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");
const defaultController = require("../controllers/default");
const homeController = require("../controllers/homeContoller");
const profileController = require("../controllers/profileController");
const { hasUser } = require("../middlewares/guards");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/catalog", homeController);
  app.use("/auth", authController);
  app.use("/book", bookController);
  app.use("/profile", hasUser(), profileController);
  app.use("*", defaultController);
};
