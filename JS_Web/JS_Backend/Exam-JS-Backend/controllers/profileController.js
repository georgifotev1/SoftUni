const { getByUserFollows, getByUserOwner } = require("../services/blogService");

const profileController = require("express").Router();

profileController.get("/", async (req, res) => {
  const follows = await getByUserFollows(req.user._id);
  const blogs = await getByUserOwner(req.user._id);
  res.render("profile", {
    title: "Profile Page",
    user: Object.assign({ follows, blogs }, req.user),
  });
});

module.exports = profileController;
