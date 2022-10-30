const { getAll } = require("../services/blogService");

const homeController = require("express").Router();

//TODO replace with real controller !!
homeController.get("/", async (req, res) => {
  const blogs = await getAll();
  const topThree = blogs.slice(-3);
  res.render("home", {
    title: "Home Page",
    user: req.user,
    topThree,
  });
});

homeController.get("/catalog", async (req, res) => {
  const blogs = await getAll();
  res.render("catalog", {
    title: "Catalog",
    blogs,
  });
});
module.exports = homeController;
