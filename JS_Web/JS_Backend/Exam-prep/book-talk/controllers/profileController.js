const { getByUserWishing } = require("../services/bookService");

const profileController = require("express").Router();

profileController.get("/", async (req, res) => {
  const wishings = await getByUserWishing(req.user._id);

  res.render("profile", {
    title: "Profile Page",
    user: Object.assign({ wishings }, req.user),
  });
});

module.exports = profileController;
