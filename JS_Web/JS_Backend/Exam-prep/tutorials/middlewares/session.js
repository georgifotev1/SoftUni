const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const userData = verifyToken(token);
      req.user = userData; // we can check if there is a user of guest with  if (req.user) ... true == user, false == guest
      res.locals.username = userData.username;
    } catch (error) {
      res.clearCookie("token");
      res.redirect("/auth/login");
      return;
    }
  }

  next();
};
